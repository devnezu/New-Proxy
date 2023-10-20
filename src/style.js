const styleContent = `
body {
  background: linear-gradient(90deg, #000000, #5f5f5f, #696969);
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  color: #ffffff;
  font-size: 18px; 
  line-height: 1.5; 
}

.header {
  background-color: #696969;
  padding: 30px 20px; 
  border-bottom: 4px solid #00d4ff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

.main-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 30px 20px; 
}

.card {
  background-color: #333333;
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

.result_table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  margin-top: 30px; 
}
`;

module.exports = styleContent;
