import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export const useAuth = () => {
	const { data: session, status } = useSession()
	const router = useRouter()

	const isAuthenticated = status === 'authenticated'
	const isAuthor = (authorId: number) =>
		isAuthenticated && session?.user?.id === authorId

	const redirectToLogin = () => {
		if (!isAuthenticated) {
			router.push('/api/signin')
		}
	}

	return { session, isAuthenticated, isAuthor, redirectToLogin }
}
