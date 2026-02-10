import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, ArrowRightLeft, TrendingUp, TrendingDown } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import Input from "@/components/Input";
import api from "@/api/axios";
import { useFinance } from "../context/FinanceContext";

const NewMovement = () => {
    const { refreshData, accounts, categories } = useFinance();
    const navigate = useNavigate();
    const [type, setType] = useState("expense"); // Empezamos por defecto en gasto

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        amount: "",
        description: "",
        account: "",
        destinationAccount: "",
        type: type,
        date: new Date().toISOString().slice(0, 10),
    });

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTypeChange = (newType) => {
        setType(newType);
        setFormData({ ...formData, type: newType });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const isTransfer = type === "transfer";
            const endpoint = isTransfer ? "/transaction/transfer" : "/transaction/";
            const payload = isTransfer ? {
                amount: Number(formData.amount),
                description: formData.description,
                type: "transfer",
                fromAccountId: formData.account,
                toAccountId: formData.destinationAccount,
            } : {
                name: formData.name,
                amount: Number(formData.amount),
                description: formData.description,
                type: type, 
                accountId: formData.account,
                categoryId: formData.category,
            };

            await api.post(endpoint, payload);
            await refreshData();
            navigate("/dashboard");
        } catch (error) {
            console.error("Error al crear el movimiento:", error.response?.data || error);
        }
    };

    const typeMovement = [
        { id: "expense", label: "Gasto", icon: TrendingDown, color: "text-red-500" },
        { id: "income", label: "Ingreso", icon: TrendingUp, color: "text-emerald-500" },
        { id: "transfer", label: "Transferencia", icon: ArrowRightLeft, color: "text-blue-500" }
    ];

    const isValid = type === "transfer"
        ? !formData.amount || !formData.account || !formData.destinationAccount || formData.account === formData.destinationAccount
        : !formData.amount || !formData.account;

    // Colores dinámicos según el tipo
    const themeColor = type === "income" ? "emerald" : type === "expense" ? "red" : "blue";

    return (
        <div className="min-h-screen bg-[#09090b] text-white p-6 md:p-12 lg:p-20 pb-32">
            <div className="max-w-md mx-auto">
                
                {/* Header Premium */}
                <header className="flex items-center gap-6 mb-10">
                    <Link to="/dashboard" className="p-3 bg-zinc-900 hover:bg-zinc-800 rounded-2xl transition-all border border-white/5 active:scale-90">
                        <ArrowLeft size={22} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black tracking-tighter italic uppercase">Nuevo Movimiento</h1>
                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">Registro de actividad</p>
                    </div>
                </header>

                {/* --- SELECTOR DE TIPO (Pills) --- */}
                <div className="flex p-1.5 bg-zinc-900 rounded-[2rem] mb-10 border border-white/5 shadow-inner">
                    {typeMovement.map((t) => {
                        const Icon = t.icon;
                        const isSelected = type === t.id;
                        return (
                            <button
                                key={t.id}
                                type="button"
                                onClick={() => handleTypeChange(t.id)}
                                className={`flex-1 flex items-center justify-center gap-2 py-4 text-[10px] font-black uppercase tracking-widest rounded-[1.5rem] transition-all duration-300 ${
                                    isSelected 
                                    ? 'bg-zinc-800 text-white shadow-xl scale-[1.02] border border-white/5' 
                                    : 'text-zinc-600 hover:text-zinc-400'
                                }`}
                            >
                                <Icon size={14} className={isSelected ? t.color : "text-zinc-700"} />
                                <span className="hidden sm:inline">{t.label}</span>
                            </button>
                        );
                    })}
                </div>

                <form onSubmit={handleSubmit}>
                    <SectionWrapper className="bg-[#121212] p-8 rounded-[2.5rem] border border-white/5 flex flex-col gap-8 shadow-2xl relative overflow-hidden">
                        
                        {/* Brillo dinámico según el tipo de movimiento */}
                        <div className={`absolute -top-24 -right-24 w-64 h-64 opacity-10 blur-[100px] rounded-full pointer-events-none transition-colors duration-700 bg-${themeColor}-500`} />

                        {/* Input de Nombre (Solo si no es transferencia) */}
                        {type !== "transfer" && (
                            <Input
                                label="Concepto / Nombre"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={manejarCambio}
                                placeholder="Ej: Supermercado, Pago Nómina..."
                                required
                            />
                        )}

                        {/* Input de Monto */}
                        <Input
                            label="Monto del Movimiento"
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={manejarCambio}
                            placeholder="0.00"
                            required
                        />

                        {/* Selección de Cuenta Origen */}
                        <div className="space-y-3">
                            <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">
                                {type === "transfer" ? "Desde la Cuenta" : "Cuenta de Origen"}
                            </label>
                            <div className="relative">
                                <select
                                    className="w-full p-4 bg-zinc-900 border border-white/5 rounded-2xl outline-none appearance-none text-sm font-bold focus:border-white/20 transition-all cursor-pointer"
                                    value={formData.account}
                                    name="account"
                                    onChange={manejarCambio}
                                    required
                                >
                                    <option value="">Selecciona una cuenta</option>
                                    {accounts.map((acc) => (
                                        <option key={acc._id} value={acc._id}>{acc.name}</option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600">
                                    <TrendingDown size={14} />
                                </div>
                            </div>
                        </div>

                        {/* Selección de Categoría o Cuenta Destino */}
                        {type === "transfer" ? (
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1 text-blue-500">
                                    Cuenta de Destino
                                </label>
                                <div className="relative">
                                    <select
                                        className="w-full p-4 bg-zinc-900 border border-blue-500/20 rounded-2xl outline-none appearance-none text-sm font-bold focus:border-blue-500/40 transition-all cursor-pointer"
                                        value={formData.destinationAccount}
                                        name="destinationAccount"
                                        onChange={manejarCambio}
                                        required
                                    >
                                        <option value="">¿A dónde va el dinero?</option>
                                        {accounts.map((acc) => (
                                            <option key={acc._id} value={acc._id} disabled={acc._id === formData.account}>
                                                {acc.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-blue-500">
                                        <TrendingUp size={14} />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Categoría</label>
                                <div className="relative">
                                    <select
                                        className="w-full p-4 bg-zinc-900 border border-white/5 rounded-2xl outline-none appearance-none text-sm font-bold focus:border-white/20 transition-all cursor-pointer"
                                        value={formData.category}
                                        name="category"
                                        onChange={manejarCambio}
                                        required
                                    >
                                        <option value="">Elige una categoría</option>
                                        {categories.map((cat) => (
                                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600">
                                        <ArrowRightLeft size={14} />
                                    </div>
                                </div>
                            </div>
                        )}

                        <Input
                            label="Notas Adicionales"
                            placeholder="Detalles del movimiento..."
                            value={formData.description}
                            name="description"
                            onChange={manejarCambio}
                            required
                        />

                        {/* Botón de Confirmación Estilo Apple */}
                        <button
                            type="submit"
                            className={`w-full font-black uppercase tracking-[0.2em] py-5 rounded-[1.5rem] mt-4 transition-all duration-300 flex items-center justify-center gap-3 text-xs shadow-xl
                                ${isValid 
                                    ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed opacity-50' 
                                    : 'bg-white text-black hover:bg-zinc-200 active:scale-[0.98]'}`}
                            disabled={isValid}
                        >
                            <Check size={18} strokeWidth={4} />
                            Confirmar {type === 'expense' ? 'Gasto' : type === 'income' ? 'Ingreso' : 'Transferencia'}
                        </button>
                    </SectionWrapper>
                </form>
            </div>
        </div>
    );
};

export default NewMovement;