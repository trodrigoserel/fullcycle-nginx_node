const express = require('express');
const app = express();
const port = 3000;
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database:'nodedb'
};

app.set('view engine', 'ejs');

const mysql = require('mysql');
var connection = mysql.createConnection(config);

connection.connect();

connection.query('DELETE FROM people', function(error, results, fields) {
  console.log('Delete!');
});

connection.query(`INSERT INTO people(name) values('TRodrigo')`, function(error, results, fields) {
  console.log('INSERT 1');
});

connection.query(`INSERT INTO people(name) values('Full Cycle')`, function(error, results, fields) {
  console.log('Insert 2');
});

//connection.end();

app.get('/', function(req, res, next) {
//  res.send("<h1>Full Cycle!!!</>");
//  connection.connect();

  connection.query(`SELECT * FROM people`, function(error, results, fields) {
    if (error) {
      console.log('Erro na query');
      //res.render('error');
      return next(error);
    }
    else {
      console.log('Congratulation!');
      res.render('index', {results: results});
    }

    //connection.end();
  });
});

//connection.end();

app.listen(port, ()=> {
  console.log('Rodando na porta ' + port);
});
