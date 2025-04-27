const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Ruta para obtener todos los pasajeros
router.get('/', async (req, res) => {
  try {
    const [pasajeros] = await db.query('SELECT * FROM pasajeros');
    res.render('pasajeros/index', { pasajeros: pasajeros });
  } catch (error) {
    console.error('Error al obtener los pasajeros:', error);
    res.status(500).send('Hubo un error al obtener los pasajeros');
  }
});

// Ruta para mostrar el formulario de creación de un pasajero
router.get('/create', (req, res) => {
  res.render('pasajeros/create');
});

// Ruta para manejar el formulario y registrar un nuevo pasajero
// Ruta para manejar el formulario y registrar un nuevo pasajero
router.post('/create', async (req, res) => {
  const { nombre, dni } = req.body;

  // Validación del nombre (solo letras)
  if (!/^[a-zA-Z\s]+$/.test(nombre)) {
    return res.status(400).send('El nombre solo puede contener letras.');
  }

  // Validación del DNI (exactamente 8 dígitos)
  if (!/^\d{8}$/.test(dni)) {
    return res.status(400).send('El DNI debe tener exactamente 8 dígitos numéricos.');
  }

  try {
    await db.query('INSERT INTO pasajeros (nombre, dni) VALUES (?, ?)', [nombre, dni]);
    res.redirect('/pasajeros');
  } catch (error) {
    console.error('Error al registrar el pasajero:', error);
    res.status(500).send('Hubo un error al registrar el pasajero');
  }
});


// Ruta para mostrar el formulario de edición de un pasajero
router.get('/editar/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [pasajero] = await db.query('SELECT * FROM pasajeros WHERE id_pasajero = ?', [id]);
    res.render('pasajeros/editar', { pasajero: pasajero[0] });
  } catch (error) {
    console.error('Error al obtener el pasajero:', error);
    res.status(500).send('Hubo un error al obtener el pasajero');
  }
});

// Ruta para manejar la actualización del pasajero
// Ruta para manejar la actualización del pasajero
// Ruta para manejar la actualización del pasajero
router.post('/editar/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, dni } = req.body;

  // Validación del nombre (solo letras)
  if (!/^[a-zA-Z\s]+$/.test(nombre)) {
    return res.status(400).send('El nombre solo puede contener letras.');
  }

  // Validación del DNI (exactamente 8 dígitos)
  if (!/^\d{8}$/.test(dni)) {
    return res.status(400).send('El DNI debe tener exactamente 8 dígitos numéricos.');
  }

  try {
    await db.query('UPDATE pasajeros SET nombre = ?, dni = ? WHERE id_pasajero = ?', [nombre, dni, id]);
    res.redirect('/pasajeros');
  } catch (error) {
    console.error('Error al actualizar el pasajero:', error);
    res.status(500).send('Hubo un error al actualizar el pasajero');
  }
});



// Ruta para eliminar un pasajero
router.post('/eliminar/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM pasajeros WHERE id_pasajero = ?', [id]);
    res.status(200).send();  // Respuesta de éxito
  } catch (error) {
    console.error('Error al eliminar el pasajero:', error);
    res.status(500).send('Hubo un error al eliminar el pasajero');
  }
});




module.exports = router;
