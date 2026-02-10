import { Link } from "react-router-dom";
import { 
    ArrowLeft, User, Bell, Shield, CreditCard, 
    Layers, Globe, LogOut, ChevronRight, Moon, 
    CircleDollarSign, Sparkles 
} from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";

// --- SUB-COMPONENTE PARA FILAS DE OPCIONES ---
const SettingsRow = ({ icon: Icon, title, description, color, to, action }) => {
    const Content = (
        <div className="flex items-center justify-between p-5 hover:bg-white/[0.03] transition-all group cursor-pointer">
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl bg-zinc-900 border border-white/5 group-hover:scale-110 transition-transform ${color}`}>
                    <Icon size={20} />
                </div>
                <div>
                    <p className="text-sm font-bold text-zinc-100 tracking-tight">{title}</p>
                    {description && <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">{description}</p>}
                </div>
            </div>
            <ChevronRight size={16} className="text-zinc-700 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </div>
    );

    return to ? <Link to={to}>{Content}</Link> : <div onClick={action}>{Content}</div>;
};

const Settings = () => {
    return (
        <div className="min-h-screen bg-[#09090b] text-white p-6 md:p-12 lg:p-20 pb-40">
            <div className="max-w-2xl mx-auto">
                
                {/* Header Premium */}
                <header className="flex items-center gap-6 mb-12">
                    <Link to="/dashboard" className="p-3 bg-zinc-900 hover:bg-zinc-800 rounded-2xl transition-all border border-white/5 active:scale-90">
                        <ArrowLeft size={22} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black tracking-tighter italic uppercase">Ajustes</h1>
                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.25em]">Configuración de perfil</p>
                    </div>
                </header>

                {/* --- CARD DE PERFIL (Hero) --- */}
                <div className="relative bg-[#121212] rounded-[2.5rem] border border-white/10 p-8 mb-10 overflow-hidden shadow-2xl group transition-all hover:border-white/20">
                    <div className="absolute -top-20 -right-20 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
                    
                    <div className="relative z-10 flex items-center gap-6">
                        <div className="relative">
                            <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center border border-white/10 shadow-2xl">
                                <User size={32} className="text-zinc-400" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-emerald-500 p-1.5 rounded-xl border-4 border-[#121212]">
                                <Sparkles size={12} className="text-black" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-black tracking-tighter">Usuario Premium</h2>
                            <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">Miembro desde 2024</p>
                            <button className="mt-2 text-[9px] font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/5 transition-colors">
                                Editar Perfil
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- GRUPOS DE AJUSTES --- */}
                <div className="space-y-10">
                    
                    {/* Grupo: Finanzas */}
                    <div>
                        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-4 ml-6">Finanzas</p>
                        <div className="bg-[#121212] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-xl divide-y divide-white/[0.03]">
                            <SettingsRow 
                                icon={CreditCard} 
                                title="Mis Cuentas" 
                                description="Gestionar tarjetas y efectivo" 
                                color="text-blue-500"
                                to="/accounts"
                            />
                            <SettingsRow 
                                icon={Layers} 
                                title="Categorías" 
                                description="Límites de presupuesto" 
                                color="text-emerald-500"
                                to="/categories"
                            />
                            <SettingsRow 
                                icon={CircleDollarSign} 
                                title="Moneda Principal" 
                                description="MXN - Peso Mexicano" 
                                color="text-amber-500"
                            />
                        </div>
                    </div>

                    {/* Grupo: Preferencias */}
                    <div>
                        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-4 ml-6">Preferencias</p>
                        <div className="bg-[#121212] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-xl divide-y divide-white/[0.03]">
                            <SettingsRow 
                                icon={Bell} 
                                title="Notificaciones" 
                                description="Alertas de gastos y metas" 
                                color="text-purple-500"
                            />
                            <SettingsRow 
                                icon={Moon} 
                                title="Apariencia" 
                                description="Modo Oscuro Activado" 
                                color="text-zinc-400"
                            />
                            <SettingsRow 
                                icon={Globe} 
                                title="Idioma" 
                                description="Español (Latinoamérica)" 
                                color="text-cyan-500"
                            />
                        </div>
                    </div>

                    {/* Grupo: Seguridad */}
                    <div>
                        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-4 ml-6">Seguridad</p>
                        <div className="bg-[#121212] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-xl divide-y divide-white/[0.03]">
                            <SettingsRow 
                                icon={Shield} 
                                title="Privacidad" 
                                description="Bloqueo con PIN o FaceID" 
                                color="text-rose-500"
                            />
                            <div className="flex items-center justify-between p-5 hover:bg-red-500/5 transition-all group cursor-pointer" onClick={() => console.log('Log out')}>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500">
                                        <LogOut size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-red-500 tracking-tight">Cerrar Sesión</p>
                                        <p className="text-[10px] text-red-500/50 font-black uppercase tracking-widest">Desconectar cuenta</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer Info */}
                <div className="mt-12 text-center">
                    <p className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em]">Expense Tracker v1.0.4</p>
                </div>
            </div>
        </div>
    );
};

export default Settings;