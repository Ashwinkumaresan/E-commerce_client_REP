import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";   // ✅ correct import
import { getAccessToken, saveAccessToken } from "../../../component/Localforage/LocalForage";

export const CustomerSignup = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleButtonSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }
    if (!email.endsWith(".com") || !email.includes("@gmail")) {
      setEmailError("Please enter a valid email");
      return;
    }

    setEmailError("");
    setIsLoading(true);

    try {
      // Axios request to backend
      await axios.post(
        "https://api.lancer.drmcetit.com/api/Snapdeal/email/",
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      // Store email in localStorage
      localStorage.setItem("email", email);

      // Navigate to customer-signup-otp
      navigate("/customer-signup-otp");
    } catch (error) {
      console.log(error);
      setEmailError("Please check, mail might already be registered");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Handle Google Signup Success
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Google user:", decoded);

      // Save token in LocalForage
      await saveAccessToken(credentialResponse.credential);
      const token = await getAccessToken();
      console.log("Google token stored:", token);

      // Save email in localStorage
      localStorage.setItem("email", decoded.email);

      // Navigate to OTP or dashboard
      navigate("/dealer-signup-otp");
    } catch (error) {
      console.error("Google signup failed:", error);
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google signup error:", error);
  };

  return (
    <div className="container">
      <h1 className="mt-5 ms-2 ms-lg-5">Sign up for faster Checkout.</h1>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <div style={{ width: "100%", minWidth: "300px", maxWidth: "500px" }}>
          <h3 className="text-muted text-center mb-4">Sign up for Snapdeal</h3>

          {/* Email Signup Form */}
          <form onSubmit={handleButtonSubmit}>
            <div className="mb-4">
              <input
                type="email"
                className={`form-control rounded-1 ${
                  emailError ? "is-invalid" : ""
                }`}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailError && (
                <div className="invalid-feedback fs-14">{emailError}</div>
              )}
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-dark py-2 rounded-1"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Sending...
                  </>
                ) : (
                  "Send OTP"
                )}
              </button>
            </div>
          </form>

          {/* Google Signup */}
          <div className="text-center my-3">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
            />
          </div>

          <div className="text-center py-3">
            <p className="mb-0 text-muted">
              Already have an account?{" "}
              <Link to="/login" className="text-dark">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
