// Importamos los modelos 'Bootcamp' y 'User' desde 'models.js' en la carpeta '../models'
const { 
    Bootcamp,
    User 
} = require('../models');
// Importamos el objeto 'StatusCodes' de la librería 'http-status-codes' para manejar códigos HTTP
const { StatusCodes } = require('http-status-codes');

// Función para crear un nuevo bootcamp
const createBootcamp = async (req, res) => {
    try {
        const bootcamp = req.query;
        if (req.query.title && req.query.cue && req.query.description) {
            const bootcampResponse = await Bootcamp.create({
                title: bootcamp.title,
                cue: bootcamp.cue,
                description: bootcamp.description
            });
            console.log(`Se ha creado el Bootcamp ${JSON.stringify(bootcampResponse, null, 4)}`);
            res.status(StatusCodes.OK).json({
                message: `Bootcamp ${bootcamp.title} fue creado con éxito`,
                bootcamp: bootcampResponse
            });
        } else {
            res.status(StatusCodes.BAD_REQUEST)
            .json({ message: `Query Params de Entrada, Insufucientes (title, cue, description)` });
        }
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

// Función para buscar un bootcamp por su ID
const findBootcampById = async (req, res) => {
    try {
        const id = req.params.id;
        const bootcampResponse = await Bootcamp.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'first_name', 'last_name', 'email'],
                    through: {
                        attributes: []
                    }
                }
            ]
        });
        if (bootcampResponse) {
            console.log(`Se ha encontrado el Bootcamp ${JSON.stringify(bootcampResponse, null, 4)}`);
            res.status(StatusCodes.OK).json(bootcampResponse);
        } else {
            console.log(`No Se ha encontrado el Bootcamp con id ${id}`);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Bootcamp no Encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

// Función para obtener todos los bootcamps
const findAllBootcamp = async (req, res) => {
    try {
        const bootcamps = await Bootcamp.findAll({order: ['id'], include: [
            {
                model: User,
                as: 'user',
                attributes: ['id', 'first_name', 'last_name', 'email'],
                through: {
                    attributes: []
                }
            }
        ]});
        console.log(`Se han encontrado Bootcamps ${JSON.stringify(bootcamps, null, 4)}`);
        res.json(bootcamps);
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

// Función para agregar un usuario a un bootcamp
const addUserToBootcamp = async (req, res) => {
    try {
        const bootcampId = Number(req.params.idBootcamp);
        const userId = Number(req.params.idUser); 
        const bootcamp = await Bootcamp.findByPk(bootcampId);
        if (!bootcamp) {
            console.log(`No se encontró bootcamp con id ${bootcampId}`);
            res.status(StatusCodes.BAD_REQUEST).json({message: 'Bootcamp No encontrado!'});
            return
        }
        const user = await User.findByPk(userId);
        if (!user) {
            console.log(`No se encontró usuario con id ${userId}`);
            res.status(StatusCodes.BAD_REQUEST).json({message: 'Usuario No encontrado!'});
            return
        }
        bootcamp.addUser(user);
        console.log(`Agredado el usuario id ${user.id} al bootcamp con id ${bootcamp.id}`);
        res.status(StatusCodes.CREATED).json({ 
            message: `Se agregó usuario id ${userId} al bootcamp id ${bootcampId}`,
            user,
            bootcamp
        });
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

// Exportamos las funciones controladoras para que puedan ser utilizadas en otros archivos
module.exports = { 
    createBootcamp,
    findBootcampById,
    findAllBootcamp,
    addUserToBootcamp
}
