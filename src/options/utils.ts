import axios from 'axios'
import { FaUsers, FaMale, FaFemale } from 'react-icons/fa'
import { Params } from '../interfaces'
export const getColorProp = (value: string) =>
	value === 'All users'
		? 'pink.500'
		: value === 'Male users'
		? 'teal.500'
		: 'purple.500'

export const getIconProp = (value: string) =>
	value === 'All users' ? FaUsers : value === 'Males' ? FaMale : FaFemale

export const getHeading = (gender?: string | number) => {
	if (gender === 'male') return 'Male Users'
	if (gender === 'female') return 'Female Users'
	return gender
}

export const filterbySearch = (usersList: any[], val: string | number) => {
	if (!val) return usersList
	const regex = new RegExp(`^${val}`, 'gi')

	return usersList.filter(
		user =>
			user?.name?.last?.match(regex) ||
			user?.name?.first?.match(regex) ||
			user?.name?.title?.match(regex) ||
			user?.phone?.toString().match(regex) ||
			user?.cell?.toString().match(regex) ||
			user?.email?.match(regex) ||
			user?.location?.street?.number.toString().match(regex) ||
			user?.location?.street?.name.match(regex) ||
			user?.location?.state?.match(regex)
	)
}

// return (
// 		user.name?.last?.toUpperCase().indexOf(val.toString().toUpperCase) > -1 ||
// 		user.name?.first?.toUpperCase().indexOf(val.toString().toUpperCase) >
// 			-1 ||
// 		user.name?.title?.toUpperCase().indexOf(val.toString().toUpperCase) >
// 			-1 ||
// 		user.name?.first?.toUpperCase().indexOf(val.toString().toUpperCase) >
// 			-1 ||
// 		user.name?.phone?.toUpperCase().indexOf(val.toString().toUpperCase) >
// 			-1 ||
// 		user.name?.cell?.toUpperCase().indexOf(val.toString().toUpperCase) > -1 ||
// 		user.name?.email?.toUpperCase().indexOf(val.toString().toUpperCase) >
// 			-1 ||
// 		user.location?.street?.number
// 			?.toUpperCase()
// 			.indexOf(val.toString().toUpperCase) > -1 ||
// 		user.location?.street?.name
// 			?.toUpperCase()
// 			.indexOf(val.toString().toUpperCase) > -1 ||
// 		user.location?.street?.state
// 			?.toUpperCase()
// 			.indexOf(val.toString().toUpperCase) > -1
// 	)
