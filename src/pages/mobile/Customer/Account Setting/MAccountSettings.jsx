import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    FaUserShield, FaMapMarkerAlt, FaUsers, FaBook,
    FaMobileAlt, FaShoppingCart, FaCrown, FaClipboardList,
    FaStore, FaBriefcase, FaHistory, FaEye, FaBell,
    FaHeart, FaSlidersH, FaFolderOpen, FaThumbsUp, FaChild,
    FaChevronRight,
    FaMailBulk
} from "react-icons/fa";

export const MAccountSettings = () => {

    const navigate = useNavigate("");
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryAPI, setCategoryAPI] = useState([]);
    const [tokenDealerAdmin, setTokenDealerAdmin] = useState(false);
    const [tokenCustomer, setTokenCustomer] = useState(true);
    const [commonToken, setCommonToken] = useState(true);
    const [cartCount, setCartCount] = useState("0");
    const [openPopUp, setOpenPopUp] = useState(false);

    // Disable scroll when popup open
    useEffect(() => {
        document.body.style.overflow = openPopUp ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto");
    }, [openPopUp]);

    const getToken = () => {
        const tokenOfDealerAdmin = localStorage.getItem("accessTokenDealer");
        if (tokenOfDealerAdmin) setTokenDealerAdmin(true);

        const tokenOfCustomer = localStorage.getItem("accessTokenCustomer");
        if (tokenOfCustomer) setTokenCustomer(false);

        if (tokenOfCustomer || tokenOfDealerAdmin) setCommonToken(false);
    };

    const fetchCategory = async () => {
        try {
            const res = await axios.get("https://api.lancer.drmcetit.com/api/Snapdeal/category/");
            setCategoryAPI(res.data);
        } catch (e) {
            console.log(e);
        }
    };

    const fetchCartCount = async () => {
        const token = localStorage.getItem("accessTokenCustomer");
        if (!token) return;

        try {
            const res = await axios.get(
                "https://api.lancer.drmcetit.com/api/Snapdeal/cart/count/",
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCartCount(res.data.count);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getToken();
        fetchCategory();
        fetchCartCount();
    }, []);

    const listRow = {
        padding: "12px 10px",
        background: "#fff",
        borderBottom: "1px solid #f0f0f0",
        borderRadius: "8px",
        marginBottom: "8px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    };

    const iconStyle = {
        fontSize: "1.2rem",
        marginRight: "12px",
        color: "rgba(7, 7, 7, 0.2)"
    };

    const accountItems = [
        { icon: <FaUserShield />, title: "Login & Security", path: "/settings/login-security" },
        { icon: <FaMapMarkerAlt />, title: "Your Addresses", path: "/settings/addresses" },
        { icon: <FaUsers />, title: "Manage Your Family", path: "/settings/family" },
        { icon: <FaBook />, title: "Content Library", path: "/settings/content" },
        { icon: <FaMobileAlt />, title: "Devices", path: "/settings/devices" },
        { icon: <FaShoppingCart />, title: "Default Purchase Settings", path: "/settings/purchase-settings" },
        { icon: <FaCrown />, title: "Premium Membership", path: "/settings/premium" },
        { icon: <FaClipboardList />, title: "Subscriptions", path: "/settings/subscriptions" },
        { icon: <FaStore />, title: "Seller Account", path: "/settings/seller" },
        { icon: <FaBriefcase />, title: "Business Account", path: "/settings/business" },
        { icon: <FaHistory />, title: "Purchase History", path: "/settings/purchase-history" },
        { icon: <FaEye />, title: "Recently Viewed", path: "/settings/recently-viewed" },
        { icon: <FaMailBulk />, title: "SMS Alerts", path: "/settings/alerts" },
    ];

    const personalItems = [
        { icon: <FaHeart />, title: "Wish List", path: "/settings/wishlist" },
        { icon: <FaSlidersH />, title: "Shopping Preferences", path: "/settings/preferences" },
        { icon: <FaFolderOpen />, title: "Your Content", path: "/settings/your-content" },
        { icon: <FaThumbsUp />, title: "Recommendations", path: "/settings/recommendations" },
        { icon: <FaChild />, title: "Kids’ Store", path: "/settings/kids-store" },
    ];


    return (
        <>
            <div className="min-vh-100 bg-light">

                {/* HEADER */}
                <header className="bg-white border-bottom">
                    <div className="container-fluid py-3">
                        <div className="d-flex align-items-center justify-content-between">

                            {/* Logo */}
                            <div className="d-flex align-items-center gap-2">
                                <i className="bi bg-dark rounded bg-opacity-10 p-1 bi-shop text-dark fs-6"></i>
                                <h5 className="mb-0 fw-bold">What a Market!</h5>
                            </div>

                            {/* Header Right Buttons */}
                            <div className="d-flex align-items-center gap-4">
                                <Link to="/product-orders">
                                    <i className="bi bi-box-seam fs-5 text-secondary"></i>
                                </Link>

                                <Link to="/shopping-cart">
                                    <span className="position-relative">
                                        <i className="bi bi-cart3 fs-5 text-secondary"></i>
                                        {!tokenCustomer && (
                                            <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                                                {cartCount}
                                            </span>
                                        )}
                                    </span>
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

                    {/* Location */}
                    <div className="container-fluid bg-light py-2">
                        <button className="btn btn-sm btn-link text-decoration-none text-secondary">
                            <i className="bi bi-geo-alt me-1"></i> Pollachi
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="container-fluid px-3 pb-3">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="btn btn-outline-secondary">
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                </header>

                {/* NAVBAR */}
                <nav className="bg-white border-bottom">
                    <div className="container-fluid">
                        <div className="d-flex overflow-auto flex-nowrap py-2">
                            <ul className="nav flex-nowrap">
                                {categoryAPI.map((category) => (
                                    <li className="nav-item" key={category.id}>
                                        <Link
                                            className="nav-link text-dark text-nowrap"
                                            to={`/product-detail/category/${category.category}`}
                                            state={{ id: category.id }}
                                        >
                                            {category.category}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            {tokenDealerAdmin && (
                                <Link to={"/dealer-admin-page"} className="btn btn-dark ms-3">
                                    Admin
                                </Link>
                            )}
                        </div>
                    </div>
                </nav>

                {/* MAIN CONTENT */}
                <div className="container-fluid p-3">

                    <h5 className="fw-bold mb-3">Account Settings</h5>
                    {accountItems.map((item, index) => (
                        <div key={index} style={listRow} onClick={() => navigate(item.path)}>
                            <div className="d-flex align-items-center">
                                <span style={iconStyle}>{item.icon}</span>
                                {item.title}
                            </div>
                            <FaChevronRight color="#777" />
                        </div>
                    ))}


                    <h5 className="fw-bold mt-4 mb-3">Personalization</h5>
                    {personalItems.map((item, index) => (
                        <div
                            key={index}
                            style={listRow}
                            onClick={() => navigate(item.link)}
                            className="cursor-pointer"
                        >
                            <div className="d-flex align-items-center">
                                <span style={iconStyle}>{item.icon}</span>
                                {item.title}
                            </div>
                            <FaChevronRight color="#777" />
                        </div>
                    ))}


                </div>
            </div>

            {/* SIGN-IN POPUP */}
            {openPopUp && (
                <div className="w-100 h-100 bg-dark bg-opacity-25 backdrop-blur position-fixed top-0 start-0 d-flex justify-content-center align-items-center" style={{ zIndex: 999 }}>
                    <div className="bg-white p-4 rounded shadow" style={{ width: "90%", maxWidth: "400px" }}>
                        <h4 className="text-center fw-bold mb-3">Sign In As</h4>

                        <div className="row g-3">
                            <div className="col-6">
                                <div className="border rounded p-3 text-center" style={{ cursor: "pointer" }}
                                    onClick={() => navigate("/dealer-signin")}>
                                    <h6>Dealer</h6>
                                    <i className="bi bi-shop fs-1"></i>
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="border rounded p-3 text-center" style={{ cursor: "pointer" }}
                                    onClick={() => navigate("/customer-signin")}>
                                    <h6>Customer</h6>
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
        </>
    );
};
