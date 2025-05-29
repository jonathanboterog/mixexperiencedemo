# 🏪 SmartPOS Demo Interactivo

## 🎯 Descripción

Aplicación web demo que simula el flujo de procesamiento de órdenes en SmartPOS, permitiendo demostrar interactivamente todos los casos de uso definidos en las reglas de negocio.

## 🚀 Cómo ejecutar

### Opción 1: Servidor local simple
```bash
# Usando Python (recomendado)
python3 -m http.server 8000

# O usando Node.js
npx http-server

# O usando PHP
php -S localhost:8000
```

### Opción 2: Abrir directamente
Simplemente abre `index.html` en tu navegador web.

**URL de acceso:** `http://localhost:8000`

## 🎮 Cómo usar la demo

### 1. **Panel de Configuración (Izquierda)**
- **🔋 Estado del Device**: Activo o Sleep Mode
- **💰 Valor Calculadora**: Monto actual en la calculadora
- **💰 Calculadora antes del Sleep**: Solo visible en Sleep Mode
- **📱 Estado de la App**: Pantalla/contexto actual del device

### 2. **Simulador Device (Centro)**
- Muestra el estado visual del SmartPOS
- Refleja configuración en tiempo real
- Simulación de pantalla real

### 3. **Panel de Resultados (Derecha)**
- Muestra el resultado del procesamiento
- Diagrama de flujo de decisión
- Remedy genérica para casos BUSY

### 4. **Log de Actividad (Abajo)**
- Histórico de órdenes procesadas
- Timestamps y estados

## 🧪 Escenarios de prueba sugeridos

### ✅ CASO 1: Procesamiento Automático
1. **Device activo + Calculadora $0 + Sin carrito**
   - Estado: Activo
   - Calculadora: $0.00
   - App: Pantalla Principal (NO More Options, NO Catálogo Vacío, NO Carrito)
   - **Resultado:** Procesamiento automático

2. **Sleep Mode + Calculadora limpia**
   - Estado: Sleep Mode
   - Calculadora antes del sleep: $0.00
   - **Resultado:** Despierta y procesa automáticamente

### ⚠️ CASO 2: Acción Manual
1. **Sleep Mode + Calculadora con valor**
   - Estado: Sleep Mode
   - Calculadora antes del sleep: > $0
   - **Resultado:** Requiere intervención manual

2. **More Options (sin importar calculadora)**
   - Estado: Activo
   - Calculadora: Cualquier valor ($0 o > $0)
   - App: More Options
   - **Resultado:** Validación manual requerida SIEMPRE

3. **Catálogo Vacío (sin importar calculadora)**
   - Estado: Activo
   - Calculadora: Cualquier valor ($0 o > $0)
   - App: Catálogo Vacío
   - **Resultado:** Validación manual requerida SIEMPRE

### 🚫 CASO 3: Orden Rechazada (BUSY)
1. **Carrito comenzado (sin importar calculadora)**
   - Estado: Activo
   - Calculadora: Cualquier valor ($0 o > $0)
   - App: Carrito Comenzado
   - **Resultado:** Orden rechazada con remedy

2. **Flujo de cobro activo (sin importar calculadora)**
   - Estado: Activo
   - Calculadora: Cualquier valor ($0 o > $0)
   - App: Flujo de Cobro
   - **Resultado:** Device ocupado, orden rechazada

3. **Calculadora > $0 (en contextos no especiales)**
   - Estado: Activo
   - Calculadora: > $0
   - App: Pantalla Principal, etc.
   - **Resultado:** Device ocupado, orden rechazada

## 🎨 Características de la demo

### 🎯 Interactividad
- ✅ Configuración de escenarios en tiempo real
- ✅ Simulación visual del device
- ✅ Resultados inmediatos con animaciones
- ✅ Log detallado de actividad

### 📱 Responsive Design
- ✅ Funciona en desktop y móvil
- ✅ Interfaz adaptativa
- ✅ Diseño profesional

### 🔍 Educativo
- ✅ Muestra flujo de decisión paso a paso
- ✅ Explica cada caso de uso
- ✅ Remedy genérica para casos de error
- ✅ Códigos de color intuitivos

## 📊 Casos de uso cubiertos

| Caso | Condiciones | Resultado | Color |
|------|------------|-----------|-------|
| **AUTOMÁTICO** | Calculadora en $0 | ✅ Procesa inmediatamente | 🟢 Verde |
| **MANUAL** | Requiere validación | ⚠️ Usuario debe intervenir | 🟡 Amarillo |
| **BUSY** | Device ocupado | ❌ Orden rechazada | 🔴 Rojo |

## 🛠️ Tecnologías utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Diseño moderno con gradientes y animaciones
- **JavaScript ES6+**: Lógica de negocio y interactividad
- **Responsive Design**: Compatible con todos los dispositivos

## 📁 Estructura de archivos

```
smartpos-demo/
├── index.html          # Página principal
├── styles.css          # Estilos de la aplicación
├── script.js           # Lógica de negocio
├── README_Demo.md      # Este archivo
└── diagramas/          # Diagramas PlantUML
    ├── diagrama_flujo_mejorado.puml
    ├── diagrama_flujo_ejecutivo.puml
    ├── diagrama_presentacion.puml
    └── diagrama_pantalla_grande.puml
```

## 🎤 Para presentaciones

Esta demo es ideal para:
- ✅ **Explicar reglas de negocio** visualmente
- ✅ **Demostrar casos edge** en tiempo real
- ✅ **Training** de equipos de soporte
- ✅ **Validación** con stakeholders
- ✅ **Documentación interactiva**

## 🔧 Personalización

El código está estructurado para ser fácilmente modificable:
- **Agregar nuevos escenarios** en `evaluateOrderProcessing()`
- **Modificar colores** en `styles.css`
- **Cambiar textos** en las funciones de display
- **Añadir validaciones** adicionales

---

*Demo desarrollado para el proyecto SmartPOS - Experiencia Mixta* 