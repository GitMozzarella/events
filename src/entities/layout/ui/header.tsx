import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '/public/logo.svg'
import { AuthStatus } from '@/entities/authStatus'

export const Header: React.FC = () => {
	return (
		<header className='bg-gray-900 text-white shadow-md fixed top-0 left-0 w-full h-15  flex items-center py-4 z-50 '>
			<div className='flex w-full max-w-6xl mx-auto px-4 justify-between items-center h-full'>
				<div className='flex items-center space-x-4'>
					<Image
						src={logo}
						alt='Events Icon'
						width={64}
						height={64}
						className='h-12 w-12'
					/>
					<Link href='/' className='text-2xl font-bold'>
						События
					</Link>
				</div>
				<nav className='flex flex-grow justify-end'>
					<AuthStatus />
				</nav>
			</div>
		</header>
	)
}
