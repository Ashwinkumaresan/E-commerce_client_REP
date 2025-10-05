import React, { useEffect, useRef, useState } from "react";
import { ChatbotIcon } from "./ChatbotIcon";
import ChatMessage from "./ChatMessage";
import ChatForm from "./ChatForm";
import axios from "axios";
import { X } from "lucide-react";

export const ChatbotMain = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const [productInfo, setProductInfo] = useState("");
  const [products, setProducts] = useState([]);
  const chatBodyRef = useRef();

  // 🧠 1️⃣ Fetch product data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://api.lancer.drmcetit.com/api/Snapdeal/product/"
        );

        setProducts(res.data);

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
Owner: ${item.ownername}
`
          )
          .join("\n----------------------\n");

        setProductInfo(formatted);

        setChatHistory([
          {
            hideInChat: true,
            role: "model",
            text: `You are Snapdeal's shopping assistant. Here are the product details:\n${formatted}`,
          },
        ]);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // ⚙️ 2️⃣ Generate bot response + append product link if relevant
  // 🔥 Corrected generateBotResponse
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

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": import.meta.env.VITE_API_KEY,
      },
      body: JSON.stringify({ contents: formattedHistory }),
    };

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();

      if (!response.ok)
        throw new Error(data.error?.message || "Something went wrong!");

      let apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();

      // 🔍 Loop through all products and append a button after the product title
      products.forEach((p) => {
        const regex = new RegExp(`(${p.title})`, "i"); // case-insensitive match
        if (regex.test(apiResponseText)) {
          const productButton = `
          <div>
            <a href="https://e-commerce-client-rep.vercel.app/#/product-detail/${p.productId}" 
               target="_blank" 
               class="btn btn-dark text-white" 
               style="text-decoration:none;">
               🔗 View ${p.title}
            </a>
          </div>
        `;
          // Replace only the first occurrence of the title
          apiResponseText = apiResponseText.replace(regex, `$1${productButton}`);
        }
      });

      updateHistory(apiResponseText);
    } catch (error) {
      updateHistory(error.message, true);
    }
  };



  // 🧭 3️⃣ Auto-scroll
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
        className="chatbot-toggler"
      >
        <span>
          <ChatbotIcon />
        </span>
        <span>
          <X />
        </span>
      </button>

      <div className="chatbot-popup">
        {/* Chatbot header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Snapdeal Assistant</h2>
          </div>
          <button onClick={() => setShowChatbot((prev) => !prev)}>
            <X />
          </button>
        </div>

        {/* Chatbot body */}
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

        {/* Chatbot footer */}
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
