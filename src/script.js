const styleContent = require('./style');

function modifyContent() {
  const rows = document.querySelectorAll('.result_table td');
  if (rows.length === 0) return '';

  const accountNumber = rows[1].textContent.split('：')[1].trim();
  const server = rows[0].textContent.trim();
  const gender = rows[3].textContent.split('：')[1].trim() === 'Male' ? 'Masculino' : 'Feminino';
  const level = rows[4].textContent.split('：')[1].trim();
  const levelWithVariable = `LVL{${level}}`;
  const characters = Array.from(document.querySelectorAll('.role_back span')).map(span => span.textContent.trim()).join(',');
  const weapons = Array.from(document.querySelectorAll('.role_back + td img')).map(img => img.nextElementSibling.textContent.trim()).join(',');

  const modifiedContent = `${accountNumber}----${server}----${gender}----${levelWithVariable}----[${characters}]----[${weapons}]`;

  return translateCharacters(modifiedContent);
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => {
    })
    .catch((err) => {
    });
}

const scriptContent = `
const style = document.createElement('style');
style.innerHTML = \`${styleContent}\`;
document.head.appendChild(style);

const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap';
link.rel = 'stylesheet';
link.defer = true;
document.head.appendChild(link);

function translateCharacters(str) {
  const translationMap = {
    '男': 'Aether',
    '女': 'Lumine',
    '级': '',
  };

  for (const [key, value] of Object.entries(translationMap)) {
    str = str.replace(new RegExp(key, 'g'), value);
  }

  let parts = str.split('----');

  // Remover o caractere '#' do accountNumber
  parts[0] = parts[0].replace('#', '');
  
  // Adicionar LVL{level}
  const level = parts[3].trim();
  parts[3] = \`LVL\${level}\`;

  str = parts.join('----');

  return str;
}

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
  '男': 'Aether',
  '女': 'Lumine',
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

const createLoadingScreen = () => {
  const loadingScreen = document.createElement('div');
  loadingScreen.id = 'loadingScreen';
  loadingScreen.style.cssText = \`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    color: white;
    font-family: 'Poppins', sans-serif;
  \`;
  loadingScreen.innerHTML = \`
    <div style="display: flex; flex-direction: column; align-items: center;">
      <div class="spinner"></div>
      <h2 id="loadingScreenMessage" style="margin-bottom: 10px; font-size: 3rem;">Preparando tudo para você...</h2>
      <p style="text-align: center; max-width: 600px; font-size: 1.5rem;">Essa tela ficará totalmente embaçada enquanto ocultamos e traduzimos os elementos. Quando estiver pronto, você será notificado.</p>
    </div>
  \`;
  const spinnerStyle = document.createElement('style');
  spinnerStyle.innerHTML = \`
    .spinner {
      width: 80px;
      height: 80px;
      border: 10px solid #f3f3f3;
      border-top: 10px solid #3498db;
      border-radius: 50%;
      animation: spin 2s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @media (max-width: 768px) {
      #loadingScreenMessage {
        font-size: 2rem;
      }
      p {
        font-size: 1.2rem;
        max-width: 400px;
      }
      .spinner {
        width: 60px;
        height: 60px;
        border-width: 8px;
      }
    }
    @media (max-width: 480px) {
      #loadingScreenMessage {
        font-size: 1.5rem;
      }
      p {
        font-size: 1rem;
        max-width: 300px;
      }
      .spinner {
        width: 40px;
        height: 40px;
        border-width: 6px;
      }
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

const updateLoadingScreenMessage = (message) => {
  const loadingScreenMessage = document.getElementById('loadingScreenMessage');
  if (loadingScreenMessage) {
    loadingScreenMessage.textContent = message;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  createLoadingScreen();
  selectServerAmerica();
  translateContent();

  // Aplicar blur ainda mais alto inicialmente
  const pageElements = document.querySelectorAll('body > *:not(#loadingScreen)');
  pageElements.forEach(element => {
    element.dataset.blur = 30;
    element.style.filter = 'blur(30px)';
  });

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

    const intervalId = setInterval(() => {
      let allCleared = true;
      pageElements.forEach(element => {
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
        updateLoadingScreenMessage('Tudo pronto! Boa escolha!');
        setTimeout(removeLoadingScreen, 2000);
      }
    }, 100);
  }, 3000);

  const copyButton = document.querySelector('.copy-btn');
  if (copyButton) {
    copyButton.addEventListener('click', () => {
      const modifiedContent = modifyContent();
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