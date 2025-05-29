# 📊 Diagrama de Flujo SmartPOS - Actualizado

## 🔄 Flujo de Decisión para Procesamiento de Órdenes MQTT

### 📱 **ESTADO DEL DEVICE**

#### 🌙 **SLEEP MODE**
```
┌─────────────────────────────────────┐
│          SLEEP MODE                 │
└─────────────────┬───────────────────┘
                  │
           ¿Pantalla Principal?
                  │
         ┌────────┴────────┐
         │ NO              │ SÍ
         ▼                 ▼
    ┌─────────┐      ¿Monto = $0?
    │ CASO 2  │           │
    │ MANUAL  │    ┌──────┴──────┐
    └─────────┘    │ SÍ          │ NO
                   ▼             ▼
              ┌─────────┐   ┌─────────┐
              │ CASO 1  │   │ CASO 3  │
              │ SUCCESS │   │  BUSY   │
              └─────────┘   └─────────┘
```

#### 🟢 **ACTIVO**
```
┌─────────────────────────────────────┐
│           DEVICE ACTIVO             │
└─────────────────┬───────────────────┘
                  │
          ¿Contexto Especial?
                  │
    ┌─────────────┼─────────────┐
    │             │             │
More Options  Catálogo     ¿Monto > $0?
    │         Vacío            │
    ▼             │       ┌────┴────┐
┌─────────┐       │       │ SÍ      │ NO
│ CASO 2  │       ▼       ▼         ▼
│ MANUAL  │   ┌─────────┐ ┌─────────┐ ┌─────────┐
└─────────┘   │ CASO 2  │ │ CASO 3  │ │ CASO 1  │
              │ MANUAL  │ │  BUSY   │ │ SUCCESS │
              └─────────┘ └─────────┘ └─────────┘
```

### 📋 **CASOS DETALLADOS**

#### ✅ **CASO 1: PROCESAR AUTOMÁTICO**
- **Condiciones:**
  - Sleep Mode + Pantalla Principal + Monto = $0
  - Activo + Sin contexto especial + Monto = $0
- **Acción:** Procesa automáticamente
- **Resultado:** SUCCESS

#### ⚠️ **CASO 2: ACCIÓN MANUAL** 
- **Condiciones:**
  - Sleep Mode + Pantalla ≠ Principal (cualquier monto)
  - Activo + More Options (cualquier monto)
  - Activo + Catálogo Vacío (cualquier monto)
- **Acción:** Requiere validación manual
- **Resultado:** MANUAL

#### 🚫 **CASO 3: ORDEN RECHAZADA (BUSY)**
- **Condiciones:**
  - **NUEVO:** Sleep Mode + Pantalla Principal + Monto > $0
  - Activo + Carrito Comenzado (cualquier monto)
  - Activo + Flujo de Cobro (cualquier monto)
  - Activo + Calculadora > $0 (sin contexto especial)
- **Acción:** Rechaza orden por dispositivo ocupado
- **Resultado:** BUSY
- **Remedy:** Limpiar calculadora o completar flujo actual

### 🔧 **CAMBIOS APLICADOS**

1. ✅ **Valor calculadora se refresca en tiempo real**
2. ✅ **Sleep mode deshabilita input de calculadora**  
3. ✅ **Sleep mode + pantalla ≠ principal → Caso 2**
4. ✅ **NUEVO: Sleep mode + monto > $0 → Caso 3 (BUSY)**

### 🧪 **ESCENARIOS DE PRUEBA**

| Estado Device | Pantalla | Monto | Resultado Esperado |
|--------------|----------|-------|-------------------|
| 🌙 Sleep | 🏠 Principal | $0 | ✅ CASO 1 (SUCCESS) |
| 🌙 Sleep | 🏠 Principal | >$0 | 🚫 CASO 3 (BUSY) |
| 🌙 Sleep | ⚙️ More Options | $0 | ⚠️ CASO 2 (MANUAL) |
| 🌙 Sleep | ⚙️ More Options | >$0 | ⚠️ CASO 2 (MANUAL) |
| 🟢 Activo | 🏠 Principal | $0 | ✅ CASO 1 (SUCCESS) |
| 🟢 Activo | 🏠 Principal | >$0 | 🚫 CASO 3 (BUSY) |
| 🟢 Activo | ⚙️ More Options | $0 | ⚠️ CASO 2 (MANUAL) |
| 🟢 Activo | ⚙️ More Options | >$0 | ⚠️ CASO 2 (MANUAL) | 