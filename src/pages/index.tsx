import { Link as ChakraLink, SimpleGrid, Box } from '@chakra-ui/react'

import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'
import { HomeMenu } from '../components/HomeMenu'
import Filter from '../components/Filter'
import ResultCard from '../components/ResultCard'

const Index = () => (
	<Container height='100vh' bg='blue.800' overflow='hidden'>
		<SimpleGrid columns={2} spacing={10}>
			<HomeMenu />
			<Box
				m='4'
				p={5}
				px={10}
				borderRadius='md'
				bg='gray.100'
				minWidth='50vw'
				h='96vh'
				pos='relative'
				overflow='hidden'
				display='flex'
				flexDir='column'
			>
				<Filter />
				{/* <Box overflowY='auto' overflowX='hidden'>
					{Array(3)
						.fill(' ')
						.map((_, i) => {
							return <ResultCard key={i} />
						})}
				</Box> */}

				<Footer />
			</Box>
			{/* <DarkModeSwitch /> */}
		</SimpleGrid>
	</Container>
)

export default Index
