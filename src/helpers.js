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
  