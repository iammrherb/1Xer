/**
 * Dot1Xer Supreme - Network Scanner Module
 * Version: 2.0.0
 * 
 * This file contains basic network scanning simulation functionality.
 * In a full deployment, this would connect to server-side scanning tools.
 */

// Simulated scan status
let scanStatus = {
    inProgress: false,
    progress: 0,
    results: []
};

/**
 * Start a network scan
 */
function startNetworkScan() {
    // Get scan parameters
    const ipRange = document.getElementById('ip-range').value;
    
    if (!ipRange) {
        alert('Please enter an IP range to scan.');
        return;
    }
    
    // Validate IP range format (basic validation)
    if (!validateIpRange(ipRange)) {
        alert('Invalid IP range format. Please use CIDR notation (e.g., 192.168.1.0/24) or range (e.g., 192.168.1.1-192.168.1.254).');
        return;
    }
    
    // Get scan type
    let scanType = 'quick';
    document.querySelectorAll('input[name="scan-type"]').forEach(radio => {
        if (radio.checked) {
            scanType = radio.id.replace('scan-type-', '');
        }
    });
    
    // Get advanced options
    const snmpEnabled = document.getElementById('snmp-discovery').checked;
    const snmpCommunity = document.getElementById('snmp-community').value;
    const dnsResolution = document.getElementById('dns-resolution').checked;
    const vendorIdentification = document.getElementById('vendor-identification').checked;
    
    // Prepare scan options
    const scanOptions = {
        ipRange,
        scanType,
        snmpEnabled,
        snmpCommunity,
        dnsResolution,
        vendorIdentification
    };
    
    // Show scan progress UI
    showScanProgress();
    
    // Start the scan
    scanStatus.inProgress = true;
    scanStatus.progress = 0;
    scanStatus.results = [];
    
    // Simulate scan progress updates
    updateScanProgress(0, 'Initializing scan...');
    
    // In a real implementation, this would communicate with a backend service
    // For this demo, we'll simulate the scan with a series of timeouts
    simulateScan(scanOptions);
}

/**
 * Validate IP range format
 * @param {String} ipRange - IP range to validate
 * @returns {Boolean} - True if valid, false otherwise
 */
function validateIpRange(ipRange) {
    // Very basic validation for demonstration purposes
    const cidrPattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2}$/;
    const rangePattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}-\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    
    return cidrPattern.test(ipRange) || rangePattern.test(ipRange);
}

/**
 * Show scan progress UI
 */
function showScanProgress() {
    const scanOptions = document.querySelector('.scan-options');
    const scanProgress = document.querySelector('.scan-progress');
    const scanResults = document.querySelector('.scan-results');
    
    scanOptions.style.display = 'none';
    scanProgress.style.display = 'block';
    scanResults.style.display = 'none';
}

/**
 * Update scan progress UI
 * @param {Number} progress - Progress percentage (0-100)
 * @param {String} message - Progress message
 */
function updateScanProgress(progress, message) {
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.scan-progress-text');
    
    progressBar.style.width = `${progress}%`;
    progressText.textContent = message;
    
    scanStatus.progress = progress;
}

/**
 * Show scan results UI
 */
function showScanResults() {
    const scanOptions = document.querySelector('.scan-options');
    const scanProgress = document.querySelector('.scan-progress');
    const scanResults = document.querySelector('.scan-results');
    
    scanOptions.style.display = 'none';
    scanProgress.style.display = 'none';
    scanResults.style.display = 'block';
    
    // Populate results table
    populateScanResults(scanStatus.results);
}

/**
 * Populate scan results table
 * @param {Array} results - Scan results
 */
function populateScanResults(results) {
    const tbody = document.getElementById('scan-results-body');
    tbody.innerHTML = '';
    
    results.forEach(device => {
        const row = document.createElement('tr');
        
        // Status column
        const statusCell = document.createElement('td');
        const statusIndicator = document.createElement('span');
        statusIndicator.className = `status-indicator status-${device.status.toLowerCase()}`;
        statusCell.appendChild(statusIndicator);
        statusCell.appendChild(document.createTextNode(device.status));
        row.appendChild(statusCell);
        
        // IP Address column
        const ipCell = document.createElement('td');
        ipCell.textContent = device.ip;
        row.appendChild(ipCell);
        
        // Hostname column
        const hostnameCell = document.createElement('td');
        hostnameCell.textContent = device.hostname || 'N/A';
        row.appendChild(hostnameCell);
        
        // Type column
        const typeCell = document.createElement('td');
        typeCell.textContent = device.type || 'Unknown';
        row.appendChild(typeCell);
        
        // Vendor column
        const vendorCell = document.createElement('td');
        vendorCell.textContent = device.vendor || 'Unknown';
        row.appendChild(vendorCell);
        
        // Model column
        const modelCell = document.createElement('td');
        modelCell.textContent = device.model || 'Unknown';
        row.appendChild(modelCell);
        
        // 802.1X Support column
        const dot1xCell = document.createElement('td');
        const dot1xSupport = document.createElement('span');
        dot1xSupport.className = `dot1x-${device.dot1xSupport.toLowerCase()}`;
        dot1xSupport.textContent = device.dot1xSupport;
        dot1xCell.appendChild(dot1xSupport);
        row.appendChild(dot1xCell);
        
        // Actions column
        const actionsCell = document.createElement('td');
        
        // Details button
        const detailsBtn = document.createElement('button');
        detailsBtn.className = 'device-action-btn';
        detailsBtn.innerHTML = '<i class="fas fa-info-circle"></i>';
        detailsBtn.title = 'View details';
        detailsBtn.addEventListener('click', function() {
            showDeviceDetails(device);
        });
        actionsCell.appendChild(detailsBtn);
        
        // Configure button
        const configureBtn = document.createElement('button');
        configureBtn.className = 'device-action-btn';
        configureBtn.innerHTML = '<i class="fas fa-cog"></i>';
        configureBtn.title = 'Configure device';
        configureBtn.addEventListener('click', function() {
            configureDevice(device);
        });
        actionsCell.appendChild(configureBtn);
        
        row.appendChild(actionsCell);
        
        tbody.appendChild(row);
    });
}

/**
 * Show device details
 * @param {Object} device - Device data
 */
function showDeviceDetails(device) {
    alert(`Device Details: ${device.ip} (${device.hostname || 'Unknown'})`);
    // In a full implementation, this would show a modal with detailed device information
}

/**
 * Configure a device
 * @param {Object} device - Device data
 */
function configureDevice(device) {
    alert(`Configure Device: ${device.ip} (${device.hostname || 'Unknown'})`);
    
    // In a full implementation, this would navigate to the configurator tab
    // and pre-populate fields for the selected device
    const tabLinks = document.querySelectorAll('.nav-tabs a');
    const configuratorLink = Array.from(tabLinks).find(link => link.getAttribute('data-tab') === 'configurator');
    
    if (configuratorLink) {
        configuratorLink.click();
        
        // Find the appropriate vendor card and select it
        if (device.vendor) {
            setTimeout(() => {
                const vendorCards = document.querySelectorAll('.vendor-card');
                const matchingCard = Array.from(vendorCards).find(card => {
                    const vendorId = card.getAttribute('data-vendor');
                    return vendorId && vendorId.toLowerCase().includes(device.vendor.toLowerCase());
                });
                
                if (matchingCard) {
                    matchingCard.click();
                    
                    // Pre-populate some fields if possible
                    setTimeout(() => {
                        const deviceNameInput = document.getElementById('device_name');
                        if (deviceNameInput) {
                            deviceNameInput.value = device.hostname || '';
                        }
                    }, 500);
                }
            }, 300);
        }
    }
}

/**
 * Simulate a network scan
 * @param {Object} options - Scan options
 */
function simulateScan(options) {
    const totalDevices = Math.floor(Math.random() * 20) + 5; // 5-25 devices
    const scanDuration = options.scanType === 'quick' ? 3000 : 
                         options.scanType === 'detailed' ? 6000 : 8000;
    const updateInterval = 200;
    const updates = scanDuration / updateInterval;
    const progressIncrement = 100 / updates;
    let currentProgress = 0;
    let currentDevice = 0;
    
    // Function to generate random device data
    function generateRandomDevice() {
        const vendors = ['Cisco', 'Aruba', 'Juniper', 'HP', 'Dell', 'Extreme Networks', 'Fortinet', 'Huawei'];
        const types = ['Switch', 'Router', 'Access Point', 'Server', 'Workstation', 'Printer', 'IoT Device'];
        const statuses = ['Online', 'Offline'];
        const dot1xSupport = ['Supported', 'Unsupported', 'Unknown'];
        
        const ipParts = options.ipRange.split('.');
        const lastOctet = Math.floor(Math.random() * 254) + 1;
        const ip = `${ipParts[0]}.${ipParts[1]}.${ipParts[2]}.${lastOctet}`;
        
        const vendor = vendors[Math.floor(Math.random() * vendors.length)];
        const deviceType = types[Math.floor(Math.random() * types.length)];
        
        let model = '';
        let dot1x = dot1xSupport[Math.floor(Math.random() * dot1xSupport.length)];
        
        // Assign realistic models and 802.1X support based on vendor and type
        switch (vendor) {
            case 'Cisco':
                if (deviceType === 'Switch') {
                    model = ['Catalyst 9200', 'Catalyst 9300', 'Catalyst 3850', 'Nexus 9000'][Math.floor(Math.random() * 4)];
                    dot1x = 'Supported';
                } else if (deviceType === 'Router') {
                    model = ['ISR 4000', 'ASR 1000', 'ISR 1100'][Math.floor(Math.random() * 3)];
                } else if (deviceType === 'Access Point') {
                    model = ['Aironet 2800', 'Aironet 3800', 'Catalyst 9100'][Math.floor(Math.random() * 3)];
                    dot1x = 'Supported';
                }
                break;
            case 'Aruba':
                if (deviceType === 'Switch') {
                    model = ['CX 6300', 'CX 8320', '2930F', '5400R'][Math.floor(Math.random() * 4)];
                    dot1x = 'Supported';
                } else if (deviceType === 'Access Point') {
                    model = ['AP-505', 'AP-515', 'AP-535'][Math.floor(Math.random() * 3)];
                    dot1x = 'Supported';
                }
                break;
            default:
                if (deviceType === 'Workstation') {
                    model = ['Windows 10', 'macOS', 'Linux'][Math.floor(Math.random() * 3)];
                } else if (deviceType === 'Server') {
                    model = ['Windows Server', 'Linux Server', 'VMware ESXi'][Math.floor(Math.random() * 3)];
                } else if (deviceType === 'Printer') {
                    model = ['HP LaserJet', 'Brother MFC', 'Xerox WorkCentre'][Math.floor(Math.random() * 3)];
                    dot1x = 'Unsupported';
                } else if (deviceType === 'IoT Device') {
                    model = ['IP Camera', 'Smart TV', 'Building Control'][Math.floor(Math.random() * 3)];
                    dot1x = 'Unsupported';
                }
        }
        
        return {
            ip,
            hostname: options.dnsResolution ? `host-${ip.split('.').join('-')}` : '',
            type: deviceType,
            vendor: options.vendorIdentification ? vendor : 'Unknown',
            model: options.vendorIdentification ? model : 'Unknown',
            status: statuses[Math.floor(Math.random() * statuses.length)],
            dot1xSupport: dot1x,
            lastSeen: new Date().toISOString()
        };
    }
    
    // Simulate scan updates
    const scanInterval = setInterval(() => {
        currentProgress += progressIncrement;
        const progress = Math.min(Math.round(currentProgress), 100);
        
        if (progress < 10) {
            updateScanProgress(progress, 'Initializing scan...');
        } else if (progress < 30) {
            updateScanProgress(progress, 'Performing ping sweep...');
        } else if (progress < 60) {
            if (options.snmpEnabled) {
                updateScanProgress(progress, `Querying devices with SNMP (${currentDevice}/${totalDevices})...`);
            } else {
                updateScanProgress(progress, `Identifying devices (${currentDevice}/${totalDevices})...`);
            }
            
            // Add a device to results periodically
            if (currentDevice < totalDevices && progress > 30 && Math.random() > 0.5) {
                scanStatus.results.push(generateRandomDevice());
                currentDevice++;
            }
        } else if (progress < 90) {
            if (options.dnsResolution) {
                updateScanProgress(progress, 'Resolving hostnames...');
            } else if (options.vendorIdentification) {
                updateScanProgress(progress, 'Identifying vendors and models...');
            } else {
                updateScanProgress(progress, 'Finalizing results...');
            }
        } else {
            updateScanProgress(100, 'Scan complete!');
            
            // Ensure we have at least one of each vendor for demonstration purposes
            const vendors = ['Cisco', 'Aruba', 'Juniper', 'HP'];
            vendors.forEach(vendor => {
                if (!scanStatus.results.some(device => device.vendor === vendor)) {
                    const device = generateRandomDevice();
                    device.vendor = vendor;
                    device.type = 'Switch';
                    device.dot1xSupport = 'Supported';
                    scanStatus.results.push(device);
                }
            });
            
            // End the simulation
            clearInterval(scanInterval);
            scanStatus.inProgress = false;
            
            // Show results after a short delay
            setTimeout(() => {
                showScanResults();
            }, 500);
        }
    }, updateInterval);
}
