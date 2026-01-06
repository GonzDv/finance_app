import { useState, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import Buttom from '@/components/Btn';
import Input from '@/components/Input';

const Login = () => {
	const [passwordVisible, setPasswordVisible] = useState(false);

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { login } = useContext(AuthContext);
	const navigate = useNavigate();

	const manejarCambio = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await login(formData.email, formData.password);
			navigate('/dashboard');
		} catch (error) {
			alert(error.response?.data?.message || 'Error al iniciar sesión');
		}
	};

	return (
		<div className='min-h-screen flex flex-col md:justify-center md:items-center bg-[#171f2b] text-white'>
			<div className='w-full h-full md:min-h-fit min-h-screen md:max-w-md p-6 md:p-8 rounded-2xl md:shadow-xl bg-[#171f2b]/10 backdrop-blur-sm'>
				<div className='mt-12 md:mt-0'>
					<h2 className='text-3xl font-extrabold mb-2 '>
						Bienvenido
					</h2>
					<p className='mb-8 text-gray-300'>
						Inicia sesión para continuar
					</p>
				</div>

				<form onSubmit={handleSubmit} className='space-y-6'>

					<Input
						label="Email"
						name="email"
						type="email"
						placeholder="tu@correo.com"
						value={formData.email}
						onChange={manejarCambio}
					/>

					<div className="space-y-2">
						<div className='flex justify-between items-end'>
							<label className='text-sm font-semibold text-zinc-200'>
								Contraseña
							</label>
							<a className='text-xs font-bold text-zinc-500 hover:text-emerald-500 transition-colors' href='#'>
								¿La olvidaste?
							</a>
						</div>

						<div className="relative group">
							<Input
								name="password"
								type={passwordVisible ? 'text' : 'password'}
								placeholder="••••••••"
								value={formData.password}
								onChange={manejarCambio}
								className="pr-12"
							/>

							<button
								type='button'
								onClick={() => setPasswordVisible(!passwordVisible)}
								className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-white transition-colors focus:outline-none"
							>
								{passwordVisible ? (
									<EyeOff size={20} />
								) : (
									<Eye size={20} />
								)}
							</button>
						</div>
					</div>

					<div className='pt-2'>
						<Buttom type='submit'>Iniciar Sesión</Buttom>
					</div>

					<p className='text-center text-sm'>
						¿No tienes una cuenta?{' '}
						<a className='font-bold text-[#3cb566] hover:text-[#2a7a3e] hover:underline' href='/register'>
							Regístrate
						</a>
					</p>
				</form>
			</div>
		</div>
	);
};

export default Login;