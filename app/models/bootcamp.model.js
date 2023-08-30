// Importamos el objeto 'DataTypes' desde 'sequelize' para definir tipos de datos en el modelo
const { DataTypes } = require('sequelize');
// Importamos la instancia 'sequelize' desde 'db.config' para definir el modelo en la base de datos
const sequelize = require('../config/db.config');

// Definimos el modelo 'Bootcamp' utilizando la instancia 'sequelize.define'
const Bootcamp = sequelize.define('bootcamp', {
    id: {
        autoIncrement: true, // El valor del ID se incrementa automáticamente
        type: DataTypes.INTEGER, // Tipo de dato INTEGER para el ID
        allowNull: false, // No se permite el valor nulo
        primaryKey: true // Indicamos que es la clave primaria
    },
    title: {
        type: DataTypes.STRING(200), // Tipo de dato STRING con límite de 200 caracteres
        allowNull: false, // No se permite el valor nulo
        validate: {
            notNull: {
                msg: 'El Título es requerido' // Mensaje de error si no se proporciona el título
            },
            notEmpty: {
                msg: 'Debe ingresar un Título' // Mensaje de error si el título está vacío
            }
        }
    },
    cue: {
        type: DataTypes.INTEGER, // Tipo de dato INTEGER para el campo 'cue'
        allowNull: false, // No se permite el valor nulo
        validate: {
            min: 0 // Validamos que el valor sea mayor o igual a 0
        }
    },
    description: {
        type: DataTypes.STRING(250), // Tipo de dato STRING con límite de 250 caracteres
        allowNull: false, // No se permite el valor nulo
        validate: {
            notNull: {
                msg: 'La descripción es requerida' // Mensaje de error si no se proporciona la descripción
            },
            notEmpty: {
                msg: 'Debe ingresar una descripción' // Mensaje de error si la descripción está vacía
            }
        }
    },
});

// Exportamos el modelo 'Bootcamp' para que pueda ser utilizado en otros archivos
module.exports = Bootcamp;
