import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import Input from "@/components/Input";
import button from "@/components/btn";
import api from "@/api/axios";
import { useFinance } from "../context/FinanceContext";
const NewMovement = () => {
    const { refreshData, accounts, categories } = useFinance();
    const navigate = useNavigate();
    const [type, setType] = useState("income");

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
    const handleTypeChange = (e) => {
        setType(e);
        setFormData({ ...formData, type: e });
        console.log(e);
    }
    console.log(type);
    const typeMovement = ["expense", "income", "transfer"];
    const isValid = type === "transfer"
        ? !formData.amount || !formData.account || !formData.destinationAccount || formData.account === formData.destinationAccount
        : !formData.amount || !formData.account;
    return (
        <div className="min-h-screen bg-[#121212] text-white p-6">
            <header className="flex items-center gap-4 mb-8 max-w-md mx-auto">
                <Link to="/dashboard" className="p-2 hover:bg-gray-800 rounded-full">
                    <ArrowLeft size={20} />
                </Link>
                <h2 className="text-xl font-bold">Nuevo Movimiento</h2>
            </header>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">

                <div className="flex bg-gray-900 p-1 rounded-xl">
                    {typeMovement.map((t) => (
                        <button
                            key={t}
                            type="button"

                            onClick={() => handleTypeChange(t)}
                            className={`flex-1 py-2 text-xs font-bold rounded-lg capitalize transition-all focus:border-b-6 focus:border-b-[#60609b] border-b-6 border-b-gray-900  ${type === t ? "bg-white text-black" : "text-gray-500"
                                }`}
                        >
                            {t === "expense"
                                ? "Gasto"
                                : t === "income"
                                    ? "Ingreso"
                                    : t === "transfer"
                                        ? "Transferencia"
                                        : ""}
                        </button>


                    ))}
                </div>

                <SectionWrapper className="space-y-4">
                    {type === "transfer" ?
                        "" : <Input
                            label="Nombre Ingreso"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={manejarCambio
                            }
                            required
                        />}
                    <Input
                        label="Monto (MXN)"
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={manejarCambio
                        }
                        required
                    />

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Cuenta</label>
                        <select
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl outline-none"
                            value={formData.account}
                            name="account"
                            onChange={manejarCambio}
                            required
                        >
                            <option value="">Selecciona cuenta</option>
                            {accounts.map((acc) => (
                                <option key={acc._id} value={acc._id}>
                                    {acc.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {type === "transfer" ? (
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">
                                Cuenta Destino
                            </label>
                            <select
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl outline-none"
                                value={formData.destinationAccount}
                                name="destinationAccount"
                                onChange={manejarCambio}
                                required
                            >
                                <option value="">¿A dónde va el dinero?</option>
                                {accounts.map((acc) => (
                                    <option key={acc._id} value={acc._id}>
                                        {acc.name}

                                    </option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">
                                Categoría
                            </label>
                            <select
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl outline-none"
                                value={formData.category}
                                name="category"
                                onChange={manejarCambio}
                                required
                            >
                                <option value="">Categoría</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}

                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <Input
                        label="Descripción"
                        placeholder="¿En qué lo gastaste?"
                        value={formData.description}
                        name="description"
                        onChange={manejarCambio}
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-white text-black font-bold py-3 rounded-xl mt-4 flex items-center justify-center gap-2 hover:border-b-6 hover:border-b-[#60609b] border-b-6 border-b-gray-900 pointer"
                        disabled={isValid}
                    >
                        <Check size={18} /> Confirmar {type}
                    </button>
                </SectionWrapper>
            </form>
        </div>
    );
};
export default NewMovement;