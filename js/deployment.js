/**
 * Dot1Xer Supreme - Deployment Management
 * Provides functionality for planning and executing 802.1X deployments
 * Version: 3.5.0
 */

// Initialize deployment functionality
document.addEventListener('DOMContentLoaded', function() {
    setupDeploymentFunctionality();
});

/**
 * Set up deployment functionality and event listeners
 */
function setupDeploymentFunctionality() {
    // Import devices button
    const importDevicesBtn = document.getElementById('import-devices');
    if (importDevicesBtn) {
        importDevicesBtn.addEventListener('click', function() {
            importDevicesFromDiscovery();
        });
    }
    
    // Add device manually button
    const addDeviceBtn = document.getElementById('add-device-manual');
    if (addDeviceBtn) {
        addDeviceBtn.addEventListener('click', function() {
            showAddDeviceModal();
        });
    }
    
    // Generate plan button is handled in main.js
}

/**
 * Import devices from discovery results
 */
function importDevicesFromDiscovery() {
    // In a real implementation, this would import devices from the discovery tab
    alert('In a production environment, this would import devices from the Discovery tab. For this demo, sample devices have been added.');
    
    // Add sample devices
    const deploymentDevices = document.getElementById('deployment-devices');
    if (!deploymentDevices) return;
    
    // Clear existing options
    deploymentDevices.innerHTML = '';
    
    // Add sample devices
    const sampleDevices = [
        { ip: '192.168.1.10', hostname: 'SWITCH-CORE-01', vendor: 'Cisco' },
        { ip: '192.168.1.11', hostname: 'SWITCH-ACCESS-01', vendor: 'Cisco' },
        { ip: '192.168.1.12', hostname: 'SWITCH-ACCESS-02', vendor: 'Cisco' },
        { ip: '192.168.1.20', hostname: 'SWITCH-ARUBA-01', vendor: 'Aruba' },
        { ip: '192.168.1.30', hostname: 'SWITCH-JUNIPER-01', vendor: 'Juniper' }
    ];
    
    sampleDevices.forEach(device => {
        const option = document.createElement('option');
        option.value = device.ip;
        option.textContent = `${device.hostname} (${device.ip}, ${device.vendor})`;
        deploymentDevices.appendChild(option);
    });
}

/**
 * Show modal for adding a device manually
 */
function showAddDeviceModal() {
    // Create modal element
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    modalContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.cssText = `
        background-color: var(--card-background);
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        width: 80%;
        max-width: 500px;
        max-height: 80vh;
        overflow-y: auto;
    `;
    
    modalContent.innerHTML = `
        <h3>Add Device Manually</h3>
        
        <div class="input-group">
            <label for="device-ip">IP Address</label>
            <input type="text" id="device-ip" placeholder="e.g., 192.168.1.10">
        </div>
        
        <div class="input-group">
            <label for="device-hostname">Hostname</label>
            <input type="text" id="device-hostname" placeholder="e.g., SWITCH-01">
        </div>
        
        <div class="input-group">
            <label for="device-vendor">Vendor</label>
            <select id="device-vendor">
                <option value="">Select Vendor</option>
                <option value="cisco">Cisco</option>
                <option value="aruba">Aruba</option>
                <option value="juniper">Juniper</option>
                <option value="extreme">Extreme</option>
                <option value="hp">HP</option>
                <option value="other">Other</option>
            </select>
        </div>
        
        <div class="input-group">
            <label for="device-platform">Platform</label>
            <select id="device-platform">
                <option value="">Select Platform</option>
                <!-- Will be populated based on vendor selection -->
            </select>
        </div>
        
        <div class="modal-actions">
            <button id="cancel-device" class="secondary-button">Cancel</button>
            <button id="add-device" class="primary-button">Add Device</button>
        </div>
    `;
    
    modalContainer.appendChild(modalContent);
    document.body.appendChild(modalContainer);
    
    // Add event listeners
    document.getElementById('cancel-device').addEventListener('click', function() {
        document.body.removeChild(modalContainer);
    });
    
    document.getElementById('add-device').addEventListener('click', function() {
        const ip = document.getElementById('device-ip').value;
        const hostname = document.getElementById('device-hostname').value;
        const vendor = document.getElementById('device-vendor').value;
        const platform = document.getElementById('device-platform').value;
        
        if (!ip || !hostname || !vendor) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Add device to the list
        const deploymentDevices = document.getElementById('deployment-devices');
        if (deploymentDevices) {
            const option = document.createElement('option');
            option.value = ip;
            option.textContent = `${hostname} (${ip}, ${vendor})`;
            deploymentDevices.appendChild(option);
        }
        
        // Close the modal
        document.body.removeChild(modalContainer);
    });
    
    // Handle vendor change to update platform options
    document.getElementById('device-vendor').addEventListener('change', function() {
        const platformSelect = document.getElementById('device-platform');
        const vendor = this.value;
        
        // Clear existing options
        platformSelect.innerHTML = '<option value="">Select Platform</option>';
        
        // Add platform options based on vendor
        if (vendor === 'cisco') {
            addPlatformOption(platformSelect, 'ios', 'IOS');
            addPlatformOption(platformSelect, 'ios-xe', 'IOS-XE');
            addPlatformOption(platformSelect, 'nxos', 'NX-OS');
            addPlatformOption(platformSelect, 'wlc', 'Wireless LAN Controller');
        } else if (vendor === 'aruba') {
            addPlatformOption(platformSelect, 'aoscx', 'AOS-CX');
            addPlatformOption(platformSelect, 'aos-switch', 'AOS-Switch');
            addPlatformOption(platformSelect, 'controller', 'Mobility Controller');
        } else if (vendor === 'juniper') {
            addPlatformOption(platformSelect, 'ex', 'EX Series');
            addPlatformOption(platformSelect, 'srx', 'SRX Series');
        } else if (vendor === 'extreme') {
            addPlatformOption(platformSelect, 'exos', 'EXOS');
            addPlatformOption(platformSelect, 'voss', 'VOSS');
        } else if (vendor === 'hp') {
            addPlatformOption(platformSelect, 'procurve', 'ProCurve');
            addPlatformOption(platformSelect, 'comware', 'Comware');
        } else if (vendor === 'other') {
            addPlatformOption(platformSelect, 'switch', 'Switch');
            addPlatformOption(platformSelect, 'router', 'Router');
            addPlatformOption(platformSelect, 'wireless', 'Wireless');
        }
    });
    
    // Helper function to add platform options
    function addPlatformOption(select, value, text) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = text;
        select.appendChild(option);
    }
    
    // Close modal when clicking outside
    modalContainer.addEventListener('click', function(e) {
        if (e.target === modalContainer) {
            document.body.removeChild(modalContainer);
        }
    });
}

/**
 * Generate a deployment plan
 */
function generateDeploymentPlan() {
    // In a real implementation, this would generate a comprehensive deployment plan
    
    const deploymentName = document.getElementById('deployment-name').value;
    const deploymentDescription = document.getElementById('deployment-description').value;
    const deploymentScope = document.getElementById('deployment-scope').value;
    
    if (!deploymentName) {
        alert('Please enter a deployment name.');
        return false;
    }
    
    // The structure of the deployment plan would be more complex in a real implementation
    const deploymentPlan = {
        name: deploymentName,
        description: deploymentDescription,
        scope: deploymentScope,
        created: new Date().toISOString(),
        stages: [
            {
                name: 'Prerequisites',
                tasks: [
                    { name: 'RADIUS Server Configuration', status: 'completed' },
                    { name: 'Network Access', status: 'completed' },
                    { name: 'Credentials Validation', status: 'incomplete' },
                    { name: 'Software Version Check', status: 'incomplete' }
                ]
            },
            {
                name: 'Configuration',
                tasks: [
                    { name: 'Global AAA Settings', status: 'incomplete' },
                    { name: 'RADIUS Server Settings', status: 'incomplete' },
                    { name: 'Interface Configuration', status: 'incomplete' },
                    { name: 'VLAN Configuration', status: 'incomplete' }
                ]
            },
            {
                name: 'Validation',
                tasks: [
                    { name: 'Successful Authentication Test', status: 'incomplete' },
                    { name: 'Failed Authentication Test', status: 'incomplete' },
                    { name: 'RADIUS Server Failover Test', status: 'incomplete' }
                ]
            },
            {
                name: 'Monitoring',
                tasks: [
                    { name: 'Configure Authentication Logging', status: 'incomplete' },
                    { name: 'Set Up SNMP Traps', status: 'incomplete' },
                    { name: 'Create Monitoring Dashboard', status: 'incomplete' }
                ]
            }
        ]
    };
    
    // In a real implementation, this would save the deployment plan
    console.log('Generated Deployment Plan:', deploymentPlan);
    
    return true;
}
