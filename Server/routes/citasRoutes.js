const express = require('express');
const router = express.Router();
const citasController = require('../controllers/citasController');

// Ruta para obtener todas las citas
router.get('/citas', citasController.getAllCitas);

// Ruta para obtener una cita por ID
router.get('/citas/:id', citasController.getCitaById);

// Ruta para crear una nueva cita
router.post('/citas', citasController.createCita);

// Ruta para actualizar una cita
router.put('/citas/:id', citasController.updateCita);

// Ruta para eliminar una cita
router.delete('/citas/:id', citasController.deleteCita);

module.exports = router;
