const proxy = require('http-proxy-middleware');
const { domain } = require('./config/config');

module.exports = function(app) {
	app.use(proxy('/api', {
		target: domain,
		changeOrigin: true,
		pathRewrite: {
			'^/api': ''	// 去掉api前缀
		},
		cookieDomainRewrite: "localhost"
	}))
}
