import React, { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white/80 shadow-md fixed w-full top-0 left-0 z-50 backdrop-blur-sm" >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* 🛒 Logo */}
                    <Link to="/" className="text-2xl font-bold text-blue-600">
                        E<span className="text-gray-800">Kart</span>
                    </Link>

                    {/* 📱 Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none"
                        >
                            {isOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>

                    {/* 🌐 Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link
                            to="/"
                            className="text-gray-700 hover:text-blue-600 font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            to="/products"
                            className="text-gray-700 hover:text-blue-600 font-medium"
                        >
                            Products
                        </Link>
                        <Link
                            to="/about"
                            className="text-gray-700 hover:text-blue-600 font-medium"
                        >
                            About
                        </Link>
                        <Link
                            to="/contact"
                            className="text-gray-700 hover:text-blue-600 font-medium"
                        >
                            Contact
                        </Link>

                        {/* Buttons */}
                        <div className="flex items-center gap-3">
                            <Link
                                to="/login"
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                            >
                                Login
                            </Link>
                            <Link
                                to="/cart"
                                className="relative flex items-center text-gray-700 hover:text-blue-600"
                            >
                                <ShoppingCart size={22} />
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                                    3
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* 📱 Mobile Dropdown Menu */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-md border-t">
                    <div className="px-4 pt-2 pb-4 space-y-2">
                        <Link
                            to="/"
                            onClick={() => setIsOpen(false)}
                            className="block text-gray-700 hover:text-blue-600 font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            to="/products"
                            onClick={() => setIsOpen(false)}
                            className="block text-gray-700 hover:text-blue-600 font-medium"
                        >
                            Products
                        </Link>
                        <Link
                            to="/about"
                            onClick={() => setIsOpen(false)}
                            className="block text-gray-700 hover:text-blue-600 font-medium"
                        >
                            About
                        </Link>
                        <Link
                            to="/contact"
                            onClick={() => setIsOpen(false)}
                            className="block text-gray-700 hover:text-blue-600 font-medium"
                        >
                            Contact
                        </Link>
                        <div className="pt-2 border-t flex items-center justify-between">
                            <Link
                                to="/login"
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                            >
                                Login
                            </Link>
                            <Link
                                to="/cart"
                                onClick={() => setIsOpen(false)}
                                className="relative text-gray-700 hover:text-blue-600"
                            >
                                <ShoppingCart size={22} />
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                                    3
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
