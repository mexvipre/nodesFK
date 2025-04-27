const express = require('express');
const router = express.Router();

// Definir rutas...
router.get('/', (req, res) => {
  res.send('Ruta para los buses');
});

module.exports = router;  // Asegúrate de exportarlo correctamente
