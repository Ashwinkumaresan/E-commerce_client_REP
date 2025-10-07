import { useState, useMemo, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import ProductGrid from "../../component/Loading/ProductGrid"
import axios from "axios"
import ProductNotFound from "../../component/Product Not Found/ProductNotFound "

export const Home = () => {
    const navigate = useNavigate("")
    const [viewMode, setViewMode] = useState("grid")
    const [sortBy, setSortBy] = useState("featured")
    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")
    const [showFilters, setShowFilters] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    const [selectedMaterials, setSelectedMaterials] = useState([])
    const [selectedFits, setSelectedFits] = useState([])
    const [selectedSleeves, setSelectedSleeves] = useState([])
    const [selectedPatterns, setSelectedPatterns] = useState([])
    const [selectedBrands, setSelectedBrands] = useState([])
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [openPopUp, setOpenPopUp] = useState(false)

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [tokenDealerAdmin, setTokenDealerAdmin] = useState(false)
    const [tokenCustomer, setTokenCustomer] = useState(true)
    const [commonToken, setCommonToken] = useState(true)

    const [cartCount, setCartCount] = useState("0")

    useEffect(() => {
        if (openPopUp) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [openPopUp]);

    const categories = [
        "Best Sellers",
        "New Releases",
        "Books",
        "Computers",
        "Fashion",
        "Health",
        "Pharmacy",
        "Toys & Games",
    ]

    const filterOptions = useMemo(() => {
        const materials = new Set();
        const fits = new Set();
        const sleeves = new Set();
        const patterns = new Set();
        const brands = new Set();
        const colors = new Set();
        const categories = new Set();

        products.forEach((product) => {
            if (product.others) {
                if (product.others.material) materials.add(product.others.material);
                if (product.others.fit) fits.add(product.others.fit);
                if (product.others.sleeve) sleeves.add(product.others.sleeve);
                if (product.others.pattern) patterns.add(product.others.pattern);
            }

            if (product.brand) brands.add(product.brand);
            if (product.color) colors.add(product.color);
            if (product.category) categories.add(product.category);
        });

        return {
            materials: Array.from(materials),
            fits: Array.from(fits),
            sleeves: Array.from(sleeves),
            patterns: Array.from(patterns),
            brands: Array.from(brands),
            colors: Array.from(colors),
            categories: Array.from(categories),
        };
    }, [products]);


    if (error)
        return (
            <div className="text-center py-5">
                <h5 className="text-danger">{error}</h5>
            </div>
        )


    const getToken = () => {
        const tokenOfDealerAdmin = localStorage.getItem("accessTokenDealer")
        if (tokenOfDealerAdmin) {
            setTokenDealerAdmin(true)
        }
        const tokenOfCustomer = localStorage.getItem("accessTokenCustomer")
        if (tokenOfCustomer) {
            setTokenCustomer(false)
        }
        if (tokenOfCustomer || tokenOfDealerAdmin) {
            setCommonToken(false)
        }
    }

    const fetchProducts = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get(
                "https://api.lancer.drmcetit.com/api/Snapdeal/product/"
            );
            console.log(response.data)
            setProducts(response.data);
        } catch (err) {
            console.error("Error fetching products:", err);
            setError("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    const fetchCartCount = async () => {
        const token = localStorage.getItem("accessTokenCustomer")
        try {
            const response = await axios.get("https://api.lancer.drmcetit.com/api/Snapdeal/cart/count/",
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
            console.log(response.data)
            setCartCount(response.data.count)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getToken()
        fetchProducts()
        fetchCartCount()
    }, [])

    const filteredProducts = useMemo(() => {
        const filtered = [...products].filter((product) => {
            // 🔍 Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesSearch =
                    product.title?.toLowerCase().includes(query) ||
                    product.description?.toLowerCase().includes(query) ||
                    product.brand?.toLowerCase().includes(query) ||
                    product.category?.toLowerCase().includes(query) ||
                    product.color?.toLowerCase().includes(query);
                if (!matchesSearch) return false;
            }

            // 💰 Price filter
            const price = product.offerPrice || product.price;
            if (minPrice && price < parseFloat(minPrice)) return false;
            if (maxPrice && price > parseFloat(maxPrice)) return false;

            // 🧵 Material filter
            if (selectedMaterials.length && !selectedMaterials.includes(product.others?.material)) return false;

            // 👕 Fit filter
            if (selectedFits.length && !selectedFits.includes(product.others?.fit)) return false;

            // 👔 Sleeve filter
            if (selectedSleeves.length && !selectedSleeves.includes(product.others?.sleeve)) return false;

            // 🎨 Pattern filter
            if (selectedPatterns.length && !selectedPatterns.includes(product.others?.pattern)) return false;

            // 🏷 Brand filter
            if (selectedBrands.length && !selectedBrands.includes(product.brand)) return false;

            // 🎨 Color filter
            if (selectedColors.length && !selectedColors.includes(product.color)) return false;

            // 📂 Category filter
            if (selectedCategories.length && !selectedCategories.includes(product.category)) return false;

            return true;
        });

        // 🔄 Sort products
        switch (sortBy) {
            case "price-low":
                return filtered.sort((a, b) => (a.offerPrice || a.price) - (b.offerPrice || b.price));
            case "price-high":
                return filtered.sort((a, b) => (b.offerPrice || b.price) - (a.offerPrice || a.price));
            case "rating":
                return filtered.sort((a, b) => b.rating - a.rating);
            default:
                return filtered; // "featured" → original order
        }
    }, [
        products,
        searchQuery,
        minPrice,
        maxPrice,
        selectedMaterials,
        selectedFits,
        selectedSleeves,
        selectedPatterns,
        selectedBrands,
        selectedColors,      // ✅ added dependency
        selectedCategories,  // ✅ added dependency
        sortBy,
    ]);



    const toggleFilter = (value, selectedArray, setSelectedArray) => {
        setSelectedArray(prev =>
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };

    if (loading) return <ProductGrid />

    const renderStars = (rating = 0) => {
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
            } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
                stars.push(<i key={i} className="bi bi-star-half text-warning"></i>);
            } else {
                stars.push(<i key={i} className="bi bi-star text-warning"></i>);
            }
        }

        return stars;
    };


    const FilterSection = () => (
        <>
            {/* Price Filter */}
            <div className="mb-4">
                <h6 className="fw-bold mb-3">Price, ₹</h6>
                <div className="row g-2">
                    <div className="col-6">
                        <input
                            type="number"
                            className="form-control form-control-sm"
                            placeholder="Min"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                    </div>
                    <div className="col-6">
                        <input
                            type="number"
                            className="form-control form-control-sm"
                            placeholder="Max"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Material Filter */}
            {filterOptions.materials?.length > 0 && (
                <div className="mb-4">
                    <h6 className="fw-bold mb-3">Material</h6>
                    {filterOptions.materials.map((material) => (
                        <div className="form-check mb-2" key={material}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={`material-${material}`}
                                checked={selectedMaterials.includes(material)}
                                onChange={() =>
                                    toggleFilter(material, selectedMaterials, setSelectedMaterials)
                                }
                            />
                            <label className="form-check-label" htmlFor={`material-${material}`}>
                                {material}
                            </label>
                        </div>
                    ))}
                </div>
            )}

            {/* Fit Filter */}
            {filterOptions.fits?.length > 0 && (
                <div className="mb-4">
                    <h6 className="fw-bold mb-3">Fit</h6>
                    {filterOptions.fits.map((fit) => (
                        <div className="form-check mb-2" key={fit}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={`fit-${fit}`}
                                checked={selectedFits.includes(fit)}
                                onChange={() =>
                                    toggleFilter(fit, selectedFits, setSelectedFits)
                                }
                            />
                            <label className="form-check-label" htmlFor={`fit-${fit}`}>
                                {fit}
                            </label>
                        </div>
                    ))}
                </div>
            )}

            {/* Sleeve Filter */}
            {filterOptions.sleeves?.length > 0 && (
                <div className="mb-4">
                    <h6 className="fw-bold mb-3">Sleeve</h6>
                    {filterOptions.sleeves.map((sleeve) => (
                        <div className="form-check mb-2" key={sleeve}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={`sleeve-${sleeve}`}
                                checked={selectedSleeves.includes(sleeve)}
                                onChange={() =>
                                    toggleFilter(sleeve, selectedSleeves, setSelectedSleeves)
                                }
                            />
                            <label className="form-check-label" htmlFor={`sleeve-${sleeve}`}>
                                {sleeve}
                            </label>
                        </div>
                    ))}
                </div>
            )}

            {/* Pattern Filter */}
            {filterOptions.patterns?.length > 0 && (
                <div className="mb-4">
                    <h6 className="fw-bold mb-3">Pattern</h6>
                    {filterOptions.patterns.map((pattern) => (
                        <div className="form-check mb-2" key={pattern}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={`pattern-${pattern}`}
                                checked={selectedPatterns.includes(pattern)}
                                onChange={() =>
                                    toggleFilter(pattern, selectedPatterns, setSelectedPatterns)
                                }
                            />
                            <label className="form-check-label" htmlFor={`pattern-${pattern}`}>
                                {pattern}
                            </label>
                        </div>
                    ))}
                </div>
            )}

            {/* Brand Filter */}
            {filterOptions.brands?.length > 0 && (
                <div className="mb-4">
                    <h6 className="fw-bold mb-3">Brand</h6>
                    {filterOptions.brands.map((brand) => (
                        <div className="form-check mb-2" key={brand}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={`brand-${brand}`}
                                checked={selectedBrands.includes(brand)}
                                onChange={() =>
                                    toggleFilter(brand, selectedBrands, setSelectedBrands)
                                }
                            />
                            <label className="form-check-label" htmlFor={`brand-${brand}`}>
                                {brand}
                            </label>
                        </div>
                    ))}
                </div>
            )}

            {/* Color Filter */}
            {filterOptions.colors?.length > 0 && (
                <div className="mb-4">
                    <h6 className="fw-bold mb-3">Color</h6>
                    {filterOptions.colors.map((color) => (
                        <div className="form-check mb-2" key={color}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={`color-${color}`}
                                checked={selectedColors.includes(color)}
                                onChange={() =>
                                    toggleFilter(color, selectedColors, setSelectedColors)
                                }
                            />
                            <label className="form-check-label" htmlFor={`color-${color}`}>
                                {color}
                            </label>
                        </div>
                    ))}
                </div>
            )}

            {/* Category Filter */}
            {filterOptions.categories?.length > 0 && (
                <div className="mb-4">
                    <h6 className="fw-bold mb-3">Category</h6>
                    {filterOptions.categories.map((cat) => (
                        <div className="form-check mb-2" key={cat}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={`category-${cat}`}
                                checked={selectedCategories.includes(cat)}
                                onChange={() =>
                                    toggleFilter(cat, selectedCategories, setSelectedCategories)
                                }
                            />
                            <label className="form-check-label" htmlFor={`category-${cat}`}>
                                {cat}
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </>
    );



    return (
        <>
            <div className="min-vh-100 bg-light">
                {/* Header */}
                <header className="bg-white border-bottom">
                    <div className="container-fluid py-3">
                        <div className="row g-3 align-items-center">
                            {/* Logo and Categories Button */}
                            <div className="col-12 col-md-auto">
                                <div className="d-flex align-items-center justify-content-between gap-2">
                                    <div className="d-flex align-items-center gap-2">
                                        <div className="bg-danger bg-opacity-10 p-2 rounded">
                                            <i className="bi bi-shop text-danger fs-5"></i>
                                        </div>
                                        <h5 className="mb-0 fw-bold">What a Market!</h5>
                                    </div>
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
                                    <button className="btn btn-outline-secondary" type="button">
                                        <i className="bi bi-search"></i>
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="col-12 col-md-auto">
                                <div className="d-flex align-items-center justify-content-end justify-content-md-start gap-2 gap-md-3">
                                    <button className="btn btn-link text-decoration-none text-secondary p-1 p-md-2" onClick={() => navigate("/product-orders")}>
                                        <i className="bi bi-box-seam me-1"></i>
                                        <span className="d-none d-lg-inline">Orders</span>
                                    </button>

                                    <button className="btn btn-link text-decoration-none text-secondary p-1 p-md-2" onClick={() => localStorage.clear()}>
                                        <i className="bi bi-heart me-1"></i>
                                        <span className="d-none d-lg-inline">Favorites</span>
                                    </button>

                                    <Link to={"/shopping-cart"}>
                                        <button className="btn btn-link text-decoration-none text-secondary position-relative p-1 p-md-2">
                                            <i className="bi bi-cart3 me-1"></i>
                                            <span className="d-none d-lg-inline">Cart</span>
                                            {
                                                !tokenCustomer &&
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    {cartCount}
                                                </span>
                                            }
                                        </button>
                                    </Link>


                                    {commonToken &&
                                        <button className="btn btn-dark btn-sm" onClick={() => setOpenPopUp(true)}>
                                            <span className="d-none d-sm-inline">Sign In</span>
                                            <i className="bi bi-person d-sm-none"></i>
                                        </button>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container-fluid bg-light py-2">
                        <div className="d-flex align-items-center">
                            <button className="btn btn-sm btn-link text-decoration-none text-secondary">
                                <i className="bi bi-geo-alt me-1"></i>
                                Pollachi
                            </button>
                        </div>
                    </div>
                </header>

                {/* Navigation Bar */}
                <nav className="bg-white border-bottom">
                    <div className="container-fluid">
                        <div className="d-flex justify-content-between align-items-center py-2">
                            <div className="overflow-auto flex-grow-1">
                                <ul className="nav flex-nowrap">
                                    {categories.map((category) => (
                                        <li className="nav-item" key={category}>
                                            <a className="nav-link text-dark text-nowrap" href="#">
                                                {category}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {tokenDealerAdmin && <Link to={"/dealer-admin-page"} className="btn btn-dark"> Admin</Link>}

                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <div className="container-fluid py-4">
                    <div className="row">
                        {/* Filter Sidebar */}
                        <div className="col-lg-3 col-md-4 mb-4 d-none d-md-block">
                            <div className="bg-white p-4 rounded shadow-sm">
                                <FilterSection />
                            </div>
                        </div>

                        {/* Mobile Offcanvas Filter */}
                        <div
                            className={`offcanvas offcanvas-start ${showFilters ? "show" : ""}`}
                            tabIndex={-1}
                            style={{ visibility: showFilters ? "visible" : "hidden" }}
                        >
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title">Filters</h5>
                                <button type="button" className="btn-close" onClick={() => setShowFilters(false)}></button>
                            </div>
                            <div className="offcanvas-body">
                                <FilterSection />
                            </div>
                        </div>

                        {/* Backdrop for mobile offcanvas */}
                        {showFilters && <div className="offcanvas-backdrop fade show" onClick={() => setShowFilters(false)}></div>}

                        {/* Product Grid */}
                        <div className="col-lg-9 col-md-8">
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
                                {/* <h6 className="mb-0">
                                <span>Found {filteredProducts.length} results</span>
                                {searchQuery && (
                                    <>
                                        {" "}
                                        <span className="text-dark">for "{searchQuery}"</span>
                                    </>
                                )}
                            </h6> */}

                                <div className="d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center gap-2 w-100 w-md-auto">
                                    {/* Mobile Filter Button */}
                                    <button className="btn btn-outline-dark d-md-none" onClick={() => setShowFilters(true)}>
                                        <i className="bi bi-funnel me-2"></i>
                                        Filters
                                    </button>

                                    <div className="d-flex align-items-center gap-2">
                                        <span className="text-muted text-nowrap">Sort by</span>
                                        <select
                                            className="form-select form-select-sm"
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                        >
                                            <option value="featured">Featured</option>
                                            <option value="price-low">Price: Low to High</option>
                                            <option value="price-high">Price: High to Low</option>
                                            <option value="rating">Rating</option>
                                        </select>
                                    </div>

                                    <div className="btn-group" role="group">
                                        <button
                                            type="button"
                                            className={`btn btn-sm ${viewMode === "grid" ? "btn-dark" : "btn-outline-secondary"}`}
                                            onClick={() => setViewMode("grid")}
                                        >
                                            <i className="bi bi-grid-3x3-gap-fill"></i>
                                        </button>
                                        <button
                                            type="button"
                                            className={`btn btn-sm ${viewMode === "list" ? "btn-dark" : "btn-outline-secondary"}`}
                                            onClick={() => setViewMode("list")}
                                        >
                                            <i className="bi bi-list"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Product Cards */}
                            {filteredProducts.length === 0 ? (
                                <div className="text-center">
                                    {/* <i className="bi bi-search fs-1 text-muted"></i>
                                    <h5 className="mt-3 text-muted">No products found</h5>
                                    <p className="text-muted">Try adjusting your filters or search query</p> */}
                                    <ProductNotFound />
                                </div>
                            ) : (
                                <div className={viewMode === "grid" ? "row g-3 g-md-4" : "row g-3"}>
                                    {filteredProducts.map((product) => {
                                        const displayPrice = product.price?.discount?.finalPrice || product.price?.amount || 0;
                                        const hasDiscount = product.price?.discount && product.price.discount.percentage > 0;

                                        return (
                                            <div
                                                key={product.productId}
                                                className={viewMode === "grid" ? "col-12 col-sm-6 col-lg-4" : "col-12"}
                                            >
                                                <div className="card h-100 position-relative">
                                                    {product.offer > 0 && (
                                                        <div className="position-absolute top-0 start-0 p-2" style={{ zIndex: 10 }}>
                                                            <span className="badge bg-danger"> {product.offer} % OFF</span>
                                                        </div>
                                                    )}

                                                    <div
                                                        className="position-absolute top-0 end-0 p-2 d-flex flex-column gap-2"
                                                        style={{ zIndex: 10 }}
                                                    >
                                                        <button className="btn btn-sm btn-light rounded-circle p-2" aria-label="Add to favorites">
                                                            <i className="bi bi-heart"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-light rounded-circle p-2" aria-label="Compare">
                                                            <i className="bi bi-arrow-left-right"></i>
                                                        </button>
                                                    </div>

                                                    <div className="card-body text-center">
                                                        <img
                                                            src={product.image ? `https://api.lancer.drmcetit.com${product.image}` : "/placeholder.svg"}
                                                            alt={product.title || "Product"}
                                                            className="img-fluid mb-3"
                                                            style={{ maxHeight: "200px", objectFit: "fit" }}
                                                        />

                                                        <h6
                                                            className="card-title text-start"
                                                            onClick={() => navigate(`/product-detail/${product.title}`, {
                                                                state: { id: product.productId }
                                                            })}
                                                        >
                                                            {product.title.length > 35 ? product.title.substring(0, 35) + "..." : product.title}
                                                        </h6>

                                                        <div className="text-start mb-2">
                                                            {product.offer > 0 ? (
                                                                <>
                                                                    <span className="fw-bold fs-5 text-dark">₹{product.offerPrice}</span>
                                                                    <span className="text-muted text-decoration-line-through ms-2">₹{product.price}</span>
                                                                </>
                                                            ) : (
                                                                <span className="fw-bold fs-5">₹{product.price}</span>
                                                            )}
                                                        </div>

                                                        <div className="d-flex align-items-center gap-2 text-start mb-2">
                                                            <div className="d-flex">{renderStars(product.rating || 0)}</div>
                                                            <span className="text-muted small">({product.review?.length || 0})</span>
                                                        </div>

                                                        <div className="text-start">
                                                            <small className="text-muted d-block">
                                                                • {product.category || ""}
                                                            </small>

                                                            {product.offer > 0 && (
                                                                <small className="text-dark d-block">
                                                                    <i className="bi bi-truck me-1"></i>
                                                                    Free Shipping
                                                                </small>
                                                            )}

                                                            {product.price === 0 && (
                                                                <small className="text-danger d-block">Out of Stock</small>
                                                            )}
                                                        </div>
                                                        <button className="w-100 my-3 btn btn-dark" onClick={() => navigate(`/product-detail/${product.title}`, {
                                                            state: { id: product.productId }
                                                        })}>
                                                            Add to cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );

                                    })}
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>

            {/* Sign in model */}
            {openPopUp && <div
                className="w-100 h-100 bg-dark bg-opacity-10 blur position-fixed top-0 start-0 d-flex justify-content-center align-items-center"
                style={{ zIndex: 99 }}
            >
                <div className="bg-white p-4 rounded shadow" style={{ maxWidth: "500px", width: "90%" }}>
                    <div className="text-center mb-4">
                        <h2 className="fw-bold">Sign In As</h2>
                        <p>Select your role to continue</p>
                    </div>
                    <div className="row g-3">
                        {/* Dealer / Seller Option */}
                        <div className="col-6 d-flex justify-content-center">
                            <div
                                className="border rounded p-4 text-center w-100"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    navigate("/dealer-signin");
                                }}
                            >
                                <h5>Dealer</h5>
                                <i className="bi bi-shop fs-1"></i> {/* Bootstrap icon, optional */}
                            </div>
                        </div>

                        {/* Customer Option */}
                        <div className="col-6 d-flex justify-content-center">
                            <div
                                className="border rounded p-4 text-center w-100"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    navigate("/customer-signin");
                                }}
                            >
                                <h5>Customer</h5>
                                <i className="bi bi-person fs-1"></i> {/* Bootstrap icon, optional */}
                            </div>
                        </div>
                    </div>

                    <div className="text-end mt-3">
                        <button
                            className="btn btn-outline-dark w-100"
                            onClick={() => {
                                setOpenPopUp(false)
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>}

        </>
    )
}
