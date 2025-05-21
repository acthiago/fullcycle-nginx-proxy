const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const config = {
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const connection = mysql.createConnection(config);

const createTable = `CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))`;
connection.query(createTable);

app.get('/', (req, res) => {
  const name = 'Thiago';
  connection.query(`INSERT INTO people(name) VALUES(?)`, [name]);

  connection.query(`SELECT name FROM people`, (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao consultar banco de dados.');
    }

    let namesList = results.map(row => `<li>${row.name}</li>`).join('');
    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <ul>${namesList}</ul>
    `);
  });
});

app.listen(port, () => {
  console.log('Rodando na porta ' + port);
});
