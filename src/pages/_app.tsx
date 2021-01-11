import { ChakraProvider } from '@chakra-ui/react'

import theme from '../theme'
import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { fetcher } from '../hooks/fetcher'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider resetCSS theme={theme}>
			<SWRConfig
				value={{
					// dedupingInterval: 5000,
					// refreshInterval: 10000,
					fetcher,
				}}
			>
				<Component {...pageProps} />
			</SWRConfig>
		</ChakraProvider>
	)
}

export default MyApp
