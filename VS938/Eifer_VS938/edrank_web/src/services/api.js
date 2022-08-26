import { restUrl } from 'constants/endpoints';
import axios from 'axios';
import { toast } from 'react-toastify'

const SERVER_BASE_URL = restUrl;

export const makeRequest = async (apiEndPoint, method, data, customHeaders) => {
    const authToken = 'Bearer ' + localStorage.getItem("token") ?? '';
    console.log(customHeaders)
    let apiResponse;
    try {
        switch (method) {
            case 'GET':
                apiResponse = await axios.get(`${SERVER_BASE_URL}/${apiEndPoint}`, {
                    headers: {
                        "Authorization": authToken,
                        ...customHeaders
                    }
                });
                // toast(apiResponse?.data?.message, { type: 'success' })
                break;

            case 'POST':
                apiResponse = await axios.post(`${SERVER_BASE_URL}/${apiEndPoint}`, data, {
                    headers: {
                        "Authorization": authToken,
                        ...customHeaders
                    },
                });
                // toast(apiResponse?.data?.message, { type: 'success' })
                break;
            case 'PUT':

                apiResponse = await axios.put(`${SERVER_BASE_URL}/${apiEndPoint}`, data, {
                    headers: {
                        "Authorization": authToken,
                        ...customHeaders
                    },
                });
                // toast(apiResponse?.data?.message, { type: 'success' })
                break;
            default: console.log('Invalid API method');
        }

    } catch (error) {
        console.log("API ERROR: ", error);
        toast(error.response.data.error, { type: 'error' })
        return error;
    }
    console.log("API RESPONSE: ", apiResponse);
    return apiResponse;
}