import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import Card from "@/components/Card";
import Input from "@/components/Input";
import button from "@/components/btn";
import api from "@/api/axios";

const NewMovement = () => {
    const navigate = useNavigate();
    const [type, setType] = useState("income");
    const [accounts, setAccounts] = useState([]);
    const [formData, setFormData] = useState({
        amount: "",
        description: "",
        account: "",
        destinationAccount: "",
        type: "income",
        date: new Date().toISOString().slice(0, 10),
    });
    useEffect(() => {
        const fetchAccounts = async () => {
            const { data } = await api.get("/accounts");
            setAccounts(data);
        };
        fetchAccounts();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint =
                formData.type === "transfer"
                    ? "/transaction/transfer"
                    : "/transaction/transfer";
            const payload = {
                ...formData,
                amount: Number(formData.amount),
            };
            await api.post(endpoint, payload);
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
        }
    };
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
                    {["expense", "income", "transfer"].map((t) => (
                        <button
                            key={t}
                            type="button"
                            onClick={() => setType(t)}
                            className={`flex-1 py-2 text-xs font-bold rounded-lg capitalize transition-all ${type === t ? "bg-white text-black" : "text-gray-500"
                                }`}
                        >
                            {t === "expense"
                                ? "Gasto"
                                : t === "income"
                                    ? "Ingreso"
                                    : "Transf."}
                        </button>
                    ))}
                </div>

                <Card className="space-y-4">
                    <Input
                        label="Monto (MXN)"
                        type="number"
                        value={formData.amount}
                        onChange={(e) =>
                            setFormData({ ...formData, amount: e.target.value })
                        }
                        required
                    />

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Cuenta</label>
                        <select
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl outline-none"
                            value={formData.account}
                            onChange={(e) =>
                                setFormData({ ...formData, account: e.target.value })
                            }
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
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        destinationAccount: e.target.value,
                                    })
                                }
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
                        <Input
                            label="Categoría"
                            placeholder="Ej: Comida, Renta..."
                            value={formData.category}
                            onChange={(e) =>
                                setFormData({ ...formData, category: e.target.value })
                            }
                        />
                    )}

                    <Input
                        label="Descripción"
                        placeholder="¿En qué lo gastaste?"
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                        }
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-white text-black font-bold py-3 rounded-xl mt-4 flex items-center justify-center gap-2"
                    >
                        <Check size={18} /> Confirmar {type}
                    </button>
                </Card>
            </form>
        </div>
    );
};
export default NewMovement;