import mysql from 'promise-mysql';
import keys from './keys';

const pool = mysql.createPool(keys.database);

pool.getConnection().then(connection => {
  console.log('DB is connected');
  pool.releaseConnection(connection);
});

export default pool;
