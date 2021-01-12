import axios from 'axios'
import { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import { SimpleGrid, Box } from '@chakra-ui/react'

import { Container } from '../components/Container'
import { HomeMenu } from '../components/HomeMenu'
import Filter from '../components/Filter'
import ResultCard from '../components/ResultCard'
import Profile from '../components/Profile'
import { Footer } from '../components/Footer'

import { Filterprops } from '../interfaces'
import { PARAMS, BASE_URL, PAGE_PARAMS } from '../options/options'
import { filterbySearch } from '../options/utils'

const Index = ({ users }: { users: any[] }) => {
	const [gender, setGender] = useState<string | number>('')

	const [data, setData] = useState(users)
	const [UsersList, setUsersList] = useState(data)
	const [profile, setProfile] = useState([])
	const [showProfile, setShowProfile] = useState(false)
	const [pageProps, setPageProps] = useState(PAGE_PARAMS)

	useEffect(() => {
		const updateUsersList = () => {
			console.log(pageProps)
			const lastUserIndex = pageProps.currentPage * 5
			const firstUserIndex = lastUserIndex - pageProps.postPerPage
			setUsersList(data.slice(firstUserIndex, lastUserIndex))
		}
		updateUsersList()
	}, [pageProps, data])

	function filterState({ key, val }: Filterprops) {
		// check if key is a search
		if (key === 'search') {
			console.log(`search ---${key} ${val}`)
			setData(filterbySearch(users, val))
			return
		}
		console.log(`gender2 ---${key} ${val}`)
		// if not, then perform these operations
		if (key === 'gender' && val === 'All users') {
			setData(users)
			console.log(data)
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
		<Container height='100vh' bg='blue.800' overflow='hidden'>
			<SimpleGrid columns={2} spacing={10}>
				<HomeMenu filterState={filterState} setGender={setGender} />
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
					<Filter
						filterState={filterState}
						setGender={setGender}
						gender={gender}
					/>

					{!showProfile && (
						<Box px={3} overflowY='auto' overflowX='hidden'>
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
					)}

					{UsersList.length == 0 && <div>loading...</div>}
					{/* {error && <div>{error}</div>} */}

					{showProfile && (
						<Profile profile={profile[0]} setShowProfile={setShowProfile} />
					)}
					<Footer paginate={paginate} />
				</Box>
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
