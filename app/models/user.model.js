// Importamos el objeto 'DataTypes' desde 'sequelize' para definir tipos de datos en el modelo
const { DataTypes } = require('sequelize');
// Importamos la instancia 'sequelize' desde 'db.config' para definir el modelo en la base de datos
const sequelize = require('../config/db.config');

// Definimos el modelo 'User' utilizando la instancia 'sequelize.define'
const User = sequelize.define('user', {
    id: {
        autoIncrement: true, // El valor del ID se incrementa automáticamente
        type: DataTypes.INTEGER, // Tipo de dato INTEGER para el ID
        allowNull: false, // No se permite el valor nulo
        primaryKey: true // Indicamos que es la clave primaria
    },
    firstName: {
        type: DataTypes.STRING(200), // Tipo de dato STRING con límite de 200 caracteres
        allowNull: false, // No se permite el valor nulo
        validate: {
            notNull: {
                msg: 'El primer nombre es requerido' // Mensaje de error si no se proporciona el primer nombre
            },
            notEmpty: {
                msg: 'Debe ingresar un primer nombre' // Mensaje de error si el primer nombre está vacío
            }
        }
    },
    lastName: {
        type: DataTypes.STRING(200), // Tipo de dato STRING con límite de 200 caracteres
        allowNull: false, // No se permite el valor nulo
        validate: {
            notNull: {
                msg: 'El apellido es requerido' // Mensaje de error si no se proporciona el apellido
            },
            notEmpty: {
                msg: 'Debe ingresar un apellido' // Mensaje de error si el apellido está vacío
            }
        }
    },
    email: {
        type: DataTypes.STRING(100), // Tipo de dato STRING con límite de 100 caracteres
        allowNull: false, // No se permite el valor nulo
        unique: "users_email_key", // Indicamos que el email debe ser único
        validate: {
            isEmail: {
                msg: 'El email no cumple con el formato requerido (ejemplo@gmail.com)' // Mensaje de error si el email no tiene el formato adecuado
            },
            notNull: {
                msg: 'El email es requerido' // Mensaje de error si no se proporciona el email
            },
            notEmpty: {
                msg: 'Debe ingresar un email' // Mensaje de error si el email está vacío
            }
        }
    },
    password: {
        type: DataTypes.STRING, // Tipo de dato STRING para la contraseña
        allowNull: false, // No se permite el valor nulo
        validate: {
            min: {
                args: [8], // Requerimos un mínimo de 8 caracteres para la contraseña
                msg: 'Se requiere un mínimo de 8 caracteres para la contraseña' // Mensaje de error si la contraseña es demasiado corta
            },
            notNull: {
                msg: 'La contraseña es requerida' // Mensaje de error si no se proporciona la contraseña
            },
            notEmpty: {
                msg: 'Debe ingresar una contraseña' // Mensaje de error si la contraseña está vacía
            }
        }
    }
});

// Exportamos el modelo 'User' para que pueda ser utilizado en otros archivos
module.exports = User;
