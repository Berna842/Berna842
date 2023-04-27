/*
Las politicas de firewall definen que trafico coinciden con las politicas y que hace el FortiGate cuando esto
sucede.

FortiGate sigue las politicas desde arriba hacia abajo, para encontrar una coincidencia, si existe entonces
el trafico es procesado en base a la politica, en caso de que no se encuentre ninguna politica el trafico
es desechado por defecto de la politica de firewall Denegación Implicita.

Los componentes usados para las politicas son:
-- Interfaz y zona.
-- Dirección, usuario y objetos de servicio de internet.
-- Definicion de servicio.
-- Horarios.
-- Reglas NAT.
-- Perfiles de Seguridad.

Tipos de politicas:
-- Politicas de Firewall (IPv4, IPv6)
-- Conexión de Par Virtual de firewall (IPv4, IPv6)
-- Proxy
-- Multicast
-- Politica de Local-in (El Origen y Destino es el mismo FortiGate)
-- DoS (IPv4, IPv6)
-- Formación de Trafico.

Cada politica tiene un cirterio de coincidencia, el cual puede ser definido en base a los siguientes objetos:
-- Interfaz de entrada
-- Interfaz de Salida
-- Origen: Dirección IP, Usuario, Servicio de internet.
-- Destino: Dirección IP ó Servicio de Internet
-- Servicio: Protocolo IP y  número de puerto.
-- Horario: Aplica durante tiempos configurados.

Si el tráfico coincide con la plitica, FortiGate aplica la acción configurada en la politica del Firewall:
-- Si la acción es DENY, FortiGate desecha la sesión.
-- Si la acción es ACCEPT, FortiGate aplica otras configuraciones definidas para procesar el paquete como,
  Analisis de Antivirus, Filtrado Web u origen NAT.

Para poder simplificar la configuracción se pueden agrupar interfaces en zonas logicas, esto se puede crear en
la pagina de interfaces, se debe de tener en cuenta que cuando se configura una interfaz en una zona, esta no
puede ser referenciada de forma individual, así como tampoco se puede añadir la interfaz a una zona sin antes
haber removido todas las referencias a esa interfaz (Por ejemplo: politicas de firewall, direcciones de
firwall,etc).

Por defecto solo se puede seleccionar una interfaz como interfaz de entrada y una sola interfaz como interfaz
de salida, esto es por que la selecccion multiple de interfaces o la opción de any interfaces en las politicas
del firewall estan deshabilitadas en la GUI, sin embargo esto se puede habilitar en las politicas de multiples
interfaces (Multiple Interface Policies) en la opción Visibilidad de Caracteristicas.

El siguiente criterio de coincidencia que considera FortiGate es el origen del paquete, en cada politica del
firewall se debe de seleccionar un objeto de direccion de origen, refinando esta coincidencia se puede seleccionar
tambien usuario o grupos de usuarios.

Se debe de especificar al menos un origen (Direccion o base de datos de proveedor de servicios de internet
  (ISDB)):
    -- Direccion IP o Rango.
    -- Subnet (IP/ Mascara de red)
    -- FQDN
    -- Geografíca
    -- Dinamico :
      -- Fabrica de conector de direcciones.
    -- Rango de direcciones Mac.
Se puede especificar:
    -- Usuario de Origen: Usuario individual o grupo de usuarios.
    -- Se debe de referir a:
        -- Cuentas locales de firewall.
        -- Cuentas en un servidor remoto(Por ejemplo, Active Directory, LDAP, RADIUS)
        -- FSSO (Fortinet Single Sing-On).
        -- Usuarios de Certificado Personal (PKI-Authenticated)

Coincidencias por destino.

Se pueden utilizar objetos de direcciones u objetos ISDB como destinos en las politicas del firewall, en los objetos
de direcciones se puede utilizar:
    -- Nombre de host
    -- Subred (IP ó Mascara de red).
    -- FQDN(Si se utiliza como objeto de direccion, se debe de asegurarse de tener el dispositivo FortiGate con Servidores DNS)
    -- Geografico:
        -- Definido por las direcciones de un país por la posición geografíca del ISP.
        -- Base de datos que se actualiza de forma periodica atravez de FortiGuard.
    -- Dinamico.
        -- Conector de direccion de fabrica
  Objetos ISDB (Internet Service DataBase).
  El usuario se puede seleccionar/determinar en la interfaz de ingreso y los paquetes se reenviaran solo en la interfaz de salida
  después de la correcta autenticación del usuario.

   Servicio de Internet (Internet Service).

   El Servicio de Internet es una base de datos que contiene una lista de direcciones IP, protocolos IP y número de puertos, más
   comunes de los servicios de internet. FortiGate descarga periodicamente la versión más nueva de la base de datos de FortiGuard.
   Se puede seleccionar esto como Origen ó Destino en las póliticas del firewall.
   Si se utiliza un objeto Internet Service DataBase como origen:
    -- No se puede utilizar una direccion como origen.
   Si se utiliza un objeto ISDB como destino:
    -- No se puede utilizar una direccion como destino.
    -- No se puede utilizar un servicio en la politica del firewall.

   Como los objetos ISDB ya cuentan con todas las direcciones IP, puertos y protocolos usados por el servicio, no se puede combinar con
   los objetos de direcciones o bien con los servicios en las politicas del firewall. Los objetos ISDB ya cuentan con la información de
   los servicios,

   Los objetos ISDB son referenciados en las politicas por nombre en lugar de ID.

   Los objetos ISDB Geograficamente basados permiten al usuario definir país, region y ciudad, Lo cual permite un control más granular
   sobre la locación del objeto ISDB padre.

   Se puede deshabilitar las actializaciones de ISDB por lo que estas unicamente pueden ocurrir durante una ventana de cambio de control.
   (Control de las actualizaciones de ISDB usando comandos CLI):
   ====================
    config system fortiguard
      set update-ffdb [enable | desable]
      next
    end
   ====================
   Una vez se deshabiliten las actualizaciones de ISDB, las actualizaciones agendadas de FortiGuard no actualizarán ISDB.
   **Por defecto las actualizaciones ISDB estan habilitadas.

   Agendado.

   Agendar permite agregar un elemento de tiempo a una politica, solo puede ser configurado y usado en un tiempo de 24hrs, por lo tanto
   las politicas unicamente son aplicadas en un tiempo en especifico y en un día en especifico.
    -- Recurrencia: Si se selecciona un tiempo menor en la sección de stop, que en la sección de start, la regla iniciara el día
                    seleccionado sin embargo terminara hasta el día siguiente en la hora seleccionada, si el tiempo de inicio y paro
                    son las mismas, la regla se ejecutara por 24hrs.
    -- One-time: Solo ocurre una vez, se puede habilitar "Pre-Expiration event log", el cual genera un log de eventos N días después
                de que el tiempo de agendado expire, donde N puede ser desde 1 hasta 100 días.

    Coincidencia por servicio.

    Otro servicio que utiliza FortiGate para la coincidencia en politicas es el servicio de paquetes.
    El servicio determina la coincidencia de transmicion de protocolo (UDP, TCP, etc) y numero de puerto.
    Puede ser predefinido o personalizado, todos las coindicencias todos los puertos y todos los protocolos.
    Por defecto los servicios estan agrupados juntos en categorías para simplificar su administración, si los servicios predefinidos
    no concuerdan con las necesidades se pueden crear uno o más servicios, grupos de servicios y/o categorias.

    Configurando las Politicas del firewall.
    Cuando se estan configurando las politicas de firewall se debe de tener en cuenta que se debe de especificar un nombre unico por
    cada policita de firewall, ya que así esta habilitado por defecto sin embargo esta opción se puede volver opcional desde CLI.
    Desde la GUI en la opción de Visiblidad de Caracteristicas se habilita la opción de "Habilitar Politicas sin Nombre".
    Si se crea una politica sin nombre desde el CLI y se modifica desde la GUI, se necesitará especificar un nombre unico.
    Algunas de las opciones que se pueden seleccionar en la politica del firewall son:
      Opciones de firewall y red, perfiles de seguridad, opciones de acceso, habilitar o deshabilitar politica.
    Cuando se crea una politica u objeto firewall, se añade un identificador universal unico (UUID Unique universal identifier)

    Perfiles de seguridad.

    Las politicas de seguridad inspeccionan cada paquete de un flujo de trafico donde la sesión ya se ha condicionado a ser aceptada por
    la politica del firewall.
    Cuando el flujo de trafico es inspeccionado se pueden utilziar uno de dos metodo:
        -- Basado en flujo.
        -- Basado en proxy.
    Las politicas de seguridad limitan el acceso a redes configuradas.
    Los perfiles de seguridad son configurados en las politicas del firewall para proteger la red de:
        -- Bloqueo de amenzas.
        -- Controlando el acceso de ciertas aplicaciones y URLs
        -- Previniendo que información especifica deje la red.
    Por defecto Filtro de video, VOIP y WAF (Web Application Firewall) no estan habilitados en las opciones del perfil de seguridad desde
    el GUI, para esto se requieren habilitar en la pagina de Visibilidad de Caracteristicas.

    Inicios de Sesion.

    Por defecto cuando se habilita la opción de inicio de sesion en la politica, FortiGate genera un log de trafico después de que una
    politica de firewall cierra una sesión de una IP, esta opción por defecto es "Log Allowed Traffic", y esta unicamente registrará
    eventos de seguridad, sin embargo se puede seleccionar "All Sessions".
    Cuando se habilita la opción "Generate Logs When Session Starts", Fortigate crea un log de trafico cuando la sesión inica, Sin
    embargo FortiGate crea un segundo registro de la misma sesión cuando se cierra, pero cabe destacar que mientras se incrementa
    los inicios de sesión se disminuye el rendimiento, se recomienda utilizar unicamente cuando sea necesario.
    Para reducir el numero de mensajes de registro generados y mejorar el rendimiento, se puede habilitar las entradas de tabla de
    sesiones de trafico rechazado. esto permite que el FortiGate no tenga que revisar las politicas por cada paquete que coincide con
    una sesión rechazada, reduciendo así el consumo de CPU y la generación de logs.
    ===============================

    config system setting
        set ses-denied-traffic [disable | enable]
    end
    config system global
        set block-session-timer <1-300>
    end

    ===============================
    Por defecto el tiempo de bloqueo de una sesion esta con un valor de 30 segundos.
    Si la opción "Generate Logs when de session Starts" no se muestra en el GUI, singifica que el FortiGate no cuenta con almacenamiento
    interno.

    Formadores de trafico (Traffic Shappers).

    Se pueden configurar dos tipos de formadores de trafico: Compartido y por IP.
    Los formadores de trafico aplican el total de ancho de banda para todo el trafico usado en el formador.
    El alcance puede se por politica o por todas las politicas que hagan referencia a ese formador.
    FortiGate permite crear tres tipos de formadores de trafico:
      -- formado compartido de politicas: La administración de ancho de banda de las politicas de seguridad.
      -- Formado por IP: El ancho de banda se administra por usuario de direccion IP.
      -- Formado por Control de aplicacion: El ancho de banda se administra por aplicacion.
    Cuando se crean formado de trafico por politica, se debe asegurarse que se cumplen los criterios tal como se definio en la politica
    del firewall en la que se quiere aplicar el formado.

    Consolidando la configuración IPv4 e IPv6.

    Por defecto, las politicas IPv4 e IPv6 estan combinadas en una sola politica, se puede compartir la interfaz de entrada, la de salida
    Agendado y servicio.
    Sin embargo existe la posibilidad de configurar en las politicas del firewall, unicamente IPv4 o IPv6, sin embargo si se desea
    combinar IPv4 e IPv6, se deben de seleccionar ambas direcciones en el Origen y en el Destino, las versiones deben coincidir en la
    politica, tanto en la entrada como en la salida.
    NOTA: por defecto la IPv6 no esta visible on la tabla de politica desde el GUI, esto debe de habilitarse en la pagina visibilidad de
      Caracteristicas.

    Administrando politicas.

    Lista de politica (Interfaz de vista por par y por secuencia).

    Las politivas de firewall aprecen en una lista organizada, la cual esta organizada por pares o por secuencia, usualmente la lista
    se visualiza por pares, sin embargo el cambio entre visualizaciones se puede seleccionar desde el inicio de esta misma pagina.
      -- Visualizacion por pares de interfaces: Lista las politicas por pares de interfaces de ingreso y egreso (o Zona)
      -- Por secuencia: Si la politica esta creada usando multiples interfaces de origen y destino, o cualquier interfaz.

    NOTA: Se puede facilitar la identificacion de las interfaces asignandoles un alias, editando la interfaz desde la pagina de "Network"

    Estatus de las politicas en tiempo real.

    Esta caracteristica es importante si se desea visualizar el uso de alguna politica, muestra, ultimo uso, primer uso, conteo de hits,
    sesiones activas, etc.

    NOTA: Un hit se refiere a la cantidad de veces que una politica es aplicada de forma correcta.

    ID de Politca.

    Las politicas trabajan por orden de presedencia, en pocas palabras, el como un FiFo.
    Por defecto los ID de las politicas cuando se muestran en el GUI, no muestran su ID, sin embargo esto se puede configurar añadiendo
    la columna de ID de politica usando la tabla de Configuraciones.
    FortiGate asigna de forma automatica el Id cuando tu creas una nueva politica desde GUI, el ID de la politica nunca cambia, incluso
    si se cambia su orden de secuencia.
    Si se habilita "Policy Advanced Options" se puede asignar de forma manual el Id de la politica, sin embargo esta opción se debe de
    habilitar desde la pagina de visualizacion de caracteristicas ya que no se encuentra visible por defecto.

    Simplificando Grupos de direccions o servicios.

    Se puede simplificar la administración, con la agrupación de servicios y objetos de direcciones, una vez creadas estas agrupaciones
    se pueden asignar en las politcias de firwall en lugar de multiples objetos cada vez o haciendo multiples politicas.
    Esta opción se ingresa desde "Policy & Objects" y luego "Firewall Policy".

    Uso de Objetos.

    Cabe resaltar que cuando se esta utilizando un objeto este no se puede eliminar.
    En la pagina de configuración del objeto se utiliza una columna de referencia, en esta se muestra un numero, este indica el numero
    de lugares en el que este objeto esta siendo referenciado, este es un link en el que al dar clic se mostraran cuales objetos estan
    utilizandolo.

    Mejores practicas:
      -- Probar las politicas en una ventana de mantenimiento antes de desplegarlas en producción.
          -- Probar las politicas para algunas IPs, Usuarios, etc.
      -- Tener cuidado cuando se edita, deshabilita o eliminan politicas del firewall y objetos.
          -- Los cambios se guardan y activan de forma inmediata.
          -- Reinicia las sesiones activas.
      -- Crear pioliticas de firewall que coincidan lo mas especifico posible.
          -- Usar las subredes adecuadas para los objetos de direcciones.
      -- Analiza y habilita configuraciones apropiadas basados por politicas.
          -- Perfiles de seguridad.
          -- Configuraciones de Acceso.
    Para ajustar la prioridad de la politicas del firewall desde el GUI, se realiza mediante drag and drop sobre las politicas que se
    desean reorganizar.

    Combinando politicas de firewall.

    Con la finalidad de optimizar y consolidar las politicas del firewall es necesario siempre mantener todas las opciones configuradas.
    Para poder combinar politicas de firewall se tiene que revisar:
      -- Interfaces de origen y destino.
      -- Direcciones de origen y destino.
      -- Servicios.
      -- Agendados.
      -- Perfiles de seguridad.
      -- Accesos.
      -- Reglas de NAT.

    Buscar Politicas (GUI).

    Se pueden encontrar politicas que coincidan, para ello se utiliza "Policy Lookup" que se encuentra dentro de
    "Policy & Objects -> Firewall Policy", para poder realizar la busqueda se debe de considerar lo siguiente:

      -- Identificar la coincidencia de la politica sin trafico real.
          -- No genera ningún paquete.
      -- Buscar basado en la coindicencia de la politica en el criterio de entrada.
          -- Origen de la interfaz.
          -- Protocolo.
            -- Requiere un criterio de entrada más granular.
          -- Origen de la direccion IP,
          -- Destino IP/FQDN.
      -- Revisión de busqueda de politica.
        -- Renevio de ruta inversa. (Reverse Path Forward RPF).
        -- NAT destino, si la ip virtual coincide.
        -- Ruta de busqueda, para resolver a la interfaz de destino.

*/
