import { useState, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Buttom from '@/components/Btn';
import Input from '@/components/Input';

const Login = () => {
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

					<div className="relative">
						<div className='flex justify-between items-center mb-1'>
							<label className='block text-sm font-semibold'>
								Contraseña
							</label>
							<a className='text-xs font-bold text-gray-400 hover:text-gray-200 hover:underline' href='#'>
								¿La olvidaste?
							</a>
						</div>
						<Input
							name="password"
							type="password"
							placeholder="••••••••"
							value={formData.password}
							onChange={manejarCambio}
						/>
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