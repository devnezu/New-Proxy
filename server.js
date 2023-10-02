const { createProxyMiddleware } = require('http-proxy-middleware');
const minify = require('minify');
const obfuscator = require('javascript-obfuscator');
const config = require('./config');

const styleContent = `
body {
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(255,255,255,1) 0%, rgba(0,212,255,1) 100%);
  background-size: 200% 200%;
  color: #333333;
  font-family: 'Mooli', Arial, sans-serif;
}

header {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-bottom: 2px solid #333333;
  transition: background-color 0.3s ease-in-out;
}

header:hover {
  background-color: rgba(255,165,0,0.8); 
}

a {
  color: #333333;
  text-decoration: none;
  padding-bottom: 2px;
  transition: color 0.3s ease-in-out;
}

a:hover {
  color: #ff6600;
}

img {
  transition: transform 0.3s ease-in-out;
}

img:hover {
  transform: scale(1.05);
}

@keyframes gradientAnimation {
  0% {background-position: 0% 50%;}
  50% {background-position: 100% 50%;}
  100% {background-position: 0% 50%;}
}
`;

function modifyContent() {
  const rows = document.querySelectorAll('.result_table td');
  if (rows.length === 0) return '';

  const accountNumber = rows[1].textContent.split('：')[1].trim();
  const server = rows[0].textContent.trim();
  const gender = rows[3].textContent.split('：')[1].trim() === 'Male' ? 'Masculino' : 'Feminino';
  const level = rows[4].textContent.split('：')[1].trim().slice(0, -2);
  const characters = Array.from(document.querySelectorAll('.role_back span')).map(span => span.textContent.trim()).join(',');
  const weapons = Array.from(document.querySelectorAll('.role_back + td img')).map(img => img.nextElementSibling.textContent.trim()).join(',');

  const modifiedContent = `#${accountNumber}----${server}----${gender}----${level}----[${characters}]----[${weapons}]`;
  return translateCharacters(modifiedContent);
}

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
    }, 2000);  
  };
  
  document.addEventListener('DOMContentLoaded', translateContent);

  ${modifyContent.toString()}
  ${copyToClipboard.toString()}

  function translateCharacters(str) {
    const translationMap = {
      '男': 'Masculino',
      '女': 'Feminino',
      '级': '',
    };

    for (const [key, value] of Object.entries(translationMap)) {
        str = str.replace(new RegExp(key, 'g'), value);
    }

    str = str.replace(/(\d+)/g, 'LVL$1');

    return str;
}

    document.addEventListener('copy', (event) => {
      event.preventDefault();
      const selectedText = document.getSelection().toString();
      const translatedText = translateCharacters(selectedText);
      event.clipboardData.setData('text/plain', translatedText);
    });

    function selectServerAmerica() {
      const serverDropdownItems = document.querySelectorAll('.el-select-dropdown__item span');
      let americaItem = null;
      
      serverDropdownItems.forEach(item => {
          if(item.textContent.trim().toLowerCase() === 'america') {
              americaItem = item;
          }
      });
      
      if(americaItem) {
          americaItem.click();
      }
  }

    document.addEventListener('DOMContentLoaded', () => {
        translateContent();
        setTimeout(adjustLanguageSelector, 3000);
        setTimeout(selectServerAmerica, 3000);  
        const copyButton = document.querySelector('.copy-btn');
        if (copyButton) {
            copyButton.addEventListener('click', () => {
                const modifiedContent = modifyContent();
                copyToClipboard(modifiedContent);
            });
        }
    });
    
    function adjustLanguageSelector() {
      const inpItems = document.querySelectorAll('.inpItem');
      inpItems.forEach(item => {
          const nameElement = item.querySelector('.name');
          if (nameElement && nameElement.textContent.trim() === 'Idioma') {
              const inputElement = item.querySelector('.el-input__inner');
              if (inputElement) {
                  inputElement.setAttribute('placeholder', 'Português BR');
                  inputElement.setAttribute('disabled', 'disabled');
              }
  
              const arrowIcon = item.querySelector('.el-select__caret');
              if (arrowIcon) {
                  arrowIcon.style.display = 'none';
              }
  
              const selectDropdown = item.querySelector('.el-select-dropdown__list');
              if (selectDropdown) {
                  selectDropdown.innerHTML = '';
                  selectDropdown.style.display = 'none';
              }
          }
      });
  
      const dropdowns = document.querySelectorAll('.el-dropdown');
      dropdowns.forEach(dropdown => {
          const languageName = dropdown.querySelector('.language-name');
          if (languageName) {
              languageName.textContent = 'Português BR';  // Atualizar o texto exibido
  
              const dropdownLink = dropdown.querySelector('.el-dropdown-link');
              if (dropdownLink) {
                  dropdownLink.removeAttribute('aria-haspopup');
                  dropdownLink.removeAttribute('aria-controls');
                  dropdownLink.classList.remove('el-dropdown-selfdefine');
                  dropdownLink.classList.remove('el-dropdown-link');
              }
  
              const arrowIcon = dropdown.querySelector('.el-icon-arrow-down');
              if (arrowIcon) {
                  arrowIcon.style.display = 'none';
              }
  
              const dropdownMenu = dropdown.querySelector('.el-dropdown-menu');
              if (dropdownMenu) {
                  dropdownMenu.style.display = 'none';
              }
          }
      });
  
      const englishItems = document.querySelectorAll('.el-dropdown-menu__item');
      englishItems.forEach(item => {
          if (item.textContent.trim() === 'English') {
              item.textContent = 'Português BR';
          }
      });
  }

  const replaceImage = () => {
    setTimeout(() => {
      const oldImageSrc = "/genshin/static/img/nodata.9844e18.png";
      const newImageSrc = "https://media.discordapp.net/attachments/1071788462858047511/1149143239484510249/unnamed.webp?ex=651c0cca&is=651abb4a&hm=64e1a03020538cee4f6b20553e426e2461b6a4e90abd18f53566edac4639acc0&=";
      const imageElement = document.querySelector(\`img[src='${oldImageSrc}']\`);
      if (imageElement) {
        imageElement.setAttribute('src', newImageSrc);
      }
    }, 10000);  // 10 segundos de atraso
  };
  
  document.addEventListener('DOMContentLoaded', replaceImage);
  
  
`;
 
const obfuscateAndMinify = async (code) => {
  try {
    const minifiedCode = await minify(code, {
      js: {
        compress: true,
        mangle: true,
      },
    });

    const obfuscatedCode = obfuscator.obfuscate(minifiedCode, {
      compact: true,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 1,
      numbersToExpressions: true,
      simplify: true,
      shuffleStringArray: true,
      splitStrings: true,
      stringArrayThreshold: 1,
    }).getObfuscatedCode();

    return obfuscatedCode;
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  const scriptContentObfuscated = await obfuscateAndMinify(scriptContent);

  const injectContent = (body) => {
    const scriptTag = `<script>${scriptContentObfuscated}</script>`;
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
    target: config.targetURL,
    changeOrigin: true,
    pathRewrite: { '^/api/': '/api/' },
    selfHandleResponse: true,
    onProxyRes: handleProxyResponse,
  });

  const proxyStatic = createProxyMiddleware({
    target: config.targetURL,
    changeOrigin: true,
    pathRewrite: { '^/genshin/static/': '/genshin/static/' },
  });

  const proxyMain = createProxyMiddleware({
    target: config.targetURL,
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
})();