import React from 'react';
import LazyLoad from '@components/LazyLoad';
import LayoutRoutes from '@components/layout/LayoutRoutes';

const routes = [
    {
        path: '/sources',
        icon: 'download',
        title: '资源整理',
        component: LazyLoad(() => import('@views/sources'))
    },
    {
        path: '/fedTool',
        icon: 'home',
        title: '前端工具',
        // hide: true,
        component: LazyLoad(() => import('@views/fedTool'))
    },
    {
        path: '/serviceTool',
        icon: 'home',
        title: '后端工具',
        component: LazyLoad(() => import('@views/serviceTool'))
    },
];

const Routes = () => <LayoutRoutes routes={routes} />;

export default Routes;
