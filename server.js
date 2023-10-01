const { createProxyMiddleware } = require('http-proxy-middleware');
const cheerio = require('cheerio');

const translations = {
  "Server": "Servidor da Conta",
  "Number of limited characters": "Número de Personagens Limitados",
  "Number of standard characters": "Número de Personagens do Mochileiro",
  "Number of five-star weapons": "Número de Armas Limitadas",
  "Gender": "Gênero do Viajante",
  "male": "Masculino",
  "female": "Feminino",
  "Constellation level": "Level de Constelação",
  "Intertwined Fate": "Destinos Entrelaçados",
  "Only selected limited characters": "Apenas os personagens Limitados Selecionados",
  "Only selected standard characters": "Apenas os personagens Mochileiro Selecionados",
};

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

const translateContent = (html) => {
  const $ = cheerio.load(html);
  $('.name').each((i, element) => {
    const text = $(element).text().trim();
    if(translations[text]) {
      $(element).text(translations[text]);
    }
  });

  $('.el-select-dropdown__item span').each((i, element) => {
    const text = $(element).text().trim();
    if(translations[text]) {
      $(element).text(translations[text]);
    }
  });

  $('.el-checkbox__label').each((i, element) => {
    const text = $(element).text().trim();
    if(translations[text]) {
      $(element).text(translations[text]);
    }
  });

  return $.html();
};

const handleProxyResponse = (proxyRes, req, res) => {
  if (proxyRes.headers['content-type'] && proxyRes.headers['content-type'].includes('text/html')) {
    let bodyChunks = [];
    proxyRes.on('data', (chunk) => {
      bodyChunks.push(chunk);
    });
    proxyRes.on('end', () => {
      let body = Buffer.concat(bodyChunks).toString('utf8');
      body = translateContent(body);
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