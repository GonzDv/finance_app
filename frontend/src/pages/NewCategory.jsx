import SectionWrapper from "@/components/SectionWrapper";
import Input from "@/components/Input";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Check, FolderTree } from "lucide-react";
import { useState } from "react"; 
import api from "@/api/axios";
import { CATEGORY_ICONS, AVAILABLE_ICONS } from "@/constants/icons";
import { useFinance } from "../context/FinanceContext";

const NewCategory = () => { 
    const navigate = useNavigate();
    const { refreshData } = useFinance();
    const [formData, setFormData] = useState({
        name: "",
        budget: "",
        icon: "Utensils", 
    });

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const seleccionarIcono = (id) => {
        setFormData({ ...formData, icon: id });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/categories", {
                ...formData,
                budget: Number(formData.budget),
            });
            await refreshData();
            navigate("/dashboard");
        } catch (error) {
            alert(error.response?.data?.message || "Error al registrar la categoría");
        }
    };

    // Obtener configuración del icono seleccionado para la vista previa
    const currentIconConfig = AVAILABLE_ICONS.find(i => i.id === formData.icon);
    const IconPreview = CATEGORY_ICONS[formData.icon] || FolderTree;

    return (
        <div className="min-h-screen bg-[#09090b] text-white p-6 md:p-12 lg:p-20 pb-32">
            <div className="max-w-md mx-auto">
                
                {/* Header Premium */}
                <header className="flex items-center gap-6 mb-10">
                    <Link to="/dashboard" className="p-3 bg-zinc-900 hover:bg-zinc-800 rounded-2xl transition-all border border-white/5 active:scale-90">
                        <ArrowLeft size={22} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black tracking-tighter italic uppercase">Nueva Categoría</h1>
                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">Control de presupuesto</p>
                    </div>
                </header>

                {/* --- LIVE PREVIEW (Mismo estilo que CategoryList) --- */}
                <div className="mb-10">
                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-4 ml-1">Vista Previa</p>
                    <div className="bg-[#121212] rounded-[2rem] border border-white/10 p-6 shadow-2xl relative overflow-hidden">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl bg-white/5 border ${currentIconConfig?.colorClass.split(' ')[0] || 'border-white/10'}`}>
                                    <IconPreview size={24} className={currentIconConfig?.colorClass || 'text-zinc-400'} />
                                </div>
                                <div>
                                    <p className="text-sm font-black uppercase tracking-tight text-white">
                                        {formData.name || "Nombre Categoría"}
                                    </p>
                                    <p className="text-[9px] text-zinc-500 uppercase font-black tracking-widest">Gasto mensual</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest mb-1">Presupuesto</p>
                                <p className="text-lg font-black tracking-tighter text-white">
                                    <span className="text-zinc-500 text-sm font-medium mr-1">$</span>
                                    {Number(formData.budget).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- FORMULARIO --- */}
                <form onSubmit={handleSubmit}>
                    <SectionWrapper className="bg-[#121212] p-8 rounded-[2.5rem] border border-white/5 flex flex-col gap-8 shadow-2xl">
                        
                        <Input
                            label="Nombre de la Categoría"
                            name="name"
                            value={formData.name}
                            onChange={manejarCambio}
                            placeholder="Ej: Entretenimiento, Despensa..."
                            required
                        />

                        <Input
                            label="Límite de Presupuesto"
                            name="budget"
                            type="number"
                            value={formData.budget}
                            onChange={manejarCambio}
                            placeholder="0.00"
                            required
                        />

                        {/* Selector de Iconos Premium */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Icono representativo</label>
                            <div className="grid grid-cols-4 gap-3 p-4 bg-zinc-950/50 rounded-3xl border border-white/5">
                                {AVAILABLE_ICONS.map(({ id, colorClass }) => {
                                    const IconComponent = CATEGORY_ICONS[id];
                                    const isSelected = formData.icon === id;

                                    return (
                                        <button
                                            key={id}
                                            type="button"
                                            onClick={() => seleccionarIcono(id)}
                                            className={`aspect-square rounded-2xl transition-all flex items-center justify-center border-2 relative group/icon ${
                                                isSelected
                                                    ? `${colorClass} bg-white/5 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]` 
                                                    : 'bg-zinc-900 text-zinc-600 border-transparent hover:border-white/10'
                                            }`}
                                        >
                                            <IconComponent size={22} strokeWidth={isSelected ? 2.5 : 2} className="group-hover/icon:scale-110 transition-transform" />
                                            {isSelected && (
                                                <div className="absolute -top-1 -right-1 bg-emerald-500 rounded-full p-0.5 shadow-lg">
                                                    <Check size={8} className="text-black stroke-[4]" />
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Botón de Submit - Estilo Apple High Contrast */}
                        <button
                            type="submit"
                            className="w-full bg-white text-black font-black uppercase tracking-widest py-5 rounded-[1.5rem] mt-4 hover:bg-zinc-200 transition-all active:scale-[0.98] shadow-xl flex items-center justify-center gap-3 text-xs"
                        >
                            <Plus size={18} strokeWidth={3} />
                            Crear Categoría
                        </button>
                    </SectionWrapper>
                </form>
            </div>
        </div>
    );
}

export default NewCategory;