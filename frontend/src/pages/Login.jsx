import { useState, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (error) {
            alert('Error al iniciar sesión');
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:items-center md:justify-center bg-black">
  {/* En móvil: sin bordes ni rounded. En escritorio: con bordes, shadow y max-width */}
  <div className="w-full h-full min-h-screen md:min-h-fit md:max-w-md p-6 md:p-8 bg-white md:rounded-2xl md:border md:border-gray-200 md:shadow-xl">
    
    <div className="mt-12 md:mt-0">
      <h2 className="text-3xl font-extrabold mb-2 text-gray-900">Bienvenido</h2>
      <p className="text-gray-500 mb-8">Inicia sesión para continuar</p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700">Email</label>
        <input 
          type="email" 
          placeholder="tu@correo.com"
          className="w-full p-3 mt-1 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <div className="flex justify-between items-center">
          <label className="block text-sm font-semibold text-gray-700">Contraseña</label> 
          <a className="text-xs font-bold text-blue-600 hover:text-blue-800" href="#">¿La olvidaste?</a>
        </div>
        <input 
          type="password" 
          placeholder="••••••••"
          className="w-full p-3 mt-1 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="pt-2">
        <button 
          type="submit" 
          className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 active:scale-[0.98] transition-all shadow-lg shadow-gray-200"
        >
          Entrar
        </button>
      </div>

      <p className="text-center text-sm text-gray-600">
        ¿No tienes una cuenta? <a className="font-bold text-blue-600 hover:underline" href="/register">Regístrate</a>
      </p>
    </form>
  </div>
</div>
    );
};

export default Login;