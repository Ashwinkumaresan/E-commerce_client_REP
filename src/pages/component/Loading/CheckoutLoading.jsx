"use client"

import { motion } from "framer-motion"
import "bootstrap/dist/css/bootstrap.min.css"

export default function CheckoutLoading() {
    const pulse = {
        initial: { opacity: 0.5 },
        animate: { opacity: 1 },
    }

    const pulseTransition = {
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse",
    }

    const placeholderItems = Array.from({ length: 2 }) // For delivery/payment options

    return (
        <div className="checkout-page">
            <div className="container py-5">
                <motion.div
                    className="bg-secondary mb-4"
                    style={{ height: "30px", width: "200px", borderRadius: "5px" }}
                    variants={pulse}
                    initial="initial"
                    animate="animate"
                    transition={pulseTransition}
                ></motion.div>

                <div className="row g-4">
                    {/* Left Column */}
                    <div className="col-lg-8">
                        {/* Shipping Address */}
                        <div className="card mb-4">
                            <div className="card-body">
                                <motion.div
                                    className="bg-secondary mb-3"
                                    style={{ height: "20px", width: "150px", borderRadius: "5px" }}
                                    variants={pulse}
                                    initial="initial"
                                    animate="animate"
                                    transition={pulseTransition}
                                ></motion.div>
                                <motion.div
                                    className="bg-secondary p-3 rounded"
                                    style={{ height: "80px", width: "100%" }}
                                    variants={pulse}
                                    initial="initial"
                                    animate="animate"
                                    transition={pulseTransition}
                                ></motion.div>
                            </div>
                        </div>

                        {/* Delivery Options */}
                        <div className="card mb-4">
                            <div className="card-body">
                                <motion.div
                                    className="bg-secondary mb-3"
                                    style={{ height: "20px", width: "180px", borderRadius: "5px" }}
                                    variants={pulse}
                                    initial="initial"
                                    animate="animate"
                                    transition={pulseTransition}
                                ></motion.div>
                                {placeholderItems.map((_, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="bg-secondary mb-3 p-3 rounded"
                                        style={{ height: "50px", width: "100%" }}
                                        variants={pulse}
                                        initial="initial"
                                        animate="animate"
                                        transition={pulseTransition}
                                    ></motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="card">
                            <div className="card-body">
                                <motion.div
                                    className="bg-secondary mb-3"
                                    style={{ height: "20px", width: "180px", borderRadius: "5px" }}
                                    variants={pulse}
                                    initial="initial"
                                    animate="animate"
                                    transition={pulseTransition}
                                ></motion.div>
                                {Array.from({ length: 3 }).map((_, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="bg-secondary mb-3 p-3 rounded"
                                        style={{ height: "40px", width: "100%" }}
                                        variants={pulse}
                                        initial="initial"
                                        animate="animate"
                                        transition={pulseTransition}
                                    ></motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="col-lg-4">
                        <div className="card position-sticky" style={{ top: "20px" }}>
                            <div className="card-body">
                                <motion.div
                                    className="bg-secondary mb-4"
                                    style={{ height: "20px", width: "150px", borderRadius: "5px" }}
                                    variants={pulse}
                                    initial="initial"
                                    animate="animate"
                                    transition={pulseTransition}
                                ></motion.div>

                                <motion.div
                                    className="bg-secondary mb-3"
                                    style={{ height: "20px", width: "100%", borderRadius: "5px" }}
                                    variants={pulse}
                                    initial="initial"
                                    animate="animate"
                                    transition={pulseTransition}
                                ></motion.div>

                                <motion.div
                                    className="bg-secondary mb-4"
                                    style={{ height: "20px", width: "100%", borderRadius: "5px" }}
                                    variants={pulse}
                                    initial="initial"
                                    animate="animate"
                                    transition={pulseTransition}
                                ></motion.div>

                                <motion.div
                                    className="bg-secondary"
                                    style={{ height: "50px", width: "100%", borderRadius: "5px" }}
                                    variants={pulse}
                                    initial="initial"
                                    animate="animate"
                                    transition={pulseTransition}
                                ></motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
