import { products } from "./productos.js"; // debe coincidir con el nombre exportado
import fs from "fs";

function generateShortId(length = 8) {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < length; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
}

const productsWithId = products.map((p) => ({
    id: generateShortId(),
    ...p,
}));

// Guardar en la misma carpeta
fs.writeFileSync(
    "./productsWithId.js",
    "export const products = " + JSON.stringify(productsWithId, null, 2)
);

console.log("✅ Archivo generado: productsWithId.js");