const mongoose = require('mongoose');

const alumnoSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  edad: Number,
  curso: String
});

module.exports = mongoose.model('Alumno', alumnoSchema);
