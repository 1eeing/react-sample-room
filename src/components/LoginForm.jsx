import React, { useState } from 'react';
import { Icon, Input, Button, Message } from 'antd';
import SendCode from '@components/SendCode';
import useAxios from '@customHooks/useAxios';
import styles from '@assets/common.module.scss';

const LoginForm = () => {
	const [phone, setPhone] = useState('');
	const [code, setCode] = useState('');

	const { reFetch } = useAxios({
		api: 'login',
		options: {
			params: { phone, code }
		},
		customHandler: (err, json) => {
			if(err){
				Message.error(`登录失败：${err}`);
			}else if(json) {
				if(json.result === 100){
					const data = json.data;
					Message.success('登录成功');
					// 写入session，在后续请求中需要作为Headers使用
					const {kdzsToken, wdUser} = data;
					sessionStorage.setItem('kdzsToken', kdzsToken);
					sessionStorage.setItem('userInfo', JSON.stringify(wdUser));
					const qnquerystring = kdzsToken && wdUser && wdUser.id ? `${wdUser.id}_${kdzsToken}` : '';
					sessionStorage.setItem('qnquerystring', qnquerystring);

					window.location.hash = "#/ydNoCount";
				}else{
					Message.error(`登录失败：${json.message}`);
				}
			}
		}
	});

	return (
		<React.Fragment>
			<div>
				<Input style={{width: '160px'}} prefix={<Icon type="phone" />} placeholder="请输入手机号" value={phone} onChange={e => setPhone(e.target.value)} />
				<SendCode className={styles.ml10} phone={phone} />
			</div>
			<div>
				<Input style={{width: '240px'}} prefix={<Icon type="key" />} placeholder="请输入手机验证码" value={code} onChange={e => setCode(e.target.value)} onPressEnter={reFetch} />
			</div>
			<div>
				<Button block type="primary" onClick={reFetch}>登录</Button>
			</div>
		</React.Fragment>
	);
};

export default LoginForm;
