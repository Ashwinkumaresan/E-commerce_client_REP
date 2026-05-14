import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CategoryCarousel } from '../../component/Category Carousel/CategoryCarousel'
import axios from "axios"
import Footer from '../../component/Footer/Footer'
import { LazyBackground } from '../../component/Lazy Background/LazyBackground'

export const MainHome = () => {
    const navigate = useNavigate()
    const [signin, setSignin] = useState()

    useEffect(() => {
        if (localStorage.getItem("accessTokenCustomer")) setSignin(false)
        else setSignin(true)
    }, [])

    return (
        <>
            <div className="container pt-2">
                
                {/* NAVBAR */}
                <nav className="navbar custom-nav px-4 py-2 sticky-top">
                    <h6 className="m-0 fw-bold">What a Market</h6>

                    <div className="ms-auto d-flex align-items-center gap-3">
                        <Link to={"/product"}>
                            <button className="btn btn-outline-dark rounded-pill px-4">View Products</button>
                        </Link>

                        {signin && (
                            <Link to={"/customer-signin"}>
                                <button className="btn btn-dark rounded-pill px-4">Sign In</button>
                            </Link>
                        )}

                        {!signin && (
                            <button className="btn btn-dark rounded-pill btn-sm" onClick={() => navigate("/account-setting")}>
                                <i className="bi bi-person"></i>
                            </button>
                        )}
                    </div>
                </nav>

                {/* HERO SECTION */}
                <div className="hero container">
                    <h2 className='display-4'>Sale That Makes You Smile.</h2>
                    <p style={{ letterSpacing: "0.2rem" }}>Grab the Best Deals of the Season!</p>

                    <div className="grid">

                        <LazyBackground
                            src="/hero1.png"
                            className="item item-0 py-5 text-dark student-card"
                        >
                            <h4 className='fs-1 fw-bold'>Step Up Your Style.</h4>
                            <p className='fs-6'>Step Down the Price.</p>
                            <div className="content-on-hover">
                                <p className='fs-6 my-3'>
                                    Step into big savings with exclusive deals on top-trend shoes.
                                </p>
                                <button className='btn btn-dark rounded-pill px-5 py-1 fs-5 fw-medium'>Verify Now</button>
                            </div>
                        </LazyBackground>

                        <LazyBackground
                            src="/Student-special.png"
                            className="item item-1 py-5 student-card"
                        >
                            <h4 className='fs-1 fw-bold'>Students Specials</h4>
                            <p className='fs-6'>Big Looks, Small Prices.</p>
                            <div className="content-on-hover">
                                <p className='fs-6 my-3'>
                                    Grab our exclusive Student Offer and save more.
                                </p>
                                <button className='btn btn-light rounded-pill px-5 py-1 fs-5 fw-medium'>Verify Now</button>
                            </div>
                        </LazyBackground>

                        <LazyBackground
                            src="/Iphone.png"
                            className="item item-2 py-5 text-dark student-card"
                        >
                            <h4 className='fs-1 fw-bold'>Upgrade to iPhone.</h4>
                            <p className='fs-6'>Upgrade Your Work</p>
                            <div className="content-on-hover">
                                <p className='fs-6 my-3'>
                                    Upgrade to the latest iPhone with smart offers.
                                </p>
                                <button className='btn btn-dark rounded-pill px-5 py-1 fs-5 fw-medium'>Verify Now</button>
                            </div>
                        </LazyBackground>

                    </div>
                </div>

                {/* FASHION SECTION */}
                <div className="container py-5" style={{ width: "100vw", height: "100vh" }}>
                    <div className="row">
                        <div className="col-4">
                            <p style={{ letterSpacing: "2rem" }}>FASHION</p>
                            <h2 className='display-4' style={{ lineHeight: "4rem", letterSpacing: "2px" }}>
                                STYLE THAT SPEAKS BEFORE YOU DO
                            </h2>

                            <button className='btn btn-dark btn-lg rounded-pill ps-4 py-1'>
                                CHECK YOUR STYLE
                                <span className='ms-4'>
                                    <img src="/Arrow right.svg" loading="lazy" alt="" />
                                </span>
                            </button>
                        </div>

                        <div className="col-8">
                            <div className="grid">

                                <LazyBackground src="/Dress-1.png" className="item item-1" />
                                <LazyBackground src="/young-woman-beautiful-dress-hat.png" className="item item-3" />
                                <LazyBackground src="/young-woman-with-shopping-bags-beautiful-dress.png" className="item item-4" />
                                <LazyBackground src="/portrait-siblings-outdoors-brothers-day-celebration.png" className="item item-5" />

                            </div>
                        </div>
                    </div>
                </div>

                {/* APPLIANCES SECTION */}
                <LazyBackground
                    src="/wooden-surface-looking-out-library.jpg"
                    className="container py-5 text-light text-center"
                    style={{ width: "100vw", height: "100vh" }}
                >
                    <div className='mt-5'>
                        <p>TV | REFRIGERATOR | AIR CONDITIONER | STOVE | MIXER</p>
                        <h2 className='display-4 fw-bold'>
                            MAKE EVERY DAY EASIER WITH SMARTER APPLIANCES
                        </h2>

                        <button className='btn btn-light btn-lg rounded-pill ps-5 py-0 my-3'>
                            CHECK YOUR STYLE
                            <span className='ms-4'>
                                <img src="/Arrow right black.svg" loading="lazy" alt="" />
                            </span>
                        </button>
                    </div>
                </LazyBackground>

                {/* ACCESSORIES SECTION */}
                <div className="container py-5" style={{ width: "100vw", height: "100vh" }}>
                    <div className="row">
                        <div className="col-8">
                            <div className="grid">

                                <LazyBackground src="/smart-watch-with-handes.jpg" className="item item-1" />
                                <LazyBackground src="/Man-headset.jpg" className="item item-3" />
                                <LazyBackground src="/air-pods.jpg" className="item item-4" />
                                <LazyBackground src="/smart-phone-red-color.jpg" className="item item-5" />

                            </div>
                        </div>

                        <div className="col-4">
                            <p style={{ letterSpacing: "2rem" }}>ACCESSORIES</p>
                            <h2 className='display-4' style={{ lineHeight: "4rem", letterSpacing: "2px" }}>
                                TRENDY ADD-ONS FOR EVERY OUTFIT
                            </h2>

                            <button className='btn btn-dark btn-lg rounded-pill ps-4 py-1'>
                                HAVE COOL STUFFS
                                <span className='ms-4'>
                                    <img src="/Arrow right.svg" loading="lazy" alt="" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <Footer />
        </>
    )
}
