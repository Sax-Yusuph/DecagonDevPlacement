import { Dispatch, SetStateAction } from 'react'

export interface Params {
	page: number
	gender?: string | number
	seed: string
	results: number | 10
	nat?: string | string[]
}

export interface iUser {
	gender: string
	name: {
		title: string
		first: string
		last: string
	}
	location: {
		street: {
			number: number
			name: string
		}
		city: string
		state: string
		country: string
		postcode: string
	}
	email: string
	login: {
		uuid: string
		username: string
		password: string
		salt: string
		md5: string
		sha1: string
		sha256: string
	}
	dob: {
		date: string
		age: number
	}
	registered: {
		date: string
		age: number
	}
	phone: string
	cell: string
	picture: {
		large: string
		medium: string
		thumbnail: string
	}
	nat: string
}

export interface MenuProps {
	filterState: ({ key, val }: Filterprops) => void
	setGender: Dispatch<SetStateAction<string | number>>
	gender?: string | number
}

// export interface Filterprops {
// 	gender: string | number
// 	search: string
// }
export type Filterprops = { key: string; val: string | number }
