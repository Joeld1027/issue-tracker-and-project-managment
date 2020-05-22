import { UserActionTypes } from './user.types';
import { apiCall, setTokenHeader } from '../../services/apicall';

export const setCurrentUser = (user) => ({
	type: UserActionTypes.SET_CURRENT_USER,
	payload: user,
});

export const userLoading = () => ({
	type: UserActionTypes.USER_LOADING,
});

export const userLoaded = () => ({
	type: UserActionTypes.USER_LOADED,
});

export const getUsers = (users) => ({
	type: UserActionTypes.GET_ALL_USERS,
	payload: users,
});

export const getAllUsers = () => {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			return apiCall('get', `http://localhost:5000/api/users`)
				.then((users) => {
					dispatch(getUsers(users));
					resolve();
				})
				.catch((err) => {
					console.log(err);
					reject();
				});
		});
	};
};

export function setAuthorizationToken(accessToken) {
	setTokenHeader(accessToken);
}

export function logout() {
	return (dispatch) => {
		localStorage.clear();
		setAuthorizationToken(false);
		dispatch(setCurrentUser({}));
	};
}

export const authUser = (type, userData) => {
	return (dispatch) => {
		dispatch(userLoading());
		return new Promise((resolve, reject) => {
			return apiCall(
				'post',
				`http://localhost:5000/api/auth/${type}`,
				userData
			)
				.then(({ accessToken, ...user }) => {
					localStorage.setItem('jwToken', accessToken);
					setAuthorizationToken(accessToken);
					dispatch(setCurrentUser(user));
					resolve();
				})
				.catch((err) => {
					console.log(err);
					reject();
				});
		});
	};
};
