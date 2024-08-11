import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/routes'; // Asegúrate de que la ruta sea correcta

const app = express();

app.use(bodyParser.json()); // Para manejar JSON en el cuerpo de la solicitud
app.use('/api', router); // Usar el archivo de rutas

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
