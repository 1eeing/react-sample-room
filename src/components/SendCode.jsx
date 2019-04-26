import React, { useState } from 'react';
import { Button, Message } from 'antd';
import useInterval from '@customHooks/useInterval';
import useAxios from '@customHooks/useAxios';

const timer = 120;

const SendCode = ({ phone, ...rest }) => {
	const [waiting, setWaiting] = useState(false);
	const [count, setCount] = useState(timer);

	const { reFetch } = useAxios({
		api: 'send_code',
		options: {
			params: { phone }
		},
		customHandler: (err, json) => {
			if(err){
				Message.error(`短信验证码发送失败：${err}`);
			}else if(json) {
				if(json.result === 100){
					Message.success('短信验证码发送成功');
					setWaiting(true);
				}else{
					Message.error(`短信验证码发送失败：${json.message}`);
				}
			}
		}
	});

	useInterval(() => {
		setCount(count - 1);
		if(count <= 0){
			setWaiting(false);
			setCount(timer);
		}
	}, waiting ? 1000 : null);

	return (
		<Button onClick={reFetch} disabled={waiting} {...rest}>
			{waiting ? `${count}s` : '发送验证码'}
		</Button>
	);
};

export default SendCode;
