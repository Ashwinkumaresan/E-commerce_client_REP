"use client"

import { motion } from "framer-motion"
import "bootstrap/dist/css/bootstrap.min.css"

export default function ProductLoading() {
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
            <h2 className="mb-4">Loading Products...</h2>
            <div className="row g-4">
                {Array.from({ length: 6 }).map((_, idx) => (
                    <div key={idx} className="col-md-4">
                        <motion.div
                            className="card shadow-sm"
                            variants={pulse}
                            initial="initial"
                            animate="animate"
                            transition={pulseTransition}
                        >
                            <div className="card-img-top bg-secondary" style={{ height: "200px" }}></div>
                            <div className="card-body">
                                <div className="bg-secondary mb-2" style={{ height: "20px", width: "70%" }}></div>
                                <div className="bg-secondary mb-2" style={{ height: "20px", width: "50%" }}></div>
                                <div className="d-flex justify-content-between">
                                    <div className="bg-secondary" style={{ height: "30px", width: "45%" }}></div>
                                    <div className="bg-secondary" style={{ height: "30px", width: "45%" }}></div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    )
}
