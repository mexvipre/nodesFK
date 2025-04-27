const express = require('express');
const router = express.Router();

// Ruta para los buses
router.get('/', (req, res) => {
  res.render('buses/index'); // Asegúrate de que la vista esté en views/buses/index.ejs
});

module.exports = router;
