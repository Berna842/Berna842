
const { crearArchivo } = require('./helpers/multiplicar.js');
const argv = require('yargs').argv; //permite el manejo de los argumentos de consola

//const base = 5;

/*crearArchivo( base )
  .then(nombreArchivo => console.log(nombreArchivo, 'creado'))
  .catch(err => console.log(err));
*/

console.clear();
console.log(process.argv);
console.log(argv);

//console.log(process.argv);

//const [ , , arg3 = 'base=5'] = process.argv;

//const [,  base] = arg3.split('=');

//crearArchivo( base )
//  .then(nombreArchivo => console.log(nombreArchivo, 'creado'))
//  .catch(err => console.log(err));
