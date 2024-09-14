import type { AppProps, AppContext } from 'next/app'
import { SessionProvider, getSession } from 'next-auth/react'
import { Header } from '@/entities/layout/ui/header'
import { trpc } from '@/shared/api'
import '@/app/global.css'

function App({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<div className='min-h-screen flex flex-col'>
				<Header />
				<main className='flex-grow mt-20 pt-5'>
					<Component {...pageProps} />
				</main>
			</div>
		</SessionProvider>
	)
}

App.getInitialProps = async (ctx: AppContext) => {
	return {
		pageProps: {
			session: await getSession(ctx.ctx)
		}
	}
}

export default trpc.withTRPC(App)
