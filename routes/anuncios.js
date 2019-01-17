'use strict';

const router = require('express').Router();
const fs = require('fs');
const Anuncio = require('mongoose').model('Anuncio');

/* GET anuncios page. */
router.get('/', async function (req, res, next) {
  try {
    const start = parseInt(req.query.start) || 0;
    const limit = parseInt(req.query.limit) || 1000; // nuestro api devuelve max 1000 registros
    const pagina = parseInt(req.query.pagina) || 1; // primera pagina
    const sort = req.query.sort || '_id';
    const doPaginacion = parseInt(req.query.dopag) || 1;
    const filters = {};
    if (req.query.tag) {
      filters.tags = req.query.tag;
    }
    if (req.query.venta) {
      filters.venta = req.query.venta;
    }

    const {total, rows, current, pages} = await Anuncio.list(filters, start, limit, sort, doPaginacion, pagina);
    res.render('anuncios', { total, anuncios: rows, current, pages });
  } catch(err) { return res.next(err); }
});

module.exports = router;
