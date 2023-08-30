// Importamos los modelos 'Bootcamp' y 'User' desde 'models.js' en la carpeta '../models'
const { 
   Bootcamp,
   User 
} = require('../models');
// Importamos la librería 'bcryptjs' para encriptar contraseñas
const bcrypt = require('bcryptjs');

// Función para cargar usuarios de ejemplo en la base de datos
const load_user = async () => {
   console.log('*********CREANDO SEED USER*********');
  
   // Usuario Uno
   let password = 'mateo123456';
   let salt = await bcrypt.genSalt(10);
   let encrypted = await bcrypt.hash(password, salt);
   await User.create({firstName: 'Mateo', lastName: 'Díaz', email: 'mateo.diaz@correo.com', password: encrypted});
   
   // Usuario Dos
   password = 'santiago123456';
   salt = await bcrypt.genSalt(10);
   encrypted = await bcrypt.hash(password, salt);
   await User.create({firstName: 'Santiago', lastName: 'Mejías', email: 'santiago.mejias@correo.com', password: encrypted});
   
   // Usuario Tres
   password = 'lucas123456';
   salt = await bcrypt.genSalt(10);
   encrypted = await bcrypt.hash(password, salt);
   await User.create({firstName: 'Lucas', lastName: 'Rojas', email: 'lucas.rojas@correo.com', password: encrypted});
  
   // Usuario Cuatro
   password = 'facundo123456';
   salt = await bcrypt.genSalt(10);
   encrypted = await bcrypt.hash(password, salt);
   await User.create({firstName: 'Facundo', lastName: 'Fernandez', email: 'facundo.fernandez@correo.com', password: encrypted});
   
   return {message: 'Datos Guardados Correctamente User'};
}

// Función para cargar bootcamps de ejemplo en la base de datos
const load_bootcamp = async () => {
   console.log('*********CREANDO SEED BOOTCAMP*********');
   
   await Bootcamp.create({
       title:'Introduciendo El Bootcamp De React.', 
       cue: 10, 
       description: 'React es la librería más usada en JavaScript para el desarrollo de interfaces.'
   });

   await Bootcamp.create({
       title:'Bootcamp Desarrollo Web Full Stack.', 
       cue: 12, 
       description: 'Crearás aplicaciones web utilizand las tecnologías y lenguajes más actuales y populares como: JavaScript, nodeJS, Angular,MongoDB, ExpressJS.'
   });
   
   await Bootcamp.create({
       title:'Bootcamp Big Data, Inteligencia Artificial & Machine Learning ', 
       cue: 18, 
       description: 'Domina Data Science, y todo el ecosistema de lenguajes herramientas de Big Data, e intégralos con modelos avanzados'
   });

   return {message: 'Datos Guardados Correctamente Bootcamp'};
}

// Función para cargar relaciones entre usuarios y bootcamps de ejemplo en la base de datos
const load_bootcampAddUser = async () => {
   console.log('*********CREANDO SEED BOOTCAMP ADD USER*********');

   let bootcamp = await Bootcamp.findByPk(1);
   let user = await User.findByPk(1);
   await bootcamp.addUser(user);
   user = await User.findByPk(2);
   await bootcamp.addUser(user);

   bootcamp = await Bootcamp.findByPk(2);
   user = await User.findByPk(1);
   await bootcamp.addUser(user);

   bootcamp = await Bootcamp.findByPk(3);
   user = await User.findByPk(1);
   await bootcamp.addUser(user);
   user = await User.findByPk(2);
   await bootcamp.addUser(user);
   user = await User.findByPk(3);
   await bootcamp.addUser(user);

   return {message: 'Datos Guardados Correctamente User'};
}

// Función que carga todos los datos de ejemplo en la base de datos
const load_data = async () => {
   console.log(await load_user());
   console.log(await load_bootcamp());
   console.log(await load_bootcampAddUser());
}

// Exportamos la función 'load_data' para que pueda ser utilizada en otros archivos
module.exports = { load_data };
