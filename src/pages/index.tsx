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
import { Params } from '../interfaces'

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
const PARAMS = {
	page: 1,
	gender: '',
	seed: '',
	results: 10,
	nat: '',
}

const Index = ({ users }: any) => {
	const [params, setParams] = useState<Params>(PARAMS)
	const { data, error, mutate } = useSWR([BASE_URL, params], {
		initialData: users,
	})

	const [profile, SetProfile] = useState([])
	const [usersList, setUsersList] = useState<any[]>(data)

	console.log(`params ---- ${JSON.stringify(params, null, 2)}}`)

	// if (data) setUsersList(data)

	const filterByGender = (gender: string) => {
		let filter = data
		switch (gender) {
			case 'male':
				filter = usersList.map(user => user.gender === 'male')
				setUsersList(filter)
				break
			case 'female':
				filter = usersList.map(user => user.gender === 'female')
				setUsersList(filter)
				break
			default:
				setUsersList(filter)
				break
		}
	}

	function handlePagination(val: string) {
		if (val === 'next') {
			setParams(prev => ({ ...prev, page: params.page + 1 }))
		}
		if (val === 'prev' && params.page > 1) {
			setParams(prev => ({ ...prev, page: params.page - 1 }))
		}
	}
	console.log(data)
	return (
		<Container height='100vh' bg='blue.800' overflow='hidden'>
			<SimpleGrid columns={2} spacing={10}>
				<HomeMenu
					params={params}
					setParams={setParams}
					mutate={mutate}
					filter={filterByGender}
				/>
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

					{usersList && (
						<Box overflowY='auto' overflowX='hidden'>
							{usersList?.map((user: any) => {
								return (
									<ResultCard
										key={user?.login?.uuid || Math.random()}
										user={user}
										SetProfile={SetProfile}
										// setResults={setResults}
									/>
								)
							})}
						</Box>
					)}

					{!usersList && <div>loading...</div>}
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
		params: { seed: 'abc', results: 100 },
	})

	return { props: { users: await res.data.results } }
}
