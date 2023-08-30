// Importamos la librería 'express' para trabajar con rutas
const express = require('express');
// Creamos una instancia del enrutador de Express
const router = express.Router();
// Importamos las funciones controladoras para las operaciones en bootcamps desde 'bootcamp.controller.js'
const {
    createBootcamp,
    findBootcampById,
    findAllBootcamp,
    addUserToBootcamp
} = require('../controllers/bootcamp.controller');

// Importamos el middleware 'verifyToken' desde 'middleware.js'
const { verifyToken } = require('../middleware');

// Definimos rutas y acciones asociadas a ellas

// Ruta para obtener todos los bootcamps
router.get('/', findAllBootcamp);

// Aplicamos el middleware 'verifyToken' a todas las rutas siguientes para agregar seguridad
router.use('/', verifyToken);

// Ruta para crear un nuevo bootcamp
router.post('/', createBootcamp);

// Ruta para obtener un bootcamp por su ID
router.get('/:id', findBootcampById);

// Ruta para agregar un usuario a un bootcamp específico
router.post('/adduser/idbootcamp/:idBootcamp/iduser/:idUser', addUserToBootcamp);

// Exportamos el enrutador para que pueda ser utilizado en otros archivos
module.exports = router;
