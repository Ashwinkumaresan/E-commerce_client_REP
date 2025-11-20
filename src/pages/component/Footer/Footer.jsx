import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-dark text-light pt-5 pb-3 mt-5">
            <div className="container">

                <div className="row">

                    {/* Brand + Small Description */}
                    <div className="col-md-3 col-12 mb-4">
                        <h4 className="fw-bold">SnapCart</h4>
                        <p className="small m-0">
                            Your trusted destination for fashion, gadgets, accessories & more.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-md-3 col-6 mb-4">
                        <h6 className="fw-bold">Quick Links</h6>
                        <ul className="list-unstyled small">
                            <li><Link to="/home" className="text-light text-decoration-none">Home</Link></li>
                            <li><Link to="/products" className="text-light text-decoration-none">Products</Link></li>
                            <li><Link to="/offers" className="text-light text-decoration-none">Offers</Link></li>
                            <li><Link to="/contact" className="text-light text-decoration-none">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div className="col-md-3 col-6 mb-4">
                        <h6 className="fw-bold">Categories</h6>
                        <ul className="list-unstyled small">
                            <li><Link to="/fashion" className="text-light text-decoration-none">Fashion</Link></li>
                            <li><Link to="/electronics" className="text-light text-decoration-none">Electronics</Link></li>
                            <li><Link to="/shoes" className="text-light text-decoration-none">Shoes</Link></li>
                            <li><Link to="/accessories" className="text-light text-decoration-none">Accessories</Link></li>
                        </ul>
                    </div>

                    {/* Contact / Social */}
                    <div className="col-md-3 col-12 mb-4">
                        <h6 className="fw-bold">Get in Touch</h6>
                        <p className="small m-0">Email: support@repstore.com</p>
                        <p className="small m-0">Phone: +91 90000 00000</p>

                        <div className="d-flex gap-3 mt-2">
                            <a href="#" className="text-light fs-5"><i className="bi bi-facebook"></i></a>
                            <a href="#" className="text-light fs-5"><i className="bi bi-instagram"></i></a>
                            <a href="#" className="text-light fs-5"><i className="bi bi-twitter-x"></i></a>
                        </div>
                    </div>

                </div>

                <hr className="border-secondary" />

                {/* Bottom Text */}
                <div className="text-center small">
                    © {new Date().getFullYear()} SnapCart • All Rights Reserved.
                </div>

            </div>
        </footer>
    );
};

export default Footer;
