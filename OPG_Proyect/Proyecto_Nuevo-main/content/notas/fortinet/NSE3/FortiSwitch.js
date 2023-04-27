/*

FortiSwitch ayuda a enfrentar algunos de los retos de la capa de acceso,algunos de los retos son:

--> El número de dispositivos que se conectan a la red.
--> Seguridad de la red Ethernet.
--> Complejidad en la implementación y administración de la red Ethernet.

El impacto resultante de estas amenazas son:

--> Decremento en el rendimiento de la red Ethernet.
--> Modelos de seguridad que son tanto complejos como caros en su implementación.
--> Incrementa el tiempo de resolución de los problemas.

FortiSwitch tiene integración directa con Security Fabric, con el uso de Fortinet SDN (Security-Driven Network),
permite la convegencía de la seguridad y el acceso de red, la capa de acceso a la red dentro de un marco de
referencia de seguridad.
Cuenta con una arquitectura unica lo cual brinda los siguientes beneficios:
--> Añadiendo los componentes requeridos
--> Simplifica la administración y la licencia.
--> Baja los costos

Existen dos opciones para realizar el despliegue de un FortiSwitch:
1) FortiLink: Administrado por el FortiGate y el security Fabric esta habilitado. es el modelo de despliegue mas común.
2) Stand Alone: es el modelo más común en entornos no-FortiGate

Fortinet entrega Ethernet seguro atravez de FortiLink, FortiSwitch es una extensión de NGFW, los puertos del firewall y switch
son iguale de seguros y las nuevas caracteristicas de la NAC permiten la inducción de IoT seguro.
Las recientes actualizaciones en el FortiOS para las NAC nativas, permiten al FortiSwitch descubrir dispositivos y aplicar
politicas de forma automatica, teniendo disparadores y acciones, con configuraciones por defecto.
NAC nativa de FortiOS:
--> Segura:
    --> Descubre de forma automatica dispositivos y aplica politicas.
    --> disparadores y acciones flexibles.
    --> Las reglas apuntan a una politica ( y una policita puede apuntar a otra politica)
--> Simple
    --> Configuraciones por defecto y listas para su uso.
    --> Puede simplificar su despliegue de red.
    --> Identificación de dispositivos de usuario y FortiGuard IOT
--> Escalable
    --> Habilita de forma rapida el NAC en todos los puertos de la red.
    --> Etiquetas EMS con direcciones dinamicas.
    --> Las acciones pueden ser definidas por puertos o por dispositivos

Existen 3 casos de uso del FortiSwitch:
--> Campus: Donde el FortiSwitch es desplegado en conjunto con FortiGate para ofrecer mayor seguridad.
--> Incrementar la densidad e puertos FortiGate: cuando se tiene limitación en el número de puertos.
--> SD-Branch: Es una extensión del SD-WAN, permite el control de dispositivos remotos en los bordes de la red.

Existen 3 productos ofrecidos para la familia de FortiSwitches:

--> Familia de Switch de acceso: 1 GbE y multiples GbE Access
--> Familia de Switch de Centros de datos: 10GbE y 100GbE
--> FortiSwitch Roged: 1 GbE para condiciones desafiantes.

Para la administración en la nube del FortiSwitch se tienen dos opciones:
--> FortiSwitch Cloud.
--> FortiGate Cloud.

*/
