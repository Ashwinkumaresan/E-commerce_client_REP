"use client"

import { motion } from "framer-motion"
import "bootstrap/dist/css/bootstrap.min.css"

export default function ProductDetailLoading() {
    const pulse = {
        initial: { opacity: 0.5 },
        animate: { opacity: 1 },
        exit: { opacity: 0.5 },
    }

    const pulseTransition = {
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse",
    }

    return (
        <div className="container py-5">
            <div className="row g-4">
                {/* Product Images */}
                <div className="col-lg-6">
                    <motion.div
                        className="card border-0 shadow-sm mb-3 bg-secondary"
                        style={{ height: "400px" }}
                        variants={pulse}
                        initial="initial"
                        animate="animate"
                        transition={pulseTransition}
                    ></motion.div>
                    <div className="row g-2 mt-2">
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <div key={idx} className="col-3">
                                <motion.div
                                    className="card border bg-secondary"
                                    style={{ height: "80px" }}
                                    variants={pulse}
                                    initial="initial"
                                    animate="animate"
                                    transition={pulseTransition}
                                ></motion.div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="col-lg-6">
                    <motion.div
                        className="bg-secondary mb-3"
                        style={{ height: "40px", width: "70%" }}
                        variants={pulse}
                        initial="initial"
                        animate="animate"
                        transition={pulseTransition}
                    ></motion.div>
                    <motion.div
                        className="bg-secondary mb-3"
                        style={{ height: "80px", width: "100%" }}
                        variants={pulse}
                        initial="initial"
                        animate="animate"
                        transition={pulseTransition}
                    ></motion.div>
                    <motion.div
                        className="bg-secondary mb-3"
                        style={{ height: "30px", width: "30%" }}
                        variants={pulse}
                        initial="initial"
                        animate="animate"
                        transition={pulseTransition}
                    ></motion.div>

                    <div className="d-flex gap-3 mb-3">
                        <motion.div
                            className="bg-secondary"
                            style={{ height: "50px", flex: 1 }}
                            variants={pulse}
                            initial="initial"
                            animate="animate"
                            transition={pulseTransition}
                        ></motion.div>
                        <motion.div
                            className="bg-secondary"
                            style={{ height: "50px", flex: 1 }}
                            variants={pulse}
                            initial="initial"
                            animate="animate"
                            transition={pulseTransition}
                        ></motion.div>
                    </div>

                    {/* Quantity */}
                    <motion.div
                        className="bg-secondary mb-3"
                        style={{ height: "40px", width: "40%" }}
                        variants={pulse}
                        initial="initial"
                        animate="animate"
                        transition={pulseTransition}
                    ></motion.div>
                </div>
            </div>

            {/* Reviews */}
            <div className="mt-5">
                <motion.div
                    className="bg-secondary mb-3"
                    style={{ height: "30px", width: "25%" }}
                    variants={pulse}
                    initial="initial"
                    animate="animate"
                    transition={pulseTransition}
                ></motion.div>
                {Array.from({ length: 3 }).map((_, idx) => (
                    <motion.div
                        key={idx}
                        className="card border-0 shadow-sm mb-3 p-3"
                        variants={pulse}
                        initial="initial"
                        animate="animate"
                        transition={pulseTransition}
                    >
                        <div className="d-flex gap-3">
                            <motion.div
                                className="rounded-circle bg-secondary"
                                style={{ width: "50px", height: "50px" }}
                                variants={pulse}
                                initial="initial"
                                animate="animate"
                                transition={pulseTransition}
                            ></motion.div>
                            <div className="flex-grow-1">
                                <motion.div
                                    className="bg-secondary mb-2"
                                    style={{ height: "20px", width: "50%" }}
                                    variants={pulse}
                                    initial="initial"
                                    animate="animate"
                                    transition={pulseTransition}
                                ></motion.div>
                                <motion.div
                                    className="bg-secondary"
                                    style={{ height: "15px", width: "80%" }}
                                    variants={pulse}
                                    initial="initial"
                                    animate="animate"
                                    transition={pulseTransition}
                                ></motion.div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
