import axios from 'axios';
import { multiClientMiddleware } from 'redux-axios-middleware';
import {
	AsyncStorage
} from 'react-native';
import { Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
// import history from './history';
// import { toastr } from 'react-redux-toastr';

// declare var __BASEURI__;
const getToken = async () => {
	try {
		let val = await AsyncStorage.getItem('token');
		return val
	} catch (e) {
		return null;
	}

}

const defaultAxiosOptions = {
	successSuffix: '_SUCCESS',
	errorSuffix: '_ERROR',
	interceptors: {
		response: [{
			success: ({ getState, dispatch, getAction }: any, res: any) => {
				//Hacky way to see if its a 401 (unauthorized error)
				if (res && res.message && res.message.indexOf('400') !== -1) {
					Toast.show({
						text: 'Username/Password is not valid',
						duration: 3000,
						position: 'bottom',
						type: 'warning'
					})
					// toastr.error('Not Authorized', 'Please login to continue');
					// history.push('/login');
				}
				// Checks to see if there is a network error. (Check to see if API is down!)
				if (res && res.message && res.message.indexOf('Network Error') !== -1) {
					// toastr.error('Error', 'System is currently offline.')
					// history.push('/login');
				}
				return res;
			},
			error: ({ getState, dispatch, getAction }: any, response: any) => {
				//Hacky way to see if its a 401 (unauthorized error)
				if (response && response.message && response.message.indexOf('401') !== -1) {
					Toast.show({
						text: 'Not authorized. Please login to continue.',
						duration: 3000,
						position: 'bottom',
						type: 'warning'
					})
				}

				if (response && response.message && response.message.indexOf('400') !== -1) {
					Toast.show({
						text: 'Username/Password is not valid',
						duration: 3000,
						position: 'bottom',
						type: 'warning'
					})
					// toastr.error('Not Authorized', 'Please login to continue');
					// history.push('/login');
				}
				// Checks to see if there is a network error. (Check to see if API is down!)
				if (response && response.message && response.message.indexOf('Network Error') !== -1) {
					Toast.show({
						text: 'Network is offline',
						duration: 3000,
						position: 'bottom',
						type: 'danger'
					})
				}

				return response;
			},

		}]
	}
};

const animeApiAxiosOptions = {
	interceptors: {
		request: [{
			success: async ({ getState, dispatch, getSourceAction }: any, req: any) => {
				// Example of setting a bearer token for all requests
				// if (getState().user.token) {
				// 	req.headers.Authorization = 'Bearer ' + getState().user.token
				// }
				// req.headers.Authorization = 'bearer ' + await getToken();
				// req.headers.withCredentials = true;
				return req;
			},
			error: ({ getState, dispatch, getAction }: any, res: any) => {

				return res;
			}
		}]
	}
};

const axiosClients = {
	AnimeApi: {
		client: axios.create({
			baseURL: 'animeAPIHERE' , 
			// withCredentials: true,
			headers: {
				'Content-Type': 'multipart/form-data',
			}
			// responseType: 'json',
			// headers: {
			// 	'Content-Type': 'application/json',
			// 	'Cache-Control': 'no-cache, no-store',
			// }

		}),
		options: animeApiAxiosOptions
	}
};

export default multiClientMiddleware(axiosClients, defaultAxiosOptions);
