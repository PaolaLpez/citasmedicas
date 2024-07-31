const express = require('express');
const path = require('path');
const app = express();

// Configura el middleware para servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// Configura las rutas del backend
const citasRoutes = require('./routes/citasRoutes');
app.use('/api', citasRoutes);

// Maneja cualquier otra solicitud (sirve el frontend para todas las demás rutas)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
