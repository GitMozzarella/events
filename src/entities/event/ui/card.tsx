import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

type EventCardProps = {
	id: number
	title: string
	description: string | null
	date: Date
	action: ReactNode
	isAuthenticated: boolean
}

export const EventCard = ({
	id,
	title,
	description,
	date,
	action,
	isAuthenticated
}: EventCardProps) => {
	return (
		<div className='flex font-sans rounded-lg shadow-xl overflow-hidden'>
			<div className='flex-none w-48 relative'>
				<Image
					src='/concert.jpg'
					alt=''
					className='absolute inset-0 w-full h-full object-cover'
					fill
				/>
			</div>
			<div className='flex-auto p-6'>
				<div className='flex flex-wrap -mt-6 pt-6 pb-6'>
					<h1 className='flex-auto text-lg font-semibold text-slate-900'>
						{title}
					</h1>
					<div className='text-lg font-semibold text-slate-500'>
						{date.toDateString()}
					</div>
					<div className='w-full flex-none text-sm font-medium text-slate-700 mt-2'>
						{description}
					</div>
				</div>
				<div className='flex space-x-4 text-sm font-medium'>
					<div className='flex-auto flex space-x-4'>
						<Link
							href={`/events/${id}`}
							className='h-10 px-6 font-semibold rounded-md border border-slate-200 bg-gray-300 text-slate-900 align-middle leading-10'
						>
							Подробнее
						</Link>
						{isAuthenticated && action}
					</div>
				</div>
			</div>
		</div>
	)
}
