import React from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { products } from "../data/productos";

const categories = ["Remeras", "Conjuntos", "Pantalones", "Camperas"];

function Camperas() {
    // Filtramos solo las camperas
    const camperas = products.filter((p) => p.category === "Camperas");

    return (
        <div>
            <Navbar categories={categories} onSelect={() => { }} />

            <main className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {camperas.map((p, idx) => (
                    <ProductCard key={idx} product={p} />
                ))}
            </main>
        </div>
    );
}

export default Camperas;
