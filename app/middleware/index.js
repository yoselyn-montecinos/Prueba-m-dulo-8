// Importamos el módulo 'verifySingUp' desde el archivo 'verifySingUp.js' en la misma carpeta
const verifySingUp = require('./verifySingUp');
// Importamos el módulo 'verifyToken' desde el archivo 'auth.js' en la misma carpeta
const verifyToken = require('./auth');

// Exportamos un objeto que contiene los módulos 'verifySingUp' y 'verifyToken'
module.exports = {
    verifySingUp, // Middleware para verificar registros (presumiblemente)
    verifyToken   // Middleware para verificar tokens JWT
};