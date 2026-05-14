import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
    MessageCircle,
    X,
    Send,
    Moon,
    Sun,
    Loader2
} from "lucide-react";

const ChatBot = () => {
    const [open, setOpen] = useState(false);
    const [dark, setDark] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef();

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async (customText = null) => {
        const text = customText || input;
        if (!text.trim()) return;

        setMessages(prev => [...prev, { sender: "user", text }]);
        setLoading(true);

        try {
            const res = await axios.post("http://localhost:8001/chat", {
                message: text
            });

            setMessages(prev => [
                ...prev,
                { sender: "bot", payload: res.data }
            ]);
        } catch {
            setMessages(prev => [
                ...prev,
                { sender: "bot", payload: { type: "text", message: "Server error." } }
            ]);
        }

        setInput("");
        setLoading(false);
    };

    // ===========================
    // RENDER TYPES
    // ===========================

    const renderSearch = (products) => (
        <div className="d-flex flex-column gap-3">
            {products.map((p) => (
                <div key={p.id} className="product-card">
                    <div className="fw-semibold">{p.title}</div>
                    <div className="text-muted small">{p.category}</div>
                    <div className="fw-bold mt-1">{p.price}</div>
                    <button
                        className="btn btn-dark btn-sm mt-2 w-100"
                        onClick={() =>
                            window.open(
                                `http://localhost:5173/#/product-detail/bot/${p.id}`,
                                "_blank"
                            )
                        }
                    >
                        View Product
                    </button>
                </div>
            ))}
        </div>
    );

    const renderDetails = (p) => (
        <div className="product-card">
            {p.image && (
                <img
                    src={`http://localhost:8000${p.image}`}
                    alt={p.title}
                    className="product-img"
                />
            )}
            <div className="fw-bold">{p.title}</div>
            <div className="fw-bold mt-2">{p.price}</div>

            {p.rating && (
                <div className="small text-muted mt-1">
                    Rating: ⭐ {p.rating}
                </div>
            )}

            {p.keyPoints && (
                <ul className="small mt-2">
                    {p.keyPoints.map((k, i) => (
                        <li key={i}>{k}</li>
                    ))}
                </ul>
            )}

            <div className="small mt-2">{p.description}</div>

            <button
                className="btn btn-dark btn-sm w-100 mt-2"
                onClick={() =>
                    window.open(
                        `http://localhost:5173/#/product-detail/bot/${p.productId}`,
                        "_blank"
                    )
                }
            >
                View Product
            </button>
        </div>
    );

    const renderCompare = (payload) => (
        <div>
            <div className="row g-2">
                {[payload.product1, payload.product2].map((p, i) => (
                    <div key={i} className="col-6">
                        <div className="compare-card">
                            <div className="fw-semibold small">{p.title}</div>
                            <div className="fw-bold mt-1">{p.price}</div>
                            {p.rating && (
                                <div className="small text-muted">
                                    ⭐ {p.rating}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {payload.difference && (
                <div className="mt-3 fw-semibold text-center">
                    Price Difference: {payload.difference}
                </div>
            )}
        </div>
    );

    const renderField = (payload) => (
        <div className="field-card">
            <div className="fw-semibold text-capitalize">
                {payload.field}
            </div>
            <div className="fw-bold mt-1">{payload.value}</div>
        </div>
    );

    const renderClarification = (options) => (
        <div className="d-flex flex-column gap-2">
            <div>Please select the product:</div>
            {options.map((opt) => (
                <button
                    key={opt.id}
                    className="btn btn-outline-dark btn-sm"
                    onClick={() =>
                        sendMessage(`details:${opt.id}`)
                    }
                >
                    {opt.title}
                </button>
            ))}
        </div>
    );

    const renderBotContent = (payload) => {
        if (!payload) return null;

        switch (payload.type) {
            case "search":
            case "recommendation":
                return renderSearch(payload.products);

            case "details":
                return renderDetails(payload);

            case "compare":
                return renderCompare(payload);

            case "field":
                return renderField(payload);

            case "clarification":
                return renderClarification(payload.options);

            case "text":
            default:
                return <div>{payload.message}</div>;
        }
    };

    const themeClass = dark ? "dark-theme" : "light-theme";

    return (
        <>
            {!open && (
                <button className="chat-toggle-btn" onClick={() => setOpen(true)}>
                    <MessageCircle size={22} />
                </button>
            )}

            {open && (
                <div className={`chat-window ${themeClass}`}>
                    <div className="chat-header">
                        <div className="fw-semibold">SnapCart Assistant</div>
                        <div className="d-flex gap-2">
                            <button onClick={() => setDark(!dark)} className="icon-btn btn">
                                {dark ? <Sun size={18} /> : <Moon size={18} />}
                            </button>
                            <button onClick={() => setOpen(false)} className="icon-btn btn">
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="chat-body">
                        {messages.map((msg, i) => (
                            <div key={i} className="mb-3">
                                {msg.sender === "user" ? (
                                    <div className="user-wrapper">
                                        <div className="user-msg">{msg.text}</div>
                                    </div>
                                ) : (
                                    <div className="bot-msg">
                                        {renderBotContent(msg.payload)}
                                    </div>
                                )}
                            </div>
                        ))}

                        {loading && (
                            <div className="typing">
                                <Loader2 className="spin me-2" size={18} />
                                Typing...
                            </div>
                        )}

                        <div ref={bottomRef}></div>
                    </div>

                    <div className="chat-input">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            placeholder="Type your message..."
                        />
                        <button onClick={() => sendMessage()}>
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBot;