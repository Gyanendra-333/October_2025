import React from "react";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* 🛒 Brand Section */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-3">
                        E<span className="text-blue-500">Kart</span>
                    </h2>
                    <p className="text-sm text-gray-400">
                        Your one-stop shop for the latest trends and unbeatable prices.
                    </p>
                </div>

                {/* 🔗 Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/" className="hover:text-blue-400 transition">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/products" className="hover:text-blue-400 transition">
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:text-blue-400 transition">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-blue-400 transition">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* 💬 Support Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Customer Support</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/faq" className="hover:text-blue-400 transition">
                                FAQs
                            </Link>
                        </li>
                        <li>
                            <Link to="/shipping" className="hover:text-blue-400 transition">
                                Shipping
                            </Link>
                        </li>
                        <li>
                            <Link to="/returns" className="hover:text-blue-400 transition">
                                Returns
                            </Link>
                        </li>
                        <li>
                            <Link to="/privacy" className="hover:text-blue-400 transition">
                                Privacy Policy
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* 🌐 Social Icons */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
                    <div className="flex items-center gap-4">
                        <a href="#" className="hover:text-blue-500">
                            <Facebook size={22} />
                        </a>
                        <a href="#" className="hover:text-pink-500">
                            <Instagram size={22} />
                        </a>
                        <a href="#" className="hover:text-sky-500">
                            <Twitter size={22} />
                        </a>
                        <a href="#" className="hover:text-blue-400">
                            <Linkedin size={22} />
                        </a>
                    </div>
                </div>
            </div>

            {/* 📜 Copyright */}
            <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} <span className="text-blue-500 font-semibold">E-Kart</span>. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
