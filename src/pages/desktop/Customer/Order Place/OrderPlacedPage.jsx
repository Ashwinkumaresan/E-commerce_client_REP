"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import "bootstrap/dist/css/bootstrap.min.css"
import { BadgeCheck, ThumbsUp } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function OrderPlacedPage() {
    const navigate = useNavigate()
    const [progress, setProgress] = useState(0)
    const [completed, setCompleted] = useState(false)

    // Progress bar simulation
    useEffect(() => {
        let interval
        if (progress < 100) {
            interval = setInterval(() => setProgress((prev) => Math.min(prev + 5, 100)), 30)
        } else {
            setCompleted(true)
        }
        return () => clearInterval(interval)
    }, [progress])

    return (
        <div
            className="h-100 w-100 d-flex justify-content-center blur align-items-center position-absolute top-0"
        >
            <motion.div
                className="card p-5 text-center"
                style={{
                    maxWidth: "400px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
            >
                <h3 className="fw-bold mb-4">Processing Your Order</h3>

                {/* Progress Bar */}
                <AnimatePresence>
                    {!completed && (
                        <motion.div
                            className="progress mb-4"
                            style={{ height: "12px", borderRadius: "6px" }}
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.div
                                className="progress-bar"
                                role="progressbar"
                                style={{ backgroundColor: "#343a40" }}
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ ease: "easeInOut", duration: 0.03 }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* BadgeCheck Icon */}
                {completed && (
                    <motion.div
                        className="mb-3 d-inline-block"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <ThumbsUp size={80} color="#000" />
                    </motion.div>
                )}

                {/* Order Placed Text */}
                {completed && (
                    <motion.h4
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="fw-bold mb-4"
                    >
                        Order Placed Successfully!
                    </motion.h4>
                )}

                {/* Continue Shopping Button */}
                {completed && (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="btn btn-dark fw-bold"
                        onClick={() => {
                            navigate("/shopping-cart"); 
                            window.location.reload();   
                        }}

                    >
                        Continue Shopping
                    </motion.button>
                )}
            </motion.div>
        </div>
    )
}
