import React, { useState, useRef, useEffect, useContext } from "react";
import { FaChevronDown, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Navbar({ categories }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const [maxHeight, setMaxHeight] = useState("0px");
    const { cart } = useContext(CartContext);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        if (menuRef.current) {
            setMaxHeight(open ? `${menuRef.current.scrollHeight}px` : "0px");
        }
    }, [open]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`p-4 fixed top-0 left-0 w-full z-50 
            transition-all duration-700 ease-in-out
            ${scrolled
                    ? "bg-white/60 backdrop-blur-md shadow-md"
                    : "bg-transparent"
                } text-gray-900 flex flex-col sm:flex-row items-center justify-center`}
        >
            {/* Nombre del sitio */}
            <h1
                className={`font-[Bebas_Neue] font-extrabold tracking-tight bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-md
                transition-all duration-700 ease-in-out
                ${scrolled ? "text-3xl sm:text-5xl" : "text-4xl sm:text-6xl"}`}
            >
                <Link to="/">Mora</Link>
            </h1>

            {/* Botón de Categorías */}
            <div className="flex flex-col sm:absolute sm:left-4 items-center sm:items-start mt-2 sm:mt-0">
                <button
                    className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded hover:bg-white/30 transition text-sm sm:text-base mb-2 sm:mb-0 border border-white/30"
                    onClick={() => setOpen(!open)}
                >
                    Categorías
                    <FaChevronDown
                        className={`transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
                    />
                </button>

                {/* Menú desplegable */}
                <div
                    ref={menuRef}
                    style={{ maxHeight }}
                    className="overflow-hidden transition-all duration-300 ease-in-out flex flex-col sm:absolute top-full left-0 mt-1 bg-white text-black z-20 gap-2 w-full sm:w-44 rounded shadow-lg"
                >
                    {categories
                        .filter((cat) => cat !== "Todas")
                        .map((cat) => (
                            <Link
                                key={cat}
                                to={`/${cat.toLowerCase()}`}
                                className="px-4 py-2 hover:bg-gray-200 rounded text-sm sm:text-base"
                                onClick={() => setOpen(false)}
                            >
                                {cat}
                            </Link>
                        ))}
                </div>
            </div>

            {/* Carrito */}
            <div className="absolute right-4 top-4 sm:top-1/2 sm:-translate-y-1/2">
                <Link
                    to="/cart"
                    className="relative text-gray-900 text-xl hover:text-pink-500 transition"
                >
                    <FaShoppingCart />
                    {cart.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                            {cart.length}
                        </span>
                    )}
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;