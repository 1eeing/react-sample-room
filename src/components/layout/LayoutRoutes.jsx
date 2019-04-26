import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';
import styles from '@assets/common.module.scss';
import LayoutSider from '@components/layout/LayoutSider';
import LayoutMain from '@components/layout/LayoutMain';

const { /*Header,*/ Content, Footer } = Layout;

const createUrl = (item, index, arr) => `/${arr.slice(0, index + 1).join('/')}`;

const LayoutRoutes = withRouter(({ location, routes }) => {
	const pathSnippets = location.pathname.split('/').filter(i => i);

	// 不抽组件是由于antd要求Breadcrumb下的子组件必须是Breadcrumb.Item
	const createBreadcrumbItem = (item, index) => {
		const url = createUrl(item, index, pathSnippets);
		return (
			<Breadcrumb.Item key={index}>
				<Link to={url}>
					{routes.filter(item => item.path === url).map(item => item.title)}
				</Link>
			</Breadcrumb.Item>
		);
	};

	return (
		<Layout className={styles.mhFull}>
			<LayoutSider routes={routes} selectedKeys={pathSnippets.map(createUrl.bind(pathSnippets))} />
			<Layout>
				{/* <Header className={[styles.bgWhite, styles.p0]} /> */}
				<Content className={[styles.mlr16, styles.mtb0]}>
					<Breadcrumb className={[styles.mtb16, styles.mlr0]}>
						{pathSnippets.map(createBreadcrumbItem)}
					</Breadcrumb>
					{routes.map((item, index) => (
						<LayoutMain exact={item.exact} key={index} path={item.path} component={item.component} />
					))}
				</Content>
				<Footer className={styles.tCenter}>
					Design by @快递助手.
				</Footer>
			</Layout>
		</Layout>
	);
});

export default LayoutRoutes;
