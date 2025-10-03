import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CartEmpty = () => {
    const navigate = useNavigate("")
    const container = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.2,
                duration: 0.5,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } },
    };

    return (
        <motion.div
            className="d-flex flex-column justify-content-center align-items-center text-center p-5"
            variants={container}
            initial="hidden"
            animate="visible"
            style={{ minHeight: "300px" }}
        >
            <motion.div
                variants={item}
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <svg
                    width="100"
                    height="100"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6c757d"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="10" cy="20.5" r="1.5"></circle>
                    <circle cx="18" cy="20.5" r="1.5"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"></path>
                </svg>
            </motion.div>

            <motion.h3
                className="mt-3 text-muted"
                variants={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                Your Cart is Empty
            </motion.h3>

            <motion.p
                className="text-secondary"
                variants={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
            >
                Looks like you haven’t added anything to your cart yet.
            </motion.p>

            <motion.button
                className="btn btn-dark mt-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/")}
            >
                Shop Now
            </motion.button>
        </motion.div>
    );
};

export default CartEmpty;
