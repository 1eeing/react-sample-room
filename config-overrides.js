const path = require('path');
const { override, fixBabelImports, addWebpackAlias, addLessLoader } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
	}),
	addWebpackAlias({
		'@views': path.resolve(__dirname, './src/views/'),
		'@assets': path.resolve(__dirname, './src/assets/'),
		'@components': path.resolve(__dirname, './src/components/'),
		'@resources': path.resolve(__dirname, './src/resources/'),
		'@lib': path.resolve(__dirname, './src/lib/'),
		'@config': path.resolve(__dirname, './src/config/'),
		'@common': path.resolve(__dirname, './src/common/'),
		'@customHooks': path.resolve(__dirname, './src/customHooks/'),
	}),
	addLessLoader({
		javascriptEnabled: true,
		modifyVars: {
			'@primary-color': '#FB8821',                         // 全局主色
			'@link-color': '#1890ff',                            // 链接色
			'@success-color': '#65B633',                         // 成功色
			'@warning-color': '#FB8821',                         // 警告色
			'@error-color': '#f5222d',                           // 错误色
			'@font-size-base': '14px',                           // 主字号
			'@heading-color': 'rgba(0, 0, 0, .85)',              // 标题色
			'@text-color': 'rgba(0, 0, 0, .65)',                 // 主文本色
			'@text-color-secondary': 'rgba(0, 0, 0, .45)',       // 次文本色
			'@disabled-color': 'rgba(0, 0, 0, .25)',             // 失效色
			'@border-radius-base': '4px',                        // 组件/浮层圆角
			'@border-color-base': '#d9d9d9',                     // 边框色
			'@box-shadow-base': '0 2px 8px rgba(0, 0, 0, .15)',  // 浮层阴影
		}
	}),
);
