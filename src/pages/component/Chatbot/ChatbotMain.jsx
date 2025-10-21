import React, { useEffect, useRef, useState } from "react";
import { ChatbotIcon } from "./ChatbotIcon";
import ChatMessage from "./ChatMessage";
import ChatForm from "./ChatForm";
import axios from "axios";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ChatbotMain = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const [productInfo, setProductInfo] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);
  const chatBodyRef = useRef();
  const navigate = useNavigate();

  // 1️⃣ Fetch product data from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://api.lancer.drmcetit.com/api/Snapdeal/product/"
        );
        setProductInfo(res.data);

        const formatted = res.data
          .map(
            (item) => `
Product Name: ${item.title}
Brand: ${item.brand}
Category: ${item.category}
Price: ₹${item.price}
Offer: ${item.offer}%
Offer Price: ₹${item.offerPrice}
Description: ${item.description}
Color: ${item.color}
Owner: ${item.ownername}`
          )
          .join("\n----------------------\n");

        setChatHistory([
          {
            hideInChat: true,
            role: "model",
            text: `You are Snapdeal's shopping assistant. Here are some product details:\n${formatted}`,
          },
        ]);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // 2️⃣ Add to Cart function
  const handleAddToCart = async (productId, quantity = 1) => {
    console.log("Inside handleAddToCart", productId, quantity);
    const token = localStorage.getItem("accessTokenCustomer");
    if (!token) {
      navigate("/customer-signin");
      return;
    }
    try {
      setCartLoading(true);
      const res = await axios.post(
        `https://api.lancer.drmcetit.com/api/Snapdeal/cart/add/${productId}/`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Add to Cart response:", res.data);
      navigate("/shopping-cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setCartLoading(false);
    }
  };

  // 3️⃣ Generate bot response
 const generateBotResponse = async (history) => {
  const updateHistory = (message) => {
    setChatHistory((prev) => [
      ...prev.filter((msg) => msg.text !== "Thinking..."),
      message,
    ]);
  };

  const formattedHistory = history.map(({ role, text }) => ({
    role,
    parts: [{ text }],
  }));

  try {
    const response = await fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": import.meta.env.VITE_API_KEY,
      },
      body: JSON.stringify({ contents: formattedHistory }),
    });

    const data = await response.json();
    if (!response.ok)
      throw new Error(data.error?.message || "Something went wrong!");

    let apiResponseText = data.candidates[0].content.parts[0].text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .trim();

    // Prepare buttons
    const buttons = [];
    productInfo.forEach((p) => {
      if (apiResponseText.toLowerCase().includes(p.title.toLowerCase())) {
        buttons.push(
          {
            label: `View ${p.title}`,
            href: `#/product-detail/bot/${p.productId}`,
          },
          {
            label: "Add to Cart",
            onClick: () => handleAddToCart(p.productId, 1),
          }
        );
      }
    });

    // Add the full bot message as a single chat entry
    updateHistory({
      role: "model",
      text: apiResponseText.replace(/\n/g, "<br/>"), // preserve line breaks in single message
      buttons: buttons.length ? buttons : null,
    });

    // Auto add to cart if user said "add to cart"
    const lastUserMessage = history[history.length - 1]?.text;
    if (/add (this )?product to my cart|add to cart/i.test(lastUserMessage)) {
      const matched = productInfo.find((p) =>
        apiResponseText.toLowerCase().includes(p.title.toLowerCase())
      );
      if (matched) handleAddToCart(matched.productId, 1);
    }
  } catch (error) {
    updateHistory({ role: "model", text: error.message, isError: true });
  }
};


  // 4️⃣ Auto-scroll chat
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button
        onClick={() => setShowChatbot((prev) => !prev)}
        className="chatbot-toggler border border-3"
      >
        <span>
          <ChatbotIcon />
        </span>
        <span>
          <X />
        </span>
      </button>

      <div className="chatbot-popup">
        {/* Chat header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Snapdeal Assistant</h2>
          </div>
          <button onClick={() => setShowChatbot(false)}>
            <X />
          </button>
        </div>

        {/* Chat body */}
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hey there 👋<br />I’m your Snapdeal shopping assistant.<br />
              Ask me about any product, deals, or categories!
            </p>
          </div>

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        {/* Chat footer */}
        <div className="chat-footer">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
};
