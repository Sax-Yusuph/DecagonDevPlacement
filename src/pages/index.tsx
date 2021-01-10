import { GetStaticProps } from 'next'
import axios from 'axios'
import useSWR from 'swr'
import { Link as ChakraLink, SimpleGrid, Box } from '@chakra-ui/react'

import { Container } from '../components/Container'
import { HomeMenu } from '../components/HomeMenu'
import Filter from '../components/Filter'
import ResultCard from '../components/ResultCard'
import Profile from '../components/Profile'
import { useEffect, useState } from 'react'
import fetcher from '../hooks/fetchUsers'

const BASE_URL = 'https://randomuser.me/api/'
const COUNTRIES = [
	'Default',
	'AU',
	'BR',
	'CA',
	'CH',
	'DE',
	'DK',
	'ES',
	'FI',
	'FR',
	'GB',
	'IE',
	'IR',
	'NO',
	'NL',
	'NZ',
	'TR',
	'US',
]

const Index = ({ users }: any) => {
	const [shouldFetch, setShouldFetch] = useState(false)
	const [params, setParams] = useState({})
	const [page, setPage] = useState(1)
	const [profile, SetProfile] = useState([])
	const [country, setCountry] = useState(COUNTRIES)

	const { data, error } = useSWR(
		shouldFetch
			? `${BASE_URL}/?page=${page}&results=${10}&seed=abc&nat=${country.join()}`
			: null,
		fetcher,
		{
			initialData: users,
		}
	)

	// const { users, loading, error, hasNextPage } = fetchUsers(params, page)
	// console.log(users, loading, error, hasNextPage)

	useEffect(() => {
		const fetchState = () => {
			setShouldFetch(true)
		}
		fetchState()
	}, [params, page])

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

					{data && (
						<Box overflowY='auto' overflowX='hidden'>
							{data.map((user: any) => {
								return (
									<ResultCard
										key={user.id.value}
										user={user}
										SetProfile={SetProfile}
										// setResults={setResults}
									/>
								)
							})}
						</Box>
					)}

					{!data && <div>loading...</div>}
					{error && <div>failed to load</div>}
					{profile.length > 0 && <Profile profile={profile[0]} />}
					{/* <Footer paginate={handlePagination} /> */}
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
		params: { seed: 'abc', results: 5 },
	})

	return { results: await res.data.results }
}
