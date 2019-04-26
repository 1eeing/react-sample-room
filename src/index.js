import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './index.css';
import { HashRouter as Router } from 'react-router-dom';
import Routes from './routes';
import * as serviceWorker from './serviceWorker';

moment.locale('zh-cn');

ReactDOM.render(
	<Router basename="/">
		<Routes />
	</Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
