const express = require('express')
const app = express()
const port = 3000

var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'db',
  user            : 'root',
  password        : 'root',
  database        : 'nodedb'
});

app.set('view engine', 'ejs');

//Cadastra os nomes
pool.query('INSERT INTO people(name) values(\'Wesley\'),(\'João Paulo\'),(\'FullCycle\')', function (error, results, fields) {
    if (error) throw error;
    console.log('Nome cadastrado com sucesso!');
});

app.get('/', function(req, res) {

    //consulta os nomes e manda para o render
    pool.query('SELECT * FROM people', function (error, results, fields) {
        if (error) throw error;
        console.log('Lista dos nomes');
        res.render('index', {results: results});
    });

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})




/*
var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'db',
  user            : 'root',
  password        : 'root',
  database        : 'nodedb'
});


pool.query('INSERT INTO people(name) values(\'Wesley\'),(\'João Paulo\'),(\'FullCycle\')', function (error, results, fields) {
  if (error) throw error;
  console.log('Nome cadastrado com sucesso!');
});

app.get('/', (req,res) => {
    // res.send('<h1>Full Cycle</h1>')
    res.render('index.html');
    /*
    res.send('<ul>')
    pool.query('SELECT * FROM people', function (error, results, fields) {
        if (error) throw error;
        results.forEach(element => {
            res.send('<li>' + element.name + '</li>')
        });
    });
    res.send('</ul>')
    *
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
*/


