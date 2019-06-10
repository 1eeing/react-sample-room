import React from 'react';
import LazyLoad from '@components/LazyLoad';
import LayoutRoutes from '@components/layout/LayoutRoutes';

const routes = [
    {
        path: '/',
        component: LazyLoad(() => import('@pages/login')),
        hide: true,
        exact: true,
    },
    {
        path: '/page1',
        icon: 'download',
        title: '页面1',
        component: LazyLoad(() => import('@pages/page1'))
    },
    {
        path: '/page2',
        icon: 'home',
        title: '页面2',
        // hide: true,
        component: LazyLoad(() => import('@pages/page2'))
    },
];

const Routes = () => <LayoutRoutes routes={routes} />;

export default Routes;
