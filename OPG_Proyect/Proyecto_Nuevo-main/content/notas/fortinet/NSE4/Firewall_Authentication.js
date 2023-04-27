/*

  Firewall Authentication.

  Despues de que un usuario se identifica en fortigate, este mismo aplica politicas y perfiles que permiten o niegan el acceso a
  determinados recursos de red.
  Algunos metodos de autenticación son:
    -- Autenticación local de contraseñas (Almacenados en el fortigate).
    -- Autenticación de contraseña basada en servidor(Almacenados en POP3, RADIUS, LDAP, TACACS+server).
    -- Autenticación de dos factores(Requiere algo que sabes y algo que tienes[Token o certificado]).

  One-Time Passwords (OTPs).
  Los metodos de entrega de los OTPs incluyen:
    -- FortiToken 200 o FortiToken Mobil.
    -- Email o SMS.
    -- FortiToken mobile push.

  Para la generación de los OTP se requiere de:
    -- Una semilla: Unica, número generado de forma aleatoria que no cambia con el transcruso del tiempo.
    -- El tiempo: Ubntenido por el reloj interno.

  Para asignar un Forti token a un usuario, se realiza desde [User & Authentication -> FortiTokens]
  La autenticación activa es cuando al usuario se le muestra una ventana de login, para ingresar sus credenciales de acceso de forma
  manual, mientras que la autenticación pasiva no presenta esta ventana.

  LDAP.
  Es una protocolo de aplicación para acceder y mantener directorios distribuidos en los servicios de información.
  LDAP tiene una estructura similar a un arbol que contiene entradas(objetos) en cada una de sus ramas, cada entrada tiene un ID
  unico el nombre distinguible(DN), cada DN tiene atributos, cada atributo tiene un nombre y uno o más valores, cada atributo
  es definido en el esquema del directorio.
  Las hojas son objetos al final de una rama y no tienen objetos subordinados.
  Para configurar LDAP server en fortigate se debe de navegar [User & Authentication > LDAP Servers].
  Desde la linea de comandos de Fortigate se utiliza el siguiente comando para probar el LDAP:
    -- diagnose test authserver ldap <server_name> <username> <password>

  RADIUS.
  Es un protocolo estandar que provee servicios AAA.
  Las peticiones que se manejan son:
    Desde el cliente:
      -- Access-Request.
    Desde el servidor:
      -- Access-Acept
      -- Access-Reject
      -- Access-Challenge
  Para activar RADIUS en fortigate se realiza desde [ User & Authentication -> RADIUS Server ]
  Para realizar pruebas de conexión RADIUS se utiliza el siguiente comando:
    -- diagnose test authserver radius <server_name> <scheme> <user> <password>

  Tipos de Grupos de Usuarios
  Existen 4 tipos de grupos de usuarios:
    -- Firewall Provee acceso a las politicas del firewall que requieren autenticación.
    -- Visitantes (Guest) Contiene cuentas temporales y normalmente son usados para acceso a redes inalambricas, se pueden crear usuarios
      administradores de invitados, para crear o administrar unicamente cuentas de usuarios invitados.
    -- FSSO (Fortinet single sign-on).
    -- RSSO (RADIUS single sign-on).
  Para la configuración de grupos de usuarios se debe navegar [ User & Authentication -> User Groups ], desde aqui se pueden
  añadir usuarios al grupo o bien servidores preconfigurados al grupo, pudiendo especificar grupos como han sido definidos en el servidor
  LDAP.

  Politicas de Firewall.
  Las politicas del firewall pueden utilizar objetos tales como usuario y grupos de usuarios, para definir el origen, estos objetos
  incluyen:
    -- Cuentas de firewall locales.
    -- Cuentas de servidor Externas (remotas).
    -- usuarios PKI (certificado)
    -- usuarios FSSO.
  El servicio DNS puede estar habilitado incluso si el usuario no se ha autenticado.
    -- La resolución de hostname es comunmente requerido por la capa de protocolo de aplicación que se utiliza para autenticarse.
    -- El servicio DNE debe de estar explicitamente listado como servicio en la politica.
  Para la revisión de las politicas se debe navegar [ Policies & Objetcts -> Firewall Policy].
  NOTA:
    En la politica del firewall debe de estar habilitado el protocolo para que se muestre el dialogo de autenticación en la autenticación
    activa, los protocolos que permiten esto son:
      -- HTTP
      -- HTTPS
      -- FTP
      -- Telnet
    El resto de servicios no estan permitidos hasta que el usuario se autentique de forma correcta atravez de algun protocolo listado.
  NOTA 2:
    Habilitar la autenticación en una politica no siempre fuerza a que exista una ventana activa de autenticación.
  Cuando en una politica se utilizan la autenticación pasiva y activa, la autenticación activa unicamente se utiliza de respaldo, es
  decir cuando Fortigate no pueda determinar por medio de la autenticación pasiva la identidad de un usuario.
  Desde CLI es posible habilitar la petición de acceso en el caso de la autenticación activa, con el comando:
    -- set auth-on-demand [always | implicit].
  Cuando se habilita un portal cautivo, todos los usuarios les mostrara la ventana de autenticación antes de que puedan acceder a
  cualquier recurso.
  Solo los metodos de autenticación activos pueden utilizar el portal cautivo, el cual puede estar almacenados de forma local en
  el Fortigate o bien el servidor de autenticación externo.
  El proceso para configurar un portal cautivo, puede ser desde [ Network -> Interfaces] o bien desde [WiFi & Switch Controller -> SSIDs]
  Desde la sección de Red, se puede restringir el acceso a usuarios al portal cautivo, por lo que solo los usuarios debajo de la
  configuración de Control de admición, en el caso que se seleccione permitir todos, cualquiera de los grupos configurados en las
  politicas del firewall pueden autenticarse para poder acceder a los recursos.
  Existen dos formas de filtrar el portal cautivo:
    -- Por una lista de extensión en el GUI o CLI
    -- Atravez de una politica de firewall.
  Adicionalmente se puede habilitar el aviso de terminos de servicio, al habilitarlo el usuario debe de aceptarlo antes de proceder
  [config firewall policy -> set disclaimer enable].
  Para poder editar los avisos se debe de navegar [ System -> Replacement Messages ], estos se editan mediante la vista extendida,
  estos avisos pueden editar el testo, pueden añadir imagenes o editar mensajes HTML.

  La configuración de Timeout en la autenticación indica cuanto tiempo el usuario debe de esperar para volverse autenticar, por defecto
  se encuentra configurado a 5 minutos.
  Esta opción tiene 3 formas de comportamiento:
    -- Idle(por defecto):No existe el trafico para esa sección de tiempo.
    -- Hard: requere autenticación expresa después de ese tiempo, a menos de que exista actividad.
    -- New Session: Requiere autenticación expresa si no se ha creado una nueva sesión en ese lapso de tiempo.

  Comandos CLI:
    -- diagnose firewall auth list
      Muetra los usuarios autenticados, grupos asociados y sus direcciones IPs.
    -- diagnose firewall auth clear
      Limpia todos los usuarios autorizados de una lista actual.
    -- diagonse debug application fnbamd -1
      Utiliza revisión de problemas de autenticación activa( se usa en conjunto con [diagnose debug enable])
    -- diagnose test  authserver radius-direct <ip> <port> <secret>
      Prueba la llave precompartida entre el Fortigate y el servidor RADIUS.
    -- diagonse test authserver ldap <server_name> <username> <password>
      Prueba la autenticación de una cuenta LDAP de usuario en especifico.

*/
