// Importamos el modelo 'User' desde el archivo 'models.js' (presumiblemente) en la carpeta '../models'
const { User } = require('../models');
// Importamos el objeto 'StatusCodes' de la librería 'http-status-codes' para manejar códigos HTTP
const { StatusCodes } = require('http-status-codes');

// Definimos el middleware 'verifySingUp' que será utilizado para verificar los datos de registro
const verifySingUp = async (req, res, next) => {
    try {
        // Obtenemos los valores de entrada del cuerpo de la petición
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;
        
        // Validamos que los campos obligatorios estén presentes en los datos de entrada
        if (!(email && password && firstName && lastName)) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: 'Todos los campos son requeridos' });
            return;
        }
        // Validamos que la longitud del password sea al menos de 8 caracteres
        if (password.length < 8) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: 'El password debe tener mínimo 8 caracteres' });
            return;
        }
        
        // Verificamos si el usuario ya existe en la base de datos
        try {
            // Extraemos el valor de 'email' del cuerpo de la petición
            const { email } = req.body;
            // Buscamos un usuario existente con el mismo correo electrónico en la base de datos
            const oldUser = await User.findOne({
                where: {
                    email
                }
            });
            // Si encontramos un usuario con el mismo correo electrónico
            if (oldUser) {
                console.log(`Se ha encontrado el usuario ${JSON.stringify(oldUser, null, 4)}`);
                res.status(StatusCodes.CONFLICT).json({
                    message: `¡El usuario ${oldUser.email} ya existe!`,
                });
                return;
            }
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
            return;
        }
        
        // Si todas las validaciones pasan, llamamos a 'next()' para permitir que la petición continúe su proceso
        next();
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
        return;
    }
}

// Exportamos la función 'verifySingUp' para que pueda ser utilizada como middleware en otros archivos
module.exports = verifySingUp;
