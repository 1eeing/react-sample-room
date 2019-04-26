import React from 'react';
import { Route } from 'react-router-dom';
import styles from '@assets/common.module.scss';

const LayoutMain = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (
		<div className={[styles.p24, styles.mh360, styles.bgWhite].join(' ')}>
			<Component {...props} />
		</div>
	)} />
);

export default LayoutMain;
