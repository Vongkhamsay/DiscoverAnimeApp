export const endpoint = {
	login: (params?: {}) => {

		return '/api/token'
		// return getUrl('/api/token', { ...params, username, password, grant_type });
		// return'';
	},

	logout: () => {
		return '/api/media/authtest/';
	},

};

function getUrl(baseUrl: string, params: any) {
	return baseUrl + toQueryString(params);
}

function toQueryString(params: any) {
	if (!params || params === {}) {
		return '';
	}

	return '?' + Object
		.keys(params)
		.filter(key => params[key] !== undefined && params[key] !== null)
		.map(key => params[key] instanceof Array
			? `${encodeURIComponent(key)}=${params[key].join(`&${encodeURIComponent(key)}=`)}`
			: `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
		.join('&')
		;
}

class queryObj {
	filter_type: string;
	filter_val: string;
	sort_type: string;
	sort_val: string;
	page: number;
	minDate: string;
	maxDate: string;
}


export default endpoint;
