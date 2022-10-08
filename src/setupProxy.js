const { createProxyMiddleware } = require('http-proxy-middleware');

console.log('set up proxy');
module.exports = function (app) {
  console.log('app:', app);
  app.use(createProxyMiddleware('/api', {
    target: 'https://music-api.amos.js.cn/',
    changeOrigin: true, // 控制服务器接收到的请求头中host字段的值
    /*
           changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
           changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
           changeOrigin默认值为false，但我们一般将changeOrigin值设为true
        */
    pathRewrite(path) {
      return path.replace('/api', '');
    }, // 去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
  }));
};
