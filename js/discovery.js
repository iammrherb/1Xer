/**
 * Dot1Xer Supreme - Network Discovery
 * Provides functionality for discovering and profiling network devices
 * Version: 3.5.0
 */

// Initialize network discovery functionality
document.addEventListener('DOMContentLoaded', function() {
    setupDiscoveryFunctionality();
});

/**
 * Set up discovery functionality and event listeners
 */
function setupDiscoveryFunctionality() {
    // Start discovery button
    const startDiscoveryBtn = document.getElementById('start-discovery');
    if (startDiscoveryBtn) {
        // Event listener is in main.js to avoid duplication
    }
    
    // Export results button
    const exportResultsBtn = document.getElementById('export-results');
    if (exportResultsBtn) {
        exportResultsBtn.addEventListener('click', function() {
            exportDiscoveryResults();
        });
    }
    
    // Create deployment plan button
    const createDeploymentBtn = document.getElementById('create-deployment');
    if (createDeploymentBtn) {
        createDeploymentBtn.addEventListener('click', function() {
            // Switch to deployment tab
            const deploymentTabLink = document.querySelector('nav a[href="#deployment"]');
            if (deploymentTabLink) {
                deploymentTabLink.click();
            }
            
            // Populate deployment devices
            populateDeploymentDevices();
        });
    }
    
    // Filter results input
    const filterInput = document.getElementById('filter-results');
    if (filterInput) {
        filterInput.addEventListener('input', function() {
            filterDiscoveryResults(this.value);
        });
    }
    
    // Vendor filter
    const vendorFilter = document.getElementById('vendor-filter');
    if (vendorFilter) {
        vendorFilter.addEventListener('change', function() {
            applyDiscoveryFilters();
        });
    }
    
    // Platform filter
    const platformFilter = document.getElementById('platform-filter');
    if (platformFilter) {
        platformFilter.addEventListener('change', function() {
            applyDiscoveryFilters();
        });
    }
}

/**
 * Filter discovery results based on search input and select filters
 */
function applyDiscoveryFilters() {
    const searchText = document.getElementById('filter-results').value.toLowerCase();
    const vendorFilter = document.getElementById('vendor-filter').value.toLowerCase();
    const platformFilter = document.getElementById('platform-filter').value.toLowerCase();
    
    const rows = document.querySelectorAll('#discovery-results-body tr');
    
    rows.forEach(row => {
        const ip = row.cells[0].textContent.toLowerCase();
        const hostname = row.cells[1].textContent.toLowerCase();
        const vendor = row.cells[2].textContent.toLowerCase();
        const platform = row.cells[3].textContent.toLowerCase();
        const status = row.cells[4].textContent.toLowerCase();
        
        const matchesSearch = ip.includes(searchText) || 
                             hostname.includes(searchText) || 
                             vendor.includes(searchText) || 
                             platform.includes(searchText) || 
                             status.includes(searchText);
                             
        const matchesVendor = vendorFilter === '' || vendor === vendorFilter;
        const matchesPlatform = platformFilter === '' || platform === platformFilter;
        
        if (matchesSearch && matchesVendor && matchesPlatform) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

/**
 * Filter discovery results based on search input
 */
function filterDiscoveryResults(query) {
    applyDiscoveryFilters();
}

/**
 * Export discovery results as CSV
 */
function exportDiscoveryResults() {
    const table = document.getElementById('discovery-results-table');
    if (!table) return;
    
    let csv = [];
    const rows = table.querySelectorAll('tr');
    
    for (let i = 0; i < rows.length; i++) {
        const row = [], cols = rows[i].querySelectorAll('td, th');
        
        for (let j = 0; j < cols.length; j++) {
            // Skip the Actions column
            if (j === cols.length - 1 && i > 0) continue;
            
            // Get text content of the cell
            let text = cols[j].textContent.trim();
            
            // If this is a status cell with a badge, just get the text
            if (j === 4 && i > 0) {
                const badge = cols[j].querySelector('.status-badge');
                if (badge) {
                    text = badge.textContent.trim();
                }
            }
            
            // Escape quotes and wrap in quotes
            text = text.replace(/"/g, '""');
            row.push(`"${text}"`);
        }
        
        csv.push(row.join(','));
    }
    
    // Download CSV file
    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `network_discovery_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Populate deployment devices from discovery
 */
function populateDeploymentDevices() {
    const deploymentDevices = document.getElementById('deployment-devices');
    if (!deploymentDevices) return;
    
    // Clear existing options
    deploymentDevices.innerHTML = '';
    
    // Get devices from discovery results
    const rows = document.querySelectorAll('#discovery-results-body tr');
    
    rows.forEach(row => {
        const ip = row.cells[0].textContent.trim();
        const hostname = row.cells[1].textContent.trim();
        const vendor = row.cells[2].textContent.trim();
        
        const option = document.createElement('option');
        option.value = ip;
        option.textContent = `${hostname} (${ip}, ${vendor})`;
        deploymentDevices.appendChild(option);
    });
}

/**
 * Simulated discovery scan
 * In a real implementation, this would perform SNMP/SSH discovery
 */
function performDiscoveryScan(ipRange, method, options) {
    // This is a simulated function - in a real implementation, 
    // this would interact with the network to discover devices
    
    // Simulated discovery results
    const discoveryResults = [
        { ip: '192.168.1.10', hostname: 'SWITCH-CORE-01', vendor: 'Cisco', platform: 'IOS-XE', status: 'Configured' },
        { ip: '192.168.1.11', hostname: 'SWITCH-ACCESS-01', vendor: 'Cisco', platform: 'IOS', status: 'Not Configured' },
        { ip: '192.168.1.12', hostname: 'SWITCH-ACCESS-02', vendor: 'Cisco', platform: 'IOS', status: 'Partially Configured' },
        { ip: '192.168.1.20', hostname: 'SWITCH-ARUBA-01', vendor: 'Aruba', platform: 'AOS-CX', status: 'Not Configured' },
        { ip: '192.168.1.30', hostname: 'SWITCH-JUNIPER-01', vendor: 'Juniper', platform: 'EX Series', status: 'Not Configured' },
        { ip: '192.168.1.40', hostname: 'SWITCH-EXTREME-01', vendor: 'Extreme', platform: 'EXOS', status: 'Not Supported' },
        { ip: '192.168.1.50', hostname: 'WLC-CISCO-01', vendor: 'Cisco', platform: 'WLC', status: 'Configured' }
    ];
    
    return discoveryResults;
}

/**
 * Analyze discovered device configuration for 802.1X
 * In a real implementation, this would analyze the device configuration
 */
function analyzeDeviceConfiguration(deviceInfo) {
    // This is a simulated function - in a real implementation,
    // this would analyze the device configuration to determine 802.1X status
    
    // Placeholder logic
    const statuses = ['Configured', 'Not Configured', 'Partially Configured', 'Not Supported'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    return randomStatus;
}
