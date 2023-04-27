/*

  Metodos de Registro de dispositivos.
    Se categorizan dos tipos de dispositivos:
      -- Registrados: dispositivos auutorizados para el almacenamiento de registros en el FortiAnalizer
      -- No registrados: dispositivos que solicitan almacenar los registros en FortiAnalizer
    Para registrar los equipos en el FortiAnalizer existen dos metodos:
      Metodo 1: Solicitando por un dispositivo soportado.
        1) El administrador de las peticiones de registro de los dispositivos soportados.
        2) El administrador de FortiAnalizer acepta o deniega la petición.
      Metodo 2: Usanndo el wizard de añadir dispositivos con numero de serial.
        1) El administrador utiliza el wizard para añadir dispositivo para añadirlo con base a su número
        de serial.
        2) si el dispositivo es soportado y los detalles son correcto, el dispositivo es añadido y
        registrado de forma automatica después de que la solicitud es enviada a este dispositivo
      Metodo 3 : utilizando el wizar de añadir dispositivo con una llave precompartida
        1 El administrador utiliza el wizard para añadir dispositivo para añadirlo con una llave
        pre-compartida.
        2) Después de que la llave pre-compartida es configurada en el dispositivo usando CLI, el
        dispositivo es añadido y registrado de forma automatica.
        3) Solo dispositivos FortiGate pueden ser añadidos con este metodo.
      Metodo 4: Autorización de Security Fabric.
        1) FortiAnalizer es condifurado con la autorización de Security Fabric.
        2) Cibfugyre el conector de FortiAnalizer con el FortiGate.
        3) Se solicita autorización desde el FortiGate en la ventana de autorización de Fortinet
        Security Fabric.
          -- El administrador del FortiGate debe de validar las credenciales de FortiAnalizer
        NOTA: Este metodo solo esta disponible coando tanto el FortiAnalizer y el FortiGate
          estan en una versión 7.0.1 o superior.
    Registro de dispositivos y ADOMs.
      Cada dispositivo puede ser registrado con un diminio administrativo, por defecto ADOMs no esta
      habilitado, los dispositivos FortiGate son automaticamente asignados al ADOM root.
      NOTA: Los dispositivos no-FortiGate, no pueden ser añadidos al FortiAnalizer sin antes haber
      habilitado los ADOMs.
      Hay dos formas de inizializar la solicitud desde los dispositivos FortiGate.
        Metodo 1: Solicitud desde un dispositivo soportado.
          1. Desde el administrador FortiGate se habilita el registro remoto para el FortiAnalizer
          2. Desde el Administrador FortiAnalizerse acepta o deniega la solicitud de registro.
            --> ADOMs -> Se puede añadir FortiGate al ADOM root o a un ADOM FortiGate personalizado.
      Habilitando desde Security Fabric el registro de FortiAnalizer esta activo por defecto.
      Configurando la IP en el FortiGate upstream todos los dispositivos FortiGate conectados al upstream
      FortiGate recibiran la configuración del FortiAnalizer. Todos los dispositivos conectados atravez
      del Security Fabric solicita registro en el FortiAnalizer
    Los registros que son almacenados son:
      -- Registros:
        -- Trafico.
        -- Evento
        -- Seguridad
      -- Archivos DLP
        -- Correo electronico
        -- IM
        -- Web Traffic
        -- FTP
        -- NNTP
      -- Cuarentena
        -- registros de cuarentena por dispositivo.
      -- Registro de Paquete IPS
        -- Registros del contenido de los paquetes de red que coincida con las firmas IPS

    Comandos básicos de CLI
      -- get system status (Visualiza el estatus actual del FortiAnalizer)
        -- Version
        -- Admin Domain Configuration
        -- Current Time
        -- Disk Usage
        -- License Status
      -- get system performance (Cuales son las estadisticas del rendimiento de FortiAnalizer)
      -- diagnose hardware info (Visualiza las estadisticas de hardware para el CPU, memoria, disco y RAID)
    NOTA: el requisito minimo de memoria para las VM de FortiAnalizer es de 8GB, recomendado
    Revisión de ADMOs y de dispositivo.
      -- diagnose test application oftpd 3 (Muestra que dispositivos e IPs estan conectados al FortiAnalizer)
      -- diagnose dvm adom list (Que ADOMs estan habilitados y configurados)
      -- diagnose dvm device list (Que dispositivos/VDOMs estan registrados o sin registrar)
    Comandos para la resolución de problemas de comunicación.
      -- Execute ping
      -- diagnose sniff package <interface> <filter> <level> <timestamp>
      -- show log FortiAnalizer setting
      -- diagnose log test
      -- diagnose debug application oftpd 8
    Cuandio FortiAnalizer no estra disponible FortiGate cuenta con un log de cache llamado miglogd, el cual
    almacena los registros hasta que vuelve a estar disponible FortiAnalizer, cuando el tamaño máximo del
    cache es alcanzado los registros se sobreescriben, empezando por el más antiguo.
      El buffer de cache esta orientado a solo almacenar los registros durante un tiempo aproximado de
      reinicio de FortiAnalizer, no esta previsto para largos cortes de comunicación.
    Los FortiGates con SSD permiten configurar el buffer de registros.
    Para visualizar las estadisticas del proceso miglogd se utiliza el comando [diagnose test application
    miglogd 6], el cual incluye el tamaño maximo de cache.
    Cuando el espacio en disco se encuentra en su maxima capacidad, un mensaje de alerta es generado de
    forma automatica en la consola de mensajes de alerta(System Settings -> Dashboard) con un registro de
    evento con nivel de advertencia.
    Se puede modificar el comportamiento por defecto de sobreescritura de registros viejos cuando el disco
    esta lleno, con el comando:
      [config system locallog disk settings
        set diskfull nolog]
    La cuota de disco incluye:
      -- Registros de archivos: Estos archivos estan compriidos en discos duros y fuera de linea.
      -- Registros Analiticos: Estos son registros almacenados e indices en una base de datos SQL y enlinea
    Se puede tener el uso del registro de discos, incluyendo el uso por cada ADOM, usando el comando
    [diagonse log device]
  La herramienta de información de licencia muestra valores menores que la cuota, solo muestra el número de
  registros enviados al FortiAnalizer en ese día, no incluyen los registros de archivos y tampoco las
  tablas SQL.
  La cuota reservado de disco.
    El sistema reserva de 5% a 20% del espacio en disco para el uso del sistema y la información inesperada
    de sobre flujo de cuota (Solo del 80% al 95% del disco esta disponible para los dispositivos)
    Tamaño en disco                 Reservado por la couta del disco sistema
    Pequeño(<500GB)                 20%
    Medio(500GB - 1000GB)           15%
    Grande(1000GB - 3000GB)         10%
    Muy Grande(3000GB - 5000GB)     5%
  Procesos usado para el reforzamiento de la cuota en disco:
    -- Logfile
    -- sqlplugind
    -- oftpd
  Para modificar la cuota de disco de un ADOM, se realiza desde [System Settings -> All ADOMs] o bien desde
  [System Settings -> Storage Info]

  Incrementando el espacio en disco.
  Cuando se ha virtualizado FortiAnalizer, se puede incrementar de forma dinamica el espacio en disco, para ello
  el primer paso es revisar la información disponible [execute lvm info], los pasos a seguir parea incrementar el
  disco son:
    1) Detener la maquina virtual de FortiAnalizer y añadir mas disco a la maquina virtual
    2) Reiniciar FortiAnalizer y ejecutar el comando [execute lvm info] para identificar el espacio en disco añadido
    3) Correr el comando [execute lvm extend <disk number>]
    4) Reiniciar eel FortiAnalizer y confirmar el nuevo espacio en disco [get system status]
  NOTA: Si se tiene un FortiAnalizer en hardware el aumento de disco se hace fisico añadiendo un slot adicional
  y en caso de RAID es necesario reconstruirlo.

  Se pueden mover dispositivos registrados entre ADOMs, sin embargo no es recomendable mover estos dispositivos
  a menos que sea estrictamente necesario hacerlo, por defecto esta administración esta restringida unicamente
  a usuarios con acceso Super_User.
  No es necesario crear nuevos ADOMs si se actualiza el Firmware de FortiGate, de igual forma no es necesario
  separar los ADOMs por la versión de FortiOs.
  Algunas consideraciones importantes a tomar en cuenta cuando se mueven los dispositivos entre ADMOs:
    --> Asegurarse de que existe espacio suficiente para los registros.
    --> En caso de que el dispositivo requiera registros analiticos es necesario reconstruir la base de datos
      del ADOM:
        [execute sqp-local rebuild-adom <new-ADOM-name>]
    --> En caso de que se requieran visualizar los registros analiticos del dispostivo del viejo adom, se debe de
      reconstruir la base de datos del viejo ADOM:
        [execute sql-local rebuild-adom <old-ADOM-name>]
  NOTA: Cuando se mueve un dispostivo, solo los registros de archivo son migrados, los registros analiticos se
  mantienen en el viejo ADOM hasta que se reconstruya la base de datos.

  En el caso de que se tengan un FortiGate en HA, FortiAnalizer lo detecta de forma automatica, si el cluster
  se añadio después de agregar el FortiAnalizer, es posible añadir el cluster de forma manual.
  Cada dispositivo del cluster HA, genera registros de forma independiente, separados por su numero de serial
  el dispositivo primario es el encargado de enviar todos los registros de otros dispositivos del cluster
  al FortiAnalizer, el cual distingue entre los dispositivos atravez del número de serial (en la cabeceras
  de los registros.)

*/
