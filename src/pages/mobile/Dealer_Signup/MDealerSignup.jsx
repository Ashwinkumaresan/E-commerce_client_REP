import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { saveAccessToken, getAccessToken } from "../../component/Localforage/LocalForage";

export const MDealerSignup = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Email OTP signup
  const handleButtonSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }
    if (!email.endsWith(".com") || !email.includes("@gmail")) {
      setEmailError("Please enter a valid college email");
      return;
    }

    setEmailError("");
    setIsLoading(true);

    try {
      const res = await axios.post(
        "https://api.lancer.drmcetit.com/api/Snapdeal/email/",
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Email signup response:", res.data);

      // Save email in localStorage
      localStorage.setItem("email", email);

      // Navigate to OTP page
      navigate("/dealer-signup-otp");
    } catch (error) {
      console.error(error);
      setEmailError("Please check, email might already be registered");
    } finally {
      setIsLoading(false);
    }
  };

  // Google Signup 
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const id_token = credentialResponse.credential;

      // Send Google ID token to backend to create account or get JWT
      const res = await axios.post("http://127.0.0.1:8000/token/", { id_token });

      console.log("Google signup response:", res.data);

      // Save JWT token in LocalForage
      await saveAccessToken(res.data.access);

      // Save user info
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Navigate to dashboard or next step
      navigate("/dealer-dashboard");
    } catch (err) {
      console.error("Google signup error:", err.response?.data || err);
      setEmailError("Google signup failed, try again.");
    }
  };

  return (
    <div className="container">
      <h3 className="mt-5">Sign up for Become a Dealer.</h3>
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "70vh" }}>
        <div style={{ width: "100%", minWidth: "300px", maxWidth: "500px" }}>
          <div className="mt-4">
            {/* Email OTP Form  */}
            <form onSubmit={handleButtonSubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  className={`form-control rounded-1 ${emailError ? "is-invalid" : ""}`}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {emailError && <div className="invalid-feedback fs-14">{emailError}</div>}
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-dark py-2 rounded-1" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Sending...
                    </>
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </div>
            </form>

            {/* Google Signup Button */}
            <div className="text-center mt-4">
              <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setEmailError("Google signup failed")} />
            </div>

            <div className="text-center py-3">
              <p className="mb-0 text-muted">
                Already have an account? <Link to="/login" className="text-dark">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
