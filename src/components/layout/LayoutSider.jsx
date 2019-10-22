import React, { useState } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import styles from '@components/layout/layout.module.scss';
import logo from '../../logo.svg';

const { Sider } = Layout;

const LayoutSider = ({ selectedKeys, routes }) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={col => setCollapsed(col)}
            theme="light"
        >
            <div className={styles.menuTitle}>
                <img className={styles.menuLogo} src={logo} alt="logo" />
                <span>React</span>
            </div>
            <Menu selectedKeys={selectedKeys} mode="inline">
                {routes.filter(item => !item.hide).map(item => (
                    <Menu.Item key={item.path}>
                        <Icon type={item.icon} />
                        <Link to={item.path}>{item.title}</Link>
                    </Menu.Item>
                ))}
            </Menu>
        </Sider>
    );
};

export default LayoutSider;
