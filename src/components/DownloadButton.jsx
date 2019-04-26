import React from 'react';
import { Button } from 'antd';
import { getQueryString } from '@common/storage';
import apiList from '@config/apiList';

const DownloadButton = ({api = '', params = {}, ...rest}) => {
	if(!api) return <Button {...rest} />;
	let url = `${apiList[api]}?queryString=${getQueryString()}`;
	Object.keys(params).forEach(key => {
		url += `&${key}=${params[key]}`;
	});
	return <Button href={url} target="_blank" {...rest} />;
};

export default DownloadButton;
