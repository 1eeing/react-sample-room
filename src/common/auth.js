export const setToken = token => {
    sessionStorage.setItem('access_token', token);
};

export const getToken = () => {
    return sessionStorage.getItem('access_token') || '';
};

export const setUserInfo = info => {
    if(typeof info !== 'string'){
        info = JSON.stringify(info);
    }
    sessionStorage.setItem('user_info', info);
};

export const getUserInfo = () => {
    const info = sessionStorage.getItem('user_info');
    let res;
    try {
        res = JSON.parse(info);
    } catch (error) {
        res = {};
    }
    return res;
};
