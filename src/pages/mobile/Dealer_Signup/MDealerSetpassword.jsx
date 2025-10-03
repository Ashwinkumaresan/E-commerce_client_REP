import axios from "axios"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

export const MDealerSetpassword = () => {
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const email = localStorage.getItem("email")
    const otp = localStorage.getItem("otpVerified")

    useEffect(() => {
        if (!email || !otp) {
            navigate("/login")
        }
    }, [email, otp, navigate])

    const getPasswordStrength = (password) => {
        if (!password) return { strength: 0, text: "", class: "" }

        let strength = 0
        if (password.length >= 8) strength += 1
        if (/[A-Z]/.test(password)) strength += 1
        if (/[a-z]/.test(password)) strength += 1
        if (/[0-9]/.test(password)) strength += 1
        if (/[^A-Za-z0-9]/.test(password)) strength += 1

        const strengthMap = {
            1: { text: "Weak", class: "bg-danger" },
            2: { text: "Fair", class: "bg-warning" },
            3: { text: "Good", class: "bg-info" },
            4: { text: "Strong", class: "bg-primary" },
            5: { text: "Very Strong", class: "bg-success" },
        }

        return {
            strength: (strength / 5) * 100,
            text: strengthMap[strength]?.text || "",
            class: strengthMap[strength]?.class || "",
        }
    }

    const passwordStrength = getPasswordStrength(password)

    const handleResetPassword = async (e) => {
        e.preventDefault()

        // if (!username) {
        //     setPasswordError("Please enter a username")
        //     return
        // }

        if (!password) {
            setPasswordError("Please enter a new password")
            return
        }

        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters long")
            return
        }

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match")
            return
        }

        setPasswordError("")
        setIsLoading(true)

        try {
            const customerType = "seller"
            const res = await axios.post(
                "https://api.lancer.drmcetit.com/api/Snapdeal/setPassword/ ",
                {
                    customerType,
                    password,
                    confirmPassword,
                    email,
                    otp,
                },
                {
                    headers: { "Content-Type": "application/json" },
                }
            )
            alert("Account created successful! You can now login with your new account.")
            navigate("/login")
            localStorage.clear();
        } catch (error) {
            console.log(error);
            console.log(error.response);
            console.log(username);
            console.log(email);
            console.log(otp);
            console.log(password);
            console.log(confirmPassword);

            setPasswordError("Something went wrong. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container pt-0 pt-md-5 mt-0 mt-md-5 d-flex d-md-block justify-content-center align-items-center mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div>
                        <div>
                            <div>
                                <h3 className="m-0 mb-5">Your identity has been verified.</h3>
                            </div>

                            <form onSubmit={handleResetPassword}>
                                {/* username field */}
                                {/* <div className="mb-4">
                                    <input
                                        type="text"
                                        className={`form-control rounded-1 ${passwordError && !username ? "is-invalid" : ""}`}
                                        id="username"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setusername(e.target.value)}
                                        required
                                    />
                                </div> */}

                                {/* New Password */}
                                <div className="mb-4">
                                    <div className="input-group">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className={`form-control rounded-1 ${passwordError ? "is-invalid" : ""}`}
                                            id="new-password"
                                            placeholder="New password"
                                            value={password}
                                            onChange={(e) => setpassword(e.target.value)}
                                            required
                                        />
                                        {/* <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                                        </button> */}
                                    </div>

                                    {/* {password && (
                                        <div className="mt-2">
                                            <div className="progress" style={{ height: "5px" }}>
                                                <div
                                                    className={`progress-bar rounded-1 ${passwordStrength.class}`}
                                                    role="progressbar"
                                                    style={{ width: `${passwordStrength.strength}%` }}
                                                    aria-valuenow={passwordStrength.strength}
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                ></div>
                                            </div>
                                            <small className="text-muted d-flex justify-content-end mt-1">{passwordStrength.text}</small>
                                        </div>
                                    )} */}
                                </div>

                                {/* Confirm Password */}
                                <div className="mb-4">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className={`form-control rounded-1 ${passwordError ? "is-invalid" : ""}`}
                                        id="confirm-password"
                                        placeholder="Confirm password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                    {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                                </div>

                                <div className="d-grid">
                                    <button type="submit" className="btn btn-dark py-2" disabled={isLoading}>
                                        {isLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Creatting...
                                            </>
                                        ) : (
                                            "Create Account"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                        {/* <div className="text-center py-3">
                            <p className="mb-0">
                                <Link to="/login" className="text-dark">
                                    Back to Login
                                </Link>
                            </p>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
