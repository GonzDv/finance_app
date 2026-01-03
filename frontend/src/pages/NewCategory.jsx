import Card from "@/components/Card";
import SectionWrapper from "@/components/SectionWrapper";
import Input from "@/components/Input";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Utensils, Car, ShoppingBag, HeartPulse, Pizza, Shirt } from "lucide-react";
import { useState } from "react"; // Eliminamos useEffect si no se usa
import api from "@/api/axios";

const NewCategory = () => { // Quitamos onSelect si es una página independiente
    const navigate = useNavigate();

    const icons = [
        { id: 'Utensils', icon: Utensils, label: 'Útil' },
        { id: 'Car', icon: Car, label: 'Carro' },
        { id: 'ShoppingBag', icon: ShoppingBag, label: 'Compras' },
        { id: 'HeartPulse', icon: HeartPulse, label: 'Salud' },
        { id: 'Pizza', icon: Pizza, label: 'Comida' },
        { id: 'Shirt', icon: Shirt, label: 'Ropa' },
    ];

    const [formData, setFormData] = useState({
        name: "",
        budget: "",
        spent: "",
        icon: "Utensils", // Valor inicial correcto
    });

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const seleccionarIcono = (id) => {
        setFormData({ ...formData, icon: id });
        console.log("Icono seleccionado:", id);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/categories", {
                name: formData.name,
                budget: Number(formData.budget),
                spent: Number(formData.spent),
                icon: formData.icon,
            });
            navigate("/dashboard");
        } catch (error) {
            alert(error.response?.data?.message || "Error al registrar la categoría");
        }
    };
    const handleEdit = (e) => {
        e.preventDefault();
        
    }

    return (
        <div className="min-h-screen bg-[#09090b] text-white p-6 md:p-12 lg:p-20">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex items-center gap-4 mb-10">
                    <Link to="/dashboard" className="p-2 hover:bg-zinc-800 rounded-full transition-colors border border-white/5">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold">Nueva Categoría</h2>
                        <p className="text-zinc-500 text-sm">Organiza tus finanzas</p>
                    </div>
                </div>

                <SectionWrapper className="flex flex-col gap-6 p-6 rounded-3xl border border-white/5">
                    <Input
                        label="Nombre de la Categoría"
                        name="name"
                        value={formData.name}
                        onChange={manejarCambio}
                        placeholder="Ej: Comida, Transporte..."
                        required
                    />
                    <Input
                        label="Presupuesto"
                        name="budget"
                        type="number"
                        value={formData.budget}
                        onChange={manejarCambio}
                        placeholder="0.00"
                        required
                    />


                    <div className="space-y-3">
                        <label className="text-sm font-medium text-zinc-400 ml-1">Icono representativo</label>
                        <div className="grid grid-cols-3 gap-3 p-3 bg-zinc-950/50 rounded-2xl border border-white/5">
                            {icons.map(({ id, icon: Icon, label }) => (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => seleccionarIcono(id)}
                                    className={`aspect-square rounded-xl transition-all flex flex-col items-center justify-center gap-1.5 border-2 ${formData.icon === id
                                            ? 'bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/20'
                                            : 'bg-zinc-800 text-zinc-500 border-transparent hover:bg-zinc-700 hover:text-zinc-300'
                                        }`}
                                >
                                    <Icon size={22} strokeWidth={formData.icon === id ? 2.5 : 2} />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-white text-black font-bold py-4 rounded-2xl mt-4 hover:bg-zinc-200 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xl"
                    >
                        <Plus size={20} strokeWidth={3} />
                        Crear Categoría
                    </button>
                </SectionWrapper>
            </form>
        </div>
    );
}

export default NewCategory;