var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
const dbConfig = require('../src/db.config');

var c = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool
});


/* GET prendas */
router.get('/prendas', function(req, res, next) {
  c.query('SELECT * FROM prendas', function(err, rows, fields) {
    if (err) throw err;
    var prendas = [];
    for (let i=0; i < rows.length; i++) {
      prendas.push(rows[i]);
    }
    res.status(200).send({
      prendas
    });
  });
});


// GET categorias
router.get('/categorias', function(req, res) {
  c.query('SELECT * FROM categorias', function(err, rows, fields) {
    if (err) throw err;
    var categorias = [];
    for (let i=0; i < rows.length; i++) {
        categorias.push(rows[i]);
    }
    res.status(200).send({
      categorias
    })
  });
});

module.exports = router;