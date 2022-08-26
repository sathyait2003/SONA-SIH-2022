import axios from 'axios'
import { restUrl } from './endpoints';

// Create instance called instance
export const instance = axios.create({
	baseURL: restUrl,
	headers: {
		'content-type': 'application/octet-stream',
		'x-rapidapi-host': 'example.com',
		'x-rapidapi-key': process.env.RAPIDAPI_KEY
	},
});


// export const requestHeaders = {
// 	// 'x-edrank-tenant-type': tenantType.value,
// }