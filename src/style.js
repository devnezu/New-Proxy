
const styleContent = `

body {
  background: linear-gradient(90deg, #000000, #5f5f5f, #696969);
  font: bold 18px/1.5 'Poppins', sans-serif;
  color: #ffffff;
}

.header {
  background-color: #696969;
  padding: 30px 20px;
  border-bottom: 4px solid #00d4ff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.main-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 30px 20px;
}

.card {
  background-color: #ffffff;
  border-radius: 15px;
  overflow: hidden;
  margin: 20px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card img {
  max-width: 100%;
  transition: opacity 0.3s ease-in-out;
}

.card img:hover {
  opacity: 0.7;
}

.card-content {
  padding: 20px;
}

.card-title {
  font-size: 2em;
  margin-bottom: 15px;
  color: #ffffff; 
}

.button {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 8px;
  background-color: #00d4ff;
  color: #ffffff;
  text-align: center;
  margin-top: 20px;
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.button:hover {
  background-color: #0292b2;
  transform: translateY(-2px);
}

  :root {
    --transition-duration: 0.3s;
    --border-radius: 12px;
    --input-border-color: #ccc;
    --input-focus-border-color: #66afe9;
    --input-shadow-color: rgba(0, 0, 0, 0.15);
    --checkbox-color: #007BFF;
    --font-color: #333;
    --primary-bg-color: transparent;
    --hover-bg-color: rgba(255, 255, 255, 0.2);
    --active-shadow-color: rgba(0, 0, 0, 0.25);
    --hover-scale: 1.05;
  }
  
  .result_table {
    background-color: white !important;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    border-bottom: 2px solid rgba(136, 136, 136, 0.5);
  }
  
  .role_back {
    background-color: white !important;
    border-radius: 0 0 var(--border-radius) var(--border-radius);
  }
  
  input[type="text"].el-input__inner,
  input[type="number"].el-input__inner {
    border: 1px solid var(--input-border-color);
    border-radius: var(--border-radius);
    padding: 10px;
    background-color: #ffffff !important;
    box-shadow: inset 0 1px 2px var(--input-shadow-color);
    transition: border-color var(--transition-duration) ease-in-out, box-shadow var(--transition-duration) ease-in-out;
    color: gray;
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
    transition: transform var(--transition-duration) ease-in-out, background-color var(--transition-duration) ease-in-out, box-shadow var(--transition-duration) ease-in-out;
  }
  
  .menuitem:hover {
    transform: scale(var(--hover-scale));
    background-color: var(--hover-bg-color);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  }
  
  .menuitem:active {
    box-shadow: 0 4px 8px var(--active-shadow-color);
  }
  
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
  
  .el-input__inner {
    border: 1px solid var(--input-border-color);
    border-radius: var(--border-radius);
    padding: 10px;
    background-color: #ffffff !important;
    box-shadow: inset 0 1px 2px var(--input-shadow-color);
    transition: border-color var(--transition-duration) ease-in-out, box-shadow var(--transition-duration) ease-in-out;
    color: var(--font-color);
  }
  
  .el-input__inner:focus {
    border-color: var(--input-focus-border-color);
    box-shadow: inset 0 1px 2px var(--input-shadow-color), 0 0 8px var(--input-focus-border-color);
    color: #007BFF;
  }
  
  .el-tabs__item.is-top {
    color: #ffffff;
  }
  
  .el-tabs__item.is-top.is-active {
    color: #007BFF;
  }
  
  .el-checkbox__label {
    color: #ffffff;
  }
  
  .el-checkbox.is-checked .el-checkbox__label {
    color: #007BFF;
  }
  
  .inpItem .name {
    color: #ffffff;
  }

`;

module.exports = styleContent;