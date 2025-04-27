const express = require('express');
const router = express.Router();

// Ruta para mostrar el index
router.get('/index', (req, res) => {
  res.render('index');  // busca el archivo views/index.ejs
});

module.exports = router;
