/**
 * Dot1Xer Supreme - Portnox Integration
 * Version: 2.0.0
 * 
 * This file contains functions for Portnox Cloud integration.
 */

// Portnox connection state
let portnoxConnection = {
    connected: false,
    tenant: null,
    apiKey: null,
    apiSecret: null
};

/**
 * Initialize Portnox integration
 */
function initPortnoxIntegration() {
    console.log('Initializing Portnox integration');
    
    // Create Portnox UI components
    createPortnoxUI();
    
    // Check for stored connection
    checkStoredPortnoxConnection();
}

/**
 * Create Portnox UI components
 */
function createPortnoxUI() {
    const portnoxTab = document.getElementById('portnox');
    if (!portnoxTab) return;
    
    const portnoxContent = portnoxTab.querySelector('.section-content');
    if (!portnoxContent) return;
    
    // Create connection status component
    const connectionSection = document.createElement('div');
    connectionSection.innerHTML = `
        <div class="portnox-connection">
            <div class="portnox-status">
                <span class="portnox-status-indicator portnox-disconnected"></span>
                <span id="portnox-status-text">Not connected to Portnox Clear</span>
            </div>
            <button id="portnox-connect-btn" class="btn btn-primary">Connect</button>
        </div>
        
        <div id="portnox-connection-form" class="portnox-connection-form">
            <div class="form-group">
                <label for="portnox-tenant">Tenant ID</label>
                <input type="text" id="portnox-tenant" class="form-control" placeholder="your-tenant-id">
                <span class="form-hint">Your Portnox Clear tenant ID</span>
            </div>
            
            <div class="form-group">
                <label for="portnox-api-key">API Key</label>
                <input type="text" id="portnox-api-key" class="form-control" placeholder="api-key">
                <span class="form-hint">Your Portnox API key</span>
            </div>
            
            <div class="form-group">
                <label for="portnox-api-secret">API Secret</label>
                <input type="password" id="portnox-api-secret" class="form-control" placeholder="api-secret">
                <span class="form-hint">Your Portnox API secret</span>
            </div>
            
            <div class="form-actions">
                <button id="portnox-save-connection" class="btn btn-primary">Connect</button>
                <button id="portnox-cancel-connection" class="btn btn-light">Cancel</button>
            </div>
        </div>
    `;
    
    // Create dashboard component (initially hidden)
    const dashboardSection = document.createElement('div');
    dashboardSection.id = 'portnox-dashboard-container';
    dashboardSection.style.display = 'none';
    dashboardSection.innerHTML = `
        <h3>Portnox Clear Dashboard</h3>
        
        <div class="portnox-dashboard">
            <div class="portnox-card">
                <div class="portnox-card-header">Device Status</div>
                <div class="portnox-card-body">
                    <div class="portnox-metric">
                        <div class="portnox-metric-value" id="portnox-authenticated-count">0</div>
                        <div class="portnox-metric-label">Authenticated Devices</div>
                    </div>
                    <div class="portnox-metric">
                        <div class="portnox-metric-value" id="portnox-unauthenticated-count">0</div>
                        <div class="portnox-metric-label">Unauthenticated Devices</div>
                    </div>
                </div>
            </div>
            
            <div class="portnox-card">
                <div class="portnox-card-header">Network Access</div>
                <div class="portnox-card-body">
                    <div class="portnox-metric">
                        <div class="portnox-metric-value" id="portnox-allowed-count">0</div>
                        <div class="portnox-metric-label">Allowed Devices</div>
                    </div>
                    <div class="portnox-metric">
                        <div class="portnox-metric-value" id="portnox-blocked-count">0</div>
                        <div class="portnox-metric-label">Blocked Devices</div>
                    </div>
                </div>
            </div>
            
            <div class="portnox-card">
                <div class="portnox-card-header">Device Types</div>
                <div class="portnox-card-body">
                    <div class="portnox-metric">
                        <div class="portnox-metric-value" id="portnox-managed-count">0</div>
                        <div class="portnox-metric-label">Managed Devices</div>
                    </div>
                    <div class="portnox-metric">
                        <div class="portnox-metric-value" id="portnox-byod-count">0</div>
                        <div class="portnox-metric-label">BYOD Devices</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="portnox-device-list">
            <h3>Recent Devices</h3>
            <table class="portnox-device-table">
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Device Name</th>
                        <th>MAC Address</th>
                        <th>IP Address</th>
                        <th>User</th>
                        <th>Authentication</th>
                        <th>Last Seen</th>
                    </tr>
                </thead>
                <tbody id="portnox-device-table-body">
                    <!-- Device rows will be populated here -->
                </tbody>
            </table>
        </div>
    `;
    
    // Add to content
    portnoxContent.innerHTML = '';
    portnoxContent.appendChild(connectionSection);
    portnoxContent.appendChild(dashboardSection);
    
    // Initialize event listeners
    initPortnoxEventListeners();
}

/**
 * Initialize Portnox event listeners
 */
function initPortnoxEventListeners() {
    const connectBtn = document.getElementById('portnox-connect-btn');
    const cancelBtn = document.getElementById('portnox-cancel-connection');
    const saveBtn = document.getElementById('portnox-save-connection');
    const connectionForm = document.getElementById('portnox-connection-form');
    
    if (connectBtn) {
        connectBtn.addEventListener('click', function() {
            connectionForm.style.display = 'block';
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            connectionForm.style.display = 'none';
        });
    }
    
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            connectToPortnox();
        });
    }
}

/**
 * Connect to Portnox Clear
 */
function connectToPortnox() {
    const tenantInput = document.getElementById('portnox-tenant');
    const apiKeyInput = document.getElementById('portnox-api-key');
    const apiSecretInput = document.getElementById('portnox-api-secret');
    
    if (!tenantInput || !apiKeyInput || !apiSecretInput) return;
    
    const tenant = tenantInput.value.trim();
    const apiKey = apiKeyInput.value.trim();
    const apiSecret = apiSecretInput.value.trim();
    
    if (!tenant || !apiKey || !apiSecret) {
        alert('Please enter all required fields.');
        return;
    }
    
    // Simulate connection
    document.getElementById('portnox-status-text').textContent = 'Connecting to Portnox Clear...';
    
    // In a real implementation, this would make an API call to verify credentials
    setTimeout(() => {
        // Simulate successful connection
        portnoxConnection.connected = true;
        portnoxConnection.tenant = tenant;
        portnoxConnection.apiKey = apiKey;
        portnoxConnection.apiSecret = apiSecret;
        
        // Update UI
        updatePortnoxConnectionStatus();
        
        // Load dashboard data
        loadPortnoxDashboardData();
        
        // Hide connection form
        document.getElementById('portnox-connection-form').style.display = 'none';
    }, 1500);
}

/**
 * Update Portnox connection status in UI
 */
function updatePortnoxConnectionStatus() {
    const statusIndicator = document.querySelector('.portnox-status-indicator');
    const statusText = document.getElementById('portnox-status-text');
    const connectBtn = document.getElementById('portnox-connect-btn');
    const dashboardContainer = document.getElementById('portnox-dashboard-container');
    
    if (!statusIndicator || !statusText || !connectBtn || !dashboardContainer) return;
    
    if (portnoxConnection.connected) {
        statusIndicator.className = 'portnox-status-indicator portnox-connected';
        statusText.textContent = `Connected to Portnox Clear (Tenant: ${portnoxConnection.tenant})`;
        connectBtn.textContent = 'Disconnect';
        dashboardContainer.style.display = 'block';
    } else {
        statusIndicator.className = 'portnox-status-indicator portnox-disconnected';
        statusText.textContent = 'Not connected to Portnox Clear';
        connectBtn.textContent = 'Connect';
        dashboardContainer.style.display = 'none';
    }
}

/**
 * Load Portnox dashboard data
 */
function loadPortnoxDashboardData() {
    // In a real implementation, this would make API calls to fetch data
    // For this demo, we'll simulate data
    
    // Update metrics
    document.getElementById('portnox-authenticated-count').textContent = '127';
    document.getElementById('portnox-unauthenticated-count').textContent = '18';
    document.getElementById('portnox-allowed-count').textContent = '142';
    document.getElementById('portnox-blocked-count').textContent = '3';
    document.getElementById('portnox-managed-count').textContent = '98';
    document.getElementById('portnox-byod-count').textContent = '47';
    
    // Update device table
    const tableBody = document.getElementById('portnox-device-table-body');
    if (!tableBody) return;
    
    // Clear table
    tableBody.innerHTML = '';
    
    // Generate simulated device data
    const devices = [
        {
            status: 'Authenticated',
            name: 'Desktop-WS2025',
            mac: '00:1A:2B:3C:4D:5E',
            ip: '192.168.1.101',
            user: 'jsmith',
            authMethod: 'EAP-TLS',
            lastSeen: '2 minutes ago'
        },
        {
            status: 'Authenticated',
            name: 'Laptop-MKT15',
            mac: '00:1A:2B:3C:4D:6F',
            ip: '192.168.1.102',
            user: 'agarcia',
            authMethod: 'PEAP-MSCHAPv2',
            lastSeen: '5 minutes ago'
        },
        {
            status: 'Unauthenticated',
            name: 'Unknown Device',
            mac: '00:1A:2B:3C:4D:7G',
            ip: '192.168.1.103',
            user: 'N/A',
            authMethod: 'Failed',
            lastSeen: '12 minutes ago'
        },
        {
            status: 'Authenticated',
            name: 'iPhone-CEO',
            mac: '00:1A:2B:3C:4D:8H',
            ip: '192.168.1.104',
            user: 'jcarter',
            authMethod: 'EAP-TLS',
            lastSeen: '15 minutes ago'
        },
        {
            status: 'Authenticated',
            name: 'Android-Dev2',
            mac: '00:1A:2B:3C:4D:9I',
            ip: '192.168.1.105',
            user: 'rlopez',
            authMethod: 'PEAP-MSCHAPv2',
            lastSeen: '23 minutes ago'
        }
    ];
    
    // Add rows to table
    devices.forEach(device => {
        const row = document.createElement('tr');
        
        // Status cell
        const statusCell = document.createElement('td');
        const statusElement = document.createElement('div');
        statusElement.className = 'portnox-device-status';
        
        const statusIndicator = document.createElement('span');
        statusIndicator.className = `portnox-device-status-indicator portnox-device-${device.status.toLowerCase()}`;
        statusElement.appendChild(statusIndicator);
        
        statusElement.appendChild(document.createTextNode(device.status));
        statusCell.appendChild(statusElement);
        row.appendChild(statusCell);
        
        // Add other cells
        ['name', 'mac', 'ip', 'user', 'authMethod', 'lastSeen'].forEach(field => {
            const cell = document.createElement('td');
            cell.textContent = device[field];
            row.appendChild(cell);
        });
        
        tableBody.appendChild(row);
    });
}

/**
 * Check for stored Portnox connection
 */
function checkStoredPortnoxConnection() {
    // Implementation details
    console.log('Checking stored Portnox connection');
}
