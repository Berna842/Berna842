if ! $(pstree -pua | grep php | grep -v "grep" > /dev/null )  ; then php /var/www/html/medidor.php &; fi

<?php
  $username = 'HOS061212KZ1';
  $password = 'v$AVJ1G=';
  $xml_file = '<?xml version="1.0" encoding="UTF-8"?>
<cfdi:Comprobante xmlns:cfdi="http://www.sat.gob.mx/cfd/4" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                  xsi:schemaLocation="http://www.sat.gob.mx/cfd/4 http://www.sat.gob.mx/sitio_internet/cfd/4/cfdv40.xsd"
		  Version="4.0" Fecha="2022-06-16T11:37:05" Serie="B" Folio="2564333" FormaPago="99"
                  CondicionesDePago="Pagado" SubTotal="1.00" Moneda="MXN" TipoCambio="1" Total="1.16" Exportacion="01"
                  TipoDeComprobante="I" MetodoPago="PUE" LugarExpedicion="03100"
		  Certificado="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"
                  NoCertificado="00001000000504088907"
                  Sello="jgnT20bvTlNg7+hIwAJK9OIkKd3yn+jKMyEV+UDYzNRNoVVWclRbfhIoP1e4cro08p/ZODJSaWUnfxJffcA0IxR+bwaPF2FRs7Y3RN4lF8u95HC6tdc50ZsfPKBJP2/c9Eduvs7QYtaKcyg8R7UFXfG12rxyKNO13ThNHrWqJraaBQZWDOJYMz6VJ2+wEgK9DC7N2SwUHKCFht4mxdXKt1yhozoH7WRlaNWxrfKBgbqm2NN97151Y+Q2XUHFPC+dDutjEmoLrlNNRkdjaPLHrYC+fwmkFhnTvi+lefXU0TapVa9q/h82D0ZnN5ROOxH/gX56N0DwmPpsP87HI81pZQ==" Descuento="0.00">
    <cfdi:Emisor Rfc="HOS061212KZ1" Nombre="HOSTDIME.COM.MX S.A. DE C.V." RegimenFiscal="601"/>
    <cfdi:Receptor Rfc="MAAD000913971" Nombre="prueba" UsoCFDI="G03" DomicilioFiscalReceptor="72000"
                   RegimenFiscalReceptor="612"/>
    <cfdi:Conceptos>
        <cfdi:Concepto ClaveUnidad="E48" ClaveProdServ="81112100" NoIdentificacion="400578" Cantidad="1" Unidad="Unidad de Servicio" Descripcion="pruba" ValorUnitario="1.00" Importe="1.00" Descuento="0.00" ObjetoImp="02">
            <cfdi:Impuestos>
                <cfdi:Traslados>
			<cfdi:Traslado Base="1.00" Impuesto="002" TipoFactor="Tasa" TasaOCuota="0.160000" Importe="0.16"/>
                </cfdi:Traslados>
        	</cfdi:Impuestos>
        </cfdi:Concepto>
    </cfdi:Conceptos>
    <cfdi:Impuestos TotalImpuestosTrasladados="16.00" >
        <cfdi:Traslados>
            <cfdi:Traslado Base="100.00" Impuesto="002" Importe="16.00" TasaOCuota="0.160000" TipoFactor="Tasa"/>
        </cfdi:Traslados>
    </cfdi:Impuestos>
    <cfdi:Complemento>
    </cfdi:Complemento>
</cfdi:Comprobante>';
  #$xml_file = htmlspecialchars($xml_file);
  echo htmlspecialchars($xml_file);

  echo "<br> <br>";
  $url = 'https://www.factureyapac.com/WSTimbrado33/WSCFDI33.svc?WSDL';
  $client = new SoapClient($url, ['login' => $username,
                                  'password' => $password]);
  var_dump($client);
  echo "<br><br>";
  foreach($client->__getFunctions() as $response){
    echo $response . "<br>";
  }
  echo "<br><br>";
  var_dump($client->TimbrarCFDI(['usuario' => $username, 'password' => $password, 'cadenaXML' => $xml_file, 'referencia' => "002"]));
  echo "<br><br>";
  var_dump($client->ConsultarCreditos(['usuario' => $username, 'password' => $password]));
  echo "<br><br>";

  var_dump($client->ConsultarComprobantes(['usuario' => $username, 'password' => $password, 'fechaInicial' => '2022-03-01T00:00:00', 'fechaFinal' => '2022-03-08T00:00:00', 'filaInicial', 1]));

?>
