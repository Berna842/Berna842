console.log('Inicio de programa');

setTimeout( ()=> {
  console.log('Primer Timeout');
}, 3000 ); //La ejecución del tiempo si es sincrono, pero como el callback de la función no
          //es bloqueante, es por esto que se ejecuta de forma asincrona.

//Sin embargo las funciones callback entran a un stack de procedimientos, donde se ejecutan
setTimeout( ()=> {
  console.log('Segundo Timeout');
}, 0 );

setTimeout( ()=> {
  console.log('Tercero Timeout');
}, 0 );

console.log('Fin de programa');
