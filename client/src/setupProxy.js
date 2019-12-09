const proxy = require('http-proxy-middleware');

const wsProxy = proxy('/subscriber', {
  target: 'http://localhost:3001/',
  ws: true, // enable websocket proxy
  logLevel: 'debug'
});

const apiProxy = proxy('/api', {
  target: 'http://localhost:3001/',
  logLevel: 'debug'
});

module.exports = app => {
  app.use(apiProxy);
  app.use(wsProxy);
};
