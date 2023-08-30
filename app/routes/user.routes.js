// Importamos la librería 'express' para trabajar con rutas
const express = require('express');
// Creamos una instancia del enrutador de Express
const router = express.Router();
// Importamos las funciones controladoras para las operaciones en usuarios desde 'user.controller.js'
const {
    findUserById,
    findAllUsers,
    updateUserById,
    deleteUserById
} = require('../controllers/user.controller');

// Importamos el middleware 'verifyToken' desde 'middleware.js'
const { verifyToken } = require('../middleware');

// Definimos rutas y acciones asociadas a ellas

// Aplicamos el middleware 'verifyToken' a todas las rutas para agregar seguridad
router.use('/api/user', verifyToken);

// Ruta para obtener todos los usuarios
router.get('/', findAllUsers);

// Ruta para obtener un usuario por su ID
router.get('/:id', findUserById);

// Ruta para actualizar un usuario por su ID
router.put('/:id', updateUserById);

// Ruta para eliminar un usuario por su ID
router.delete('/:id', deleteUserById);

// Exportamos el enrutador para que pueda ser utilizado en otros archivos
module.exports = router;