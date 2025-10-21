import React from "react";
import { useGLTF } from "@react-three/drei";

export function CartModel(props) {
  const { scene } = useGLTF("/simple_shopping_cart.glb");
  return <primitive object={scene} {...props} />;
}
