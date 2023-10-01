const { createProxyMiddleware } = require('http-proxy-middleware');

const styleContent = `
body {
  background: linear-gradient(to bottom, #ffffff, #b3d9ff) fixed !important; /* Background fixo */
  color: #000000 !important; /* Texto preto */
  font-family: 'Kanit', Arial, sans-serif !important; /* Fonte do Google (Kanit) */
  transition: background 0.3s ease-in-out, color 0.3s ease-in-out !important; /* Transições suaves */
}

// Modificações no cabeçalho
header {
  background-color: #333333 !important;
  padding: 10px !important;
}

// Animação simples para os links
a {
  transition: color 0.3s ease-in-out !important;
}

a:hover {
  color: #ff6600 !important;
}

// Animação de rotação para imagens
img {
  transition: transform 0.3s ease-in-out !important;
}

img:hover {
  transform: rotate(360deg) !important;
}
`;

const scriptContent = `
  // Adiciona o elemento de estilo ao head do documento
  const style = document.createElement('style');
  style.innerHTML = \`${styleContent}\`;
  document.head.appendChild(style);

  // Importa a fonte do Google (Kanit)
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Kanit:wght@400;700&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
`;

const injectContent = (body) => {
  const scriptTag = `<script>${scriptContent}</script>`;
  if (body.includes('</head>')) {
    return body.replace('</head>', `${scriptTag}</head>`);
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

const proxyAPI = createProxyMiddleware({
  target: 'https://godacc.com',
  changeOrigin: true,
  pathRewrite: { '^/api/': '/api/' },
  selfHandleResponse: true,
  onProxyRes: handleProxyResponse,
});

const proxyStatic = createProxyMiddleware({
  target: 'https://godacc.com',
  changeOrigin: true,
  pathRewrite: { '^/genshin/static/': '/genshin/static/' },
});

const proxyMain = createProxyMiddleware({
  target: 'https://godacc.com',
  changeOrigin: true,
  pathRewrite: { '^/': '/genshin/' },
  selfHandleResponse: true,
  onProxyRes: handleProxyResponse,
});

module.exports = (req, res) => {
  if (req.url.startsWith('/api')) return proxyAPI(req, res);
  if (req.url.startsWith('/genshin/static')) return proxyStatic(req, res);
  return proxyMain(req, res);
};