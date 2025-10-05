import React from "react";
import { ChatbotIcon } from "./ChatbotIcon";

// 🧹 Sanitize and convert "View Product" link to button
const sanitizeHTML = (html) => {
  // Remove unsafe tags or event handlers
  let safeHTML = html
    .replace(/<script.*?>.*?<\/script>/gi, "")
    .replace(/on\w+=".*?"/g, "");

  // Replace plain <a> tags with Bootstrap-styled buttons
  safeHTML = safeHTML.replace(
    /<a\s+href="(.*?)"(.*?)>(.*?)<\/a>/gi,
    `<a href="$1" $2 target="_blank" class="btn btn-dark mt-2 text-white">$3</a>`
  );

  return safeHTML;
};

const ChatMessage = ({ chat }) => {
  return (
    !chat.hideInChat && (
      <div
        className={`message ${chat.role === "model" ? "bot" : "user"}-message ${
          chat.isError ? "error" : ""
        }`}
      >
        {chat.role === "model" && <ChatbotIcon />}

        <div
          className="message-text"
          style={{
            fontFamily: "Poppins, sans-serif",
            lineHeight: "1.6",
            wordWrap: "break-word",
          }}
          dangerouslySetInnerHTML={{ __html: sanitizeHTML(chat.text) }}
        />
      </div>
    )
  );
};

export default ChatMessage;
