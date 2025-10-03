import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAccessToken, saveAccessToken } from "../../component/Localforage/LocalForage";
import { GoogleLogin } from "@react-oauth/google";

export const DealerLogin = () => {
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Normal login
    const handleButtonSubmit = async (e) => {
        e.preventDefault();

        if (!username.trim()) {
            setUsernameError("Username is required");
            return;
        }
        if (!password.trim()) {
            setPasswordError("Password is required");
            return;
        }

        setPasswordError("");
        setUsernameError("");
        setIsLoading(true);

        try {
            const res = await axios.post(
                "https://api.lancer.drmcetit.com/api/login/",
                { username, password },
                { headers: { "Content-Type": "application/json" } }
            );

            console.log("Username Login Response:", res.data);

            // Save token in indexedDB/localforage
            await saveAccessToken(res.data.access);

            // Store in localStorage
            localStorage.setItem("username", username);
            localStorage.setItem("accessTokenDealer", res.data.access);

            const token = await getAccessToken();
            console.log("Retrieved Token:", token);

            navigate("/home");
        } catch (error) {
            console.log(error);
            setUsernameError("Invalid credentials");
        } finally {
            setIsLoading(false);
        }

    };

    // Google Login
    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const id_token = credentialResponse.credential;
            const res = await axios.post("http://192.168.43.56:8000/token/", { id_token });

            console.log("Google Login Response:", res.data);

            await saveAccessToken(res.data.access);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            navigate("/home");
        } catch (err) {
            console.error("Google login error:", err.response?.data || err);
            setUsernameError("Google login failed, try again.");
        }
    };

    return (
        <div className="container">
            <h1 className="mt-5 ms-2 ms-lg-5">Sign in to continue as dealer.</h1>
            <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ height: "70vh" }}
            >
                <div style={{ width: "100%", minWidth: "300px", maxWidth: "500px" }}>
                    <h3 className="text-muted text-center mb-4">Sign in for snapdeal</h3>

                    <form onSubmit={handleButtonSubmit}>
                        <div className="mb-3">
                            <input
                                type="text"
                                className={`form-control rounded-1 ${usernameError ? "is-invalid" : ""}`}
                                id="username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            {usernameError && (
                                <div className="invalid-feedback fs-14">{usernameError}</div>
                            )}
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                className={`form-control rounded-1 ${passwordError ? "is-invalid" : ""}`}
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {passwordError && (
                                <div className="invalid-feedback fs-14">{passwordError}</div>
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
                                    "Sign in"
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-4">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => setUsernameError("Google login failed")}
                        />
                    </div>

                    <div className="text-center py-3">
                        <p className="mb-0 text-muted">
                            Don't Have an Account <Link to="/dealer-signup" className="text-dark">Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
