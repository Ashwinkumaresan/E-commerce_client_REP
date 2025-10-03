"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import "./checkout.css"
import CheckoutLoading from "../../../component/Loading/CheckoutLoading"
import { useNavigate } from "react-router-dom"
import OrderPlacedPage from "../Order Place/OrderPlacedPage"

// Dummy API functions
const getCartItems = async () => {
    // Simulate API call delay
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    name: "Stylish Jacket",
                    price: 60,
                    quantity: 2,
                    image: "/placeholder.svg",
                },
                {
                    id: 2,
                    name: "Running Shoes",
                    price: 40,
                    quantity: 1,
                    image: "/placeholder.svg",
                },
            ])
        }, 1000)
    )
}

const placeOrderApi = async (orderData) => {
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve({ success: true, message: "Order placed successfully!" })
        }, 1000)
    )
}

export default function CheckoutPage() {
    const navigate = useNavigate()
    const [deliveryOption, setDeliveryOption] = useState("standard")
    const [paymentMethod, setPaymentMethod] = useState("credit-card")
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [placingOrder, setPlacingOrder] = useState(false)
    const [orderPlaced, setOrderPlaced] = useState(false)

    useEffect(() => {
        const fetchCart = async () => {
            setLoading(true)
            try {
                const items = await getCartItems()
                setCartItems(items)
            } catch (error) {
                console.error("Error fetching cart items:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchCart()
    }, [])

    const calculateSubtotal = () => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }

    const handlePlaceOrder = async () => {
        setPlacingOrder(true)
        try {
            const orderData = {
                cartItems,
                deliveryOption,
                paymentMethod,
                total: calculateSubtotal(),
            }
            const res = await placeOrderApi(orderData)
            //alert(res.message)
            setCartItems([]) // clear cart after order
            //navigate("/product-order-placed")
            setOrderPlaced(true)
        } catch (error) {
            console.error("Error placing order:", error)
            alert("Failed to place order")
        } finally {
            setPlacingOrder(false)
        }
    }

    const scrollToTopAndHideScroll = () => {
        const scrollDuration = 500; // duration in ms
        const start = window.scrollY;
        const startTime = performance.now();

        const scrollStep = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / scrollDuration, 1);
            window.scrollTo(0, start * (1 - progress)); // linear interpolation

            if (progress < 1) {
                requestAnimationFrame(scrollStep);
            } else {
                // Scroll complete, hide scrollbar
                document.body.style.overflow = "hidden";
            }
        };

        requestAnimationFrame(scrollStep);
    };



    const handleOrderClick = () => {
        handlePlaceOrder();           // Call order function
        scrollToTopAndHideScroll();   // Call scroll & hide function
    };

    if (loading) {
        return <CheckoutLoading />
    }

    return (
        <>
            <div className="checkout-page">
                <div className="container py-5">
                    <h4 className="mb-3 fw-bold">Check Out</h4>

                    <div className="row g-4">
                        {/* Left Column - Checkout Form */}
                        <div className="col-lg-8">
                            {/* Shipping Address */}
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h2 className="h4 mb-0">Shipping Address</h2>
                                        <a href="#" className="text-dark text-decoration-none">
                                            Change
                                        </a>
                                    </div>
                                    <div className="address-box p-3 rounded">
                                        <p className="mb-1 fw-semibold">John Doe</p>
                                        <p className="mb-1 text-muted">123 Main Street</p>
                                        <p className="mb-1 text-muted">San Francisco, CA 94107</p>
                                        <p className="mb-0 text-muted">United States</p>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Options */}
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h2 className="h4 mb-4">Delivery Options</h2>

                                    <div
                                        className={`delivery-option p-3 rounded mb-3 ${deliveryOption === "standard" ? "selected" : ""
                                            }`}
                                        onClick={() => setDeliveryOption("standard")}
                                        role="button"
                                    >
                                        <div className="d-flex align-items-start">
                                            <input
                                                type="radio"
                                                name="delivery"
                                                checked={deliveryOption === "standard"}
                                                onChange={() => setDeliveryOption("standard")}
                                                className="form-check-input mt-1 me-3"
                                            />
                                            <div>
                                                <p className="mb-1 fw-semibold">Standard Delivery</p>
                                                <p className="mb-0 text-muted small">
                                                    Arrives in 5-7 business days
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className={`delivery-option p-3 rounded ${deliveryOption === "express" ? "selected" : ""
                                            }`}
                                        onClick={() => setDeliveryOption("express")}
                                        role="button"
                                    >
                                        <div className="d-flex align-items-start">
                                            <input
                                                type="radio"
                                                name="delivery"
                                                checked={deliveryOption === "express"}
                                                onChange={() => setDeliveryOption("express")}
                                                className="form-check-input mt-1 me-3"
                                            />
                                            <div>
                                                <p className="mb-1 fw-semibold">Express Delivery</p>
                                                <p className="mb-0 text-muted small">
                                                    Arrives in 2-3 business days
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="h4 mb-4">Payment Method</h2>

                                    {["credit-card", "upi", "cod"].map((method) => (
                                        <div
                                            key={method}
                                            className={`payment-option p-3 rounded mb-3 ${paymentMethod === method ? "selected" : ""
                                                }`}
                                            onClick={() => setPaymentMethod(method)}
                                            role="button"
                                        >
                                            <div className="d-flex align-items-center">
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    checked={paymentMethod === method}
                                                    onChange={() => setPaymentMethod(method)}
                                                    className="form-check-input me-3"
                                                />
                                                <p className="mb-0 fw-semibold">
                                                    {method === "credit-card"
                                                        ? "Credit Card"
                                                        : method === "upi"
                                                            ? "UPI"
                                                            : "Cash on Delivery"}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Order Summary */}
                        <div className="col-lg-4">
                            <div className="card position-sticky" style={{ top: "20px" }}>
                                <div className="card-body">
                                    <h2 className="h4 mb-4">Order Summary</h2>

                                    {cartItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="d-flex justify-content-between mb-2"
                                        >
                                            <span>{item.name} x {item.quantity}</span>
                                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}

                                    <div className="d-flex justify-content-between mb-3 pb-3 border-bottom">
                                        <span className="text-muted">Subtotal</span>
                                        <span className="fw-semibold">${calculateSubtotal().toFixed(2)}</span>
                                    </div>

                                    <div className="d-flex justify-content-between mb-4">
                                        <span className="h5 mb-0">Total</span>
                                        <span className="h5 mb-0 fw-bold">${calculateSubtotal().toFixed(2)}</span>
                                    </div>

                                    <button
                                        className="btn btn-dark w-100 py-2"
                                        onClick={handleOrderClick}
                                        disabled={placingOrder}
                                    >
                                        {placingOrder ? "Placing Order..." : "Place Order"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                orderPlaced &&
                <OrderPlacedPage />
            }
        </>
    )
}
