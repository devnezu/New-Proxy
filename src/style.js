const styleContent = `
body {
  background: linear-gradient(90deg, #000000, #333333, #696969);
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  color: #ffffff;
  font-size: 16px; /* Tamanho da fonte aumentado para 16px */
}

.header {
  background-color: #696969;
  padding: 20px;
  border-bottom: 3px solid #00d4ff;
}


.main-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
}

.card {
  background-color: #333333;
  border-radius: 10px;
  overflow: hidden;
  margin: 20px;
  transition: transform 0.3s ease-in-out;
}

.card:hover {
  transform: scale(1.05);
}

.card img {
  max-width: 100%;
  transition: opacity 0.3s ease-in-out;
}

.card img:hover {
  opacity: 0.7;
}

.card-content {
  padding: 15px;
}

.card-title {
  font-size: 1.8em; /* Tamanho da fonte aumentado para 1.8em */
  margin-bottom: 10px;
  color: #ffffff;
}

.button {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #00d4ff;
  color: #ffffff;
  text-align: center;
  margin-top: 15px;
  transition: background-color 0.3s ease-in-out;
}

.button:hover {
  background-color: #0292b2;
}

.result_table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  margin-top: 20px;
}
`;

module.exports = styleContent;
