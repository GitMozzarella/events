import { useRouter } from 'next/router'
import { trpc } from '@/shared/api'
import { EditEventForm } from '@/features/event-edit'
import { useAuth } from '@/hooks/useAuth'

export default function EditEvent() {
	const router = useRouter()
	const { id } = router.query
	const { isAuthenticated, isAuthor } = useAuth()

	const {
		data: event,
		isLoading,
		isError
	} = trpc.event.findUnique.useQuery({
		id: Number(id)
	})

	const { mutate: updateEvent } = trpc.event.update.useMutation({
		onSuccess: () => router.push(`/events/${id}`)
	})

	const handleSubmit = (data: any) => {
		updateEvent({ id: Number(id), ...data })
	}

	if (!isAuthenticated) {
		return <p>Пожалуйста, войдите в систему</p>
	}

	if (!isAuthor(event?.authorId ?? 0)) {
		return <p>Доступ запрещен</p>
	}

	if (isLoading) return 'Loading...'
	if (isError || !event) return 'Error loading event'

	return <EditEventForm event={event} onSubmit={handleSubmit} />
}
