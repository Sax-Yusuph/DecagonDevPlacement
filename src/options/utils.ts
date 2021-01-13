import { FaUsers, FaMale, FaFemale } from 'react-icons/fa'
import { CSVProps } from '../interfaces'
export const getColorProp = (value: string) => {
	return value === 'All users'
		? 'pink.500'
		: value === 'male'
		? 'teal.500'
		: 'purple.500'
}

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
	console.log('filtered')
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

export const convertToCSV = (args: CSVProps) => {
	const { userData, columnDelimiter = ',', lineDelimiter = '\n' } = args

	if (userData == null || !userData.length) {
		return null
	}

	let keys = Object.keys(userData[0])

	let ctr: number
	let result = ''
	result += keys.join(columnDelimiter)
	result += lineDelimiter

	userData.forEach(function (item) {
		ctr = 0
		keys.forEach(function (key) {
			if (ctr > 0) result += columnDelimiter

			result += item[key]
			ctr++
		})
		result += lineDelimiter
	})

	return result
}

export const downloadCSV = (args: CSVProps) => {
	const { userData, filename = 'export.csv' } = args
	let link
	var csv = convertToCSV({ userData })
	if (csv == null) return

	if (!csv.match(/^data:text\/csv/i)) {
		csv = 'data:text/csv;charset=utf-8,' + csv
	}
	const data = encodeURI(csv)

	link = document.createElement('a')
	link.setAttribute('href', data)
	link.setAttribute('download', filename)
	link.click()
}
