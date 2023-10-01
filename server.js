const { createProxyMiddleware } = require('http-proxy-middleware');

const styleContent = `
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

body {
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(255,255,255,1) 0%, rgba(0,212,255,1) 100%) fixed !important;
  background-size: 200% 200% !important;
  animation: gradientAnimation 15s ease infinite !important;
  color: #333333 !important; /* Texto escuro */
  font-family: 'Mooli', Arial, sans-serif !important; /* Fonte do Google (Mooli) */
}

// Modificações no cabeçalho
header {
  background-color: rgba(255, 255, 255, 0.8) !important;
  padding: 10px !important;
  border-bottom: 2px solid #333333 !important;
}

// Animação simples para os links
a {
  color: #333333 !important;
  text-decoration: none !important;
  padding-bottom: 2px !important;
  transition: color 0.3s ease-in-out !important;
}

a:hover {
  color: #ff6600 !important;
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

  // Importa a fonte do Google (Mooli)
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Mooli&display=swap';
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