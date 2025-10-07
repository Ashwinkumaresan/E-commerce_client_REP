import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CategoryCarousel } from '../../component/Category Carousel/CategoryCarousel'
import axios from "axios"

export const MainHome = () => {

    return (
        <div className='scroll-container'>
            <div className='section'
                style={{
                    backgroundImage: "url('./header.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    width: "100%",
                    height: "100vh",
                }}
            >
                <div className='container'>
                    {/* Header */}
                    <header className="bg-white">
                        <div className="container-fluid py-3">
                            <div className="row g-3 align-items-center justify-content-between">
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

                                {/* Search Bar
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
                            </div> */}

                                {/* Action Buttons */}
                                <div className="col-12 col-md-auto">
                                    <div className="d-flex align-items-center justify-content-end gap-2 gap-md-3">
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
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    3
                                                </span>
                                            </button>
                                        </Link>


                                        <button className="btn btn-dark btn-sm" onClick={() => setOpenPopUp(true)}>
                                            <span className="d-none d-sm-inline">Sign In</span>
                                            <i className="bi bi-person d-sm-none"></i>
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container-fluid">
                            <div className="d-flex align-items-center">
                                <button className="btn btn-sm btn-link text-decoration-none text-secondary">
                                    <i className="bi bi-geo-alt me-1"></i>
                                    Pollachi
                                </button>
                            </div>
                        </div>
                    </header>
                    <h1 className='text-muted fw-bold display-5 my-5'>We are here to fullfill your <span
                        style={{
                            background: "linear-gradient(to bottom right, #001f4d, #00bfff)", // dark blue to light blue
                            WebkitBackgroundClip: "text", // needed for gradient text
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Needs...
                    </span>
                    </h1>
                </div>
                <CategoryCarousel />
            </div>
            <div className='section'
            style={{
                    backgroundImage: "url('./section2.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    width: "100%",
                    height: "100vh",
                }}
            >
                
            </div>
        </div>
    )
}
