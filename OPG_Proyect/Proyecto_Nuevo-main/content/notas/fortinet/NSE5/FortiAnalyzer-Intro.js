/*
  FortiAnalizer actua como un repositorio centralizado de registros para uno o más dispositivos
  Fortinete, proveyendo un solo canal para un acceso completo  la información de red.
  El reporte y registro de opera en el siguiente flujo de trabajo:
    -- Registrando los dispositivos y enviando los registros a FortiAnalizer.
    -- FortiAnalizer almacena los logs de tal forma que es facil la busqueda y generación de reportes.
    -- Administradores pueden conectarse a FortiAnalizer usando la GUI para ver los registros de forma
    manual o bien generar reportes de la inforamción visible (Tambien es posible usar el CLI para
    realizar tareas administrativas).

  Los dispositivos soportados por FortiAnalizer son:
    -- ForitGate/FortiCarrier
    -- FortiAnalizer
    -- FortiCache
    -- FortiClient
    -- FortiDDoS
    -- FortiMail
    -- FortiManager
    -- FortiSandbox
    -- FortiWeb
    -- Syslog
    -- Chassis

  Algunas de las caracteristicas clave incluyen Reportes, Alertas, generación y archivado de contenido.
    -- Rerpotes:
      -- Reporte de eventos de Network-wide, actividades y ocurrencia de tendencias en dispositivos
        soportados.
      -- Archivado, filtrado y mined para comparación y propositos de analisis historico.
    -- Alertas:
      -- Identificación y reacción rapida para las amenazas de seguridad de red, cuando se especifican
        condiciones en los logs y tienen coincidencias.
      -- Ver alertas atravez del Monitor de eventos (Interfaz grafica), email, SNMP, o syslog
    -- Archivado de contenido:
      -- Registros simultaneos y archivos completos o resumen del contenido de las copias de seguridad
        transmitidas atravez de la red (email, FTP, NNTP y trafico web)
      -- Tipicamente usado para prevenir que la información sensible salga de la red.

  Dominios Administrativos (Administrative Domains [ADOMS])
  Permite agrupar dispositivos para la administración y monitoreo, se activan desde
  System Settings -> Dashboard
  Los propositos de los ADOMS son:
    -- Dividr la administración de los dispoisitivos por ADOMS y el acceso para el control administrador.
      Si se utilizan VDOMs, los ADOMs, permite restringir más el acceso a la información que viene del
      VDOM para un dispositivos especifico.
    -- Administración mas eficiente de las politicas y el alojamiento de almacenamiento,
      que puede configurarse por ADOM y no por dispositivo

  Los ADOMs no se encuentran habilitados por defecto, solo pueden ser configurados por el administrador
  por defecto "admin" (O un administrador que tenga perfil de super usuario.)

  FortiAnalizer cuenta con dos modos de operación: Analizador y Colector.
    -- Cuando se opera como Analizador, el dispositivo actua como un registro centrl agregado para uno
      o más colectores, tales como FortiAnalizer en modo colector, o cualquier otro dispositivo que envie
      registros. Analizador es el modo de operación por defecto.
    -- Cuando el modo de operación es colector, registra de multiples dispositivos y reenvia esos logs
      en su formato binario original, para analizar por otro dispositivo, como por ejemplo el FortiAnalizer
      en modo Analizador o bien a algun servidor de eventos de sistema, o a un servidor de formato comun
      de eventos (CEF), dependiendo del modo de reenvio, no cuenta con las mismas opciones que el modo
      Analizador.

  El modo de operación puede ser configurado por medio del widget System Information en el Dashboard.
  En la colaboración de colectores, se permite incrementar el rendimiento de FortiAnalizer, ya que los
  colectores permiten recibir las multiples tareas de registro de los diferentes dispositivos para el
  Analizador, donde permitirá realizar los trabajos de analisis y de reporte.
  En el caso de que se tenga una restriccion en el consumo de anchos de banda, es posible configurar el
  almacenamiento y envio de registros para que suceda durante los periodos de ancho de banda bajos.

  Lenguajes de Base de datos Soportados, FortiAnalizer soporta Lenguaje de consultas estructuradas para
  el registro y reporte (SQL), inserta la información de registros en una base de datos SQL para
  la visualización de los registros y la generación de reportes, tambien es compatible con las bases
  de datos PostgreSQL.
  Las capacidades Avanzadas de reporte requieren algo de concimiento de SQL y bases de datos.


  Configuración por Defecto.

  Cuando se utilizan las configuraciones iniciales de registro en el FortiAnalizer, se debe de
  considerar lo siguiente:
    -- El puerto 1 es el puerto de administración.
    -- usuario admin, sin contraseña.
    -- Se se esta desplegando FortiAnalizer en una VM, la IP de administración puede variar
      dependiendo de la plataforma de virtualización o bien del provedor cloud que se este utilizando.
  Se puede configurar la IP de administración desde CLI con los siguientes comandos:
  ==========
    config system interface
      edit port 1
        set ip <dirección IP> <Mascara de subred>
    end
  ==========

  Las dor herramientas a utilizar para configurar FortiAnalizer son la GUI y la CLI.
  Cuando se utiliza el CLI, se pueden correr comandos atravez del widget CLI console, disponible en la GUI
  y atravez de emuladores de terminal, como PuTTY (El uso de PuTTY requiere Telnet, SSH o una conección
  local [DB-9]).

  Las caracteristicas disponibles en la Interfaz grafica dependen del perfil de administrador registrado
  y del modo de operación.
  NOTA: FortiView Fabric View, Report o FortiSOC no se encuentran disponibles en la Interfaz grafica
    si el modo de operación es colector tambien si se esta ingresando con los perfiles de administrador
    Standard_User o Restricted_User.
  Los cambios realizados desde la GUI y el CLI toman efecto de inmediato, sin necesidad de reiniciar o
  interrumpir el sistema.
  Adicionalmente la base de datos SQL se encuentra deshabilitada por defecto cuando el modo de operación
  es colector, por lo que los registros que requieren esta base de datos no se encuentran disponibles a
  menos que se habiliten desde el CLI.

  Para el acceso a la GUI de FortiAnalizer se ingresa desde el navegador por medio de
  https://<IP de administración>, (por defecto sería [https://192.168.1.99]).
  Para el ingreso a CLI existen dos metodos:
    -- La consola de CLI integrado: desde la interfaz grafica en el icono de Herramientas, en la esquina
      superior derecha.
    -- Mediante una aplicación que emule la terminal, ingresando desde el puerto de FortiAnalizer
      especificado, por defecto puerto 1 y el protocolo de administración soportado, como SSH.
  Cuando se ingresa por primera vez al FortiAnalizer, el Wizard de configuración es cargado y atravez de
  este se puede completar la configuración completa o bien algunos pasos.

  NOTA: FortiAnalizer no cuenta con opciones de recuperación de contraseña, por lo que se debe de tener
  cuidado al realizar el cambio.
  Desde el Wizard se puede realizar el cambio de contraseña, sin embargo, tambien es posible realizar
  esta configuración en la pagina de [Administrador], dando clic derecho en el usuario y seleccionando
  [Cambiar contraseña]
  En caso de que se olvido la contraseñam, se deben seguir los siguientes pasos:
    -- Realizar un factory reset de la VM o del dispositivo.
    -- Ejecutar el comando [execute migrate].
    -- Usar el usuario y contraseña por defecto de la cuenta admin.
  La otra opción es formatear el flash y recargar la imagen desde el menú de configuración de la BIOS,
  sin embargo esto elimina las configuraciones incluyendo las cuentas administrativas.
  Adicionalmente se pueden aumentar la seguridad de la cuenta por medio de la politica de contraseña,
  por defecto esta politica esta deshabilitada, esta es una configuración de administración global.
  Permite especificar un minimo de tamaño si se puede incluir numeros o caracteres y el número de días
  que la contraseña se mantendra como valida.

  Recomendaciones de Seguridad:
    -- Despliega FortiAnalizer en una red protegida protegida y de confianza.
    -- Usa metodos de comunicación segurea (HTTPS o SSH), incluso si es una red privada.
    -- Configura Hosts de confianza
    -- Si es requerido los accesos desde el exterior, solo abrir los puertos necesarios para la correcta
      comunicación.
    -- Si es requerido el acceso desde el exterior, configura usuarios especiales y que solo puedan
      utilizar protocolos seguros (HTTPS/SSH).
    -- Siempre utiliza protocolos seguros.
    -- Manten tus contraseñas en un lugar seguro ya que FortiAnalizer no cuenta con recuperación de
      contraseñas.

  La configuración de FortiAnalizer es muy similar a la de FortiGate, los cambios de red siempre se realizan
  desde la pagina de [System Settings -> Network].
  La interfaz de administración debe de tener una dirección dedicada y unica.
  Existen algunos protocolos de accesos administrativos no estandares:
    -- Web service: Permite el acceso a FortiAnalizer desde el servicio Web Como SOAP, protolo de mensajeria
      que permite correr programas en un sistema operativo separado. (El servidor de FortiAnalizer corre
      en linux)
    -- FortiManager: Permite que FortiAnalizer sea Administrado por FortiManager.

  En caso de que se requiera configurar otro puerto en el FortiAnalizer se pueden especificar rutas estaticas
  IPv4 e IPv6 para gateways diferentes.
  De igual forma si se requiere que se resuelvan hostnames en los registros, es necesario configurar Los
  servidores de DNS.

  Para reestablecer las configuraciones.
  Para reestablecer las configuraciones por defecto:
    -- execute reset all-settings
  Para reestablecer las configuraciones por defecto con excepción de las direcciones IP actualiz y las rutas:
    -- execute reset all-except-ip
  Para eliminar todos los dispositivos e imagenes, bases de datos, y registrsos de información del disco,
  pero preservar la IP y la información de ruteo:
    -- execute format disk (Formato de bajo nivel esta dispoible como opción [deep-erase])
  Como mejor parctica despues de corrar cualquiera de los comandos superiores, se recomienda permanecer
  conectado por medio del puerto de consola, para evitar perder la conexión.

  ** Algunos de los comandos básicos, para la configuración de red y de sistema: **
    -- get system status [Muestra el estatus del dispositivo FortiAnalizer]
    -- show system interface [Muestra la configuración de interfaz de red en el dispositivo FortiAnalizer
      Así como los puertos y las direcciones IP asociadas, como habilitadas en los protocoloes de acceso
      administrativo]
    -- show system DNS [Muestra las direcciones de servidores DNS]
    -- show system ntp [Muestra las configuraciones automaticas de tiempo usando un servidor de protocolo
      de tiempo de red (ntp)]
    -- get system ntp [Muestra que tan seguido FortiAnalizer se sincroniza con el servidor NTP]
    -- show system route [Muestra las entradas de la tabla de rutas estaticas del dispositivo FortiAnalizer]
    -- execute ping [Prueba la conexión de red entre el FortiAnalizer t otro dispositivo de red]

  ** Algunos de los comandos básicos, para visualizar la información del servidor: **
    -- diagnose system print cpu info [Imprime la información de CPU, este comnado incluye
          -> Procesador
          -> ID
          -> Familia de CPU
          -> Modelo
          -> Nombre de Modelo
          -> Pasos
          -> MHz de cpu
          -> Tamaño de Cache
          -> ID Fisico
          -> hermanos]
    -- diagnose system print df [Proporciona la infiormación del uso de espacio en disco, desplegandolo
      de la siguiente forma:
        -- file system
        -- 1k-block
        -- uso
        -- Disponible
        -- Porcentaje usado
        -- montado en]
    -- diagnose system print hosts [Muestra la tabla estatica de busqueda para los nombre de host]
    -- diagnose system print loadavg [Muestra la carga promedio del sistema]
    -- diagnose system print netstat [Muestra las estadisticas de red para conexiones activas de red,
      proporciona la siguiente informació:
        -- protocolo
        -- direccion local
        -- dirección externa
        -- estado]
    -- diagnose system print partitions [Muestra la información de las particiones del sistema]
    -- diagonse system print route [Muestra la lista de ruteo principal, mostrando la siguiente inforamción:
        -- destination
        -- gateway
        -- gateway mask
        -- flags
        -- metric
        -- reference
        -- use
        -- interface]
  Los respaldos de configuración de sistema almacenan todo, excepto por los registros actuales y los reportes
  generados, para almacenar los registros y los reportes se utiliza la interfaz grafica o bien desde CLI con
  con el comando [execute backup]
  Los respaldos de configuración del sistema contienen:
    -- Información del sistema.
    -- Lista de dispositivos.
    -- Información de reporte.
  Pueden ecriptarse los archivos de respaldos (No recomendable cuando se maneja con Fortinet Support)
  NOTA: Los respaldos unicamente pueden ser restaurados en dispositivos del mismo modelo y de la misma
  versión de Firmware.

  Mejores practicas:
  -- Siempre apagar de forma correcta FortiAnalizer, caso contrario puede dañar las bases de datos.
    [execute shutdown]
  -- Tener FortiAnalizer sobre un UPS para prevenir apagones repentinos, así mismo asegurarse de que el
    UPS es estable y provee suficiente corriente para evitar comportamientos inesperados.
  -- Para uso rapido, guarda una copia de seguridad en una locación segura.
  -- Sincroniza el tiempo de FortiAnalizer y todos los dispositivos registrados con servidores NTP para
    la correcta corelación de registros.
  -- Implementa un plan de respaldos comprensible que incluya la configuración y los registros.
  -- Incremente la confiabilidad configurando un HA y un link aggregation.

  Fabric Connectors:

  Se puede configurar FortiAnalizer para enviar los registros y notificaciones de eventos a:
    -- Plataformas externas de cloud: AWS. Azure, Google.
    -- ITSM: ServiceNow, Slack, Webhook
    -- Security Fabric: FortiClient EMS, FortiMail, FortiCASB
  Mejora la redundancia de información, reduce la degradación del rendimiento, enriquece las acciones
  disponibles en FortiSOC.

  Para poder enviar los registros a plataformas cloud, se debe de adquirir una licencia separada para el
  [Servicio de Connector de almacenamiento], que incluye:
    -- Limitacion de almacenamiento: Cantidad de informacíon que puede ser subida a las plataformas cloud.
    -- Tiempo de expiración.
  Una vez adquirida la licencia se puede habilitar la subida de registros en el almacenamiento cloud, desde
  la caracteristica [System Settings -> Device Log Setting]

*/
