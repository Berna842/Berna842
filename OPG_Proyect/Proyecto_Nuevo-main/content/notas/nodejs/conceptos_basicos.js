/*

<-- ¿Qué es NodeJS? -->
Lenguaje de Backend, con acceso al sistema de archivos del servidor, nos brinda información del sistema
operativo, procesos que ejecuta.


** NodeJs: Corre sobre el motor V8 de Google, que es un motor de alto desempeño escrito en C++ y traduce
lo que se escribe en Javascript a lenguaje maquina.

** Algunas de las implementaciones de Node es:
  *El uso de sockets para la comunicación real de Cliente-Servidor.
  *Manejo de archivos en el FileSystem y se puede trabajar cargas simultáneas
  *Servidores locales remotos con información en tiempo real.
  *Conexión a bases de datos.
  *Creación de servicios REST en segundos.

**Algunas de las ventajas de Node son:
  *Las entradas y salidas no realizan bloqueos del servidor.
  *Cuenta con una gran libreria de paquetes disponibles.

<-- App Blocking VS App No-Blocking: -->
la diferencia entre app Blocking y app no-Blocking, es que la primera realiza la
ejecución de forma secuencial y la segunda la realiza de forma asincrona, resolviendo
las funciones de forma paralela.

Un Callback es una funcion que se pasa como parametro de otra funcion

Siempre se debe de tratar de trabajar de forma no bloqueante

Funciones no bloqueantes:
** console.log();
** setTimeout(()=>,X);

En javascript, todas las funciones tienen un retorno de valor, si este no esta definido
en la consola mostrara como undenfined

La ejecución de los procesos en node se ejecutan dentro de un pila de los procesos, esta pila
se llama call stack, en donde dentro del proceso main de node, se van solicitando las instrucciones
del programa.

Cuando ya no se encuentre ningún comando por ejecutar en la pila de procesos, node termina
el proceso de main.

Node Apis, es un espacio donde node queda esperando respuesta por parte de alguna funión

Una vez que una funcion que estaba en Node Apis, termino su ejecución pasa a ser procesado
en una cola de callbacks, en este espacio, esta esperando que el proceso main termine su
ejecución para poder ser ejecutados


<-- Nodemon -->

En las instalaciones de las paqueterias, al utilizar el comando de node, npm, cuando en las
instrucciones se muestre un parametro -g, significa que esta ejecucion requiere permisos de
super usuario

<-- Callbacks -->

Cuando una funcion recibe un callback se refiere a que esa ejecución se realizará un tiempo despues,
en algún momento.

En la construcción de un objeto, con sus parametros cuando la propiedad y la variable a la que será igualada
tienen el mismo nombre se puede simplificar evitando escribir dos veces:

const getUsuarioByID = (id) => {
  const usuario = {
    id,
    nombre: 'Nombre'
  }
}

Cuando se le pasa de parametro una función flecha a otra función, esta si se ejecutará siempre y cuando la
función que este recibiendo tenga declarado el argumento de recepción, y dentro de la función se manda llamar
el argumento para poder realizar su ejecución, ver ejemplo_cb.js //Callbacks para su entendimiento practico.

Basicamente una función que se manda a otra como un parametro.

Las promesas permiten mitigar el callback hell, el callback hell es un efecto que se tene al tener anidados
multiples callbacks, y no se conoce donde se generán las funciones.
Para la revisión practica ver el archivo promesas.js

Para crear un predefinido para la utilización de dependencias en las aplicaciones que se creen se ejecuta el
comando [npm init], desde este comando traz la realización de la configuración se proceden a instalar todos
los modulos necesarios.

Significados:

--> npm: Node Package Manager.

*/
