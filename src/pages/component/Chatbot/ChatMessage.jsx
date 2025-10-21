import React from "react";
import { ChatbotIcon } from "./ChatbotIcon";

// Sanitize HTML text (keeps safe HTML like <br> but removes scripts/events)
const sanitizeHTML = (html) => {
  let safeHTML = html
    .replace(/<script.*?>.*?<\/script>/gi, "")
    .replace(/on\w+=".*?"/g, ""); // Remove inline events
  return safeHTML;
};

const ChatMessage = ({ chat }) => {
  if (chat.hideInChat) return null;

  return (
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
      >
        {/* Render sanitized HTML for normal text */}
        {chat.text && (
          <span
            dangerouslySetInnerHTML={{ __html: sanitizeHTML(chat.text) }}
          />
        )}

        {/* Render React buttons if present */}
        {chat.buttons &&
          chat.buttons.map((btn, index) =>
            btn.href ? (
              <a
                key={index}
                href={btn.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark mt-2 text-white"
                style={{ marginRight: "8px" }}
              >
                {btn.label}
              </a>
            ) : (
              <button
                key={index}
                onClick={btn.onClick}
                className="btn btn-outline-dark mt-2"
                style={{ marginRight: "8px" }}
              >
                {btn.label}
              </button>
            )
          )}
      </div>
    </div>
  );
};

export default ChatMessage;
