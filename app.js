const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Rutas
const busesRouter = require('./router/buses');
const pasajerosRouter = require('./router/pasajeros');
const pasajesRouter = require('./router/pasajes');

// Middleware (canal de comunicación)
const app = express();

// Usar bodyParser para manejar datos POST
app.use(bodyParser.urlencoded({ extended: true })); // Para procesar datos URL-encoded (formularios)
app.use(bodyParser.json()); // Para procesar el cuerpo de las solicitudes JSON

// Servir archivos estáticos (por ejemplo, imágenes, CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Motor de plantilla
app.set('view engine', 'ejs'); // Define el tipo/ nombre del motor de plantillas
app.set('views', path.join(__dirname, 'views')); // Define el directorio de vistas

// Usar las rutas definidas
app.use('/buses', busesRouter); // Ruta para los buses
app.use('/pasajeros', pasajerosRouter); // Ruta para los pasajeros
app.use('/pasajes', pasajesRouter); // Ruta para los pasajes

// Redirigir la ruta principal al listado de pasajeros
app.get('/', (req, res) => {
  res.redirect('/pasajeros'); // Redirige a /pasajeros al acceder a la raíz
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});
