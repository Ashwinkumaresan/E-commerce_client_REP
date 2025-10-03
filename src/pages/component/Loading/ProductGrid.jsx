"use client"

import { motion } from "framer-motion"
import "bootstrap/dist/css/bootstrap.min.css"

export default function ProductGrid() {
    const pulse = {
        initial: { opacity: 0.5 },
        animate: { opacity: 1 },
    }

    const pulseTransition = {
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse",
    }

    const placeholderProducts = Array.from({ length: 6 }) // Number of product cards

    return (
        <div className="min-vh-100 bg-light">
            {/* Header */}
            <header className="bg-white border-bottom">
                <div className="container-fluid py-3">
                    <div className="row g-3 align-items-center">
                        {/* Logo */}
                        <div className="col-12 col-md-auto">
                            <motion.div
                                className="bg-secondary rounded"
                                style={{ height: "30px", width: "150px" }}
                                variants={pulse}
                                initial="initial"
                                animate="animate"
                                transition={pulseTransition}
                            ></motion.div>
                        </div>

                        {/* Search bar */}
                        <div className="col-12 col-md">
                            <motion.div
                                className="bg-secondary rounded"
                                style={{ height: "40px", width: "100%" }}
                                variants={pulse}
                                initial="initial"
                                animate="animate"
                                transition={pulseTransition}
                            ></motion.div>
                        </div>

                        {/* Action buttons */}
                        <div className="col-12 col-md-auto d-flex gap-2">
                            {Array.from({ length: 4 }).map((_, idx) => (
                                <motion.div
                                    key={idx}
                                    className="bg-secondary rounded"
                                    style={{ height: "35px", width: "80px" }}
                                    variants={pulse}
                                    initial="initial"
                                    animate="animate"
                                    transition={pulseTransition}
                                ></motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <nav className="bg-white border-bottom">
                <div className="container-fluid py-2">
                    <motion.div
                        className="bg-secondary rounded"
                        style={{ height: "25px", width: "60%", marginBottom: "10px" }}
                        variants={pulse}
                        initial="initial"
                        animate="animate"
                        transition={pulseTransition}
                    ></motion.div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container-fluid py-4">
                <div className="row">
                    {/* Filter Sidebar */}
                    <div className="col-lg-3 col-md-4 mb-4 d-none d-md-block">
                        <motion.div
                            className="bg-secondary p-4 rounded"
                            style={{ height: "400px" }}
                            variants={pulse}
                            initial="initial"
                            animate="animate"
                            transition={pulseTransition}
                        ></motion.div>
                    </div>

                    {/* Product Grid */}
                    <div className="col-lg-9 col-md-8">
                        <div className="row g-3 g-md-4">
                            {placeholderProducts.map((_, idx) => (
                                <div key={idx} className="col-12 col-sm-6 col-lg-4">
                                    <div className="card h-100">
                                        <motion.div
                                            className="bg-secondary mb-3 rounded"
                                            style={{ height: "200px" }}
                                            variants={pulse}
                                            initial="initial"
                                            animate="animate"
                                            transition={pulseTransition}
                                        ></motion.div>
                                        <motion.div
                                            className="bg-secondary rounded mb-2"
                                            style={{ height: "20px", width: "80%" }}
                                            variants={pulse}
                                            initial="initial"
                                            animate="animate"
                                            transition={pulseTransition}
                                        ></motion.div>
                                        <motion.div
                                            className="bg-secondary rounded mb-2"
                                            style={{ height: "20px", width: "50%" }}
                                            variants={pulse}
                                            initial="initial"
                                            animate="animate"
                                            transition={pulseTransition}
                                        ></motion.div>
                                        <motion.div
                                            className="bg-secondary rounded"
                                            style={{ height: "20px", width: "60%" }}
                                            variants={pulse}
                                            initial="initial"
                                            animate="animate"
                                            transition={pulseTransition}
                                        ></motion.div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
