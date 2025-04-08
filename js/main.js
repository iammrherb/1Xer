/**
 * Dot1Xer Supreme - Main JavaScript
 * Core functionality for the Dot1Xer Supreme application
 */

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeVendorPlatforms();
    initializeUIHandlers();
    initializeHelpTips();
    
    // Generate configuration on button click
    document.getElementById('generate-config').addEventListener('click', generateConfiguration);
    
    // Copy configuration on button click
    document.getElementById('copy-config').addEventListener('click', function() {
        copyToClipboard('config-result');
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
 * Initialize UI event handlers
 */
function initializeUIHandlers() {
    // Toggle RADIUS accounting options
    const enableAccounting = document.getElementById('enable-accounting');
    
    enableAccounting.addEventListener('change', function() {
        // This would show/hide additional RADIUS accounting options
        // Placeholder for future implementation
    });
    
    // Toggle MAB options
    const enableMAB = document.getElementById('enable-mab');
    
    enableMAB.addEventListener('change', function() {
        // This would show/hide additional MAB options
        // Placeholder for future implementation
    });
    
    // Toggle critical VLAN options
    const enableCritical = document.getElementById('enable-critical');
    
    enableCritical.addEventListener('change', function() {
        // This would show/hide critical VLAN options
        // Placeholder for future implementation
    });
}

/**
 * Initialize help tips hover behavior
 */
function initializeHelpTips() {
    // This function is a placeholder
    // Actual implementation could add event listeners or initialize tooltips
}

/**
 * Generate configuration based on form inputs
 */
function generateConfiguration() {
    // Get form values
    const vendor = document.getElementById('vendor').value;
    const platform = document.getElementById('platform').value;
    const authMethod = document.getElementById('auth-method').value;
    const radiusServer = document.getElementById('radius-server').value;
    const radiusSecret = document.getElementById('radius-secret').value;
    const backupServer = document.getElementById('backup-server').value;
    const backupSecret = document.getElementById('backup-secret').value;
    const vlanAuth = document.getElementById('vlan-auth').value;
    const vlanUnauth = document.getElementById('vlan-unauth').value;
    const vlanGuest = document.getElementById('vlan-guest').value;
    
    // Check if required fields are filled
    if (!vendor || !platform || !authMethod || !radiusServer || !radiusSecret || !vlanAuth || !vlanUnauth) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Get checkbox values
    const enableMAB = document.getElementById('enable-mab').checked;
    const enableMonitor = document.getElementById('enable-monitor').checked;
    const enableCritical = document.getElementById('enable-critical').checked;
    const enableVoice = document.getElementById('enable-voice').checked;
    const enableAccounting = document.getElementById('enable-accounting').checked;
    
    // Generate configuration based on selected vendor and options
    let config = '';
    
    switch (vendor) {
        case 'cisco':
            config = generateCiscoConfig(platform, authMethod, radiusServer, radiusSecret, backupServer, backupSecret, vlanAuth, vlanUnauth, vlanGuest, enableMAB, enableMonitor, enableCritical, enableVoice, enableAccounting);
            break;
        case 'aruba':
            config = generateArubaConfig(platform, authMethod, radiusServer, radiusSecret, backupServer, backupSecret, vlanAuth, vlanUnauth, vlanGuest, enableMAB, enableMonitor, enableCritical, enableVoice, enableAccounting);
            break;
        case 'juniper':
            config = generateJuniperConfig(platform, authMethod, radiusServer, radiusSecret, backupServer, backupSecret, vlanAuth, vlanUnauth, vlanGuest, enableMAB, enableMonitor, enableCritical, enableVoice, enableAccounting);
            break;
        default:
            config = 'Configuration generation for the selected vendor is not implemented yet.';
    }
    
    // Display the generated configuration
    document.getElementById('config-result').textContent = config;
}

/**
 * Generate Cisco configuration
 */
function generateCiscoConfig(platform, authMethod, radiusServer, radiusSecret, backupServer, backupSecret, vlanAuth, vlanUnauth, vlanGuest, enableMAB, enableMonitor, enableCritical, enableVoice, enableAccounting) {
    // Basic configuration structure
    let config = `! Cisco ${platform.toUpperCase()} 802.1X Configuration\n`;
    config += `! Generated by Dot1Xer Supreme on ${new Date().toISOString()}\n\n`;
    
    // RADIUS server configuration
    config += `! RADIUS Server Configuration\n`;
    config += `radius server PRIMARY\n`;
    config += ` address ipv4 ${radiusServer} auth-port 1812 acct-port 1813\n`;
    config += ` key ${radiusSecret}\n`;
    
    if (backupServer) {
        config += `radius server BACKUP\n`;
        config += ` address ipv4 ${backupServer} auth-port 1812 acct-port 1813\n`;
        config += ` key ${backupSecret}\n`;
    }
    
    config += `!\n`;
    config += `aaa new-model\n`;
    config += `aaa authentication dot1x default group radius\n`;
    
    if (enableAccounting) {
        config += `aaa accounting dot1x default start-stop group radius\n`;
    }
    
    config += `!\n`;
    config += `dot1x system-auth-control\n`;
    config += `!\n`;
    
    // Interface configuration
    config += `! Interface Configuration Example (apply to appropriate interfaces)\n`;
    config += `interface GigabitEthernet1/0/1\n`;
    config += ` switchport mode access\n`;
    config += ` switchport access vlan ${vlanAuth}\n`;
    
    if (enableVoice) {
        config += ` switchport voice vlan 100\n`; // Example voice VLAN
        config += ` mls qos trust cos\n`;
    }
    
    config += ` authentication event fail action authorize vlan ${vlanUnauth}\n`;
    
    if (enableCritical) {
        config += ` authentication event server dead action authorize vlan ${vlanUnauth}\n`;
        config += ` authentication event server alive action reinitialize\n`;
    }
    
    if (vlanGuest) {
        config += ` authentication event no-response action authorize vlan ${vlanGuest}\n`;
    }
    
    config += ` authentication port-control auto\n`;
    config += ` authentication periodic\n`;
    config += ` authentication timer reauthenticate 3600\n`;
    config += ` dot1x pae authenticator\n`;
    
    if (enableMAB) {
        config += ` mab\n`;
        config += ` authentication order dot1x mab\n`;
        config += ` authentication priority dot1x mab\n`;
    }
    
    if (enableMonitor) {
        config += ` authentication open\n`;
    }
    
    config += ` spanning-tree portfast\n`;
    config += `!\n`;
    
    // Global settings and best practices
    config += `! Global Settings and Best Practices\n`;
    config += `authentication mac-move permit\n`;
    config += `!\n`;
    config += `! RADIUS Change of Authorization (CoA) support\n`;
    config += `aaa server radius dynamic-author\n`;
    config += ` client ${radiusServer} server-key ${radiusSecret}\n`;
    
    if (backupServer) {
        config += ` client ${backupServer} server-key ${backupSecret}\n`;
    }
    
    config += `!\n`;
    
    return config;
}

/**
 * Generate Aruba configuration
 */
function generateArubaConfig(platform, authMethod, radiusServer, radiusSecret, backupServer, backupSecret, vlanAuth, vlanUnauth, vlanGuest, enableMAB, enableMonitor, enableCritical, enableVoice, enableAccounting) {
    // Placeholder for Aruba configuration generation
    let config = `! Aruba ${platform.toUpperCase()} 802.1X Configuration\n`;
    config += `! Generated by Dot1Xer Supreme on ${new Date().toISOString()}\n\n`;
    
    // The actual configuration would be generated here based on Aruba syntax
    config += `! This is a placeholder for Aruba configuration.\n`;
    
    return config;
}

/**
 * Generate Juniper configuration
 */
function generateJuniperConfig(platform, authMethod, radiusServer, radiusSecret, backupServer, backupSecret, vlanAuth, vlanUnauth, vlanGuest, enableMAB, enableMonitor, enableCritical, enableVoice, enableAccounting) {
    // Placeholder for Juniper configuration generation
    let config = `# Juniper ${platform.toUpperCase()} 802.1X Configuration\n`;
    config += `# Generated by Dot1Xer Supreme on ${new Date().toISOString()}\n\n`;
    
    // The actual configuration would be generated here based on Juniper syntax
    config += `# This is a placeholder for Juniper configuration.\n`;
    
    return config;
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
    
    const vendor = document.getElementById('vendor').value;
    const platform = document.getElementById('platform').value;
    
    // Show a dialog to name the template
    const templateName = prompt('Enter a name for this template:', `${vendor}-${platform}-template`);
    
    if (templateName) {
        // Here we would normally save the template to a database or local storage
        // For this example, we'll just simulate saving
        alert(`Template "${templateName}" saved successfully!`);
        
        // Placeholder for actual template saving functionality
        // saveTemplateToStorage(templateName, config);
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
                response = generateAIResponse(aiPrompt, detailLevel, securityFocus, includeComments);
                break;
            case 'review':
                response = reviewAIResponse(aiPrompt, detailLevel, securityFocus);
                break;
            case 'optimize':
                response = optimizeAIResponse(aiPrompt, detailLevel, securityFocus, includeComments);
                break;
            case 'explain':
                response = explainAIResponse(aiPrompt, detailLevel);
                break;
            case 'troubleshoot':
                response = troubleshootAIResponse(aiPrompt, detailLevel);
                break;
            default:
                response = '<p>Unknown AI task selected.</p>';
        }
        
        // Display the response
        document.getElementById('ai-result').innerHTML = response;
        
    }, 2000); // Simulated delay for AI processing
}

/**
 * Generate AI response for configuration generation
 */
function generateAIResponse(prompt, detailLevel, securityFocus, includeComments) {
    // This is a simplified example of AI generated configuration
    // In a real application, this would call an API or use a local model
    
    const currentDate = new Date().toISOString().split('T')[0];
    
    let response = `<div class="ai-response">`;
    response += `<p><span class="ai-model-tag">AI-Generated Configuration</span><span class="ai-timestamp">${currentDate}</span></p>`;
    response += `<h3>Generated 802.1X Configuration</h3>`;
    response += `<p>Based on your requirements, here's a recommended configuration:</p>`;
    
    // Sample Cisco configuration
    response += `<pre>! Cisco IOS 802.1X Configuration
! Generated by Dot1Xer Supreme AI Assistant
! Security Focus: ${securityFocus}
! Detail Level: ${detailLevel}

! RADIUS Server Configuration
radius server PRIMARY
 address ipv4 10.1.1.100 auth-port 1812 acct-port 1813
 key SecureRadiusKey123
 
aaa new-model
aaa authentication dot1x default group radius
aaa authorization network default group radius
aaa accounting dot1x default start-stop group radius

! Global 802.1X Configuration
dot1x system-auth-control
authentication mac-move permit

! Interface Configuration
interface range GigabitEthernet1/0/1 - 48
 switchport mode access
 switchport access vlan 10
 authentication event fail action authorize vlan 999
 authentication event server dead action authorize vlan 999
 authentication event server alive action reinitialize
 authentication port-control auto
 authentication periodic
 authentication timer reauthenticate 3600
 dot1x pae authenticator
 mab
 authentication order dot1x mab
 authentication priority dot1x mab
 spanning-tree portfast
 
! RADIUS CoA Support
aaa server radius dynamic-author
 client 10.1.1.100 server-key SecureRadiusKey123</pre>`;

    if (includeComments && detailLevel !== 'basic') {
        response += `<h3>Configuration Notes</h3>`;
        response += `<ul>`;
        response += `<li><strong>Security Considerations:</strong> This configuration implements ${securityFocus} security practices, including periodic reauthentication and fail-open to a restricted VLAN.</li>`;
        response += `<li><strong>MAB Fallback:</strong> MAC Authentication Bypass is configured as a fallback method for devices that don't support 802.1X natively.</li>`;
        response += `<li><strong>Dead Server Detection:</strong> If the RADIUS server becomes unreachable, ports will be moved to VLAN 999 (restricted access).</li>`;
        if (detailLevel === 'detailed' || detailLevel === 'expert') {
            response += `<li><strong>CoA Support:</strong> Change of Authorization is enabled to support dynamic policy changes from the RADIUS server.</li>`;
            response += `<li><strong>Performance Impact:</strong> The reauthentication timer is set to 3600 seconds (1 hour) to balance security and performance.</li>`;
        }
        if (detailLevel === 'expert') {
            response += `<li><strong>Advanced Considerations:</strong> Consider implementing RADIUS server redundancy and adjusting timers based on your environment's performance characteristics.</li>`;
            response += `<li><strong>Security Enhancement:</strong> For higher security, consider implementing certificate-based EAP-TLS instead of PEAP/MSCHAPv2.</li>`;
        }
        response += `</ul>`;
    }
    
    response += `</div>`;
    return response;
}

/**
 * Generate AI response for configuration review
 */
function reviewAIResponse(prompt, detailLevel, securityFocus) {
    // Simplified example of AI configuration review
    let response = `<div class="ai-response">`;
    response += `<h3>Configuration Review</h3>`;
    response += `<p>I've analyzed the provided configuration and identified the following:</p>`;
    
    response += `<h4>Security Findings</h4>`;
    response += `<ul>`;
    response += `<li><span style="color: #c62828;">⚠️ High Risk:</span> RADIUS shared secret appears to be using a weak password pattern.</li>`;
    response += `<li><span style="color: #e65100;">⚠️ Medium Risk:</span> No RADIUS server redundancy configured.</li>`;
    response += `<li><span style="color: #e65100;">⚠️ Medium Risk:</span> Reauthentication timer set too high (86400 seconds).</li>`;
    response += `<li><span style="color: #33691e;">✓ Good:</span> MAC move detection is properly configured.</li>`;
    response += `</ul>`;
    
    response += `<h4>Operational Recommendations</h4>`;
    response += `<ul>`;
    response += `<li>Consider adding a backup RADIUS server for redundancy.</li>`;
    response += `<li>Reduce reauthentication timer to 3600-7200 seconds (1-2 hours).</li>`;
    response += `<li>Implement a stronger RADIUS shared secret with mixed case, numbers, and special characters.</li>`;
    if (detailLevel === 'detailed' || detailLevel === 'expert') {
        response += `<li>Add RADIUS accounting for better visibility and troubleshooting.</li>`;
        response += `<li>Consider implementing RADIUS server dead detection with automatic recovery.</li>`;
    }
    if (detailLevel === 'expert') {
        response += `<li>Implement RADIUS server load balancing for better performance.</li>`;
        response += `<li>Consider integrating with a NAC solution for more granular access control.</li>`;
    }
    response += `</ul>`;
    
    if (detailLevel !== 'basic') {
        response += `<h4>Improved RADIUS Configuration</h4>`;
        response += `<pre>radius server PRIMARY
 address ipv4 10.1.1.100 auth-port 1812 acct-port 1813
 key StR0ng!R@d1us$3cr3t
 timeout 5
 retransmit 3

radius server BACKUP
 address ipv4 10.1.1.101 auth-port 1812 acct-port 1813
 key StR0ng!R@d1us$3cr3t
 timeout 5
 retransmit 3

aaa group server radius AAA-SERVERS
 server name PRIMARY
 server name BACKUP
 load-balance method least-outstanding
 
aaa authentication dot1x default group AAA-SERVERS
aaa authorization network default group AAA-SERVERS
aaa accounting dot1x default start-stop group AAA-SERVERS</pre>`;
    }
    
    response += `</div>`;
    return response;
}

/**
 * Generate AI response for configuration optimization
 */
function optimizeAIResponse(prompt, detailLevel, securityFocus, includeComments) {
    // Simplified example of AI configuration optimization
    let response = `<div class="ai-response">`;
    response += `<h3>Optimized Configuration</h3>`;
    response += `<p>I've optimized the configuration for ${securityFocus} focus and ${detailLevel} detail level:</p>`;
    
    response += `<pre>! Optimized Cisco IOS 802.1X Configuration
! Security Focus: ${securityFocus}

! RADIUS Server Configuration
radius-server dead-criteria time 5 tries 3
radius-server deadtime 15
radius-server timeout 4
radius-server retransmit 3

radius server PRIMARY
 address ipv4 10.1.1.100 auth-port 1812 acct-port 1813
 key StR0ng!R@d1us$3cr3t
 automate-tester username probe-user password 7 0214055F5A545C
 
radius server BACKUP
 address ipv4 10.1.1.101 auth-port 1812 acct-port 1813
 key StR0ng!R@d1us$3cr3t
 automate-tester username probe-user password 7 0214055F5A545C

aaa group server radius AAA-SERVERS
 server name PRIMARY
 server name BACKUP
 load-balance method least-outstanding

aaa authentication dot1x default group AAA-SERVERS
aaa authorization network default group AAA-SERVERS
aaa accounting dot1x default start-stop group AAA-SERVERS

! Global 802.1X Configuration
dot1x system-auth-control
authentication mac-move permit

! Optimized Interface Template
interface range GigabitEthernet1/0/1 - 48
 switchport mode access
 switchport access vlan 10
 authentication event fail action authorize vlan 999
 authentication event server dead action authorize vlan 999
 authentication event server alive action reinitialize
 authentication port-control auto
 authentication periodic
 authentication timer reauthenticate 3600
 authentication timer restart 10
 authentication timer inactivity 86400
 dot1x pae authenticator
 dot1x timeout tx-period 10
 dot1x max-reauth-req 2
 mab
 authentication order dot1x mab
 authentication priority dot1x mab
 spanning-tree portfast
 
! RADIUS CoA Support
aaa server radius dynamic-author
 client 10.1.1.100 server-key StR0ng!R@d1us$3cr3t
 client 10.1.1.101 server-key StR0ng!R@d1us$3cr3t</pre>`;

    if (includeComments) {
        response += `<h4>Optimization Notes</h4>`;
        response += `<ul>`;
        response += `<li><strong>RADIUS Redundancy:</strong> Added backup server and load balancing for better availability.</li>`;
        response += `<li><strong>Dead Detection:</strong> Implemented automatic RADIUS server testing and faster failover.</li>`;
        response += `<li><strong>Performance:</strong> Optimized timers for better performance while maintaining security.</li>`;
        if (detailLevel === 'detailed' || detailLevel === 'expert') {
            response += `<li><strong>Security Enhancement:</strong> Implemented stronger RADIUS keys and improved CoA support.</li>`;
            response += `<li><strong>Operational Improvement:</strong> Added inactivity timer to automatically clear inactive sessions.</li>`;
        }
        if (detailLevel === 'expert') {
            response += `<li><strong>Advanced Optimization:</strong> Fine-tuned retransmission parameters to reduce authentication delays.</li>`;
            response += `<li><strong>Scalability:</strong> Interface template approach allows for consistent deployment across the network.</li>`;
        }
        response += `</ul>`;
    }
    
    response += `</div>`;
    return response;
}

/**
 * Generate AI response for configuration explanation
 */
function explainAIResponse(prompt, detailLevel) {
    // Simplified example of AI configuration explanation
    let response = `<div class="ai-response">`;
    response += `<h3>Configuration Explanation</h3>`;
    response += `<p>Here's an explanation of the key components in this 802.1X configuration:</p>`;
    
    response += `<h4>RADIUS Server Configuration</h4>`;
    response += `<p>This section defines the RADIUS servers that will be used for authentication:</p>`;
    response += `<pre>radius server PRIMARY
 address ipv4 10.1.1.100 auth-port 1812 acct-port 1813
 key SecureRadiusKey123</pre>`;
    response += `<p>This configures a RADIUS server with IP address 10.1.1.100 using standard ports for authentication (1812) and accounting (1813). The shared secret "SecureRadiusKey123" is used to secure communication between the switch and RADIUS server.</p>`;
    
    if (detailLevel !== 'basic') {
        response += `<h4>AAA Configuration</h4>`;
        response += `<pre>aaa new-model
aaa authentication dot1x default group radius
aaa authorization network default group radius
aaa accounting dot1x default start-stop group radius</pre>`;
        response += `<p>This section enables Authentication, Authorization, and Accounting (AAA) services:</p>`;
        response += `<ul>`;
        response += `<li><code>aaa new-model</code> - Enables the AAA access control model</li>`;
        response += `<li><code>aaa authentication dot1x</code> - Specifies that 802.1X authentication will use RADIUS servers</li>`;
        response += `<li><code>aaa authorization network</code> - Allows the RADIUS server to assign attributes like VLANs</li>`;
        response += `<li><code>aaa accounting dot1x</code> - Enables accounting to track user activity</li>`;
        response += `</ul>`;
    }
    
    response += `<h4>Global 802.1X Configuration</h4>`;
    response += `<pre>dot1x system-auth-control
authentication mac-move permit</pre>`;
    response += `<p><code>dot1x system-auth-control</code> globally enables 802.1X on the switch. <code>authentication mac-move permit</code> allows a MAC address to move between ports without requiring reauthentication, which is useful for mobile devices.</p>`;
    
    if (detailLevel === 'detailed' || detailLevel === 'expert') {
        response += `<h4>Interface Configuration</h4>`;
        response += `<pre>interface GigabitEthernet1/0/1
 switchport mode access
 switchport access vlan 10
 authentication event fail action authorize vlan 999
 authentication port-control auto
 authentication periodic
 authentication timer reauthenticate 3600
 dot1x pae authenticator
 mab
 authentication order dot1x mab
 authentication priority dot1x mab</pre>`;
        response += `<p>This configures 802.1X on a specific interface:</p>`;
        response += `<ul>`;
        response += `<li><code>authentication port-control auto</code> - Requires authentication for network access</li>`;
        response += `<li><code>authentication event fail action...</code> - Places failed authentications in VLAN 999</li>`;
        response += `<li><code>authentication periodic</code> - Enables periodic reauthentication</li>`;
        response += `<li><code>authentication timer reauthenticate 3600</code> - Sets reauthentication interval to 1 hour</li>`;
        response += `<li><code>mab</code> - Enables MAC Authentication Bypass for devices that don't support 802.1X</li>`;
        response += `<li><code>authentication order dot1x mab</code> - Tries 802.1X first, then MAB if 802.1X fails</li>`;
        response += `</ul>`;
    }
    
    if (detailLevel === 'expert') {
        response += `<h4>Advanced Features</h4>`;
        response += `<pre>aaa server radius dynamic-author
 client 10.1.1.100 server-key SecureRadiusKey123</pre>`;
        response += `<p>This enables RADIUS Change of Authorization (CoA), which allows the RADIUS server to dynamically change a user's authorization attributes (like VLAN assignment) after they've already authenticated. This is essential for integrating with NAC solutions that may need to quarantine devices or change their network access based on posture assessment.</p>`;
        
        response += `<h4>Security Design Considerations</h4>`;
        response += `<p>This configuration implements a balance of security and usability:</p>`;
        response += `<ul>`;
        response += `<li><strong>Defense in Depth:</strong> Uses both 802.1X and MAB for multi-layered authentication</li>`;
        response += `<li><strong>Segmentation:</strong> Separates authenticated and unauthenticated devices into different VLANs</li>`;
        response += `<li><strong>Periodic Verification:</strong> Reauthenticates devices every hour to ensure continued compliance</li>`;
        response += `<li><strong>Operational Resilience:</strong> Provides fallback mechanisms when authentication fails</li>`;
        response += `</ul>`;
    }
    
    response += `</div>`;
    return response;
}

/**
 * Generate AI response for troubleshooting
 */
function troubleshootAIResponse(prompt, detailLevel) {
    // Simplified example of AI troubleshooting help
    let response = `<div class="ai-response">`;
    response += `<h3>802.1X Troubleshooting Guide</h3>`;
    
    // Extract issue type from prompt (simplified approach)
    let issueType = 'authentication-failure';
    if (prompt.toLowerCase().includes('timeout')) {
        issueType = 'timeout';
    } else if (prompt.toLowerCase().includes('vlan') || prompt.toLowerCase().includes('authorization')) {
        issueType = 'authorization';
    } else if (prompt.toLowerCase().includes('radius') || prompt.toLowerCase().includes('server')) {
        issueType = 'radius-server';
    }
    
    // Provide troubleshooting guidance based on the identified issue
    switch (issueType) {
        case 'authentication-failure':
            response += `<h4>Authentication Failure Troubleshooting</h4>`;
            response += `<p>Based on your description, it appears you're experiencing 802.1X authentication failures. Here's how to troubleshoot:</p>`;
            
            response += `<h5>Diagnostic Commands</h5>`;
            response += `<pre>show authentication sessions interface GigabitEthernet1/0/1
show dot1x interface GigabitEthernet1/0/1 details
show aaa servers
debug dot1x all
debug radius authentication</pre>`;
            
            response += `<h5>Common Causes and Solutions</h5>`;
            response += `<ol>`;
            response += `<li><strong>Incorrect RADIUS shared secret</strong><br>Verify that the shared secret on the switch matches the one configured on the RADIUS server.</li>`;
            response += `<li><strong>User credentials issues</strong><br>Confirm that the user exists in the RADIUS server database and has the correct password.</li>`;
            response += `<li><strong>EAP method mismatch</strong><br>Ensure the client and server are configured for the same EAP method (PEAP, EAP-TLS, etc.).</li>`;
            response += `<li><strong>Certificate issues</strong><br>For EAP-TLS, verify that certificates are valid and trusted by all parties.</li>`;
            if (detailLevel !== 'basic') {
                response += `<li><strong>Supplicant misconfiguration</strong><br>Check the client supplicant settings for proper configuration.</li>`;
                response += `<li><strong>Incorrect VLAN assignment</strong><br>Ensure that the RADIUS server is sending the correct VLAN attributes and that the VLAN exists on the switch.</li>`;
            }
            if (detailLevel === 'expert') {
                response += `<li><strong>Protocol mismatches</strong><br>Verify that the EAP over LAN (EAPOL) versions are compatible between devices.</li>`;
                response += `<li><strong>Packet timing issues</strong><br>Adjust dot1x timeout values if responses are being received but timing out.</li>`;
            }
            response += `</ol>`;
            break;
            
        case 'timeout':
            response += `<h4>Authentication Timeout Troubleshooting</h4>`;
            response += `<p>Timeout issues often indicate connectivity or response problems between the components. Here's how to troubleshoot:</p>`;
            
            response += `<h5>Diagnostic Commands</h5>`;
            response += `<pre>show dot1x statistics
show radius statistics
ping 10.1.1.100 # Replace with your RADIUS server IP
show authentication sessions interface GigabitEthernet1/0/1
debug radius</pre>`;
            
            // Further timeout troubleshooting would be here
            break;
            
        case 'authorization':
            response += `<h4>VLAN Assignment/Authorization Troubleshooting</h4>`;
            response += `<p>Issues with VLAN assignment or authorization typically relate to RADIUS attributes or switch configuration:</p>`;
            
            // VLAN authorization troubleshooting would be here
            break;
            
        case 'radius-server':
            response += `<h4>RADIUS Server Connectivity Troubleshooting</h4>`;
            response += `<p>RADIUS server problems can prevent successful authentication:</p>`;
            
            // RADIUS server troubleshooting would be here
            break;
    }
    
    if (detailLevel === 'detailed' || detailLevel === 'expert') {
        response += `<h4>Logging and Monitoring Best Practices</h4>`;
        response += `<p>Implement these logging practices to better troubleshoot 802.1X issues:</p>`;
        response += `<pre>conf t
logging buffered 16384
logging buffered informational
logging trap informational
logging origin-id hostname
logging host 10.1.1.200
service timestamps log datetime msec
aaa accounting dot1x default start-stop group radius
end</pre>`;
    }
    
    if (detailLevel === 'expert') {
        response += `<h4>Advanced Troubleshooting Workflow</h4>`;
        response += `<p>For persistent issues, follow this systematic approach:</p>`;
        response += `<ol>`;
        response += `<li><strong>Isolate the scope</strong> - Determine if the issue affects a specific user, device type, switch port, or is system-wide</li>`;
        response += `<li><strong>Verify configuration</strong> - Compare working and non-working configurations to identify differences</li>`;
        response += `<li><strong>Packet capture analysis</strong> - Capture EAPOL and RADIUS traffic to analyze the specific failure point</li>`;
        response += `<li><strong>Test incrementally</strong> - Temporarily simplify the configuration to isolate complex interactions</li>`;
        response += `<li><strong>Consult server logs</strong> - Examine RADIUS server logs for detailed authentication process information</li>`;
        response += `</ol>`;
    }
    
    response += `</div>`;
    return response;
}

/**
 * Initialize Help tabs
 */
function initializeHelpTabs() {
    const helpTopics = document.querySelectorAll('.help-topics li');
    const helpSections = document.querySelectorAll('.help-section');
    
    helpTopics.forEach(topic => {
        topic.addEventListener('click', function() {
            // Remove active class from all topics
            helpTopics.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked topic
            this.classList.add('active');
            
            // Hide all help sections
            helpSections.forEach(section => section.classList.remove('active'));
            
            // Show the corresponding help section
            const topicId = this.getAttribute('data-topic');
            document.getElementById('help-' + topicId).classList.add('active');
        });
    });
}
