var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'asd123',
  database : 'boutique' 
});

var opciones = ['INICIO', 'CLIENTES', 'PROVEEDORES']


/* GET home page. */
router.get('/', async function(req, res) {
  res.render('index', {
    title: 'Express',
    options: opciones,
    session: true
  });
  connection.query('SELECT * FROM categorias', await function(err, rows, fields) {
    if (err) throw err;
      var lista = [];
      for (let i=0; i < rows.length; i++) {
         lista.push(rows[i].categoria);
      }
  });
});


module.exports = router;
