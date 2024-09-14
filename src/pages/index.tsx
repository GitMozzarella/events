import { useAuth } from '@/hooks/useAuth' // путь к вашему хуку
import { EventCard } from '@/entities/event'
import { JoinEventButton } from '@/features/event-join-leave'
import { trpc } from '@/shared/api'

export default function Home() {
	const { data, refetch } = trpc.event.findMany.useQuery()
	const { isAuthenticated } = useAuth()

	return (
		<ul>
			{data?.map(event => (
				<li key={event.id} className='mb-6'>
					<EventCard
						{...event}
						isAuthenticated={isAuthenticated}
						action={
							isAuthenticated && (
								<JoinEventButton
									eventId={event.id}
									onSuccess={refetch}
									isJoined={event.isJoined}
								/>
							)
						}
					/>
				</li>
			))}
		</ul>
	)
}
