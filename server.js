// Importamos la librería 'express'
const express = require('express');
// Creamos una instancia de la aplicación Express
const app = express();
// Importamos el módulo 'dotenv' para cargar variables de entorno desde el archivo '.env'
require('dotenv').config();
// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT;
// Importamos el objeto 'StatusCodes' de la librería 'http-status-codes' para manejar códigos HTTP
const { StatusCodes } = require('http-status-codes');
// Importamos el modelo 'User' desde el archivo 'user.model'
const { User } = require('./app/models');
// Importamos la librería 'bcryptjs' para manejar la encriptación de contraseñas
const bcrypt = require('bcryptjs');
// Importamos la librería 'jsonwebtoken' para manejar la autenticación con tokens
const jwt = require('jsonwebtoken');
const util = require('util');
const sign = util.promisify(jwt.sign);
// Importamos las rutas de usuarios y bootcamps
const userRoutes = require('./app/routes/user.routes');
const bootcampRoutes = require('./app/routes/bootcamp.routes');

// Importamos el middleware 'verifySingUp'
const { 
    verifySingUp 
} = require('./app/middleware');

// Middleware para parsear el cuerpo de las peticiones a formato JSON
app.use(express.json());
// Middleware para parsear el cuerpo de las peticiones codificadas en url
app.use(express.urlencoded({ extended: true }));

// Rutas para usuarios y bootcamps
app.use('/api/user', userRoutes);
app.use('/api/bootcamp', bootcampRoutes);

// Ruta raíz para verificar que el servidor está en línea
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Ruta para el registro de usuarios
app.post('/api/signup', verifySingUp, async (req, res) => {
    // Lógica del registro
    try {
        // Obtenemos los valores de entrada del cuerpo de la petición
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;

        // Generamos un salt aleatoriamente y encriptamos la contraseña
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        // Creamos un nuevo usuario en la base de datos
        const user = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        // Generamos un token para el usuario
        const token = await sign(
          {
              userId: user.id,
              email
          },
          process.env.TOKEN_KEY,
          {
              expiresIn: "10m",
          }
        );

        // Retornamos el nuevo usuario y el token
        res.status(StatusCodes.CREATED).json({
            user,
            token
        });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

// Ruta para el inicio de sesión
app.post('/api/signin', async (req, res) => {
    // Lógica del inicio de sesión
    try {
        const {
            email,
            password
        } = req.body;

        // Validar los datos de entrada
        if (!(email && password)) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: 'Todos los datos son requeridos, email y password' });
            return;
        }

        // Buscamos al usuario en la base de datos por su correo electrónico
        const user = await User.findOne({
            where: {
                email
            }
        });

        // Comparamos la contraseña ingresada con la almacenada
        if (user && (await bcrypt.compare(password, user.password))) {
            // Generamos un token para el usuario
            const token = await sign(
                {
                    userId: user.id,
                    email
                },
                process.env.TOKEN_KEY, 
                {
                    expiresIn: "10m",
                }
            );

            // Retornamos el token y un mensaje de autenticación exitosa
            res.json({
                token,
                message: 'Autenticado'
            });
            return;
        }

        // En caso de credenciales inválidas
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Credenciales inválidas'});
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

// Capturar solicitudes para rutas no definidas
app.all('*', (req, res) => {
  res.status(StatusCodes.NOT_FOUND).send("Ruta desconocida.");
});

// Iniciamos el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
