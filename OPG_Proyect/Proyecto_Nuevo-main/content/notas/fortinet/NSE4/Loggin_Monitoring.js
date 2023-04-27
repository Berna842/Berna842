/*

  Flujo de Logging.
  1) El trafico pasa atravez del fortigate haca la red.
  2) fortigate escanea el trafico y toma acciones basado en las politicas de firewall configuradas.
  3) Activamente es registra la información y la almacena en el mensaje de log.
  4) El mensage de log es almacenado en un archivo de registros y  en un dispositivo capaz de almacenar logs.
  El proposito de esto es:
    -- Monitorear redes y volumenes de trafico de internet.
    -- Diagnosticar problemas.
    -- Establecer lineas base para reconocer anomalias y tendencias.
  Tipos de Logs y subtipos.
  Cuando se graba la información en los logs, esta se desgloza por subtipos:
  Por trafico:
    -- Forward
    -- Local
    -- Sniffer
  Por evento:
    -- Endpoint control
    -- High Availability
    -- System
    -- User
    -- Router
    -- VPN
    -- WAD
    -- Wireless
  Por Seguridad:
    -- Application Control
    -- Data Leak Prevention (DLP)
    -- Anti-Spam
    -- Web Filter
    -- Intrusion Prevention System (IPS)
    -- Anomaly (DoS-Policy)
    -- Web Application Firewall (WAF)
  De igual forma existen Niveles de seguridad, los cuales se clasifican de la siguiente forma:
    -- 0 - Emergencia (System unestable)
    -- 1 - Alert (Immediate Action required)
    -- 2 - Critical (Functionality effected)
    -- 3 - Error (Error exists that can affect Functionality).
    -- 4 - Warning (Functionality could be affected.)
    -- 5 - Notification (Information about normal events).
    -- 6 - Information (General system informaction).
    -- 7 - Debug (Diagnostic information for investigation issues).
  Los mensajes de logs se componen de dos partes:
    -- Log Header:
      -- Tipo y subtipo
      -- Nivel de seguridad.
    -- Log Body:
      -- Policyid
      -- hostname
      -- srcip y dstip
      -- action
      -- msg
  Para el caso de lo logs de un diseño en security Fabric, es requerido dos o más fortigate y un Forti Analyzer.
  En el caso de que el rendimiento se vea afecto, es posible configurar el rendimiento de los logs, esto para mantener el consumo de
  recursos estable, para ello se utiliza el siguiente comando en CLI:
    -- set sys-perf-log-interval <0-15> (desde config system global)

  Para el almacenamiento local de la información de los logs, se debe de habilitar [disk ligging], desde [Log & report -> Log Settings],
  en caso de que la opción este deshabilitada los logs unicamente se podrán visualizar en tiempo real.
  Fortigate reserva aproximadamente el 25% del disco para el uso del sistema y un inesperado sobreflujo de cuota.
  Para el calculo se utiliza:
    -- disco - Logging = Reservado
    -- Reservado / disco*100 = Reservado %
  Se puede configurar FortiAnalyzer y FortiManager para el almacenamiento de logs, desde CLI se pueden configurar hasta 3 dispositivos
  separados o solo un Fortianalyzer cloud.
  Para configurar las opciones loggining:
    -- Tiempo Real
    -- Cada minuto.
    -- Cada 5 minutos.
  Por defecto si el disco de FortiAnalyzer se encuentra lleno, los logs mas viejos seran sobreescritos, sin embargo es posible configurar
  para que se deje de registrar.
  Si se tienen VDOMs configurados es posible configurar multiples servidores de registros y FortiAnalyzers.
  Para la transmición de los logs se utiliza el protocolo UDP con el puerto 514 o en su defecto el TCP con el mismo puerto 514, para el
  almacenado de información se realiza por medio de texto plano, compresión LZ4.
  Para las configuraciones para el almacenamiento de logs se puede realizar [Log & Report -> Log Settings]

*/
