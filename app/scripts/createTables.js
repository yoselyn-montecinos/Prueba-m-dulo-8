// Importamos los modelos 'Bootcamp' y 'User' desde 'models.js' en la carpeta '../models'
const { 
    Bootcamp,
    User 
} = require('../models');
// Importamos la función 'load_data' desde 'loadSeed.js' en la carpeta './loadSeed'
const { load_data } = require('./loadSeed');
// Importamos la instancia 'sequelize' desde 'db.config.js' en la carpeta '../config'
const sequelize = require('../config/db.config');

// Definimos una función asíncrona autoinvocada para crear las tablas en la base de datos
(async () => {
    try {
        // Sincronizamos los modelos con la base de datos, reemplazando las tablas existentes (force: true)
        await sequelize.sync({ force: true });
    } catch (error) {
        console.error(error);
    } finally {
        // Cargamos los datos iniciales utilizando la función 'load_data'
        await load_data();
        // Cerramos la conexión con la base de datos
        await sequelize.close();
    }
})();
