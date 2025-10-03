"use client"

import { motion } from "framer-motion"
import "bootstrap/dist/css/bootstrap.min.css"

export default function CartLoading() {
    const pulse = {
        initial: { opacity: 0.5 },
        animate: { opacity: 1 },
    }

    const pulseTransition = {
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse",
    }

    const placeholderItems = Array.from({ length: 3 }) // 3 placeholder cart items

    return (
        <div className="min-vh-100">
            <div className="container py-5">
                <motion.div
                    className="bg-secondary mb-4"
                    style={{ height: "30px", width: "200px", borderRadius: "5px" }}
                    variants={pulse}
                    initial="initial"
                    animate="animate"
                    transition={pulseTransition}
                ></motion.div>

                <div className="card shadow-sm border-0">
                    <div className="card-body p-4">
                        {placeholderItems.map((_, idx) => (
                            <div key={idx}>
                                <div className="row align-items-center py-4">
                                    <div className="col-lg-6 col-md-12 mb-3 mb-lg-0">
                                        <div className="d-flex align-items-center">
                                            <motion.div
                                                className="bg-secondary rounded-3 me-3 flex-shrink-0"
                                                style={{ width: "100px", height: "100px" }}
                                                variants={pulse}
                                                initial="initial"
                                                animate="animate"
                                                transition={pulseTransition}
                                            ></motion.div>
                                            <div className="flex-grow-1">
                                                <motion.div
                                                    className="bg-secondary mb-2"
                                                    style={{ height: "20px", width: "70%", borderRadius: "5px" }}
                                                    variants={pulse}
                                                    initial="initial"
                                                    animate="animate"
                                                    transition={pulseTransition}
                                                ></motion.div>
                                                <motion.div
                                                    className="bg-secondary"
                                                    style={{ height: "15px", width: "40%", borderRadius: "5px" }}
                                                    variants={pulse}
                                                    initial="initial"
                                                    animate="animate"
                                                    transition={pulseTransition}
                                                ></motion.div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-12">
                                        <div className="d-flex justify-content-lg-end justify-content-center">
                                            <motion.div
                                                className="bg-secondary rounded"
                                                style={{ height: "40px", width: "120px" }}
                                                variants={pulse}
                                                initial="initial"
                                                animate="animate"
                                                transition={pulseTransition}
                                            ></motion.div>
                                        </div>
                                    </div>
                                </div>
                                {idx < placeholderItems.length - 1 && <hr className="my-0" />}
                            </div>
                        ))}

                        <div className="mt-4 pt-4 border-top">
                            <motion.div
                                className="bg-secondary mb-3"
                                style={{ height: "30px", width: "150px", borderRadius: "5px" }}
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
    )
}
