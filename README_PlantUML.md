# 📊 Diagrama PlantUML - SmartPOS

## 🔧 Archivo actualizado: `diagrama_flujo_mejorado.puml`

### 📋 **Nuevos cambios aplicados:**

1. ✅ **Sleep Mode + Pantalla ≠ Principal** → **CASO 2 (MANUAL)**
2. ✅ **Sleep Mode + Pantalla Principal + Monto > $0** → **CASO 3 (BUSY)**
3. ✅ **Sleep Mode + Pantalla Principal + Monto = $0** → **CASO 1 (SUCCESS)**

### 🌐 **Cómo generar el diagrama:**

#### **Opción 1: Online (PlantUML Server)**
1. Ve a: https://www.plantuml.com/plantuml/uml/
2. Copia el contenido de `diagrama_flujo_mejorado.puml`
3. Pégalo en el editor
4. El diagrama se genera automáticamente

#### **Opción 2: VS Code**
1. Instala la extensión "PlantUML"
2. Abre `diagrama_flujo_mejorado.puml`
3. Presiona `Alt+D` para previsualizar

#### **Opción 3: Línea de comandos**
```bash
# Instalar PlantUML
brew install plantuml  # macOS
# o
sudo apt-get install plantuml  # Ubuntu

# Generar imagen
plantuml diagrama_flujo_mejorado.puml
```

### 🎯 **Casos de prueba validados:**

| Sleep Mode | Pantalla | Monto | Resultado |
|------------|----------|-------|-----------|
| ✅ Sí | 🏠 Principal | $0 | ✅ CASO 1 |
| ✅ Sí | 🏠 Principal | >$0 | 🚫 CASO 3 |
| ✅ Sí | ⚙️ More Options | $0 | ⚠️ CASO 2 |
| ✅ Sí | ⚙️ More Options | >$0 | ⚠️ CASO 2 |

### 🔄 **Version History:**
- **v1:** Diagrama original
- **v2:** Agregado flujo para pantallas no-principales en sleep mode + monto > $0 va a BUSY 