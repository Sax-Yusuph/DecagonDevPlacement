import { Link as ChakraLink, SimpleGrid, Box } from '@chakra-ui/react'

import { Container } from '../components/Container'
import { Footer } from '../components/Footer'
import { HomeMenu } from '../components/HomeMenu'
import Filter from '../components/Filter'
import ResultCard from '../components/ResultCard'
import Profile from '../components/Profile'
import { useState } from 'react'
import fetchUsers from '../hooks/fetchUsers'
import { GetStaticProps } from 'next'
import axios from 'axios'
import { BASE_URL, PARAMS } from '../options/options'

const Index = () => {
	const [params, setParams] = useState({})
	const [page, setPage] = useState(1)
	const [profile, SetProfile] = useState([])
	const { users, loading, error, hasNextPage } = fetchUsers(params, page)
	const [results, setResults] = useState(users)
	console.log(users, loading, error, hasNextPage)

	function handleParamChange(newParams: any) {
		setPage(page)
		setParams(newParams)
	}

	function handlePagination(param: string) {
		if (param === 'next') {
			setPage(page + 1)
		}
		if (param === 'prev' && page > 1) {
			setPage(page - 1)
		}
	}

	return (
		<Container height='100vh' bg='blue.800' overflow='hidden'>
			<SimpleGrid columns={2} spacing={10}>
				<HomeMenu changeParams={handleParamChange} />
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
					{results.length > 0 && (
						<Box overflowY='auto' overflowX='hidden'>
							{users.map((user: any) => {
								return (
									<ResultCard
										key={user.id.value}
										user={user}
										SetProfile={SetProfile}
										setResults={setResults}
									/>
								)
							})}
						</Box>
					)}
					{profile.length > 0 && <Profile profile={profile[0]} />}
					<Footer paginate={handlePagination} />
				</Box>
				{/* <DarkModeSwitch /> */}
			</SimpleGrid>
		</Container>
	)
}

export default Index

export const getStaticProps: GetStaticProps = async () => {
	// Todos
	//1. get query params from ctx and fetch dynamically
	// from the database or run cloud functions if its not present

	const res = await axios(BASE_URL, {
		params: { ...PARAMS },
	})

	return { props: { users: await res.data.results } }
}
