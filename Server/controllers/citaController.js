const db = require('../db'); // Asegúrate de tener configurada tu conexión a la base de datos

// Obtener todas las citas
exports.getAllCitas = (req, res) => {
    db.query('SELECT * FROM CITA', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Obtener una cita por ID
exports.getCitaById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM CITA WHERE id_cita = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results[0]);
    });
};

// Crear una nueva cita
exports.createCita = (req, res) => {
    const { id_paciente, id_doctor, fecha, hora, estado } = req.body;
    db.query('INSERT INTO CITA (id_paciente, id_doctor, fecha, hora, estado) VALUES (?, ?, ?, ?, ?)', 
    [id_paciente, id_doctor, fecha, hora, estado], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id_cita: results.insertId });
    });
};

// Actualizar una cita
exports.updateCita = (req, res) => {
    const { id } = req.params;
    const { id_paciente, id_doctor, fecha, hora, estado } = req.body;
    db.query('UPDATE CITA SET id_paciente = ?, id_doctor = ?, fecha = ?, hora = ?, estado = ? WHERE id_cita = ?', 
    [id_paciente, id_doctor, fecha, hora, estado, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Cita actualizada' });
    });
};

// Eliminar una cita
exports.deleteCita = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM CITA WHERE id_cita = ?', [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Cita eliminada' });
    });
};
