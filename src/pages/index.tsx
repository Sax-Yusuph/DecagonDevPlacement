import { GetStaticProps } from 'next'
import axios from 'axios'
import { SimpleGrid, Box } from '@chakra-ui/react'

import { Container } from '../components/Container'
import { HomeMenu } from '../components/HomeMenu'
import Filter from '../components/Filter'
import ResultCard from '../components/ResultCard'
import Profile from '../components/Profile'
import { useEffect, useState } from 'react'
import { Filterprops, Params } from '../interfaces'
import { Footer } from '../components/Footer'
import { PARAMS, BASE_URL, FILTER } from '../options/options'
import { filterByGender } from '../options/utils'

const Index = () => {
	const [params, setParams] = useState<Params>(PARAMS)
	const [filter, setFilter] = useState<Filterprops>(FILTER)

	const [profile, setProfile] = useState([])
	const [usersList, setUsersList] = useState<any[]>([])
	const [loading, setLoading] = useState(false)
	const [showProfile, setShowProfile] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		const cancelToken = axios.CancelToken.source()
		async function upDateData() {
			setLoading(true)
			setUsersList([])
			try {
				const res = await axios(BASE_URL, {
					cancelToken: cancelToken.token,
					params,
				})
				const results = filterByGender('male', res.data.results)
				setLoading(false)
				setUsersList(results)
			} catch (error) {
				if (axios.isCancel(error)) return
				setError(error.message)
			}
		}
		upDateData()
		return () => cancelToken.cancel()
	}, [params, filter])

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
				<HomeMenu params={params} setParams={setParams} setFilter={setFilter} />
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
					<Filter params={params} setParams={setParams} setFilter={setFilter} />

					{!showProfile && (
						<Box px={3} overflowY='auto' overflowX='hidden'>
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

					{loading && !error && <div>loading...</div>}
					{error && <div>{error}</div>}

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
