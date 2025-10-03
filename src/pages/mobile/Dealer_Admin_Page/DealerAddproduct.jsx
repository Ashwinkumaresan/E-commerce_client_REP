import React, { useState } from "react"
import MSidebar from "../../component/Sidebar/MSidebar"
import { useNavigate } from "react-router-dom"


export default function MDealerAddproduct() {

    const [orders] = useState([
        {
            id: "#ORD-001",
            customer: "John Doe",
            date: "2024-01-15",
            status: "Shipped",
            total: "Rs. 299.99",
            product: {
                title: "Smartphone X",
                brand: "TechBrand",
                category: "Electronics",
                price: 299.99,
                offer: "10% Off",
                stockCount: 15,
                description: "Latest smartphone with advanced features.",
                colors: ["Black", "Blue", "Silver"],
                sizes: [
                    { key: "Storage", value: "64GB" },
                    { key: "Storage", value: "128GB" },
                    { key: "Storage", value: "256GB" },
                ],
                features: [
                    { name: "Network", value: "5G Enabled" },
                    { name: "Display", value: "AMOLED" },
                    { name: "Charging", value: "Fast Charging" },
                ],
                images: [
                    "https://example.com/img1.jpg",
                    "https://example.com/img2.jpg"
                ],
            },
        },
        {
            id: "#ORD-002",
            customer: "Jane Smith",
            date: "2024-01-14",
            status: "Pending",
            total: "Rs. 149.99",
            product: {
                title: "Running Shoes",
                brand: "Sporty",
                category: "Footwear",
                price: 149.99,
                offer: "Flat 20% Off",
                stockCount: 30,
                description: "Comfortable running shoes with great grip.",
                colors: ["Red", "Black", "White"],
                sizes: [
                    { key: "Size", value: "7" },
                    { key: "Size", value: "8" },
                    { key: "Size", value: "9" },
                    { key: "Size", value: "10" },
                ],
                features: [
                    { name: "Material", value: "Mesh" },
                    { name: "Sole", value: "Rubber" },
                ],
                images: [
                    "https://example.com/shoe1.jpg",
                    "https://example.com/shoe2.jpg"
                ],
            },
        },
        {
            id: "#ORD-003",
            customer: "Michael Johnson",
            date: "2024-01-12",
            status: "Shipped",
            total: "Rs. 99.99",
            product: {
                title: "Backpack",
                brand: "UrbanGear",
                category: "Accessories",
                price: 99.99,
                offer: "5% Cashback",
                stockCount: 50,
                description: "Spacious and stylish backpack for everyday use.",
                colors: ["Gray", "Navy", "Green"],
                sizes: [
                    { key: "Size", value: "Standard" },
                ],
                features: [
                    { name: "Material", value: "Cotton" },
                    { name: "Capacity", value: "30L" },
                ],
                images: [
                    "https://example.com/bag1.jpg",
                    "https://example.com/bag2.jpg"
                ],
            },
        },
    ]);



    const navigate = useNavigate()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [activePage, setActivePage] = useState("products")
    const [selectedColors, setSelectedColors] = useState([])
    const [selectedSizes, setSelectedSizes] = useState([])
    const [uploadedImages, setUploadedImages] = useState([])
    const [sizes, setSizes] = useState([]);
    const [features, setFeatures] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [token, setToken] = useState(true)

    const getToken = () => {
        const token = localStorage.getItem("accessTokenDealer")
        if (!token) navigate("/home")
    }
    useEffect(() => {
        getToken()
    }, [])


    // Predefined color 
    const colors = [
        { name: "Red", value: "#dc3545" },
        { name: "Blue", value: "#0d6efd" },
        { name: "Green", value: "#198754" },
        { name: "Yellow", value: "#ffc107" },
        { name: "Purple", value: "#6f42c1" },
        { name: "Black", value: "#000000" },
        { name: "White", value: "#ffffff" },
        { name: "Gray", value: "#6c757d" },
    ]

    // Navigation handler
    const handleNavigate = (pageId) => {
        setActivePage(pageId)
    }

    // Form helpers
    const handleColorSelect = (colorValue) => {
        setSelectedColors((prev) =>
            prev.includes(colorValue) ? prev.filter((c) => c !== colorValue) : [...prev, colorValue],
        )
    }

    // Size Handlers
    const handleSizeChange = (index, field, value) => {
        const updated = [...sizes];
        updated[index][field] = value;
        setSizes(updated);
    };

    const addSize = () => {
        setSizes([...sizes, { key: "", value: "" }]);
    };

    const removeSize = (index) => {
        const updated = [...sizes];
        updated.splice(index, 1);
        setSizes(updated);
    };


    const handleImageUpload = (e) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files)
            setUploadedImages((prev) => [...prev, ...newFiles])
        }
    }

    const removeImage = (index) => {
        setUploadedImages((prev) => prev.filter((_, i) => i !== index))
    }

    // Feature Handlers
    const handleFeatureChange = (index, field, value) => {
        const updated = [...features]
        updated[index][field] = value
        setFeatures(updated)
    }

    const addFeature = () => {
        setFeatures([...features, { key: "", value: "" }])
    }

    const removeFeature = (index) => {
        setFeatures(features.filter((_, i) => i !== index))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const productData = {
            title: e.target.title.value,
            brand: e.target.brand.value,
            category: e.target.category.value,
            price: e.target.price.value,
            offer: e.target.offer.value,
            stockCount: e.target.stockCount.value,
            description: e.target.description.value,
            colors: selectedColors,
            sizes: selectedSizes,
            features,
            images: uploadedImages,
        }
        console.log("Product Data:", productData)
        alert("Product submitted! Check console for details.")
    }

    // Handel order view
    const handleView = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    // handel order close
    const handleClose = () => setShowModal(false);


    // Page content renderer
    const renderPageContent = () => {
        switch (activePage) {
            case "dashboard":
                return (
                    <div className="card shadow-sm" style={{ borderRadius: "12px" }}>
                        <div className="card-header bg-white border-0 py-3">
                            <h5 className="card-title mb-0 fw-bold">Dashboard Overview</h5>
                        </div>
                        <div className="card-body p-4">
                            <div className="row">
                                <div className="col-md-3 mb-3">
                                    <div className="card bg-dark text-white">
                                        <div className="card-body text-center">
                                            <h3>150</h3>
                                            <p className="mb-0">Total Products</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <div className="card bg-success text-white">
                                        <div className="card-body text-center">
                                            <h3>89</h3>
                                            <p className="mb-0">Orders Today</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <div className="card bg-warning text-white">
                                        <div className="card-body text-center">
                                            <h3>1,234</h3>
                                            <p className="mb-0">Total Customers</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <div className="card bg-info text-white">
                                        <div className="card-body text-center">
                                            <h3>$12,450</h3>
                                            <p className="mb-0">Revenue</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case "products":
                return (
                    <div className="card shadow-sm" style={{ borderRadius: "12px" }}>
                        <div className="card-header bg-white border-0 py-3">
                            <h5 className="card-title mb-0 fw-bold">Add Product</h5>
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    {/* Title */}
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="title" className="form-label fw-semibold">Title</label>
                                        <input type="text" className="form-control rounded-1" id="title" placeholder="Enter product title" style={{ borderRadius: "8px" }} />
                                    </div>

                                    {/* Brand */}
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="brand" className="form-label fw-semibold">Brand</label>
                                        <input type="text" className="form-control rounded-1" id="brand" placeholder="Enter brand" style={{ borderRadius: "8px" }} />
                                    </div>

                                    {/* Category */}
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="category" className="form-label fw-semibold">Category</label>
                                        <input type="text" className="form-control rounded-1" id="category" placeholder="Electronics > Mobiles" style={{ borderRadius: "8px" }} />
                                    </div>

                                    {/* Price */}
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="price" className="form-label fw-semibold">Price</label>
                                        <input type="number" className="form-control rounded-1" id="price" placeholder="0.00" style={{ borderRadius: "8px" }} />
                                    </div>

                                    {/* offer */}
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="offer" className="form-label fw-semibold">Offer price</label>
                                        <input type="text" className="form-control" id="offer" placeholder="Enter offer price" style={{ borderRadius: "8px" }} />
                                    </div>

                                    {/* Stock Count */}
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="stockCount" className="form-label fw-semibold">Stock Count</label>
                                        <input type="number" className="form-control rounded-1" id="stockCount" placeholder="0" min="0" style={{ borderRadius: "8px" }} />
                                    </div>

                                    {/* Description */}
                                    <div className="col-12 mb-3">
                                        <label htmlFor="description" className="form-label fw-semibold">Description</label>
                                        <textarea className="form-control rounded-1" id="description" rows={4} placeholder="Enter product description" style={{ borderRadius: "8px" }}></textarea>
                                    </div>

                                    {/* Images */}
                                    <div className="col-12 mb-4">
                                        <label htmlFor="images" className="form-label fw-semibold">Images</label>
                                        <input type="file" className="form-control mb-3 rounded-1" id="images" multiple accept="image/*" onChange={handleImageUpload} style={{ borderRadius: "8px" }} />
                                        {uploadedImages.length > 0 && (
                                            <div className="row g-2">
                                                {uploadedImages.map((file, index) => (
                                                    <div key={index} className="col-auto">
                                                        <div className="position-relative">
                                                            <img src={URL.createObjectURL(file)} alt={`Preview ${index + 1}`} className="img-thumbnail" style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }} />
                                                            <button type="button" className="btn btn-danger btn-sm position-absolute top-0 end-0" style={{ transform: "translate(50%, -50%)", borderRadius: "50%", width: "24px", height: "24px", padding: "0", fontSize: "12px" }} onClick={() => removeImage(index)}>×</button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Colors (optional) */}
                                    <div className="col-12 mb-4">
                                        <label className="form-label fw-semibold">Colors (Optional)</label>
                                        <div className="d-flex flex-wrap gap-2">
                                            {colors.map((color, index) => (
                                                <div key={index} className={`border rounded-circle position-relative ${selectedColors.includes(color.value) ? "border-dark border-3" : "border-secondary"}`} style={{ width: "40px", height: "40px", backgroundColor: color.value, cursor: "pointer" }} onClick={() => handleColorSelect(color.value)} title={color.name}>
                                                    {selectedColors.includes(color.value) && (
                                                        <div className="position-absolute top-50 start-50 translate-middle" style={{ color: "#fff", fontSize: "16px", fontWeight: "bold" }}>✓</div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Sizes (optional) */}
                                    <div className="col-12 mb-4">
                                        <label className="form-label fw-semibold me-2">Sizes (Optional)</label>
                                        {sizes.map((size, index) => (
                                            <div key={index} className="input-group mb-2 gap-4">
                                                <input
                                                    type="text"
                                                    className="form-control rounded-1"
                                                    placeholder="Size Key (e.g. Size, Fit)"
                                                    value={size.key}
                                                    onChange={(e) => handleSizeChange(index, "key", e.target.value)}
                                                />
                                                <input
                                                    type="text"
                                                    className="form-control rounded-1"
                                                    placeholder="Size Value (e.g. M, XL)"
                                                    value={size.value}
                                                    onChange={(e) => handleSizeChange(index, "value", e.target.value)}
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-danger rounded-1"
                                                    onClick={() => removeSize(index)}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={addSize}
                                        >
                                            + Add Size
                                        </button>
                                    </div>

                                    {/* Features (Dynamic key-value) */}
                                    <div className="col-12 mb-4">
                                        <label className="form-label fw-semibold me-2">Features</label>
                                        {features.map((feature, index) => (
                                            <div key={index} className="input-group mb-2 gap-4">
                                                <input type="text" className="form-control rounded-1" placeholder="Feature Name (e.g. Material, Battery Life)" value={feature.key} onChange={(e) => handleFeatureChange(index, "key", e.target.value)} />
                                                <input type="text" className="form-control rounded-1" placeholder="Feature Value (e.g. Cotton, 10h)" value={feature.value} onChange={(e) => handleFeatureChange(index, "value", e.target.value)} />
                                                <button type="button" className="btn btn-danger rounded-1" onClick={() => removeFeature(index)}>×</button>
                                            </div>
                                        ))}
                                        <button type="button" className="btn btn-outline-primary btn-sm" onClick={addFeature}>+ Add Feature</button>
                                    </div>

                                    {/* Save Button */}
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-dark px-4 w-100" style={{ borderRadius: "8px" }}>
                                            Save Product
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )

            case "orders":
                return (
                    <div style={{ borderRadius: "12px" }} className="card rounded-1">
                        <div className="border-0 py-3">
                            <h5 className="card-title mb-0 fw-bold ps-4">Orders Management</h5>
                        </div>
                        <div className="card-body p-4">
                            <div className="table-responsive">
                                <table className="table table-hover table-borderless">
                                    <thead style={{ borderTop: "2px solid black", borderBottom: "2px solid black" }}>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Customer</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                            <th>Total</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((row, i) => (
                                            <tr key={i}>
                                                <td>{row.id}</td>
                                                <td>{row.customer}</td>
                                                <td>{row.date}</td>
                                                <td>
                                                    <span className="badge bg-dark rounded-1">{row.status}</span>
                                                </td>
                                                <td>{row.total}</td>
                                                <td>
                                                    <div className="dropdown">
                                                        <button
                                                            className="btn  btn-sm"
                                                            type="button"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="false"
                                                        >
                                                            ⋮
                                                        </button>
                                                        <ul className="dropdown-menu">
                                                            <li>
                                                                <button
                                                                    className="dropdown-item custom-dropdown"
                                                                    onClick={() => handleView(row)}
                                                                >
                                                                    View
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button className="dropdown-item custom-dropdown">Edit</button>
                                                            </li>
                                                        </ul>

                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* View Modal */}
                            {showModal && (
                                <div
                                    className="modal fade show d-block"
                                    tabIndex="-1"
                                    aria-hidden="true"
                                    style={{
                                        backdropFilter: "blur(8px)",
                                        WebkitBackdropFilter: "blur(8px)"
                                    }}
                                >
                                    <div className="modal-dialog modal-lg modal-dialog-centered">
                                        <div className="modal-content rounded-1">
                                            <div className="modal-header">
                                                <h5 className="modal-title">Product Details</h5>
                                                <button type="button" className="btn-close" onClick={handleClose}></button>
                                            </div>
                                            <div className="modal-body">
                                                {selectedProduct ? (
                                                    <div className="container-fluid">
                                                        {/* Order Information */}
                                                        <div className="row mb-3">
                                                            <div className="col-md-6"><strong>Order ID:</strong> {selectedProduct.id}</div>
                                                            <div className="col-md-6"><strong>Customer:</strong> {selectedProduct.customer}</div>
                                                            <div className="col-md-6"><strong>Date:</strong> {selectedProduct.date}</div>
                                                            <div className="col-md-6"><strong>Status:</strong> {selectedProduct.status}</div>
                                                            <div className="col-md-6"><strong>Total:</strong> {selectedProduct.total}</div>
                                                        </div>

                                                        <hr />
                                                        <h6>Product Information</h6>
                                                        <div className="row mb-3">
                                                            <div className="col-md-6"><strong>Title:</strong> {selectedProduct.product.title}</div>
                                                            <div className="col-md-6"><strong>Brand:</strong> {selectedProduct.product.brand}</div>
                                                            <div className="col-md-6"><strong>Category:</strong> {selectedProduct.product.category}</div>
                                                            <div className="col-md-6"><strong>Price:</strong> ${selectedProduct.product.price}</div>
                                                            <div className="col-md-6"><strong>Offer:</strong> {selectedProduct.product.offer}</div>
                                                            <div className="col-md-6"><strong>Stock Count:</strong> {selectedProduct.product.stockCount}</div>
                                                        </div>

                                                        <div className="row mb-3">
                                                            <div className="col-12"><strong>Description:</strong> {selectedProduct.product.description}</div>
                                                            <div className="col-md-6"><strong>Colors:</strong> {selectedProduct.product.colors?.join(", ")}</div>

                                                            <div className="col-12 mt-3">
                                                                <strong>Sizes:</strong>
                                                                <div className="table-responsive mt-2">
                                                                    <table className="table table-sm table-bordered">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Size Key</th>
                                                                                <th>Size Value</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {selectedProduct.product.sizes?.map((s, i) => (
                                                                                <tr key={i}>
                                                                                    <td>{s.key}</td>
                                                                                    <td>{s.value}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="row mb-3">
                                                            <div className="col-12">
                                                                <strong>Features:</strong>
                                                                <div className="table-responsive mt-2">
                                                                    <table className="table table-sm table-bordered">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Feature Name</th>
                                                                                <th>Feature Value</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {selectedProduct.product.features?.map((f, i) => (
                                                                                <tr key={i}>
                                                                                    <td>{f.name}</td>
                                                                                    <td>{f.value}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-12">
                                                                <strong>Images:</strong>
                                                                <div className="d-flex flex-wrap gap-2 mt-2">
                                                                    {selectedProduct.product.images?.map((img, i) => (
                                                                        <img
                                                                            key={i}
                                                                            src={img}
                                                                            alt="product"
                                                                            style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <p>No product selected</p>
                                                )}
                                            </div>
                                            <div className="m-3">
                                                <button type="button" className="btn btn-dark w-100" onClick={handleClose}>Close</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )}


                        </div>
                    </div>
                )


            case "customers":
                return (
                    <div className="card shadow-sm" style={{ borderRadius: "12px" }}>
                        <div className="card-header bg-white border-0 py-3">
                            <h5 className="card-title mb-0 fw-bold">Customer Management</h5>
                        </div>
                        <div className="card-body p-4">
                            <p>Customer management interface coming soon...</p>
                        </div>
                    </div>
                )

            case "logout":
                return (
                    <div className="card shadow-sm" style={{ borderRadius: "12px" }}>
                        <div className="card-header bg-white border-0 py-3">
                            <h5 className="card-title mb-0 fw-bold">{activePage.charAt(0).toUpperCase() + activePage.slice(1)}</h5>
                        </div>
                        <div className="card-body p-4">
                            <button className="btn btn-danger w-100" onClick={() => { navigate("/") }}>Logout</button>
                        </div>
                    </div>
                )

            default:
                return (
                    <div className="card shadow-sm" style={{ borderRadius: "12px" }}>
                        <div className="card-header bg-white border-0 py-3">
                            <h5 className="card-title mb-0 fw-bold">{activePage.charAt(0).toUpperCase() + activePage.slice(1)}</h5>
                        </div>
                        <div className="card-body p-4">
                            <p>This page is under construction.</p>
                        </div>
                    </div>
                )
        }
    }

    return (
        <div className="d-flex min-vh-100">
            {/* Sidebar */}
            <MSidebar onNavigate={handleNavigate} activePage={activePage} isOpen={isSidebarOpen} />

            {/* Main Content */}
            <div className="flex-grow-1" style={{ marginLeft: isSidebarOpen ? "250px" : "0px", transition: "margin-left 0.3s ease" }}>

                {/* Top Bar with Menu Button */}
                <div
                    className="bg-white border-bottom p-3 d-flex align-items-center"
                    style={{ position: "sticky", top: "0", zIndex: "99" }}
                >
                    <button
                        className="btn me-3"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        ☰
                    </button>

                    {/* Breadcrumb */}
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item">
                                <a href="#" className="text-decoration-none">Admin</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
                            </li>
                        </ol>
                    </nav>
                </div>

                {/* Page Content */}
                <div className="p-4">{renderPageContent()}</div>
            </div>
        </div>
    )
}