import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { FaUserTie } from 'react-icons/fa'

export const AuthStatus: React.FC = () => {
	const { data: session, status } = useSession()

	if (status === 'loading') {
		return <div>Loading...</div>
	}

	return (
		<div className='flex items-center space-x-4'>
			{session ? (
				<>
					<span className='text-white text-lg font-semibold'>
						{session.user?.name || 'Пользователь'}
					</span>
					<FaUserTie className='w-8 h-8' />
					<button
						onClick={() => signOut()}
						className='bg-red-600 text-white px-4 py-2 rounded-md font-medium transition duration-300 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500'
					>
						Выйти
					</button>
				</>
			) : (
				<button
					onClick={() => signIn()}
					className='bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
				>
					Войти
				</button>
			)}
		</div>
	)
}
