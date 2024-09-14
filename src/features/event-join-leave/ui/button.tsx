import { trpc } from '@/shared/api'

type JoinEventButtonProps = {
	eventId: number
	isJoined: boolean
	onSuccess?: () => void
}

export const JoinEventButton = ({
	eventId,
	isJoined,
	onSuccess
}: JoinEventButtonProps) => {
	const { mutate: join } = trpc.event.join.useMutation({ onSuccess })
	const { mutate: leave } = trpc.event.leave.useMutation({ onSuccess })

	const handleClick = () => {
		if (isJoined) {
			leave({ id: eventId })
		} else {
			join({ id: eventId })
		}
	}

	return (
		<button
			className={`h-10 px-6 font-semibold rounded-md text-white ${
				isJoined ? 'bg-red-700' : 'bg-green-700'
			}`}
			onClick={handleClick}
		>
			{isJoined ? 'Покинуть' : 'Присоединиться'}
		</button>
	)
}
