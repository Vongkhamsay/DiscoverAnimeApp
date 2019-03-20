import Endpoint from '../helpers/Endpoints';

export const LOGIN = '@la:LOGIN';
export const LOGIN_SUCCESS = '@la:LOGIN_SUCCESS';
export const LOGIN_ERROR = '@la:LOGIN_ERROR';
export const LOGOUT = '@la:LOGOUT';
export const ADDPROFILE = '@la:ADDPROFILE'
export const PROFILES = '@la:PROFILES';

export function login(username: string, password: string) {
	let data2 = {
		username: username,
		password: password,
		grant_type: 'password'
	}
	return {
		type: LOGIN,
		payload: {
			client: 'LoginAction',
			request: {
				method: 'POST',
				url: Endpoint.login(),
				data: Object.keys(data2).map(function (key) {
					return encodeURIComponent(key) + '=' + encodeURIComponent(data2[key])
				}).join('&')
			}
		}
	};
}

export function logout() {
	return {
		type: LOGOUT,
		payload: {
			client: 'loginAction',
			request: {
				method: 'GET',
				url: Endpoint.logout()
			}
		}
	}
}
