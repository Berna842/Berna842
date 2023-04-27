//bgaefhc1GE@#k3r --> Buildteam


const deadpool = {
  nombre: 'Wade',
  apellido: 'Winston',
  poder: 'Regeneración',
  getNombre(){
    return `${ this.nombre } ${this.apellido} ${this.poder}`;
  }
}

console.log(deadpool.getNombre());

/*
En caso de que no se use la reestructurción, para poder obtener las propiedades de forma
individual se tendría que realizar de la siguiente forma:
*/

//const nombre = deadool.nombre;
//const appelido = deadool.apellido;
//const poder = deadool.poder;

/*
Sin embargo gracias a la Desestructuracion de objetos se puede realizar de la siguiente
manera:
*/

//const { nombre, apellido, poder, edad } = deadool; //Adicional de extraer propiedades de los
              //Objetos tambien se pueden agregar nuevas propiedades en caso de ser requeridas

//console.log(nombre, appelido, poder);

function imprimeHeroe( { nombre, apellido, poder, edad = 0 } ) {
  //const { nombre, apellido, poder, edad } = heroe;
  console.log(nombre, apellido, poder);
}

imprimeHeroe( deadpool );

/*Tambien es posible desestructurar un arreglo, para poder definirlo, en lugar de ponerle
{}, se le podra []
*/

const heroes = ['Flash', 'Superman', 'Batman'];

const [h1, h2, h3] = heroes;

console.log(h1,h2,h3);

//En caso de que solo se requiera un dolo elemento del arreglo, en la desestructuracion se
// debe de respetar los espacios

const [,, h_3] = heroes;

console.log(h_3);
