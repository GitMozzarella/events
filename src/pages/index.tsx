import { useAuth } from '@/hooks/useAuth'
import { EventCard } from '@/entities/event'
import { JoinEventButton } from '@/features/event-join-leave'
import { trpc } from '@/shared/api'

export default function Home() {
	const { data, refetch } = trpc.event.findMany.useQuery()
	const { isAuthenticated } = useAuth()

	return (
		<main className='px-4'>
			<div className='max-w-8xl mx-auto'>
				<ul className='space-y-6'>
					{data?.map(event => (
						<li key={event.id} className='w-[80%] mx-auto'>
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
			</div>
		</main>
	)
}
