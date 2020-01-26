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


// Ruta para la vista 'inicio'
router.get('/', (req, res)=> {
  conn.query('SELECT * FROM index_view',
    (err, rows, fields) => {
      if (err) throw err;
      var prendas = rows;
      res.status(200).send({
        prendas
      });
    }
  );
});


//Ruta para la vista 'proveedores'
router.get('/proveedores', function(req, res){
  conn.query('SELECT * FROM proveedores', function(err, rows, fields) {
    if (err) throw err;
    var proveedores = [];
    for (let i=0; i< rows.length; i++) {
      proveedores.push(rows[i]);
    }
    res.status(200).send({
      proveedores
    })
  })
});


// Ruta para la vista 'clientes'
router.get('/clientes', function(req, res) {
  conn.query('SELECT * FROM clientes', function(err, rows, fields) {
    if (err) throw err;
    var clientes = [];
    for (let i=0; i < rows.length; i++) {
      clientes.push(rows[i]);
    }
    res.status(200).send({
      clientes
    })
  });
});


// Ruta para pop-up categorías
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

// Ruta para la vista 'Ventas'
router.get('/ventas', function(req, res) {
  conn.query('SELECT * FROM sales_view', function(err, rows, fields) {
    if (err) throw err;
    var ventas = [];
    for (let i=0; i < rows.length; i++) {
      ventas.push(rows[i]);
    }
    res.status(200).send({
      ventas
    })
  });
});

// Ruta para la vista 'Compras'
router.get('/compras', function(req, res) {
  conn.query('SELECT * FROM compras_view', function(err, rows, fields) {
    if (err) throw err;
    var compras = [];
    for (let i=0; i < rows.length; i++) {
      compras.push(rows[i]);
    }
    res.status(200).send({
      compras
    })
  });
});


// Ruta para la vista 'Factura de venta'
router.get('/fVenta/:nFact', function(req, res) {
  conn.query(`SELECT * FROM boutique.sales_view WHERE n_factura=${req.params.nFact}`, function(err, rows, fields) {
    if (err) throw err;
    var fact_venta = [];
    for (let i=0; i < rows.length; i++) {
      fact_venta.push(rows[i]);
    }
    res.status(200).send({
      fact_venta
    })
  });
});

// Ruta para la vista 'Factura de compra'
router.get('/fCompra/:nFact', function(req, res) {
  conn.query(`SELECT * FROM boutique.fact_compra_view WHERE n_factura=${req.params.nFact}`, function(err, rows, fields) {
    if (err) throw err;
    var fact_compra = [];
    for (let i=0; i < rows.length; i++) {
      fact_compra.push(rows[i]);
    }
    res.status(200).send({
      fact_compra
    })
  });
});


// Ruta para la vista del modal prenda single
router.get('/prenda/:id', function(req, res) {
  conn.query(`SELECT * FROM boutique.single_prenda_view WHERE id_prenda=${req.params.id}`, function(err, rows, fields){
    if (err) throw err;
    var prenda = [];
    for (let i=0; i < rows.length; i++) {
      prenda.push(rows[i]);
    }
    res.status(200).send(
      prenda
    )
  })
})


module.exports = router;