const empleados = [{
    id:1,
    nombre: 'Hola1'
  },{
    id:2,
    nombre: 'Hola2'
  },{
    id:3,
    nombre: 'Hola3'
  }];

const salarios = [{
    id:1,
    salario: 1000
  },{
    id:2,
    salario: 1500
  }];

const id = 4;

const getEmpleado = (id)=>{
  return promesa = new Promise( ( resolve, reject ) => { //el parametro resolve se llama Cuando
      // todo se ejecuta correctamente, mientras que el reject solo se manda llamar cuando falla
      // la ejecución, el rejecto puede ser opcional si se sabe que nunca va a fallar
      const empleado = empleados.find( e => e.id === id )?.nombre;
      (empleado)
        ?resolve(empleado)
        :reject(`No existe el empleado con el id ${id}`)
  } );
}

const getSalario = (id)=>{
  return promesa = new Promise( ( resolve, reject ) => { //el parametro resolve se llama Cuando
      // todo se ejecuta correctamente, mientras que el reject solo se manda llamar cuando falla
      // la ejecución, el rejecto puede ser opcional si se sabe que nunca va a fallar
      const salario = salarios.find( s => s.id === id )?.salario;
      (salario)
        ?resolve(salario)
        :reject(`No existe el salario con el id ${id}`)
  } );
}

const getInfoUsuario = async(id) => {
  try {
    const empleado = await getEmpleado(id);
    const salario = await getSalario(id);
    return `El salario del empleado ${ empleado } es de ${salario}`;
  } catch (err) {
    throw err; // No se utiliza un return por que en caso de que el try se ejecute correctamente, el mensaje
              // De error se mandaría como si fuera dentro del try
  }

}

getInfoUsuario(id)
    .then( msg => console.log(msg))
    .catch( err => console.log(err));
