// import axios from 'axios';
import { Message } from 'element-ui';
let axios = require('axios');

function parseUrl() {
    var str = location.search.replace('?', '') || '';
    var resObj = {};
    str.split('&').map(i => {
        var key = i.split('=')[0];
        var value = i.split('=')[1];
        resObj[key] = value;
    });
    return resObj;
}

function handleData(res) {
    if (!res) {
        return;
    }
    if (res.code === '000000' || (res.webResponse && res.webResponse.code === '000000')) {
        return res.data || res.webResponse.data;
    } else {
        Message.error({
            message: res.message || '接口返回错误，错误信息不明！请联系客服处理',
            duration: 2000
        });
        throw {
            e: res.code,
            message: res.message
        };
    }
}

const getFetch = axios.create({
    baseURL: location.protocol + '//192.168.52.41:8009',
    timeout: 10000,
    headers: {
        'Content-Type':'application/json;charset=UTF-8;'
    },
    transformResponse: [function(data) {
        return handleData(data);
    }],
    responseType: 'json',
    crossDomain: true
});

const postFetch = axios.create({
    baseURL: location.protocol + '//192.168.52.41:8009',
    timeout: 10000,
    headers: {
        'Content-Type':'application/json;charset=UTF-8;'
    },
    transformResponse: [function(data) {
        return handleData(data);
    }],
    responseType: 'json',
    crossDomain: true
});


getFetch.interceptors.response.use((res) => {
    if (res.status === 200) {
        return res.data;
    } else {
        return res;
    }
});

postFetch.interceptors.response.use((res) => {
    if (res.status === 200) {
        return res.data;
    } else {
        return res;
    }
});

export default {
    parseUrl,
    urlParseInfo: (data) => getFetch.get('/handleTool/parseUrl', {
        params: data
    }),
    sqlFormat: (data) => postFetch.post('/handleTool/sqlFormat', data)
};
