# Diagramas de Flujo - Experiencia Mixta SmartPOS

## Resumen Ejecutivo

Este documento describe el flujo de procesamiento de órdenes en el sistema SmartPOS, definiendo tres casos principales de comportamiento basados en el estado del dispositivo y la calculadora.

## Casos de Uso

### 🟢 CASO 1: Procesamiento Automático
**Condiciones:**
- Calculadora en $0
- Device disponible (activo o en sleep mode con calculadora limpia)

**Comportamiento:**
- La orden se procesa automáticamente
- No requiere intervención del usuario
- Respuesta inmediata al PDV

**Escenarios específicos:**
- Device activo con calculadora en $0
- Device en sleep mode pero calculadora estaba en $0 antes del sleep

---

### 🟡 CASO 2: Acción Manual Requerida
**Condiciones:**
- Usuario debe intervenir para validar/limpiar calculadora
- Device disponible pero requiere acción manual

**Comportamiento:**
- Se muestra notificación al usuario
- Usuario debe encender device, ir a calculadora y validar $0
- Procesamiento tras validación manual

**Escenarios específicos:**
- Sleep mode con calculadora > $0 (antes del sleep)
- Device activo + sección "More Options" activa (sin importar monto calculadora)
- Device activo + "Catálogo Vacío" (sin importar monto calculadora)
- Device activo + calculadora > $0 en contexto válido (no carrito/cobro)

---

### 🔴 CASO 3: Orden Rechazada (BUSY)
**Condiciones:**
- Device ocupado/no disponible para nuevas órdenes
- Situaciones que impiden el procesamiento

**Comportamiento:**
- Rechaza la orden con estado "busy"
- Envía remedy genérica al PDV
- Instrucciones claras para el usuario

**Escenarios específicos:**
- Catálogo con carrito comenzado (sin importar monto calculadora)
- Calculadora > $0 en cualquier contexto (excepto More Options y Catálogo Vacío)
- Cualquier step del flujo de cobro activo

**Remedy Genérica:**
> "El usuario debe ir a la pantalla de cobro, dejar el device en $0 y volver a enviar la orden"

---

## Archivos del Proyecto

1. **`diagrama_flujo_mejorado.puml`**: Diagrama completo con todos los detalles técnicos
2. **`diagrama_flujo_ejecutivo.puml`**: Versión simplificada para presentaciones
3. **`README_Diagramas.md`**: Este documento explicativo

## Cómo usar los diagramas

Para generar las imágenes de los diagramas, puedes usar:

```bash
# Con PlantUML local
plantuml diagrama_flujo_mejorado.puml
plantuml diagrama_flujo_ejecutivo.puml

# O usar el servicio online
# http://www.plantuml.com/plantuml/uml/
```

## Consideraciones Técnicas

- **MQTT**: Las órdenes llegan a través de notificaciones MQTT
- **Estado del Device**: Se evalúa si está en sleep mode o activo
- **Estado de la Calculadora**: Valor clave para determinar disponibilidad
- **PDV Integration**: Respuestas diferenciadas según el caso (éxito, manual, busy)

---

*Documento generado para el proyecto SmartPOS - Experiencia Mixta* 