import * as LoginActions from '../actions/LoginAction';
import { CreateLoaderReducer } from './GeneralReducer';
import { AsyncStorage } from 'react-native';

const initialState: any = {
	bearer: {
		inProcess: false,
		error: false,
	}
};

export let _childReducers = {
	loginLoaderReducer: CreateLoaderReducer({
		startAction: LoginActions.LOGIN,
		clearPayloadWith: initialState.bearer.data
	})
};

export default function systemHealthReducer(state: any = initialState, action: any) {
	switch (action.type) {
		case LoginActions.LOGIN:
		case LoginActions.LOGIN_SUCCESS:
		case LoginActions.LOGIN_ERROR:
			return {
				...state,
				bearer: _childReducers.loginLoaderReducer(state.searchResults, action)
			};
	}
	return state;
}
