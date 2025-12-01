import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
    const { cart, clearCart, updateQuantity, removeFromCart, updateSize } = useContext(CartContext);

    const [modalOpen, setModalOpen] = useState(false);
    const [productToRemove, setProductToRemove] = useState(null);
    const [modalClearOpen, setModalClearOpen] = useState(false);

    const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

    const handleSendWhatsApp = () => {
        if (cart.length === 0) return;

        const items = cart
            .map((p) => {
                const size = p.size || "Sin talle";
                const category = p.category || "Sin categoría";
                return `• ${p.name} (${category}) - ${size} - ${p.quantity} x $${p.price} = $${p.price * p.quantity}`;
            })
            .join("%0A");

        const text = `Hola! Quiero comprar:%0A${items}%0A%0ATotal: $${total}`;
        const url = `https://wa.me/5491173568162?text=${text}`;
        window.open(url, "_blank");
    };

    const handleRemoveClick = (product) => {
        setProductToRemove(product);
        setModalOpen(true);
    };

    const confirmRemove = () => {
        removeFromCart(productToRemove);
        setModalOpen(false);
        setProductToRemove(null);
    };

    const cancelRemove = () => {
        setModalOpen(false);
        setProductToRemove(null);
    };

    const confirmClearCart = () => {
        clearCart();
        setModalClearOpen(false);
    };

    return (
        <div className="p-6 min-h-screen flex flex-col items-center relative">
            <h2 className="text-2xl font-bold mb-4">Mi Carrito</h2>

            {cart.length === 0 ? (
                <p>Tu carrito está vacío</p>
            ) : (
                <>
                    <ul className="mb-4 w-full max-w-md">
                        {cart.map((p, idx) => (
                            <li key={idx} className="mb-2 border-b py-1 flex justify-between items-center">
                                <div>
                                    {p.name} - {p.category}
                                    <div className="mt-1">
                                        <label className="mr-2 text-sm">Talle:</label>
                                        <select
                                            value={p.size} // siempre definido por el contexto
                                            onChange={(e) => updateSize(p, e.target.value)}
                                            className="border rounded px-2 py-1 text-sm"
                                        >
                                            {Object.entries(p.sizes).map(([size, available]) => (
                                                <option key={size} value={size} disabled={!available}>
                                                    {available ? size : `${size} X`}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => updateQuantity(p, -1)} className="px-2 bg-gray-200 rounded">-</button>
                                    <span>{p.quantity}</span>
                                    <button onClick={() => updateQuantity(p, 1)} className="px-2 bg-gray-200 rounded">+</button>
                                    <span>${p.price * p.quantity}</span>
                                    <button
                                        onClick={() => handleRemoveClick(p)}
                                        className="px-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <p className="text-lg font-semibold mb-4">Total: ${total}</p>

                    <div className="flex gap-4">
                        <button
                            onClick={handleSendWhatsApp}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                        >
                            Enviar al WhatsApp
                        </button>

                        <button
                            onClick={() => setModalClearOpen(true)}
                            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                        >
                            Vaciar Carrito
                        </button>
                    </div>
                </>
            )}

            <Link to="/" className="mt-6 text-blue-600 hover:underline">
                Volver a la tienda
            </Link>

            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 max-w-sm w-full text-center">
                        <p className="mb-4">¿Eliminar {productToRemove?.name} del carrito?</p>
                        <div className="flex justify-center gap-4">
                            <button onClick={confirmRemove} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Eliminar</button>
                            <button onClick={cancelRemove} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition">Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            {modalClearOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 max-w-sm w-full text-center">
                        <p className="mb-4">¿Vaciar todo el carrito?</p>
                        <div className="flex justify-center gap-4">
                            <button onClick={confirmClearCart} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Sí, vaciar</button>
                            <button onClick={() => setModalClearOpen(false)} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition">Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;