import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { UserCircle2, Settings2 } from "lucide-react";
const DashboardHeader = () => {
  const { user, logout } = useContext(AuthContext);
  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString("es-ES", { month: "long", year: "numeric" });
  };

  return (
    <header className="flex justify-between items-center mb-8 w-full max-w-4xl mx-auto text-white px-4 md:px-0">
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight">
          Hola,{' '} 
          <span className="text-gray-200">{user?.username || "Invitado"}</span>
          👋
        </h1>
      </div>

      <div className="flex items-center gap-3">

        <button aria-label="Configuración" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors" onClick={logout}>
          <Settings2/>
        </button>
      </div>
    </header>
  );
};
export default DashboardHeader;
