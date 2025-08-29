import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const MDealerSignup = () => {
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
            setEmailError("Please enter a valid college email");
            return;
        }

        setEmailError("");
        setIsLoading(true);

        console.log(email)
        try {
            // Axios request to backend
            const res = await axios.post(
                " http://127.0.0.1:8000/user/email/",
                { email },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            // Store email in localStorage
            localStorage.setItem("email", email);

            // Navigate to signup-otp page
            navigate("/dealer-signup-otp");
        } catch (error) {
            console.log(error)
            setEmailError("Please check, mail might already be registered");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <h3 className="mt-5">Sign up for faster checkout.</h3>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <div style={{
                    width: "100%",
                    minWidth: "300px",
                    maxWidth: "500px"
                }}>
                    <div className="mt-4">
                        <div>
                            <div>
                                <form onSubmit={handleButtonSubmit}>
                                    <div className="mb-4">
                                        <input
                                            type="email"
                                            className={`form-control rounded-1 ${emailError ? "is-invalid" : ""}`}
                                            id="email"
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
                                            className=" btn btn-dark py-2 rounded-1"
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
            </div>
        </div>
    );
}
