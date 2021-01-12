import { GetStaticProps } from 'next'
import axios from 'axios'
import { Link as ChakraLink, SimpleGrid, Box } from '@chakra-ui/react'

import { Container } from '../components/Container'
import { HomeMenu } from '../components/HomeMenu'
import Filter from '../components/Filter'
import ResultCard from '../components/ResultCard'
import Profile from '../components/Profile'
import { useEffect, useState } from 'react'
import { Params } from '../interfaces'
import { Footer } from '../components/Footer'

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
	seed: 'abc',
	results: 10,
	nat: '',
}

const Index = () => {
	const [params, setParams] = useState<Params>(PARAMS)

	const [profile, setProfile] = useState([])
	const [usersList, setUsersList] = useState<any[]>([])
	const [loading, setLoading] = useState(false)
	const [showProfile, setShowProfile] = useState(false)

	useEffect(() => {
		const cancelToken = axios.CancelToken.source()
		async function upDateData() {
			setLoading(true)
			setUsersList([])
			const res = await axios(BASE_URL, {
				cancelToken: cancelToken.token,
				params,
			})
			setLoading(false)
			setUsersList(res.data.results)
		}
		upDateData()
		return () => cancelToken.cancel()
	}, [params])

	function handlePagination(val: string) {
		if (val === 'next') {
			setParams(prev => ({ ...prev, page: params.page + 1 }))
		}
		if (val === 'prev' && params.page > 1) {
			setParams(prev => ({ ...prev, page: params.page - 1 }))
		}
	}

	return (
		<Container height='100vh' bg='blue.800' overflow='hidden'>
			<SimpleGrid columns={2} spacing={10}>
				<HomeMenu params={params} setParams={setParams} />
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

					{!showProfile && (
						<Box overflowY='auto' overflowX='hidden'>
							{(usersList || []).map((user: any) => {
								return (
									<ResultCard
										key={user?.login?.uuid || Math.random()}
										user={user}
										setProfile={setProfile}
										setShowProfile={setShowProfile}
									/>
								)
							})}
						</Box>
					)}

					{(loading || !usersList?.length) && <div>loading...</div>}
					{/* {error && <div>failed to load</div>} */}

					{showProfile && (
						<Profile profile={profile[0]} setShowProfile={setShowProfile} />
					)}
					<Footer paginate={handlePagination} />
				</Box>
				{/* <DarkModeSwitch /> */}
			</SimpleGrid>
		</Container>
	)
}

export default Index
