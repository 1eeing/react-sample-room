import React from 'react';
import LazyLoad from '@components/LazyLoad';
import LayoutRoutes from '@components/layout/LayoutRoutes';

const routes = [
    {
        path: '/page1',
        icon: 'download',
        title: '页面1',
        component: LazyLoad(() => import('@views/page1'))
    },
    {
        path: '/page2',
        icon: 'home',
        title: '页面2',
        // hide: true,
        component: LazyLoad(() => import('@views/page2'))
    },
];

const Routes = () => <LayoutRoutes routes={routes} />;

export default Routes;
