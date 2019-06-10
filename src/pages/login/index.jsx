import React from 'react';
import LoginForm from '@components/LoginForm';
import logo from '../../logo.svg';
import styles from './login.module.scss';

const Login = () => (
	<div className={[styles.fullScreen, styles.loginBgBottom].join(' ')}>
		<div className={[styles.loginBgTop]}>
            <img className={styles.loginLogo} src={logo} alt="logo"/>
			<div className={[styles.loginContent]}>
				<LoginForm />
			</div>
		</div>
	</div>
)

export default Login;
