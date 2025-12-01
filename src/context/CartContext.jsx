import { createContext, useState } from "react";

export const CartContext = createContext();

// Helper: obtiene el primer talle disponible
function getFirstAvailableSize(sizes) {
    if (!sizes) return null;

    // Si es objeto tipo { S: true, M: false, L: true }
    if (!Array.isArray(sizes)) {
        const entry = Object.entries(sizes).find(([, available]) => !!available);
        return entry ? entry[0] : null;
    }

    // Si es array tipo ["S","M","L"], asumimos todos disponibles
    return sizes.length ? sizes[0] : null;
}

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    const addToCart = (incoming) => {
        // Si no trae talle, tomar el primero disponible
        let ensuredSize = incoming.size;

        if (!ensuredSize) {
            const firstAvailable = Object.entries(incoming.sizes || {})
                .find(([size, available]) => available)?.[0];
            ensuredSize = firstAvailable || "S"; // fallback final
        }

        const product = { ...incoming, size: ensuredSize };

        setCart((prev) => {
            const existing = prev.find(
                (p) => p.name === product.name && p.size === product.size
            );
            if (existing) {
                return prev.map((p) =>
                    p === existing ? { ...p, quantity: p.quantity + 1 } : p
                );
            } else {
                return [...prev, { ...product, quantity: 1 }];
            }
        });
    };



    const removeFromCart = (product) => {
        setCart((prev) =>
            prev.filter(
                (p) => !(p.name === product.name && p.size === product.size)
            )
        );
    };

    const updateQuantity = (product, amount) => {
        setCart((prev) =>
            prev
                .map((p) =>
                    p.name === product.name && p.size === product.size
                        ? { ...p, quantity: Math.max(1, p.quantity + amount) }
                        : p
                )
                .filter((p) => p.quantity > 0)
        );
    };

    // Mantiene la fusión si existe la misma prenda en el nuevo talle
    const updateSize = (product, newSize) => {
        setCart((prev) => {
            const existing = prev.find(
                (p) => p.name === product.name && p.size === newSize
            );

            if (existing) {
                return prev
                    .map((p) => {
                        if (p.name === product.name && p.size === newSize) {
                            return { ...p, quantity: p.quantity + product.quantity };
                        }
                        return p;
                    })
                    .filter(
                        (p) =>
                            !(
                                p.name === product.name &&
                                p.size === product.size &&
                                p.size !== newSize
                            )
                    );
            } else {
                return prev.map((p) =>
                    p.name === product.name && p.size === product.size
                        ? { ...p, size: newSize }
                        : p
                );
            }
        });
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                updateSize,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}