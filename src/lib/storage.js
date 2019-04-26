export const getUserInfo = () => {
	let userInfo = {};
	try {
		userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
	} catch (e) {
		console.log(e);
	}
	return userInfo;
}

export const getToken = () => sessionStorage.getItem('token');

export const getQueryString = () => sessionStorage.getItem('queryString');
