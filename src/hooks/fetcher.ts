import axios from 'axios'
import { Params } from '../interfaces'

export const fetcher = (url: string, params: Params) => {
	axios(url, { params }).then(res => res.data)
}
