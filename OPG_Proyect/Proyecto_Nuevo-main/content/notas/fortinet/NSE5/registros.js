/*

  Proposito de los registros:
    La información almacenada en los mensajes de registros detalla información especifica que detalla
    que es lo que esta sucediendo en la red.
    Determina la carga de los dispositivos de red.
    Rastrea el uso de los servicios.
    Soporta la respuesta a incidentes y los analisis forences.
    Debe de examinar multiples registros para descubrir la cada de actividad que deja una apertura.
  Regulaciones en el almacenamiento de registros.
    -- Los requerimientos de regulación  deben de indciar como los registros son manejados en una
      organización.
      -- Niveles t an alisis requeridos son comumente definidos por la legislación.
      -- El aseguramiento de los registros esta habilitado y grabada la información de acuerdo a los
        niveles correctos para satisfacer las regulaciones.
    -- Los registros pueden proveer evidencia de como lidear con partes intrusivas cuando una actividad no
      autorizada es detectada.
      -- La información de los registros debe de estar disponible para presentarse en corte.

*/

$a = Get-VMSystemSwitchExtensionPortFeature -FeatureId 776e0ba7-94a1-41c8-8f28-951f524251b5
$a.SettingData.MonitorMode = 2
add-VMSwitchExtensionPortFeature -ExternalPort -SwitchName ${interface mirroring} -VMSwitchExtensionFeature $a

 
