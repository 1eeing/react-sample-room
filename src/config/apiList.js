const prefix = process.env.NODE_ENV === 'production' ? '' : '/api';

const apiList = {
	// 'send_code': '/user/sendCode',
};

// 开发环境添加/api请求路径
for(let key in apiList){
	apiList[key] = `${prefix}${apiList[key]}`;
}

export default apiList;
