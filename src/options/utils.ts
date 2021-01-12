import { FaUsers, FaMale, FaFemale } from 'react-icons/fa'
import { Filterprops, Params } from '../interfaces'
export const getColorProp = (value: string) =>
	value === 'All users'
		? 'pink.500'
		: value === 'Male users'
		? 'teal.500'
		: 'purple.500'

export const getIconProp = (value: string) =>
	value === 'All users' ? FaUsers : value === 'Males' ? FaMale : FaFemale

export const getHeading = (params: Params) => {
	const gender = params.gender
	if (gender === 'male') return 'Male Users'
	if (gender === 'female') return 'Female Users'
	return 'All Users'
}

export const filterByGender = (gender: string, users: any[]) => {
	if (gender === 'all') return users
	return users.filter(user => user.gender === gender)
}

export const searchFilter = (search: string, users: any[]) => {
	// return
}
