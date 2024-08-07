import mysql from 'promise-mysql';
import keys from './keys';

// Crea un pool de conexiones
const pool = mysql.createPool(keys.database);

// Método para obtener una conexión y verificar la conexión
pool.getConnection().then(connection => {
    pool.releaseConnection(connection);
    console.log('DB is connected');
}).catch(err => {
    console.error('Error connecting to the database:', err);
});

export default pool;

