# 🏪 SmartPOS Demo Web - Proyecto Independiente

Demo interactivo para simular el flujo de procesamiento de órdenes en SmartPOS.

## 🚀 Inicio Rápido

```bash
# Navegar al directorio
cd smartpos-demo-web

# Iniciar servidor local
python3 -m http.server 8000

# Abrir en navegador
open http://localhost:8000
```

## 📁 Estructura del Proyecto

```
smartpos-demo-web/
├── index.html                     # 🌐 Interfaz principal del demo
├── styles.css                     # 🎨 Estilos CSS mejorados
├── script.js                      # ⚡ Lógica de negocio y simulación
├── README.md                      # 📖 Este archivo
├── README_Demo.md                 # 📖 Documentación detallada del demo
├── README_Diagramas.md            # 📖 Documentación de diagramas PlantUML
├── diagrama_flujo_mejorado.puml   # 📊 Diagrama técnico principal
├── diagrama_flujo_ejecutivo.puml  # 📊 Versión ejecutiva
├── diagrama_presentacion.puml     # 📊 Para presentaciones
└── diagrama_pantalla_grande.puml  # 📊 Para pantallas grandes
```

## ✨ Características

- **🎛️ Panel de Control:** Configura diferentes escenarios de SmartPOS
- **📱 Simulador Device:** UI realista que simula las pantallas del SmartPOS
- **📊 Resultados:** Visualización en tiempo real del procesamiento de órdenes
- **📝 Log de Actividad:** Seguimiento completo de las acciones del demo
- **🔄 Diagramas de Flujo:** Diagramas PlantUML para documentación

## 🎯 Casos de Uso

### ✅ CASO 1: PROCESAMIENTO AUTOMÁTICO
- Device en sleep + calculadora $0
- Device activo + calculadora $0 + contexto válido

### ⚠️ CASO 2: ACCIÓN MANUAL REQUERIDA  
- Device en sleep + calculadora > $0
- Device activo + "More Options"
- Device activo + catálogo vacío

### 🚫 CASO 3: ORDEN RECHAZADA (BUSY)
- Device activo + calculadora > $0
- Device activo + carrito comenzado
- Device activo + flujo de cobro activo

## 🛠️ Tecnologías

- **HTML5** - Estructura del demo
- **CSS3** - Estilos modernos y responsive
- **JavaScript (Vanilla)** - Lógica de simulación
- **PlantUML** - Diagramas de flujo

## 📖 Documentación Adicional

- [`README_Demo.md`](README_Demo.md) - Guía completa del demo interactivo
- [`README_Diagramas.md`](README_Diagramas.md) - Documentación de diagramas PlantUML

## 🌐 Uso en Presentaciones

Este demo es ideal para:
- Presentaciones técnicas
- Demos de producto
- Documentación de casos de uso
- Training de equipos
- Validación de reglas de negocio

---

**Proyecto Independiente** | **SmartPOS Order Processing Demo** | **2024** 