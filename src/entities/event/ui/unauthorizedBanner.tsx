import { useRouter } from 'next/router'

export const UnauthorizedBanner: React.FC = () => {
	const router = useRouter()

	const handleLoginRedirect = () => {
		router.push('/api/auth/signin')
	}

	return (
		<div className='flex flex-col items-center justify-center w-full h-full min-h-screen  text-black p-6 rounded-s-lg'>
			<h1 className='text-xl font-bold'>
				Необходима авторизация для подробного просмотра события
			</h1>
			<button
				onClick={handleLoginRedirect}
				className='mt-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600'
			>
				Перейти на страницу авторизации
			</button>
		</div>
	)
}
