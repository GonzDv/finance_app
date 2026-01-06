import { Utensils, Car, ShoppingBag, HeartPulse, Pizza, Shirt, Coffee, Gamepad2, Briefcase } from "lucide-react";
export const CATEGORY_ICONS = {
    Utensils,
    Car,
    ShoppingBag,
    HeartPulse,
    Pizza,
    Shirt,
    Coffee,
    Gamepad2,
    Briefcase
};

// 2. Array para el Grid de selección (con tus estilos)
export const AVAILABLE_ICONS = [
    { id: 'Utensils', label: 'Útil', colorClass: 'border-blue-400 text-blue-400' },
    { id: 'Car', label: 'Carro', colorClass: 'border-orange-400 text-orange-400' },
    { id: 'ShoppingBag', label: 'Compras', colorClass: 'border-pink-400 text-pink-400' },
    { id: 'HeartPulse', label: 'Salud', colorClass: 'border-emerald-400 text-emerald-400' },
    { id: 'Pizza', label: 'Comida', colorClass: 'border-amber-400 text-amber-400' },
    { id: 'Shirt', label: 'Ropa', colorClass: 'border-indigo-400 text-indigo-400' },
    // Agregamos los 3 restantes para completar tus 9
    { id: 'Coffee', label: 'Ocio', colorClass: 'border-yellow-200 text-yellow-200' },
    { id: 'Gamepad2', label: 'Juegos', colorClass: 'border-purple-400 text-purple-400' },
    { id: 'Briefcase', label: 'Trabajo', colorClass: 'border-slate-400 text-slate-400' },
];