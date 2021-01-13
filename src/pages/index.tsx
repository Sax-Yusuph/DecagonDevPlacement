import axios from 'axios'
import { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import {
	SimpleGrid,
	Box,
	useBreakpointValue,
	Flex,
	Spacer,
	useColorMode,
} from '@chakra-ui/react'

import { Container } from '../components/Container'
import { HomeMenu } from '../components/HomeMenu'
import Filter from '../components/Filter'
import ResultCard from '../components/ResultCard'
import Profile from '../components/Profile'
import { Footer } from '../components/Footer'

import { Filterprops } from '../interfaces'
import { PARAMS, BASE_URL, PAGE_PARAMS } from '../options/options'
import { filterbySearch } from '../options/utils'
import MotionBox from '../components/MotionBox'
import { AnimatePresence } from 'framer-motion'

const Index = ({ users }: { users: any[] }) => {
	const [gender, setGender] = useState<string | number>('All Users')

	const [data, setData] = useState(users)
	const [UsersList, setUsersList] = useState(data)
	const [profile, setProfile] = useState([])
	const [showProfile, setShowProfile] = useState(false)
	const [pageProps, setPageProps] = useState(PAGE_PARAMS)

	const windowHeight = useBreakpointValue({ base: '100%', md: '100vh' })

	const { colorMode } = useColorMode()
	const bgColor = { light: 'gray.900', dark: 'blue.800' }
	const bgColor2 = { light: 'gray.800', dark: 'gray.100' }

	useEffect(() => {
		const updateUsersList = () => {
			const lastUserIndex = pageProps.currentPage * pageProps.postPerPage
			const firstUserIndex = lastUserIndex - pageProps.postPerPage
			setUsersList(data.slice(firstUserIndex, lastUserIndex))
		}
		updateUsersList()
	}, [pageProps, data])

	function filterState({ key, val }: Filterprops) {
		// reset the data if theres no value
		if (!val) {
			setData(users)
			return
		}

		// check if key is a search
		if (key === 'search') {
			setData(filterbySearch(users, val))
			return
		}
		// if not, then perform these operations
		if (key === 'gender' && val === 'All users') {
			setData(users)
		} else {
			setData(users.filter(user => user[key] === val))
			console.log(data)
		}
	}

	function paginate(val: string) {
		if (val === 'next' && pageProps.currentPage !== users.length) {
			setPageProps(prev => ({
				...prev,
				currentPage: pageProps.currentPage + 1,
			}))
		}
		if (val === 'prev' && pageProps.currentPage > 1) {
			setPageProps(prev => ({
				...prev,
				currentPage: pageProps.currentPage - 1,
			}))
		}
	}
	return (
		<Container
			h={windowHeight}
			w='100vw'
			bg={bgColor[colorMode]}
			overflowX='hidden'
			overflowY={windowHeight === '100vh' ? 'hidden' : 'auto'}
		>
			<SimpleGrid height='100%' columns={[1, null, 2]} spacing={[5, null, 10]}>
				<HomeMenu filterState={filterState} setGender={setGender} />
				<Flex
					m={[4, null, 4]}
					py={5}
					px={[2, null, 10]}
					borderRadius='md'
					bg={bgColor2[colorMode]}
					pos='relative'
					overflow='hidden'
					flexDir='column'
					alignItems='flex-start'
				>
					<Filter
						filterState={filterState}
						setGender={setGender}
						gender={gender}
					/>

					{!showProfile && (
						<AnimatePresence>
							<MotionBox
								initial={{ y: 50, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								style={{ overflowY: 'auto', width: '100%' }}
								exit={{ opacity: 0, y: -50 }}
							>
								<Box flexDir='column' overflowY='auto' overflowX='hidden'>
									{UsersList?.map((user: any) => {
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
							</MotionBox>
						</AnimatePresence>
					)}

					{UsersList.length == 0 && <div>loading...</div>}
					{/* {error && <div>{error}</div>} */}

					{showProfile && (
						<AnimatePresence>
							<Profile profile={profile[0]} setShowProfile={setShowProfile} />
						</AnimatePresence>
					)}
					<Spacer />
					<Footer
						paginate={paginate}
						download={UsersList}
						disableProps={showProfile ? true : false}
					/>
				</Flex>
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
