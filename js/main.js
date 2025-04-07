/**
 * Dot1Xer Supreme - Main JavaScript File
 * Version: 2.0.0
 * 
 * This file contains the core functionality of the Dot1Xer Supreme application.
 */

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tab navigation
    initTabNavigation();
    
    // Initialize platform toggle
    initPlatformToggle();
    
    // Initialize vendor grid
    initVendorGrid();
    
    // Initialize discovery tabs
    initDiscoveryTabs();
    
    // Initialize event listeners
    initEventListeners();
    
    // Check for saved configurations
    checkSavedConfigurations();
    
    // Initialize AI components if available
    if (typeof initAIIntegration === 'function') {
        initAIIntegration();
    }
    
    // Initialize Portnox integration if available
    if (typeof initPortnoxIntegration === 'function') {
        initPortnoxIntegration();
    }
});

/**
 * Initialize tab navigation
 */
function initTabNavigation() {
    const tabLinks = document.querySelectorAll('.nav-tabs a');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            tabLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to current link
            this.classList.add('active');
            
            // Get the tab id from data attribute
            const tabId = this.getAttribute('data-tab');
            
            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Show the selected tab content
            document.getElementById(tabId).classList.add('active');
        });
    });
}

/**
 * Initialize platform toggle
 */
function initPlatformToggle() {
    const platformButtons = document.querySelectorAll('.platform-toggle-btn');
    const wiredVendors = document.getElementById('wired-vendors');
    const wirelessVendors = document.getElementById('wireless-vendors');
    
    platformButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            platformButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to current button
            this.classList.add('active');
            
            // Get the platform from data attribute
            const platform = this.getAttribute('data-platform');
            
            // Show the appropriate vendor grid
            if (platform === 'wired') {
                wiredVendors.style.display = 'grid';
                wirelessVendors.style.display = 'none';
            } else {
                wiredVendors.style.display = 'none';
                wirelessVendors.style.display = 'grid';
            }
            
            // Reset any selected vendor
            document.querySelectorAll('.vendor-card').forEach(card => {
                card.classList.remove('selected');
            });
            
            // Hide configuration form and output
            document.getElementById('config-form-container').style.display = 'none';
            document.getElementById('config-output-container').style.display = 'none';
        });
    });
}

/**
 * Initialize vendor grid
 */
function initVendorGrid() {
    // Check if vendor data is available
    if (typeof vendorData === 'undefined') {
        console.error('Vendor data not found. Make sure vendor-data.js is loaded.');
        return;
    }
    
    const wiredVendorsContainer = document.getElementById('wired-vendors');
    const wirelessVendorsContainer = document.getElementById('wireless-vendors');
    
    // Clear containers
    wiredVendorsContainer.innerHTML = '';
    wirelessVendorsContainer.innerHTML = '';
    
    // Populate wired vendors
    vendorData.wired.forEach(vendor => {
        const vendorCard = createVendorCard(vendor, 'wired');
        wiredVendorsContainer.appendChild(vendorCard);
    });
    
    // Populate wireless vendors
    vendorData.wireless.forEach(vendor => {
        const vendorCard = createVendorCard(vendor, 'wireless');
        wirelessVendorsContainer.appendChild(vendorCard);
    });
}

/**
 * Create a vendor card element
 * @param {Object} vendor - Vendor data object
 * @param {String} platform - 'wired' or 'wireless'
 * @returns {HTMLElement} - Vendor card element
 */
function createVendorCard(vendor, platform) {
    const card = document.createElement('div');
    card.className = 'vendor-card';
    card.setAttribute('data-vendor', vendor.id);
    card.setAttribute('data-platform', platform);
    
    // Create card header
    const cardHeader = document.createElement('div');
    cardHeader.className = 'vendor-card-header';
    cardHeader.textContent = vendor.name;
    card.appendChild(cardHeader);
    
    // Create card body
    const cardBody = document.createElement('div');
    cardBody.className = 'vendor-card-body';
    
    // Add vendor logo
    const logo = document.createElement('img');
    logo.className = 'vendor-logo';
    logo.src = `assets/logos/${vendor.logo}`;
    logo.alt = vendor.name;
    cardBody.appendChild(logo);
    
    // Add vendor description
    const description = document.createElement('p');
    description.className = 'vendor-description';
    description.textContent = vendor.description || `${vendor.name} ${platform === 'wired' ? 'switches' : 'wireless'} configuration`;
    cardBody.appendChild(description);
    
    // Add select button
    const selectBtn = document.createElement('button');
    selectBtn.className = 'btn btn-primary btn-sm';
    selectBtn.textContent = 'Select';
    selectBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent card click from triggering
        selectVendor(vendor, platform);
    });
    cardBody.appendChild(selectBtn);
    
    card.appendChild(cardBody);
    
    // Add click event to the entire card
    card.addEventListener('click', function() {
        selectVendor(vendor, platform);
    });
    
    return card;
}

/**
 * Handle vendor selection
 * @param {Object} vendor - Selected vendor data
 * @param {String} platform - 'wired' or 'wireless'
 */
function selectVendor(vendor, platform) {
    // Remove selected class from all vendor cards
    document.querySelectorAll('.vendor-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selected class to the chosen vendor card
    document.querySelector(`.vendor-card[data-vendor="${vendor.id}"][data-platform="${platform}"]`).classList.add('selected');
    
    // Load and display the configuration form for the selected vendor
    loadVendorForm(vendor, platform);
}

/**
 * Load and display the configuration form for the selected vendor
 * @param {Object} vendor - Selected vendor data
 * @param {String} platform - 'wired' or 'wireless'
 */
function loadVendorForm(vendor, platform) {
    const formContainer = document.getElementById('config-form-container');
    
    // Show form container
    formContainer.style.display = 'block';
    
    // Load form template
    if (typeof loadTemplate === 'function') {
        loadTemplate(vendor.id, platform, formContainer, function() {
            initFormEventListeners(vendor, platform);
        });
    } else {
        // Fallback to basic form if templates.js is not loaded
        formContainer.innerHTML = createBasicForm(vendor, platform);
        initFormEventListeners(vendor, platform);
    }
    
    // Hide configuration output
    document.getElementById('config-output-container').style.display = 'none';
}

/**
 * Create a basic form if template loading fails
 * @param {Object} vendor - Selected vendor data
 * @param {String} platform - 'wired' or 'wireless'
 * @returns {String} - HTML for basic form
 */
function createBasicForm(vendor, platform) {
    return `
        <div class="vendor-form-header">
            <h3>${vendor.name} Configuration</h3>
            <img src="assets/logos/${vendor.logo}" alt="${vendor.name}" class="vendor-logo">
        </div>
        
        <form id="vendor-config-form">
            <div class="form-group">
                <label for="device_name">Device Name</label>
                <input type="text" class="form-control" id="device_name" name="device_name" required>
            </div>
            
            <div class="form-group">
                <label for="radius_server">RADIUS Server</label>
                <input type="text" class="form-control" id="radius_server" name="radius_server" required>
            </div>
            
            <div class="form-group">
                <label for="shared_secret">Shared Secret</label>
                <input type="password" class="form-control" id="shared_secret" name="shared_secret" required>
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn btn-primary" id="generate-config-btn">Generate Configuration</button>
                <button type="button" class="btn btn-light" id="reset-form-btn">Reset</button>
            </div>
        </form>
    `;
}

/**
 * Initialize event listeners for the configuration form
 * @param {Object} vendor - Selected vendor data
 * @param {String} platform - 'wired' or 'wireless'
 */
function initFormEventListeners(vendor, platform) {
    const generateBtn = document.getElementById('generate-config-btn');
    
    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            generateConfiguration(vendor, platform);
        });
    }
    
    const resetBtn = document.getElementById('reset-form-btn');
    
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            document.getElementById('vendor-config-form').reset();
        });
    }
    
    const copyBtn = document.getElementById('copy-config');
    
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            copyConfiguration();
        });
    }
    
    const saveBtn = document.getElementById('save-config');
    
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            saveConfiguration(vendor, platform);
        });
    }
}

/**
 * Generate configuration based on the form values
 * @param {Object} vendor - Selected vendor data
 * @param {String} platform - 'wired' or 'wireless'
 */
function generateConfiguration(vendor, platform) {
    // Get form values
    const form = document.getElementById('vendor-config-form');
    const formData = new FormData(form);
    const formValues = {};
    
    for (const [key, value] of formData.entries()) {
        formValues[key] = value;
    }
    
    // Validate form (basic validation)
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('is-invalid');
            isValid = false;
        } else {
            field.classList.remove('is-invalid');
        }
    });
    
    if (!isValid) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Generate a simple configuration
    let config = `! ${vendor.name} ${platform.toUpperCase()} 802.1X Configuration\n`;
    config += `! Generated by Dot1Xer Supreme on ${new Date().toLocaleString()}\n`;
    config += `! Device: ${formValues.device_name || 'Unknown'}\n\n`;
    
    // Example configuration based on vendor and platform
    if (vendor.id === 'cisco' && platform === 'wired') {
        config += ciscoWiredConfig(formValues);
    } else if (vendor.id === 'cisco-wlc' && platform === 'wireless') {
        config += ciscoWirelessConfig(formValues);
    } else if (vendor.id === 'aruba' && platform === 'wired') {
        config += arubaWiredConfig(formValues);
    } else if (vendor.id === 'aruba-mobility' && platform === 'wireless') {
        config += arubaWirelessConfig(formValues);
    } else {
        config += genericConfig(vendor, platform, formValues);
    }
    
    // Display the configuration
    const outputContainer = document.getElementById('config-output-container');
    const outputElement = document.getElementById('config-output');
    
    outputElement.textContent = config;
    outputContainer.style.display = 'block';
    
    // Scroll to output
    outputContainer.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Generate Cisco wired configuration
 * @param {Object} formValues - Form values
 * @returns {String} - Configuration
 */
function ciscoWiredConfig(formValues) {
    return `! RADIUS Server Configuration
radius server ${formValues.radius_server || 'RADIUS-SERVER'}
 address ipv4 ${formValues.radius_server || '192.0.2.10'} auth-port 1812 acct-port 1813
 key ${formValues.shared_secret || 'secret'}

! AAA Configuration
aaa new-model
aaa authentication dot1x default group radius
aaa authorization network default group radius
aaa accounting dot1x default start-stop group radius

! Global 802.1X Configuration
dot1x system-auth-control

! Interface Configuration
interface range ${formValues.port_range || 'GigabitEthernet1/0/1-48'}
 switchport mode access
 authentication port-control auto
 dot1x pae authenticator
 spanning-tree portfast
 spanning-tree bpduguard enable
 no shutdown
`;
}

/**
 * Generate Cisco wireless configuration
 * @param {Object} formValues - Form values
 * @returns {String} - Configuration
 */
function ciscoWirelessConfig(formValues) {
    return `! WLAN Configuration
config wlan create ${formValues.wlan_id || '1'} ${formValues.ssid || 'Enterprise-SSID'} ${formValues.ssid || 'Enterprise-SSID'}
config wlan security wpa akm 802.1x enable ${formValues.wlan_id || '1'}
config wlan security wpa wpa2 enable ${formValues.wlan_id || '1'}
config wlan security wpa wpa2 ciphers aes enable ${formValues.wlan_id || '1'}

! RADIUS Server Configuration
config radius auth add ${formValues.radius_index || '1'} ${formValues.radius_server || '192.0.2.10'} 1812 ascii ${formValues.shared_secret || 'secret'}
config radius acct add ${formValues.radius_index || '1'} ${formValues.radius_server || '192.0.2.10'} 1813 ascii ${formValues.shared_secret || 'secret'}

! RADIUS Server Assignment to WLAN
config wlan radius_server auth add ${formValues.wlan_id || '1'} ${formValues.radius_index || '1'}
config wlan radius_server acct add ${formValues.wlan_id || '1'} ${formValues.radius_index || '1'}

! Enable WLAN
config wlan enable ${formValues.wlan_id || '1'}
`;
}

/**
 * Generate Aruba wired configuration
 * @param {Object} formValues - Form values
 * @returns {String} - Configuration
 */
function arubaWiredConfig(formValues) {
    return `! RADIUS Server Configuration
radius-server host ${formValues.radius_server || '192.0.2.10'} key ${formValues.shared_secret || 'secret'}

! AAA Configuration
aaa authentication port-access eap-radius
aaa authentication dot1x chap-radius

! 802.1X Configuration
aaa port-access authenticator ${formValues.port_range || '1-48'}
aaa port-access authenticator ${formValues.port_range || '1-48'} auth-vid ${formValues.auth_vlan || '10'}
aaa port-access authenticator ${formValues.port_range || '1-48'} unauth-vid ${formValues.guest_vlan || '20'}
aaa port-access authenticator active
`;
}

/**
 * Generate Aruba wireless configuration
 * @param {Object} formValues - Form values
 * @returns {String} - Configuration
 */
function arubaWirelessConfig(formValues) {
    return `! AAA Configuration
aaa authentication-server radius ${formValues.radius_name || 'rad1'}
   host ${formValues.radius_server || '192.0.2.10'}
   key ${formValues.shared_secret || 'secret'}

aaa server-group ${formValues.server_group || 'dot1x'}
   auth-server ${formValues.radius_name || 'rad1'} position 1

! WLAN Configuration
wlan ssid-profile ${formValues.ssid || 'Enterprise-SSID'}
   essid ${formValues.ssid || 'Enterprise-SSID'}
   opmode wpa2-aes

wlan aaa-profile ${formValues.aaa_profile || 'dot1x-profile'}
   authentication-server ${formValues.server_group || 'dot1x'}
   dot1x-default-role ${formValues.default_role || 'authenticated'}
   
wlan virtual-ap ${formValues.virtual_ap || 'vap1'}
   ssid-profile ${formValues.ssid || 'Enterprise-SSID'}
   aaa-profile ${formValues.aaa_profile || 'dot1x-profile'}
   vlan ${formValues.vlan || '10'}
   
ap-group ${formValues.ap_group || 'default'}
   virtual-ap ${formValues.virtual_ap || 'vap1'}
`;
}

/**
 * Generate generic configuration for other vendors
 * @param {Object} vendor - Vendor data
 * @param {String} platform - 'wired' or 'wireless'
 * @param {Object} formValues - Form values
 * @returns {String} - Configuration
 */
function genericConfig(vendor, platform, formValues) {
    return `! This is a placeholder configuration for ${vendor.name} ${platform.toUpperCase()}.
! Actual configuration syntax would vary based on the vendor and platform.
! Please refer to ${vendor.name} documentation for accurate syntax.

! RADIUS Server: ${formValues.radius_server || '192.0.2.10'}
! Shared Secret: ${formValues.shared_secret || '[HIDDEN]'}
! Device Name: ${formValues.device_name || 'Unknown'}

! Note: This is a simplified configuration. In a production environment,
! you would need to configure additional parameters based on your network requirements.
`;
}

/**
 * Copy the generated configuration to clipboard
 */
function copyConfiguration() {
    const outputElement = document.getElementById('config-output');
    const configText = outputElement.textContent;
    
    // Create temporary textarea element to copy from
    const textarea = document.createElement('textarea');
    textarea.value = configText;
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            alert('Configuration copied to clipboard!');
        } else {
            alert('Failed to copy configuration. Please try again.');
        }
    } catch (err) {
        console.error('Error copying configuration:', err);
        alert('An error occurred while copying the configuration.');
    } finally {
        document.body.removeChild(textarea);
    }
}

/**
 * Save the generated configuration
 * @param {Object} vendor - Selected vendor data
 * @param {String} platform - 'wired' or 'wireless'
 */
function saveConfiguration(vendor, platform) {
    const outputElement = document.getElementById('config-output');
    const configText = outputElement.textContent;
    
    // Create a timestamp for the filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${vendor.id}-${platform}-config-${timestamp}.txt`;
    
    // Create a download link
    const blob = new Blob([configText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, 100);
}

/**
 * Initialize discovery tabs
 */
function initDiscoveryTabs() {
    const discoveryTabBtns = document.querySelectorAll('.discovery-tab-btn');
    const discoveryTabContents = document.querySelectorAll('.discovery-tab-content');
    
    discoveryTabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            discoveryTabBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to current button
            this.classList.add('active');
            
            // Get the tab id from data attribute
            const tabId = this.getAttribute('data-tab');
            
            // Hide all tab contents
            discoveryTabContents.forEach(content => content.classList.remove('active'));
            
            // Show the selected tab content
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Initialize network scan functionality
    const startScanBtn = document.getElementById('start-scan');
    if (startScanBtn) {
        startScanBtn.addEventListener('click', function() {
            if (typeof startNetworkScan === 'function') {
                startNetworkScan();
            } else {
                alert('Network scanning functionality not available.');
            }
        });
    }
}

/**
 * Initialize global event listeners
 */
function initEventListeners() {
    // Implementation details
    console.log('Event listeners initialized');
}

/**
 * Check for saved configurations
 */
function checkSavedConfigurations() {
    // Implementation details
    console.log('Checking saved configurations');
}
