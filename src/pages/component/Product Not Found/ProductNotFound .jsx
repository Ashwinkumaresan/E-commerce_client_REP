import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

const ProductNotFound = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center" style={{ minHeight: "70vh" }}>
      {/* Icon with bounce + fade */}
      <motion.div
        initial={{ scale: 0, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="mb-3"
      >
        <ShoppingBag size={90} color="#888" />
      </motion.div>

      {/* Heading fade-in */}
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={{ fontFamily: "Poppins", fontWeight: "600", color: "#333" }}
      >
        No Products Found
      </motion.h3>

      {/* Subtext slide-up */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        style={{ fontFamily: "Poppins", color: "#666", maxWidth: "400px" }}
      >
        We couldn’t find any products matching your search.  
        Try adjusting your filters or search terms.
      </motion.p>

      {/* Button hover animation */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="btn btn-dark mt-3 rounded-2"
        style={{ fontFamily: "Poppins", borderRadius: "12px", padding: "10px 24px" }}
        onClick={() => window.location.reload()}
      >
        Refresh
      </motion.button>
    </div>
  );
};

export default ProductNotFound;
