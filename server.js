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

  // Mapeamento de tradução
  const translationMap = {
    'Server': 'Servidor da Conta',
    'Number of limited characters': 'Número de Personagens Limitados',
    'Number of standart characters': 'Número de Personagens do Mochileiro',
    'Number of five-star weapons': 'Número de Armas Limitadas',
    'Gender': 'Gênero do Viajante',
    'male': 'Masculino',
    'female': 'Feminino',
    'Language': 'Idioma',
    'Constellation level': 'Level de Constelação',
    'Intertwined Fate': 'Destinos Entrelaçados',
    'Only selected limited characters': 'Apenas os personagens Limitados Selecionados',
    'Only selected standart characters': 'Apenas os personagens Mochileiro Selecionados',
    'Five star character': 'Personagens Cinco Estrelas',
    'Four star character': 'Personagens Quatro Estrelas',
    'Five star weapon': 'Armas Cinco Estrelas',
    'Four star weapon': 'Armas Quatro Estrelas',
    'Easy search': 'Procura Rápida',
    'Search': 'Procurar',
    'Reset': 'Resetar',  
    'Enter more conditions to query data': 'Selecione mais opções para consultar dados'
  };

  // Função de tradução
  const translateContent = () => {
    // Adicionando um atraso de 2 segundos antes de tentar traduzir o conteúdo
    setTimeout(() => {
      document.querySelectorAll('.name, .el-select-dropdown__item span, .el-checkbox__label').forEach(element => {
        const textContent = element.textContent.trim();
        if (translationMap[textContent]) {
          element.textContent = translationMap[textContent];
        }
      });
    }, 2000);  // 2000 ms = 2 segundos
  };
  
  // Chame a função de tradução quando o documento estiver carregado
  document.addEventListener('DOMContentLoaded', translateContent);
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

      // Adicione o elemento de áudio para reprodução em loop
      body = body.replace('</body>', `
      <audio id="backgroundMusic" loop autoplay>
        <source src="audio.mp3" type="audio/mpeg">
        Seu navegador não suporta o elemento de áudio.
      </audio>
    </body>
    `);

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