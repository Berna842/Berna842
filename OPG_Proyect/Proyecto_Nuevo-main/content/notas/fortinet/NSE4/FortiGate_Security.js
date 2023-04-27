/*Seguridad de Fortigate*/

/*
Configuraciones iniciales y funciones para extender la seguridad de Fortigate.

los firewalls fueron diseñados para trabajar en entornos de multifase y multidispositivos y para desarrollar
diferentes funciones atraves de la red

Virtualizar Fortigate tiene las mismas caracteristicas que Fortigate fisico excepto por SPUs (Fortigate VM)
Fortigate VMX caracteristicas para VMware NSX-V (este-oeste).
Fortigate connexión para Cisco ACI (norte-sur)

FortiGate VM: es desplegado como una VM invitada en el Hypervisor
FortiGate VMX: es desplegado dentro de redes virtuales de un Hypervisor, entre maquinas invitadas VM.
FortiGate conexión para Cisco ACI: permite ACI para desplegar VMs FortiGate fisicas o virtuales para el
trafico norte-sur.

Todo el Hardware de aceleración ha sido renombrado Unidades de procesamiento  de seguridad (SPUs), esto
incluye procesadores NPx y CPx.

El procesador de contenido de fortinet (CP9) trabaja fuera del flujo de trafico proporcionando alta velocidad
en la ispección de contenido y criptografia.
además de proveer aceleración en tareas intensivas basadas en proxy como, desencriptación y encriptación
 de SSL y antivirus.

 Cuando se despliega un FortiGate, se tienen dos formas de trabajo, la forma NAT y la transparente:
--En el modo NAT, se rutean paquetes de capa 3 como un router, si la interfaz no cuenta con una IP FortiGate
FortiGate detecta la interfaz de salida basado en la dirección IP de destino y las entradas de las tablas de
IP

--En el modo transparente, FortiGate pasa los paquetes en capa 2, si la interfaz no cuenta con dirección IP
FortiGate identifica la interfaz de salida en la dirección MAC de destino, el dispositivo en modo transparante
utiliza una IP para administrar el trafico.

Cuando se trabaja en VDOM se puede configurar cada Virtual Domain en modo transparante o NAT, Por defecto
Los VDOMS estan deshabilitado exceptuando el root VDOM, adicional a esto por defecto los VDOMS estan
configurados como modo NAT.

NAT, Network Translation Address

Algunos de los servicios FortiGate se conectan a otros servicios como el FortiGuard, el FortiGuard actualiza
el FortiGate, con paquetes actualizados de inteligencia de amenzas.
FDN significa FortiGuard Distribution Network.
Los paquetes de actualización de FortiGuard antivirus e IPs:
    -- update.fortiguard.net
    --TCP Port 443 (SSL)
En este caso unicamente se descargan una vez al día y utilizan TCP para su confianza.
Consultas en vivo: FortiGuard web filtering, DNS Filtering and antispam
    -- service.fortiguard.net: Para protocolo UDP, puerto 53 o 8888
    -- securewf.fortiguard.net: Para HTTPS Sobre puerto 443, 53 o 8888
Se utiliza este protocolo UDP para mayor velocidad ya que se realizan las consultas en vivo para el analisis.

El servidor de FortiGuard utiliza el Online Certitifate Status Protocol (OCSP), así que el FortiGuard siempre
puede validar el certificado del servidor FortiGuard eficientemente, los servidores de FortiGuard, consultan
el CA cada 4hrs y actualiza el estatus del OCSP, si FortiGuard no puede resolver con OCSP mantiene el OSCP el
ultimo estatus por 7 días.

FortiGate aborta la conexión con FortiGuard si:
-- el CN en el certificado del servidor no concuerda con el nombre dominio resuelto desde el DNS.
-- el estatus del OCSP no tiene un estatus bueno.
-- el editor-CA es removido de la raiz-CA.

Metodos de administración del FortiGate son:
  -- GUI (HTTP ó HTTPS)
  -- CLI
En ambos metodos existen la mayoria de funcionalidades, expetuando que desde CLI no es posible visualizar
los reportes, mientras que del lado de GUI la mayoria de los comandos de administración de super usuarios
no estan disponibles.
Para conectarse a CLI, se puede realizar desde Consola, SSH ó por la herramienta de GUI llamada CLI Console
SNMP esta habilitado unicamente para lectura, no se puede usar para su administración básica.

Desde el CLI:
Para listar los comandos se utiliza "?", su uso es "<command set> ?".
Para poder revisar el estatus del FortiGate se utiliza [get system status]
Para poder ver todos los valores de los atributos de la interfaz del sistema
[show full-configuration system interface <port>]
Para revisar los valores de los atributos que no estan por defecto en la interfaz del sistema se utiliza:
[show system interface <port>]

Para crear usuarios se realiza de las siguientes formas:

-- System --> Create New --> Administrator --> Administrator --> Administrator Profile
                        --> Rest API Admin
-- Tambien se puede configurar FortiGate para que se conecte a un servidor remoto de autenticación.
-- En lugar de usar contrasaeñas se pueden utilizar certificados digitales editados por el servidor de
autoridad de certificación interna.

La especificación de permisios puede ser:
  -- Escritura y lectura.
  -- Lectura.
  -- Ninguna.
Por defecto existe un perfil especial llamado super_admin, que es usada por la cuenta admin, esto no se puede
cambiar.
El perfil prof_admin, es otro por defecto, que tambien provee acceso completo pero no como super_admin, esto
solo aplica en los dominios virtuales y no en las configuraciones globales, además de poder cambiar sus
permisos.

El tiempo de espera de Sobreescritura IDLE, permite administra el valor admintimeout, debajo de
[config system accprofile].
Dependiendo del perfil asignado a una cuenta administrador es lo que se podra visualizar y realizar en el
FortiGate, por ejemplo se puede crear un usario que solo pueda visualizar logs.
Los administradores tampoco podran acceder a las configuraciones globales fura de su VDOM asginado.
Los VDOMS son una forma de dividir los recursos y configuraciones de un solo FortiGate.
Los administradores con una porcion pequeña de permisos no podra crear nuevos usuario o incluso ver los
existentes de cuentas con mayores permisos.

Para poder restaurar la contraseña perdida de un FortiGate, se utiliza el usuario maintainer, el cual
cuenta con los siguientes datos de acceso:
-- user:  maintainer
  password: bcpn<Número de Serial> (Todas las letras del numero de serial deben ser Mayusculas)
Sin embargo solo fuciona este usuario bajo ciertas condiciones:
  -- Solo despues de un Hard power Cycle
  -- Solo durante los primeros 60 segundos tras el reinicio
  -- Solo atraves del puerto de consola del hardware.
Se puede deshabilitar este usuario, sin embargo si se deshabilita y se pierden los accesos se necesitará
restaurar de fabrica el FortiGate.

Para poder aumentar la seguridad del Fortigate se puede configurar el acceso atraves de una unica IP
de confianza, si alguna maquina con otra IP trata de acceder al usuario admin, le mostrara un mensaje de
error de acceso.
Por defecto esta configurado como 0.0.0.0/0, lo cual significa que se puede acceder desde cualquier IP.
Esto es bastante Utili cuando se utilizan VDOMs donde los VDOMs no pertenecerán a la misma organización.
Se tiene que tener cuidado con el NAT, ya que se puede configurar un el acceso para una IP de confianza
pero despues no poder acceder debido a que la IP de confianza esta siendo NATed a otra dirección IP

Adicionalmente se puede configurar los puertos de administración, utilizando solo protocolos seguros y
reforzando la complejidad de las contraseñas y cambios.
Tambien es posible configurar el las sesiones concurrentes, para evitar sobreecritura de configuraciones
de forma accidental.
El Idle Timeout especifica el número de minutos antes de que se la sesion de los administradores de un
timeout, sin embargo tambien se puede modificar este parametro por administrador atraves de
[Override Idle Timeout], por defecto el Idle timeout esta configurado a 5 minutos.

Se puede habilitar protocolos especificos de administración para cada puerto de forma independientes e
incluso protocolos especificos cuando el FortiGate es la IP de destino, tales como:
  -- Security Fabric connection:
      --> CAPWAP
      --> FortiTelemetry.
  -- FMG-Access
  -- FTM (FortiToken Mobil) (Soporta factor de doble autenticación)
  -- RADIUS Accounting.
Cuando se le asigna a una interfaz LAN o WAN para las interfaces apropiedas, FortiGate utiliza el protocolo
Link Layer Discovery Procol (LLDP), para detectar un enlace acendente FortiGate en la red.

Algunas funciones estan ocultas por defecto, por ejemplo el IPv6, que esten ocultas no significa que se
encuentren deshabilitadas, para poder visualizar las funciones ocultas se tiene que navegar:
  -- System --> Feature Visibility.

Cuando una interfaz se encuentra en modo NAT, no se puede utilizar a menos que se tenga una IP:
  --> Manualmente Asignada
  --> Automaticamente (DHCP ó PPPoE [Protocol point to point over Ethernet])

FortiGate utiliza FortiIPAM (Servicio de paga) para asignar de forma automatica IPs basado en la
configuración del tamaño de red, con la exepción de One-Arm Sniffer, solo se puede habilitar desde CLI
  -- Config system interface
      edit port <number>
      set ips-sniffer-mode enable
    end
Cuando se habilita esta opción en un puerto, este ya no se encuentra en la misma linea de flujo que los otros
puertos, este esta recibiendo el trafico espejo de una interfaz del switch, el uso de este es utilizado
como prueba de concepto (proof of concept [POC])
Las diferencias entre un rol y un alias:
  -- Un rol define configuraciones de interfaz agrupadas en conjunto:
    --> WAN
    --> LAN
    --> DMZ
    --> undenfined
  -- Un alias define una descripción amigable para la interfaz

Se debe de definir un Gateway Estatico o bien una ruta estatica de lo contrario FortiGate no sabra como
respodner a los paquetes.
Debemos de tener por lo menos una ruta que responda a todos los paquetes (0.0.0.0/0).
Link Agregation, agrega dos o más interfaces en una interfaz logica en una sola interfaz
Para poder habilitar el Servicio DHCP en una interfaz, primero se debe de poner la interfaz en Manual,
asignarle una IP y luego habilitar el servidor DHCP, desde el cual existe una termimnal que puede permitir
el bloqueo de Direcciones Mac, sin embargo tambien existe la posibilidad dentro de esta misma opción de
configurar que realizar cuando una Dirección Mac no especificada.
FortiGate tambien puede ser configurado como servidor DNS, el cual puede resoler de la siguientes formas:
  -- Forward: Reenviando las peticiones al siguiente servidor de DNS.
  -- No-recursivo: Usa una base de datos de DNS FortiGate para solo tratar resolver consultas.
  -- Recursivos: Usa la base de datos FortiGate primero, si no resuelve reenvia el trafico al siguiente
  servidor.

La configuración de la base de datos de DNS:
  -- Añadiendo una Zona de DNS
  -- Añadiendo entrada de DNS para cada Zona

Cuando los VDOMS estan activos se pueden crear respaldos y restaurarlos, de forma independientes, los respaldos
pueden ser creados con una contraseña,los archivos con contraseñas no pueden ser restaurados son esta.

Tanto en el archivo de configuraciones encriptado como en el que no esta encriptado muestra información
del dispositivo, para poder restaurar el respaldo se tiene que hacer match en el modelo.
Para poder actualizar el Firmware se debe de seguir el path de actualización y se puede visualizar la versión
actual desde el CLI con el comando:
  -- get system status.
Para poder hacer un downgrade de un firmware se tienen que seguir los siguientes pasos:
  -- Tener el archivo de pre configuración
  -- Descargar una copia del firmware actual.
  -- Tener acceso fisico o una conexión de consola
  -- Leer las notas de release
  -- Bajar la versión.
  -- En caso de ser requerido cargar la configuración para concordar la versión de Firmware 

*/
