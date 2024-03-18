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

  // Function to automatically select America server
  const selectServerAmerica = () => {
    const serverDropdownItems = document.querySelectorAll('.el-select-dropdown__item span');
    const americaItem = Array.from(serverDropdownItems).find(item => item.textContent.trim().toLowerCase() === 'america');
    if (americaItem) {
      americaItem.click();
    }
  };

  // Function to translate character names on copy
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

  // Modify copied text
  function modifyText(text) {
    console.log('Texto original:', text);
    let modifiedText = text.replace('女', 'Lumine').replace('男', 'Aether').replace('级', '');
    console.log('Texto modificado:', modifiedText);
    return modifiedText;
  }

  // Copy modified content to clipboard
  function copyToClipboard(content) {
    navigator.clipboard.writeText(content)
      .then(() => console.log('Conteúdo copiado para a área de transferência.'))
      .catch(err => console.error('Erro ao copiar para a área de transferência:', err));
  }

  // Event listeners
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(selectServerAmerica, 3000);
    translateContent();
  
    setTimeout(() => {
      // Esconder a div de compra
      const shoppingDiv = document.querySelector('div.shoppaing.animate__animated.animate__bounce');
      if (shoppingDiv) {
          shoppingDiv.style.visibility = 'hidden';
          console.log('Div de compra escondida (mantendo espaço) após 10 segundos.');
      }
      
      // Esconder a div de idioma
      const languageDivs = Array.from(document.querySelectorAll('.inpItem .name'));
      const languageDiv = languageDivs.find(div => div.textContent.trim() === 'Idioma');
      if (languageDiv) {
        languageDiv.closest('.inpItem').style.visibility = 'hidden';
        console.log('Div de idioma escondida (mantendo espaço).');
      }
    }, 3000);
  
    const copyButton = document.querySelector('.copy-btn');
    if (copyButton) {
      copyButton.addEventListener('click', () => {
        const modifiedContent = modifyContent();
        copyToClipboard(modifiedContent);
      });
    }
  });
  
  document.addEventListener('copy', (event) => {
    event.preventDefault();
    const selectedText = document.getSelection().toString();
    const translatedText = translateCharacters(selectedText);
    event.clipboardData.setData('text/plain', translatedText);
  });
  
  
  
`;

module.exports = scriptContent;