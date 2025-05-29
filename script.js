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
        this.addLogEntry('📡 Recibiendo notificación MQTT para procesar orden...', 'info');
        
        // Simulate MQTT delay
        setTimeout(() => {
            const result = this.evaluateOrderProcessing();
            this.displayResult(result);
            this.createFlowDiagram(result);
            
            // Log específico según el tipo de resultado
            switch (result.type) {
                case 'SUCCESS':
                    this.addLogEntry('✅ Orden procesada automáticamente - Confirmación enviada al PDV', 'success');
                    break;
                case 'MANUAL':
                    this.addLogEntry('⚠️ Notificación mostrada al usuario - Requiere acción manual', 'warning');
                    break;
                case 'BUSY':
                    this.addLogEntry('🚫 Orden rechazada con estado "busy" - Remedy enviado al PDV', 'error');
                    break;
            }
        }, 1000);

        // Show loading state
        this.resultDisplay.innerHTML = `
            <div class="waiting-state">
                <div class="result-icon">⏳</div>
                <div class="result-title">Procesando orden MQTT...</div>
                <div class="result-description">Evaluando reglas de negocio v4...</div>
            </div>
        `;
    }

    evaluateOrderProcessing() {
        const deviceState = this.deviceStateSelect.value;
        const calculatorValue = parseFloat(this.calculatorValueInput.value) || 0;
        const appState = this.appStateSelect.value;

        // Debug logging para diagnosticar el problema
        console.log('🔍 DEBUG - Estados actuales:', {
            deviceState,
            calculatorValue,
            appState
        });

        // Debug adicional: verificar el dropdown actual
        const selectedOption = this.appStateSelect.options[this.appStateSelect.selectedIndex];
        console.log('🔍 DEBUG - Dropdown actual:', {
            selectedIndex: this.appStateSelect.selectedIndex,
            selectedValue: this.appStateSelect.value,
            selectedText: selectedOption ? selectedOption.text : 'undefined',
            allOptions: Array.from(this.appStateSelect.options).map(opt => ({ value: opt.value, text: opt.text }))
        });

        // Implementar reglas de negocio según diagrama v4 simplificado
        
        // Verificar si carrito tiene productos
        if (appState === 'catalogWithCart') {
            console.log('📝 DEBUG - Detectado: catalogWithCart → CASO 3 BUSY');
            return {
                type: 'BUSY',
                title: '❌ CASO 3: ORDEN RECHAZADA (BUSY)',
                description: 'Carrito con productos - Device ocupado',
                icon: '🚫',
                remedy: 'Finalizar compra actual y reenviar orden',
                steps: [
                    'Recibe notificación MQTT para procesar orden',
                    'Detecta carrito con productos',
                    'Device ocupado - rechaza orden',
                    'Envía remedy al PDV: "Finalizar compra actual y reenviar orden"'
                ]
            };
        }

        // Verificar si está en flujo de cobro
        if (appState === 'checkoutFlow') {
            console.log('📝 DEBUG - Detectado: checkoutFlow → CASO 3 BUSY');
            return {
                type: 'BUSY',
                title: '❌ CASO 3: ORDEN RECHAZADA (BUSY)',
                description: 'Flujo de cobro activo - Device ocupado',
                icon: '🚫',
                remedy: 'Finalizar cobro actual y reenviar orden',
                steps: [
                    'Recibe notificación MQTT para procesar orden',
                    'Detecta flujo de cobro activo',
                    'Device ocupado - rechaza orden',
                    'Envía remedy al PDV: "Finalizar cobro actual y reenviar orden"'
                ]
            };
        }

        // Verificar si está en pantalla Home (incluye calculadora y catálogo vacío)
        if (appState === 'home' || appState === 'catalogEmpty') {
            console.log('📝 DEBUG - Detectado: home/catalogEmpty → CASO 1 SUCCESS');
            return {
                type: 'SUCCESS',
                title: '✅ CASO 1: PROCESAR AUTOMÁTICO',
                description: 'Home sin carrito - Procesa automáticamente',
                icon: '🚀',
                steps: [
                    'Recibe notificación MQTT para procesar orden',
                    'Verifica está en pantalla Home',
                    'No hay carrito ni flujo de cobro activo',
                    'Procesa orden automáticamente y envía confirmación al PDV'
                ]
            };
        }

        // Cualquier otra pantalla (More Options, etc.)
        console.log('📝 DEBUG - Detectado: otra pantalla → CASO 2 MANUAL. appState actual:', appState);
        return {
            type: 'MANUAL',
            title: '⚠️ CASO 2: ACCIÓN MANUAL',
            description: 'More Options u otra pantalla - Debe regresar a Home',
            icon: '⚠️',
            remedy: 'Regresar a pantalla Home y validar procesamiento',
            steps: [
                'Recibe notificación MQTT para procesar orden',
                'Detecta está en More Options u otra pantalla',
                'Muestra notificación al usuario',
                'Usuario debe regresar a Home y validar procesamiento manual'
            ]
        };
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