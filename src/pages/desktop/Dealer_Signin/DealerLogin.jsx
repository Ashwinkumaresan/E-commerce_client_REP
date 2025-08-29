import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const DealerLogin = () => {
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
        if (!password.trim()){
            setPassword("Password is Required");
            return;
        }

        setPasswordError("");
        setEmailError("");
        setIsLoading(true);

        console.log(email)
        try {
            const username = email;
            // Axios request to backend
            const res = await axios.post(
                "http://192.168.43.56:8000/accesstoken/",
                {username, password},
                {
                    headers: { "Content-Type": "application/json" },
                }
                
            );
            // console.log(res.data.access);
            // console.log(res.data);

            //await saveAccessToken(res.data.access);
            //alert("Stored")
            //const token = await getAccessToken()
            //console.log("Token from localforage", token);
            


            // Store email in localStorage
            localStorage.setItem("email", email);

            // Navigate to signup-otp page
            //navigate("/");
        } catch (error) {
            console.log(error)
            setEmailError("Please check, mail might already be registered");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <h1 className="mt-5 ms-2 ms-lg-5">Sign in to continue your purchase.</h1>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{
                height: "70vh"
            }}>
                <div style={{
                    width: "100%",
                    minWidth: "300px",
                    maxWidth: "500px"
                }}>
                    <div>
                        <h3 className="text-muted text-center mb-4">Sign in for snapdeal</h3>
                        <div>
                            <div>
                                <form onSubmit={handleButtonSubmit}>
                                    <div className="mb-3">
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
                                                "Sign in"
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
