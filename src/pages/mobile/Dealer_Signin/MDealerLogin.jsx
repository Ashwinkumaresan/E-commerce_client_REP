import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";  // ✅ correct for v4+
import { getAccessToken, saveAccessToken } from "../../component/Localforage/LocalForage";

export const MDealerLogin = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
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

    // Validate password
    if (!password.trim()) {
      setPasswordError("Password is required");
      return;
    }

    setEmailError("");
    setPasswordError("");
    setIsLoading(true);

    try {
      const username = email;

      // Axios request to backend
      const res = await axios.post(
        "http://192.168.43.56:8000/accesstoken/",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // Save token in localforage
      await saveAccessToken(res.data.access);
      const token = await getAccessToken();
      console.log("Stored token in localforage:", token);

      // Save email in localStorage
      localStorage.setItem("email", email);

      // Navigate after login
      navigate("/"); // Change as needed
    } catch (error) {
      console.log(error);
      setEmailError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Google login success handler
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

      // Navigate after login
      navigate("/"); // Change as needed
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google login error:", error);
  };

  return (
    <div className="container">
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <div style={{ width: "100%", minWidth: "300px", maxWidth: "500px" }}>
          <h3 className="text-muted text-center mb-4">Sign in for Snapdeal</h3>

          {/* Email / Password Form */}
          <form onSubmit={handleButtonSubmit}>
            <div className="mb-3">
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

            <div className="mb-4">
              <input
                type="password"
                className={`form-control rounded-1 ${passwordError ? "is-invalid" : ""}`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passwordError && <div className="invalid-feedback fs-14">{passwordError}</div>}
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-dark py-2 rounded-1" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Sending...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>

          {/* Google Login */}
          <div className="text-center my-3">
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} />
          </div>

          <div className="text-center py-3">
            <p className="mb-0 text-muted">
              Already have an account? <Link to="/login" className="text-dark">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
