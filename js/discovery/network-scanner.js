/**
 * Dot1Xer Supreme - Network Scanner Module
 * Functions for network environment discovery and device identification
 */

// Initialize network scanner when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeDiscoveryControls();
});

/**
 * Initialize discovery-related controls and event listeners
 */
function initializeDiscoveryControls() {
    // Start discovery button
    document.getElementById('start-discovery').addEventListener('click', function() {
        startNetworkDiscovery();
    });
    
    // Discovery method change event
    document.getElementById('discovery-method').addEventListener('change', function() {
        toggleImportSection();
    });
    
    // Export results button
    document.getElementById('export-results').addEventListener('click', function() {
        exportDiscoveryResults();
    });
    
    // Generate policy button
    document.getElementById('generate-policy').addEventListener('click', function() {
        generatePolicyRecommendations();
    });
    
    // Filter for search
    document.getElementById('result-search').addEventListener('input', function() {
        filterDiscoveryResults(this.value);
    });
    
    // Filter for device type
    document.getElementById('device-type-filter').addEventListener('change', function() {
        filterByDeviceType(this.value);
    });
}

/**
 * Toggle the import section based on the selected discovery method
 */
function toggleImportSection() {
    const discoveryMethod = document.getElementById('discovery-method').value;
    const importSection = document.getElementById('import-section');
    
    if (discoveryMethod === 'import') {
        importSection.classList.remove('hidden');
    } else {
        importSection.classList.add('hidden');
    }
}

/**
 * Start the network discovery process based on selected method
 */
function startNetworkDiscovery() {
    // Get input values
    const networkRange = document.getElementById('network-range').value;
    const discoveryMethod = document.getElementById('discovery-method').value;
    const identifyDevices = document.getElementById('identify-devices').checked;
    const groupRecommendation = document.getElementById('group-recommendation').checked;
    
    // Validate input values
    if (discoveryMethod !== 'import' && !networkRange) {
        alert('Please enter a network range.');
        return;
    }
    
    if (discoveryMethod === 'import' && !document.getElementById('import-file').files.length) {
        alert('Please select a file to import.');
        return;
    }
    
    // Update UI state
    document.getElementById('start-discovery').disabled = true;
    document.getElementById('device-count').textContent = '0';
    document.getElementById('discovery-results-table').querySelector('tbody').innerHTML = 
        '<tr><td colspan="6" class="empty-results">Starting discovery process...</td></tr>';
    
    // Simulate discovery process
    simulateDiscoveryProcess(discoveryMethod, networkRange, identifyDevices, groupRecommendation);
}

/**
 * Simulate a network discovery process
 * @param {string} method - The discovery method to use
 * @param {string} range - The network range to scan
 * @param {boolean} identifyDevices - Whether to identify device types
 * @param {boolean} groupRecommendation - Whether to generate group recommendations
 */
function simulateDiscoveryProcess(method, range, identifyDevices, groupRecommendation) {
    // In a real implementation, this would perform actual network scanning or import
    // For this example, we'll use simulated data
    
    // Simulate a delay to mimic network scanning
    setTimeout(() => {
        // Generate sample discovery results
        const results = generateSampleDiscoveryResults(method, range);
        
        // Update UI with results
        displayDiscoveryResults(results);
        
        // Enable export and policy buttons
        document.getElementById('export-results').disabled = false;
        document.getElementById('generate-policy').disabled = false;
        
        // Re-enable the start button
        document.getElementById('start-discovery').disabled = false;
        
    }, 2000); // Simulated 2-second delay
}

/**
 * Generate sample discovery results for demonstration
 * @param {string} method - The discovery method used
 * @param {string} range - The network range that was scanned
 * @returns {Array} An array of discovered devices
 */
function generateSampleDiscoveryResults(method, range) {
    // Sample data to simulate discovery results
    const sampleDevices = [
        {
            ip: '192.168.1.10',
            mac: '00:1A:2B:3C:4D:5E',
            type: 'workstation',
            vendor: 'Dell',
            supportsAuth: 'full',
            recommendation: '802.1X with MAB fallback'
        },
        {
            ip: '192.168.1.11',
            mac: '00:1B:2C:3D:4E:5F',
            type: 'workstation',
            vendor: 'HP',
            supportsAuth: 'full',
            recommendation: '802.1X with EAP-TLS'
        },
        {
            ip: '192.168.1.20',
            mac: '00:2C:3D:4E:5F:6A',
            type: 'server',
            vendor: 'Dell',
            supportsAuth: 'full',
            recommendation: '802.1X with certificate'
        },
        {
            ip: '192.168.1.30',
            mac: '00:3D:4E:5F:6A:7B',
            type: 'phone',
            vendor: 'Cisco',
            supportsAuth: 'partial',
            recommendation: 'MAB with voice VLAN'
        },
        {
            ip: '192.168.1.40',
            mac: '00:4E:5F:6A:7B:8C',
            type: 'printer',
            vendor: 'HP',
            supportsAuth: 'none',
            recommendation: 'MAB only'
        },
        {
            ip: '192.168.1.50',
            mac: '00:5F:6A:7B:8C:9D',
            type: 'network',
            vendor: 'Cisco',
            supportsAuth: 'full',
            recommendation: '802.1X with MAB fallback'
        },
        {
            ip: '192.168.1.60',
            mac: '00:6A:7B:8C:9D:0E',
            type: 'iot',
            vendor: 'Nest',
            supportsAuth: 'none',
            recommendation: 'MAB with dedicated VLAN'
        },
        {
            ip: '192.168.1.70',
            mac: '00:7B:8C:9D:0E:1F',
            type: 'workstation',
            vendor: 'Apple',
            supportsAuth: 'full',
            recommendation: '802.1X with EAP-TLS'
        },
        {
            ip: '192.168.1.80',
            mac: '00:8C:9D:0E:1F:2A',
            type: 'iot',
            vendor: 'Samsung',
            supportsAuth: 'partial',
            recommendation: 'MAB with restricted VLAN'
        },
        {
            ip: '192.168.1.90',
            mac: '00:9D:0E:1F:2A:3B',
            type: 'printer',
            vendor: 'Brother',
            supportsAuth: 'none',
            recommendation: 'MAB only'
        },
        {
            ip: '192.168.1.100',
            mac: '00:0E:1F:2A:3B:4C',
            type: 'network',
            vendor: 'Juniper',
            supportsAuth: 'full',
            recommendation: '802.1X with certificate'
        },
        {
            ip: '192.168.1.110',
            mac: '00:1F:2A:3B:4C:5D',
            type: 'unknown',
            vendor: 'Unknown',
            supportsAuth: 'unknown',
            recommendation: 'Monitor mode, then MAB'
        }
    ];
    
    // If import method, generate some different results
    if (method === 'import') {
        // Add some different devices to show variety
        sampleDevices.push(
            {
                ip: '10.0.0.15',
                mac: 'AA:BB:CC:DD:EE:FF',
                type: 'workstation',
                vendor: 'Lenovo',
                supportsAuth: 'full',
                recommendation: '802.1X with EAP-TLS'
            },
            {
                ip: '10.0.0.25',
                mac: 'BB:CC:DD:EE:FF:AA',
                type: 'phone',
                vendor: 'Polycom',
                supportsAuth: 'partial',
                recommendation: 'MAB with voice VLAN'
            },
            {
                ip: '10.0.0.35',
                mac: 'CC:DD:EE:FF:AA:BB',
                type: 'iot',
                vendor: 'Philips',
                supportsAuth: 'none',
                recommendation: 'MAB with dedicated VLAN'
            }
        );
    }
    
    // If active scanning, add more devices to emphasize more thorough discovery
    if (method === 'active') {
        // Add some additional devices
        sampleDevices.push(
            {
                ip: '192.168.1.120',
                mac: '00:2A:3B:4C:5D:6E',
                type: 'workstation',
                vendor: 'Microsoft Surface',
                supportsAuth: 'full',
                recommendation: '802.1X with EAP-TLS'
            },
            {
                ip: '192.168.1.130',
                mac: '00:3B:4C:5D:6E:7F',
                type: 'server',
                vendor: 'IBM',
                supportsAuth: 'full',
                recommendation: '802.1X with certificate'
            },
            {
                ip: '192.168.1.140',
                mac: '00:4C:5D:6E:7F:8A',
                type: 'network',
                vendor: 'Aruba',
                supportsAuth: 'full',
                recommendation: '802.1X with certificate'
            },
            {
                ip: '192.168.1.150',
                mac: '00:5D:6E:7F:8A:9B',
                type: 'iot',
                vendor: 'Axis Camera',
                supportsAuth: 'none',
                recommendation: 'MAB with dedicated VLAN'
            }
        );
    }
    
    // Return a randomized subset of the devices to simulate real-world variability
    // For passive discovery, return fewer devices
    if (method === 'passive') {
        return shuffleArray(sampleDevices).slice(0, 8);
    } else if (method === 'import') {
        return shuffleArray(sampleDevices).slice(0, 10);
    } else {
        // Active scanning returns the most devices
        return shuffleArray(sampleDevices);
    }
}

/**
 * Shuffle an array (Fisher-Yates algorithm)
 * @param {Array} array - The array to shuffle
 * @returns {Array} The shuffled array
 */
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

/**
 * Display discovery results in the UI
 * @param {Array} results - The discovery results to display
 */
function displayDiscoveryResults(results) {
    const tbody = document.getElementById('discovery-results-table').querySelector('tbody');
    
    // Clear existing results
    tbody.innerHTML = '';
    
    // If no results, show empty message
    if (results.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-results">No devices found.</td></tr>';
        document.getElementById('device-count').textContent = '0';
        return;
    }
    
    // Update device count
    document.getElementById('device-count').textContent = results.length;
    
    // Populate table with results
    results.forEach(device => {
        const tr = document.createElement('tr');
        tr.setAttribute('data-device-type', device.type);
        
        // IP Address cell
        const ipCell = document.createElement('td');
        ipCell.textContent = device.ip;
        tr.appendChild(ipCell);
        
        // MAC Address cell
        const macCell = document.createElement('td');
        macCell.textContent = device.mac;
        tr.appendChild(macCell);
        
        // Device Type cell
        const typeCell = document.createElement('td');
        typeCell.textContent = formatDeviceType(device.type);
        tr.appendChild(typeCell);
        
        // Vendor cell
        const vendorCell = document.createElement('td');
        vendorCell.textContent = device.vendor;
        tr.appendChild(vendorCell);
        
        // Auth Support cell
        const authCell = document.createElement('td');
        authCell.appendChild(createAuthStatusIndicator(device.supportsAuth));
        tr.appendChild(authCell);
        
        // Recommendation cell
        const recCell = document.createElement('td');
        recCell.textContent = device.recommendation;
        tr.appendChild(recCell);
        
        tbody.appendChild(tr);
    });
}

/**
 * Format device type for display
 * @param {string} type - The device type
 * @returns {string} The formatted device type
 */
function formatDeviceType(type) {
    switch (type) {
        case 'workstation':
            return 'Workstation';
        case 'server':
            return 'Server';
        case 'phone':
            return 'IP Phone';
        case 'printer':
            return 'Printer';
        case 'network':
            return 'Network Equipment';
        case 'iot':
            return 'IoT Device';
        case 'unknown':
            return 'Unknown';
        default:
            return type.charAt(0).toUpperCase() + type.slice(1);
    }
}

/**
 * Create an authentication status indicator element
 * @param {string} status - The authentication support status (full, partial, none, unknown)
 * @returns {HTMLElement} The status indicator element
 */
function createAuthStatusIndicator(status) {
    const statusSpan = document.createElement('span');
    statusSpan.classList.add('auth-status');
    
    switch (status) {
        case 'full':
            statusSpan.classList.add('status-supported');
            statusSpan.textContent = 'Supported';
            break;
        case 'partial':
            statusSpan.classList.add('status-partial');
            statusSpan.textContent = 'Partial';
            break;
        case 'none':
            statusSpan.classList.add('status-unsupported');
            statusSpan.textContent = 'Unsupported';
            break;
        case 'unknown':
        default:
            statusSpan.classList.add('status-unknown');
            statusSpan.textContent = 'Unknown';
            break;
    }
    
    return statusSpan;
}

/**
 * Filter discovery results based on search term
 * @param {string} searchTerm - The search term to filter by
 */
function filterDiscoveryResults(searchTerm) {
    const rows = document.querySelectorAll('#discovery-results-table tbody tr');
    const deviceTypeFilter = document.getElementById('device-type-filter').value;
    
    searchTerm = searchTerm.toLowerCase();
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const type = row.getAttribute('data-device-type');
        
        // Check both search term and device type filter
        const matchesSearch = searchTerm === '' || text.includes(searchTerm);
        const matchesType = deviceTypeFilter === 'all' || type === deviceTypeFilter;
        
        if (matchesSearch && matchesType) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
    
    // Update the visible device count
    updateVisibleDeviceCount();
}

/**
 * Filter discovery results by device type
 * @param {string} deviceType - The device type to filter by
 */
function filterByDeviceType(deviceType) {
    const rows = document.querySelectorAll('#discovery-results-table tbody tr');
    const searchTerm = document.getElementById('result-search').value.toLowerCase();
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const type = row.getAttribute('data-device-type');
        
        // Check both search term and device type filter
        const matchesSearch = searchTerm === '' || text.includes(searchTerm);
        const matchesType = deviceType === 'all' || type === deviceType;
        
        if (matchesSearch && matchesType) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
    
    // Update the visible device count
    updateVisibleDeviceCount();
}

/**
 * Update the visible device count based on current filters
 */
function updateVisibleDeviceCount() {
    const visibleRows = document.querySelectorAll('#discovery-results-table tbody tr:not([style*="display: none"])');
    document.getElementById('device-count').textContent = visibleRows.length;
}

/**
 * Export discovery results to a file
 */
function exportDiscoveryResults() {
    // Get all visible rows from the table
    const rows = document.querySelectorAll('#discovery-results-table tbody tr:not([style*="display: none"])');
    
    // If no rows, show alert and return
    if (rows.length === 0) {
        alert('No results to export.');
        return;
    }
    
    // Create data array from table rows
    const data = [];
    
    // Add header row
    data.push(['IP Address', 'MAC Address', 'Device Type', 'Vendor', 'Auth Support', 'Recommendation']);
    
    // Add data rows
    rows.forEach(row => {
        const rowData = [];
        row.querySelectorAll('td').forEach(cell => {
            // For auth support cell, get the text content of the span
            if (cell.querySelector('.auth-status')) {
                rowData.push(cell.querySelector('.auth-status').textContent);
            } else {
                rowData.push(cell.textContent);
            }
        });
        data.push(rowData);
    });
    
    // Convert data to CSV
    let csvContent = data.map(row => row.join(',')).join('\n');
    
    // Create a download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'discovery_results.csv');
    link.style.display = 'none';
    
    // Append to document, click and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Generate policy recommendations based on discovered devices
 */
function generatePolicyRecommendations() {
    // Get all visible rows from the table
    const rows = document.querySelectorAll('#discovery-results-table tbody tr:not([style*="display: none"])');
    
    // If no rows, show alert and return
    if (rows.length === 0) {
        alert('No devices to generate recommendations for.');
        return;
    }
    
    // Count devices by type and authentication support
    const deviceCounts = {
        workstation: { full: 0, partial: 0, none: 0, unknown: 0, total: 0 },
        server: { full: 0, partial: 0, none: 0, unknown: 0, total: 0 },
        phone: { full: 0, partial: 0, none: 0, unknown: 0, total: 0 },
        printer: { full: 0, partial: 0, none: 0, unknown: 0, total: 0 },
        network: { full: 0, partial: 0, none: 0, unknown: 0, total: 0 },
        iot: { full: 0, partial: 0, none: 0, unknown: 0, total: 0 },
        unknown: { full: 0, partial: 0, none: 0, unknown: 0, total: 0 },
        total: { full: 0, partial: 0, none: 0, unknown: 0, total: 0 }
    };
    
    // Count devices
    rows.forEach(row => {
        const type = row.getAttribute('data-device-type');
        const authCell = row.querySelector('td:nth-child(5)');
        let authSupport = 'unknown';
        
        if (authCell.querySelector('.status-supported')) {
            authSupport = 'full';
        } else if (authCell.querySelector('.status-partial')) {
            authSupport = 'partial';
        } else if (authCell.querySelector('.status-unsupported')) {
            authSupport = 'none';
        }
        
        // Increment counts
        deviceCounts[type][authSupport]++;
        deviceCounts[type].total++;
        deviceCounts.total[authSupport]++;
        deviceCounts.total.total++;
    });
    
    // Generate recommendations text
    let recommendations = `# 802.1X Policy Recommendations
# Generated by Dot1Xer Supreme - Network Discovery Tool
# Date: ${new Date().toISOString().split('T')[0]}

## Device Discovery Summary
- Total devices discovered: ${deviceCounts.total.total}
- Devices with full 802.1X support: ${deviceCounts.total.full} (${Math.round(deviceCounts.total.full / deviceCounts.total.total * 100)}%)
- Devices with partial 802.1X support: ${deviceCounts.total.partial} (${Math.round(deviceCounts.total.partial / deviceCounts.total.total * 100)}%)
- Devices without 802.1X support: ${deviceCounts.total.none} (${Math.round(deviceCounts.total.none / deviceCounts.total.total * 100)}%)
- Devices with unknown support: ${deviceCounts.total.unknown} (${Math.round(deviceCounts.total.unknown / deviceCounts.total.total * 100)}%)

## Device Category Breakdown
- Workstations: ${deviceCounts.workstation.total}
- Servers: ${deviceCounts.server.total}
- IP Phones: ${deviceCounts.phone.total}
- Printers: ${deviceCounts.printer.total}
- Network Equipment: ${deviceCounts.network.total}
- IoT Devices: ${deviceCounts.iot.total}
- Unknown Devices: ${deviceCounts.unknown.total}

## Recommended Authentication Approach
`;
    
    // Add policy recommendations based on device counts
    if (deviceCounts.total.full > deviceCounts.total.total * 0.7) {
        // If over 70% support full 802.1X, recommend that as primary
        recommendations += `Based on your environment, we recommend implementing full 802.1X authentication as your primary method, with MAB as a fallback for devices that don't support 802.1X.

### Primary Configuration:
- 802.1X with EAP-TLS (certificate-based) for workstations and servers
- 802.1X with PEAP-MSCHAPv2 as a fallback
- MAC Authentication Bypass (MAB) for non-802.1X capable devices
- Monitor mode for first 2 weeks to identify issues before enforcing

### VLAN Assignment Strategy:
- VLAN 10: Fully authenticated devices (802.1X)
- VLAN 20: MAB authenticated devices (limited access)
- VLAN 30: Voice devices
- VLAN 999: Authentication failure/guest VLAN
`;
    } else if (deviceCounts.total.none > deviceCounts.total.total * 0.5) {
        // If over 50% don't support 802.1X, recommend MAB as primary
        recommendations += `Based on your environment, we recommend implementing MAC Authentication Bypass (MAB) as your primary method, with 802.1X for supported devices.

### Primary Configuration:
- MAC Authentication Bypass (MAB) for the majority of devices
- 802.1X with EAP-TLS for workstations and servers that support it
- Implement in monitor mode for 3-4 weeks before enforcing
- Consider port-based authentication groups based on device types

### VLAN Assignment Strategy:
- VLAN 10: 802.1X authenticated devices (full access)
- VLAN 20: MAB authenticated workstations/servers (restricted access)
- VLAN 30: MAB authenticated IoT/printers (very restricted access)
- VLAN 40: Voice devices
- VLAN 999: Authentication failure/guest VLAN
`;
    } else {
        // Mixed environment
        recommendations += `Your environment has a mixed authentication capability profile. We recommend a phased approach:

### Phase 1: Monitor Mode
- Deploy 802.1X in monitor mode across all ports
- Collect authentication data for 3-4 weeks without enforcing
- Identify problematic devices and areas

### Phase 2: Limited Enforcement
- Enable 802.1X with MAB fallback on ports with supported devices
- Use dynamic VLAN assignment based on authentication method
- Keep problematic areas in monitor mode

### Phase 3: Full Deployment
- Complete 802.1X rollout with appropriate exceptions
- Implement strict access controls for non-authenticated devices

### VLAN Assignment Strategy:
- VLAN 10: 802.1X authenticated corporate devices
- VLAN 20: 802.1X authenticated servers/infrastructure
- VLAN 30: MAB authenticated known devices
- VLAN 40: Voice devices
- VLAN 50: IoT devices (restricted)
- VLAN 999: Authentication failure/guest VLAN
`;
    }
    
    // Additional recommendations based on device types
    if (deviceCounts.phone.total > 0) {
        recommendations += `
## IP Phone Considerations
- Configure voice VLAN with appropriate QoS
- Consider using LLDP-MED for voice VLAN assignment
- Implement differentiated services for voice traffic
`;
    }
    
    if (deviceCounts.printer.total > 0) {
        recommendations += `
## Printer Considerations
- Create a dedicated printer VLAN with appropriate ACLs
- Use MAC Authentication Bypass for printers
- Consider implementing IP-MAC binding for critical printers
`;
    }
    
    if (deviceCounts.iot.total > 0) {
        recommendations += `
## IoT Device Considerations
- Create isolated IoT VLAN(s) with strict ACLs
- Implement MAB for IoT devices
- Consider network micro-segmentation for IoT security
- Implement regular scanning for vulnerable IoT devices
`;
    }
    
    // Display the recommendations in a modal or alert
    // In a real application, this would be a modal dialog or a new tab/page
    alert("Policy recommendations generated. In a real application, this would display in a formatted window or be available for download.");
    
    // For this demo, we'll log to console
    console.log(recommendations);
}
