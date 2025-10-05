import React, { useEffect, useRef, useState } from "react";
import { ChatbotIcon } from "./ChatbotIcon";
import ChatMessage from "./ChatMessage";
import ChatForm from "./ChatForm";
import axios from "axios";
import { X } from "lucide-react";

export const ChatbotMain = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const [productInfo, setProductInfo] = useState([]);
  const chatBodyRef = useRef();

  // 1️⃣ Fetch product data from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://api.lancer.drmcetit.com/api/Snapdeal/product/"
        );

        setProductInfo(res.data);
        console.log(res.data)

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

        // Initial bot message with product context
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

  const generateBotResponse = async (history) => {
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text, isError },
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

      if (!response.ok) throw new Error(data.error?.message || "Something went wrong!");

      let apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();

      // Split response into lines and check for product mentions
      const lines = apiResponseText.split("\n").map((line) => {
        const matched = productInfo.find((p) =>
          line.toLowerCase().includes(p.title.toLowerCase())
        );
        if (matched) {
          return `${line} <br/><a href="https://e-commerce-client-rep.vercel.app/#/product-detail/${matched.productId}" target="_blank" class="btn btn-dark mt-2 text-white" style="text-decoration:none;">🔗 View ${matched.title}</a>`;
        }
        return line;
      });

      apiResponseText = lines.join("<br/>");
      updateHistory(apiResponseText);
    } catch (error) {
      updateHistory(error.message, true);
    }
  };

  // 3️⃣ Auto-scroll chat
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
        <span ><ChatbotIcon /></span>
        <span><X /></span>
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

          {chatHistory.map(
            (chat, index) =>
              !chat.hideInChat && (
                <ChatMessage key={index} chat={chat} />
              )
          )}
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
