/**
 * Dot1Xer Supreme - Main JavaScript
 * Core functionality for the Dot1Xer Supreme application
 * Version: 3.0.0
 */

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeVendorPlatforms();
    initializeAuthMethods();
    initializeUIHandlers();
    initializeHelpTips();
    
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
        });
    });
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
        // This would show/hide additional RADIUS accounting options
        // Placeholder for future implementation
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
}

/**
 * Initialize help tips hover behavior
 */
function initializeHelpTips() {
    // This is now a placeholder - the CSS handles the tooltip display
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
                    EAP_METHOD: eapMethod || 'peap'
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
    // Generate a placeholder Aruba configuration
    let config = `# Aruba ${platform} 802.1X Configuration\n`;
    config += `# Generated by Dot1Xer Supreme on ${new Date().toISOString()}\n\n`;
    
    // Placeholder for Aruba configuration - this would be expanded in a full implementation
    config += `# This is a placeholder for Aruba ${platform} configuration.\n`;
    config += `# The actual configuration would be generated based on your selections.\n`;
    
    return config;
}

/**
 * Generate Juniper configuration
 */
function generateJuniperConfig(platform, authMethod, eapMethod, radiusServer, radiusSecret, backupServer, backupSecret, vlanAuth, vlanVoice, vlanGuest, vlanCritical, interface, enableCoA, enableMonitor, enableAccounting, enableTACACS, enableRadSec) {
    // Generate a placeholder Juniper configuration
    let config = `# Juniper ${platform} 802.1X Configuration\n`;
    config += `# Generated by Dot1Xer Supreme on ${new Date().toISOString()}\n\n`;
    
    // Placeholder for Juniper configuration - this would be expanded in a full implementation
    config += `# This is a placeholder for Juniper ${platform} configuration.\n`;
    config += `# The actual configuration would be generated based on your selections.\n`;
    
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
radius-server dead-time 15

aaa authentication dot1x default radius
aaa authorization network default radius
aaa accounting dot1x default start-stop radius

aaa port-access authenticator 1/1/1
aaa port-access authenticator 1/1/1 auth-server-timeout 60
aaa port-access authenticator 1/1/1 reauth-period 7200
aaa port-access authenticator 1/1/1 unauth-vid 30
aaa port-access authenticator 1/1/1 auth-vid 10
aaa port-access authenticator 1/1/1 voice-vid 20
aaa port-access authenticator 1/1/1 critical-vid 999
aaa port-access authenticator 1/1/1 client-limit 32
aaa port-access authenticator 1/1/1 enable</pre>
        
        <h4>Juniper EX Series Equivalent</h4>
        <pre>set system radius-server 10.1.1.100 secret "$9$abcdefghijklmno"
set system radius-server 10.1.1.100 timeout 10
set system radius-server 10.1.1.100 retry 2
set system radius-server 10.1.1.101 secret "$9$pqrstuvwxyz1234"
set system radius-server 10.1.1.101 timeout 10
set system radius-server 10.1.1.101 retry 2

set access radius-server 10.1.1.100 port 1812
set access radius-server 10.1.1.100 accounting-port 1813
set access radius-server 10.1.1.100 secret "$9$abcdefghijklmno"
set access radius-server 10.1.1.101 port 1812
set access radius-server 10.1.1.101 accounting-port 1813
set access radius-server 10.1.1.101 secret "$9$pqrstuvwxyz1234"

set access profile dot1x-profile authentication-order dot1x mac-radius
set access profile dot1x-profile accounting order radius
set access profile dot1x-profile radius authentication-server 10.1.1.100
set access profile dot1x-profile radius authentication-server 10.1.1.101
set access profile dot1x-profile radius accounting-server 10.1.1.100
set access profile dot1x-profile radius accounting-server 10.1.1.101

set protocols dot1x authenticator authentication-profile-name dot1x-profile
set protocols dot1x authenticator interface ge-0/0/1.0 supplicant multiple
set protocols dot1x authenticator interface ge-0/0/1.0 guest-vlan 30
set protocols dot1x authenticator interface ge-0/0/1.0 server-fail vlan-name 999
set protocols dot1x authenticator interface ge-0/0/1.0 mac-radius
set protocols dot1x authenticator interface ge-0/0/1.0 reauthentication 7200
set protocols dot1x authenticator interface ge-0/0/1.0 quiet-period 10
set protocols dot1x authenticator interface ge-0/0/1.0 transmit-period 10
set protocols dot1x authenticator interface ge-0/0/1.0 maximum-requests 3</pre>
        
        <h4>HPE Aruba AOS-Switch Equivalent</h4>
        <pre>radius-server host 10.1.1.100 key Str0ngR@diusK3y!987
radius-server host 10.1.1.101 key Str0ngB@ckupK3y!456
radius-server timeout 10
radius-server retransmit 2
radius-server dead-time 15

aaa authentication port-access eap-radius
aaa authentication port-access mac-radius
aaa port-access authenticator 1/1
aaa port-access authenticator 1/1 auth-vid 10
aaa port-access authenticator 1/1 unauth-vid 30
aaa port-access authenticator 1/1 voice-vid 20
aaa port-access authenticator 1/1 reauth-period 7200
aaa port-access authenticator 1/1 tx-period 10
aaa port-access authenticator 1/1 server-timeout 60
aaa port-access authenticator 1/1 client-limit 32
aaa port-access authenticator 1/1 unauth-period 10
aaa port-access authenticator active</pre>
        
        <p>Note that while these configurations provide equivalent 802.1X functionality, there may be vendor-specific features or syntax that require adjustment for your specific environment. Always refer to the vendor documentation for the most accurate configuration guidance.</p>
    `;
}

/**
 * Initialize Help tabs
 */
function initializeHelpTabs() {
    const helpTopics = document.querySelectorAll('.help-topics li');
    
    helpTopics.forEach(topic => {
        topic.addEventListener('click', function() {
            // Remove active class from all topics
            helpTopics.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked topic
            this.classList.add('active');
            
            // Hide all help sections
            document.querySelectorAll('.help-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show the corresponding help section
            const topicId = this.getAttribute('data-topic');
            const helpSection = document.getElementById(`help-${topicId}`);
            
            if (helpSection) {
                helpSection.classList.add('active');
            }
        });
    });
}

/**
 * Select a template from the template list
 * @param {HTMLElement} templateItem - The template item to select
 */
function selectTemplate(templateItem) {
    // Remove active class from all template items
    document.querySelectorAll('.template-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to clicked template item
    templateItem.classList.add('active');
    
    // Update template details
    document.getElementById('template-title').textContent = templateItem.textContent;
    
    // Simulate getting template description and code
    const templateCategory = templateItem.getAttribute('data-category');
    let templateDescription = '';
    let templateCode = '';
    
    // Generate a description based on the template name and category
    if (templateCategory === 'cisco') {
        templateDescription = `<p>This template provides a configuration for Cisco devices with comprehensive 802.1X implementation including MAB fallback, guest VLAN, and voice VLAN support.</p>
        <p>Use this template for deploying 802.1X on Cisco switches with support for various authentication scenarios.</p>
        <h4>Features</h4>
        <ul>
            <li>802.1X with MAC Authentication Bypass fallback</li>
            <li>Guest VLAN for failed authentications</li>
            <li>Critical VLAN for RADIUS server failures</li>
            <li>Voice VLAN support for IP phones</li>
            <li>CoA support for dynamic policy changes</li>
        </ul>`;
        
        templateCode = `! Cisco 802.1X Configuration Template
! Generated by Dot1Xer Supreme
! Last Updated: ${new Date().toISOString().split('T')[0]}

aaa new-model
aaa authentication dot1x default group RADIUS-SERVERS
aaa authorization network default group RADIUS-SERVERS
aaa accounting dot1x default start-stop group RADIUS-SERVERS

radius server PRIMARY
 address ipv4 10.1.1.100 auth-port 1812 acct-port 1813
 key SecureRadius123
 timeout 5
 retransmit 3

radius server BACKUP
 address ipv4 10.1.1.101 auth-port 1812 acct-port 1813
 key SecureRadius456
 timeout 5
 retransmit 3

aaa group server radius RADIUS-SERVERS
 server name PRIMARY
 server name BACKUP
 deadtime 10

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
 spanning-tree portfast
 mab
`;
    } else {
        templateDescription = `<p>This is a ${templateCategory} template for deploying 802.1X authentication.</p>
        <p>Use this template as a starting point for your ${templateCategory} deployment.</p>`;
        
        templateCode = `# ${templateCategory.toUpperCase()} 802.1X Configuration Template
# Generated by Dot1Xer Supreme
# Last Updated: ${new Date().toISOString().split('T')[0]}

# This is a placeholder for ${templateCategory} configuration.
# The actual configuration would be based on your specific requirements.
`;
    }
    
    document.getElementById('template-description').innerHTML = templateDescription;
    document.getElementById('template-code').textContent = templateCode;
    document.getElementById('template-config').classList.remove('hidden');
}

/**
 * Initialize Portnox integration
 */
function initializePortnoxIntegration() {
    const testConnectionButton = document.getElementById('test-connection');
    const connectPortnoxButton = document.getElementById('connect-portnox');
    
    // Test connection button click handler
    if (testConnectionButton) {
        testConnectionButton.addEventListener('click', function() {
            const portnoxUrl = document.getElementById('portnox-url').value;
            const portnoxTenant = document.getElementById('portnox-tenant').value;
            const portnoxKey = document.getElementById('portnox-key').value;
            
            if (!portnoxUrl || !portnoxTenant || !portnoxKey) {
                alert('Please fill in all Portnox connection details.');
                return;
            }
            
            // Simulate testing connection
            alert('Testing connection to Portnox Cloud...');
            
            // Simulate successful connection after a short delay
            setTimeout(() => {
                alert('Connection successful! Portnox Cloud API is reachable.');
            }, 1500);
        });
    }
    
    // Connect button click handler
    if (connectPortnoxButton) {
        connectPortnoxButton.addEventListener('click', function() {
            const portnoxUrl = document.getElementById('portnox-url').value;
            const portnoxTenant = document.getElementById('portnox-tenant').value;
            const portnoxKey = document.getElementById('portnox-key').value;
            const portnoxDescription = document.getElementById('portnox-description').value;
            
            if (!portnoxUrl || !portnoxTenant || !portnoxKey) {
                alert('Please fill in all Portnox connection details.');
                return;
            }
            
            // Simulate connecting
            alert('Connecting to Portnox Cloud...');
            
            // Simulate successful connection after a short delay
            setTimeout(() => {
                // Update connection status
                const portnoxStatus = document.querySelector('.portnox-status');
                portnoxStatus.textContent = 'Connected';
                portnoxStatus.classList.remove('disconnected');
                portnoxStatus.classList.add('connected');
                
                alert('Successfully connected to Portnox Cloud!');
            }, 1500);
        });
    }
}
