import { ArrowLeft, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo, useState } from 'react';
import { useFinance } from '@/context/FinanceContext';
import MovementItem from "@/components/MovementItem"; 
import Modal from "../components/Models/ModelConfirmation";
const History = () => {
    const { categories, transactions, loading } = useFinance();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [movementToDelete, setMovementToDelete] = useState(null);
    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
        if (categoryId === "all") {
            setSearchTerm("");
        }
        else {
            const category = categories.find(cat => cat._id === categoryId);
            if (category) {
                setSearchTerm(category.name);
            }
        }
    }

    
    const filteredTransactions = useMemo(() => {
        return transactions.filter(t => 
            t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [transactions, searchTerm]);

    const groupedTransactions = useMemo(() => {
        const groups = filteredTransactions.reduce((acc, transaction) => {
            const date = new Date(transaction.date).toLocaleDateString('es-MX', {
                day: 'numeric', month: 'long'
            });

            if (!acc[date]) acc[date] = [];
            acc[date].push(transaction);
            return acc;
        }, {});

        return Object.entries(groups).map(([date, movements]) => ({
            id: date,
            date,
            movements
        }));
    }, [filteredTransactions]);

    if (loading) return <p className="text-zinc-500 p-10 text-center">Cargando historial...</p>;

    return (
        <div className="min-h-screen bg-[#09090b] text-white p-6 md:p-12 lg:p-20">
            <div className="max-w-2xl mx-auto">
                <header className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link to="/dashboard" className="p-2 hover:bg-zinc-800 rounded-full transition-colors border border-white/5">
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 className="text-2xl font-bold">Historial</h1>
                    </div>
                    <button className="p-2 text-zinc-400 hover:text-white">
                        <Filter size={20} />
                    </button>
                </header>

                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar por nombre o categoría..."
                        className="w-full bg-zinc-900/50 border border-white/5 pl-12 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-zinc-600"
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto no-scrollbar mb-8 pb-2">
                    <button 
                    key="all"
                    onClick={() => handleCategorySelect("all")}
                        className="shrink-0 px-5 py-2 bg-emerald-500 text-white rounded-full text-sm font-bold">
                        Todos
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat._id}
                            onClick={() => handleCategorySelect(cat._id)}
                            className="shrink-0 px-5 py-2 bg-zinc-800/50 border border-white/5 rounded-full text-sm text-zinc-400 hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors"
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                <div className="space-y-8">
                    {groupedTransactions.length > 0 ? (
                        groupedTransactions.map((group) => (
                            <div key={group.id} className="space-y-4">
                                <h2 className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold ml-1">
                                    {group.date}
                                </h2>

                                <div className="bg-zinc-900/30 rounded-3xl border border-white/5 divide-y divide-white/5 overflow-hidden">
                                    {group.movements.map((movement) => (
                                        <MovementItem
                                            key={movement._id}
                                            movement={movement}
                                            
                                            onEdit={(m) => console.log("Editando", m)}
                                            onDelete={(id) => console.log("Borrando", id)}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))
                        
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-zinc-500">No se encontraron movimientos.</p>
                        </div>
                    )}
                    <Modal
                        isOpen={!!movementToDelete}
                        onClose={() => setMovementToDelete(null)}
                        title="Confirmar Eliminación"
                        Id={movementToDelete?._id}
                        Name={movementToDelete?.description}
                    >
                        <p className="text-sm text-gray-300">
                            ¿Estás seguro de que deseas eliminar el movimiento 
                            <span className="font-semibold text-white"> {movementToDelete?.description}</span>?
                        </p>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default History;