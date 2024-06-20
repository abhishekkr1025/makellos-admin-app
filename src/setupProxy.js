const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/user/getAllUsers',
    createProxyMiddleware({
      target: 'http://34.131.81.53:8080',
      changeOrigin: true,
    })
  );
};