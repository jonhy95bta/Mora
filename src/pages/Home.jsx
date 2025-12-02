import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { products } from "../data/productos";
import { destacados } from "../data/destacados";
import { FaTruck, FaWhatsapp, FaShippingFast, FaLaptopCode } from "react-icons/fa";

const categories = ["Remeras", "Conjuntos", "Pantalones", "Camperas"];

// 🟡 IDs de productos en promoción
const productosPromoIds = ["irmhkvlg", "20uhxpp4", "g8d8y7uk", "ssrvfpzv", "nym0omj3", "8s5wi6t6", "0svvjek0", "hl8p9wsr", "3tioy2op", "6cll3daa", "rpcpm4if", "1oibv6ki", "looahcqq"];
const productosEnPromo = products.filter(producto =>
    productosPromoIds.includes(producto.id)
);

function Home() {
    const scrollerRef = useRef(null); // Carrusel general
    const promoScrollerRef = useRef(null); // Carrusel de promo
    const [isMobile, setIsMobile] = useState(false);
    const [autoScroll, setAutoScroll] = useState(true);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile || !autoScroll) return;
        const scroller = scrollerRef.current;
        if (!scroller) return;

        const track = scroller.firstElementChild;
        const firstCard = track?.firstElementChild;
        if (!firstCard) return;

        const cardWidth = firstCard.offsetWidth + 16;

        const interval = setInterval(() => {
            scroller.scrollBy({ left: cardWidth, behavior: "smooth" });

            const nearEnd =
                scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - cardWidth;
            if (nearEnd) {
                scroller.scrollTo({ left: 0, behavior: "smooth" });
            }
        }, 2500);

        return () => clearInterval(interval);
    }, [isMobile, autoScroll]);

    const scrollByAmount = (amount) => {
        const scroller = scrollerRef.current;
        if (!scroller) return;
        setAutoScroll(false);
        scroller.scrollBy({ left: amount, behavior: "smooth" });
    };

    const scrollPromoByAmount = (amount) => {
        const scroller = promoScrollerRef.current;
        if (!scroller) return;
        scroller.scrollBy({ left: amount, behavior: "smooth" });
    };

    return (
        <div className="flex flex-col min-h-screen">
            <header>
                <Navbar categories={categories} onSelect={() => { }} />
            </header>

            <main className="flex-grow">
                {/* Banner
                <section className="w-full h-64 sm:h-96 md:h-[32rem] lg:h-[40rem] bg-gray-200 flex items-center justify-center">
                    <img
                        src="/img/Presentacion.png"
                        alt="Presentación"
                        className="w-full h-full object-cover"
                    />
                </section> */}

                {/* Sección Banner Nueva Colección */}
                <section className="w-full p-4 mt-18 md:p-6 my-8">
                    {/* Contenedor principal con estilos basados en el ejemplo */}
                    <div className="relative w-full rounded-2xl shadow-2xl overflow-hidden border-l-8 border-red-800 hover:shadow-red-900/30 transition-shadow duration-300">
                        <img
                            src="../img/bannernavidad(1).webp"
                            alt="Nueva Colección Fiestas: Navidad y Año Nuevo en Mora Indu Moda"
                            className="w-full h-auto object-cover"
                            width={1920}
                            height={1080}
                            loading="eager"
                        />


                    </div>
                </section>


                {/* Categorías */}
                <section className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    <Link to="/remeras" className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition cursor-pointer">
                        <h2 className="text-lg font-semibold">Remeras</h2>
                        <img src="../img/oversize.jpeg" alt="Remeras" className="w-full h-40 object-cover rounded mt-2" />
                    </Link>

                    <Link to="/conjuntos" className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition cursor-pointer">
                        <h2 className="text-lg font-semibold">Conjuntos</h2>
                        <img src="../img/conjuntoss.jpeg" alt="Conjuntos" className="w-full h-40 object-cover rounded mt-2" />
                    </Link>

                    <Link to="/pantalones" className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition cursor-pointer">
                        <h2 className="text-lg font-semibold">Pantalones</h2>
                        <img src="../img/jogginwideleg.jpeg" alt="Pantalones" className="w-full h-40 object-cover rounded mt-2" />
                    </Link>
                </section>

                {/* Promociones */}
                {/* <section className="p-6">
                    <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 border-l-8 border-yellow-600 text-yellow-900 p-6 rounded-xl shadow-lg text-center animate-pulse">
                        <h2 className="text-3xl font-extrabold mb-2 flex items-center justify-center gap-2">
                            🎉 <span className="text-red-600">¡Promo Especial! DIA DE LA MADRE</span> 🎉
                        </h2>
                        <p className="text-xl font-bold text-black">15% descuento en <span className="underline decoration-red-500">Todos los productos</span></p>
                        <p className="text-sm mt-3 text-gray-800 italic">Válido hasta el <strong>17 de Octubre</strong> o hasta agotar stock</p>
                    </div>
                </section> */}


                {/* Carrusel de productos en promoción */}
                {/* <section className="p-6 relative">
                    <h2 className="text-2xl font-bold mb-4">Productos en Promo</h2>

                    {!isMobile && (
                        <>
                            <button
                                onClick={() => scrollPromoByAmount(-300)}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white shadow px-2 py-1 rounded-full z-10 hover:bg-gray-100"
                            >
                                ◀
                            </button>
                            <button
                                onClick={() => scrollPromoByAmount(300)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white shadow px-2 py-1 rounded-full z-10 hover:bg-gray-100"
                            >
                                ▶
                            </button>
                        </>
                    )}

                    <div
                        ref={promoScrollerRef}
                        className={`${isMobile ? "overflow-x-auto" : "overflow-x-hidden"} w-full ${isMobile ? "scroll-smooth snap-x snap-mandatory" : ""}`}
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none"
                        }}
                    >
                        <div className="flex gap-4">
                            {productosEnPromo.map((p, idx) => (
                                <div
                                    key={idx}
                                    className="min-w-[250px] flex-shrink-0 snap-start"
                                >
                                    <ProductCard product={p} promo={true} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section> */}

                {/* Carrusel general de productos */}
                <section className="p-6 relative">
                    <h2 className="text-2xl font-bold mb-4">Productos Destacados</h2>

                    {!isMobile && (
                        <>
                            <button
                                onClick={() => scrollByAmount(-300)}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white shadow px-2 py-1 rounded-full z-10 hover:bg-gray-100"
                            >
                                ◀
                            </button>
                            <button
                                onClick={() => scrollByAmount(300)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white shadow px-2 py-1 rounded-full z-10 hover:bg-gray-100"
                            >
                                ▶
                            </button>
                        </>
                    )}

                    <div
                        ref={scrollerRef}
                        className={`${isMobile ? "overflow-x-auto" : "overflow-x-hidden"} w-full ${isMobile ? "scroll-smooth snap-x snap-mandatory" : ""}`}
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none"
                        }}
                    >
                        <div className="flex gap-4">
                            {destacados.map((p, idx) => (
                                <div
                                    key={idx}
                                    className="min-w-[250px] flex-shrink-0 snap-start"
                                >
                                    <ProductCard product={p} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Beneficios */}
                <section className="w-full bg-gray-100 py-8">
                    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                            <FaTruck className="text-5xl text-blue-600 mb-2 transition-colors duration-300 hover:text-blue-800" />
                            <h3 className="text-lg font-semibold">Envíos a todo el país</h3>
                            <p className="text-gray-600 text-sm">Próximamente.</p>
                        </div>

                        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                            <FaShippingFast className="text-5xl text-green-600 mb-2 transition-colors duration-300 hover:text-green-800" />
                            <h3 className="text-lg font-semibold">Entrega rápida</h3>
                            <p className="text-gray-600 text-sm">Recibí tu compra en tiempo récord.</p>
                        </div>

                        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                            <FaWhatsapp className="text-5xl text-green-500 mb-2 transition-colors duration-300 hover:text-green-700" />
                            <h3 className="text-lg font-semibold">Coordinar por WhatsApp</h3>
                            <p className="text-gray-600 text-sm">Hacé tu pedido fácil y rápido.</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-6">
                <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-300">
                        © {new Date().getFullYear()} Mora. Todos los derechos reservados.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                        <FaLaptopCode className="text-lg" />
                        <span>Desarrollado por Jonathan Aguirre</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;
