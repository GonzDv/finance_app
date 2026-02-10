import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Wallet, Check } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper"; 
import Input from "@/components/Input";
import api from "@/api/axios";
import { useFinance } from "@/context/FinanceContext";

function NewAccount() {
    const navigate = useNavigate();
    const { refreshData } = useFinance();
    
    const [formData, setFormData] = useState({
        name: "",
        balance: "",
        type: "savings",
        color: "#3b82f6", 
    });

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/accounts", {
                ...formData,
                balance: Number(formData.balance),
            });
            await refreshData();
            navigate("/dashboard");
        } catch (error) {
            alert(error.response?.data?.message || "Error al registrar la cuenta");
        }
    };

    const accountTypes = [
        { id: 'savings', label: 'Ahorros' },
        { id: 'debit', label: 'Débito' },
        { id: 'credit', label: 'Crédito' }
    ];

    return (
        <div className="min-h-screen bg-[#09090b] text-white p-6 md:p-12 lg:p-20 pb-32">
            <div className="max-w-md mx-auto">
                {/* Header Estilizado */}
                <header className="flex items-center gap-6 mb-10">
                    <Link to="/dashboard" className="p-3 bg-zinc-900 hover:bg-zinc-800 rounded-2xl transition-all border border-white/5 active:scale-90">
                        <ArrowLeft size={22} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black tracking-tighter italic uppercase">Nueva Cuenta</h1>
                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">Configura tu activo</p>
                    </div>
                </header>

                {/* --- LIVE PREVIEW (Vista Previa de la Tarjeta) --- */}
                <div className="mb-10 scale-105 sm:scale-100">
                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-4 ml-1">Vista Previa</p>
                    <div 
                        className="relative w-full h-44 rounded-[2.5rem] border border-white/10 p-7 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-500"
                        style={{ backgroundColor: '#121212' }}
                    >
                        <div 
                            className="absolute -top-20 -right-20 w-48 h-48 opacity-30 blur-[80px] rounded-full transition-all duration-700"
                            style={{ backgroundColor: formData.color }}
                        />
                        
                        <div className="relative z-10 flex justify-between items-start">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-white/5 border border-white/10" style={{ color: formData.color }}>
                                    <Wallet size={24} />
                                </div>
                                <span className="text-[11px] font-black uppercase tracking-[0.25em] text-zinc-400">
                                    {formData.name || "Nombre de Cuenta"}
                                </span>
                            </div>
                        </div>

                        <div className="relative z-10">
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Balance Inicial</p>
                            <h2 className="text-3xl font-black tracking-tighter">
                                <span className="text-zinc-500 text-xl font-medium mr-2">$</span>
                                {Number(formData.balance).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                            </h2>
                        </div>
                    </div>
                </div>

                {/* --- FORMULARIO --- */}
                <form onSubmit={handleSubmit}>
                    <SectionWrapper className="bg-[#121212] p-8 rounded-[2.5rem] border border-white/5 flex flex-col gap-8 shadow-2xl">
                        
                        {/* Input de Nombre */}
                        <Input
                            label="Nombre de la Cuenta"
                            name="name"
                            value={formData.name}
                            onChange={manejarCambio}
                            placeholder="Ej: Nómina Banamex"
                            required
                            inputMode="numeric"
                            className="bg-zinc-900 border-white/5 focus:border-emerald-500/50"
                        />

                        {/* Selector de Tipo (Pills en lugar de Select) */}
                        <div>
                            <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3 ml-1">Tipo de Cuenta</label>
                            <div className="flex p-1.5 bg-zinc-950 rounded-2xl border border-white/5">
                                {accountTypes.map((t) => (
                                    <button
                                        key={t.id}
                                        type="button"
                                        onClick={() => setFormData({...formData, type: t.id})}
                                        className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                                            formData.type === t.id 
                                            ? 'bg-zinc-800 text-white shadow-lg' 
                                            : 'text-zinc-600 hover:text-zinc-400'
                                        }`}
                                    >
                                        {t.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Input de Balance */}
                        <Input
                            label="Balance Inicial"
                            name="balance"
                            type="number"
                            value={formData.balance}
                            onChange={manejarCambio}
                            placeholder="0.00"
                            required
                        />

                        {/* Selector de Color */}
                        <div>
                            <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3 ml-1">Color de Identidad</label>
                            <div className="flex items-center gap-4 p-4 bg-zinc-900 rounded-2xl border border-white/5">
                                <input
                                    type="color"
                                    name="color"
                                    value={formData.color}
                                    onChange={manejarCambio}
                                    className="w-12 h-12 bg-transparent border-none cursor-pointer rounded-full overflow-hidden [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch]:rounded-xl"
                                />
                                <span className="text-xs font-bold text-zinc-400 uppercase tracking-tighter">
                                    {formData.color.toUpperCase()}
                                </span>
                                {formData.color && <Check size={16} className="ml-auto text-emerald-500" />}
                            </div>
                        </div>

                        {/* Botón de Submit */}
                        <button 
                            type="submit"
                            className="w-full bg-white text-black font-black uppercase tracking-widest py-5 rounded-[1.5rem] mt-4 hover:bg-zinc-200 transition-all active:scale-[0.98] shadow-xl flex items-center justify-center gap-3 text-xs"
                        >
                            <Plus size={18} strokeWidth={3} />
                            Registrar Cuenta
                        </button>
                    </SectionWrapper>
                </form>
            </div>
        </div>
    );
}

export default NewAccount;