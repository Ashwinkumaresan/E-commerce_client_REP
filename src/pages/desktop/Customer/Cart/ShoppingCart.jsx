import { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { getCartItems, checkoutCart } from "./dummyCartApi"
import CartLoading from "../../../component/Loading/CartLoading"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { getAccessToken } from "../../../component/Localforage/LocalForage"
import CartEmpty from "../../../component/Cart Empty/CartEmpty"

export default function ShoppingCart() {
    const navigate = useNavigate()
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [checkoutLoading, setCheckoutLoading] = useState(false)

    const getToken = () => {
        const tokenOfDealerAdmin = localStorage.getItem("accessTokenDealer")
        const tokenOfCustomer  = localStorage.getItem("accessTokenCustomer")
        if (!tokenOfDealerAdmin && !tokenOfCustomer) {
            navigate("/")
        }
    }
    useEffect(()=>{
        getToken()
    },[])

    const fetchCartItems = async () => {
        try {
            setLoading(true)
            const token = await getAccessToken()
            console.log("Access Token:", token)
            const res = await axios.get(
                "https://api.lancer.drmcetit.com/api/Snapdeal/cart/list/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                }
            )
            console.log(res.data);
            if (res.data?.error === "Nothing in cart") {
                setCartItems([]); 
            } else {
                setCartItems(res.data); 
            }
        } catch (error) {
            console.error("Error fetching cart items:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCartItems()
    }, [])

    const updateQuantity = (id, delta) => {
        setCartItems((items) =>
            items.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        )
    }

    const removeItem = (id) => {
        setCartItems((items) => items.filter((item) => item.id !== id))
    }

    const calculateSubtotal = () => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }

    const handleCheckout = async () => {
        try {
            setCheckoutLoading(true)
            const res = await checkoutCart(cartItems)
            console.log(res)
            navigate("/product-cart-checkout")
        } catch (error) {
            console.error("Checkout failed:", error)
            alert("Checkout failed")
        } finally {
            setCheckoutLoading(false)
        }
    }

    if (loading) return <CartLoading />
    if (cartItems.length === 0) return <CartEmpty/>

    return (
        <div className="min-vh-100">
            <div className="container py-5">
                <h4 className="mb-3 fw-bold">Shopping Cart</h4>
                <div className="card shadow-sm border-0">
                    <div className="card-body p-4">
                        {cartItems.map((item, index) => (
                            <div key={item.id}>
                                <div className="row align-items-center py-4">
                                    <div className="col-lg-6 col-md-12 mb-3 mb-lg-0">
                                        <div className="d-flex align-items-center">
                                            <div
                                                className="bg-light rounded-3 me-3 flex-shrink-0"
                                                style={{ width: "100px", height: "100px" }}
                                            >
                                                <img
                                                    src={item.image ? `https://api.lancer.drmcetit.com${item.image}` : "/placeholder.svg"}
                                                    alt={item.productTitle}
                                                    className="img-fluid rounded-3"
                                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                />
                                            </div>
                                            <div>
                                                <h5
                                                    className="mb-1 fw-semibold"
                                                    style={{ cursor: "pointer", color: "#000" }}
                                                    // onClick={() => navigate("/product-detail")}
                                                    onClick={() => navigate(`/product-detail/${item.productId}`)}
                                                >
                                                    {item.productTitle}
                                                </h5>
                                                <p className="text-muted mb-2">${item.price.toFixed(2)}</p>
                                                <button
                                                    className="btn btn-link text-danger p-0 text-decoration-none"
                                                    onClick={() => removeItem(item.id)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-12">
                                        <div className="d-flex justify-content-lg-end justify-content-center">
                                            <div className="btn-group" role="group">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary btn-sm"
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    style={{ width: "40px" }}
                                                >
                                                    -
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary btn-sm"
                                                    disabled
                                                    style={{ width: "50px", cursor: "default" }}
                                                >
                                                    {item.quantity}
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary btn-sm"
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    style={{ width: "40px" }}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {index < cartItems.length - 1 && <hr className="my-0" />}
                            </div>
                        ))}

                        <div className="mt-4 pt-4 border-top">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="mb-0 text-muted">Subtotal</h5>
                                <h3 className="mb-0 fw-bold">${calculateSubtotal().toFixed(2)}</h3>
                            </div>
                            <button
                                className="btn btn-dark w-100 py-2"
                                onClick={handleCheckout}
                                disabled={checkoutLoading}
                            >
                                {checkoutLoading ? "Processing..." : "Checkout"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
