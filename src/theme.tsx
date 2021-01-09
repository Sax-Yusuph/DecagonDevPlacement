import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const breakpoints = createBreakpoints({
	sm: '40em',
	md: '52em',
	lg: '64em',
	xl: '80em',
})

const fonts = {
	body: 'Poppins, sans-serif',
	heading: 'Poppins, serif',
	mono: 'Menlo, monospace',
}

const theme = extendTheme({
	colors: {
		black: '#16161D',
	},
	fonts,
	breakpoints,
})

export default theme
