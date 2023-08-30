// Importamos los modelos 'Bootcamp' y 'User' desde 'models.js' en la carpeta '../models'
const {
    Bootcamp,
    User
} = require('../models');
// Importamos el objeto 'StatusCodes' de la librería 'http-status-codes' para manejar códigos HTTP
const { StatusCodes } = require('http-status-codes');
// Importamos la librería 'bcryptjs' para encriptar contraseñas
const bcrypt = require('bcryptjs');

// Función para obtener todos los usuarios con detalles de bootcamp
const findAllUsers = async (req, res) => {
    try {
        // Buscamos todos los usuarios con detalles de bootcamp asociados
        const allUsers = await User.findAll({
            order: ['id'],
            include: [
                {
                    model: Bootcamp,
                    as: 'bootcamp',
                    attributes: ['id', 'title'],
                    through: {
                        attributes: []
                    }
                }
            ]
        });
        console.log(`Se han encontrado los usuarios ${JSON.stringify(allUsers, null, 4)}`);
        res.json({
            message: `se encontraron ${allUsers.length} usuarios`,
            users: allUsers
        });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

// Función para encontrar un usuario por su ID con detalles de bootcamp
const findUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id, {
            include: [
                {
                    model: Bootcamp,
                    as: 'bootcamp',
                    attributes: ['id', 'title'],
                    through: {
                        attributes: []
                    }
                }
            ]
        });

        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: `usuario id ${id} no fue encontrado`
            });
            return;
        }
        console.log(`Se ha encontrado el usuario ${JSON.stringify(user, null, 4)}`);
        res.json({
            message: `usuario ${user.email} fue encontrado con éxito`,
            user
        });

    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

// Función para actualizar un usuario por su ID
const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.body;
        // Validar los datos de entrada
        if (!(user.email && user.password && user.firstName && user.lastName && id)) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: 'Todos los campos son requeridos' });
            return;
        }
        const userFound = await User.findByPk(id);
        let actualizados = [], actualizado;

        if (userFound) {
            // Generamos aleatoriamente el salt
            const salt = await bcrypt.genSalt(10);
            console.log("Salt generado: " + salt);
            const encryptedPassword = await bcrypt.hash(user.password, salt);
            if ((userFound.firstName !== user.firstName) ||
                (userFound.lastName !== user.lastName) ||
                (userFound.email !== user.email) ||
                (userFound.password !== encryptedPassword)) {
                actualizados = await User.update({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: encryptedPassword
                }, {
                    where: { id }
                });
                actualizado = actualizados[0];
                console.log(`actualizados: ${actualizados}`);
                console.log(`Se ha actualizado el usuario con id ${user.id}`);
            } else {
                actualizado = -1;
            }
        } else {
            actualizado = 0;
        }
        if (!actualizado) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: `proyecto id ${id} no fue encontrado`
            });
            return;
        }
        res.status(StatusCodes.CREATED).json({
            message: `proyecto id ${id} fue actualizado con éxito`
        });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

// Función para eliminar un usuario por su ID
const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const userFound = await User.findByPk(id);
        if (userFound) {
            const userResponse = await User.destroy({
                where: { id }
            });
            if (userResponse) {
                res.status(StatusCodes.CREATED).json({
                    message: `usuario id ${id} fue borrado con éxito`
                });
            } else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    message: `usuario id ${id} NO fue eliminado`
                });
            }
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                message: `usuario id ${id} no fue encontrado`
            });
        }
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

// Exportamos las funciones controladoras para que puedan ser utilizadas en otros archivos
module.exports = {
    findAllUsers,
    findUserById,
    updateUserById,
    deleteUserById
}
