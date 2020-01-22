var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
const dbConfig = require('../src/db.config');


// Se crea la conexión con la base de datos usando los datos del archivo db.config.js
var conn = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool
});


// Ruta para la vista prendas
router.get('/prendas', function(req, res, next) {
  conn.query('SELECT * FROM prendas', function(err, rows, fields) {
    if (err) throw err;
    var prendas = [];
    // console.log(prendas);
    for (let i=0; i < rows.length; i++) {
      prendas.push(rows[i]);
      // console.log(fields);
    }
    console.log(prendas);
    res.status(200).send({
      prendas
    });
  });
});


// Ruta para la vista categorías
router.get('/categorias', function(req, res) {
  conn.query('SELECT * FROM categorias', function(err, rows, fields) {
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