const { createProxyMiddleware } = require('http-proxy-middleware');

const styleContent = `
body {
  background: linear-gradient(to bottom, #f0f0f0, #a2d5f2) fixed !important; /* Background fixo */
  color: #333333 !important; /* Texto escuro */
  font-family: 'Roboto', Arial, sans-serif !important; /* Fonte do Google (Roboto) */
  transition: background 0.3s ease-in-out, color 0.3s ease-in-out !important; /* Transições suaves */
}

// Modificações no cabeçalho
header {
  background-color: #00587a !important;
  padding: 10px !important;
  border-bottom: 2px solid #ffa62b !important;
}

// Animação simples para os links
a {
  color: #00587a !important;
  text-decoration: none !important;
  padding-bottom: 2px !important;
  transition: background-size 0.3s ease-in-out, color 0.3s ease-in-out !important;
  background-image: linear-gradient(currentColor, currentColor) !important;
  background-repeat: no-repeat !important;
  background-position: 0% 100% !important;
  background-size: 0% 2px !important;
}

a:hover {
  color: #ffa62b !important;
  background-size: 100% 2px !important;
}

// Animação de zoom para imagens
img {
  transition: transform 0.3s ease-in-out !important;
}

img:hover {
  transform: scale(1.05) !important;
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