import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Tag, Shirt, Watch, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const [isOverCart, setIsOverCart] = useState(false);

  const items = [
    { id: 1, name: "Brands", icon: <Tag size={28} />, link: "/brands" },
    { id: 2, name: "Clothing", icon: <Shirt size={28} />, link: "/category/clothing" },
    { id: 3, name: "Accessories", icon: <Watch size={28} />, link: "/category/accessories" },
    { id: 4, name: "Mobiles", icon: <Smartphone size={28} />, link: "/subcategory/mobiles" },
  ];

  const handleDrop = (item) => {
    setIsOverCart(false);
    navigate(item.link);
  };

  return (
    <div className="relative flex items-center justify-center h-[90vh] bg-white overflow-hidden">
      {/* Center Cart */}
      <motion.div
        className={`flex items-center justify-center rounded-full border-4 shadow-md transition-all duration-300
        ${isOverCart ? "border-black bg-gray-100" : "border-gray-400 bg-white"} w-40 h-40`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsOverCart(true);
        }}
        onDragLeave={() => setIsOverCart(false)}
        onDrop={(e) => {
          const item = JSON.parse(e.dataTransfer.getData("item"));
          handleDrop(item);
        }}
      >
        <ShoppingCart size={50} color={isOverCart ? "black" : "gray"} />
      </motion.div>

      {/* Circular Icons */}
      <div className="absolute w-[600px] h-[600px] flex items-center justify-center">
        {items.map((item, index) => {
          const angle = (index / items.length) * 2 * Math.PI;
          const x = 220 * Math.cos(angle);
          const y = 220 * Math.sin(angle);

          return (
            <motion.div
              key={item.id}
              drag
              dragElastic={0.8}
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              onDragStart={(e) => {
                e.dataTransfer.setData("item", JSON.stringify(item));
              }}
              className="absolute flex flex-col items-center cursor-grab select-none"
              style={{ transform: `translate(${x}px, ${y}px)` }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-16 h-16 flex items-center justify-center bg-gray-50 border border-gray-300 rounded-full shadow-sm">
                {item.icon}
              </div>
              <p className="mt-2 text-gray-700 text-sm font-medium">{item.name}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroSection;
