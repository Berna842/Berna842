/*

Se puede controlar y restringir el acceso administrativo usando los siguientes metodos:
  -- Perfiles administrativos: Determinan el nivel de acceso, privilegios concedidos.
  -- Hosts Permitidos: Determina desde donde se puede establecer una conexión.
  -- ADOMs: Determina cuales dispositivos, el administrador tendra acceso a visualizar y administrar sus
    registros.

Perfiles Administrativos
  NOTA: Nunca se debe de otorgar más permisos de los necesarios a los administradores para cumplir su rol.
  Por defecto existen 4 perfiles:
    -- Super_User, Posee acceso a todos los dispositivos y privilegios del sistema.
    -- Standard_User, Cuenta con permisos de lectura y escritura para los dispositivos, pero no cuenta con
      privilegios de sistema.
    -- Restricted_User, Provee solo permisos de lectura a los dispositivos, además de remover el acceso a
      las extensiones de administración.
    -- No_Permissions_User, Niega los permisos de sistema o de dispositivos, puede usarse para remover
      temporalmente el acceso otorgado a los administradores existentes.
  Se pueden modificar y crear nuevos perfiles como se requieran, para esto se debe de navegar atravez de la
  opción [System Settings -> Admin -> Profile]

Hosts Permitidos.
  Los hosts permitidos restringen el acceso para IPs especificas o subredes.
  Se pueden configurar arriba de 10 IPv4 e IPv6 en los hosts permitidos.
  Esta configuración aplica directamente tanto en CLI como en GUI.(Siempre y cuando exista el acceso por SSH)

Control de acceso por medio de ADOMs.
  Esta configuración permite administrar de forma mas eficiente ya que a los administradores les permite
  la administración y monitoreo de dispositivos unicamente asignados a sus ADOMs, incrementando la
  seguridad de la red y haciendo que la administración de los dispositivos sea más eficiente.
  Los administradores con perfil Super_User tienen acceso completo a la información del sistema y a todos
  los ADOMs.

Autenticación Externa para administradores.
  Se pueden configurar servidores externos para validar los accesos de administrador, utilizando RADIUS, LDAP,
  TACACS+ y PKI (Se deben de configurar las entradas del servidor por cada servidor de autenticación que
  exista en la red)
  Se puede utilizar la opción "Match all users on remote server", para habilitar el acceso a los administradores
  por medio de las credenciales del servidor de autenticación remoto.
  Tambien es posible configurar grupos de autenticación en la lista tipo de administrador.
  Esto puede ser configurado atravez de [System Settings -> Admin -> Administrators] y
  [System Settings -> Admin -> Remote Authentication Server]

Autenticación en Dos pasos.
  En FortiAnalizer los pasos a seguir para configurar son:
  1) Crear un servidor RADIUS que apunte a un FortiAuthenticator
  [System Settings -> Admin -> Remote Authentication Server]
  2) Crear una cuenta de administrador que apunte al servidor RADIUS
  [System Settings -> Admin -> Administrators]

SLAM Admin Authentication.
  FortiAnalizer soporta SLAM, este puede ser habilitado atravez de todos los dispositivos de Security Fabric
  Permite un movimiento suava entre dispositivos para administrador (SSO), FortiAnalizer puede ser el
  proveedor de Identidad (IdP) o el proveedor de servicio (SP).

Monitoreo del estatus de acceso del administrador.
  Esta opción permite visualizar a los administradores actualmente logeados, por defecto esta opción solo
  es accesible paa usuarios con perfil de Super_User.
  Para acceder a esta visualización es atravez de [System Settings -> Admin -> Administrators]
  Para visualizar los registros de eventos incluyendo la actividad de los administradores, se ingrea a
  [System Settings -> Event Logs]
  Para visualizar las tareas que los administradores se encuentran realizando se utiliza la herramienta
  [System Settings -> Task Monitor]
  Tambien existe la herramienta para visualizar intentos de logins fallidos, accesos de administrador y
  actividad de sistema [FortiView -> System -> Failed Authentication Attempts], para monitorear la
  actividad del sistema [FortiView -> System -> System Events]

FortiAnalizer soporta HA, lo cual provee las siguientes caracteristicas:
  -- Provee redundanca en tiempo real, lo que significa que  si el dispositivo principal falla, otro
    dispositivo en el cluster es seleccionado como primario.
  -- Sincronización en los registros y la información de forma segura en los multiples dispositivos
    FortiAnalizer. El sistema y las configuraciones aplicadas en HA tambien son sincronizadas.
  -- Permite desahogar la carga en el dispositivo primario usando los dispositivos secundario para procesar,
    como por ejemplo los reportes en ejecución.
  Soporta como máximo 4 dispositivos FortiAnalizer en HA:
    -- Un dispositivo primario
    -- Tres dispositivos secundarios.
    NOTA: Todos los dispositivos en el cluster deben de tener el mismo FortiAnalizer y el mismo Firmware,
    así como ser visibles entre ellos atravez de la red, asi como correr el mismo modo de operación.
    No es necesario que compartan el mismo tamaño de almacenamiento, sin embargo es altamente recomendable
    Así mismo si se encuentran en ejecución como VM, estas deben de correr sobre la misma plataforma, es
    decir, no son compatibles si una VM de FortiAnalizer esta en ejecución en VMWare con uno en KVM.
    NOTA: El HA de FortiAnalizer unicamente puede ser implementado en redes donde esta permitido
    el Protocolo Redundante de Router Virtual (VRRP).
    Cuando se tienen diferentes licencias en los dispositivos en el cluster de HA, la licencia que
    permite el menor número de dispositivos es utilizada.

    Los modos de operación de FortiAnalizer son:
      -- Alta disponibilidad (Modo A-P)
      -- Standalone

    En caso de que el primer dispositivo de HA falle, la selección para el dispositivo primario
    disponible es:
      -- El dispositivo con mayor prioridad es seleccionado.
      -- Si se tienen dispositivos con la misma priorida, el dispositivo se elige en base a el número IP
        más alto.
      -- Si no existe un valor de IP de mayor grado y tampoco una prioridad mayor el remplazo del
        dispositivo primario no se realiza de forma automatica.
    Por defecto el unico parametro para determinar el cambio automatico es mediante el alcance de los
    miembros del cluster, sin embargo es posible revisar el estatus de la base de datos Postgres con
    los siguiente comandos:
      -- configure system ha
      -- set healthcheck DB
      -- end
    FortiAnalizer sincrina los registros en dos estados:
      -- Sincronización Inicial.
      -- Sincronización en tiempo real.
    FortiAnalizer sincroniza la configuración de los siguientes modulos:
      -- Device Manager
      -- Eventos e incidentes
      -- Reportes
      -- La mayoria de las configuraciones del sistema, tales como:
          -- Todos los ADOMs.
          -- Admin
          -- Certificados
          -- Reenvio de registros .
          -- Monitor de tareas.
          -- Servidor de correo.
          -- Servidor de Registro de sistema.

  Balanceo de Carga y Actualización de Firmware.
    FortiAnalizer soporta el balanceo de carga, mejorando el rendimiento de los siguientes modulos:
      -- Reportes
      -- FortiView
    Para actualizar el Firmware de un cluster FortiAnalizer en HA, se siguien los siguientes pasos:
      -- Ingresar en el dispositivo secundario.
      -- Actualizar todos los dispositivos secundarios.
      -- Esperar por la verificación y la completa actualización de todos los dispositivos secundarios
      -- Verificación de los registros de todos los dispositivos secundarios que son sincronizados con
        el dispositivo primario.
      -- Actualización del dispositivo primario.
  Monitoreo y solución de problemas de HA.
    Desde el Estatus de Cluster se puede monitorear los dispositivos que se encuentran en HA, desde este
    panel se muestra la siguiente información:
      -- Rol
      -- Número de Serial.
      -- IP
      -- Nombre de Host
      -- Uptime/Downtime
      -- Logs de sincronización inicial
      -- Configuración de sincronización.
      -- Mensaje
    Se pueden utilizar los siguientes comandos para diagnosticar el HA:
      diagnose ha status
      diagnose ha stats
      diagnose ha dump-datalog
      diagnose ha failover
      diagnose ha force-cfg-resync
      diagnose ha load-balance
      diagnose ha restart-init-sync

Administracióon de ADOMs.
  Habilitando ADOMs.
    Los ADOMs se pueden habilitar o deshabilitar tanto en GUI como en CLI, en el caso de realizarlo
    desde GUI se realiza desde [System Settings], desde CLI con el comando [config system global]
    El número de ADOMs máximo depende directamente del modelo de FortiAnalizer, y una vez habilitado
    se deben de seleccionar un ADOM para todos tus ADOMs configurados.

  Existen dos modos de Operación con VDOMs de FortiGate.
    -- Normal:
      No se puedem asignar VDOMs del mismo dispositivo FortiGate para multiples ADOMs de FortiAnalizer.
      Todos los VDOMs deben de ser asignados a un solo ADOM.
    -- Advanced:
      Se pueden asignar VDOMs del mismo FortiGate a multiples ADOMs FortiAnalizer
        Permite Utilizar las funciones FortiView, Event Management y Reportes para analizar la
        información de los VDOMs individuales.
    Para la selección del modo de operación se utiliza [System Settings -> Advanced -> Advanced Settings]
    Se pueden crear diferentes ADOMs para cubrir los requerimientos necesarios, el espacio en disco es
    configurado por ADOM no por dispositivo.
    NOTA: No se puede eliminar un ADOM personalizado, si algún dispositivo se encuentra asignado.
    Por defecto el espacio en disco permitido es de 50GB.

  FortiAnalizer con Security Fabric.
    FortiAnalizer soporta los ADOM de security Fabric, pueden contener todos los dispositivos del
    security fabric en el mismo ADOM.
    Los ADOMs de security Fabric permiten:
      -- Procesar la información rapidamente,
      -- Correlacionar registros.
    Los resultados combinados pueden ser presentados en:
      -- Reportes.
      -- FortiView
      -- Incidentes y Eventos/ FortiSoC.
      -- Administrador de dispositivos.
      -- LogView

  RAID para la protección de la información de registros.
    RAID es una solución de alto rendimiento para la solución del almacenamiento, permite crear un
    arreglo reduntante de discos independientes.
    Proporciona una copia redundante de la información de los registros, sin embargo esta opción
    no esta soportada para todos lo modelos.
    Para la creación del arreglo es necesario utilizar multiples discos del mismo tamaño en una
    unidad logica, Cabe destacar que el RAID no es un remplazo del sistema de respaldos, por lo
    que se recomienda mantener el sistema de respaldos además de emplear el arreglo RAID.

  Tipos de Operaciones en lo RAID:
    -- RAID básico:
      -- Espejo: Realiza una copia de la información en dos o más discos fisicos separados.
      -- Divición: Combina dos o más discos en un disco logico y almacena la información en trozo
        distrubuidos en todos los dispositivos.
    Los RAID pueden ser basados en Hardware o Software, el basado en Hardware, ya que este tien una
    tarjeta dedicada para las operaciones de almacenamiento, teniendo un mejor rendimiento
    Desde la página de Administrador de RAID se puede visualizar el estatus de cada disco RAID y el
    espacio en disco.
    Los estatus de los discos puede ser uno de los siguientes:
      -- Read.
      -- Rebuilding.
      -- Initializing
      -- Verifying
      -- Degraded
      -- Inoperable
    Para la visualización de fallos y de cambios en caliente se realiza desde la consola de alertas.
    [system Settings -> Dashborad -> Alert Message Console], se deben de corregir los discos dañados
    para mantener el rendimiento y disponibilidad del RAID.

    Desde la linea de comandos se puede visualizar el estatus del RIAD y de los discos con los
    siguientes comandos para FortiAnalizer basado en Hardware:
      -- diagnose system raid status
      -- diagnose system raid hwinfo
      -- diagnose system disk info
      -- diagnose system disk health
      -- diagnose system disk errors
      -- diagnose system disk attributes
    Para FortiAnalizer-VM, unicamente esta disponible el comando diagnose system usage 

*/
