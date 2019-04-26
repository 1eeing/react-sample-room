import { useState, useEffect, useReducer } from 'react';
import * as defaultAxios from 'axios';
import apiList from '@config/apiList';
// import { getQueryString } from '@common/storage';

const initialResponse = { json: null, error: null, loading: false };

const reducer = (state, action) => {
	switch (action.type) {
		case 'init':
			return { json: null, error: null, loading: true };
		case 'success':
			return { json: action.payload, error: null, loading: false };
		case 'fail':
			return { json: null, error: action.payload, loading: false };
		default:
			return initialResponse;
		}
}

/**
 * Params
 * @param  {AxiosInstance} axios - (optional) The custom axios instance
 * @param  {string} api - The request API
 * @param  {('GET'|'POST'|'PUT'|'DELETE'|'HEAD'|'OPTIONS'|'PATCH')} method - The request method
 * @param  {object} [options={}] - (optional) The config options of Axios.js (https://goo.gl/UPLqaK)
 * @param  {object|string} trigger - (optional) The conditions for AUTO RUN, refer the concepts of [conditions](https://reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect) of useEffect, but ONLY support string and plain object. If the value is a constant, it'll trigger ONLY once at the begining
 * @param  {function} [forceDispatchEffect=() => true] - (optional) Trigger filter function, only AUTO RUN when get `true`, leave it unset unless you don't want AUTU RUN by all updates of trigger
 * @param  {function} [customHandler=(error, json) => {}] - (optional) Custom handler callback, NOTE: `error` and `json` will be set to `null` before request
 */

/**
 * Returns
 * @param  {object} json - The response.data of Axios.js (https://goo.gl/dJ6QcV)
 * @param  {object} error - HTTP error
 * @param  {boolean} loading - The loading status
 * @param  {function} reFetch - MANUAL RUN trigger function for making a request manually
 */

const { CancelToken } = defaultAxios;

const useAxios = ({
	axios = defaultAxios,
	api,
	method = 'post',
	options = {},
	trigger,
	// @deprecated
	filter,
	forceDispatchEffect,
	customHandler,
} = {}) => {
	const [results, dispatch] = useReducer(reducer, initialResponse);
	const [innerTrigger, setInnerTrigger] = useState(0);

	let outerTrigger = trigger;
	try {
		outerTrigger = JSON.stringify(trigger);
	} catch (error) {

	}

	const dispatchEffect = forceDispatchEffect || filter || (() => true);

	const handler = (err, json) => {
		if(customHandler){
			customHandler(err, json);
		}
	}

	useEffect(() => {
		if(!api || !dispatchEffect()) return;
		// Only trigger by query
		if(typeof outerTrigger === 'undefined' && !innerTrigger) return;

		handler(null, null);
		dispatch({type: 'init'});

		const source = CancelToken.source();
		const url = apiList[api];

		if(!url) throw Error('Please configure url in /src/config/apiList.js');

		const queryString = getQueryString();

		axios({
			url,
			method,
			...options,
			CancelToken: source.token,
			headers: queryString ? { queryString } : {}
		})
			.then(({ data }) => {
				handler(null, data);
				dispatch({type: 'success', payload: data});

				// goback login if data.result == 700
				if(data.result == 700) {	//eslint-disable-line
					window.location.hash = '#/';
				}
			})
			.catch(error => {
				handler(error, null);
				if (!defaultAxios.isCancel(error)) {
					dispatch({ type: 'fail', payload: error });
				}
			});

		return () => {
			source.cancel()
		};
	}, [innerTrigger, outerTrigger]);

	return {
		...results,
		// @deprecated
		query: () => {
			setInnerTrigger(Date.now());
		},
		reFetch: () => {
			setInnerTrigger(Date.now());
		},
	}
};

export default useAxios;
