import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
		<div className='min-h-screen flex items-center justify-center bg-[#000000]'>
			<div className='max-w-md w-full p-8 bg-white rounded-lg border border-gray-200 shadow-sm'>
				<h2 className='text-2xl font-bold mb-6 text-gray-800'>
					Registrarse
				</h2>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div>
						<div className='flex gap-2'>
							<div>
								<label className='block text-sm font-medium text-gray-600'>
									Name
								</label>
								<input
									type='text'
									className='w-full p-2 mt-1 border border-gray-300 rounded focus:ring-1 focus:ring-black outline-none'
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
								<label className='block text-sm font-medium text-gray-600'>
									Last Name
								</label>
								<input
									type='text'
									className='w-full p-2 mt-1 border border-gray-300 rounded focus:ring-1 focus:ring-black outline-none'
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
						<label className='block text-sm font-medium text-gray-600'>
							Username
						</label>
						<input
							type='text'
							className='w-full p-2 mt-1 border border-gray-300 rounded focus:ring-1 focus:ring-black outline-none'
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
						<label className='block text-sm font-medium text-gray-600'>
							Email
						</label>
						<input
							type='email'
							className='w-full p-2 mt-1 border border-gray-300 rounded focus:ring-1 focus:ring-black outline-none'
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
						<label className='block text-sm font-medium text-gray-600'>
							Contraseña
						</label>
						<input
							type='password'
							className='w-full p-2 mt-1 border border-gray-300 rounded focus:ring-1 focus:ring-black outline-none'
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
						<p href='/login' className='text-sm '>
							¿Tienes una cuenta?{' '}
							<a
								className=' text-blue-600 hover:underline'
								href='/login'
							>
								Inicia sesión
							</a>{' '}
						</p>
					</div>
					<button
						type='submit'
						className='w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors'
					>
						Entrar
					</button>
				</form>
			</div>
		</div>
	);
};

export default Register;
