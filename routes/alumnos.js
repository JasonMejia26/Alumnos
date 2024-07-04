const express = require('express');
const router = express.Router();
const Alumno = require('../models/alumno');

// Index - Listar todos los alumnos
router.get('/', async (req, res) => {
  try {
    const alumnos = await Alumno.find({});
    res.render('index', { alumnos });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// New - Formulario para nuevo alumno
router.get('/new', (req, res) => {
  res.render('new');
});

// Create - Crear un nuevo alumno
router.post('/', async (req, res) => {
  try {
    await Alumno.create(req.body.alumno);
    res.redirect('/alumnos');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Show - Mostrar un alumno
router.get('/:id', async (req, res) => {
  try {
    const alumno = await Alumno.findById(req.params.id);
    if (!alumno) {
      return res.status(404).send('Alumno no encontrado');
    }
    console.log(alumno)
    res.render('show', { alumno });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Edit - Formulario para editar alumno
router.get('/:id/edit', async (req, res) => {
  try {
    const alumno = await Alumno.findById(req.params.id);
    if (!alumno) {
      return res.status(404).send('Alumno no encontrado');
    }
    res.render('edit', { alumno });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update - Actualizar alumno
router.put('/:id', async (req, res) => {
  try {
    await Alumno.findByIdAndUpdate(req.params.id, req.body.alumno);
    res.redirect(`/alumnos/${req.params.id}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete - Eliminar alumno
router.delete('/:id', async (req, res) => {
  try {
    await Alumno.findByIdAndDelete(req.params.id);
    res.redirect('/alumnos');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
