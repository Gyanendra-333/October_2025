import { useState } from "react";
import { Menu, X } from "lucide-react"; // npm install lucide-react

const Header = () => {
    const [open, setOpen] = useState(false);

    return (
        <header className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg fixed top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <h1 className="text-3xl font-extrabold tracking-wide cursor-pointer">
                    MyLogo
                </h1>

                {/* Desktop Menu */}
                <nav className="hidden md:flex gap-8 text-lg font-medium">
                    <a href="#" className="hover:text-yellow-300 transition-all duration-300">Home</a>
                    <a href="#" className="hover:text-yellow-300 transition-all duration-300">About</a>
                    <a href="#" className="hover:text-yellow-300 transition-all duration-300">Services</a>
                    <a href="#" className="hover:text-yellow-300 transition-all duration-300">Contact</a>
                </nav>

                {/* Login Button */}
                <button className="hidden md:block bg-yellow-400 text-black px-5 py-2 rounded-xl font-semibold hover:bg-yellow-300 transition-all duration-300">
                    Login
                </button>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden bg-white text-black py-4 px-6 space-y-4 shadow-lg">
                    <a href="#" className="block hover:text-blue-600">Home</a>
                    <a href="#" className="block hover:text-blue-600">About</a>
                    <a href="#" className="block hover:text-blue-600">Services</a>
                    <a href="#" className="block hover:text-blue-600">Contact</a>
                    <button className="bg-blue-600 text-white w-full py-2 rounded-lg">
                        Login
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
