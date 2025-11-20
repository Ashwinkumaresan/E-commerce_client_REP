import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CategoryCarousel } from '../../component/Category Carousel/CategoryCarousel'
import axios from "axios"
import Footer from '../../component/Footer/Footer'

export const MainHome = () => {

    // return (
    //     <div className='scroll-container'>
    //         <div className='section'
    //             style={{
    //                 backgroundImage: "url('./header.png')",
    //                 backgroundSize: "cover",
    //                 backgroundPosition: "center",
    //                 backgroundRepeat: "no-repeat",
    //                 width: "100%",
    //                 height: "100vh",
    //             }}
    //         >
    //             <div className='container'>
    //                 {/* Header */}
    //                 <header className="bg-white">
    //                     <div className="container-fluid py-3">
    //                         <div className="row g-3 align-items-center justify-content-between">
    //                             {/* Logo and Categories Button */}
    //                             <div className="col-12 col-md-auto">
    //                                 <div className="d-flex align-items-center justify-content-between gap-2">
    //                                     <div className="d-flex align-items-center gap-2">
    //                                         <div className="bg-danger bg-opacity-10 p-2 rounded">
    //                                             <i className="bi bi-shop text-danger fs-5"></i>
    //                                         </div>
    //                                         <h5 className="mb-0 fw-bold">What a Market!</h5>
    //                                     </div>
    //                                 </div>
    //                             </div>

    //                             {/* Search Bar
    //                         <div className="col-12 col-md">
    //                             <div className="input-group">
    //                                 <input
    //                                     type="text"
    //                                     className="form-control"
    //                                     placeholder="Search products..."
    //                                     value={searchQuery}
    //                                     onChange={(e) => setSearchQuery(e.target.value)}
    //                                 />
    //                                 <button className="btn btn-outline-secondary" type="button">
    //                                     <i className="bi bi-search"></i>
    //                                 </button>
    //                             </div>
    //                         </div> */}

    //                             {/* Action Buttons */}
    //                             <div className="col-12 col-md-auto">
    //                                 <div className="d-flex align-items-center justify-content-end gap-2 gap-md-3">
    //                                     <button className="btn btn-link text-decoration-none text-secondary p-1 p-md-2" onClick={() => navigate("/product-orders")}>
    //                                         <i className="bi bi-box-seam me-1"></i>
    //                                         <span className="d-none d-lg-inline">Orders</span>
    //                                     </button>

    //                                     <button className="btn btn-link text-decoration-none text-secondary p-1 p-md-2" onClick={() => localStorage.clear()}>
    //                                         <i className="bi bi-heart me-1"></i>
    //                                         <span className="d-none d-lg-inline">Favorites</span>
    //                                     </button>

    //                                     <Link to={"/shopping-cart"}>
    //                                         <button className="btn btn-link text-decoration-none text-secondary position-relative p-1 p-md-2">
    //                                             <i className="bi bi-cart3 me-1"></i>
    //                                             <span className="d-none d-lg-inline">Cart</span>
    //                                             <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    //                                                 3
    //                                             </span>
    //                                         </button>
    //                                     </Link>


    //                                     <button className="btn btn-dark btn-sm" onClick={() => setOpenPopUp(true)}>
    //                                         <span className="d-none d-sm-inline">Sign In</span>
    //                                         <i className="bi bi-person d-sm-none"></i>
    //                                     </button>

    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>

    //                     <div className="container-fluid">
    //                         <div className="d-flex align-items-center">
    //                             <button className="btn btn-sm btn-link text-decoration-none text-secondary">
    //                                 <i className="bi bi-geo-alt me-1"></i>
    //                                 Pollachi
    //                             </button>
    //                         </div>
    //                     </div>
    //                 </header>
    //                 <h1 className='text-muted fw-bold display-5 my-5'>Have any   <span
    //                     style={{
    //                         background: "linear-gradient(to bottom right, #1e56a9ff, #00bfff)",
    //                         WebkitBackgroundClip: "text", 
    //                         WebkitTextFillColor: "transparent",
    //                     }}
    //                 >
    //                     Needs?
    //                 </span>
    //                 </h1>
    //             </div>
    //             <CategoryCarousel />
    //         </div>
    //         <div className='section'
    //         style={{
    //                 // backgroundImage: "url('./section2.png')",
    //                 // backgroundSize: "cover",
    //                 // backgroundPosition: "center",
    //                 // backgroundRepeat: "no-repeat",
    //                 width: "100%",
    //                 height: "100vh",
    //             }}
    //         >

    //         </div>
    //     </div>
    // )

    return (
        <>
            {/* <div className='container'
                style={{
                    width: "100vw",
                    height: "100vh",
                    backgroundImage: `url("/herosection_main.png")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            ></div> */}
            <div className="container pt-2">
                <nav className="navbar custom-nav px-4 py-2 sticky-top">
                    <h6 className="m-0 fw-bold">What a Market</h6>

                    <div className="ms-auto d-flex align-items-center gap-3">
                        <Link to={"/product"}>
                            <button className="btn btn-outline-dark px-4">View Products</button>
                        </Link>
                        <Link to={"/customer-signin"}>
                            <button className="btn btn-dark px-4">Sign In</button>
                        </Link>
                    </div>
                </nav>
                <div class="hero container">
                    <h2 className='display-4'>Sale That Makes You Smile. </h2>
                    <p style={{ letterSpacing: "0.2rem" }}>Grab the Best Deals of the Season!</p>
                    <div class="grid">
                        <div class="item item-0 py-5 text-dark student-card" style={{
                            backgroundImage: `url("/WhatsApp Image 2025-10-19 at 21.17.26_768a41ca 2.png")`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}>
                            <h4 className='fs-1 m-0 p-0 fw-bold '>Step Up Your Style.</h4>
                            <p className='fs-6 m-0 p-0'>Step Down the Price.</p>
                            <div className="content-on-hover">
                                <p className='fs-6 my-3' style={{ fontSize: "14px" }}>
                                    Step into big savings with exclusive deals on top-trend shoes. Comfort, style, and great prices all in one place.
                                </p>
                                <button className='btn btn-dark rounded-pill px-5 py-1 fs-5 fw-medium'>Verify Now</button>
                            </div>
                        </div>
                        <div
                            className="item item-1 py-5 student-card"
                            style={{
                                backgroundImage: `url("/Frame 2125.png")`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }}
                        >
                            <h4 className='fs-1 m-0 p-0 fw-bold'>Students Specials</h4>
                            <p className='fs-6 m-0 p-0'>Big Looks, Small Prices.</p>
                            <div className="content-on-hover">
                                <p className='fs-6 my-3'>
                                    Grab our exclusive Student Offer and save more on your favourite products.
                                    Enjoy premium quality at student-friendly prices and shop smart without stretching your budget.
                                </p>
                                <button className='btn btn-light rounded-pill px-5 py-1 fs-5 fw-medium'>Verify Now</button>
                            </div>
                        </div>

                        <div class="item item-2 py-5 text-dark student-card" style={{
                            // backgroundImage: `url("/WhatsApp Image 2025-11-20 at 20.48.02_94193d10 1.png")`,
                            backgroundImage: `url("/WhatsApp Image 2025-11-20 at 20.42.33_d9f9f706 1.png")`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}>
                            <h4 className='fs-1 m-0 p-0 fw-bold '>Upgrade to iPhone.</h4>
                            <p className='fs-6 m-0 p-0'>Upgrade Your Work</p>
                            <div className="content-on-hover">
                                <p className='fs-6 my-3' style={{ fontSize: "14px" }}>
                                    Upgrade to the latest iPhone with exclusive offers that make premium performance more affordable. Experience top-notch speed, camera quality, and the Apple ecosystem all at a smarter price.
                                </p>
                                <button className='btn btn-dark rounded-pill px-5 py-1 fs-5 fw-medium'>Verify Now</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container py-5" style={{ width: "100vw", height: "100vh" }}>
                    <div className="row">
                        <div className="col-4">
                            <p style={{ letterSpacing: "2rem" }}>FASHION</p>
                            <h2 className='display-4' style={{ lineHeight: "4rem", letterSpacing: "2px" }}>STYLE THAT SPEAKS BEFORE YOU DO</h2>
                            <button className='btn btn-dark btn-lg rounded-pill ps-4 py-1'>CHECK YOUR STYLE <span className='ms-4'><img src="/Arrow right.svg" alt="" /></span></button>
                        </div>
                        <div className="col-8">
                            <div className="row">
                                <div className="col-8">
                                    <div class="grid">
                                        <div class="item item-1" style={{
                                            backgroundImage: `url("/image 1155.png")`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat",
                                        }}>
                                        </div>
                                        <div class="item item-3" style={{
                                            backgroundImage: `url("/young-woman-beautiful-dress-hat 1.png")`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat",
                                        }}>
                                        </div>
                                        <div class="item item-4" style={{
                                            backgroundImage: `url("/young-woman-with-shopping-bags-beautiful-dress 1.png")`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat",
                                        }}>
                                        </div>
                                        <div class="item item-5" style={{
                                            backgroundImage: `url("/portrait-siblings-outdoors-brothers-day-celebration 1.png")`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat",
                                        }}>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container py-5 text-light text-center" style={{
                    width: "100vw",
                    height: "100vh",
                    backgroundImage: `url("/wooden-surface-looking-out-library.jpg")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}>
                    <div className='mt-5'>
                        <p>TV | REFRIDGERATOR | AIR CONDITIONER | STOVE | MIXER</p>
                        <h2 className='display-4 fw-bold'>MAKE EVERY DAY EASIER WITH SMARTER APPLIANCES</h2>
                        <button className='btn btn-light btn-lg rounded-pill ps-5 py-0 my-3'>CHECK YOUR STYLE <span className='ms-4'><img src="/Arrow right black.svg" alt="" /></span></button>
                    </div>
                </div>

                <div className="container py-5" style={{ width: "100vw", height: "100vh" }}>
                    <div className="row">
                        <div className="col-8">
                            <div className="row">
                                <div className="col-8">
                                    <div class="grid">
                                        <div class="item item-1" style={{
                                            backgroundImage: `url("/WhatsApp Image 2025-11-20 at 22.48.36_51081624.jpg")`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat",
                                        }}>
                                        </div>
                                        <div class="item item-3" style={{
                                            backgroundImage: `url("/WhatsApp Image 2025-11-20 at 22.44.11_1948b613.jpg")`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat",
                                        }}>
                                        </div>
                                        <div class="item item-4" style={{
                                            backgroundImage: `url("/WhatsApp Image 2025-11-20 at 22.52.54_59d2976f.jpg")`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat",
                                        }}>
                                        </div>
                                        <div class="item item-5" style={{
                                            backgroundImage: `url("/WhatsApp Image 2025-11-20 at 22.44.24_62ceb7b7.jpg")`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat",
                                        }}>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <p style={{ letterSpacing: "2rem" }}>ACCESSORIES</p>
                            <h2 className='display-4' style={{ lineHeight: "4rem", letterSpacing: "2px" }}>TRENDY ADD-ONS FOR EVERY OUTFIT</h2>
                            <button className='btn btn-dark btn-lg rounded-pill ps-4 py-1'>HAVE COOL STUFFS<span className='ms-4'><img src="/Arrow right.svg" alt="" /></span></button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}
