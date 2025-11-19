import React from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronRight, FaLock, FaShieldAlt, FaUser, FaEnvelope, FaPhone, FaKey, FaTrash } from "react-icons/fa";

export default function LoginSecurity() {
    const navigate = useNavigate();

    const rowStyle = {
        background: "#fff",
        borderRadius: "10px",
        padding: "16px",
        border: "1px solid #eee",
        marginBottom: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    };

    const leftStyle = {
        display: "flex",
        alignItems: "center",
        gap: "12px"
    };

    const iconStyle = {
        fontSize: "1.3rem",
        color: "#000",
        opacity: 0.7
    };

    const labelStyle = {
        fontSize: "0.85rem",
        color: "#777",
        marginBottom: "2px"
    };

    const valueStyle = {
        fontSize: "1rem",
        fontWeight: "500",
        color: "#000"
    };

    return (
        <div className="container py-4" style={{ minHeight: "100vh" }}>

            {/* HEADER */}
            <h3 className="fw-bold mb-4">Login & Security</h3>

            {/* SECTION 1 – BASIC INFO */}
            <h5 className="fw-bold mb-3">Your Profile</h5>

            {/* Name */}
            <div style={rowStyle}>
                <div style={leftStyle}>
                    <FaUser style={iconStyle} />
                    <div>
                        <p style={labelStyle}>Name</p>
                        <p style={valueStyle}>Ashwin K</p>
                    </div>
                </div>
                <FaChevronRight />
            </div>

            {/* Phone */}
            <div style={rowStyle}>
                <div style={leftStyle}>
                    <FaPhone style={iconStyle} />
                    <div>
                        <p style={labelStyle}>Mobile Number</p>
                        <p style={valueStyle}>+91 •••••• 4231</p>
                    </div>
                </div>
                <FaChevronRight />
            </div>

            {/* Email */}
            <div style={rowStyle}>
                <div style={leftStyle}>
                    <FaEnvelope style={iconStyle} />
                    <div>
                        <p style={labelStyle}>Email</p>
                        <p style={valueStyle}>ashw****@gmail.com</p>
                    </div>
                </div>
                <FaChevronRight />
            </div>

            {/* Password */}
            <div style={rowStyle}>
                <div style={leftStyle}>
                    <FaKey style={iconStyle} />
                    <div>
                        <p style={labelStyle}>Password</p>
                        <p style={valueStyle}>••••••••</p>
                    </div>
                </div>
                <FaChevronRight />
            </div>

            {/* SECTION 2 – SECURITY */}
            <h5 className="fw-bold mt-4 mb-3">Security Settings</h5>

            {/* 2FA */}
            <div style={rowStyle}>
                <div style={leftStyle}>
                    <FaShieldAlt style={iconStyle} />
                    <div>
                        <p style={labelStyle}>Two-Step Verification</p>
                        <p style={valueStyle}>Enabled</p>
                    </div>
                </div>
                <FaChevronRight />
            </div>

            {/* Login Activity */}
            <div style={rowStyle}>
                <div style={leftStyle}>
                    <FaLock style={iconStyle} />
                    <div>
                        <p style={labelStyle}>Login Activity</p>
                        <p style={valueStyle}>View recent logins</p>
                    </div>
                </div>
                <FaChevronRight />
            </div>

            {/* Connected Accounts */}
            <div style={rowStyle}>
                <div style={leftStyle}>
                    <FaUser style={iconStyle} />
                    <div>
                        <p style={labelStyle}>Linked Accounts</p>
                        <p style={valueStyle}>Google, Facebook</p>
                    </div>
                </div>
                <FaChevronRight />
            </div>

            {/* Delete Account */}
            <div style={{ ...rowStyle, border: "1px solid #ffcccc" }}>
                <div style={leftStyle}>
                    <FaTrash style={{ fontSize: "1.3rem", color: "#c00" }} />
                    <div>
                        <p style={{ ...labelStyle, color: "#c00" }}>Delete Account</p>
                        <p style={{ ...valueStyle, color: "#c00" }}>Permanently remove account</p>
                    </div>
                </div>
                <FaChevronRight color="#c00" />
            </div>
        </div>
    );
}
