export const getUserInfo = () => {
	let userInfo = {};
	try {
		userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
	} catch (e) {
		console.log(e);
	}
	return userInfo;
}

export const getKdzsToken = () => sessionStorage.getItem('kdzsToken');

export const getQueryString = () => sessionStorage.getItem('qnquerystring');
