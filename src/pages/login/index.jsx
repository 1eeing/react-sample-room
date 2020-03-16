import React from 'react';
import LoginForm from '@components/LoginForm';
import logo from '../../logo.svg';
import styles from './login.module.scss';
import { createListener } from '@1eeing/scroll-listener';

const Login = () => {
  React.useEffect(() => {
    const listener = createListener({
      triggerType: 'appeard',
      positions: ['main'],
      actions: [(e, position) => console.log('This is main', position)],
      requestIdleCallback: true,
      delayType: 'throttle',
    });

    listener.start();
    return () => listener.stop();
  }, [])

  return (
    <div className={[styles.fullScreen, styles.loginBgBottom].join(' ')}>
      <div id='main' className={[styles.loginBgTop]}>
        <img className={styles.loginLogo} src={logo} alt="logo" />
        <div className={[styles.loginContent]}>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default Login;
