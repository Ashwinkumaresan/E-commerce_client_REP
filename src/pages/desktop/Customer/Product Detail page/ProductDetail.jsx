import { useState, useEffect } from "react"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import { Heart, ShoppingCart, Star, StarHalf } from "lucide-react"
import { getProductById } from "./dummyProductApi"
import { useNavigate } from "react-router-dom"
import ProductDetailLoading from "../../../component/Loading/ProductDetailLoading"

export default function ProductDetail( ) {
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [selectedImage, setSelectedImage] = useState(0)
    const [loading, setLoading] = useState(true)
    const productId = 1
    // Fetch product details from API
    const fetchProduct = async () => {
        try {
            setLoading(true)
            //const res = await axios.get(`/api/products/${productId}`) // Send productId in URL
            //setProduct(res.data)
            const res = await getProductById(productId);
            setProduct(res)
        } catch (error) {
            console.error("Error fetching product details:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [productId])

    // Add to cart API
    const handleAddToCart = async () => {
        navigate("/shopping-cart")
        // try {
        //     const res = await axios.post("/api/cart/add", {
        //         productId: product.id,
        //         quantity: quantity,
        //     })
        //     console.log("Added to cart:", res.data)
        //     alert("Product added to cart!")
        // } catch (error) {
        //     console.error("Error adding to cart:", error)
        //     alert("Failed to add product to cart")
        // }
    }

    // Buy now API
    const handleBuyNow = async () => {
        try {
            // const res = await axios.post("/api/order/buy-now", {
            //     productId: product.id,
            //     quantity: quantity,
            // })
            // console.log("Order placed:", res.data)
            //alert("Order placed successfully!")
            navigate("/product-cart-checkout")
            // Optionally, redirect to order confirmation page
        } catch (error) {
            console.error("Error placing order:", error)
            alert("Failed to place order")
        }
    }

    const renderStars = (rating) => {
        const stars = []
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating % 1 !== 0

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={i} size={16} fill="#000000ff" color="#000000ff" />)
        }
        if (hasHalfStar) {
            stars.push(<StarHalf key="half" size={16} fill="#000000ff" color="#000000ff" />)
        }
        for (let i = stars.length; i < 5; i++) {
            stars.push(<Star key={i} size={16} color="#d1d5db" />)
        }
        return stars
    }

    if (loading) {
        //return <div className="text-center py-5">Loading product details...</div>
        return <ProductDetailLoading/>
    }

    if (!product) {
        return <div className="text-center py-5 text-danger">Product not found.</div>
    }

    return (
        <div className="min-vh-100 d-flex flex-column">
            <div className="container py-4 flex-grow-1">
                <div className="row g-4">
                    {/* Product Images */}
                    <div className="col-lg-6">
                        <div className="card border-0 shadow-sm mb-3">
                            <div className="position-relative" style={{ paddingTop: "125%" }}>
                                <img
                                    src={product.images[selectedImage] || "/placeholder.svg"}
                                    alt="Product"
                                    className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover rounded"
                                />
                            </div>
                        </div>
                        <div className="row g-2">
                            {product.images.map((img, idx) => (
                                <div key={idx} className="col-3">
                                    <div
                                        className={`card border ${selectedImage === idx ? "border-dark border-2" : "border-light"
                                            }`}
                                        onClick={() => setSelectedImage(idx)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <img
                                            src={img || "/placeholder.svg"}
                                            alt={`Thumbnail ${idx + 1}`}
                                            className="card-img-top"
                                            style={{ aspectRatio: "1/1", objectFit: "cover" }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="col-lg-6">
                        <h1 className="fw-bold mb-3">{product.name}</h1>
                        <p className="text-muted mb-3">{product.description}</p>

                        <div className="d-flex align-items-center gap-2 mb-3">
                            <div className="d-flex gap-1">{renderStars(product.rating)}</div>
                            <span className="text-muted">({product.reviewCount} Reviews)</span>
                        </div>

                        <div className="mb-4">
                            <span className="h2 fw-bold me-2">Rs. {product.price}</span>
                            {product.originalPrice && (
                                <span className="text-muted text-decoration-line-through">Rs. {product.originalPrice}</span>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-semibold">Quantity:</label>
                            <div className="d-flex align-items-center gap-2">
                                <button className="btn btn-outline-secondary" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                                    −
                                </button>
                                <input
                                    type="text"
                                    className="form-control text-center"
                                    style={{ width: "80px" }}
                                    value={quantity}
                                    readOnly
                                />
                                <button className="btn btn-outline-secondary" onClick={() => setQuantity(quantity + 1)}>
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="d-flex gap-3">
                            <button
                                className="btn btn-dark flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                                onClick={handleAddToCart}
                            >
                                <ShoppingCart size={20} />
                                Add to Cart
                            </button>
                            <button
                                className="btn btn-outline-dark flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                                onClick={handleBuyNow}
                            >
                                <ShoppingCart size={20} />
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Customer Reviews */}
                {product.reviews?.length > 0 && (
                    <div className="mt-5">
                        <h2 className="fw-bold mb-4">Customer Reviews</h2>
                        <div className="row g-4">
                            <div className="col-lg-4">
                                <div className="text-center">
                                    <div className="display-3 fw-bold">{product.averageRating}</div>
                                    <div className="d-flex justify-content-center gap-1">{renderStars(product.averageRating)}</div>
                                    <p className="text-muted">Based on {product.reviewCount} reviews</p>
                                </div>
                            </div>

                            <div className="col-lg-8">
                                {product.reviews.map((review, idx) => (
                                    <div key={idx} className="card border-0 shadow-sm mb-3">
                                        <div className="card-body">
                                            <div className="d-flex gap-3">
                                                <img
                                                    src={review.avatar || "/placeholder.svg"}
                                                    alt={review.name}
                                                    className="rounded-circle"
                                                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                                />
                                                <div className="flex-grow-1">
                                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                                        <div>
                                                            <h6 className="fw-bold mb-0">{review.name}</h6>
                                                            <small className="text-muted">{review.date}</small>
                                                        </div>
                                                        <div className="d-flex gap-1">{renderStars(review.rating)}</div>
                                                    </div>
                                                    <p className="mb-0 text-muted">{review.text}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="bg-light py-4 mt-5">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                        <p className="mb-0 text-muted">© 2025 StyleHub. All rights reserved.</p>
                        <div className="d-flex gap-4">
                            <a href="#" className="text-decoration-none text-muted">
                                About
                            </a>
                            <a href="#" className="text-decoration-none text-muted">
                                Contact
                            </a>
                            <a href="#" className="text-decoration-none text-muted">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-decoration-none text-muted">
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
