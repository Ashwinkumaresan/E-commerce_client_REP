import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartModel } from "./CartModel";

function AnimatedBag() {
  const ref = useRef();
  const { scrollYProgress } = useScroll();

  // Scroll-based 3D effects
  const rotationY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);
  const positionZ = useTransform(scrollYProgress, [0, 1], [0, -1.5]);

  useFrame(() => {
    ref.current.rotation.y = rotationY.get();
    ref.current.scale.set(scale.get(), scale.get(), scale.get());
    ref.current.position.z = positionZ.get();
  });
  return <CartModel ref={ref} position={[0, -1, 0]} />;
}

export default function ScrollScene() {
  return (
    <div className="position-relative" style={{ height: "400vh", background: "#fff" }}>
      {/* 3D Canvas */}
      <div className="position-fixed top-0 start-0 w-100 vh-100">
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <AnimatedBag />
          <Environment preset="studio" />
        </Canvas>
      </div>

      {/* Scroll sections */}
      <div className="position-relative" style={{ zIndex: 2 }}>
        <section className="d-flex flex-column justify-content-center align-items-center text-center vh-100">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="fw-bold display-4"
          >
            Discover Your Style
          </motion.h1>
          <p className="lead text-muted w-75 mx-auto">
            Experience fashion with realism and interactivity.
          </p>
        </section>

        <section className="d-flex flex-column justify-content-center align-items-center text-center vh-100 bg-light">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="fw-bold display-4"
          >
            Rotate. Zoom. Explore.
          </motion.h1>
          <p className="lead text-muted w-75 mx-auto">
            Get a complete 3D view of every detail before you buy.
          </p>
        </section>

        <section className="d-flex flex-column justify-content-center align-items-center text-center vh-100">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="fw-bold display-4"
          >
            Premium Feel
          </motion.h1>
          <p className="lead text-muted w-75 mx-auto">
            Designed for elegance, comfort, and performance.
          </p>
        </section>
      </div>
    </div>
  );
}
