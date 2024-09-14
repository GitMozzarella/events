import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'
import { RouterOutput } from '@/shared/api'
import { trpc } from '@/shared/api'

type EventDetailProps = NonNullable<RouterOutput['event']['findUnique']>

export const EventDetail = ({
	title,
	description,
	date,
	participations,
	authorId
}: EventDetailProps) => {
	const { isAuthenticated, isAuthor } = useAuth()
	const router = useRouter()

	const {
		data: event,
		isLoading,
		isError
	} = trpc.event.findUnique.useQuery(
		{
			id: Number(router.query.id)
		},
		{
			onError: error => {
				if (error.message.includes('UNAUTHORIZED')) {
					router.push('/api/signin') // Перенаправление на страницу авторизации
				}
			}
		}
	)

	const handleEdit = () => {
		router.push(`/events/${router.query.id}/edit`)
	}

	if (isLoading) {
		return <p>Loading...</p>
	}

	if (isError) {
		return (
			<p>
				Ошибка при загрузке события. Пожалуйста, авторизуйтесь для просмотра.
			</p>
		)
	}

	if (!isAuthenticated) {
		return <p>Вы не авторизованы...</p>
	}

	return (
		<div>
			<div className='px-4 sm:px-0'>
				<h3 className='text-base font-semibold leading-7 text-gray-900'>
					Информация о событии
				</h3>
			</div>
			<div className='mt-6 border-t border-gray-100'>
				<dl className='divide-y divide-gray-100'>
					<div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
						<dt className='text-sm font-medium leading-6 text-gray-900'>
							Название
						</dt>
						<dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
							{title}
						</dd>
					</div>
					<div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
						<dt className='text-sm font-medium leading-6 text-gray-900'>
							Описание
						</dt>
						<dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
							{description}
						</dd>
					</div>
					<div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
						<dt className='text-sm font-medium leading-6 text-gray-900'>
							Дата проведения
						</dt>
						<dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
							{date.toLocaleDateString()}
						</dd>
					</div>
					<div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
						<dt className='text-sm font-medium leading-6 text-gray-900'>
							Участники
						</dt>
						<dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
							{participations.map(({ user }) => user.name).join(', ')}
						</dd>
					</div>
				</dl>
				{isAuthor(authorId) && (
					<div className='mt-6'>
						<button
							onClick={handleEdit}
							className='rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							Редактировать
						</button>
					</div>
				)}
			</div>
		</div>
	)
}
