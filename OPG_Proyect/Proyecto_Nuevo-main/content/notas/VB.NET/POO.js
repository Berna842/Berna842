/*

Definición de POO.

La programación orientada a objetos es un modelo de programación que utiliza objetos,
ligados mediante mensajes para la solución de problemas.
La motivación principal de la programación orientada a objetos es el organizar los
programas a imagen y semejanza de la organización de los objetos en el mundo real.

La programación trata de identificar entidades de interes para un determinado problema,
estas entidades se determinan como objetos potenciales, poseen un conjunto de propiedades
o atributos y un conjunto de metodos mediante los cuales muetran su comportamiento.

=====================================================================================================

Conceptos importantes:

--> Clase: Equivale a la generalización de un tipo especifico de objetos.
--> Objeto ó instancia: Para la creación de un objeto se utiliza la palabra reservada New, cada vez que
          se realiza la invocación se crea un nuevo objeto de la clase.
--> Mensaje: En POO, un mensaje es asociado a un método.
--> Metodo: Una forma de operar sobre los atributos de un objeto.

Un metodo se escribe dentro de una clase de objetos y determina como tiene que actual el objeto
cuando recibe el mensaje vinculado con ese metodo, teniendo en cuenta que un metodo tambien
puede enviar mensajes a otros metodos solicitando una acción o información.

En basé a lo anterior, un programa orientado a objetos realiza 3 cosas de forma fundamental:

1) Crear objetos necesarios.
2) Procesar internamente los mensajes enviados entre objetos.
3) Cuando los objetos no son necesarios son destruidos.

NOTA: La unica forma de acceder a un atributo de un objeto es por medio de su metodo correspondiente.

Los atributos son características individuales que diferencian un objeto de otro, los atributos
tiene accesibilidad, la cual es definida como Publica ó Privada (Public ó Private), esta accesibilidad
permite proteger los atributos, si un atributo es declarado privado es accesible unicamente por los
metodos de su misma clase, esto quiere decir que no pude accederse desde cualquier otra clase incluidas
subclases.

=====================================================================================================

Declaraciones.

-- Clases --

Para la declaración de clases se utiliza la palabra reservada Class, por ejemplo:

Class NewClass
  'Cuerpo de clase atributos y metodos.
End Class

=====================================================================================================

*/
