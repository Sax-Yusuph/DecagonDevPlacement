import { ChakraProvider } from '@chakra-ui/react'
import { SWRConfig } from 'swr'

import theme from '../theme'
import { AppProps } from 'next/app'
import { fetcher } from '../options/utils'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider resetCSS theme={theme}>
			<SWRConfig
				value={{
					fetcher,
				}}
			></SWRConfig>
			<Component {...pageProps} />
		</ChakraProvider>
	)
}

export default MyApp
