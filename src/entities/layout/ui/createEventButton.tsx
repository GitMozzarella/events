import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export const CreateEventButton = () => {
	const { data: session, status } = useSession()

	if (status === 'loading') {
		return null
	}

	if (!session) {
		return null
	}

	return (
		<div>
			<Link
				href='/events/create'
				className='inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75'
			>
				Создать событие
			</Link>
		</div>
	)
}
