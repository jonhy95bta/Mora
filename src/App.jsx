import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Remeras from "./pages/Remeras";
import Pantalones from "./pages/Pantalones";
import Conjuntos from "./pages/Conjuntos";
import Cart from "./pages/Cart";
import WhatsAppButton from "./components/ButtonWsp";
import Camperas from "./pages/Camperas";
import Navbar from "./components/Navbar"; // 🔥 Asegurate de importarlo
import { CartProvider } from "./context/CartContext";
import './firebase.js';

// Layout que agrega padding-top solo si NO estamos en Home
function Layout({ children }) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <div className={isHome ? "" : "pt-20"}>
      {children}
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar categories={["Remeras", "Conjuntos", "Pantalones", "Camperas"]} />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/remeras" element={<Remeras />} />
            <Route path="/pantalones" element={<Pantalones />} />
            <Route path="/conjuntos" element={<Conjuntos />} />
            <Route path="/camperas" element={<Camperas />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Layout>
      </Router>
      <WhatsAppButton />
    </CartProvider>
  );
}

export default App;