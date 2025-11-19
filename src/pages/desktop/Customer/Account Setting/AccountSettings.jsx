import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import {
    FaUserShield, FaMapMarkerAlt, FaUsers, FaBook,
    FaMobileAlt, FaShoppingCart, FaCrown, FaClipboardList,
    FaStore, FaBriefcase, FaHistory, FaEye, FaBell,
    FaHeart, FaSlidersH, FaFolderOpen, FaThumbsUp, FaChild,
    FaMailBulk
} from "react-icons/fa";
import { ImageClassification } from "../ImageClassification/ImageClassification";


export default function AccountSettings() {
    const navigate = useNavigate();

    // -------------------------------------------
    // SAME STATES FROM HOME PAGE
    // -------------------------------------------
    const [searchQuery, setSearchQuery] = useState("");
    const [openPopUp, setOpenPopUp] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const [tokenDealerAdmin, setTokenDealerAdmin] = useState(false);
    const [tokenCustomer, setTokenCustomer] = useState(true);
    const [commonToken, setCommonToken] = useState(true);
    const [cartCount, setCartCount] = useState("0");

    const [categoryAPI, setCategoryAPI] = useState([]);

    // -------------------------------------------
    // GET TOKENS (same logic)
    // -------------------------------------------
    const getToken = () => {
        const tokenOfDealerAdmin = localStorage.getItem("accessTokenDealer");
        if (tokenOfDealerAdmin) setTokenDealerAdmin(true);

        const tokenOfCustomer = localStorage.getItem("accessTokenCustomer");
        if (tokenOfCustomer) setTokenCustomer(false);

        if (tokenOfCustomer || tokenOfDealerAdmin) setCommonToken(false);
    };

    // -------------------------------------------
    // CART COUNT (same)
    // -------------------------------------------
    const fetchCartCount = async () => {
        const token = localStorage.getItem("accessTokenCustomer");
        try {
            const response = await axios.get(
                "https://api.lancer.drmcetit.com/api/Snapdeal/cart/count/",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setCartCount(response.data.count);
        } catch (err) {
            console.log(err);
        }
    };

    // -------------------------------------------
    // FETCH CATEGORY (same)
    // -------------------------------------------
    const fetchCategory = async () => {
        try {
            const res = await axios.get(
                "https://api.lancer.drmcetit.com/api/Snapdeal/category/"
            );
            setCategoryAPI(res.data);
        } catch (e) {
            console.log(e);
        }
    };

    // -------------------------------------------
    // ON MOUNT
    // -------------------------------------------
    useEffect(() => {
        getToken();
        fetchCartCount();
        fetchCategory();
    }, []);

    // -------------------------------------------
    // POPUP BODY SCROLL LOCK
    // -------------------------------------------
    useEffect(() => {
        document.body.style.overflow = openPopUp ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto");
    }, [openPopUp]);

    // -------------------------------------------
    // ACCOUNT SETTINGS ITEMS
    // -------------------------------------------
    const accountItems = [
        { icon: <FaUserShield />, title: "Login & Security", path: "/settings/login-security" },
        { icon: <FaMapMarkerAlt />, title: "Your Addresses", path: "/settings/addresses" },
        { icon: <FaUsers />, title: "Manage Your Family", path: "/settings/family" },
        { icon: <FaBook />, title: "Content Library", path: "/settings/content-library" },
        { icon: <FaMobileAlt />, title: "Devices", path: "/settings/devices" },
        { icon: <FaShoppingCart />, title: "Default Purchase Settings", path: "/settings/purchase-settings" },
        { icon: <FaCrown />, title: "Manage Premium Membership", path: "/settings/premium" },
        { icon: <FaClipboardList />, title: "Memberships & Subscriptions", path: "/settings/subscriptions" },
        { icon: <FaStore />, title: "Manage Your Seller Account", path: "/settings/seller-account" },
        { icon: <FaBriefcase />, title: "Create Business Account", path: "/settings/business" },
        { icon: <FaHistory />, title: "Review Purchases", path: "/settings/purchase-history" },
        { icon: <FaEye />, title: "Recently Viewed Items", path: "/settings/recently-viewed" },
        { icon: <FaMailBulk />, title: "Email Alert Preferences", path: "/settings/email-alerts" },
    ];

    const personalizationItems = [
        { icon: <FaHeart />, title: "Wish List", path: "/settings/wishlist" },
        { icon: <FaSlidersH />, title: "Shopping Preferences", path: "/settings/preferences" },
        { icon: <FaFolderOpen />, title: "Your Content", path: "/settings/content" },
        { icon: <FaThumbsUp />, title: "Recommendations", path: "/settings/recommendations" },
        { icon: <FaChild />, title: "Kids Store by Age", path: "/settings/kids-store" },
    ];


    return (
        <>
            <div className="min-vh-100 bg-light">

                {/* --------------------------------------------- */}
                {/*                 HEADER                        */}
                {/* --------------------------------------------- */}
                <header className="bg-white border-bottom">
                    <div className="container-fluid py-3">
                        <div className="row g-3 align-items-center">

                            {/* Logo */}
                            <div className="col-12 col-md-auto">
                                <div className="d-flex align-items-center gap-2">
                                    <div className="bg-dark bg-opacity-10 p-2 rounded">
                                        <i className="bi bi-shop text-dark fs-5"></i>
                                    </div>
                                    <h5 className="fw-bold m-0">What a Market!</h5>
                                </div>
                            </div>

                            {/* Search Bar */}
                            <div className="col-12 col-md">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={() => setShowPopup(true)}
                                    >
                                        <i className="bi bi-camera"></i>
                                    </button>
                                    <button className="btn btn-outline-secondary">
                                        <i className="bi bi-search"></i>
                                    </button>
                                </div>
                            </div>

                            {/* Right Buttons */}
                            <div className="col-12 col-md-auto">
                                <div className="d-flex align-items-center gap-3">

                                    <button className="btn btn-link text-secondary p-1" onClick={() => navigate("/product-orders")}>
                                        <i className="bi bi-box-seam me-1"></i>
                                        <span className="d-none d-lg-inline">Orders</span>
                                    </button>

                                    <button className="btn btn-link text-secondary p-1" onClick={() => localStorage.clear()}>
                                        <i className="bi bi-heart me-1"></i>
                                        <span className="d-none d-lg-inline">Favorites</span>
                                    </button>

                                    <Link to={"/shopping-cart"}>
                                        <button className="btn btn-link text-secondary position-relative p-1">
                                            <i className="bi bi-cart3 me-1"></i>
                                            <span className="d-none d-lg-inline">Cart</span>

                                            {!tokenCustomer && (
                                                <span className="position-absolute top-0 start-100 translate-middle badge bg-danger">
                                                    {cartCount}
                                                </span>
                                            )}
                                        </button>
                                    </Link>

                                    {commonToken && (
                                        <button className="btn btn-dark btn-sm" onClick={() => setOpenPopUp(true)}>
                                            <span className="d-none d-sm-inline">Sign In</span>
                                            <i className="bi bi-person d-sm-none"></i>
                                        </button>
                                    )}
                                    {!commonToken &&
                                        <button className="btn btn-dark btn-sm" onClick={() => navigate("/account-setting")}>
                                            <i className="bi bi-person"></i>
                                        </button>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container-fluid bg-light py-2">
                        <button className="btn btn-sm btn-link text-secondary">
                            <i className="bi bi-geo-alt me-1"></i>
                            Pollachi
                        </button>
                    </div>
                </header>

                {/* --------------------------------------------- */}
                {/*                CATEGORY NAV                   */}
                {/* --------------------------------------------- */}
                <nav className="bg-white border-bottom">
                    <div className="container-fluid">
                        <div className="d-flex align-items-center py-2">

                            <div className="overflow-auto flex-grow-1">
                                <ul className="nav flex-nowrap">
                                    {categoryAPI.map((cat) => (
                                        <li className="nav-item" key={cat.id}>
                                            <Link
                                                className="nav-link text-dark text-nowrap"
                                                to={`/product-detail/category/${cat.category}`}
                                                state={{ id: cat.id }}
                                            >
                                                {cat.category}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {tokenDealerAdmin && (
                                <Link to={"/dealer-admin-page"} className="btn btn-dark">
                                    Admin
                                </Link>
                            )}

                        </div>
                    </div>
                </nav>

                {/* setting  */}
                <Container className="py-4">
                    <h3 className="fw-bold mb-4">Account Settings</h3>

                    <Row xs={1} sm={2} md={3} lg={4}>
                        {accountItems.map((item, i) => (
                            <Col key={i} className="mb-4">
                                <Link to={item.path} className="text-decoration-none">
                                    <div className="p-3 bg-white shadow-sm rounded text-center h-100">
                                        <div style={{ fontSize: "2rem", color: "#ccc" }}>{item.icon}</div>
                                        <h6 className="mt-2 fw-semibold text-dark">{item.title}</h6>
                                    </div>
                                </Link>
                            </Col>
                        ))}
                    </Row>


                    <h3 className="fw-bold mt-4 mb-4">Personalization</h3>

                    <Row xs={1} sm={2} md={3} lg={4}>
                        {personalizationItems.map((item, i) => (
                            <Col key={i} className="mb-4">
                                <Link to={item.path} className="text-decoration-none">
                                    <div className="p-3 bg-white shadow-sm rounded text-center h-100">
                                        <div style={{ fontSize: "2rem", color: "#ccc" }}>{item.icon}</div>
                                        <h6 className="mt-2 fw-semibold text-dark">{item.title}</h6>
                                    </div>
                                </Link>
                            </Col>
                        ))}
                    </Row>

                </Container>
            </div>

            {/* Signin */}
            {openPopUp && (
                <div className="w-100 h-100 bg-dark bg-opacity-10 position-fixed top-0 start-0 d-flex justify-content-center align-items-center" style={{ zIndex: 999 }}>
                    <div className="bg-white p-4 rounded shadow" style={{ maxWidth: "500px", width: "90%" }}>
                        <div className="text-center mb-4">
                            <h2 className="fw-bold">Sign In As</h2>
                            <p>Select your role to continue</p>
                        </div>

                        <div className="row g-3">
                            <div className="col-6">
                                <div className="border rounded p-4 text-center" style={{ cursor: "pointer" }} onClick={() => navigate("/dealer-signin")}>
                                    <h5>Dealer</h5>
                                    <i className="bi bi-shop fs-1"></i>
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="border rounded p-4 text-center" style={{ cursor: "pointer" }} onClick={() => navigate("/customer-signin")}>
                                    <h5>Customer</h5>
                                    <i className="bi bi-person fs-1"></i>
                                </div>
                            </div>
                        </div>

                        <button className="btn btn-outline-dark w-100 mt-3" onClick={() => setOpenPopUp(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Camera */}
            {showPopup && (
                <ImageClassification
                    onClose={() => setShowPopup(false)}
                    onResult={(result) => {
                        setSearchQuery(result);
                        setShowPopup(false);
                    }}
                />
            )}
        </>
    );
}
