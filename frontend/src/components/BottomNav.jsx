import SectionWrapper from "./SectionWrapper";
import { Link } from 'react-router-dom';
import { House, History, SlidersHorizontal, ChartColumnIncreasing, Plus } from "lucide-react";
const ButtomNav = () => {
    return (
        <SectionWrapper className="flex w-full z-10 fixed position-bottom left-0 bottom-0  justify-center items-center ">
            <div className="container flex  justify-between ">
                <Link
                    className="flex flex-col justify-center items-center"
                    to="/dashboard">
                    <House />
                    home
                </Link>
                <Link
                    className="flex flex-col justify-center items-center"
                    to="/history">
                    <History />
                    Hitorial
                </Link>
                <div className="relative inline-block group">
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform delay-100">

                        <ul className="py-2 text-sm text-gray-300">
                            <li>
                                <Link to="/new-movement" className="block px-4 py-3 hover:bg-white/5 hover:text-white transition-colors">
                                    Nuevo movimiento
                                </Link>
                            </li>
                            <li className="border-t border-white/5">
                                <Link to="/new-category" className="block px-4 py-3 hover:bg-white/5 hover:text-white transition-colors">
                                    Nueva Categoria
                                </Link>
                            </li>
                        </ul>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 
                        border-l-8 border-l-transparent 
                        border-r-8 border-r-transparent 
                        border-t-8 border-t-zinc-900">
                        </div>
                    </div>

                    <span className="bg-white  text-black p-3 rounded-2xl shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center border border-gray-200 cursor-pointer">
                        <Plus size={28} strokeWidth={2.5} className="group-hover:rotate-90 transition-transform delay-100"  />
                    </span>
                </div>
                <Link
                    className="flex flex-col justify-center items-center "
                    to="/Analistics">
                    <ChartColumnIncreasing />
                    Analisis
                </Link>

                <Link
                    className="flex flex-col justify-center items-center"
                    to="/settings">
                    <SlidersHorizontal />
                    ajustes
                </Link>
            </div>
        </SectionWrapper>
    )
}
export default ButtomNav;