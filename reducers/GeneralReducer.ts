import { IAsynchronousAction, ILoader, IResultSet } from '../appstate';

export interface ICreateAsynchronousActionConfig {
	startAction: string;
	successAction?: string;
	errorAction?: string;
}

export interface ICreateLoaderConfig<T> extends ICreateAsynchronousActionConfig {
	clearPayloadWith?: T;
	clearErrorOnStart?: boolean;
}

function defaultConfigValues<T>(config: ICreateLoaderConfig<T>): ICreateLoaderConfig<T> {
	return {
		...defaultAsynchronousActionConfigValues(config),
		clearErrorOnStart: config.clearErrorOnStart === undefined ? true : config.clearErrorOnStart,
		clearPayloadWith: config.clearPayloadWith
	};
}

function defaultAsynchronousActionConfigValues(config: ICreateAsynchronousActionConfig)
: ICreateAsynchronousActionConfig {
	return {
		startAction: config.startAction,
		successAction: config.successAction || config.startAction + '_SUCCESS',
		errorAction: config.errorAction || config.startAction + '_ERROR'
	};
}

function CreateAsynchronousActionReducer(config: ICreateAsynchronousActionConfig)
: (state: IAsynchronousAction, action: any) => IAsynchronousAction {
	config = defaultAsynchronousActionConfigValues(config);

	return (state: IAsynchronousAction, action: any): IAsynchronousAction => {
		switch (action.type) {
			case config.startAction:
				return {
					inProcess: true,
					error: false
				};
			case config.successAction:
				return {
					inProcess: false,
					error: false
				};
			case config.errorAction:
				return {
					inProcess: false,
					error: true
				};
		}
		return state;
	};
}

function CreateLoaderReducer<T>(config: ICreateLoaderConfig<T>): (state: ILoader<T>, action: any) => ILoader<T> {
	config = defaultConfigValues(config);

	return (state: ILoader<T>, action: any): ILoader<T> => {
		switch (action.type) {
			case config.startAction:
				return {
					inProcess: true,
					error: config.clearErrorOnStart ? false : state.error,
					data: config.clearPayloadWith || state.data
				};
			case config.successAction:
				return {
					inProcess: false,
					error: false,
					data: action.payload.data
				};
			case config.errorAction:
				return {
					inProcess: false,
					error: true,
					data: config.clearPayloadWith || state.data
				};
		}
		return state;
	};
}

function CreateResultSetReducer<T>(config: ICreateLoaderConfig<T>)
: (state: IResultSet<T>, action: any) => IResultSet<T> {
	config = defaultConfigValues(config);

	return (state: IResultSet<T>, action: any): IResultSet<T> => {
		switch (action.type) {
			case config.startAction:
				return {
					inProcess: true,
					error: config.clearErrorOnStart ? false : state.error,
					data: config.clearPayloadWith || state.data,
					totalResults: config.clearPayloadWith ? 0 : state.totalResults,
					totalPages: config.clearPayloadWith ? 0 : state.totalPages
				};
			case config.successAction:
				return {
					inProcess: false,
					error: false,
					data: action.payload.results,
					totalResults: action.payload.totalResults,
					totalPages: action.payload.totalPages
				};
			case config.errorAction:
				return {
					inProcess: false,
					error: true,
					data: config.clearPayloadWith || state.data,
					totalResults: config.clearPayloadWith ? 0 : state.totalResults,
					totalPages: config.clearPayloadWith ? 0 : state.totalPages
				};
		}
		return state;
	};
}
export { CreateLoaderReducer, CreateResultSetReducer, CreateAsynchronousActionReducer }
