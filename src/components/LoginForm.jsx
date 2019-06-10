import React, { useState } from 'react';
import { Icon, Input, Button, Message } from 'antd';
import SendCode from '@components/SendCode';
import useAxios from '@customHooks/useAxios';
import { setToken, setUserInfo } from '@common/auth';
import styles from '@assets/common.module.scss';

const LoginForm = () => {
	const [phone, setPhone] = useState('');
	const [code, setCode] = useState('');

	const { reFetch: requestLogin } = useAxios({
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
					const {token, userInfo} = data;
					setToken(token);
					setUserInfo(JSON.stringify(userInfo));

					window.location.hash = "#/page1";
				}else{
					Message.error(`登录失败：${json.message}`);
				}
			}
		}
    });

    const validateInput = () => {
        if(!/^\d{11}$/g.test(phone)){
            Message.error('请输入正确的手机号！');
            return false;
        }
        if(!/^\d{6}$/g.test(code)){
            Message.error('请输入正确的验证码！');
            return false;
        }
    };

    const login = () => {
        const res = validateInput();
        if(!res){
            return;
        }
        requestLogin();
    }

	return (
		<React.Fragment>
			<div>
				<Input style={{width: '160px'}} prefix={<Icon type="phone" />} placeholder="请输入手机号" value={phone} onChange={e => setPhone(e.target.value)} />
				<SendCode className={styles.ml10} phone={phone} />
			</div>
			<div>
				<Input style={{width: '240px'}} prefix={<Icon type="key" />} placeholder="请输入手机验证码" value={code} onChange={e => setCode(e.target.value)} onPressEnter={login} />
			</div>
			<div>
				<Button block type="primary" onClick={login}>登录</Button>
			</div>
		</React.Fragment>
	);
};

export default LoginForm;
