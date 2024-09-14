import { trpc } from '@/shared/api'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import React from 'react'

interface DeleteEventButtonProps {
	eventId: number
}

export const DeleteEventButton: React.FC<DeleteEventButtonProps> = ({
	eventId
}) => {
	const router = useRouter()

	// Используйте `trpc` для мутаций
	const deleteEventMutation = trpc.event.delete.useMutation({
		onSuccess: () => {
			toast.success('Событие успешно удалено')
			router.push('/') // Перенаправление после удаления
		},
		onError: () => {
			toast.error('Ошибка при удалении события')
		}
	})

	const handleDelete = () => {
		deleteEventMutation.mutate({ id: eventId })
	}

	return (
		<button
			onClick={handleDelete}
			className='bg-red-600 text-white px-4 py-2 rounded-md font-medium transition duration-300 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500'
			disabled={deleteEventMutation.isLoading}
		>
			{deleteEventMutation.isLoading ? 'Удаление...' : 'Удалить событие'}
		</button>
	)
}
