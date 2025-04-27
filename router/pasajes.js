const express = require('express');
const router = express.Router();

// Ruta para los pasajes (renderiza la vista index.ejs)
router.get('/', (req, res) => {
  res.render('pasajes/index');  // Esto renderiza "views/pasajes/index.ejs"
});

module.exports = router;
