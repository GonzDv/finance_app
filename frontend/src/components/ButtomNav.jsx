import SectionWrapper from "./SectionWrapper";
import { Link } from "react-router-dom";
import {
    House,
    History,
    SlidersHorizontal,
    ChartColumnIncreasing,
    Plus,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
const ButtomNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex w-full z-10 fixed position-bottom left-0 bottom-0  justify-center items-center ">
            <SectionWrapper className="container flex  justify-between max-w-2xl mx-auto ">
                <Link
                    className="flex flex-col justify-center items-center"
                    to="/dashboard"
                >
                    <House />
                    Home
                </Link>
                <Link
                    className="flex flex-col justify-center items-center"
                    to="/history"
                >
                    <History />
                    Hitorial
                </Link>
                <div className="relative inline-block" ref={menuRef}>
                    <div
                        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl transition-all duration-300 transform 
                        ${isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"}`}
                    >
                        <ul className="py-2 text-sm text-gray-300">
                            <li>
                                <Link
                                    to="/new-movement"
                                    onClick={() => setIsOpen(false)}
                                    className="block px-4 py-3 hover:bg-white/5 hover:text-white transition-colors"
                                >
                                    Nuevo Movimiento
                                </Link>
                            </li>
                            <li className="border-t border-white/5">
                                <Link
                                    to="/new-category"
                                    onClick={() => setIsOpen(false)}
                                    className="block px-4 py-3 hover:bg-white/5 hover:text-white transition-colors"
                                >
                                    Nueva Categoria
                                </Link>
                            </li>
                        </ul>
                        <div
                            className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 
                            border-l-8 border-l-transparent 
                            border-r-8 border-r-transparent 
                            border-t-8 border-t-gray-400"
                        ></div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className=" bg-white border-b-6 border-b-zinc-400  text-black p-3 rounded-2xl shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center  cursor-pointer outline-none"
                    >
                        <Plus
                            size={28}
                            strokeWidth={2.5}
                            className={`transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}
                        />
                    </button>
                </div>
                <Link
                    className="flex flex-col justify-center items-center "
                    to="/Analistics"
                >
                    <ChartColumnIncreasing />
                    Analisis
                </Link>

                <Link
                    className="flex flex-col justify-center items-center"
                    to="/settings"
                >
                    <SlidersHorizontal />
                    Ajustes
                </Link>
            </SectionWrapper>
        </div>
    );
};
export default ButtomNav;
