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

const id = 1;

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

/*getEmpleado(id)
    .then(empleado => {
      getSalario(id)
          .then(salario => {
            console.log(`El empleado: ${empleado} tiene un salario de $${salario}`);
          })
          .catch(err => console.log(err));
    })
    .catch(err => console.log(err));*/


/*Promesas en cadena*/

let nombre;

getEmpleado(id)
    .then(empleado => {
      nombre = empleado;
      return getSalario(id)
    })
    .then(salario => console.log(`El empleado ${nombre} tiene un salario de ${salario}`))
    .catch(err => console.log(err));
