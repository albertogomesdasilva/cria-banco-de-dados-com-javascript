const mysql = require('mysql');
const Sequelize = require('sequelize')
var banco = "banco-de-dados"

const connection = mysql.createConnection({
  host: 'localhost', // substitua pelo host do seu servidor MySQL
  user: 'root',
  password: '123456'
});

connection.connect(function(err) {
  // if (err) throw err;
  if (err) {
    console.log('Ocorreu um erro ao conectar com o banco de dados.');
    process.exit(1);

  }
  console.log(`Conectado ao servidor MySQL e ao Banco de Dados ${banco} com Sucesso...`);
  
  // verifica se o banco já existe
    
  connection.connect((error) => {
  connection.query(`SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${banco}' `, (err, res) => {
      if (res.length === 0) {
        console.log('O banco de dados não existe... irá ser criado...');
              connection.query(`CREATE DATABASE ${banco}`, function (err) {
                if (err) {
                  console.log('Não foi possivel criar o banco')
                }else{
                console.log('Banco de dados criado com sucesso!');
                }
                });
        
        }
        connection.end();
      });
    


  });

});
