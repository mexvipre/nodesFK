const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Ruta para obtener todos los buses
router.get('/', async (req, res) => {
  try {
    const [buses] = await db.query('SELECT * FROM buses');
    res.render('buses/index', { buses: buses });  // Asegúrate de que 'buses' esté siendo pasado correctamente a la vista
  } catch (error) {
    console.error('Error al obtener los buses:', error);
    res.status(500).send('Hubo un error al obtener los buses');
  }
});

// Ruta para mostrar el formulario de creación de un bus
router.get('/create', (req, res) => {
  res.render('buses/create');  // Renderiza la vista create.ejs (asegúrate de que exista)
});

// Ruta para manejar el formulario y registrar un nuevo bus
router.post('/create', async (req, res) => {
    const { placa, ruta, cantidad_asientos } = req.body;
  
    // Validación de la placa (ejemplo de validación, personaliza según lo que necesites)
    if (!/^[A-Za-z0-9-]+$/.test(placa)) {
      return res.status(400).send('La placa solo puede contener letras, números y guiones.');
    }
  
    // Validación de la cantidad de asientos (debe estar entre 20 y 30)
    if (cantidad_asientos < 20 || cantidad_asientos > 30) {
      return res.status(400).send('La cantidad de asientos debe ser un número entre 20 y 30.');
    }
  
    try {
      // Inserción de los datos en la base de datos
      await db.query('INSERT INTO buses (placa, ruta, cantidad_asientos) VALUES (?, ?, ?)', [placa, ruta, cantidad_asientos]);
      res.redirect('/buses');
    } catch (error) {
      console.error('Error al registrar el bus:', error);
      res.status(500).send('Hubo un error al registrar el bus');
    }
  });
  
// Ruta para mostrar el formulario de edición de un bus
router.get('/editar/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [bus] = await db.query('SELECT * FROM buses WHERE id_bus = ?', [id]);
    res.render('buses/editar', { bus: bus[0] });
  } catch (error) {
    console.error('Error al obtener el bus:', error);
    res.status(500).send('Hubo un error al obtener el bus');
  }
});

// Ruta para manejar la actualización de un bus
// Ruta para manejar la actualización de un bus
router.post('/editar/:id', async (req, res) => {
    const { id } = req.params;
    const { placa, ruta, cantidad_asientos } = req.body;
  
    // Validación de la placa
    if (!/^[A-Za-z0-9-]+$/.test(placa)) {
      return res.status(400).send('La placa solo puede contener letras, números y guiones.');
    }
  
    // Validación de la cantidad de asientos (debe estar entre 20 y 30)
    if (cantidad_asientos < 20 || cantidad_asientos > 30) {
      return res.status(400).send('La cantidad de asientos debe ser un número entre 20 y 30.');
    }
  
    try {
      // Actualización de los datos del bus en la base de datos
      await db.query('UPDATE buses SET placa = ?, ruta = ?, cantidad_asientos = ? WHERE id_bus = ?', [placa, ruta, cantidad_asientos, id]);
      res.redirect('/buses');
    } catch (error) {
      console.error('Error al actualizar el bus:', error);
      res.status(500).send('Hubo un error al actualizar el bus');
    }
  });
  

// Ruta para eliminar un bus
router.post('/eliminar/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM buses WHERE id_bus = ?', [id]);
    res.status(200).send();  // Respuesta de éxito
  } catch (error) {
    console.error('Error al eliminar el bus:', error);
    res.status(500).send('Hubo un error al eliminar el bus');
  }
});

module.exports = router;
