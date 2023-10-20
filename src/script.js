const { modifyContent, copyToClipboard, translateCharacters } = require('./helpers');
const styleContent = require('./style');

const scriptContent = `
  const style = document.createElement('style');
  style.innerHTML = \`${styleContent}\`;
  document.head.appendChild(style);

  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);

  const customStyle = document.createElement('style');
  customStyle.innerHTML = \`

    :root {
      --primary-bg-color: rgba(255, 255, 255, 0.2);
      --hover-bg-color: rgba(255, 255, 255, 0.4);
      --active-shadow-color: rgba(0, 0, 0, 0.4);
      --transition-duration: 0.3s;
      --border-radius: 12px;
      --input-border-color: #ccc;
      --input-focus-border-color: #66afe9;
      --input-shadow-color: rgba(0, 0, 0, 0.1);
      --checkbox-color: #007BFF;
    }
  
    .menuitem img {
      max-width: 100%;
      height: auto;
      transition: transform var(--transition-duration) ease-in-out;
    }
  
    .menuitem span {
      display: block;
      text-align: center;
      margin-top: 10px;
      font-weight: bold;
    }
  
    .menuitem {
      text-align: center;
      border: none;
      padding: 10px;
      margin: 10px;
      background-color: var(--primary-bg-color);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      border-radius: var(--border-radius);
      transform: perspective(1000px) rotateY(0deg);
      transition: transform var(--transition-duration) ease-in-out, background-color var(--transition-duration) ease-in-out, box-shadow var(--transition-duration) ease-in-out;
    }
  
    .menuitem:hover {
      transform: perspective(1000px) rotateY(10deg);
      background-color: var(--hover-bg-color);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
    }
  
    .menuitem:active {
      box-shadow: 0 4px 8px var(--active-shadow-color), 0 0 10px var(--active-shadow-color) inset, 0 0 20px rgba(255, 0, 0, 0.7) inset, 0 0 30px rgba(0, 255, 0, 0.7) inset, 0 0 40px rgba(0, 0, 255, 0.7) inset; /* Adiciona um efeito RGB suave nas bordas ao clicar */
    }

    /* Estilização para Dropdown */
    .el-select-dropdown {
        border-radius: var(--border-radius);
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        background-color: #ffffff !important;
        transition: box-shadow var(--transition-duration) ease-in-out;
    }

    .el-select-dropdown__item {
        padding: 10px;
        transition: background-color var(--transition-duration) ease-in-out;
        background-color: #ffffff !important;
    }

    .el-select-dropdown__item:hover {
        background-color: var(--hover-bg-color);
    }

    /* Estilização para Input Fields */
    .el-input__inner {
        border: 1px solid var(--input-border-color);
        border-radius: var(--border-radius);
        padding: 10px;
        background-color: #ffffff !important;
        box-shadow: inset 0 1px 2px var(--input-shadow-color);
        transition: border-color var(--transition-duration) ease-in-out, box-shadow var(--transition-duration) ease-in-out;
    }

    .el-input__inner:focus {
        border-color: var(--input-focus-border-color);
        box-shadow: inset 0 1px 2px var(--input-shadow-color), 0 0 5px var(--input-focus-border-color);
    }

    /* Estilização para Checkbox */
    .el-checkbox__inner {
        border-radius: var(--border-radius);
        transition: background-color var(--transition-duration) ease-in-out, border-color var(--transition-duration) ease-in-out;
    }

    .el-checkbox.is-checked .el-checkbox__inner {
        background-color: var(--checkbox-color);
        border-color: var(--checkbox-color);
    }
  
  \`;
  document.head.appendChild(customStyle);
  
  
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
    'Only selected limited characters': 'Apenas limitados selecionados',
    'Only selected standart characters': 'Apenas mochileiros selecionados',
    'Five star character': 'Personagens [5⭐ Stars]',
    'Four star character': 'Personagens [4⭐ Stars]',
    'Five star weapon': 'Armas [5⭐ Stars]',
    'Four star weapon': 'Armas [4⭐ Stars]',
    'Easy search': 'Procura Rápida',
    'Enter more conditions to query data': 'Selecione mais algumas opções para exibir as contas disponíveis',
    'Search': 'Buscar',
    'Reset': 'Redefinir',
    'the life': 'C1',
    'Second life': 'C2',
    'Three lives': 'C3',
    'Four lives': 'C4',
    'Five lives': 'C5',
    'Six lives': 'C6',
  };

  const translateContent = () => {
    document.body.style.zoom = "75%"; 
    setTimeout(() => {
        document.querySelectorAll('.name, .el-select-dropdown__item span, .el-checkbox__label, .el-tabs__item, .desc, .btnback span').forEach(element => {
            const textContent = element.textContent.trim();
            if (translationMap[textContent]) {
                element.textContent = translationMap[textContent];
            }
        });
    }, 2000);  
  };

  document.addEventListener('DOMContentLoaded', translateContent);

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
    
    return str;
}

    document.addEventListener('copy', (event) => {
      event.preventDefault();
      const selectedText = document.getSelection().toString();
      const translatedText = translateCharacters(selectedText);
      event.clipboardData.setData('text/plain', translatedText);
    });

    document.addEventListener('DOMContentLoaded', () => {
      translateContent();
      setTimeout(adjustLanguageSelector, 3000);
      setTimeout(selectServerAmerica, 3000);  
      const copyButton = document.querySelector('.copy-btn');
      if (copyButton) {
          copyButton.addEventListener('click', () => {
              const modifiedContent = modifyContent();
              copyToClipboard(modifiedContent);
    
              const resetButton = document.querySelector('.btnback .el-button--info');
              if (resetButton) {
                resetButton.addEventListener('click', () => {
                  // Adiciona um delay pequeno para garantir que qualquer lógica associada ao botão "Redefinir" já foi concluída.
                  setTimeout(() => {
                    translateContent();
                  }, 100);
          });
      }
    })
      }
    })

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
  
  document.querySelectorAll('.menuitem').forEach((element) => {
    element.classList.remove('animate__bounceInRight', 'animate__bounceInLeft');
    element.classList.add('animate__zoomIn'); // Ou qualquer outra animação que desejar.
});

`;

module.exports = scriptContent;
