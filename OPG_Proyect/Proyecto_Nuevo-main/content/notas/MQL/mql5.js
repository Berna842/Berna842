/*
	Lenguaje desarrollador por MetaQuotes, basado en C++ orientado a objetos (POO)


	Fundamentos Básicos

	MetaEditor es el compilador del lenguaje MQL5, tambien es posible utilizar el lenguaje de programación python, esto esta fuertemente relacionado al trading algoritmico.

	Filtros de pruebas recomendamos son:
		--> Pruebas en la cuenta DEMO de MetaQuotes
		--> Pruebas en las cuentas demo de los brokers.
		--> Pruebas en las cuentas reales.

	Desde el MetaEditor se tiene la posibilidad de crear multiples archivos y scripts para automatizar los procesos, Metaeditor crea terminales para cada proyecto, esto se 
	refiere a que se tienen diferentes proyectos que se pueden correr en paralelo en los mismos simbolos.

	Los tipos de archivos que se pueden crear en MetaEditor son los siguientes:
		--> Expert Advisor[Asesores Expertos] (Template) 
		--> Expert Advisor[Asesores Expertos] (Generate)
			--> Son programas de trading automatico que realizan aperturas/cierres/modificaciones de ordenes.
				Al momento de crearse el archivo se genera en MQ5 sin embargo al ser compilado de forma exitosa se genera el archivo EX5
				NOTA: En momentos determinados solo es posible tener un asesor experto, es decir solo se puede ejectuar uno en una grafica en el mismo momento.
		--> Custom Indicator (indicadores)
			--> Permite el procesamiento de datos dentro de un grafo y permite, ya sea dentro de la misma ventana o bien en otra diferente, usa lineas, histogramas, flechas,velas, etc
				NOTA: Se pueden tener multiples indicadores dentro del mismo grafico.
					  Tambien se almacena en MQ5 su codigo fuente y EX5 para su ejecución al momento de compilarse de forma correcta.
		--> Script
			--> Realizan una tarea especifica
				NOTA: Solo se puede tener en ejecución un script en un mismo momento dentro de una grafica.
		--> Servicio
		--> Libreria
			--> Son ficheros ejecutables que contienen funciones reutilizables en los programas principales.
			NOTA: Son muy similar a los ficheros Include sin embargo permite distribuir funciones en archivos EX5 sin necesidad de proporcionar los archivos fuentes.
				  De igual forma son compiladas de forma independientes al fichero que las manda llamar.
		--> Include
			--> Son codigos fuentes que contienen funciones, variables, que se incluyen en otros archivos fuentes para su utilización, sin necesidad de generar un archivo compilado adicional.
			NOTA: Archivo generado MQH 
		--> New Class
		--> Python Script
		--> Database.

	Tambien existen los archivos pre sets, que permiten almacen la información de configuración de un asesor experto de forma predefinida.

	NOTA: 
	Un simbolo es el acronimo de una variable en el mercado, por ejemplo EUR/USD

	Documentación Oficial de MQL5:
		https://www.mql5.com/es/docs
*/