import React from 'react';
import { Spin, Alert } from 'antd';

const ViewLoading = ({ isLoading, error }) => {
    if(isLoading) {
        return <Spin tip="Loading…" />;
    }else if(error) {
        return <Alert type="error" message="Error" description="Sorry…页面走丢了" showIcon />;
    }else{
        return null;
    }
}

export default ViewLoading;
