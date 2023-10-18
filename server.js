const { createProxyMiddleware } = require('http-proxy-middleware');
const styleContent = require('./src/style');
const scriptContent = require('./src/script');
const { modifyContent, copyToClipboard, translateCharacters } = require('./src/helpers');

const injectContent = (body) => {
  const scriptTag = '<script>' + scriptContent + '</script>';
  if (body.includes('</head>')) {
    return body.replace('</head>', scriptTag + '</head>');
  }
  return body;
};

const handleProxyResponse = (proxyRes, req, res) => {
  if (proxyRes.headers['content-type'] && proxyRes.headers['content-type'].includes('text/html')) {
    let bodyChunks = [];
    proxyRes.on('data', (chunk) => {
      bodyChunks.push(chunk);
    });
    proxyRes.on('end', () => {
      let body = Buffer.concat(bodyChunks).toString('utf8');
      body = injectContent(body);
      res.end(body);
    });
  } else {
    proxyRes.pipe(res);
  }
};

const proxyOptions = {
  target: 'https://godacc.com',
  changeOrigin: true,
  selfHandleResponse: true,
  onProxyRes: handleProxyResponse,
};

const proxyAPI = createProxyMiddleware({
  ...proxyOptions,
  pathRewrite: { '^/api/': '/api/' },
});

const proxyStatic = createProxyMiddleware({
  ...proxyOptions,
  pathRewrite: { '^/genshin/static/': '/genshin/static/' },
});

const proxyMain = createProxyMiddleware({
  ...proxyOptions,
  pathRewrite: { '^/': '/genshin/' },
});

module.exports = (req, res) => {
  if (req.url.startsWith('/api')) return proxyAPI(req, res);
  if (req.url.startsWith('/genshin/static')) return proxyStatic(req, res);
  return proxyMain(req, res);
};
