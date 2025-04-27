const mysql = require('mysql2/promise');

// Crear el pool de conexiones a la base de datos 'terminal_buses'
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',        // Cambia esto si usas un usuario distinto
  password: '',        // Coloca tu contraseña de MySQL si la tienes
  database: 'terminal_buses'  // Nombre de la base de datos
});

// Función para probar la conexión
async function testConnection() {
  try {
    const connection = await pool.getConnection();  // Obtener la conexión
    console.log('Conexión exitosa');
    connection.release();  // Liberar la conexión cuando termine
  } catch (error) {
    console.error('Error al conectar:', error);
  }
}

// Llamar a la función para probar la conexión
testConnection();

module.exports = pool;
