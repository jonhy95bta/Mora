import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
    return (
        <a
            href="https://wa.me/5491173568162" // Cambiá por tu número con código de país, sin + ni espacios
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 z-50"
        >
            <FaWhatsapp className="text-3xl" />
        </a>
    );
}