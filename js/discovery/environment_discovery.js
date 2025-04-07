/**
 * Dot1Xer Supreme - Environment Discovery
 * Provides network discovery and 802.1X readiness assessment
 * Version: 3.0.0
 */

// Configuration options
const DISCOVERY_CONFIG = {
    maxDevices: 1000,
    timeout: 60, // seconds
    retries: 2,
    concurrentScans: 10
};

// Device types and their 802.1X compatibility status
const DEVICE_TYPES = {
    WORKSTATION: {
        name: 'Workstation',
        icon: 'computer',
        color: '#4caf50',
        dot1xSupport: 'SUPPORTED'
    },
    SERVER: {
        name: 'Server',
        icon: 'server',
        color: '#2196f3',
        dot1xSupport: 'SUPPORTED'
    },
    PHONE: {
        name: 'IP Phone',
        icon: 'phone',
        color: '#ff9800',
        dot1xSupport: 'SUPPORTED'
    },
    PRINTER: {
        name: 'Printer',
        icon: 'print',
        color: '#9c27b0',
        dot1xSupport: 'PARTIAL'
    },
    NETWORK: {
        name: 'Network Device',
        icon: 'router',
        color: '#f44336',
        dot1xSupport: 'SUPPORTED'
    },
    IOT: {
        name: 'IoT Device',
        icon: 'devices_other',
        color: '#00bcd4',
        dot1xSupport: 'PARTIAL'
    },
    UNKNOWN: {
        name: 'Unknown',
        icon: 'device_unknown',
        color: '#9e9e9e',
        dot1xSupport: 'UNKNOWN'
    }
};

// Initialize discovery module
function initializeDiscovery() {
    // Set up event listeners for discovery controls
    const startDiscoveryBtn = document.getElementById('start-discovery');
    const importDevicesBtn = document.getElementById('import-devices');
    const exportResultsBtn = document.getElementById('export-results');
    const clearResultsBtn = document.getElementById('clear-results');
    
    if (startDiscoveryBtn) {
        startDiscoveryBtn.addEventListener('click', startDiscovery);
    }
    
    if (importDevicesBtn) {
        importDevicesBtn.addEventListener('click', importDevices);
    }
    
    if (exportResultsBtn) {
        exportResultsBtn.addEventListener('click', showExportOptions);
    }
    
    if (clearResultsBtn) {
        clearResultsBtn.addEventListener('click', clearResults);
    }
    
    // Initialize results filter
    const resultsFilter = document.getElementById('results-filter');
    if (resultsFilter) {
        resultsFilter.addEventListener('input', filterResults);
    }
    
    // Initialize device type filter
    const deviceTypeFilter = document.getElementById('device-type-filter');
    if (deviceTypeFilter) {
        // Add device type options
        deviceTypeFilter.innerHTML = '<option value="">All Device Types</option>';
        
        for (const [key, value] of Object.entries(DEVICE_TYPES)) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = value.name;
            deviceTypeFilter.appendChild(option);
        }
        
        deviceTypeFilter.addEventListener('change', filterResults);
    }
    
    // Initialize dot1x support filter
    const dot1xSupportFilter = document.getElementById('dot1x-support-filter');
    if (dot1xSupportFilter) {
        dot1xSupportFilter.addEventListener('change', filterResults);
    }
}

// Start network discovery process
function startDiscovery() {
    // Get discovery parameters
    const ipRange = document.getElementById('ip-range').value;
    const scanType = document.getElementById('scan-type').value;
    
    if (!ipRange) {
        alert('Please enter an IP range to scan.');
        return;
    }
    
    // Parse IP range
    const ipRangeRegex = /^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\/(\d{1,2})$/;
    const ipRangeMatch = ipRange.match(ipRangeRegex);
    
    if (!ipRangeMatch) {
        alert('Invalid IP range format. Please use CIDR notation (e.g., 192.168.1.0/24).');
        return;
    }
    
    // Get base IP and subnet mask
    const baseIp = ipRangeMatch[1];
    const subnetMask = parseInt(ipRangeMatch[2], 10);
    
    if (subnetMask < 8 || subnetMask > 32) {
        alert('Subnet mask must be between 8 and 32.');
        return;
    }
    
    // Calculate number of addresses to scan
    const numAddresses = Math.pow(2, 32 - subnetMask);
    
    if (numAddresses > DISCOVERY_CONFIG.maxDevices) {
        const confirm = window.confirm(`This will scan ${numAddresses} IP addresses, which exceeds the recommended maximum of ${DISCOVERY_CONFIG.maxDevices}. This may take a long time. Do you want to continue?`);
        
        if (!confirm) {
            return;
        }
    }
    
    // Clear previous results
    clearResults();
    
    // Show progress bar
    const progressBar = document.querySelector('.progress-bar');
    const progressStatus = document.querySelector('.progress-status');
    
    if (progressBar) {
        progressBar.style.width = '0%';
    }
    
    if (progressStatus) {
        progressStatus.innerHTML = '<span>0%</span><span>Initializing...</span>';
    }
    
    // Simulate discovery process (since we can't actually scan the network in a web app)
    simulateDiscoveryProcess(baseIp, subnetMask, scanType);
}

// Simulate the discovery process
function simulateDiscoveryProcess(baseIp, subnetMask, scanType) {
    // Show discovery in progress
    document.getElementById('discovery-in-progress').style.display = 'block';
    document.getElementById('discovery-complete').style.display = 'none';
    
    // Get progress elements
    const progressBar = document.querySelector('.progress-bar');
    const progressStatus = document.querySelector('.progress-status');
    
    // Calculate total devices to be discovered
    const totalDevices = Math.min(Math.pow(2, 32 - subnetMask), 100); // Limit to 100 for simulation
    
    // Initialize counters
    let discoveredDevices = 0;
    let currentProgress = 0;
    
    // Simulate discovery over time
    const discoveryInterval = setInterval(() => {
        // Increment discovered devices
        discoveredDevices++;
        
        // Calculate progress percentage
        const progress = Math.round((discoveredDevices / totalDevices) * 100);
        
        // Update progress bar
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
        
        // Update progress status
        if (progressStatus) {
            progressStatus.innerHTML = `<span>${progress}%</span><span>Discovered ${discoveredDevices} devices</span>`;
        }
        
        // Generate a simulated device
        const device = generateSimulatedDevice(baseIp, discoveredDevices);
        
        // Add device to results
        addDeviceToResults(device);
        
        // Check if discovery is complete
        if (discoveredDevices >= totalDevices) {
            clearInterval(discoveryInterval);
            
            // Show discovery complete
            document.getElementById('discovery-in-progress').style.display = 'none';
            document.getElementById('discovery-complete').style.display = 'block';
            
            // Update status
            const totalResults = document.querySelectorAll('#discovery-results-table tbody tr').length;
            document.getElementById('result-count').textContent = totalResults;
            
            // Update the network map visualization
            updateNetworkMap();
        }
    }, 100); // Simulate a new device every 100ms
}

// Generate a simulated device for testing
function generateSimulatedDevice(baseIp, index) {
    // Generate various device types with different probabilities
    let deviceType;
    const rand = Math.random();
    
    if (rand < 0.4) {
        deviceType = 'WORKSTATION';
    } else if (rand < 0.55) {
        deviceType = 'SERVER';
    } else if (rand < 0.65) {
        deviceType = 'PHONE';
    } else if (rand < 0.75) {
        deviceType = 'PRINTER';
    } else if (rand < 0.85) {
        deviceType = 'NETWORK';
    } else if (rand < 0.95) {
        deviceType = 'IOT';
    } else {
        deviceType = 'UNKNOWN';
    }
    
    // Generate vendor based on device type
    let vendor;
    switch (deviceType) {
        case 'WORKSTATION':
            vendor = ['Dell', 'HP', 'Lenovo', 'Apple', 'Microsoft'][Math.floor(Math.random() * 5)];
            break;
        case 'SERVER':
            vendor = ['Dell', 'HP', 'IBM', 'Cisco', 'Supermicro'][Math.floor(Math.random() * 5)];
            break;
        case 'PHONE':
            vendor = ['Cisco', 'Polycom', 'Avaya', 'Yealink', 'Grandstream'][Math.floor(Math.random() * 5)];
            break;
        case 'PRINTER':
            vendor = ['HP', 'Brother', 'Canon', 'Epson', 'Lexmark'][Math.floor(Math.random() * 5)];
            break;
        case 'NETWORK':
            vendor = ['Cisco', 'Juniper', 'Aruba', 'Fortinet', 'Extreme'][Math.floor(Math.random() * 5)];
            break;
        case 'IOT':
            vendor = ['Nest', 'Ring', 'Philips', 'Samsung', 'Honeywell'][Math.floor(Math.random() * 5)];
            break;
        default:
            vendor = 'Unknown';
    }
    
    // Generate random IP in the base subnet
    const ipParts = baseIp.split('.');
    ipParts[3] = (parseInt(ipParts[3]) + index) % 255;
    const ip = ipParts.join('.');
    
    // Generate random MAC address
    const mac = generateRandomMac(vendor);
    
    // Generate hostname based on device type and vendor
    const hostname = generateHostname(deviceType, vendor, index);
    
    // Generate 802.1X status
    const dot1xStatus = generateDot1xStatus(deviceType, vendor);
    
    // Generate last seen timestamp (recent)
    const lastSeen = new Date(Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000)).toLocaleString();
    
    // Return the device object
    return {
        id: index,
        ip: ip,
        mac: mac,
        hostname: hostname,
        vendor: vendor,
        type: deviceType,
        os: generateOS(deviceType, vendor),
        dot1xStatus: dot1xStatus,
        lastSeen: lastSeen,
        ports: generatePorts(deviceType)
    };
}

// Generate a random MAC address with vendor prefix
function generateRandomMac(vendor) {
    // Simplified vendor prefixes (not actual OUIs)
    const vendorPrefixes = {
        'Dell': '00:1E:C9',
        'HP': '00:17:A4',
        'Lenovo': '00:1F:16',
        'Apple': '00:1B:63',
        'Microsoft': '00:15:5D',
        'IBM': '00:18:B1',
        'Cisco': '00:0C:29',
        'Supermicro': '00:25:90',
        'Polycom': '00:04:F2',
        'Avaya': '00:1B:4F',
        'Yealink': '00:15:65',
        'Grandstream': '00:0B:82',
        'Brother': '00:1B:A9',
        'Canon': '00:1E:8F',
        'Epson': '00:26:AB',
        'Lexmark': '00:21:B7',
        'Juniper': '00:05:85',
        'Aruba': '00:24:6C',
        'Fortinet': '00:09:0F',
        'Extreme': '00:04:96',
        'Nest': '18:B4:30',
        'Ring': '00:62:6E',
        'Philips': '00:17:88',
        'Samsung': '00:15:5D',
        'Honeywell': '00:1E:C0'
    };
    
    // Get vendor prefix or use a random one
    const prefix = vendorPrefixes[vendor] || `00:${Math.floor(Math.random() * 100).toString(16).padStart(2, '0')}:${Math.floor(Math.random() * 100).toString(16).padStart(2, '0')}`;
    
    // Generate random suffix
    const suffix = [
        Math.floor(Math.random() * 256).toString(16).padStart(2, '0'),
        Math.floor(Math.random() * 256).toString(16).padStart(2, '0'),
        Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
    ].join(':');
    
    return `${prefix}:${suffix}`;
}

// Generate a hostname based on device type and vendor
function generateHostname(deviceType, vendor, index) {
    const prefixes = {
        'WORKSTATION': ['PC', 'WS', 'DESKTOP', 'LAPTOP'],
        'SERVER': ['SRV', 'SERVER', 'HOST', 'VM'],
        'PHONE': ['PHONE', 'VOIP', 'IP-PHONE'],
        'PRINTER': ['PRINT', 'PRINTER', 'MFP', 'SCANNER'],
        'NETWORK': ['SW', 'RTR', 'AP', 'SWITCH', 'ROUTER'],
        'IOT': ['IOT', 'DEVICE', 'SENSOR'],
        'UNKNOWN': ['DEVICE', 'HOST']
    };
    
    // Get random prefix for the device type
    const prefix = prefixes[deviceType][Math.floor(Math.random() * prefixes[deviceType].length)];
    
    // Create hostname with prefix, vendor, and index
    return `${prefix}-${vendor.toUpperCase()}-${(index % 1000).toString().padStart(3, '0')}`;
}

// Generate OS based on device type and vendor
function generateOS(deviceType, vendor) {
    switch (deviceType) {
        case 'WORKSTATION':
            if (vendor === 'Apple') {
                return 'macOS ' + ['10.15', '11.0', '12.0', '13.0'][Math.floor(Math.random() * 4)];
            } else if (vendor === 'Microsoft') {
                return 'Windows ' + ['10', '11'][Math.floor(Math.random() * 2)];
            } else {
                return ['Windows 10', 'Windows 11', 'Linux Ubuntu', 'Linux Fedora', 'ChromeOS'][Math.floor(Math.random() * 5)];
            }
        case 'SERVER':
            return ['Windows Server 2019', 'Windows Server 2022', 'Linux RHEL 8', 'Linux Ubuntu Server', 'VMware ESXi 7.0'][Math.floor(Math.random() * 5)];
        case 'PHONE':
            return vendor + ' Phone OS';
        case 'PRINTER':
            return vendor + ' Printer Firmware';
        case 'NETWORK':
            if (vendor === 'Cisco') {
                return ['IOS', 'IOS-XE', 'NX-OS'][Math.floor(Math.random() * 3)];
            } else if (vendor === 'Juniper') {
                return 'Junos OS';
            } else if (vendor === 'Aruba') {
                return 'ArubaOS';
            } else {
                return vendor + ' OS';
            }
        case 'IOT':
            return vendor + ' IoT Firmware';
        default:
            return 'Unknown OS';
    }
}

// Generate 802.1X status based on device type and vendor
function generateDot1xStatus(deviceType, vendor) {
    const baseStatus = DEVICE_TYPES[deviceType].dot1xSupport;
    
    // Add some variability based on vendor
    if (baseStatus === 'SUPPORTED') {
        // 10% chance of partial support for supposedly supported devices
        return Math.random() < 0.1 ? 'PARTIAL' : 'SUPPORTED';
    } else if (baseStatus === 'PARTIAL') {
        // For partial support, randomize between supported, partial, and unsupported
        const rand = Math.random();
        if (rand < 0.3) {
            return 'SUPPORTED';
        } else if (rand < 0.8) {
            return 'PARTIAL';
        } else {
            return 'UNSUPPORTED';
        }
    } else if (baseStatus === 'UNKNOWN') {
        // For unknown, distribute between the three statuses
        const rand = Math.random();
        if (rand < 0.3) {
            return 'SUPPORTED';
        } else if (rand < 0.6) {
            return 'PARTIAL';
        } else if (rand < 0.8) {
            return 'UNSUPPORTED';
        } else {
            return 'UNKNOWN';
        }
    }
    
    return baseStatus;
}

// Generate port information based on device type
function generatePorts(deviceType) {
    // Default port - all devices have at least one network port
    const ports = [{
        interface: 'eth0',
        speed: '1Gbps',
        status: 'up'
    }];
    
    // Add additional ports based on device type
    switch (deviceType) {
        case 'WORKSTATION':
            // Some workstations have Wi-Fi
            if (Math.random() < 0.7) {
                ports.push({
                    interface: 'wlan0',
                    speed: ['802.11ac', '802.11ax'][Math.floor(Math.random() * 2)],
                    status: Math.random() < 0.5 ? 'up' : 'down'
                });
            }
            break;
        case 'SERVER':
            // Servers typically have multiple Ethernet ports
            const numPorts = Math.floor(Math.random() * 4) + 1; // 1-4 additional ports
            for (let i = 1; i <= numPorts; i++) {
                ports.push({
                    interface: `eth${i}`,
                    speed: ['1Gbps', '10Gbps'][Math.floor(Math.random() * 2)],
                    status: Math.random() < 0.7 ? 'up' : 'down'
                });
            }
            break;
        case 'NETWORK':
            // Network devices have many ports
            const numSwitchPorts = Math.floor(Math.random() * 24) + 1; // 1-24 additional ports
            for (let i = 1; i <= numSwitchPorts; i++) {
                ports.push({
                    interface: `GigabitEthernet1/0/${i}`,
                    speed: ['1Gbps', '10Gbps'][Math.floor(Math.random() * 2)],
                    status: Math.random() < 0.5 ? 'up' : 'down'
                });
            }
            break;
    }
    
    return ports;
}

// Add a device to the results table
function addDeviceToResults(device) {
    const resultsTable = document.getElementById('discovery-results-table');
    const tbody = resultsTable.querySelector('tbody');
    
    // Create new row
    const row = document.createElement('tr');
    row.setAttribute('data-device-id', device.id);
    row.setAttribute('data-device-type', device.type);
    row.setAttribute('data-dot1x-status', device.dot1xStatus);
    
    // Create cells
    row.innerHTML = `
        <td>${device.ip}</td>
        <td>${device.mac}</td>
        <td>${device.hostname}</td>
        <td>${device.vendor}</td>
        <td>
            <span class="auth-status status-${device.dot1xStatus.toLowerCase()}">
                ${device.dot1xStatus}
            </span>
        </td>
        <td>${DEVICE_TYPES[device.type].name}</td>
        <td>${device.lastSeen}</td>
        <td class="action-cell">
            <button class="table-action view-details" data-device-id="${device.id}">Details</button>
            <button class="table-action configure" data-device-id="${device.id}">Configure</button>
        </td>
    `;
    
    // Add row to table
    tbody.appendChild(row);
    
    // Store device data in memory for later reference
    window.discoveredDevices = window.discoveredDevices || {};
    window.discoveredDevices[device.id] = device;
    
    // Add event listeners for buttons
    row.querySelector('.view-details').addEventListener('click', () => {
        showDeviceDetails(device.id);
    });
    
    row.querySelector('.configure').addEventListener('click', () => {
        configureDevice(device.id);
    });
}

// Show device details
function showDeviceDetails(deviceId) {
    const device = window.discoveredDevices[deviceId];
    
    if (!device) {
        return;
    }
    
    // Create device details panel if it doesn't exist
    let detailsPanel = document.getElementById('device-details-panel');
    
    if (!detailsPanel) {
        detailsPanel = document.createElement('div');
        detailsPanel.id = 'device-details-panel';
        detailsPanel.className = 'device-details-panel';
        document.body.appendChild(detailsPanel);
    }
    
    // Show device type icon
    const deviceType = DEVICE_TYPES[device.type];
    
    // Populate details panel
    detailsPanel.innerHTML = `
        <div class="device-details-header">
            <h3>${device.hostname}</h3>
            <button class="close-details">&times;</button>
        </div>
        <div class="device-details-content">
            <dl>
                <dt>IP Address:</dt>
                <dd>${device.ip}</dd>
                
                <dt>MAC Address:</dt>
                <dd>${device.mac}</dd>
                
                <dt>Vendor:</dt>
                <dd>${device.vendor}</dd>
                
                <dt>Device Type:</dt>
                <dd>${deviceType.name}</dd>
                
                <dt>Operating System:</dt>
                <dd>${device.os}</dd>
                
                <dt>802.1X Support:</dt>
                <dd><span class="auth-status status-${device.dot1xStatus.toLowerCase()}">${device.dot1xStatus}</span></dd>
                
                <dt>Last Seen:</dt>
                <dd>${device.lastSeen}</dd>
                
                <dt>Network Ports:</dt>
                <dd>
                    <ul>
                        ${device.ports.map(port => `<li>${port.interface} (${port.speed}): ${port.status}</li>`).join('')}
                    </ul>
                </dd>
            </dl>
        </div>
        <div class="device-details-actions">
            <button class="primary-button" onclick="configureDevice(${device.id})">Configure 802.1X</button>
            <button class="secondary-button" onclick="document.getElementById('device-details-panel').style.display='none'">Close</button>
        </div>
    `;
    
    // Show the panel
    detailsPanel.style.display = 'block';
    
    // Add event listener for close button
    detailsPanel.querySelector('.close-details').addEventListener('click', () => {
        detailsPanel.style.display = 'none';
    });
}

// Configure a device for 802.1X
function configureDevice(deviceId) {
    const device = window.discoveredDevices[deviceId];
    
    if (!device) {
        return;
    }
    
    // Redirect to the configuration tab with pre-filled values
    const configTab = document.querySelector('nav a[data-tab="config"]');
    if (configTab) {
        configTab.click();
        
        // Set vendor based on discovered network device type
        setTimeout(() => {
            // Determine the vendor - if it's a network device, use its vendor
            let vendor = '';
            if (device.type === 'NETWORK') {
                vendor = device.vendor.toLowerCase();
                // Convert some common vendor names to match dropdown options
                if (vendor === 'hp') vendor = 'hp';
                if (vendor === 'aruba') vendor = 'aruba';
                if (vendor === 'juniper') vendor = 'juniper';
                if (vendor === 'cisco') vendor = 'cisco';
                if (vendor === 'fortinet') vendor = 'fortinet';
            }
            
            // Set vendor if it matches an available option
            const vendorSelect = document.getElementById('vendor');
            if (vendorSelect && vendor) {
                for (let i = 0; i < vendorSelect.options.length; i++) {
                    if (vendorSelect.options[i].value === vendor) {
                        vendorSelect.value = vendor;
                        
                        // Trigger change event to update platform options
                        const event = new Event('change');
                        vendorSelect.dispatchEvent(event);
                        
                        break;
                    }
                }
            }
            
            // Set interface to the device's primary interface (first port) if available
            if (device.ports && device.ports.length > 0) {
                const interfaceInput = document.getElementById('interface');
                if (interfaceInput) {
                    interfaceInput.value = device.ports[0].interface;
                }
            }
            
            // If it's an IP phone, enable voice VLAN
            if (device.type === 'PHONE') {
                const vlanVoiceInput = document.getElementById('vlan-voice');
                if (vlanVoiceInput && !vlanVoiceInput.value) {
                    vlanVoiceInput.value = '20'; // Default voice VLAN
                }
            }
            
            // If device has limited 802.1X support, suggest MAB
            if (device.dot1xStatus === 'PARTIAL' || device.dot1xStatus === 'UNSUPPORTED') {
                const authMethodSelect = document.getElementById('auth-method');
                if (authMethodSelect) {
                    authMethodSelect.value = 'mab-only';
                    
                    // Trigger change event
                    const event = new Event('change');
                    authMethodSelect.dispatchEvent(event);
                }
            }
            
            // Alert the user about configuration recommendations
            let message = `Configuration started for ${device.hostname} (${device.ip}).\n\n`;
            
            if (device.dot1xStatus === 'SUPPORTED') {
                message += 'This device supports full 802.1X authentication.';
            } else if (device.dot1xStatus === 'PARTIAL') {
                message += 'This device has limited 802.1X support. MAC Authentication Bypass (MAB) is recommended.';
            } else if (device.dot1xStatus === 'UNSUPPORTED') {
                message += 'This device does not support 802.1X. MAC Authentication Bypass (MAB) is required.';
            } else {
                message += '802.1X support status is unknown. Consider testing with monitor mode first.';
            }
            
            alert(message);
        }, 500);
    }
}

// Import devices from a file
function importDevices() {
    // Create a hidden file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv,.json';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);
    
    // Trigger the file selection dialog
    fileInput.click();
    
    // Handle file selection
    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        
        if (!file) {
            return;
        }
        
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const contents = e.target.result;
            
            try {
                let devices = [];
                
                // Parse file based on extension
                if (file.name.endsWith('.json')) {
                    devices = JSON.parse(contents);
                } else if (file.name.endsWith('.csv')) {
                    devices = parseCSV(contents);
                } else {
                    throw new Error('Unsupported file format');
                }
                
                // Clear previous results
                clearResults();
                
                // Add imported devices to results
                let counter = 0;
                devices.forEach(device => {
                    // Add missing fields if necessary
                    device.id = device.id || counter++;
                    device.type = device.type || 'UNKNOWN';
                    device.dot1xStatus = device.dot1xStatus || 'UNKNOWN';
                    device.lastSeen = device.lastSeen || new Date().toLocaleString();
                    device.ports = device.ports || [{
                        interface: 'eth0',
                        speed: '1Gbps',
                        status: 'up'
                    }];
                    
                    // Add to results
                    addDeviceToResults(device);
                });
                
                // Update status
                const totalResults = document.querySelectorAll('#discovery-results-table tbody tr').length;
                document.getElementById('result-count').textContent = totalResults;
                
                // Update network map
                updateNetworkMap();
                
                // Show success message
                alert(`Successfully imported ${devices.length} devices.`);
            } catch (error) {
                alert(`Error importing devices: ${error.message}`);
            }
        };
        
        reader.readAsText(file);
        
        // Clean up
        document.body.removeChild(fileInput);
    });
}

// Parse CSV file
function parseCSV(contents) {
    const lines = contents.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    
    const devices = [];
    
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (!line) {
            continue;
        }
        
        const values = line.split(',').map(value => value.trim());
        const device = {};
        
        headers.forEach((header, index) => {
            if (index < values.length) {
                device[header] = values[index];
            }
        });
        
        devices.push(device);
    }
    
    return devices;
}

// Show export options
function showExportOptions() {
    const exportBtn = document.getElementById('export-results');
    
    if (!exportBtn) {
        return;
    }
    
    // Create export options panel if it doesn't exist
    let exportOptions = document.querySelector('.export-options');
    
    if (!exportOptions) {
        exportOptions = document.createElement('div');
        exportOptions.className = 'export-options';
        exportOptions.innerHTML = `
            <div class="export-option" data-format="csv">Export as CSV</div>
            <div class="export-option" data-format="json">Export as JSON</div>
            <div class="export-option" data-format="excel">Export for Excel</div>
        `;
        document.body.appendChild(exportOptions);
        
        // Add event listeners
        exportOptions.querySelectorAll('.export-option').forEach(option => {
            option.addEventListener('click', function() {
                const format = this.getAttribute('data-format');
                exportResults(format);
                exportOptions.classList.remove('active');
            });
        });
    }
    
    // Position the options panel near the export button
    const btnRect = exportBtn.getBoundingClientRect();
    exportOptions.style.top = (btnRect.bottom + window.scrollY) + 'px';
    exportOptions.style.left = (btnRect.left + window.scrollX) + 'px';
    
    // Show the options
    exportOptions.classList.toggle('active');
    
    // Hide options when clicking outside
    const hideOptions = function(event) {
        if (!exportOptions.contains(event.target) && event.target !== exportBtn) {
            exportOptions.classList.remove('active');
            document.removeEventListener('click', hideOptions);
        }
    };
    
    setTimeout(() => {
        document.addEventListener('click', hideOptions);
    }, 0);
}

// Export results in the specified format
function exportResults(format) {
    // Get all devices
    const devices = Object.values(window.discoveredDevices || {});
    
    if (devices.length === 0) {
        alert('No devices to export.');
        return;
    }
    
    let content = '';
    let fileName = `dot1xer_device_discovery_${new Date().toISOString().replace(/:/g, '-')}`;
    let mimeType = '';
    
    if (format === 'csv') {
        // Generate CSV content
        const headers = ['IP', 'MAC', 'Hostname', 'Vendor', '802.1X Status', 'Type', 'OS', 'Last Seen'];
        content = headers.join(',') + '\n';
        
        devices.forEach(device => {
            const row = [
                device.ip,
                device.mac,
                device.hostname,
                device.vendor,
                device.dot1xStatus,
                DEVICE_TYPES[device.type].name,
                device.os,
                device.lastSeen
            ].map(value => `"${value}"`).join(',');
            
            content += row + '\n';
        });
        
        fileName += '.csv';
        mimeType = 'text/csv';
    } else if (format === 'json') {
        // Generate JSON content
        content = JSON.stringify(devices, null, 2);
        fileName += '.json';
        mimeType = 'application/json';
    } else if (format === 'excel') {
        // Generate CSV with Excel-friendly formatting
        const headers = ['IP', 'MAC', 'Hostname', 'Vendor', '802.1X Status', 'Type', 'OS', 'Last Seen'];
        content = headers.join(',') + '\n';
        
        devices.forEach(device => {
            const row = [
                device.ip,
                device.mac,
                device.hostname,
                device.vendor,
                device.dot1xStatus,
                DEVICE_TYPES[device.type].name,
                device.os,
                device.lastSeen
            ].map(value => `"${value}"`).join(',');
            
            content += row + '\n';
        });
        
        fileName += '.csv';
        mimeType = 'text/csv';
    }
    
    // Create file and download
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    
    // Clean up
    setTimeout(() => {
        URL.revokeObjectURL(url);
    }, 100);
}

// Clear results
function clearResults() {
    const resultsTable = document.getElementById('discovery-results-table');
    
    if (resultsTable) {
        const tbody = resultsTable.querySelector('tbody');
        tbody.innerHTML = '';
    }
    
    // Clear stored devices
    window.discoveredDevices = {};
    
    // Reset result count
    document.getElementById('result-count').textContent = '0';
    
    // Hide progress sections
    document.getElementById('discovery-in-progress').style.display = 'none';
    document.getElementById('discovery-complete').style.display = 'none';
    
    // Clear network map
    const networkMap = document.getElementById('network-map');
    if (networkMap) {
        networkMap.innerHTML = '<div class="map-placeholder">Network map will appear here after discovery.</div>';
    }
}

// Filter results based on search term and filters
function filterResults() {
    const searchTerm = document.getElementById('results-filter').value.toLowerCase();
    const deviceTypeFilter = document.getElementById('device-type-filter').value;
    const dot1xSupportFilter = document.getElementById('dot1x-support-filter').value;
    
    const rows = document.querySelectorAll('#discovery-results-table tbody tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
        const ip = row.cells[0].textContent.toLowerCase();
        const mac = row.cells[1].textContent.toLowerCase();
        const hostname = row.cells[2].textContent.toLowerCase();
        const vendor = row.cells[3].textContent.toLowerCase();
        const deviceType = row.getAttribute('data-device-type');
        const dot1xStatus = row.getAttribute('data-dot1x-status');
        
        // Check search term
        const matchesSearch = (
            !searchTerm || 
            ip.includes(searchTerm) || 
            mac.includes(searchTerm) || 
            hostname.includes(searchTerm) || 
            vendor.includes(searchTerm)
        );
        
        // Check device type filter
        const matchesDeviceType = !deviceTypeFilter || deviceType === deviceTypeFilter;
        
        // Check 802.1X support filter
        const matchesDot1xSupport = !dot1xSupportFilter || dot1xStatus === dot1xSupportFilter;
        
        // Show or hide row
        if (matchesSearch && matchesDeviceType && matchesDot1xSupport) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Update visible count
    document.getElementById('result-count').textContent = visibleCount;
}

// Update the network map visualization
function updateNetworkMap() {
    const networkMap = document.getElementById('network-map');
    
    if (!networkMap) {
        return;
    }
    
    // Clear previous content
    networkMap.innerHTML = '';
    
    // Get all devices
    const devices = Object.values(window.discoveredDevices || {});
    
    if (devices.length === 0) {
        networkMap.innerHTML = '<div class="map-placeholder">No devices found. Run a discovery scan first.</div>';
        return;
    }
    
    // Create map controls
    const mapControls = document.createElement('div');
    mapControls.className = 'map-controls';
    mapControls.innerHTML = `
        <button title="Zoom In">+</button>
        <button title="Zoom Out">-</button>
        <button title="Reset View">?</button>
    `;
    networkMap.appendChild(mapControls);
    
    // Create device type indicators
    const indicators = document.createElement('div');
    indicators.className = 'device-type-indicators';
    
    for (const [key, value] of Object.entries(DEVICE_TYPES)) {
        if (devices.some(device => device.type === key)) {
            const indicator = document.createElement('div');
            indicator.className = 'device-type-indicator';
            indicator.innerHTML = `
                <div class="indicator-color indicator-${key.toLowerCase()}"></div>
                <span>${value.name}</span>
            `;
            indicators.appendChild(indicator);
        }
    }
    
    networkMap.appendChild(indicators);
    
    // Create canvas for network map
    const canvas = document.createElement('canvas');
    canvas.id = 'network-canvas';
    canvas.width = networkMap.offsetWidth - 40;
    canvas.height = 200;
    canvas.style.display = 'block';
    canvas.style.margin = '0 auto';
    networkMap.appendChild(canvas);
    
    // Draw the network map
    drawNetworkMap(canvas, devices);
}

// Draw the network map on the canvas
function drawNetworkMap(canvas, devices) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Define drawing parameters
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 3;
    
    // Draw central "network" node
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#1a3a5f';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('NETWORK', centerX, centerY);
    
    // Group devices by type
    const devicesByType = {};
    
    for (const [key, value] of Object.entries(DEVICE_TYPES)) {
        devicesByType[key] = devices.filter(device => device.type === key);
    }
    
    // Calculate positions for each device type
    const totalTypes = Object.keys(devicesByType).filter(type => devicesByType[type].length > 0).length;
    let typeIndex = 0;
    
    for (const [type, devicesOfType] of Object.entries(devicesByType)) {
        if (devicesOfType.length === 0) {
            continue;
        }
        
        // Calculate angle for this device type
        const typeAngle = (typeIndex / totalTypes) * 2 * Math.PI;
        typeIndex++;
        
        // Calculate center position for this device type
        const typeCenterX = centerX + Math.cos(typeAngle) * radius;
        const typeCenterY = centerY + Math.sin(typeAngle) * radius;
        
        // Draw device nodes in a cluster around the type center
        const deviceCount = devicesOfType.length;
        const clusterRadius = Math.min(40, 10 + deviceCount * 2);
        
        for (let i = 0; i < deviceCount; i++) {
            const device = devicesOfType[i];
            
            // Calculate position for this device
            const deviceAngle = (i / deviceCount) * 2 * Math.PI;
            const deviceX = typeCenterX + Math.cos(deviceAngle) * clusterRadius;
            const deviceY = typeCenterY + Math.sin(deviceAngle) * clusterRadius;
            
            // Draw connection line to central node
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(deviceX, deviceY);
            ctx.strokeStyle = '#cccccc';
            ctx.lineWidth = 1;
            ctx.stroke();
            
            // Draw device node
            ctx.beginPath();
            ctx.arc(deviceX, deviceY, 5, 0, 2 * Math.PI);
            ctx.fillStyle = DEVICE_TYPES[type].color;
            
            // Color based on 802.1X status
            if (device.dot1xStatus === 'SUPPORTED') {
                ctx.fillStyle = '#4caf50'; // Green
            } else if (device.dot1xStatus === 'PARTIAL') {
                ctx.fillStyle = '#ff9800'; // Orange
            } else if (device.dot1xStatus === 'UNSUPPORTED') {
                ctx.fillStyle = '#f44336'; // Red
            } else {
                ctx.fillStyle = DEVICE_TYPES[type].color;
            }
            
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1;
            ctx.stroke();
            
            // Store device position for interactivity (future enhancement)
            device.mapX = deviceX;
            device.mapY = deviceY;
        }
        
        // Draw type label
        ctx.fillStyle = '#333333';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(DEVICE_TYPES[type].name, typeCenterX, typeCenterY + clusterRadius + 15);
        ctx.fillText(`(${deviceCount})`, typeCenterX, typeCenterY + clusterRadius + 30);
    }
}

// Export initialization function
window.initializeDiscovery = initializeDiscovery;
