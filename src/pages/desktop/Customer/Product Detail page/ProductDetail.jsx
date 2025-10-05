import { useState, useEffect } from "react"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import { ShoppingCart, Star, StarHalf } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import ProductDetailLoading from "../../../component/Loading/ProductDetailLoading"
import ProductNotFound from "../../../component/Product Not Found/ProductNotFound "

export default function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [selectedImage, setSelectedImage] = useState(0)
    const [loading, setLoading] = useState(true)
    const [cartLoading, setCartLoading] = useState(false);



    const fetchProduct = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`https://api.lancer.drmcetit.com/api/Snapdeal/product/${id}`)
            console.log("Full API response:", res.data)

            // Pick the first product in the array
            const productData = res.data

            console.log("Fetched product title:", productData.title)
            setProduct(productData)
        } catch (error) {
            console.error("Error fetching product details:", error)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        fetchProduct()
    }, [id])

    const handleAddToCart = async () => {
        try {
            setCartLoading(true); 
            const token = localStorage.getItem("accessTokenCustomer");
            const res = await axios.post(
                `https://api.lancer.drmcetit.com/api/Snapdeal/cart/add/${id}/`,{quantity},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type" : "application/json"
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


    const handleBuyNow = () => {
        navigate("/product-cart-checkout")
    }

    const renderStars = (rating) => {
        const stars = []
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating % 1 !== 0

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={i} size={16} fill="#000" color="#000" />)
        }
        if (hasHalfStar) {
            stars.push(<StarHalf key="half" size={16} fill="#000" color="#000" />)
        }
        for (let i = stars.length; i < 5; i++) {
            stars.push(<Star key={i} size={16} color="#d1d5db" />)
        }
        return stars
    }

    if (loading) {
        return <ProductDetailLoading />
    }

    if (!product) {
        return <ProductNotFound/>
    }

    return (
        <div className="min-vh-100 d-flex flex-column">
            <div className="container py-4 flex-grow-1 mt-5">
                <div className="row g-4">
                    {/* Product Images */}
                    <div className="col-lg-6">
                        <div className="card border-0 shadow-sm mb-3">
                            <div className="position-relative">
                                <img
                                    src={product.image ? `https://api.lancer.drmcetit.com${product.image}` : "/placeholder.svg"}
                                    alt={product.title || "Product"}
                                    className="img-fluid my-3"
                                />
                            </div>
                        </div>
                        {product.images?.length > 0 && (
                            <div className="row g-2">
                                {product.images.map((img, idx) => (
                                    <div key={idx} className="col-3">
                                        <div
                                            className={`card border ${selectedImage === idx ? "border-dark border-2" : "border-light"}`}
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
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="col-lg-6">
                        <h1 className="fw-bold mb-3">{product.title}</h1>
                        <p className="text-muted mb-3">{product.description}</p>

                        <div className="d-flex align-items-center gap-2 mb-3">
                            <div className="d-flex gap-1">{renderStars(product.rating)}</div>
                            <span className="text-muted">({product.review?.length || 0} Reviews)</span>
                        </div>

                        <div className="mb-4">
                            <span className="h2 fw-bold me-2">Rs. {product.offerPrice || product.price}</span>
                            {product.offer && (
                                <span className="text-muted text-decoration-line-through">Rs. {product.price}</span>
                            )}
                            {product.offer && (
                                <span className="badge bg-success ms-2">{product.offer}% OFF</span>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-semibold">Quantity:</label>
                            <div className="d-flex align-items-center gap-2">
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                >
                                    −
                                </button>
                                <input
                                    type="text"
                                    className="form-control text-center"
                                    style={{ width: "80px" }}
                                    value={quantity}
                                    readOnly
                                />
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="d-flex gap-3">
                            <button
                                className="btn btn-outline-dark flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                                onClick={handleAddToCart}
                                disabled={cartLoading}
                            >
                                {cartLoading ? (
                                    <span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                ) : (
                                    <ShoppingCart size={20} />
                                )}
                                Add to Cart
                            </button>
                            <button
                                className="btn btn-dark flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                                onClick={handleBuyNow}
                            >
                                <ShoppingCart size={20} />
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product Features (Others) */}
                {product.others && Object.keys(product.others).length > 0 && (
                    <div className="mt-5">
                        <h2 className="fw-bold mb-4">Features</h2>
                        <div className="row g-4">
                            <div className="col-12 col-lg-6">
                                {Object.entries(product.others).map(([key, value], idx) => (
                                    <div key={idx} className="card border-0 shadow-sm mb-3">
                                        <div className="card-body d-flex justify-content-between">
                                            <span className="fw-semibold">{key}</span>
                                            <span className="text-muted">{value}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}


                {/* Customer Reviews */}
                {product.review?.length > 0 && (
                    <div className="mt-5">
                        <h2 className="fw-bold mb-4">Customer Reviews</h2>
                        <div className="row g-4">
                            <div className="col-lg-12">
                                {product.review.map((text, idx) => (
                                    <div key={idx} className="card border-0 shadow-sm mb-3">
                                        <div className="card-body">
                                            <p className="mb-0 text-muted">{text}</p>
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
                        <p className="mb-0 text-muted">© 2025 Snapdeal. All rights reserved.</p>
                        <div className="d-flex gap-4">
                            <a href="#" className="text-decoration-none text-muted">About</a>
                            <a href="#" className="text-decoration-none text-muted">Contact</a>
                            <a href="#" className="text-decoration-none text-muted">Privacy Policy</a>
                            <a href="#" className="text-decoration-none text-muted">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
