// Importamos la clase Sequelize desde el módulo 'sequelize'
const { Sequelize } = require('sequelize');
// Importamos el módulo 'dotenv' para cargar variables de entorno desde el archivo '.env'
require('dotenv').config();

// Creamos una nueva instancia de Sequelize con la configuración de conexión a la base de datos
const sequelize = new Sequelize(
    process.env.PG_DATABASE,       // Nombre de la base de datos
    process.env.PG_USER,           // Usuario de la base de datos
    process.env.PG_PASSWORD,       // Contraseña del usuario de la base de datos
    {
        host: process.env.PG_HOST,     // Host de la base de datos
        port: process.env.PG_PORT,     // Puerto de la base de datos
        dialect: 'postgres',           // Dialecto de la base de datos (en este caso, PostgreSQL)
        pool: {
            max: Number(process.env.PG_MAX),                        // Número máximo de conexiones en el pool
            min: 0,                                                 // Número mínimo de conexiones en el pool
            acquire: Number(process.env.PG_CONNECTIONTIMEOUTMILLIS), // Tiempo máximo para adquirir una conexión en milisegundos
            idle: Number(process.env.PG_IDLETIMEOUTMILLIS)           // Tiempo máximo de inactividad de una conexión en milisegundos
        },
        define: {
            freezeTableName: true,  // Establecer nombres de tabla en singular
            underscored: true       // Utilizar nombres de columna con formato snake_case
        }
    }
);

// Exportamos la instancia de Sequelize para que pueda ser utilizada en otros archivos
module.exports = sequelize;
