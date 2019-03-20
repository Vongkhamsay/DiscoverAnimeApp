
export interface IAsynchronousAction {
	inProcess: boolean;
	error: boolean;
}

export interface ILoader<T> extends IAsynchronousAction {
	data: T;
}

export interface IResultSet<T> extends ILoader<T> {
	totalResults: number;
	totalPages: number;
}

export interface IAppState {
	// authentication: IAuthenticationState;
}
