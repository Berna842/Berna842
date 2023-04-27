/*

Fortinet Seguridad de Fabrica.
Es una solución empresarial que habilita una aproximación holistica para la seguridad de red.

El Secutiry Fabric tiene los siguientes atributus:
  -- Ampleo: Provee una visibilidad amplia de la entera digital de la superficia de ataque para el mejor
            manejo de los riesgos.
  -- Integrado: Provee una solución que reduce la complejidad de multiples productos punto.
  -- Automatizado: Inteligencia de las amenazas que es intercambiado entre los componentes de red en tiempo
            real permitiendo automatizar respuestas a las amenazas.
La API permite la integración de dispositivos de terceros.

Muchos administradores pierden la visibilidad de sus defensas permitiendo accesos no detectados en la red, es
por esto que es importante Security Fabric.

El security Fabric provee distintos productos para la solución con FortiGate, IPS, VPN, SD-WAN, e incluso
ofrece multi-cloud atravez de nubes publicas, nubes privadas, nubes hibridas y SaaS y SIEM.
Dispositivos que comprometen el Security Fabric:
  -- Core: Dos dispositivos FortiGate y FortiAnalizer
  -- Recommended-Adds visibilidad significativa o control: ForrtiManager, Forti AP, FortiSwitch, FortiClient
    FortiSandbox, FortiMail, FortiWeb, FortiAI
  -- Extendida-Intregado con fabrica, pero no aplica para todos: Otros productos Fortinet y productos de
    terceros usados por la API.
Existe adicional a esto un dispositivo llamado Internal Segmentation Firewall (ISFW), que segrega la WAN
en componentes logicos, permitiendo proteger las amenazas que ocurran en una rama.

Los pasos para poder configurar un Security Fabric son:

  1) Para poder proceder a configurar un Security Fabric, es necesario primero configurar el FortiGate Raíz, una
  vez habilitado debemos de seleccionar "Serve as Fabric Root", adicional a esto se requiere configurar la IP
  del FortiAnalizer y se necesitará conigurar un nombre de fabric.
  Tambien es posible preconfigurar downstreams con el número de serie del equipo, esto permite que cuando el
  equipo se conecte a la red, este ingresará directamente al security Fabric

  2) En los dispositivos downstream se debe de habilitar la opción de "Security Fabric Connection" y
  "Device Detection", en la sección Fabric Connections se debe de agregar a la Fabric del upstream

  3) Desde el FortiGate Raíz y el FortiAnalizer, es necesario autorizar los equipos para poder completar
  el proceso

Por defecto cuando se habilita Security Fabric la sincronización de objetos esta habilitada por defecto, los
objetos que se sincronizan son tales como direcciones, servicios, etc.

Cualquier objeto que se sincronice estara disponible en el downstream.
Desde la linea de comandos:
  -- config system csf
  -- set status enable
  -- set configuration-sync default
  -- set fabric-object-unification defalt
Estos comandos solo estan disponibles dentro del dispositivo raiz, en caso de que se configure como forma local
los objetos globales de fabric no se sincronizarán en el downstream:
  -- config system csf
  -- set status enable
  -- set group-name "fortinet"
  -- set fabric-object-unification local
Cuando los dispositivos no participan en la sincronización:
  -- config system csf
  -- set status enable
  -- set configuation-sync local
Para poder seleccionar si el objeto se sincroniza o no en el downstream:
  -- set fabric-object disable

Existen dos tipos de Modos de VDOMs:
  -- split-vdom: Fortigate tiene dos VDOMs en total, incluidos root y FG-traffic
      -- root: Maneja solo el trabajo y oculta las entradas
      -- FG-traffic: puede proveer politicas de seguridad separadas y permitir el trafico atravez de FortiGate
          -- No pude crear nuevos VDOMs
  -- multi-vdom: Puede crear multiples VDOMs que funcionan como unidades independientes.

Si se habilita el Split-Task VDOM en el upstram, el dispositivo del downstream se podrá unir a los VDOMs root y
FG-traffic, sin embargo si solo el downstream se encuentra activo solo se podrá unir al VDOM root del dispositivo
upstram.

Cuando se utilizan multi-VDOMS, los VDOMs y sus puertos asignados serán mostrados cuando uno o más dispositivos
estan conectados.

Existen dos metodos de autenticación de dispositivos:
  --Agent: Ubicación e infraestructura independientes
  --Agentless:
    -- Una utilidad bastante util para la infraestructura Security Fabric
    -- Requiere conexión directa con el FortiGate
    -- Cuenta con los siguientes metodos de detección:
        -- HTTP User Agent
        -- TCP fingerprints.
        -- MAC addres Vendor.
        -- Microsoft Windows browser Service (MWBS)
        -- SIP user agent.
        -- Link Layer Discovery Protocol. (LLDP)
        -- Simple service Discovery Protocol (SSDP)
        -- QUIC
        -- FortiOS-VM detector:
Por defecto FortiGate utiliza la detección de dispositivos de forma pasiva, con la llegada de trafico.
Fortinet recomienda el uso de FortiManager para un control centralizado de la administración de todos los
dispositivos FortiGate y los dispositivos de acceso en el Security Fabric, se puede extender el Security Fabric
se puede extender utilizando:
    Mail integration:
    -- FortiMail
    Web Application Integration:
    -- FortiWeb
    -- FortiCache
    Proteccion de amenazas avanzadas:
    -- FortiSandbox
    FortiClient Integration:
    -- FortiClient EMS
    Access device integration:
    -- FortiAp
    -- FortiSwitch

Automatización de stitches.

El administrador define flujos de trabajo automatizados, llamados stitches, estos utilizan sentencias IF/Then
para poder automatizar la respuesta del FortiOs para un evento preprogamado.
El uso de Stitches, no es forzoso para el uso de Security Fabric.
Cada automatización requiere de un par, un evento y una o más acciones, se puede utilizar la automatizacion
de stitches, paa detectar eventos de cualquier origen en el Security Fabric y aplicar acciones para cualquier
destino, teniendo en cuenta que existen stitches predefinidos disponibles y se pueden crear nuevos con las opciones
disponibles.
Adicional a esto se puede configurar un interno minimo, en segundos, para asegurarse de que no se esta recibiendo
repetidas notificaciones del mismo evento.

Se puede configurar un stitch, para un disparador de Host Comprometido y así automatizar la respuesta de la amenaza
este disparador utiliza IoC, para reportar el evento desde FortiAnalizer, sin embargo para esto se requiere FortiAnalizer IoC
Reporting. Basado en el nivel de Amenaza configurado, se puede configurar el stitch para los siguientes pasos de tratamiento:

--> Cuarentena del host comprometido en el FortiSwitch o FortiAP.
--> Cuarentena del FortiClient en el host comprometido usando FortiClient EMS.
--> Ban de la IP.

Se utiliza la herramienta de monitoreo [Monitor > Quarantine Monitor], para visualizar los equipos en cuarentena y Las
IPs baneadas, las direcciones banneadas se eliminan de forma automatica despues de un configurado periodo de tiempo,
mientras que las IPs baneadas deben de ser removidas por medio de la intervención del administrador

Conexiones externas.

Esta herramienta permite integrar soporte de multiples nubes, tales como ACI y AWS.
Para una Infraestructura de Aplicacion Centrica (ACI), La conexión de SDN, sirve como puerta de enlace puente entre los
controladores SDN y los dispositivos FortiGate.

Security Fabric Rating:

Es una subscripcion que requiere una licencia, este servicio provee una revisión de "Mejores Practicas", que incluye
revisión de contraseñas, auditar y fortalezer la seguridad de la red.
Este servicio se divide en 3 cartas de revisión:
-- Postura de seguridad (Security Posture)
-- Cobertura de Fabrica (Fabric Coverage)
-- Optimización.
Este servicio adicionalmente permite la revisión de cumplimiento de politicas FSBP o PCI.
En multi-VDOMs, los reportes pueden generarse para el VDOM Global paa todos los VDOMs en el dispositivo, Los administradores
con permisos de Escritura/Lectura, pueden correr el reporte de rating de seguridad en el VDOM Global, mientras que los
administradores que tienen permisos de solo lectura unicamente puden ver el reporte.
En la columna de [SCOPE], muestra el VDOM o VDOMs en el que se realizo la revision, en la pestaña de [Easy Apply], se
pueden aplicar las recomendaciones para todos los VDOMs Asociados.
Desde la opción de Security Posture, se puede visualizar el ranking por porcentajes usando la auditoria de seguridad por usuarios
Desde la opción de Security Posture expande la carta de calificacion para mostrar más detalles, actualmente el servicio de
Security Posture soporta:

-- ranking de usuarios por percentil
-- Auditorias de seguridad.
-- Nuevas revisiones de seguridad

Las notificaciones del ranking de seguridad provee recomendaciones determinadas por security rating, estas notificaciones se
muestran en varias paginas de configuración.

El ranking de seguridad en Security Fabric es unicamente visible desde el dispositivo root y todos los dispositivos del
Security Fabric deben de tener el servicio de FortiGuard Security Rating, Para deshabilitar la opción desde el CLI se utiliza el
siguiente comando:

---
Config system global
  set security-rating-run-on-schedule [enable/desable]
end
---

Visiones de topología:

Existen dos visualizaciones desde el Security Fabric:

-- Topología Fisica
-- Topología Logica

En ambas visualizaciones se ingrsa de forma similar y permite observar en el caso de la topologia fisica una grafica de burbuja
de los dispositivos interconectados, mientras que en la logica se muestra las interfaces de red, tanto fisicas como logicas.
Desde la vista de topologia fisica el administrador puede desautorizar dispositivos del SecurityFabric.

Apendice:
IoC (Indicador de compromiso.)

*/
