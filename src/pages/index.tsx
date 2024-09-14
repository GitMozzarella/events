import { EventCard } from '@/entities/event'
import { JoinEventButton } from '@/features/event-join'
import { trpc } from '@/shared/api'

export default function Home() {
	const { data, refetch } = trpc.event.findMany.useQuery()

	return (
		<ul>
			{data?.map(event => (
				<li key={event.id} className='mb-6'>
					<EventCard
						{...event}
						action={
							<JoinEventButton
								eventId={event.id}
								onSuccess={refetch}
								isJoined={event.isJoined} // Проверяем, что здесь
							/>
						}
					/>
				</li>
			))}
		</ul>
	)
}
