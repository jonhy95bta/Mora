import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product, promo = false }) => {
    const { addToCart } = useContext(CartContext);
    const { name, image, hoverImage, price, sizes = {} } = product;

    const [showHover, setShowHover] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (!hoverImage || !isMobile) return;
        const interval = setInterval(() => {
            setShowHover(prev => !prev);
        }, 2000);
        return () => clearInterval(interval);
    }, [hoverImage, isMobile]);

    const handleAddClick = () => {
        setShowConfirm(true);
    };

    const confirmAdd = () => {
        addToCart(product);
        setShowConfirm(false);
    };

    return (
        <>
            <div className="bg-white shadow-md rounded-lg overflow-hidden group relative">
                {/* 🔥 Etiqueta de promoción */}
                {promo && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                        🔥 En Promo
                    </div>
                )}

                {/* Contenedor de imágenes */}
                <div
                    className="relative w-full h-60 overflow-hidden"
                    onMouseEnter={() => !isMobile && setShowHover(true)}
                    onMouseLeave={() => !isMobile && setShowHover(false)}
                >
                    <img
                        src={image}
                        alt={name}
                        className={`w-full h-full object-contain bg-white transition-all duration-700 ease-out ${showHover ? "opacity-0 scale-105" : "opacity-100 scale-100"}`}
                    />
                    {hoverImage && (
                        <img
                            src={hoverImage}
                            alt={`${name} hover`}
                            className={`absolute inset-0 w-full h-full object-contain bg-white transition-all duration-700 ease-out ${showHover ? "opacity-100 scale-105" : "opacity-0 scale-100"}`}
                        />
                    )}
                </div>

                {/* Info del producto */}
                <div className="p-4 flex flex-col gap-2">
                    <h3 className="text-lg font-semibold">{name}</h3>
                    <p className="text-gray-700 font-bold">${price}</p>

                    <div className="flex items-center gap-2 flex-wrap">
                        {Object.entries(sizes).map(([size, available]) => (
                            <span
                                key={size}
                                className={`w-8 h-8 flex items-center justify-center border rounded shadow-sm font-semibold ${available
                                    ? "bg-white text-black"
                                    : "bg-gray-200 text-red-500 line-through"
                                    }`}
                            >
                                {size}
                            </span>
                        ))}
                    </div>

                    <button
                        onClick={handleAddClick}
                        className="mt-2 bg-blue-600 text-white py-1 rounded hover:bg-blue-700 transition"
                    >
                        Agregar al carrito
                    </button>
                </div>
            </div>

            {/* Modal de confirmación */}
            {showConfirm && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
                        <h2 className="text-lg font-semibold mb-4">
                            ¿Agregar este producto al carrito?
                        </h2>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmAdd}
                                className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductCard;
