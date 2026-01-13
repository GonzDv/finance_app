import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper"; 
import Input from "@/components/Input";
import api from "@/api/axios";
import { useFinance } from "@/context/FinanceContext";
function NewAccount() {
    const navigate = useNavigate();
    const [type, setType] = useState("savings");
    const { refreshData } = useFinance();
    const [formData, setFormData] = useState({
        name: "",
        balance: "",
        type: type,
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
    const handleTypeChange = (e) => {
        setType(e);
        setFormData({ ...formData, type: e });
        console.log(e);
    }
    return (
        <div className="min-h-screen bg-[#121212] text-white p-6 md:p-20">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/dashboard" className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <h2 className="text-xl font-bold">Nueva Cuenta</h2>
                </div>

                <SectionWrapper className="flex flex-col gap-6">
                    <Input
                        label="Nombre de la Cuenta"
                        name="name"
                        value={formData.name}
                        onChange={manejarCambio}
                        placeholder="Ej: BBVA, Ahorros, Efectivo"
                        required
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Tipo de Cuenta</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={(e) => handleTypeChange(e.target.value)}
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-1 focus:ring-white outline-none appearance-none"
                        >
                            <option value="saving">Saving</option>
                            <option value="debit">Debit</option>
                            <option value="credit">Credit</option>
                        </select>
                    </div>

                    <Input
                        label="Balance Inicial"
                        name="balance"
                        type="number"
                        value={formData.balance}
                        onChange={manejarCambio}
                        placeholder="0.00"
                        required
                    />

                    <div className="flex items-center gap-4">
                        <div className="flex-1 rounded-full">
                            <label className="block text-sm font-medium text-gray-400 mb-2">Color de cuenta</label>
                            <input
                                type="color"
                                name="color"
                                value={formData.color}
                                onChange={manejarCambio}
                                className="w-10 h-10   border rounded-4xl border-gray-800  cursor-pointer"
                            />
                        </div>
    
                    </div>

                    <button 
                        type="submit"
                        className="w-full cursor-pointer bg-white text-black font-bold py-3 rounded-xl mt-4 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                    >
                        <Plus size={18} />
                        Crear Cuenta
                    </button>
                </SectionWrapper>
            </form>
        </div>
    );
}

export default NewAccount;