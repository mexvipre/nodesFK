const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Ruta para obtener todos los pasajes
// Ruta para obtener todos los pasajes
router.get('/', async (req, res) => {
  try {
    const [pasajes] = await db.query(`
      SELECT pasajes.id_pasaje, pasajeros.nombre, buses.placa, pasajes.fecha_viaje, pasajes.asiento
      FROM pasajes
      JOIN pasajeros ON pasajes.id_pasajero = pasajeros.id_pasajero
      JOIN buses ON pasajes.id_bus = buses.id_bus
      ORDER BY pasajes.id_pasaje ASC  -- Ordena los pasajes por ID en orden ascendente
    `);
    res.render('pasajes/index', { pasajes });
  } catch (error) {
    console.error('Error al obtener los pasajes:', error);
    res.status(500).send('Hubo un error al obtener los pasajes');
  }
});


// Ruta para mostrar el formulario de creación de un nuevo pasaje
router.get('/create', async (req, res) => {
  try {
    const [pasajeros] = await db.query('SELECT * FROM pasajeros');
    const [buses] = await db.query('SELECT * FROM buses');
    res.render('pasajes/create', { pasajeros, buses });  // Pasar los pasajeros y buses a la vista
  } catch (error) {
    console.error('Error al obtener los datos para crear un pasaje:', error);
    res.status(500).send('Hubo un error al obtener los datos');
  }
});

// Ruta para crear un nuevo pasaje
// Ruta para crear un nuevo pasaje
router.post('/create', async (req, res) => {
  const { id_pasajero, id_bus, fecha_viaje, asiento } = req.body;

  try {
    // Validar que el asiento no esté ocupado
    const [asientoOcupado] = await db.query(
      'SELECT id_pasaje FROM pasajes WHERE id_bus = ? AND asiento = ?',
      [id_bus, asiento]
    );

    if (asientoOcupado.length > 0) {
      // Si el asiento ya está ocupado, devolver un error
      return res.status(400).send('El asiento ya está ocupado. Por favor, seleccione otro.');
    }

    // Insertar el nuevo pasaje
    await db.query(
      'INSERT INTO pasajes (id_pasajero, id_bus, fecha_viaje, asiento) VALUES (?, ?, ?, ?)',
      [id_pasajero, id_bus, fecha_viaje, asiento]
    );
    
    res.redirect('/pasajes');  // Redirigir a la lista de pasajes
  } catch (error) {
    console.error('Error al crear el pasaje:', error);
    res.status(500).send('Hubo un error al crear el pasaje');
  }
});


// Ruta para mostrar el formulario de edición de un pasaje
router.get('/editar/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [pasaje] = await db.query('SELECT * FROM pasajes WHERE id_pasaje = ?', [id]);
    const [pasajeros] = await db.query('SELECT * FROM pasajeros');
    const [buses] = await db.query('SELECT * FROM buses');
    res.render('pasajes/editar', { pasaje: pasaje[0], pasajeros, buses });  // Pasar los datos a la vista
  } catch (error) {
    console.error('Error al obtener el pasaje:', error);
    res.status(500).send('Hubo un error al obtener el pasaje');
  }
});

// Ruta para actualizar un pasaje
// Ruta para actualizar un pasaje
router.post('/editar/:id', async (req, res) => {
  const { id } = req.params;
  const { id_pasajero, id_bus, fecha_viaje, asiento } = req.body;

  try {
    // Verificar si el asiento está ocupado en el bus seleccionado
    const [asientoOcupado] = await db.query(
      'SELECT id_pasaje FROM pasajes WHERE id_bus = ? AND asiento = ? AND id_pasaje != ?',
      [id_bus, asiento, id]
    );

    if (asientoOcupado.length > 0) {
      // Si el asiento está ocupado, devolver un error
      return res.status(400).send('El asiento ya está ocupado. Por favor, seleccione otro.');
    }

    // Actualizar el pasaje
    await db.query(
      'UPDATE pasajes SET id_pasajero = ?, id_bus = ?, fecha_viaje = ?, asiento = ? WHERE id_pasaje = ?',
      [id_pasajero, id_bus, fecha_viaje, asiento, id]
    );
    
    // Redirigir a la lista de pasajes
    res.redirect('/pasajes');  
  } catch (error) {
    console.error('Error al actualizar el pasaje:', error);
    res.status(500).send('Hubo un error al actualizar el pasaje');
  }
});


// Ruta para eliminar un pasaje
router.post('/eliminar/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Ejecuta una consulta DELETE directamente
    const [result] = await db.query('DELETE FROM pasajes WHERE id_pasaje = ?', [id]);

    // Verificar si la consulta se ejecutó correctamente
    if (result.affectedRows > 0) {
      res.status(200).send();  // Respuesta de éxito
    } else {
      res.status(404).send('No se encontró el pasaje para eliminar');
    }
  } catch (error) {
    console.error('Error al eliminar el pasaje:', error);
    res.status(500).send('Hubo un error al eliminar el pasaje');
  }
});





// Ruta para obtener los asientos disponibles para un bus
router.get('/asientos/:id_bus', async (req, res) => {
  const { id_bus } = req.params;

  try {
    const [asientosDisponibles] = await db.query(`
      SELECT num_asiento
      FROM (
          SELECT 1 AS num_asiento UNION
          SELECT 2 UNION
          SELECT 3 UNION
          SELECT 4 UNION
          SELECT 5 UNION
          SELECT 6 UNION
          SELECT 7 UNION
          SELECT 8 UNION
          SELECT 9 UNION
          SELECT 10 UNION
          SELECT 11 UNION
          SELECT 12 UNION
          SELECT 13 UNION
          SELECT 14 UNION
          SELECT 15 UNION
          SELECT 16 UNION
          SELECT 17 UNION
          SELECT 18 UNION
          SELECT 19 UNION
          SELECT 20 UNION
          SELECT 21 UNION
          SELECT 22 UNION
          SELECT 23 UNION
          SELECT 24 UNION
          SELECT 25 UNION
          SELECT 26 UNION
          SELECT 27 UNION
          SELECT 28 UNION
          SELECT 29 UNION
          SELECT 30
      ) AS asientos_disponibles
      WHERE num_asiento <= (SELECT cantidad_asientos FROM buses WHERE id_bus = ?) 
      AND num_asiento NOT IN (
          SELECT asiento FROM pasajes WHERE id_bus = ?
      )
    `, [id_bus, id_bus]);

    res.json(asientosDisponibles);  // Devuelve los asientos disponibles en formato JSON
  } catch (error) {
    console.error('Error al obtener los asientos disponibles:', error);
    res.status(500).send('Hubo un error al obtener los asientos disponibles');
  }
});


module.exports = router;
