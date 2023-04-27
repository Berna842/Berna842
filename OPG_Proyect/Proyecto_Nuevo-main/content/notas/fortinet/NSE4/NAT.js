/*

NAT Network Address Translation.

  NAT and PAT.

  NAT usualmente es implementada para una o la combinación de las siguientes razones:
    -- Mejorar la seguridad: Las direcciones detras de un dispositivo NAT estan virtualmente ocultas.
    -- Amplificacion de direcciones: Cientos de computadoras pueden usar una sola IP pública.
    -- Estabilidad de direcciones internas: Las direcciones pueden estar en el mismo segmento, incluso si el proveedor de internet cambia.

  NAT y PAT tambien es conocido com NAPT, en FortiOS el NAT y la redireccion de trafico son aplicadas en la misma politica, sin
  embargo en el diagnostico NAT y la redireccion de trafico son acciones separadas.

  NAT
    -- Cambia la capa de dirección IP de un paquete.
      -- Algunos protocolos, coomo SIP, tienen direcciones en la capa de aplicacion, requieren ayudantes de sesion o proxies.
    -- Origen NAT (SNAT)
    -- Destino NAT (DNAT)
  PAT (Sobrecarga de NAT)
    -- Mapa de multiples direcciones IPv4  privadas para una sola dirección IP pública utilizando diferentes puertos.
  NAT64
    -- Un mecanismo que permite direcciones IPv6 para comunicarse con host que tienen direcciones IPv4 y visiceversa.
  NAT66
    -- NAT entre dos redes IPv6

  Modos de configuración para NAT.
    -- Politica Firewall NAT.
        -- SNAT usa las direcciones de las interfaces de salida o las Pools de IPs configuradas.
        -- DNAT usa las configuraciones VIP (Virtual IP) como direcciones de destino.
    -- Central NAT.
        -- Las configuraciones SNAT y DNAT son realizadas por dominio virtual (VDOM).
        -- Debido a que son configuraciones por VDOM es que es posible aplicarse a multiples politicas, basados en reglas SNAT y DNAT.
          -- Las reglas SNAT son configuradas desde la politica centra SNAT.
          -- DNAT es configurado desde DNAT y VIPs.

  Las politicas NAT de Firewall son sugeridas para despligues que incluyen algunas direcciones IP NAT y cada una de las direcciones IP
  tienen politicas y perfiles de seguridad separados.
  La central NAT es sugerida para escenarios más complejos donde multiples direcciones IP NAT tienen perfiles y politicas de seguridad
  identicos.

  Existen dos formas de configurar las politicas SNAT del firewall:
    -- Utilizando las interfaces de direcciones de salida.
    -- Utilizando una pool de IPs.
  Con el arreglo de puertos si dos o más connexiones requieren el mismo puerto para una sola dirección IP, solo una puede establecer
  conexión.

  Pools de IPs.
  Con las Pool de direcciones IP se define una sola IP o un rango de direcciones IP para ser usadas como el origen de la direccion IP
  para la duración de la sesión.
  Las pools estan usualmente configuradas en el mismo rango de las direcciones de la interfaz.
  Existen cuatro tipos de pools de IPs:
    -- Sobracargada (Overload)[Por defecto].
    -- Uno a uno.
    -- Rango de puertos asignados.
    -- Bloque de puertos asignados.
  NOTA: A mayor numero de IPs en la Pool, mayor número de conexiones que puede soportar.

  PAT (Port Address Translation): Funciona igual que un socket de un servicio, para poder soportar multiples conexiones atravez de un
  mismo puerto, internamente se utilizan diferentes puerto.

  El arreglo de rango de puertos, asocia un rango de IPs interno con una rango de IPs externo.
  La asignación de bloque de puertos, asigna un tamaño de bloque y un host para cada rango de direcciones IPs externas, el usuario
  necesita definir un tamaño de bloque, un bloque por usuario y un rango de IPs externas, existen dos formas de configurar los bloques:
    -- Usando un pequeño bloque de 64 y un bloque:
        -- hping --faster -p x -S X.X.X.X
    -- Usando el tipo sobrecargados:
        -- hping --faster -p x -S X.X.X.
  VIPs (Virtual IPs):
  Las VIPs por defecto son tipo NAT estaticas, que pueden estar restringidas a redirigir ciertos puertos , Son Objetos DNA, desde la linea
  de comandos se pueden especificar load-balance o server-load-balance.
  En load-balance se distribuyen las conexiones para una direccion externa IP a multplies direcciones internas, En el server-load-balance
  provee una sesión persistente y revisa la disponibilidad de los mecanismos.
  Las VIPs deben de ser roteables para las interfaces externas para el trafico de retorno.

  Coincidencia de politicas (VIP):

  En FortiOS VIPs y objetos de direcciones de Firewall son completamente diferentes, sin embargo cabe destacar que su
  comportamiento por defecto, es no bloquear las conexiones de ingreso-egreso, incluso si la politica esta al inicio de la lista.
  Por lo dicho anterior si se tiene una politica de permisividad para todos los objetos de direcciones del firewall y una denegación por
  parte de los objetos VIP, esta segunda no sera considerada, para poder resolver esto existen dos formas:
    -- Habilitando la coincidencia VIP en la politica de denegación (set match-vip enable).
      NOTA: La opción anteriormente mencionada esta unicamente disponible si la acción de la politica es negar.
    -- Habilitando la dirección de destino como un objeto VIP (set dstaddr "VIP object").

  NAT Central:
  Por defecto la NAT central esta deshabilitada, y solo se puede habilitar o deshabilitar desde CLI:
    ======
      config system settings
        set central-nat {enable \ disable}
      end
    ======
  Una vez habilitado dos opciones serán visibles desde la interfaz grafica:
    -- Central SNAT.
    -- DNAT & Virtual IPs.
  Esta opción es obligatoria para los NGFW (New Generation Firewall), esto quiere decir que su comportamiento sera acorde con las
  configureciones de NAT que se encuetran en "Policy & Objetcts -> Central SNAT".

  Las configuraciones SNAT (Source NAT), cambian cuando se habilita la NAT central, esto para poder tener un control más granular
  pudiendo asi definir los criterios de coincidencia basados en:
    -- Interfaz de origen.
    -- Interfaz de destino.
    -- Dirección de Origen.
    -- Protocolo.
    -- Puerto de origen. (La mayoria de protocolos no necesitan esto)
  Las reglras se procesan de inicio a fin.
  Si no se existe una regla de central SNAT, el NAT no sera aplicado.

  DNAT (Destination NAT) central y VIPS.
  En el momento que se crea una VIP, una regla es creada en el Kernel que permite a DNAT ocurrir.
  Se puede excluir unna VIP cambiando su estatus a deshabilitado desde CLI, se puede manejar de forma sencilla cuando central NAT esta
  habilitado.
  Si se deshabilita el central NAT y existen configuraciones SNAT y DNAT ocurre lo siguiente:
    -- El trafico saliente SNAT no sera procesado.
    -- El trafico entrante que anteriormente estaba configurado con DNAT y las VIPs dejara de funcionar por que no existe una regla
      presenten el Kernel para DNAT.

  Ayudantes de Sesion. (Session Helpers).
  Algunos tipos de trafico requieren mas especificaciones en la modificaciones del paquete para el trabajo de ala aplicación, algunos
  ejemplos son:
    -- Para el manejo de modo de conexiones activas, el control de la conexión es separado de la información de la conexión.
    -- Las cabeceras reescritas en las cargas de SIP SDP requeridas por las acciones de NAT.
  Para visualizar los ayudantes de sesión condigurados desde CLI se utiliza el siguiente comando:
    -- show system session-helper
  ALG(Application Layer Gateway).
    -- Cuando es más alcanzado el trazado de la aplicación y el control es requerido, un ALG puede ser utilizado, un ejemplo de ello
    es el perfil de VOIP.

  Sesiones.
  La sesiones se pueden visualizar desde la interfaz grafica de fortigate, sin embargo desde la linea de comandos se brinda más
  información.
  Si el servidor cuenta con un procesador de seguridad, diseñado para acelear el procesamiento sin aumentar la carga del CPU, la
  infrmación de la tabla de sesiones es posible no sea congruente.
  Las sesiones son rastreadas en la tabla de sesiones en el Kernel, esta tabla almacenca la siguiente información:
    -- La dirección de origen y destino, pares de números de puerto, estado y timeout.
    -- Las interfaces de origen y destino.
    -- Las acciones NAT de origen y destino.
  Adicional a la información anterior tambien almacena las siguientes metricas de rendimiento:
    -- Sesiones de concurrencia Maximas.
    -- Sesiones nuevas por segundo.
  Tiempos de vida de las sesiones (Sessions TTL).
  Cuando la tabla esta llena de sesiones, el rendimiento mejorara si se reduce el tiempo de vida de las sesiones, teniendo cuidado
  en no cerrar la sesión demasiado temprano.
  Esto se puede editar desde "Firewall Services -> Firewall Policies -> Global Sessions".
    Diagnostico de sesiones del Firewall.
    El comando [diagnose sys session] provee tres opciones, limpiar, filtrar o mostrar la lista de sesiones.
      -- Para listar sesiones activas se utiliza [get system session list]
      -- Para limpiar filtros anteriores [diagnose sys session filter clear]
      -- Para ingresar un filtro se utiliza [diagonse sys session filter X]
        -- dport (Destination port)
        -- dst (Destination IP)
        -- policy (Policy ID)
        -- sport (Source Port)
        -- src (Source IP address)
      -- Listar todas las entradas con base al filtro condigurado: [diagonse sys session list]
      -- Purgar todas las entradas que coincidan con el filtro configurado: [diagnose sys session clear]

    Las sesiones cuentan con diferentes estados, estos estan conformados por dos digitos, el primero indica el estado del servidor,
    mientras que el segundo el estado del cliente.
      -- Del lado del servidor:
        -- 0 Si no hay inspeccion.
        -- 1 Si existe proxy o flujo.
      -- Del lado del ciente:
          value | TCP State     | Expire time sec
        -- 0    | None          | 10
        -- 1    | Established   | 3600
        -- 2    | SYN_SENT      | 120
        -- 3    | SYN & SYN/ACK | 60
        -- 4    | FIN_WAIT      | 120
        -- 5    | TIME_WAIT     | 1
        -- 6    | CLOSE         | 10
        -- 7    | CLOSE_WAIT    | 120
        -- 8    | LAST_ACK      | 30
        -- 9    | LISTEN        | 120
      ICMP y UDP no cuentan con estados, sin embargo fortigate utiliza dos valores de estados:
        -- UDP Trafic de un solo sentido
        -- UDP trafico ambos sentidos
        -- ICMP proto_state siempre se encuentra en 00.

      Errores comunes:
      NAT Port Exhaustation: si en los logs se muestra un estatus failure y un msg "NAT port is Exhausted", esto significa que el NAT no
      puede asignar mas puertos para generar nuevas sesiones NAT.
      Carrier-Grade NNAT: Permite controlar las conexiones TCP y UDP atravez de una cuota de conexión (Traffic Shaping).
                          Tambien es posible controlar la cuota del puerto en una Pool de rango de puertos (IP pools).
      Para monitorear las sesiones NAT: [diagnose firewall ippool-all list], Lista todas las pools configuradas de IPs NAT con los rangos
                                        y tipos.

*/
