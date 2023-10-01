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

header {
  background-color: rgba(255, 255, 255, 0.8) !important;
  padding: 10px !important;
  border-bottom: 2px solid #333333 !important;
}

a {
  color: #333333 !important;
  text-decoration: none !important;
  padding-bottom: 2px !important;
  transition: color 0.3s ease-in-out !important;
}

a:hover {
  color: #ff6600 !important;
}

img {
  transition: transform 0.3s ease-in-out !important;
}

img:hover {
  transform: scale(1.05) !important;
}
`;

// Função para modificar o conteúdo
function modifyContent() {
  const rows = document.querySelectorAll('.result_table td');
  if (rows.length === 0) return '';

  const accountNumber = rows[1].textContent.split('：')[1].trim();
  const server = rows[0].textContent.trim();
  const gender = rows[3].textContent.split('：')[1].trim() === 'Male' ? 'Masculino' : 'Feminino';
  const level = rows[4].textContent.split('：')[1].trim().slice(0, -2);
  const characters = Array.from(document.querySelectorAll('.role_back span')).map(span => span.textContent.trim()).join(',');
  const weapons = Array.from(document.querySelectorAll('.role_back + td img')).map(img => img.nextElementSibling.textContent.trim()).join(',');

  // Chame translateCharacters para substituir caracteres chineses
  const modifiedContent = `#${accountNumber}----${server}----${gender}----${level}----[${characters}]----[${weapons}]`;
  return translateCharacters(modifiedContent);
}

// Função para copiar para a área de transferência
function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

const scriptContent = `
  const style = document.createElement('style');
  style.innerHTML = \`${styleContent}\`;
  document.head.appendChild(style);

  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Mooli&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);

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
    'Five star character': 'Personagens [5⭐ Stars]',
    'Four star character': 'Personagens [4⭐ Stars]',
    'Five star weapon': 'Armas [5⭐ Stars]',
    'Four star weapon': 'Armas [4⭐ Stars]',
    'Easy search': 'Procura Rápida',
    'Search': 'Procurar',
    'Reset': 'Resetar',  
    'Enter more conditions to query data': 'Selecione mais opções para consultar dados'
  };

  const translateContent = () => {
    document.body.style.zoom = "75%"; 
    setTimeout(() => {
      document.querySelectorAll('.name, .el-select-dropdown__item span, .el-checkbox__label, .el-tabs__item').forEach(element => {
        const textContent = element.textContent.trim();
        if (translationMap[textContent]) {
          element.textContent = translationMap[textContent];
        }
      });
    }, 2000);  // 2000 ms = 2 segundos
  };
  
  document.addEventListener('DOMContentLoaded', translateContent);

  ${modifyContent.toString()}
  ${copyToClipboard.toString()}

  // Função para substituir caracteres chineses por palavras em português
  function translateCharacters(str) {
    const translationMap = {
      '男': 'Masculino',
      '女': 'Feminino',
      '级': '',
    };

    // Aplicar todas as substituições no string
    for (const [key, value] of Object.entries(translationMap)) {
        str = str.replace(new RegExp(key, 'g'), value);
    }

    // Agora, encontre o número do nível e coloque 'LVL' diretamente antes dele
    str = str.replace(/(\d+)/g, 'LVL$1');

    return str;
}

    // Interceptar o evento de cópia
    document.addEventListener('copy', (event) => {
      // Prevenir a ação de cópia padrão
      event.preventDefault();

      // Obter o texto que foi selecionado
      const selectedText = document.getSelection().toString();

      // Traduzir o texto selecionado
      const translatedText = translateCharacters(selectedText);

      // Definir o novo texto na área de transferência
      event.clipboardData.setData('text/plain', translatedText);
    });

    // Função para remover o seletor de idioma
    function removeLanguageSelector() {
      const inpItems = document.querySelectorAll('.inpItem');
      inpItems.forEach(item => {
        const nameElement = item.querySelector('.name');
        if (nameElement && nameElement.textContent.trim() === 'Idioma') {
          item.innerHTML = '<div class="placeholder" style="height: 34px;"></div>';  // Ajuste a altura conforme necessário
        }
      });
    }
    
  document.addEventListener('DOMContentLoaded', () => {
    translateContent();
    setTimeout(removeLanguageSelector, 2000); 
    const copyButton = document.querySelector('.copy-btn');
    if (copyButton) {
        copyButton.addEventListener('click', () => {
            const modifiedContent = modifyContent();
            copyToClipboard(modifiedContent);
        });
    }
});
`;

const injectContent = (body) => {
  const metaTag = `<meta name="viewport" content="width=device-width, initial-scale=0.75">`;
  const scriptTag = `<script>${scriptContent}</script>`;
  if (body.includes('</head>')) {
    return body.replace('</head>', `${metaTag}${scriptTag}</head>`);
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