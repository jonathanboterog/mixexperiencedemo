class SmartPOSDemo {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.updateDeviceDisplay();
    }

    initializeElements() {
        // Control elements
        this.deviceStateSelect = document.getElementById('deviceState');
        this.calculatorValueInput = document.getElementById('calculatorValue');
        this.appStateSelect = document.getElementById('appState');
        this.sendOrderBtn = document.getElementById('sendOrder');

        // Device display elements
        this.deviceStatusIndicator = document.getElementById('deviceStatusIndicator');
        this.calculatorDisplay = document.getElementById('calculatorDisplay');
        this.currentScreen = document.getElementById('currentScreen');
        this.screenContent = document.getElementById('screenContent');

        // Result elements
        this.resultDisplay = document.getElementById('resultDisplay');
        this.flowDiagram = document.getElementById('flowDiagram');

        // Log elements
        this.logContainer = document.getElementById('logContainer');
    }

    setupEventListeners() {
        this.deviceStateSelect.addEventListener('change', () => {
            this.updateDeviceDisplay();
        });

        this.calculatorValueInput.addEventListener('input', () => {
            this.updateCalculatorDisplay();
        });

        this.appStateSelect.addEventListener('change', () => {
            this.updateAppState();
        });

        this.sendOrderBtn.addEventListener('click', () => {
            this.processOrder();
        });
    }

    updateDeviceDisplay() {
        const deviceState = this.deviceStateSelect.value;
        const calculatorValue = parseFloat(this.calculatorValueInput.value) || 0;

        // Update device status indicator
        if (deviceState === 'sleep') {
            this.deviceStatusIndicator.className = 'status-indicator sleep';
            this.deviceStatusIndicator.textContent = '🌙 SLEEP MODE';
        } else {
            this.deviceStatusIndicator.className = 'status-indicator active';
            this.deviceStatusIndicator.textContent = '🟢 ACTIVO';
        }

        this.updateCalculatorDisplay();
        this.updateAppState();
    }

    updateCalculatorDisplay() {
        const calculatorValue = parseFloat(this.calculatorValueInput.value) || 0;
        this.calculatorDisplay.textContent = `$${calculatorValue.toFixed(2)}`;
        
        // Change color based on value
        if (calculatorValue === 0) {
            this.calculatorDisplay.style.color = '#00ff00';
        } else {
            this.calculatorDisplay.style.color = '#ff6600';
        }
    }

    updateAppState() {
        const appState = this.appStateSelect.value;
        const deviceState = this.deviceStateSelect.value;
        const calculatorValue = parseFloat(this.calculatorValueInput.value) || 0;

        if (deviceState === 'sleep') {
            this.currentScreen.textContent = '🌙 Device en Sleep Mode';
            this.screenContent.innerHTML = '<div style="text-align: center; padding: 50px; color: #666;">Pantalla apagada para ahorrar energía</div>';
            return;
        }

        switch (appState) {
            case 'home':
                this.renderCalculatorScreen(calculatorValue);
                break;
            case 'moreOptions':
                this.renderMoreOptionsScreen();
                break;
            case 'catalogEmpty':
                this.renderProdutosScreen(false);
                break;
            case 'catalogWithCart':
                this.renderProdutosScreen(true);
                break;
            case 'checkoutFlow':
                this.renderCheckoutScreen();
                break;
        }
    }

    renderCalculatorScreen(value) {
        this.currentScreen.textContent = '';
        this.screenContent.innerHTML = `
            <div class="calculator-screen">
                <div class="calculator-header">
                    <button class="tab-button active">Valor</button>
                    <button class="tab-button">Seus produtos</button>
                </div>
                <div class="calculator-value">
                    <div class="calculator-amount">R$ ${value.toFixed(2).replace('.', ',')}</div>
                    <div class="add-description">Adicionar descrição</div>
                </div>
                <div class="keypad">
                    <button class="keypad-button">1</button>
                    <button class="keypad-button">2</button>
                    <button class="keypad-button">3</button>
                    <button class="keypad-button">4</button>
                    <button class="keypad-button">5</button>
                    <button class="keypad-button">6</button>
                    <button class="keypad-button">7</button>
                    <button class="keypad-button">8</button>
                    <button class="keypad-button">9</button>
                    <button class="keypad-button special">⌫</button>
                    <button class="keypad-button">0</button>
                    <button class="keypad-button special">+</button>
                </div>
                <button class="cobrar-button ${value > 0 ? 'active' : ''}">Cobrar</button>
            </div>
        `;
    }

    renderProdutosScreen(hasCart) {
        this.currentScreen.textContent = '';
        const cartCount = hasCart ? 1 : 0;
        const cartTotal = hasCart ? 500.00 : 0;
        
        this.screenContent.innerHTML = `
            <div class="produtos-screen">
                <div class="produtos-header">
                    <button class="tab-button">Valor</button>
                    <button class="tab-button active">Seus produtos</button>
                </div>
                <div class="search-bar">
                    <span>🔍</span>
                    <input type="text" class="search-input" placeholder="Buscar produto">
                </div>
                <div class="category-filters">
                    <button class="category-filter active">Sem categoria</button>
                    <button class="category-filter">Gaseosa</button>
                    <button class="category-filter">Comida</button>
                </div>
                <div class="produtos-grid">
                    <div class="produto-card ${hasCart ? 'selected' : ''}">
                        ${hasCart ? '<div class="produto-badge">1</div>' : ''}
                        <div class="produto-image">CG</div>
                        <div class="produto-name">Coca Col Gra</div>
                        <div class="produto-price">R$ 500</div>
                    </div>
                    <div class="produto-card">
                        <div class="produto-image" style="background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23333" width="100" height="100"/></svg>')"></div>
                        <div class="produto-name">Coca Cola</div>
                        <div class="produto-price">R$ 553</div>
                    </div>
                    <div class="produto-card">
                        <div class="produto-image">H</div>
                        <div class="produto-name">Higo</div>
                        <div class="produto-price">R$ 1</div>
                    </div>
                    <div class="produto-card">
                        <div class="produto-image">CG</div>
                        <div class="produto-name">Coca Grande</div>
                        <div class="produto-price">R$ 999</div>
                    </div>
                    <div class="produto-card">
                        <div class="produto-image">MA</div>
                        <div class="produto-name">Monster Sin</div>
                        <div class="produto-price">R$ 1</div>
                    </div>
                </div>
                <div class="bottom-bar">
                    <button class="cart-icon">
                        🛒
                        ${cartCount > 0 ? `<div class="cart-badge">${cartCount}</div>` : ''}
                    </button>
                    <button class="cobrar-produtos ${cartCount > 0 ? '' : 'disabled'}">
                        Cobrar ${cartTotal > 0 ? `R$ ${cartTotal.toFixed(2).replace('.', ',')}` : ''}
                    </button>
                </div>
            </div>
        `;
    }

    renderMoreOptionsScreen() {
        this.currentScreen.textContent = '';
        this.screenContent.innerHTML = `
            <div class="more-options-screen">
                <div class="more-options-header">
                    <button class="tab-button active">Mais opções</button>
                    <button class="tab-button">Serviços</button>
                </div>
                <div class="options-content">
                    <div class="option-card">
                        <div class="option-icon">📊</div>
                        <div class="option-content">
                            <div class="option-title">Atividade com esta Point</div>
                            <div class="option-description">Consulte suas vendas e transações com esta maquininha.</div>
                        </div>
                        <div class="option-arrow">›</div>
                    </div>
                    <div class="option-card">
                        <div class="option-icon">📈</div>
                        <div class="option-content">
                            <div class="option-title">Relatórios desta Point</div>
                            <div class="option-description">Gere relatórios diários das transações realizadas.</div>
                        </div>
                        <div class="option-arrow">›</div>
                    </div>
                    <div class="option-card">
                        <div class="option-icon">🧮</div>
                        <div class="option-content">
                            <div class="option-title">Simulador de taxas</div>
                        </div>
                        <div class="option-arrow">›</div>
                    </div>
                    <div class="option-card">
                        <div class="option-icon">⚙️</div>
                        <div class="option-content">
                            <div class="option-title">Ajustes</div>
                        </div>
                        <div class="option-arrow">›</div>
                    </div>
                    <div class="option-card">
                        <div class="option-icon">❓</div>
                        <div class="option-content">
                            <div class="option-title">Ajuda</div>
                        </div>
                        <div class="option-arrow">›</div>
                    </div>
                    <div class="logout-section">
                        <button class="logout-button">
                            <div class="option-icon">👤</div>
                            <div>
                                <div>Encerrar sessão</div>
                                <div class="logout-email">homologacionsmartmib@mercadolibre.com</div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderCheckoutScreen() {
        this.currentScreen.textContent = '';
        this.screenContent.innerHTML = `
            <div class="calculator-screen">
                <div class="calculator-header">
                    <button class="tab-button">Valor</button>
                    <button class="tab-button active">Seus produtos</button>
                </div>
                <div style="padding: 30px; text-align: center; background: white; margin: 20px; border-radius: 10px;">
                    <div style="font-size: 24px; color: #007bff; margin-bottom: 15px;">💳 Processando Pagamento</div>
                    <div style="font-size: 18px; color: #333; margin-bottom: 10px;">R$ 500,00</div>
                    <div style="font-size: 14px; color: #666;">Aguarde... Validando transação</div>
                    <div style="margin-top: 20px;">
                        <div style="width: 100%; height: 4px; background: #f0f0f0; border-radius: 2px; overflow: hidden;">
                            <div style="width: 60%; height: 100%; background: #007bff; animation: progress 2s infinite;"></div>
                        </div>
                    </div>
                </div>
                <div style="padding: 20px; text-align: center; color: #666;">
                    <div>1. ✅ Validando produtos</div>
                    <div>2. 🔄 Calculando total</div>
                    <div>3. ⏳ Esperando confirmação</div>
                </div>
            </div>
        `;
    }

    processOrder() {
        this.addLogEntry('📡 Enviando orden MQTT...', 'info');
        
        // Simulate MQTT delay
        setTimeout(() => {
            const result = this.evaluateOrderProcessing();
            this.displayResult(result);
            this.createFlowDiagram(result);
            this.addLogEntry(`✅ Orden procesada: ${result.type}`, result.type === 'SUCCESS' ? 'success' : result.type === 'MANUAL' ? 'warning' : 'error');
        }, 1000);

        // Show loading state
        this.resultDisplay.innerHTML = `
            <div class="waiting-state">
                <div class="result-icon">⏳</div>
                <div class="result-title">Procesando orden MQTT...</div>
                <div class="result-description">Evaluando estado del device...</div>
            </div>
        `;
    }

    evaluateOrderProcessing() {
        const deviceState = this.deviceStateSelect.value;
        const calculatorValue = parseFloat(this.calculatorValueInput.value) || 0;
        const appState = this.appStateSelect.value;

        // Implement business rules from the final corrected diagrams
        if (deviceState === 'sleep') {
            if (calculatorValue === 0) {
                return {
                    type: 'SUCCESS',
                    title: 'CASO 1: PROCESAR AUTOMÁTICO',
                    description: 'Device en sleep mode pero calculadora está en $0. Se despierta automáticamente y procesa la orden.',
                    icon: '🚀',
                    steps: [
                        'Device detecta orden MQTT',
                        'Verifica calculadora está en $0',
                        'Despierta automáticamente',
                        'Procesa orden inmediatamente'
                    ]
                };
            } else {
                return {
                    type: 'MANUAL',
                    title: 'CASO 2: ACCIÓN MANUAL',
                    description: 'Device en sleep mode con calculadora > $0. Usuario debe intervenir.',
                    icon: '⚠️',
                    steps: [
                        'Device detecta orden MQTT',
                        'Verifica calculadora > $0',
                        'Muestra notificación al usuario',
                        'Usuario debe encender device y validar'
                    ]
                };
            }
        } else {
            // Device activo - Verificar contextos especiales primero
            if (appState === 'moreOptions') {
                return {
                    type: 'MANUAL',
                    title: 'CASO 2: ACCIÓN MANUAL',
                    description: 'Usuario en "More Options". Requiere validación manual sin importar el monto de la calculadora.',
                    icon: '⚠️',
                    steps: [
                        'Device recibe orden MQTT',
                        'Detecta usuario en sección "More Options"',
                        'Requiere validación manual por contexto',
                        'Usuario debe confirmar para procesar'
                    ]
                };
            } else if (appState === 'catalogEmpty') {
                return {
                    type: 'MANUAL',
                    title: 'CASO 2: ACCIÓN MANUAL',
                    description: 'Catálogo vacío. Requiere validación manual sin importar el monto de la calculadora.',
                    icon: '⚠️',
                    steps: [
                        'Device recibe orden MQTT',
                        'Detecta catálogo vacío',
                        'Requiere validación manual por contexto',
                        'Usuario debe confirmar para procesar'
                    ]
                };
            } else if (appState === 'catalogWithCart') {
                // Carrito con productos siempre va a BUSY, sin importar calculadora
                return {
                    type: 'BUSY',
                    title: 'CASO 3: ORDEN RECHAZADA (BUSY)',
                    description: 'Device ocupado con carrito comenzado. Sin importar el valor de la calculadora.',
                    icon: '🚫',
                    remedy: 'El usuario debe ir a la pantalla de cobro, dejar el device en $0 y volver a enviar la orden.',
                    steps: [
                        'Device recibe orden MQTT',
                        'Detecta catálogo con carrito comenzado',
                        'Device marcado como ocupado',
                        'Rechaza orden con estado "busy"'
                    ]
                };
            } else if (appState === 'checkoutFlow') {
                // Flujo de cobro activo siempre va a BUSY, sin importar calculadora
                return {
                    type: 'BUSY',
                    title: 'CASO 3: ORDEN RECHAZADA (BUSY)',
                    description: 'Device ocupado con flujo de cobro activo. Sin importar el valor de la calculadora.',
                    icon: '🚫',
                    remedy: 'El usuario debe ir a la pantalla de cobro, dejar el device en $0 y volver a enviar la orden.',
                    steps: [
                        'Device recibe orden MQTT',
                        'Detecta flujo de cobro activo',
                        'Device marcado como ocupado',
                        'Rechaza orden con estado "busy"'
                    ]
                };
            } else if (calculatorValue > 0) {
                // Calculadora > $0 siempre va a BUSY (excepto contextos especiales ya manejados)
                return {
                    type: 'BUSY',
                    title: 'CASO 3: ORDEN RECHAZADA (BUSY)',
                    description: 'Calculadora > $0. Device ocupado.',
                    icon: '🚫',
                    remedy: 'El usuario debe ir a la pantalla de cobro, dejar el device en $0 y volver a enviar la orden.',
                    steps: [
                        'Device recibe orden MQTT',
                        'Detecta calculadora > $0',
                        'Device marcado como ocupado',
                        'Rechaza orden con estado "busy"'
                    ]
                };
            } else {
                // Calculadora en $0, sin carrito, contexto válido - Automático
                return {
                    type: 'SUCCESS',
                    title: 'CASO 1: PROCESAR AUTOMÁTICO',
                    description: 'Device activo con calculadora en $0 y sin carrito comenzado. Procesa automáticamente.',
                    icon: '🚀',
                    steps: [
                        'Device recibe orden MQTT',
                        'Verifica calculadora en $0',
                        'Sin carrito comenzado',
                        'Procesa orden inmediatamente'
                    ]
                };
            }
        }
    }

    displayResult(result) {
        let resultClass = '';
        let resultHTML = '';

        switch (result.type) {
            case 'SUCCESS':
                resultClass = 'result-success';
                break;
            case 'MANUAL':
                resultClass = 'result-manual';
                break;
            case 'BUSY':
                resultClass = 'result-busy';
                break;
        }

        resultHTML = `
            <div class="${resultClass}">
                <div class="result-icon">${result.icon}</div>
                <div class="result-title">${result.title}</div>
                <div class="result-description">${result.description}</div>
                ${result.remedy ? `
                    <div class="remedy-box">
                        <h4>🔧 Remedy Genérica:</h4>
                        <p>${result.remedy}</p>
                    </div>
                ` : ''}
            </div>
        `;

        this.resultDisplay.innerHTML = resultHTML;
    }

    createFlowDiagram(result) {
        let diagramHTML = '<h4>🔄 Flujo de Decisión:</h4>';
        
        result.steps.forEach((step, index) => {
            let stepClass = 'flow-step';
            if (index === result.steps.length - 1) {
                stepClass += result.type === 'SUCCESS' ? ' success' : 
                           result.type === 'MANUAL' ? ' warning' : ' error';
            } else {
                stepClass += ' active';
            }
            
            diagramHTML += `
                <div class="${stepClass}">
                    <span style="margin-right: 10px; font-weight: bold;">${index + 1}.</span>
                    <span>${step}</span>
                </div>
            `;
        });

        this.flowDiagram.innerHTML = diagramHTML;
    }

    addLogEntry(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry ${type}`;
        logEntry.textContent = `[${timestamp}] ${message}`;
        
        this.logContainer.appendChild(logEntry);
        this.logContainer.scrollTop = this.logContainer.scrollHeight;
    }
}

// Initialize the demo when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SmartPOSDemo();
}); 