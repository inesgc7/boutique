var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var opciones = ['INICIO', 'CLIENTES', 'PROVEEDORES'];

const c = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'asd123',
  database : 'boutique'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  c.query('SELECT * FROM prendas', async function(err, rows, fields) {
    if (err) {throw err};
    var prendas = [];
    await function selPrendas (){
      for (let i=0; i < rows.length; i++) {
        prendas.push(rows[i]);
      }
    };
  });
  res.status(200).send({prendas});
  next.render('index', {
  title: 'Express',
  options: opciones,
  session: true
  });
});

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