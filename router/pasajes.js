const express = require('express');
const router = express.Router();
const db = require('../config/database');  // Asegúrate de que la conexión a la base de datos esté configurada

// Ruta para obtener todos los pasajes
router.get('/', async (req, res) => {
  try {
    const [pasajes] = await db.query('SELECT * FROM pasajes');  // Obtener todos los pasajes de la base de datos
    res.render('pasajes', { pasajes: pasajes });  // Renderizar la vista y pasar los datos de los pasajes
  } catch (error) {
    console.error('Error al obtener los pasajes:', error);
    res.status(500).send('Hubo un error al obtener los pasajes');
  }
});

// Ruta para mostrar el formulario de creación de un pasaje
router.get('/create', (req, res) => {
  res.render('crearPasaje');  // Vista para crear un nuevo pasaje
});

// Ruta para manejar el formulario y registrar un nuevo pasaje
router.post('/create', async (req, res) => {
  const { id_bus, id_pasajero, fecha, precio } = req.body;

  try {
    // Insertar un nuevo pasaje en la base de datos
    await db.query('INSERT INTO pasajes (id_bus, id_pasajero, fecha, precio) VALUES (?, ?, ?, ?)', [id_bus, id_pasajero, fecha, precio]);
    res.redirect('/pasajes');  // Redirigir a la lista de pasajes
  } catch (error) {
    console.error('Error al registrar el pasaje:', error);
    res.status(500).send('Hubo un error al registrar el pasaje');
  }
});

// Ruta para eliminar un pasaje
router.get('/eliminar/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Eliminar un pasaje por su id
    await db.query('DELETE FROM pasajes WHERE id_pasaje = ?', [id]);
    res.redirect('/pasajes');  // Redirigir a la lista de pasajes
  } catch (error) {
    console.error('Error al eliminar el pasaje:', error);
    res.status(500).send('Hubo un error al eliminar el pasaje');
  }
});

module.exports = router;  // Asegúrate de exportar el router
