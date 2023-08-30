// Importamos la librería 'jsonwebtoken' para trabajar con tokens JWT
const jwt = require('jsonwebtoken');
// Importamos el módulo 'util' para poder convertir callbacks en promesas
const util = require('util');
// Utilizamos 'promisify' para convertir la función jwt.verify en una promesa
const verify = util.promisify(jwt.verify);
// Importamos el objeto 'StatusCodes' de la librería 'http-status-codes' para manejar códigos HTTP
const { StatusCodes } = require('http-status-codes');

// Obtenemos la clave secreta para verificar los tokens desde las variables de entorno
const TOKEN_KEY = process.env.TOKEN_KEY;

// Definimos el middleware 'verifyToken' que será utilizado para verificar la autenticidad del token
const verifyToken = async (req, res, next) => {
    let token;
    
    // Verificamos si el token se encuentra en los encabezados de la petición ('Authorization' header)
    if (req.headers["authorization"]) {
        token = (req.headers["authorization"].split(' '))[1];
    } else {
        // Si no se encuentra en los encabezados, buscamos en el cuerpo de la petición o en los parámetros de la URL
        token = req.body.token || req.query.token;
    }
    
    // Si no se encuentra ningún token en ninguna parte
    if (!token) {
        // Respondemos con un código de estado 403 (FORBIDDEN) y un mensaje
        res.status(StatusCodes.FORBIDDEN).json({ message: 'Un token es requerido para la autorización' });
        return;
    }
    
    try {
        // Verificamos el token utilizando la clave secreta y el método .verify
        const decoded = await verify(token, TOKEN_KEY);
        // Si el token es válido, se extraen los datos almacenados en él y los imprimimos en la consola
        console.log('decoded:', decoded);
    } catch (err) {
        // Si ocurre un error en la verificación del token, respondemos con un código de estado 401 (UNAUTHORIZED)
        // y un mensaje indicando que el acceso es denegado
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token no válido, acceso denegado' });
        // También imprimimos el error en la consola
        console.log('error:', err);
        return;
    }
    
    // Si la verificación es exitosa, llamamos a 'next()' para permitir que la petición continúe su proceso
    next();
};

// Exportamos la función 'verifyToken' para que pueda ser utilizada como middleware en otros archivos
module.exports = verifyToken;
