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
		<div className='min-h-screen flex flex-col md:justify-center md:items-center bg-[#171f2b]'>
			{/* En móvil: sin bordes ni rounded. En escritorio: con bordes, shadow y max-width */}
			<div className='w-full h-full md:min-h-fit min-h-screen md:max-w-md p-6 md:p-8 rounded-2xl  md:shadow-xl bg-[#171f2b]/10 backdrop-blur-sm'>
				<h2 className='text-2xl font-bold mb-6 text-white'>
					Registrarse
				</h2>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div>
						<div className='flex gap-2  '>
							<div>
								<label className='block text-sm font-medium text-white'>
									Name
								</label>
								<input
									type='text'
									className='w-full p-3 mt-1 bg-[#343e47] rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all'
									value={formData.name}
									onChange={(e) =>
										setFormData({
											...formData,
											name: e.target
												.value,
										})
									}
									required
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-white'>
									Last Name
								</label>
								<input
									type='text'
									className='w-full p-3 mt-1 bg-[#343e47] rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all'
									value={formData.lastName}
									onChange={(e) =>
										setFormData({
											...formData,
											lastName: e
												.target
												.value,
										})
									}
									required
								/>
							</div>
						</div>
					</div>
					<div>
						<label className='block text-sm font-medium text-white'>
							Username
						</label>
						<input
							type='text'
								className='w-full p-3 mt-1 bg-[#343e47] rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all'
							value={formData.username}
							onChange={(e) =>
								setFormData({
									...formData,
									username: e.target.value,
								})
							}
							required
						/>
					</div>
					<div>
						<label className='block text-sm font-medium text-white'>
							Email
						</label>
						<input
							type='email'
							className='w-full p-3 mt-1 bg-[#343e47] rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all'
							value={formData.email}
							onChange={(e) =>
								setFormData({
									...formData,
									email: e.target.value,
								})
							}
							required
						/>
					</div>
					<div>
						<label className='block text-sm font-medium text-white'>
							Contraseña
						</label>
						<input
							type='password'
							className='w-full p-3 mt-1 bg-[#343e47] rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all'
							value={formData.password}
							onChange={(e) =>
								setFormData({
									...formData,
									password: e.target.value,
								})
							}
							required
						/>
					</div>
					<div>
						<p href='/login' className='text-sm font-bold text-white '>
							¿Tienes una cuenta?{' '}
							<a
								className=' text-[#3cb566] hover:underline'
								href='/login'
							>
								Inicia sesión
							</a>{' '}
						</p>
					</div>
					<Bottom
					type='submit'
					>Registrarse</Bottom>
					
				</form>
			</div>
		</div>
	);
};

export default Register;
