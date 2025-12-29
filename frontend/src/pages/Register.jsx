import { useState, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Bottom from '@/components/Btn';
import Input from '@/components/input';
const Register = () => {
	const [formData, setFormData] = useState({
		username: '',
		name: '',
		lastName: '',
		email: '',
		password: '',
	});
	const { register } = useContext(AuthContext);
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
			await register(
				formData.username,
				formData.name,
				formData.lastName,
				formData.email,
				formData.password
			);
			navigate('/dashboard');
		} catch (error) {
			alert(
				error.response?.data?.message ||
				'Error al registrar el usuario'
			);
		}
	};
	return (
		<div className='min-h-screen flex flex-col md:justify-center md:items-center bg-[#171f2b] text-white'>

			<div className='w-full h-full md:min-h-fit min-h-screen md:max-w-md p-6 md:p-8 rounded-2xl  md:shadow-xl bg-[#171f2b]/10 backdrop-blur-sm'>
				<h2 className='text-2xl font-bold mb-6 '>
					Registrarse
				</h2>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div className='space-y-4'>
						<div className='flex gap-4 flex-col md:flex-row'>
							<Input
								label="Name"
								name='name'
								type='text'
								value={formData.name}
								onChange={manejarCambio}
								required
							/>
							<Input
								label="Last Name"
								name='lastName'
								type='text'
								value={formData.lastName}
								onChange={manejarCambio}
								required
							/>
						</div>
						<Input
							label="Username"
							name='username'
							type='text'
							value={formData.username}
							onChange={manejarCambio}
							required
						/>
						<Input
							label="Email"
							name='email'
							type='email'
							value={formData.email}
							onChange={manejarCambio}
							required
						/>
						<Input
							label="Password"
							name='password'
							type='password'
							value={formData.password}
							onChange={manejarCambio}
							required
						/>
					</div>
					<div>
						<p href='/login' className='text-sm font-bold'>
							¿Tienes una cuenta?{' '}
							<a
								className=' text-[#3cb566] hover:underline'
								href='/login'
							>
								Inicia sesión
							</a>{' '}
						</p>
					</div>
					<div>
						<Bottom
						type='submit'
						>Registrarse</Bottom>
					</div>	
				</form >
			</div >
		</div >
	);
};

export default Register;
