import mysql from 'promise-mysql';
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // Cambia estos valores según tu configuración
    password: 'password', // Cambia estos valores según tu configuración
    database: 'citasmedicas', // Asegúrate de usar el nombre correcto de tu base de datos
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;

