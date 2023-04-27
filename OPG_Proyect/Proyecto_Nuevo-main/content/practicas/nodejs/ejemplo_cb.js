// Callbacks

const getUsuarioByID = (id, callback) => {
  const usuario = {
    id,
    nombre: 'Bernardo'
  }

  callback(usuario);
}

getUsuarioByID(10, (usuario) => {
  console.log(usuario.id);
  console.log(usuario.nombre.toUpperCase());
});

//Callback Hell

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

/*Cuando una función unicamente hace un return, se puede simplificar la escritura de la
funcion flecha unicamente dejando el valor de retorno inmediatamente despues de la flecha*/

const getEmpleado = (id, callback)=>{
  const empleado = empleados.find( e => e.id === id )?.nombre // e es la iteración de cada uno de los empleados
  if(empleado){
    callback(null, empleado); //Se acostumbra a mandar null en el parametro del error, para verificar que
                              // no existen errores
  }else{
    callback(`Empleado con id ${id} no existe`);
  }
}

const id = 3;

const getSalario = (id, callback)=>{
  const salario = salarios.find( s => s.id === id )?.salario; // e es la iteración de cada uno de los empleados
  //Con el signo ?, se realiza una comparación en caso de que no exista el parametro requerido se pasa a la
  //siguiente linea de ejecucón, es un operador nullcheck
  if(salario){
    callback(null, salario); //Se acostumbra a mandar null en el parametro del error, para verificar que
                              // no existen errores
  }else{
    callback(`El salario del empleado con el id ${id} no existe`);
  }
}

getEmpleado(id, (err, empleado) => {
  if (err) {
    return console.log(err);
  }
  getSalario( id , (err, salario) => {
    if (err) {
      return console.log(err);
    }
    console.log('El empleado:', empleado, 'tiene un salario de:', salario);
  });
});
