/*
Contrato de futuros.

Es un contrato entre dos partes
No se recibe al realizar la transacción
Se tiene una fecha futura, 3 meses de duración
A un precio establecido
Su valor se basa en otro activo
Recibe de subyacente

El objetivo de utilizar las diferencias de precios, teniendo en cuenta que cada tercer viernes
del mes se renuevan los contratos, por lo que se debe de estar atento a los vencimientos:

3er viernes de marzo, de junio, septiembre, diciembre.

Los tipos de ordenes son:
--> Buy Market, compra inmediata a precio de mercado.
--> Sell Market, venta inmediata a precio de mercado.
--> Buy Stop, se estipula que cuando el valor de la orden llegue a un determinado valor y
  lo supere se compra de forma inmediata.
--> Sell Stop, se estipula que cuando el valor de la orden llegue a un determinado valor y
  lo supere se venda de forma inmediata
--> Limit, se establece el precio limite esperado para que se cierre la operación

Algunos indicadores son:
--> Bar timer.
--> MACD
--> RSI
--> VOL
--> Media Movil Simple a 200 Periodos SMA 200
--> SMA 70 periodos
--> Pivotes

*/
