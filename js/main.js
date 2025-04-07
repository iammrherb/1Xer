/**
 * Dot1Xer Supreme - Main JavaScript
 * Core functionality for the Dot1Xer Supreme application
 * Version: 3.5.0
 */

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeVendorPlatforms();
    initializeAuthMethods();
    initializeUIHandlers();
    initializeHelpTips();
    initializeThemeSelector();
    
    // Generate configuration on button click
    document.getElementById('generate-config').addEventListener('click', generateConfiguration);
    
    // Copy configuration on button click
    document.getElementById('copy-config').addEventListener('click', function() {
        copyToClipboard('config-result');
    });
    
    // Download configuration on button click
    document.getElementById('download-config').addEventListener('click', function() {
        downloadConfiguration();
    });
    
    // Save as template on button click
    document.getElementById('save-template').addEventListener('click', saveAsTemplate);
    
    // Initialize the deployment type selection
    initializeDeploymentTypes();
    
    // Initialize AI provider selection
    initializeAIProviders();
    
    // Initialize AI tasks
    initializeAITasks();
    
    // Execute AI task on button click
    document.getElementById('execute-ai-task').addEventListener('click', executeAITask);
    
    // Initialize Help tabs
    initializeHelpTabs();
    
    // Initialize the Portnox integration
    initializePortnoxIntegration();
    
    // Load any saved user preferences
    loadUserPreferences();
});

/**
 * Initialize the tab navigation
 */
function initializeTabs() {
    const tabs = document.querySelectorAll('nav a');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Show the corresponding tab content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Save the active tab to localStorage
            localStorage.setItem('dot1xer-active-tab', tabId);
        });
    });
    
    // Activate the last selected tab if available
    const lastTab = localStorage.getItem('dot1xer-active-tab');
    if (lastTab) {
        const tabToActivate = document.querySelector(`nav a[data-tab="${lastTab}"]`);
        if (tabToActivate) {
            tabToActivate.click();
        }
    }
}

/**
 * Initialize vendor-platform relationships
 */
function initializeVendorPlatforms() {
    const vendorSelect = document.getElementById('vendor');
    const platformSelect = document.getElementById('platform');
    
    // Define platform options for each vendor
    const platformOptions = {
        cisco: [
            {value: 'ios', text: 'IOS'},
            {value: 'ios-xe', text: 'IOS-XE'},
            {value: 'nx-os', text: 'NX-OS'},
            {value: 'wlc', text: 'Wireless LAN Controller'}
        ],
        aruba: [
            {value: 'aos-cx', text: 'AOS-CX'},
            {value: 'aos-switch', text: 'AOS-Switch'},
            {value: 'instant', text: 'Instant AP'}
        ],
        juniper: [
            {value: 'junos', text: 'JunOS'},
            {value: 'ex-series', text: 'EX Series'},
            {value: 'srx-series', text: 'SRX Series'}
        ],
        fortinet: [
            {value: 'fortigate', text: 'FortiGate'},
            {value: 'fortiswitch', text: 'FortiSwitch'},
            {value: 'fortiwlc', text: 'FortiWLC'}
        ],
        arista: [
            {value: 'eos', text: 'EOS'}
        ],
        extreme: [
            {value: 'exos', text: 'EXOS'},
            {value: 'voss', text: 'VOSS'}
        ],
        huawei: [
            {value: 'vrp', text: 'VRP'}
        ],
        dell: [
            {value: 'os10', text: 'OS10'},
            {value: 'os9', text: 'OS9'}
        ],
        hp: [
            {value: 'procurve', text: 'ProCurve'},
            {value: 'comware', text: 'Comware'}
        ],
        alcatel: [
            {value: 'aos', text: 'AOS'}
        ],
        ubiquiti: [
            {value: 'unifi', text: 'UniFi'},
            {value: 'edgeswitch', text: 'EdgeSwitch'}
        ],
        netgear: [
            {value: 'gsm', text: 'GSM Series'}
        ],
        ruckus: [
            {value: 'fastiron', text: 'FastIron'},
            {value: 'smartzone', text: 'SmartZone'}
        ],
        brocade: [
            {value: 'fastiron', text: 'FastIron'},
            {value: 'netiron', text: 'NetIron'}
        ],
        paloalto: [
            {value: 'panos', text: 'PAN-OS'}
        ],
        checkpoint: [
            {value: 'gaia', text: 'Gaia'}
        ],
        sonicwall: [
            {value: 'sonicOS', text: 'SonicOS'}
        ],
        portnox: [
            {value: 'cloud', text: 'Portnox Cloud'},
            {value: 'clear', text: 'Portnox CLEAR'}
        ]
    };
    
    // Update platform options when vendor changes
    vendorSelect.addEventListener('change', function() {
        const vendor = this.value;
        
        // Clear current options
        platformSelect.innerHTML = '<option value="">-- Select Platform --</option>';
        
        // Add options for selected vendor
        if (vendor && platformOptions[vendor]) {
            platformSelect.disabled = false;
            
            platformOptions[vendor].forEach(option => {
                const optElement = document.createElement('option');
                optElement.value = option.value;
                optElement.textContent = option.text;
                platformSelect.appendChild(optElement);
            });
        } else {
            platformSelect.disabled = true;
        }
    });
}

/**
 * Initialize authentication method options
 */
function initializeAuthMethods() {
    const authMethodSelect = document.getElementById('auth-method');
    const eapMethodSelect = document.getElementById('eap-method');
    
    // Show/hide EAP method select based on auth method
    authMethodSelect.addEventListener('change', function() {
        const authMethod = this.value;
        
        // Show EAP method select for 802.1X-related auth methods
        if (authMethod === 'dot1x-only' || authMethod === 'dot1x-mab' || authMethod === 'multi-auth') {
            eapMethodSelect.parentElement.style.display = '';
        } else {
            eapMethodSelect.parentElement.style.display = 'none';
        }
    });
}

/**
 * Initialize UI event handlers
 */
function initializeUIHandlers() {
    // Toggle RADIUS accounting options
    const enableAccounting = document.getElementById('enable-accounting');
    
    enableAccounting.addEventListener('change', function() {
        const accountingOptions = document.getElementById('accounting-options');
        if (accountingOptions) {
            accountingOptions.style.display = this.checked ? 'block' : 'none';
        }
    });
    
    // Toggle TACACS+ options
    const enableTACACS = document.getElementById('enable-tacacs');
    
    enableTACACS.addEventListener('change', function() {
        if (this.checked) {
            // Find and open the TACACS+ accordion if it exists
            const accordionHeaders = document.querySelectorAll('.accordion-header');
            for (let i = 0; i < accordionHeaders.length; i++) {
                if (accordionHeaders[i].textContent.includes('TACACS+')) {
                    openAccordion(i);
                    break;
                }
            }
        }
    });
    
    // Toggle RadSec options
    const enableRadSec = document.getElementById('enable-radsec');
    
    enableRadSec.addEventListener('change', function() {
        if (this.checked) {
            // Find and open the RadSec accordion if it exists
            const accordionHeaders = document.querySelectorAll('.accordion-header');
            for (let i = 0; i < accordionHeaders.length; i++) {
                if (accordionHeaders[i].textContent.includes('RadSec')) {
                    openAccordion(i);
                    break;
                }
            }
        }
    });
    
    // Toggle CoA options
    const enableCoA = document.getElementById('enable-coa');
    
    enableCoA.addEventListener('change', function() {
        if (this.checked) {
            // Find and open the RADIUS accordion if it exists
            const accordionHeaders = document.querySelectorAll('.accordion-header');
            for (let i = 0; i < accordionHeaders.length; i++) {
                if (accordionHeaders[i].textContent.includes('RADIUS')) {
                    openAccordion(i);
                    break;
                }
            }
        }
    });
    
    // Initialize interface batch configuration
    const batchConfigToggle = document.getElementById('batch-config-toggle');
    if (batchConfigToggle) {
        batchConfigToggle.addEventListener('change', function() {
            const singleInterface = document.getElementById('single-interface-config');
            const batchInterface = document.getElementById('batch-interface-config');
            
            if (this.checked) {
                singleInterface.style.display = 'none';
                batchInterface.style.display = 'block';
            } else {
                singleInterface.style.display = 'block';
                batchInterface.style.display = 'none';
            }
        });
    }
}

/**
 * Initialize help tips hover behavior
 */
function initializeHelpTips() {
    // This is now a placeholder - the CSS handles the tooltip display
}

/**
 * Initialize theme selector for dark/light mode
 */
function initializeThemeSelector() {
    const darkModeToggle = document.createElement('div');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(darkModeToggle);
    
    // Set initial theme based on preference
    const isDarkMode = localStorage.getItem('dot1xer-dark-mode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Toggle theme when clicked
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        
        // Update toggle icon
        if (isDark) {
            this.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            this.innerHTML = '<i class="fas fa-moon"></i>';
        }
        
        // Save preference
        localStorage.setItem('dot1xer-dark-mode', isDark);
    });
}

/**
 * Load user preferences from localStorage
 */
function loadUserPreferences() {
    // Restore form values if available
    const savedConfig = localStorage.getItem('dot1xer-last-config');
    if (savedConfig) {
        try {
            const config = JSON.parse(savedConfig);
            for (const [key, value] of Object.entries(config)) {
                const element = document.getElementById(key);
                if (element) {
                    if (element.type === 'checkbox') {
                        element.checked = value;
                    } else {
                        element.value = value;
                        
                        // Trigger change event for vendor select to load platforms
                        if (key === 'vendor') {
                            const event = new Event('change');
                            element.dispatchEvent(event);
                            
                            // Set platform after vendor's change event has fired
                            setTimeout(() => {
                                const platformElement = document.getElementById('platform');
                                if (platformElement && config.platform) {
                                    platformElement.value = config.platform;
                                }
                            }, 100);
                        }
                        
                        // Trigger change event for auth-method to show/hide EAP method
                        if (key === 'auth-method') {
                            const event = new Event('change');
                            element.dispatchEvent(event);
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error loading saved configuration:', error);
        }
    }
}

/**
 * Generate configuration based on form inputs
 */
function generateConfiguration() {
    // Get form values
    const vendor = document.getElementById('vendor').value;
    const platform = document.getElementById('platform').value;
    const authMethod = document.getElementById('auth-method').value;
    const eapMethod = document.getElementById('eap-method').value;
    const radiusServer = document.getElementById('radius-server').value;
    const radiusSecret = document.getElementById('radius-secret').value;
    const backupServer = document.getElementById('backup-server').value;
    const backupSecret = document.getElementById('backup-secret').value;
    const vlanAuth = document.getElementById('vlan-auth').value;
    const vlanVoice = document.getElementById('vlan-voice').value;
    const vlanGuest = document.getElementById('vlan-guest').value;
    const vlanCritical = document.getElementById('vlan-critical').value;
    const interface = document.getElementById('interface').value;
    
    // Check if required fields are filled
    if (!vendor || !platform || !authMethod || !radiusServer || !radiusSecret || !vlanAuth) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Get checkbox values
    const enableCoA = document.getElementById('enable-coa').checked;
    const enableMonitor = document.getElementById('enable-monitor').checked;
    const enableAccounting = document.getElementById('enable-accounting').checked;
    const enableTACACS = document.getElementById('enable-tacacs').checked;
    const enableRadSec = document.getElementById('enable-radsec').checked;
    
    // Save form values to localStorage
    const formValues = {
        'vendor': vendor,
        'platform': platform,
        'auth-method': authMethod,
        'eap-method': eapMethod,
        'radius-server': radiusServer,
        'radius-secret': radiusSecret,
        'backup-server': backupServer,
        'backup-secret': backupSecret,
        'vlan-auth': vlanAuth,
        'vlan-voice': vlanVoice,
        'vlan-guest': vlanGuest,
        'vlan-critical': vlanCritical,
        'interface': interface,
        'enable-coa': enableCoA,
        'enable-monitor': enableMonitor,
        'enable-accounting': enableAccounting,
        'enable-tacacs': enableTACACS,
        'enable-radsec': enableRadSec
    };
    localStorage.setItem('dot1xer-last-config', JSON.stringify(formValues));
    
    // Generate configuration based on selected vendor and options
    let config = '';
    
    // Determine which configuration template to use based on auth method
    let templateType = '';
    
    switch (authMethod) {
        case 'dot1x-only':
            templateType = 'dot1x_only';
            break;
        case 'mab-only':
            templateType = 'mab_only';
            break;
        case 'dot1x-mab':
            templateType = 'dot1x_mab';
            break;
        default:
            templateType = 'dot1x_mab'; // Default to most comprehensive option
    }
    
    try {
        // Try to fetch the appropriate template from the templates directory
        fetch(`templates/${vendor}/${platform}/${templateType}.conf`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Template not found: templates/${vendor}/${platform}/${templateType}.conf`);
                }
                return response.text();
            })
            .then(template => {
                // Generate the configuration by replacing placeholders in the template
                config = processTemplate(template, {
                    RADIUS_IP_PRIMARY: radiusServer,
                    RADIUS_KEY_PRIMARY: radiusSecret,
                    RADIUS_IP_SECONDARY: backupServer || '',
                    RADIUS_KEY_SECONDARY: backupSecret || '',
                    DATA_VLAN: vlanAuth,
                    VOICE_VLAN: vlanVoice || '',
                    GUEST_VLAN: vlanGuest || '',
                    CRITICAL_VLAN: vlanCritical || '',
                    INTERFACE: interface || '<INTERFACE>',
                    SWITCH_IP: getSwitchIP(),
                    EAP_METHOD: eapMethod || 'peap',
                    ENABLE_COA: enableCoA ? 'yes' : 'no',
                    ENABLE_MONITOR: enableMonitor ? 'yes' : 'no',
                    ENABLE_ACCOUNTING: enableAccounting ? 'yes' : 'no',
                    ENABLE_TACACS: enableTACACS ? 'yes' : 'no',
                    ENABLE_RADSEC: enableRadSec ? 'yes' : 'no',
                    TIMESTAMP: new Date().toISOString()
                });
                
                // Display the generated configuration
                document.getElementById('config-result').textContent = config;
            })
            .catch(error => {
                console.error('Error fetching template:', error);
                
                // Fallback to generating configuration programmatically
                switch (vendor) {
                    case 'cisco':
                        config = generateCiscoConfig(platform, authMethod, eapMethod, radiusServer, radiusSecret, backupServer, backupSecret, vlanAuth, vlanVoice, vlanGuest, vlanCritical, interface, enableCoA, enableMonitor, enableAccounting, enableTACACS, enableRadSec);
                        break;
                    case 'aruba':
                        config = generateArubaConfig(platform, authMethod, eapMethod, radiusServer, radiusSecret, backupServer, backupSecret, vlanAuth, vlanVoice, vlanGuest, vlanCritical, interface, enableCoA, enableMonitor, enableAccounting, enableTACACS, enableRadSec);
                        break;
                    case 'juniper':
                        config = generateJuniperConfig(platform, authMethod, eapMethod, radiusServer, radiusSecret, backupServer, backupSecret, vlanAuth, vlanVoice, vlanGuest, vlanCritical, interface, enableCoA, enableMonitor, enableAccounting, enableTACACS, enableRadSec);
                        break;
                    default:
                        config = generateGenericConfig(vendor, platform, authMethod, eapMethod, radiusServer, radiusSecret, backupServer, backupSecret, vlanAuth, vlanVoice, vlanGuest, vlanCritical, interface, enableCoA, enableMonitor, enableAccounting, enableTACACS, enableRadSec);
                }
                
                // Display the generated configuration
                document.getElementById('config-result').textContent = config;
            });
    } catch (error) {
        console.error('Error generating configuration:', error);
        
        // Fallback to generating Cisco configuration
        config = generateCiscoConfig(platform, authMethod, eapMethod, radiusServer, radiusSecret, backupServer, backupSecret, vlanAuth, vlanVoice, vlanGuest, vlanCritical, interface, enableCoA, enableMonitor, enableAccounting, enableTACACS, enableRadSec);
        
        // Display the generated configuration
        document.getElementById('config-result').textContent = config;
    }
}

/**
 * Process a configuration template by replacing placeholders
 * @param {string} template - The template string
 * @param {object} values - The values to replace in the template
 * @returns {string} The processed template
 */
function processTemplate(template, values) {
    let result = template;
    
    // Replace all placeholders in the template
    for (const [key, value] of Object.entries(values)) {
        const placeholder = new RegExp(`<${key}>`, 'g');
        result = result.replace(placeholder, value);
    }
    
    // Handle conditional sections
    // Format: <!-- IF:CONDITION_NAME -->content<!-- ENDIF:CONDITION_NAME -->
    const conditionalPattern = /<!-- IF:([A-Z_]+) -->([\s\S]*?)<!-- ENDIF:\1 -->/g;
    result = result.replace(conditionalPattern, (match, condition, content) => {
        // Check if the condition is true
        if (values[condition] === 'yes' || values[condition] === true || values[condition] && values[condition] !== '') {
            return content;
        }
        return '';
    });
    
    // Handle empty optional values
    // Remove lines containing empty placeholders
    result = result.split('\n')
        .filter(line => !line.includes('<') || !line.includes('>'))
        .join('\n');
    
    return result;
}

/**
 * Get the IP address to use as the switch IP
 * @returns {string} The IP address
 */
function getSwitchIP() {
    // This would normally get the IP from the form or from a predefined value
    // For this example, return a placeholder value
    return '<SWITCH_IP>';
}

/**
 * Generate Cisco configuration
 */
function generateCiscoConfig(platform, authMethod, eapMethod, radiusServer, radiusSecret, backupServer, backupSecret, vlanAuth, vlanVoice, vlanGuest, vlanCritical, interface, enableCoA, enableMonitor, enableAccounting, enableTACACS, enableRadSec) {
    // Basic configuration structure
    let config = `! Cisco ${platform.toUpperCase()} 802.1X Configuration\n`;
    config += `! Generated by Dot1Xer Supreme on ${new Date().toISOString()}\n\n`;
    
    // Global settings
    config += `! Global Configuration\n`;
    config += `aaa new-model\n`;
    config += `dot1x system-auth-control\n`;
    
    // RADIUS server configuration
    config += `\n! RADIUS Server Configuration\n`;
    config += `radius server PRIMARY\n`;
    config += ` address ipv4 ${radiusServer} auth-port 1812 acct-port 1813\n`;
    config += ` key ${radiusSecret}\n`;
    config += ` timeout 5\n`;
    config += ` retransmit 3\n`;
    
    if (backupServer) {
        config += `radius server BACKUP\n`;
        config += ` address ipv4 ${backupServer} auth-port 1812 acct-port 1813\n`;
        config += ` key ${backupSecret}\n`;
        config += ` timeout 5\n`;
        config += ` retransmit 3\n`;
    }
    
    // RADIUS server group
    config += `\naaa group server radius RADIUS-SERVERS\n`;
    config += ` server name PRIMARY\n`;
    if (backupServer) {
        config += ` server name BACKUP\n`;
    }
    config += ` deadtime 10\n`;
    
    // AAA configuration
    config += `\n! AAA Configuration\n`;
    config += `aaa authentication dot1x default group RADIUS-SERVERS\n`;
    config += `aaa authorization network default group RADIUS-SERVERS\n`;
    
    if (enableAccounting) {
        config += `aaa accounting dot1x default start-stop group RADIUS-SERVERS\n`;
    }
    
    // TACACS+ configuration
    if (enableTACACS) {
        config += `\n! TACACS+ Configuration\n`;
        config += `tacacs server TACACS-SERVER\n`;
        config += ` address ipv4 10.1.1.200\n`;
        config += ` key TACACS-KEY\n`;
        config += ` timeout 5\n`;
        config += `aaa group server tacacs+ TACACS-SERVERS\n`;
        config += ` server name TACACS-SERVER\n`;
        config += `aaa authentication login default group TACACS-SERVERS local\n`;
        config += `aaa authorization exec default group TACACS-SERVERS local\n`;
        config += `aaa accounting exec default start-stop group TACACS-SERVERS\n`;
    }
    
    // RadSec configuration
    if (enableRadSec) {
        config += `\n! RadSec Configuration\n`;
        config += `radius server RADSEC-SERVER\n`;
        config += ` address ipv4 10.1.1.300 auth-port 2083 acct-port 2083\n`;
        config += ` key RADSEC-KEY\n`;
        config += ` tls trustpoint RADSEC-TP\n`;
    }
    
    // VLAN configuration
    config += `\n! VLAN Configuration\n`;
    config += `vlan ${vlanAuth}\n`;
    config += ` name DATA_VLAN\n`;
    
    if (vlanVoice) {
        config += `vlan ${vlanVoice}\n`;
        config += ` name VOICE_VLAN\n`;
    }
    
    if (vlanGuest) {
        config += `vlan ${vlanGuest}\n`;
        config += ` name GUEST_VLAN\n`;
    }
    
    if (vlanCritical) {
        config += `vlan ${vlanCritical}\n`;
        config += ` name CRITICAL_VLAN\n`;
    }
    
    // Interface configuration
    config += `\n! Interface Configuration\n`;
    config += `interface ${interface || 'GigabitEthernet1/0/1'}\n`;
    config += ` switchport mode access\n`;
    config += ` switchport access vlan ${vlanAuth}\n`;
    
    if (vlanVoice) {
        config += ` switchport voice vlan ${vlanVoice}\n`;
    }
    
    // Authentication settings
    config += ` authentication port-control auto\n`;
    
    if (authMethod === 'dot1x-only') {
        config += ` authentication order dot1x\n`;
        config += ` authentication priority dot1x\n`;
        config += ` dot1x pae authenticator\n`;
    } else if (authMethod === 'mab-only') {
        config += ` authentication order mab\n`;
        config += ` authentication priority mab\n`;
        config += ` mab\n`;
    } else if (authMethod === 'dot1x-mab') {
        config += ` authentication order dot1x mab\n`;
        config += ` authentication priority dot1x mab\n`;
        config += ` dot1x pae authenticator\n`;
        config += ` mab\n`;
    }
    
    if (vlanGuest) {
        config += ` authentication event fail action authorize vlan ${vlanGuest}\n`;
    }
    
    if (vlanCritical) {
        config += ` authentication event server dead action authorize vlan ${vlanCritical}\n`;
        config += ` authentication event server alive action reinitialize\n`;
    }
    
    if (enableMonitor) {
        config += ` authentication open\n`;
    }
    
    config += ` authentication periodic\n`;
    config += ` authentication timer reauthenticate 3600\n`;
    config += ` spanning-tree portfast\n`;
    
    // Change of Authorization (CoA)
    if (enableCoA) {
        config += `\n! RADIUS Change of Authorization (CoA) Configuration\n`;
        config += `aaa server radius dynamic-author\n`;
        config += ` client ${radiusServer} server-key ${radiusSecret}\n`;
        
        if (backupServer) {
            config += ` client ${backupServer} server-key ${backupSecret}\n`;
        }
        
        config += ` auth-type any\n`;
        config += ` port 3799\n`;
    }
    
    config += `\n! End of Configuration\n`;
    
    return config;
}

/**
 * Generate Aruba configuration
 */
function generateArubaConfig(platform, authMethod, eapMethod, radiusServer, radiusSecret, backupServer, backupSecret, vlanAuth, vlanVoice, vlanGuest, vlanCritical, interface, enableCoA, enableMonitor, enableAccounting, enableTACACS, enableRadSec) {
    // Generate a more detailed Aruba configuration based on platform
    let config = `# Aruba ${platform} 802.1X Configuration\n`;
    config += `# Generated by Dot1Xer Supreme on ${new Date().toISOString()}\n\n`;
    
    if (platform === 'aos-cx') {
        config += `# AOS-CX 802.1X Configuration\n\n`;
        
        // RADIUS Configuration
        config += `radius-server host ${radiusServer} key ${radiusSecret}\n`;
        
        if (backupServer) {
            config += `radius-server host ${backupServer} key ${backupSecret}\n`;
        }
        
        config += `radius-server timeout 5\n`;
        config += `radius-server retransmit 3\n\n`;
        
        // AAA Configuration
        config += `aaa authentication port-access dot1x authenticator\n`;
        config += `aaa authentication port-access dot1x authenticator chap\n`;
        config += `aaa authentication port-access dot1x authenticator eap-radius\n`;
        config += `aaa authentication port-access dot1x authenticator cached-reauth\n`;
        
        if (enableAccounting) {
            config += `aaa accounting dot1x start-stop radius\n`;
        }
        
        // VLAN Configuration
        config += `\n# VLAN Configuration\n`;
        config += `vlan ${vlanAuth}\n`;
        config += `    name "DATA_VLAN"\n`;
        
        if (vlanVoice) {
            config += `vlan ${vlanVoice}\n`;
            config += `    name "VOICE_VLAN"\n`;
        }
        
        if (vlanGuest) {
            config += `vlan ${vlanGuest}\n`;
            config += `    name "GUEST_VLAN"\n`;
        }
        
        if (vlanCritical) {
            config += `vlan ${vlanCritical}\n`;
            config += `    name "CRITICAL_VLAN"\n`;
        }
        
        // Interface Configuration
        config += `\n# Interface Configuration\n`;
        config += `interface ${interface || '1/1/1'}\n`;
        config += `    no shutdown\n`;
        config += `    vlan access ${vlanAuth}\n`;
        
        if (vlanVoice) {
            config += `    vlan voice ${vlanVoice}\n`;
        }
        
        // Authentication Configuration
        if (authMethod === 'dot1x-only') {
            config += `    aaa authentication port-access dot1x authenticator\n`;
            config += `    aaa port-access dot1x authenticator\n`;
        } else if (authMethod === 'mab-only') {
            config += `    aaa authentication port-access mac-auth\n`;
            config += `    aaa port-access mac-auth\n`;
        } else if (authMethod === 'dot1x-mab') {
            config += `    aaa authentication port-access dot1x authenticator\n`;
            config += `    aaa authentication port-access mac-auth\n`;
            config += `    aaa port-access dot1x authenticator\n`;
            config += `    aaa port-access mac-auth\n`;
        }
        
        if (enableMonitor) {
            config += `    aaa port-access controlled-port authorized-when-unauthenticated\n`;
        }
        
        if (vlanGuest) {
            config += `    aaa port-access auth-fail-vlan ${vlanGuest}\n`;
        }
        
        if (vlanCritical) {
            config += `    aaa port-access server-fail-vlan ${vlanCritical}\n`;
        }
        
        config += `    spanning-tree port-type admin-edge\n`;
    } else if (platform === 'aos-switch') {
        config += `# AOS-Switch 802.1X Configuration\n\n`;
        
        // RADIUS Configuration
        config += `radius-server host ${radiusServer} key ${radiusSecret}\n`;
        
        if (backupServer) {
            config += `radius-server host ${backupServer} key ${backupSecret}\n`;
        }
        
        config += `radius-server timeout 5\n`;
        config += `radius-server retransmit 3\n\n`;
        
        // AAA Configuration
        config += `aaa authentication port-access eap-radius\n`;
        
        if (enableAccounting) {
            config += `aaa accounting dot1x start-stop radius\n`;
        }
        
        // Interface Configuration
        config += `\n# Interface Configuration\n`;
        config += `interface ${interface || '1'}\n`;
        config += `    no flow-control\n`;
        
        // Authentication Configuration
        if (authMethod === 'dot1x-only') {
            config += `    aaa port-access authenticator\n`;
            config += `    aaa port-access authenticator active\n`;
        } else if (authMethod === 'mab-only') {
            config += `    aaa port-access mac-auth\n`;
        } else if (authMethod === 'dot1x-mab') {
            config += `    aaa port-access authenticator\n`;
            config += `    aaa port-access authenticator active\n`;
            config += `    aaa port-access mac-auth\n`;
        }
        
        if (vlanAuth) {
            config += `    vlan-id ${vlanAuth}\n`;
        }
        
        if (vlanVoice) {
            config += `    voice-vlan ${vlanVoice}\n`;
        }
        
        if (vlanGuest) {
            config += `    aaa port-access authenticator unauth-vid ${vlanGuest}\n`;
        }
        
        if (vlanCritical) {
            config += `    aaa port-access authenticator server-timeout-vlan ${vlanCritical}\n`;
        }
        
        if (enableMonitor) {
            config += `    aaa port-access authenticator controlled-direction in\n`;
        }
        
        config += `    spanning-tree admin-edge-port\n`;
    } else {
        config += `# This is a placeholder for Aruba ${platform} configuration.\n`;
        config += `# The actual configuration would be generated based on your selections.\n`;
    }
    
    return config;
}

/**
 * Generate Juniper configuration
 */
function generateJuniperConfig(platform, authMethod, eapMethod, radiusServer, radiusSecret, backupServer, backupSecret, vlanAuth, vlanVoice, vlanGuest, vlanCritical, interface, enableCoA, enableMonitor, enableAccounting, enableTACACS, enableRadSec) {
    // Generate a more detailed Juniper configuration
    let config = `# Juniper ${platform} 802.1X Configuration\n`;
    config += `# Generated by Dot1Xer Supreme on ${new Date().toISOString()}\n\n`;
    
    if (platform === 'junos' || platform === 'ex-series') {
        // RADIUS Configuration
        config += `# RADIUS Server Configuration\n`;
        config += `set access radius-server ${radiusServer} secret "${radiusSecret}"\n`;
        config += `set access radius-server ${radiusServer} timeout 5\n`;
        config += `set access radius-server ${radiusServer} retry 3\n`;
        config += `set access radius-server ${radiusServer} source-address <SWITCH_IP>\n`;
        
        if (backupServer) {
            config += `set access radius-server ${backupServer} secret "${backupSecret}"\n`;
            config += `set access radius-server ${backupServer} timeout 5\n`;
            config += `set access radius-server ${backupServer} retry 3\n`;
            config += `set access radius-server ${backupServer} source-address <SWITCH_IP>\n`;
        }
        
        // Access Profile Configuration
        config += `\n# Access Profile Configuration\n`;
        config += `set access profile DOT1X-PROFILE authentication-order radius\n`;
        config += `set access profile DOT1X-PROFILE radius authentication-server ${radiusServer}\n`;
        
        if (backupServer) {
            config += `set access profile DOT1X-PROFILE radius authentication-server ${backupServer}\n`;
        }
        
        // VLAN Configuration
        config += `\n# VLAN Configuration\n`;
        config += `set vlans DATA_VLAN vlan-id ${vlanAuth}\n`;
        
        if (vlanVoice) {
            config += `set vlans VOICE_VLAN vlan-id ${vlanVoice}\n`;
        }
        
        if (vlanGuest) {
            config += `set vlans GUEST_VLAN vlan-id ${vlanGuest}\n`;
        }
        
        if (vlanCritical) {
            config += `set vlans CRITICAL_VLAN vlan-id ${vlanCritical}\n`;
        }
        
        // Interface Configuration
        config += `\n# Interface Configuration\n`;
        config += `set interfaces ${interface || 'ge-0/0/1'} unit 0 family ethernet-switching vlan members DATA_VLAN\n`;
        
        if (vlanVoice) {
            config += `set interfaces ${interface || 'ge-0/0/1'} unit 0 family ethernet-switching vlan members VOICE_VLAN\n`;
        }
        
        // Authentication Configuration
        config += `\n# 802.1X Configuration\n`;
        config += `set protocols dot1x authenticator authentication-profile-name DOT1X-PROFILE\n`;
        config += `set protocols dot1x authenticator interface ${interface || 'ge-0/0/1'}.0\n`;
        
        if (authMethod === 'dot1x-only') {
            config += `set protocols dot1x authenticator interface ${interface || 'ge-0/0/1'}.0 supplicant multiple\n`;
        } else if (authMethod === 'mab-only') {
            config += `set protocols dot1x authenticator interface ${interface || 'ge-0/0/1'}.0 mac-radius\n`;
            config += `set protocols dot1x authenticator interface ${interface || 'ge-0/0/1'}.0 supplicant none\n`;
        } else if (authMethod === 'dot1x-mab') {
            config += `set protocols dot1x authenticator interface ${interface || 'ge-0/0/1'}.0 mac-radius\n`;
            config += `set protocols dot1x authenticator interface ${interface || 'ge-0/0/1'}.0 supplicant multiple\n`;
        }
        
        if (vlanGuest) {
            config += `set protocols dot1x authenticator interface ${interface || 'ge-0/0/1'}.0 guest-vlan GUEST_VLAN\n`;
        }
        
        if (vlanCritical) {
            config += `set protocols dot1x authenticator interface ${interface || 'ge-0/0/1'}.0 server-fail vlan-name CRITICAL_VLAN\n`;
        }
        
        if (enableMonitor) {
            config += `set protocols dot1x authenticator interface ${interface || 'ge-0/0/1'}.0 server-fail bypass\n`;
        }
        
        // Accounting Configuration
        if (enableAccounting) {
            config += `\n# Accounting Configuration\n`;
            config += `set access profile DOT1X-PROFILE accounting order radius\n`;
            config += `set access profile DOT1X-PROFILE radius accounting-server ${radiusServer}\n`;
            
            if (backupServer) {
                config += `set access profile DOT1X-PROFILE radius accounting-server ${backupServer}\n`;
            }
        }
        
        // TACACS+ Configuration
        if (enableTACACS) {
            config += `\n# TACACS+ Configuration\n`;
            config += `set system tacplus-server 10.1.1.200 secret "TACACS-KEY"\n`;
            config += `set system tacplus-server 10.1.1.200 timeout 5\n`;
            config += `set system authentication-order [ tacplus password ]\n`;
        }
        
        // CoA Configuration
        if (enableCoA) {
            config += `\n# Change of Authorization (CoA) Configuration\n`;
            config += `set access profile DOT1X-PROFILE radius options change-of-authorization\n`;
        }
    } else {
        config += `# This is a placeholder for Juniper ${platform} configuration.\n`;
        config += `# The actual configuration would be generated based on your selections.\n`;
    }
    
    return config;
}

/**
 * Generate a generic configuration for other vendors
 */
function generateGenericConfig(vendor, platform, authMethod, eapMethod, radiusServer, radiusSecret, backupServer, backupSecret, vlanAuth, vlanVoice, vlanGuest, vlanCritical, interface, enableCoA, enableMonitor, enableAccounting, enableTACACS, enableRadSec) {
    // Generate a placeholder generic configuration
    let config = `# ${vendor} ${platform} 802.1X Configuration\n`;
    config += `# Generated by Dot1Xer Supreme on ${new Date().toISOString()}\n\n`;
    
    // Placeholder for generic configuration - this would be expanded in a full implementation
    config += `# This is a placeholder for ${vendor} ${platform} configuration.\n`;
    config += `# The actual configuration would be generated based on your selections.\n`;
    config += `# For vendor-specific configuration templates, please check the Templates tab.\n`;
    
    // Show configuration parameters
    config += `\n# Configuration Parameters:\n`;
    config += `# RADIUS Server: ${radiusServer}\n`;
    config += `# Backup Server: ${backupServer || 'Not configured'}\n`;
    config += `# Authentication VLAN: ${vlanAuth}\n`;
    config += `# Voice VLAN: ${vlanVoice || 'Not configured'}\n`;
    config += `# Guest VLAN: ${vlanGuest || 'Not configured'}\n`;
    config += `# Critical VLAN: ${vlanCritical || 'Not configured'}\n`;
    config += `# Authentication Method: ${authMethod}\n`;
    config += `# EAP Method: ${eapMethod || 'Not applicable'}\n`;
    config += `# Interface: ${interface || 'Default'}\n`;
    config += `# CoA Enabled: ${enableCoA ? 'Yes' : 'No'}\n`;
    config += `# Monitor Mode: ${enableMonitor ? 'Yes' : 'No'}\n`;
    config += `# Accounting: ${enableAccounting ? 'Enabled' : 'Disabled'}\n`;
    config += `# TACACS+: ${enableTACACS ? 'Enabled' : 'Disabled'}\n`;
    config += `# RadSec: ${enableRadSec ? 'Enabled' : 'Disabled'}\n`;
    
    return config;
}

/**
 * Download the current configuration to a file
 */
function downloadConfiguration() {
    const config = document.getElementById('config-result').textContent;
    
    // Check if there's content to download
    if (!config || config === '# Configuration will appear here after generation.') {
        alert('Please generate a configuration first.');
        return;
    }
    
    // Get vendor and platform for filename
    const vendor = document.getElementById('vendor').value || 'config';
    const platform = document.getElementById('platform').value || '';
    const authMethod = document.getElementById('auth-method').value || '';
    
    // Create a filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${vendor}_${platform}_${authMethod}_${timestamp}.conf`;
    
    // Create a blob with the content
    const blob = new Blob([config], { type: 'text/plain' });
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.display = 'none';
    
    // Append to document, click and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Copy text to clipboard
 */
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    
    // Create a temporary textarea to copy from
    const textarea = document.createElement('textarea');
    textarea.value = element.textContent;
    document.body.appendChild(textarea);
    
    // Select and copy
    textarea.select();
    document.execCommand('copy');
    
    // Clean up
    document.body.removeChild(textarea);
    
    // Show success message
    alert('Configuration copied to clipboard!');
}

/**
 * Save the current configuration as a template
 */
function saveAsTemplate() {
    const config = document.getElementById('config-result').textContent;
    
    if (config === '# Configuration will appear here after generation.') {
        alert('Please generate a configuration first.');
        return;
    }
    
    // Get vendor and platform for template categorization
    const vendor = document.getElementById('vendor').value || 'multi-vendor';
    const platform = document.getElementById('platform').value || '';
    const authMethod = document.getElementById('auth-method').value || '';
    
    // Show a dialog to name the template
    const templateName = prompt('Enter a name for this template:', `${vendor}-${platform}-${authMethod}`);
    
    if (templateName) {
        // Create a new template item in the list
        const templateList = document.querySelector('.template-list');
        const newTemplateItem = document.createElement('li');
        newTemplateItem.classList.add('template-item');
        newTemplateItem.setAttribute('data-category', vendor);
        newTemplateItem.textContent = templateName;
        
        // Add click event listener to the new template item
        newTemplateItem.addEventListener('click', function() {
            selectTemplate(this);
        });
        
        // Add the new template to the list
        templateList.appendChild(newTemplateItem);
        
        // Save the template to storage (simulated)
        saveTemplateToStorage(templateName, vendor, config);
        
        // Select the new template
        selectTemplate(newTemplateItem);
        
        // Switch to the Templates tab
        document.querySelector('nav a[data-tab="templates"]').click();
        
        alert(`Template "${templateName}" created successfully!`);
    }
}

/**
 * Save a template to localStorage
 * @param {string} name - The name of the template
 * @param {string} category - The category of the template
 * @param {string} config - The template configuration
 */
function saveTemplateToStorage(name, category, config) {
    // Check if localStorage is available
    if (typeof(Storage) !== "undefined") {
        // Get existing templates or create an empty array
        let templates = JSON.parse(localStorage.getItem('dot1xer-templates')) || [];
        
        // Add the new template
        templates.push({
            name: name,
            category: category,
            config: config,
            created: new Date().toISOString()
        });
        
        // Save the updated templates
        localStorage.setItem('dot1xer-templates', JSON.stringify(templates));
    } else {
        console.warn('localStorage is not available. Template will not be saved permanently.');
    }
}

/**
 * Select a template from the list
 * @param {HTMLElement} templateItem - The selected template item
 */
function selectTemplate(templateItem) {
    // Remove active class from all template items
    const templateItems = document.querySelectorAll('.template-item');
    templateItems.forEach(item => item.classList.remove('active'));
    
    // Add active class to the selected template item
    templateItem.classList.add('active');
    
    // Get template details
    const templateName = templateItem.textContent;
    const templateCategory = templateItem.getAttribute('data-category');
    
    // Get the template from storage
    if (typeof(Storage) !== "undefined") {
        const templates = JSON.parse(localStorage.getItem('dot1xer-templates')) || [];
        const template = templates.find(t => t.name === templateName && t.category === templateCategory);
        
        if (template) {
            // Show the template details
            document.getElementById('template-name').textContent = template.name;
            document.getElementById('template-category').textContent = template.category;
            document.getElementById('template-created').textContent = new Date(template.created).toLocaleString();
            document.getElementById('template-config').textContent = template.config;
            
            // Show additional info based on the template content
            const config = template.config;
            let description = '';
            
            if (config.includes('dot1x-only')) {
                description += 'This template configures 802.1X-only authentication. ';
            } else if (config.includes('mab-only')) {
                description += 'This template configures MAC Authentication Bypass only. ';
            } else if (config.includes('dot1x-mab')) {
                description += 'This template configures 802.1X with MAC Authentication Bypass fallback. ';
            }
            
            if (config.includes('enable-coa')) {
                description += 'It includes support for RADIUS Change of Authorization (CoA). ';
            }
            
            if (config.includes('enable-monitor')) {
                description += 'Monitor mode is enabled to allow traffic while logging authentication attempts. ';
            }
            
            document.getElementById('template-description').textContent = description || 'No additional information available for this template.';
        }
    }
}

/**
 * Initialize deployment types selection
 */
function initializeDeploymentTypes() {
    const deploymentTypes = document.querySelectorAll('.deployment-type-item');
    const deploymentTitle = document.getElementById('deployment-type-title');
    const deploymentDescription = document.getElementById('deployment-description');
    
    // Define deployment descriptions (simple version for example)
    const deploymentDescriptions = {
        phased: document.getElementById('deployment-description').innerHTML, // Default content
        pilot: '<h4>Overview</h4><p>A pilot deployment allows you to test 802.1X on a small subset of your network before full deployment, minimizing risk and providing a learning opportunity.</p><h4>Recommended Approach</h4><ol><li><strong>Environment Selection (1 week)</strong><ul><li>Identify a small, contained network segment</li><li>Include a representative mix of device types</li><li>Ensure minimal business impact if issues occur</li></ul></li><li><strong>Preparation (1-2 weeks)</strong><ul><li>Configure RADIUS infrastructure</li><li>Create test user accounts</li><li>Document baseline performance</li></ul></li><li><strong>Implementation (2-3 weeks)</strong><ul><li>Deploy in monitor mode first</li><li>Move to enforcement mode after validation</li><li>Document issues and solutions</li></ul></li><li><strong>Evaluation (1 week)</strong><ul><li>Assess performance impact</li><li>Gather user feedback</li><li>Document lessons learned</li></ul></li><li><strong>Planning for Full Deployment</strong><ul><li>Create enterprise-wide deployment plan</li><li>Refine configurations based on pilot</li><li>Develop training and support materials</li></ul></li></ol><h4>Prerequisites</h4><ul><li>RADIUS server infrastructure</li><li>Test client devices</li><li>Network segment isolated from critical systems</li><li>Rollback plan</li></ul>',
        monitor: '<h4>Overview</h4><p>Monitor mode deployment enables 802.1X across your network but only logs authentication attempts without enforcing access control, allowing you to identify potential issues before enabling enforcement.</p><h4>Implementation Steps</h4><ol><li><strong>Preparation (1-2 weeks)</strong><ul><li>Configure RADIUS infrastructure</li><li>Set up logging and monitoring tools</li><li>Create baseline documentation</li></ul></li><li><strong>Configuration Deployment (1-2 weeks)</strong><ul><li>Configure switches with 802.1X in monitor mode</li><li>Enable detailed authentication logging</li><li>Implement monitoring dashboards</li></ul></li><li><strong>Analysis Phase (2-4 weeks)</strong><ul><li>Identify authentication failures and patterns</li><li>Document device compatibility issues</li><li>Create inventory of non-compliant devices</li></ul></li><li><strong>Remediation (2-3 weeks)</strong><ul><li>Resolve identified issues</li><li>Create exception policies for incompatible devices</li><li>Update configurations based on findings</li></ul></li><li><strong>Transition to Enforcement</strong><ul><li>Develop cutover plan for switching to enforcement mode</li><li>Create phased schedule for enforcement</li><li>Prepare user communication</li></ul></li></ol><h4>Benefits</h4><ul><li>Zero impact to network access during implementation</li><li>Reveals authentication issues before they affect users</li><li>Provides data for creating appropriate exception policies</li><li>Allows for comprehensive device inventory</li></ul>',
        full: '<h4>Overview</h4><p>A full deployment implements 802.1X across your entire network at once. This approach is best suited for smaller networks or organizations with thorough preparation and testing.</p><h4>Implementation Stages</h4><ol><li><strong>Comprehensive Planning (3-4 weeks)</strong><ul><li>Complete network device inventory</li><li>Verify 802.1X support on all devices</li><li>Configure RADIUS infrastructure with redundancy</li><li>Develop detailed implementation plan</li><li>Create extensive test cases</li></ul></li><li><strong>Pre-Deployment Testing (2 weeks)</strong><ul><li>Lab testing of all device types</li><li>Simulate failure scenarios</li><li>Create detailed configuration templates</li><li>Conduct stress tests on authentication infrastructure</li></ul></li><li><strong>Deployment Window (1-2 days)</strong><ul><li>Schedule maintenance window</li><li>Deploy configurations to all network devices</li><li>Enable 802.1X in enforcement mode</li><li>Activate monitoring and alerting</li></ul></li><li><strong>Rapid Response Period (3-5 days)</strong><ul><li>Dedicated support team on standby</li><li>Rapid resolution of authentication issues</li><li>Communication channels for users</li></ul></li></ol><h4>Critical Success Factors</h4><ul><li>Executive support and clear maintenance window</li><li>Redundant authentication infrastructure</li><li>Verified device compatibility across entire network</li><li>Well-communicated deployment plan</li><li>Trained support staff</li><li>Comprehensive rollback plan</li></ul><h4>Risks</h4><ul><li>Potential for widespread disruption</li><li>Limited time to address issues</li><li>High visibility of any problems</li></ul>',
        custom: '<h4>Custom Deployment Strategy</h4><p>Create a tailored deployment strategy based on your organization\'s specific requirements and constraints.</p><h4>Customization Options</h4><ul><li><strong>Deployment Criteria</strong><ul><li>Geographic/location-based deployment</li><li>Department-based deployment</li><li>Network segment-based deployment</li><li>Time-of-day based enforcement</li><li>User role-based implementation</li></ul></li><li><strong>Authentication Options</strong><ul><li>Mixed authentication methods</li><li>Certificate-based for corporate assets</li><li>Username/password for BYOD</li><li>MAC Authentication Bypass for IoT</li></ul></li><li><strong>Integration Options</strong><ul><li>Network Access Control (NAC) integration</li><li>Mobile Device Management (MDM) integration</li><li>Security Information and Event Management (SIEM) integration</li><li>Automated remediation workflows</li></ul></li></ul><h4>Build Your Custom Strategy</h4><p>Use the Custom Deployment Builder to create your tailored implementation plan:</p><ol><li>Select your deployment criteria</li><li>Choose authentication methods per device type</li><li>Define exception policies</li><li>Set implementation timelines</li><li>Configure monitoring and reporting</li></ol><p><em>The Custom Deployment Builder will be available in a future update.</em></p>'
    };
    
    deploymentTypes.forEach(type => {
        type.addEventListener('click', function() {
            // Remove active class from all deployment types
            deploymentTypes.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked deployment type
            this.classList.add('active');
            
            // Update deployment title and description
            const deploymentType = this.getAttribute('data-type');
            deploymentTitle.textContent = this.querySelector('h4').textContent;
            
            if (deploymentDescriptions[deploymentType]) {
                deploymentDescription.innerHTML = deploymentDescriptions[deploymentType];
            }
        });
    });
}

/**
 * Initialize AI provider selection
 */
function initializeAIProviders() {
    const providerOptions = document.querySelectorAll('.provider-option');
    const apiKeySection = document.getElementById('api-key-section');
    
    providerOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all provider options
            providerOptions.forEach(o => o.classList.remove('active'));
            
            // Add active class to clicked provider option
            this.classList.add('active');
            
            // Show/hide API key section for external providers
            const provider = this.getAttribute('data-provider');
            if (provider === 'builtin') {
                apiKeySection.classList.add('hidden');
            } else {
                apiKeySection.classList.remove('hidden');
            }
        });
    });
}

/**
 * Initialize AI tasks
 */
function initializeAITasks() {
    const taskOptions = document.querySelectorAll('.task-option');
    const executeButton = document.getElementById('execute-ai-task');
    
    taskOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all task options
            taskOptions.forEach(o => o.classList.remove('active'));
            
            // Add active class to clicked task option
            this.classList.add('active');
            
            // Update button text based on selected task
            const task = this.getAttribute('data-task');
            executeButton.textContent = task.charAt(0).toUpperCase() + task.slice(1);
        });
    });
}

/**
 * Execute AI task
 */
function executeAITask() {
    const aiPrompt = document.getElementById('ai-prompt').value.trim();
    const detailLevel = document.getElementById('detail-level').value;
    const securityFocus = document.getElementById('security-focus').value;
    const includeComments = document.getElementById('include-comments').checked;
    
    if (!aiPrompt) {
        alert('Please enter a prompt or instructions for the AI.');
        return;
    }
    
    // Get the selected provider and task
    const selectedProvider = document.querySelector('.provider-option.active').getAttribute('data-provider');
    const selectedTask = document.querySelector('.task-option.active').getAttribute('data-task');
    
    // Show thinking indicator
    document.getElementById('ai-thinking').classList.remove('hidden');
    document.getElementById('ai-result').innerHTML = '';
    
    // Simulate AI processing
    setTimeout(() => {
        // Hide thinking indicator
        document.getElementById('ai-thinking').classList.add('hidden');
        
        // Generate a response based on the selected task
        let response = '';
        
        switch (selectedTask) {
            case 'generate':
                response = simulateConfigGeneration(aiPrompt, detailLevel, securityFocus, includeComments);
                break;
            case 'review':
                response = simulateConfigReview(aiPrompt, detailLevel);
                break;
            case 'optimize':
                response = simulateConfigOptimization(aiPrompt, securityFocus);
                break;
            case 'explain':
                response = simulateConfigExplanation(aiPrompt, detailLevel);
                break;
            case 'troubleshoot':
                response = simulateTroubleshooting(aiPrompt);
                break;
            case 'convert':
                response = simulateConfigConversion(aiPrompt);
                break;
            default:
                response = "I'm not sure what you want me to do. Please select a task and provide instructions.";
        }
        
        // Display the response
        const resultContainer = document.getElementById('ai-result');
        resultContainer.innerHTML = `
            <div class="ai-response">
                <div class="ai-model-tag">${selectedProvider === 'builtin' ? 'Dot1Xer AI' : selectedProvider}</div>
                <span class="ai-timestamp">${new Date().toLocaleTimeString()}</span>
                ${response}
            </div>
        `;
    }, 1500);
}

/**
 * Simulate AI config generation
 */
function simulateConfigGeneration(prompt, detailLevel, securityFocus, includeComments) {
    // This is a simulation - in a real implementation, this would call an AI API
    const config = `
        <h3>Generated Configuration</h3>
        <p>Based on your requirements, here's a configuration for a Cisco switch:</p>
        <pre>! 802.1X Configuration for Cisco IOS
! Generated by Dot1Xer Supreme AI
! Security Level: ${securityFocus}

aaa new-model
aaa authentication dot1x default group RADIUS-SERVERS
aaa authorization network default group RADIUS-SERVERS
aaa accounting dot1x default start-stop group RADIUS-SERVERS

radius server PRIMARY
 address ipv4 10.1.1.100 auth-port 1812 acct-port 1813
 key SecureRadiusKey123
 timeout 5
 retransmit 3

radius server BACKUP
 address ipv4 10.1.1.101 auth-port 1812 acct-port 1813
 key SecureRadiusKey456
 timeout 5
 retransmit 3

aaa group server radius RADIUS-SERVERS
 server name PRIMARY
 server name BACKUP
 deadtime 15

dot1x system-auth-control

interface GigabitEthernet1/0/1
 switchport mode access
 switchport access vlan 10
 switchport voice vlan 20
 authentication port-control auto
 authentication order dot1x mab
 authentication priority dot1x mab
 authentication event fail action authorize vlan 30
 authentication event server dead action authorize vlan 999
 authentication event server alive action reinitialize
 dot1x pae authenticator
 dot1x timeout tx-period 10
 dot1x max-reauth-req 3
 spanning-tree portfast
 mab
</pre>
        
        ${includeComments ? `<h3>Configuration Notes</h3>
        <ul>
            <li>This configuration implements 802.1X with MAB fallback</li>
            <li>VLAN 10 is assigned to authenticated users</li>
            <li>VLAN 20 is configured as the voice VLAN</li>
            <li>VLAN 30 is the guest VLAN for failed authentications</li>
            <li>VLAN 999 is the critical VLAN for when RADIUS servers are unreachable</li>
            <li>Primary and backup RADIUS servers are configured with appropriate timeout and retry settings</li>
        </ul>` : ''}
        
        <p>You can customize this configuration further to meet your specific requirements.</p>
    `;
    
    return config;
}

/**
 * Simulate AI config review
 */
function simulateConfigReview(config, detailLevel) {
    // This is a simulation - in a real implementation, this would call an AI API
    return `
        <h3>Configuration Review</h3>
        
        <h4>Overview</h4>
        <p>I've analyzed the provided configuration and found some potential issues and recommendations:</p>
        
        <h4>Security Issues</h4>
        <ul>
            <li><strong>High Severity:</strong> Weak RADIUS key detected. Consider using a stronger shared secret.</li>
            <li><strong>Medium Severity:</strong> Missing RADIUS server deadtime configuration, which may cause delays during server failure.</li>
            <li><strong>Medium Severity:</strong> No periodic reauthentication configured, which is recommended for better security.</li>
        </ul>
        
        <h4>Optimization Opportunities</h4>
        <ul>
            <li>Consider increasing the RADIUS timeout from 5 to 10 seconds to account for network latency.</li>
            <li>Add authentication event server alive action to reinitialize when servers come back online.</li>
            <li>Configure dot1x max-reauth-req to reduce reauthentication failures.</li>
        </ul>
        
        <h4>Best Practices</h4>
        <ul>
            <li>Implement RADIUS accounting for better auditing and troubleshooting.</li>
            <li>Consider enabling Change of Authorization (CoA) support.</li>
            <li>Add spanning-tree portfast to interfaces to improve client connectivity experience.</li>
        </ul>
        
        <p>Overall, this configuration provides basic 802.1X functionality, but has several security improvements to consider implementing.</p>
    `;
}

/**
 * Simulate AI config optimization
 */
function simulateConfigOptimization(config, securityFocus) {
    // This is a simulation - in a real implementation, this would call an AI API
    return `
        <h3>Optimized Configuration</h3>
        
        <p>I've optimized your configuration with a focus on <strong>${securityFocus}</strong>. Here's the improved version:</p>
        
        <pre>! Optimized 802.1X Configuration
! Generated by Dot1Xer Supreme AI
! Security Focus: ${securityFocus}

aaa new-model
aaa authentication dot1x default group RADIUS-SERVERS
aaa authorization network default group RADIUS-SERVERS
aaa accounting dot1x default start-stop group RADIUS-SERVERS

radius server PRIMARY
 address ipv4 10.1.1.100 auth-port 1812 acct-port 1813
 key Str0ngR@diusK3y!987
 timeout 10
 retransmit 2

radius server BACKUP
 address ipv4 10.1.1.101 auth-port 1812 acct-port 1813
 key Str0ngB@ckupK3y!456
 timeout 10
 retransmit 2

aaa group server radius RADIUS-SERVERS
 server name PRIMARY
 server name BACKUP
 deadtime 15

! Enable CoA support
aaa server radius dynamic-author
 client 10.1.1.100 server-key Str0ngR@diusK3y!987
 client 10.1.1.101 server-key Str0ngB@ckupK3y!456
 auth-type any
 port 3799

dot1x system-auth-control

! Global 802.1X settings
dot1x critical eapol
dot1x logging verbose

interface GigabitEthernet1/0/1
 switchport mode access
 switchport access vlan 10
 switchport voice vlan 20
 switchport nonegotiate
 authentication control-direction in
 authentication event fail action authorize vlan 30
 authentication event server dead action authorize vlan 999
 authentication event server alive action reinitialize
 authentication host-mode multi-auth
 authentication open
 authentication order dot1x mab
 authentication priority dot1x mab
 authentication port-control auto
 authentication periodic
 authentication timer reauthenticate 7200
 authentication timer restart 10
 authentication violation restrict
 mab
 dot1x pae authenticator
 dot1x timeout tx-period 10
 dot1x max-reauth-req 3
 spanning-tree portfast
 spanning-tree bpduguard enable
</pre>
        
        <h4>Key Optimizations</h4>
        <ul>
            <li>Strengthened RADIUS keys with complex passwords</li>
            <li>Added RADIUS CoA support for dynamic policy changes</li>
            <li>Optimized timeouts and retransmit values for better reliability</li>
            <li>Added authentication timer reauthenticate to periodically verify users</li>
            <li>Enabled BPDUGuard for better security on access ports</li>
            <li>Configured authentication violation mode to restrict (rather than shutting down ports)</li>
            <li>Enabled more verbose 802.1X logging for better troubleshooting</li>
        </ul>
        
        <p>These changes significantly improve the security and reliability of your 802.1X deployment.</p>
    `;
}

/**
 * Simulate AI config explanation
 */
function simulateConfigExplanation(config, detailLevel) {
    // This is a simulation - in a real implementation, this would call an AI API
    return `
        <h3>Configuration Explanation</h3>
        
        ${detailLevel === 'basic' ? `
        <p>This is a basic 802.1X configuration for a Cisco switch. It sets up authentication against RADIUS servers and configures ports to require authentication before allowing network access. The configuration includes support for voice VLANs and fallback methods if authentication fails.</p>
        ` : detailLevel === 'expert' ? `
        <h4>AAA Configuration (Authentication, Authorization, Accounting)</h4>
        <p>The <code>aaa new-model</code> command enables the AAA access control system. This is required for 802.1X authentication. The following lines configure the authentication method lists:</p>
        <ul>
            <li><code>aaa authentication dot1x default group RADIUS-SERVERS</code> - Specifies that 802.1X authentication should use the RADIUS-SERVERS group as the default method.</li>
            <li><code>aaa authorization network default group RADIUS-SERVERS</code> - Configures the switch to use RADIUS for network authorization, which includes VLAN assignments and ACLs.</li>
            <li><code>aaa accounting dot1x default start-stop group RADIUS-SERVERS</code> - Enables accounting records to be sent to the RADIUS servers when sessions start and stop.</li>
        </ul>
        
        <h4>RADIUS Server Configuration</h4>
        <p>The configuration defines two RADIUS servers:</p>
        <ul>
            <li>PRIMARY server at 10.1.1.100 with a specified key for secure communication</li>
            <li>BACKUP server at 10.1.1.101 with its own key</li>
        </ul>
        <p>Both servers are configured with:</p>
        <ul>
            <li><code>timeout 5</code> - The switch will wait 5 seconds for a response before trying again</li>
            <li><code>retransmit 3</code> - The switch will attempt to communicate with the RADIUS server up to 3 times before marking it as unavailable</li>
        </ul>
        
        <h4>RADIUS Server Group</h4>
        <p>The <code>aaa group server radius RADIUS-SERVERS</code> section creates a server group that includes both the PRIMARY and BACKUP servers. The <code>deadtime 15</code> setting means that if a server is unresponsive, it will be marked as "dead" for 15 minutes before the switch tries it again.</p>
        
        <h4>Interface Configuration</h4>
        <p>The interface configuration shows a sophisticated 802.1X implementation:</p>
        <ul>
            <li><code>authentication order dot1x mab</code> - The switch will try 802.1X first, then fall back to MAC Authentication Bypass</li>
            <li><code>authentication priority dot1x mab</code> - Defines which authentication method takes precedence if multiple succeed</li>
            <li><code>authentication event fail action authorize vlan 30</code> - If authentication fails, place the device in VLAN 30 (guest VLAN)</li>
            <li><code>authentication event server dead action authorize vlan 999</code> - If RADIUS servers are unreachable, place the device in VLAN 999 (critical VLAN)</li>
        </ul>
        
        <h4>Additional 802.1X Parameters</h4>
        <p>The configuration includes other important 802.1X parameters:</p>
        <ul>
            <li><code>dot1x timeout tx-period 10</code> - The interval in seconds between retransmissions of EAP requests to the client</li>
            <li><code>dot1x max-reauth-req 3</code> - The maximum number of times the switch will retransmit an EAP-Request/Identity frame before restarting the authentication process</li>
        </ul>
        
        <h4>Port Security Features</h4>
        <p>The <code>spanning-tree portfast</code> command enables the port to transition directly to the forwarding state, which is appropriate for single-host access ports and improves the speed of client connectivity.</p>
        ` : `
        <h4>Authentication Configuration</h4>
        <p>This configuration implements 802.1X port-based authentication with MAC Authentication Bypass (MAB) as a fallback method. The key components are:</p>
        
        <h5>RADIUS Server Setup</h5>
        <p>Two RADIUS servers are configured:</p>
        <ul>
            <li>Primary server at 10.1.1.100</li>
            <li>Backup server at 10.1.1.101</li>
        </ul>
        <p>These servers handle authentication requests from network devices.</p>
        
        <h5>VLAN Configuration</h5>
        <p>The configuration uses several VLANs for different purposes:</p>
        <ul>
            <li>VLAN 10: For successfully authenticated devices</li>
            <li>VLAN 20: Voice VLAN for IP phones</li>
            <li>VLAN 30: Guest VLAN for failed authentications</li>
            <li>VLAN 999: Critical VLAN when RADIUS servers are unreachable</li>
        </ul>
        
        <h5>Authentication Process</h5>
        <p>When a device connects to GigabitEthernet1/0/1:</p>
        <ol>
            <li>The switch attempts 802.1X authentication first</li>
            <li>If 802.1X fails, it falls back to MAC Authentication Bypass</li>
            <li>If authentication succeeds, the device is placed in VLAN 10</li>
            <li>If authentication fails, the device is placed in VLAN 30</li>
            <li>If RADIUS servers are unreachable, the device is placed in VLAN 999</li>
        </ol>
        `}
    `;
}

/**
 * Simulate AI troubleshooting
 */
function simulateTroubleshooting(problem) {
    // This is a simulation - in a real implementation, this would call an AI API
    return `
        <h3>Troubleshooting Assistance</h3>
        
        <h4>Problem Analysis</h4>
        <p>Based on your description, you're experiencing issues with 802.1X authentication failing for certain clients. Here are some potential causes and solutions:</p>
        
        <h4>Possible Causes</h4>
        <ol>
            <li><strong>Supplicant Configuration Issues</strong>
                <ul>
                    <li>Incorrect EAP method configuration on client</li>
                    <li>Certificate validation issues on client</li>
                    <li>Outdated supplicant software</li>
                </ul>
            </li>
            <li><strong>Network Infrastructure Problems</strong>
                <ul>
                    <li>Switch port configuration mismatch</li>
                    <li>RADIUS server reachability issues</li>
                    <li>VLAN assignment problems</li>
                </ul>
            </li>
            <li><strong>Authentication Server Issues</strong>
                <ul>
                    <li>RADIUS server misconfiguration</li>
                    <li>User account or password problems</li>
                    <li>Certificate issues on RADIUS server</li>
                </ul>
            </li>
        </ol>
        
        <h4>Diagnostic Steps</h4>
        <ol>
            <li><strong>Verify Switch Configuration</strong>
                <pre>show authentication sessions interface GigabitEthernet1/0/1
show dot1x all
show aaa servers</pre>
                <p>Check that the port is configured correctly for 802.1X and that RADIUS servers are reachable.</p>
            </li>
            <li><strong>Check RADIUS Server Logs</strong>
                <p>Look for authentication failures in the RADIUS server logs. Common error codes include:</p>
                <ul>
                    <li>Access-Reject (Authentication failure)</li>
                    <li>Timeout (Server not responding)</li>
                    <li>MPPE-Send/Recv-Key missing (Encryption key negotiation failed)</li>
                </ul>
            </li>
            <li><strong>Examine Client Logs</strong>
                <p>On Windows, check the Event Viewer > Windows Logs > System for 802.1X related events.</p>
                <p>On macOS, use the Console app to view system logs for EAP/802.1X events.</p>
            </li>
            <li><strong>Packet Capture</strong>
                <p>Capture EAP packets between the client and switch to identify where the authentication process is failing.</p>
            </li>
        </ol>
        
        <h4>Recommended Solutions</h4>
        <ol>
            <li><strong>Enable Monitor Mode</strong>
                <pre>interface GigabitEthernet1/0/1
 authentication open</pre>
                <p>This allows traffic while logging authentication attempts, helping identify issues without blocking users.</p>
            </li>
            <li><strong>Configure Debug Logging</strong>
                <pre>debug dot1x all
debug radius authentication
debug aaa authentication</pre>
                <p>These commands provide detailed debugging information for 802.1X authentication.</p>
            </li>
            <li><strong>Test Authentication with a Known Good Device</strong>
                <p>Configure a test port and authenticate with a device known to have correct supplicant settings.</p>
            </li>
            <li><strong>Implement MAC Authentication Bypass (MAB)</strong>
                <pre>interface GigabitEthernet1/0/1
 authentication order dot1x mab
 authentication priority dot1x mab
 mab</pre>
                <p>This allows devices without 802.1X supplicants to authenticate based on MAC address.</p>
            </li>
        </ol>
        
        <h4>Long-Term Recommendations</h4>
        <ul>
            <li>Implement a phased 802.1X deployment strategy starting with monitor mode</li>
            <li>Create detailed documentation for both user and IT staff</li>
            <li>Consider using a NAC solution for easier management and troubleshooting</li>
            <li>Set up regular auditing of authentication logs to identify recurring issues</li>
        </ul>
    `;
}

/**
 * Simulate AI config conversion
 */
function simulateConfigConversion(config) {
    // This is a simulation - in a real implementation, this would call an AI API
    return `
        <h3>Configuration Conversion</h3>
        
        <p>I've converted the provided Cisco IOS configuration to equivalent configurations for other vendors:</p>
        
        <h4>Aruba AOS-CX Equivalent</h4>
        <pre>radius-server host 10.1.1.100 key Str0ngR@diusK3y!987
radius-server host 10.1.1.101 key Str0ngB@ckupK3y!456
radius-server timeout 10
radius-server retransmit 2
radius-server deadtime 15

aaa authentication port-access dot1x authenticator
aaa authentication port-access dot1x authenticator eap-radius
aaa authentication port-access mac-auth
aaa accounting dot1x start-stop radius

vlan 10 name "DATA_VLAN"
vlan 20 name "VOICE_VLAN"
vlan 30 name "GUEST_VLAN"
vlan 999 name "CRITICAL_VLAN"

interface 1/1/1
    no shutdown
    vlan access 10
    vlan voice 20
    aaa authentication port-access dot1x authenticator
    aaa authentication port-access mac-auth
    aaa port-access dot1x authenticator
    aaa port-access mac-auth
    aaa port-access auth-fail-vlan 30
    aaa port-access server-fail-vlan 999
    aaa port-access controlled-port authorized-when-unauthenticated
    spanning-tree port-type admin-edge</pre>
        
        <h4>Juniper EX-Series Equivalent</h4>
        <pre>set access radius-server 10.1.1.100 secret Str0ngR@diusK3y!987
set access radius-server 10.1.1.100 timeout 10
set access radius-server 10.1.1.100 retry 2
set access radius-server 10.1.1.100 source-address <SWITCH_IP>
set access radius-server 10.1.1.101 secret Str0ngB@ckupK3y!456
set access radius-server 10.1.1.101 timeout 10
set access radius-server 10.1.1.101 retry 2
set access radius-server 10.1.1.101 source-address <SWITCH_IP>

set access profile DOT1X-PROFILE authentication-order radius
set access profile DOT1X-PROFILE radius authentication-server 10.1.1.100
set access profile DOT1X-PROFILE radius authentication-server 10.1.1.101
set access profile DOT1X-PROFILE radius accounting-server 10.1.1.100
set access profile DOT1X-PROFILE radius accounting-server 10.1.1.101
set access profile DOT1X-PROFILE radius options change-of-authorization

set vlans DATA_VLAN vlan-id 10
set vlans VOICE_VLAN vlan-id 20
set vlans GUEST_VLAN vlan-id 30
set vlans CRITICAL_VLAN vlan-id 999

set protocols dot1x authenticator authentication-profile-name DOT1X-PROFILE
set protocols dot1x authenticator interface ge-0/0/1.0
set protocols dot1x authenticator interface ge-0/0/1.0 mac-radius
set protocols dot1x authenticator interface ge-0/0/1.0 supplicant multiple
set protocols dot1x authenticator interface ge-0/0/1.0 guest-vlan GUEST_VLAN
set protocols dot1x authenticator interface ge-0/0/1.0 server-fail vlan-name CRITICAL_VLAN</pre>
        
        <h4>FortiSwitch Equivalent</h4>
        <pre>config system interface
    edit "port1"
        set allowaccess ping
        set dhcp-snooping enable
        set dot1x enable
        set security-mode 802.1X
        set vlan-count 3
    next
end

config user radius
    edit "PRIMARY"
        set server "10.1.1.100"
        set secret Str0ngR@diusK3y!987
        set timeout 10
        set nas-ip <SWITCH_IP>
    next
    edit "BACKUP"
        set server "10.1.1.101"
        set secret Str0ngB@ckupK3y!456
        set timeout 10
        set nas-ip <SWITCH_IP>
    next
end

config user group
    edit "RADIUS-SERVERS"
        set member "PRIMARY" "BACKUP"
    next
end

config system interface
    edit "port1"
        set dot1x-auth enable
        set dot1x-mab enable
        set access-vlan 10
        set voice-vlan 20
        set guest-vlan 30
        set critical-vlan 999
        set dot1x-auth-timeout-period 7200
        set security-mode 802.1X-mac-based
    next
end</pre>
    `;
}

/**
 * Initialize Help tabs
 */
function initializeHelpTabs() {
    const helpTopics = document.querySelectorAll('.help-topics li');
    const helpContent = document.getElementById('help-content');
    
    // Define help content
    const helpContents = {
        'getting-started': `
            <h2>Getting Started with Dot1Xer Supreme</h2>
            <p>Dot1Xer Supreme is a comprehensive tool for generating, deploying, and managing 802.1X configurations across various network devices. This guide will help you get started with the basic features.</p>
            
            <h3>Basic Configuration Generation</h3>
            <ol>
                <li>Navigate to the <strong>Configuration</strong> tab</li>
                <li>Select your device vendor and platform</li>
                <li>Choose an authentication method (802.1X, MAB, or both)</li>
                <li>Enter your RADIUS server details</li>
                <li>Configure VLANs for authenticated, voice, guest, and critical access</li>
                <li>Click <strong>Generate Configuration</strong></li>
            </ol>
            
            <h3>Using Templates</h3>
            <p>Templates provide pre-configured setups for common scenarios:</p>
            <ol>
                <li>Navigate to the <strong>Templates</strong> tab</li>
                <li>Browse the available templates by vendor</li>
                <li>Select a template to view its details</li>
                <li>Click <strong>Use Template</strong> to apply it to your configuration</li>
            </ol>
            
            <h3>Saving Your Work</h3>
            <p>You can save your configurations for future use:</p>
            <ul>
                <li>Download the configuration as a text file</li>
                <li>Save the configuration as a template for reuse</li>
                <li>Copy the configuration to clipboard</li>
            </ul>
            
            <h3>Advanced Features</h3>
            <p>Dot1Xer Supreme offers several advanced features:</p>
            <ul>
                <li><strong>Network Discovery</strong> - Scan your network to identify devices and their 802.1X capabilities</li>
                <li><strong>Deployment Tools</strong> - Deploy configurations to multiple devices at once</li>
                <li><strong>AI Assistance</strong> - Use AI to optimize, explain, or troubleshoot configurations</li>
            </ul>
        `,
        'dot1x-overview': `
            <h2>802.1X Overview</h2>
            <p>IEEE 802.1X is a standard for port-based network access control (PNAC) that provides an authentication mechanism for devices wishing to connect to a LAN or WLAN.</p>
            
            <h3>Key Components</h3>
            <ul>
                <li><strong>Supplicant</strong> - The client device requesting access to the network</li>
                <li><strong>Authenticator</strong> - The network device (switch, access point) controlling access to the network</li>
                <li><strong>Authentication Server</strong> - Usually a RADIUS server that verifies client credentials</li>
            </ul>
            
            <h3>Authentication Methods</h3>
            <p>802.1X supports various Extensible Authentication Protocol (EAP) methods:</p>
            <ul>
                <li><strong>EAP-TLS</strong> - Uses client and server certificates for strong authentication</li>
                <li><strong>PEAP (Protected EAP)</strong> - Creates an encrypted TLS tunnel for other EAP methods</li>
                <li><strong>EAP-TTLS</strong> - Similar to PEAP, but more flexible with inner authentication methods</li>
                <li><strong>EAP-FAST</strong> - Flexible Authentication via Secure Tunneling, developed by Cisco</li>
                <li><strong>EAP-MD5</strong> - Basic method using MD5 hashing (not recommended for production)</li>
            </ul>
            
            <h3>MAC Authentication Bypass (MAB)</h3>
            <p>MAB is a fallback authentication method for devices that don't support 802.1X:</p>
            <ul>
                <li>The authenticator captures the MAC address of the device</li>
                <li>The MAC address is sent to the authentication server as the username and password</li>
                <li>The server authorizes or denies access based on the MAC address</li>
            </ul>
            
            <h3>Dynamic VLAN Assignment</h3>
            <p>After successful authentication, devices can be assigned to specific VLANs based on:</p>
            <ul>
                <li>User identity or role</li>
                <li>Device type or compliance status</li>
                <li>Authentication method used</li>
            </ul>
            
            <h3>Special VLANs</h3>
            <ul>
                <li><strong>Guest VLAN</strong> - For devices that fail authentication</li>
                <li><strong>Critical VLAN</strong> - Used when authentication servers are unreachable</li>
                <li><strong>Auth VLAN</strong> - For successfully authenticated devices</li>
                <li><strong>Voice VLAN</strong> - Specifically for voice traffic from IP phones</li>
            </ul>
        `,
        'radius-config': `
            <h2>RADIUS Server Configuration Guide</h2>
            <p>This guide provides information on configuring RADIUS servers for 802.1X authentication.</p>
            
            <h3>General RADIUS Configuration</h3>
            <p>When configuring a RADIUS server for 802.1X, consider the following settings:</p>
            <ul>
                <li><strong>Shared Secret</strong> - A strong password shared between the RADIUS server and network devices</li>
                <li><strong>Authentication Ports</strong> - Typically UDP port 1812 (or 1645 for older systems)</li>
                <li><strong>Accounting Ports</strong> - Typically UDP port 1813 (or 1646 for older systems)</li>
                <li><strong>Client Configuration</strong> - Add network devices as RADIUS clients</li>
                <li><strong>Authentication Methods</strong> - Configure supported EAP methods</li>
                <li><strong>Certificate Setup</strong> - For EAP-TLS, PEAP, and EAP-TTLS</li>
            </ul>
            
            <h3>RADIUS Attributes for 802.1X</h3>
            <p>Common RADIUS attributes used in 802.1X deployments:</p>
            <table border="1" cellpadding="5">
                <tr>
                    <th>Attribute</th>
                    <th>Purpose</th>
                </tr>
                <tr>
                    <td>Tunnel-Type (64)</td>
                    <td>Set to VLAN (13) for VLAN assignment</td>
                </tr>
                <tr>
                    <td>Tunnel-Medium-Type (65)</td>
                    <td>Set to 802 (6) for Ethernet</td>
                </tr>
                <tr>
                    <td>Tunnel-Private-Group-ID (81)</td>
                    <td>VLAN ID to assign to the client</td>
                </tr>
                <tr>
                    <td>Filter-Id (11)</td>
                    <td>Access control list to apply</td>
                </tr>
                <tr>
                    <td>Session-Timeout (27)</td>
                    <td>Reauthentication interval in seconds</td>
                </tr>
            </table>
            
            <h3>Popular RADIUS Server Solutions</h3>
            <ul>
                <li><strong>FreeRADIUS</strong> - Open-source RADIUS server</li>
                <li><strong>Cisco ISE</strong> - Enterprise solution with NAC features</li>
                <li><strong>Microsoft NPS</strong> - Network Policy Server for Windows environments</li>
                <li><strong>Aruba ClearPass</strong> - Network access control and policy management</li>
                <li><strong>Portnox</strong> - Cloud and on-premises NAC solutions</li>
            </ul>
            
            <h3>RADIUS Redundancy</h3>
            <p>For high availability, configure multiple RADIUS servers:</p>
            <ul>
                <li>Configure primary and secondary RADIUS servers on network devices</li>
                <li>Set appropriate timeout and retry values</li>
                <li>Configure deadtime to prevent repeated attempts to unavailable servers</li>
                <li>Consider using RADIUS server load balancing if available</li>
            </ul>
        `,
        'vendor-specific': `
            <h2>Vendor-Specific Configuration Guide</h2>
            <p>This guide provides information on vendor-specific 802.1X implementation details and commands.</p>
            
            <h3>Cisco</h3>
            <p>Cisco IOS and IOS-XE:</p>
            <pre>! Global configuration
aaa new-model
dot1x system-auth-control

! RADIUS server configuration
radius server PRIMARY
 address ipv4 10.1.1.100 auth-port 1812 acct-port 1813
 key SecureRadiusKey123

! Interface configuration
interface GigabitEthernet1/0/1
 switchport mode access
 switchport access vlan 10
 authentication port-control auto
 authentication order dot1x mab
 dot1x pae authenticator
 mab</pre>
            
            <h3>Juniper</h3>
            <p>Juniper EX Series:</p>
            <pre>set access radius-server 10.1.1.100 secret SecureRadiusKey123
set access profile DOT1X-PROFILE authentication-order radius
set protocols dot1x authenticator interface ge-0/0/1.0
set protocols dot1x authenticator authentication-profile-name DOT1X-PROFILE</pre>
            
            <h3>Aruba</h3>
            <p>Aruba AOS-CX:</p>
            <pre>radius-server host 10.1.1.100 key SecureRadiusKey123
aaa authentication port-access dot1x authenticator
aaa authentication port-access mac-auth

interface 1/1/1
 aaa authentication port-access dot1x authenticator
 aaa authentication port-access mac-auth</pre>
            
            <h3>HP/Aruba</h3>
            <p>HP ProCurve/Aruba:</p>
            <pre>radius-server host 10.1.1.100 key SecureRadiusKey123
aaa authentication port-access eap-radius
aaa port-access authenticator 1
aaa port-access authenticator 1 client-limit 32
aaa port-access authenticator active</pre>
            
            <h3>Extreme</h3>
            <p>Extreme EXOS:</p>
            <pre>configure radius netlogin primary server 10.1.1.100 client-ip 10.1.1.1 vr VR-Default
configure radius netlogin primary shared-secret SecureRadiusKey123
enable netlogin dot1x
configure netlogin add mac-list 1/1
enable netlogin mac
enable netlogin port 1/1 dot1x mac</pre>
            
            <h3>Vendor Feature Comparison</h3>
            <table border="1" cellpadding="5">
                <tr>
                    <th>Feature</th>
                    <th>Cisco</th>
                    <th>Juniper</th>
                    <th>Aruba</th>
                    <th>Extreme</th>
                </tr>
                <tr>
                    <td>802.1X</td>
                    <td>Yes</td>
                    <td>Yes</td>
                    <td>Yes</td>
                    <td>Yes</td>
                </tr>
                <tr>
                    <td>MAB</td>
                    <td>Yes</td>
                    <td>Yes (mac-radius)</td>
                    <td>Yes</td>
                    <td>Yes</td>
                </tr>
                <tr>
                    <td>Multi-Auth</td>
                    <td>Yes</td>
                    <td>Yes</td>
                    <td>Yes</td>
                    <td>Yes</td>
                </tr>
                <tr>
                    <td>CoA Support</td>
                    <td>Yes</td>
                    <td>Yes</td>
                    <td>Yes</td>
                    <td>Limited</td>
                </tr>
                <tr>
                    <td>Monitor Mode</td>
                    <td>Yes</td>
                    <td>Yes</td>
                    <td>Yes</td>
                    <td>Yes</td>
                </tr>
            </table>
        `,
        'troubleshooting': `
            <h2>802.1X Troubleshooting Guide</h2>
            <p>This guide provides troubleshooting steps for common 802.1X issues.</p>
            
            <h3>Common Issues and Solutions</h3>
            
            <h4>Authentication Failures</h4>
            <p><strong>Symptoms:</strong> Clients cannot authenticate, receive "Authentication Failed" messages</p>
            <p><strong>Possible Causes and Solutions:</strong></p>
            <ul>
                <li><strong>Incorrect credentials</strong> - Verify username/password or certificate</li>
                <li><strong>EAP method mismatch</strong> - Ensure client and server use the same EAP method</li>
                <li><strong>Certificate issues</strong> - Check certificate validity, trust chain, and dates</li>
                <li><strong>RADIUS server unreachable</strong> - Verify connectivity to RADIUS server</li>
            </ul>
            
            <h4>Clients Placed in Wrong VLAN</h4>
            <p><strong>Symptoms:</strong> Clients authenticate but get incorrect network access</p>
            <p><strong>Possible Causes and Solutions:</strong></p>
            <ul>
                <li><strong>Incorrect RADIUS attributes</strong> - Verify Tunnel-Type, Tunnel-Medium-Type, and Tunnel-Private-Group-ID attributes</li>
                <li><strong>VLAN mismatch</strong> - Ensure VLAN exists on switch and is properly configured</li>
                <li><strong>Authorization policy issues</strong> - Check RADIUS server policies</li>
            </ul>
            
            <h4>Intermittent Connectivity</h4>
            <p><strong>Symptoms:</strong> Clients connect but periodically lose connectivity</p>
            <p><strong>Possible Causes and Solutions:</strong></p>
            <ul>
                <li><strong>Reauthentication failures</strong> - Check Session-Timeout settings</li>
                <li><strong>EAP/TLS session resumption issues</strong> - Adjust timeout values</li>
                <li><strong>Load balancing problems</strong> - If using multiple RADIUS servers, check load balancing</li>
            </ul>
            
            <h3>Diagnostic Commands</h3>
            
            <h4>Cisco</h4>
            <pre>show authentication sessions
show dot1x all
show aaa servers
debug dot1x all
debug radius authentication</pre>
            
            <h4>Juniper</h4>
            <pre>show dot1x interface ge-0/0/1.0
show dot1x authentication-failed-users
show dot1x static-mac-address
show network-access aaa statistics radius</pre>
            
            <h4>Aruba</h4>
            <pre>show port-access authenticator
show port-access mac-based
show radius authentication
debug security port-access authenticator</pre>
            
            <h3>Client-Side Troubleshooting</h3>
            <p>For Windows clients:</p>
            <ul>
                <li>Check Event Viewer > Windows Logs > System for 802.1X events</li>
                <li>Ensure the Wired AutoConfig service is running</li>
                <li>Verify network adapter properties for 802.1X settings</li>
            </ul>
            
            <p>For macOS clients:</p>
            <ul>
                <li>Check Console app for logs</li>
                <li>Verify 802.1X settings in Network Preferences</li>
            </ul>
            
            <p>For Linux clients:</p>
            <ul>
                <li>Check wpa_supplicant logs</li>
                <li>Verify configuration in wpa_supplicant.conf</li>
            </ul>
        `,
        'best-practices': `
            <h2>802.1X Deployment Best Practices</h2>
            <p>This guide provides recommended practices for successful 802.1X deployments.</p>
            
            <h3>Planning and Design</h3>
            <ul>
                <li><strong>Inventory Network Devices</strong> - Identify all devices and their 802.1X capabilities</li>
                <li><strong>Group Similar Devices</strong> - Create policies based on device groups</li>
                <li><strong>Define Authentication Methods</strong> - Select appropriate methods for each device type</li>
                <li><strong>Plan VLAN Structure</strong> - Design VLANs for authenticated, guest, and critical access</li>
                <li><strong>Redundancy Strategy</strong> - Implement multiple RADIUS servers for high availability</li>
            </ul>
            
            <h3>Implementation Strategy</h3>
            <ul>
                <li><strong>Phased Approach</strong> - Deploy 802.1X in phases rather than all at once</li>
                <li><strong>Start with Monitor Mode</strong> - Begin with non-enforcing mode to identify issues</li>
                <li><strong>Pilot Group</strong> - Test with a small group of users before wider deployment</li>
                <li><strong>Gradual Enforcement</strong> - Transition to enforcement mode gradually</li>
                <li><strong>Fallback Methods</strong> - Implement MAB for devices that don't support 802.1X</li>
            </ul>
            
            <h3>Security Considerations</h3>
            <ul>
                <li><strong>Strong RADIUS Shared Secrets</strong> - Use complex, unique shared secrets</li>
                <li><strong>Secure EAP Methods</strong> - Prefer EAP-TLS, PEAP, or EAP-TTLS over weaker methods</li>
                <li><strong>Certificate Management</strong> - Implement proper certificate validation and renewal</li>
                <li><strong>Guest VLAN Isolation</strong> - Ensure guest VLANs have limited access</li>
                <li><strong>Regular Reauthentication</strong> - Configure reasonable reauthentication intervals</li>
            </ul>
            
            <h3>Operational Considerations</h3>
            <ul>
                <li><strong>Monitoring and Logging</strong> - Set up comprehensive logging and monitoring</li>
                <li><strong>Exception Handling</strong> - Create policies for exception devices</li>
                <li><strong>Change Management</strong> - Implement controlled change processes</li>
                <li><strong>User Training</strong> - Educate users about the authentication process</li>
                <li><strong>Documentation</strong> - Maintain thorough documentation of configurations</li>
            </ul>
            
            <h3>Advanced Features</h3>
            <ul>
                <li><strong>Change of Authorization (CoA)</strong> - Enable dynamic policy changes</li>
                <li><strong>Accounting</strong> - Implement RADIUS accounting for auditing</li>
                <li><strong>Integration with NAC</strong> - Consider integrating with Network Access Control</li>
                <li><strong>Profiling</strong> - Use device profiling for automatic classification</li>
                <li><strong>Posture Assessment</strong> - Verify device health before granting access</li>
            </ul>
            
            <h3>Troubleshooting Preparedness</h3>
            <ul>
                <li><strong>Baseline Documentation</strong> - Document normal behavior before deployment</li>
                <li><strong>Common Issues Guide</strong> - Prepare documentation for common issues</li>
                <li><strong>Support Process</strong> - Establish clear escalation paths for authentication issues</li>
                <li><strong>Rollback Plan</strong> - Have a plan to quickly disable 802.1X if needed</li>
            </ul>
        `
    };
    
    // Add click event to help topics
    helpTopics.forEach(topic => {
        topic.addEventListener('click', function() {
            // Remove active class from all topics
            helpTopics.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked topic
            this.classList.add('active');
            
            // Show the corresponding help content
            const topicId = this.getAttribute('data-topic');
            if (helpContents[topicId]) {
                helpContent.innerHTML = helpContents[topicId];
            } else {
                helpContent.innerHTML = `<h2>Help Topic Not Found</h2><p>The requested help topic is not available.</p>`;
            }
        });
    });
    
    // Activate the first help topic by default
    if (helpTopics.length > 0) {
        helpTopics[0].click();
    }
}

/**
 * Initialize Portnox integration
 */
function initializePortnoxIntegration() {
    // Placeholder for Portnox integration
    const connectButton = document.getElementById('portnox-connect');
    const disconnectButton = document.getElementById('portnox-disconnect');
    const syncButton = document.getElementById('sync-portnox');
    
    if (connectButton) {
        connectButton.addEventListener('click', function() {
            // Simulate connection process
            const apiUrl = document.getElementById('portnox-api-url').value;
            const apiKey = document.getElementById('portnox-api-key').value;
            
            if (!apiUrl || !apiKey) {
                alert('Please enter API URL and API Key.');
                return;
            }
            
            // Show connecting state
            this.disabled = true;
            this.textContent = 'Connecting...';
            
            // Simulate connection delay
            setTimeout(() => {
                this.disabled = false;
                this.textContent = 'Connect';
                
                // Update connection status
                const statusElement = document.querySelector('.portnox-status');
                statusElement.textContent = 'Connected';
                statusElement.classList.remove('disconnected');
                statusElement.classList.add('connected');
                
                // Show additional sections
                document.getElementById('portnox-features').style.display = 'grid';
                document.getElementById('portnox-sync-section').style.display = 'block';
                document.getElementById('portnox-dashboard').style.display = 'grid';
                
                // Hide connect form, show disconnect button
                document.getElementById('portnox-connection-form').style.display = 'none';
                disconnectButton.style.display = 'block';
                
                // Save connection details
                localStorage.setItem('portnox-api-url', apiUrl);
                localStorage.setItem('portnox-connected', 'true');
            }, 1500);
        });
    }
    
    if (disconnectButton) {
        disconnectButton.addEventListener('click', function() {
            // Simulate disconnection
            this.disabled = true;
            this.textContent = 'Disconnecting...';
            
            setTimeout(() => {
                this.disabled = false;
                this.textContent = 'Disconnect';
                
                // Update connection status
                const statusElement = document.querySelector('.portnox-status');
                statusElement.textContent = 'Disconnected';
                statusElement.classList.remove('connected');
                statusElement.classList.add('disconnected');
                
                // Hide additional sections
                document.getElementById('portnox-features').style.display = 'none';
                document.getElementById('portnox-sync-section').style.display = 'none';
                document.getElementById('portnox-dashboard').style.display = 'none';
                
                // Show connect form, hide disconnect button
                document.getElementById('portnox-connection-form').style.display = 'grid';
                this.style.display = 'none';
                
                // Clear connection details
                localStorage.removeItem('portnox-connected');
            }, 1000);
        });
    }
    
    if (syncButton) {
        syncButton.addEventListener('click', function() {
            // Simulate synchronization
            this.disabled = true;
            this.textContent = 'Syncing...';
            
            setTimeout(() => {
                this.disabled = false;
                this.textContent = 'Sync Now';
                
                // Show success message
                alert('Synchronization completed successfully!');
                
                // Update last sync time
                document.getElementById('last-sync-time').textContent = new Date().toLocaleString();
            }, 2000);
        });
    }
    
    // Check for saved connection
    if (localStorage.getItem('portnox-connected') === 'true') {
        // Simulate reconnection
        const apiUrl = localStorage.getItem('portnox-api-url') || '';
        
        if (apiUrl && document.getElementById('portnox-api-url')) {
            document.getElementById('portnox-api-url').value = apiUrl;
            
            // Automatically connect
            if (connectButton) {
                connectButton.click();
            }
        }
    }
}

/**
 * Handle dark mode toggle
 */
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Update toggle button
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
    
    // Save preference
    localStorage.setItem('dot1xer-dark-mode', isDarkMode);
}
