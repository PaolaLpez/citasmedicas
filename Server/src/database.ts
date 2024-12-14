import mysql from 'promise-mysql';
import keys from './keys';


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // Cambia esto si tu usuario es diferente
    password: '', // Cambia esto si tu contraseña es diferente
    database: 'citasmedicas',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;


