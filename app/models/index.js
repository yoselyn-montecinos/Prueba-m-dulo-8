// Importamos el modelo 'User' desde el archivo 'user.model.js' en la misma carpeta
const User = require('./user.model');
// Importamos el modelo 'Bootcamp' desde el archivo 'bootcamp.model.js' en la misma carpeta
const Bootcamp = require('./bootcamp.model');

// Definimos las relaciones entre los modelos utilizando el método 'belongsToMany'
// Establecemos que un usuario puede pertenecer a varios bootcamps y viceversa



// Relación de 'Bootcamp' a 'User'
Bootcamp.belongsToMany(User, {
    through: 'user_bootcamp', // Tabla intermedia que almacena la relación
    as: 'user', // Nombre del alias para la relación en el modelo 'Bootcamp'
    foreignKey: 'bootcamp_id' // Clave foránea en la tabla intermedia que hace referencia al bootcamp
});

// Relación de 'User' a 'Bootcamp'
User.belongsToMany(Bootcamp, {
    through: 'user_bootcamp', // Tabla intermedia que almacena la relación
    as: 'bootcamp', // Nombre del alias para la relación en el modelo 'User'
    foreignKey: 'user_id' // Clave foránea en la tabla intermedia que hace referencia al usuario
});


// Exportamos los modelos 'User' y 'Bootcamp' junto con sus relaciones definidas
module.exports = {
    User,
    Bootcamp
};
