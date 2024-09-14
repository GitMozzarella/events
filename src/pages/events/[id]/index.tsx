import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { trpc } from '@/shared/api'
import { EventDetail } from '@/entities/event'
import { TRPCClientError } from '@trpc/client'
import { UnauthorizedBanner } from '@/entities/event'

export default function Event() {
	const router = useRouter()
	const { status } = useSession()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const {
		data: eventData,
		isLoading,
		isError
	} = trpc.event.findUnique.useQuery(
		{ id: Number(router.query.id) },
		{
			onError: error => {
				if (
					error instanceof TRPCClientError &&
					error.data?.httpStatus === 401
				) {
					setErrorMessage(
						'Для подробного просмотра события, необходима авторизация'
					)
				} else {
					setErrorMessage('Ошибка загрузки события. Попробуйте позже.')
				}
			}
		}
	)

	const showUnauthorizedBanner =
		isLoading ||
		(status === 'unauthenticated' && errorMessage) ||
		isError ||
		!eventData

	if (showUnauthorizedBanner) {
		return <UnauthorizedBanner />
	}

	return <EventDetail {...eventData} />
}
