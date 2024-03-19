const styleContent = require('./style'); 

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

  const addToCartButton = document.querySelector('button.el-button--text.el-button--small span');
  if (addToCartButton) {
      addToCartButton.parentElement.remove();
  }

  const shoppingDiv = document.querySelector('div.shoppaing.animate__animated.animate__bounce');
  if (shoppingDiv) {
      shoppingDiv.remove();
  }

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
  
  function translateCharacters(str) {
    const translationMap = {
      '男': 'Masculino',
      '女': 'Feminino',
      '级': '',
    };
  
    for (const [key, value] of Object.entries(translationMap)) {
      str = str.replace(new RegExp(key, 'g'), value);
    }
    
    return str;
  }
  
  module.exports = { modifyContent, copyToClipboard, translateCharacters };
  

  const scriptContent = `
  const style = document.createElement('style');
  style.innerHTML = \`${styleContent}\`;
  document.head.appendChild(style);
  
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap';
  link.rel = 'stylesheet';
  link.defer = true;
  document.head.appendChild(link);
  
  const translationMap = {
    'Servidor': 'Servidor da Conta',
    'Número_Limitado_de_Personagens': 'Número de Personagens Limitados',
    'Número_Limitado_de_Armas': 'Número de Personagens do Mochileiro',
    'Número_de_armas': 'Número de Armas 5Estrelas',
    'Gênero': 'Gênero do Viajante',
    'Masculino': 'Masculino',
    'Feminino': 'Feminino',
    'Linguagem': 'Idioma',
    'Constellation level': 'Level de Constelação',
    'Destino Entrelaçado': 'Destinos Entrelaçados',
    'Gema Essencial': 'Quantidade de Gemas',
    'Apenas 5 estrelas selecionados': 'Apenas os limitados selecionados',
    'Apenas 4 estrelas selecionados': 'Apenas os mochileiros selecionados',
    'Personagens_5_Estrelas': 'Personagens [5⭐ Stars]',
    'Personagens_4_Estrelas': 'Personagens [4⭐ Stars]',
    'Armas_5_Estrelas': 'Armas [5⭐ Stars]',
    'Armas_4_Estrelas': 'Armas [4⭐ Stars]',
    'Pesquisa': 'Combinações Rápidas',
    'Sem_Dados': 'Selecione mais algumas opções para exibir as contas disponíveis',
    'Procurar': 'Buscar',
    'Resetar': 'Limpar',
    'the life': 'C1',
    'Second life': 'C2',
    'Three lives': 'C3',
    'Four lives': 'C4',
    'Five lives': 'C5',
    'Six lives': 'C6',
  };
  
  const characterTranslationMap = {
    '男': 'Masculino',
    '女': 'Feminino',
    '级': '',
  };
  
  const translateContent = () => {
    document.body.style.zoom = "100%";
  
    setTimeout(() => {
      const elements = document.querySelectorAll('.name, .el-select-dropdown__item span, .el-checkbox__label, .el-tabs__item, .desc, .btnback span');
      elements.forEach(element => {
        const textContent = element.textContent.trim();
        if (translationMap[textContent]) {
          element.textContent = translationMap[textContent];
        }
      });
    }, 2000);
  };
  
  const selectServerAmerica = () => {
    setTimeout(() => {
      const serverDropdownItems = document.querySelectorAll('.el-select-dropdown__item span');
      const americaItem = Array.from(serverDropdownItems).find(item => item.textContent.trim().toLowerCase() === 'america');
      if (americaItem) {
        americaItem.click();
      }
    }, 3000);
  };
  
  const translateCharacters = str => {
    for (const [key, value] of Object.entries(characterTranslationMap)) {
      str = str.replace(new RegExp(key, 'g'), value);
    }
    return str;
  };
  
  const modifyText = text => {
    return text.replace('女', 'Lumine').replace('男', 'Aether').replace('级', '');
  };
  
  const copyToClipboard = content => {
    navigator.clipboard.writeText(content)
      .then(() => console.log('Conteúdo copiado para a área de transferência.'))
      .catch(err => console.error('Erro ao copiar para a área de transferência:', err));
  };
  
  const createLoadingScreen = () => {
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loadingScreen';
    loadingScreen.style.cssText = \`
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    \`;
    loadingScreen.innerHTML = \`
      <div style="display: flex; align-items: center;">
        <div class="spinner" style="margin-right: 20px;"></div>
        <span style="font-size: 2rem; color: black;">Carregando... Por favor, aguarde.</span>
      </div>
    \`;
    const spinnerStyle = document.createElement('style');
    spinnerStyle.innerHTML = \`
      .spinner {
        border: 5px solid #f3f3f3;
        border-top: 5px solid #3498db;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 2s linear infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    \`;
    document.head.appendChild(spinnerStyle);
    document.body.appendChild(loadingScreen);
  };
  
  const removeLoadingScreen = () => {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
      loadingScreen.remove();
    }
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    createLoadingScreen();
    selectServerAmerica();
    translateContent();
  
    setTimeout(() => {
      const shoppingDiv = document.querySelector('div.shoppaing.animate__animated.animate__bounce');
      if (shoppingDiv) {
        shoppingDiv.style.visibility = 'hidden';
      }
  
      const languageDivs = Array.from(document.querySelectorAll('.inpItem .name'));
      const languageDiv = languageDivs.find(div => div.textContent.trim() === 'Idioma');
      if (languageDiv) {
        languageDiv.closest('.inpItem').style.visibility = 'hidden';
      }
  
      const topLanguageDiv = document.querySelector('.top_language');
      if (topLanguageDiv) {
        topLanguageDiv.style.visibility = 'hidden';
      }
  
      const elementsToUnblur = document.querySelectorAll('body > *');
      elementsToUnblur.forEach(element => {
        element.dataset.blur = 5;
      });
  
      const intervalId = setInterval(() => {
        let allCleared = true;
        elementsToUnblur.forEach(element => {
          let blurValue = parseFloat(element.dataset.blur);
          blurValue = Math.max(0, blurValue - 0.5);
          element.style.filter = 'blur(' + blurValue + 'px)';
          element.dataset.blur = blurValue;
  
          if (blurValue > 0) {
            allCleared = false;
          }
        });
  
        if (allCleared) {
          clearInterval(intervalId);
          removeLoadingScreen();
        }
      }, 100);
    }, 3000);
  
    const copyButton = document.querySelector('.copy-btn');
    if (copyButton) {
      copyButton.addEventListener('click', () => {
        const selectedText = document.getSelection().toString();
        const modifiedContent = translateCharacters(selectedText);
        copyToClipboard(modifiedContent);
      });
    }
  });
  
  document.addEventListener('copy', event => {
    event.preventDefault();
    const selectedText = document.getSelection().toString();
    const translatedText = translateCharacters(selectedText);
    event.clipboardData.setData('text/plain', translatedText);
  });
  `;
  
  module.exports = scriptContent;