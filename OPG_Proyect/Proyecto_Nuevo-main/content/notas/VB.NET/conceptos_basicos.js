/*

Principios y definiciones.

Visual Basic es un lenguaje compilado, por lo que para su ejecución es necesario generar primero el
ejecutable de la aplicación y para eso es necesario que se compile el codigo, la desventaja de esto
es que cada cambio realizado en el programa es necesario compilarlo.

Desde la linea de comandos se puede realizar la compilación de los programas de Visual Basic, siendo
necesario expresar en que ruta se encuentran almacenadas las utilidades, para definir el path ó ruta
se ejecuta el siguiente comando:

====================================

set path=%path%;C:\Ruta\Windows\Microsoft.Net\Framework\xxx

====================================

Teniendo en cuenta que %path% es la variable de entorno actual.

NOTA: La información anterior es meramente informativa, ya que al realizar la instalación de VBA, no es
necesario especificar la ruta de las utilidades de VBA, ya que se actualizan automaticamente en la
instalación.

Para la compilación de los programas de Visual Basic se utliza el comando "vbc", por ejemplo:

=====================================

vbc HolaMundo.vb

=====================================

NOTA: La ejecución de este comando es tomando en cuenta que ya nos encontramos en el path del archivo .vb
en caso de que no nos encontremos posicionado, es necesario declarar la ruta completa:

vbc C:\ruta\completa\HolaMundo.vb

Debido a las limitantes que tenía Visual Basic del manejo de su entorno, se agregó la biblioteca .NET la cual
esta conformada por diferentes ficheros los cuales cuentan con diferentes extenciones ( .dll, .lib, .tlb, etc)
estas librarias contienen las clases necesarias para la ejecución de diferentes metodos o tareas más comunes,
por ejemplo el caso de WriteLine, que es un metodo de System, definida por defecto en VB.

En el caso de que sea necesario la especificación de una biblioteca necesaria desde la linea de comandos, se
ejecuta de la siguiente manera:

vbc /r:System.Windows.Forms.dll,System.Drawing.dll fichero.vb

NOTA en el codigo anterior se muestra la declaración de dos ficheros, para hacer la declaración de dos o más
es necesario que estos se encuentren separados por ",".

Para realizar la depuración de un programa VB desde consola, antes que nada debemos generar el archivo compilado
que permita la ejecución depurada para ello se utiliza el siguiente código:

====================================

vbc /debug HolaMundo.vb

====================================

El cual compilará el fichero y generará uno igual pero con una extensión diferente [.pdb], el cual para poder
ejecutarlo es necesario realizaro con el siguiente comando:

====================================

cordbg HolaMundo

====================================

En Visual Basic, se definen los Modulos de ejecución y los procedimientos, siendo el más importante el definido como
Sub Main(), el cual debe estar siempre definido o no se ejecutará el programa o mudulo.

Algo destacable de Visual Basic a diferencia de algunos lenguajes, es el hecho de que no sensible a Mayusculas y
Minusculas, esto quiere decir que en la definicio de variables o metodos, es lo mismo "Dim VAR as Integer" y
"Dim var as Integer".

La definicio de variables de tipo numericas por defecto se inicializan en 0, se debe de tener en cuenta que pueden
se inicializadas en un valor distinto, ejemplo:

====================================

Dim var as Integer = 4

====================================

NOTA: En Visual Basic no es necesario definir la sentencia de cierre de una linea de código como en otros lenguajes,
como en el caso de C que se debe de cerrar cada linea de código con ";".

Cuando se define una variable y se le asigna un valor, esto es colocarle ese valor a la posición de memoria reservada para
esta variable, cabe aclarar que cuando una variable es sobreescrita con otro valor, el valor anterior es destruido y
sustituido por el nuevo valor, ocupando la misma localización de memoria reservada.

Para poder agregar comentarios en el codigo existen 2 formas de hacerlo:
  --> Utilizando el caracter ' al inicio de cada comentario.
  --> Utilizando la palabra reservada REM al inicio de cada comentario.

Para la impresión de datos en la consola, datos tanto numericos como cadenas de caracteres y unificarlos en la misma linea
se utiliza el caracter especial &, el cual permite:

System.Console.WriteLine(" Datos  de la variable a: " & a)

====================================================================================================

Tipos de Datos.

Existen distintos tipos de varaibles, los cuales se puede dividir en 3 grandes tipos, cada uno de ellos tiene tiene
un rango de valores tanto positivos como negativos:

Tipo Entero:
SByte (-128 a +128[ 8 bits de longitud ]), Short (-32768 a +32768[ 16 bits de longitud ]), Integer (-2147483648 a +2147483648[ 32 bits de longitud ]),
Long(-9223372036854775808 a +9223372036854775808[ 64 bits de longitud ])

  -->Enteros sin signo:
    Byte(0 a 2^(8)-1), UShort(0 a 2^(16)-1), UInteger(0 a 2^(32)-1), ULong(0 a 2^(64)-1),  Char(0 a 65535[Los valores de 0 a 127 corresponden al codigo ASCII
    el cual forma parte del juego de caracteres UNICODE código de 16 bits, valores de 0 a 65535, cada caracter ocupa 2 bytes]).

Tipos reales:
Single (32 bit de longitud [precisión de 7 digitos, cabe destacar que para la definición de estas variables es necesario agregar una F al final
  ya que de lo contrarío sera considerada como tipo Double si tiene decimales o tipo Integer en caso de que no los tenga]), Double (64 bits [precisión aproximada
  de 15 digitos]), Decimal (128 bits de longitud [precisión de 28 digitos, para considerar una variable de tipo decimal, al igual que en el caso de las tipo
  single, se debe de agregar una letra en este caso la D, al final de su declaración]).

  Dim Sin As Single = 45.8998F --> Variable de tipo single.
  Dim Doub As Double = 3.14159 --> Variable de tipo Double.
  Dim Dec As Decimal = 3.141519D --> Variable de tipo decimal

Tipos compuestos:
String (Almacenan cadenas de caracteres), Matrices

Tipos Boolaenos:
Boolean ---> Este tipo de datos unicamente solo tienen dos tipos de valores (True False)

====================================================================================================

Tipos de Operadores.

  * = --> Operador de asignación (Asignación asimetrica), asigna lo que esta a la derecha del operador a la variable que este en la parte izquierda.

====================================================================================================

Principales Operaciones Aritmeticas:

Las principales operaciones aritmeticas que se pueden realizar en VB .NET son:

--> + Suma: Los operandos pueden ser enteros o reales.
--> - Resta: Los operandos pueden ser enteros o reales.
--> * Multiplicación: Los operandos pueden ser enteros o reales.
--> / División real: Los operandos pueden ser enteros o reales.(El resultado debe de ser de tipo double, exceptuando cuando un operador es de tipo single y
    el otro no es double, ya que en este caso el resultado es un single o bien si ambos son de tipo decimal el resultado es decimal)
--> \ División entera: Los operadores pueden ser de cualquier tipo numerico, en el caso de que sea real VB lo convertirá a Long y el resultado siempre será
    entero.
--> ^ Exponenciación: Los operandos pueden ser enteros o reales. En cualquier caso los operadores son explicitamente convertidos a Double. (Si a es negativo b debe de
  ser entero).
--> Mod Modulo: Es el resto de una división, los operandos pueden ser enteros o reales, si son enteros el resultado será entero, en caso de que sean reales el
  resultado será real.

NOTA: La ejecución de los operadores aritmeticos se realiza de izquierda a derecha, si es que intervienen más de un operación, siempre ejecutando la de mayor prioridad
    y en caso de tener la misma prioridad se ejecuta de izquierda a derecha, tomando en cuenta que se tiene en cuenta si se encuentra dentro de un parentesis,
    evaluando desde el parentesis más interno al más externo.

====================================================================================================

Expresiones Condicionales.

Al igual que todos los lenguajes de programación, existen las sentencias condicionales, por medio del "if", estas expresiones son evaluadas con diferentes tipos de operadores
los cuales son:

--> < Devuelve verdadero si el primer operador es menor que el segundo.
--> > Devuelve verdadero si el primer operador es mayor que el segundo.
--> <= Devuelve verdadero si el primer operador es menor o igual que el segundo.
--> >= Devuelve verdadero si el primero operador es mayor o igual que el segundo.
--> <> Devuelve verdadero si ambos operadores son distintos.
--> = Devuelve verdadero si ambos operadores son iguales.

====================================================================================================

Algunos de los metodos básicos.

El principal metodo de visualización de contenido es la impresión de pantalla, para ello Visual Basic utiliza
la siguiente fución de impresión:

======================================

System.Console.WriteLine("Hola Mundo")

======================================

Para la declaración de variables se utiliza la palabra reservada "Dim", los niveles de ambito de la variable son iguales
que en los otros lenguajes de programación siendo estos de tipo: Global y Local, para el reconocer un ambito local en Visual
Basic, la variable tiene que estar definida dentro de End, Loop o Next, fuera de estos bloques de codigo, la variable no
estará definida.

La onversión de datos utiliza metodos para convertir de un tipo de dato a otro, por ejemplo, en el caso de "a" y a, en este caso
"a" es un caracter mientras que a es interpretado como variable, si agregasemos una letra a una definicion de una cadena de
caracteres:

Dim a As Char = "a"C

Fuerza la conversión de la literal al tipo de datos definido, en este caso utiliza el metodo ToChar para convertir la variable,
este metodo es de tipo Convert.

Un metodo para la declaración multiple de variables es con los dos puntos ":", esto permite el ahorro de lineas de codigo para la
multiple declaración de variables, por ejemplo:

=====================================

a = 3.14 : b = 2.71 : c = 2

=====================================

Tambien es posible crear metodos/procedimientos propios, teniendo la siguiente estructura:

Function NombreFuncion(Dim Parametro As Double) As Double --> Valor que retornará la función
  Return Resultado
End Function

NOTA: Cabe recordar que todos los procedimientos, expresiones, metodos, siempre deben de terminar con "End " acompañado de su tipo
de segmento, excepto en el caso de los ciclos, en el caso de For se finaliza con Next

*/
