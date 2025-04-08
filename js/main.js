/**
 * Dot1Xer Supreme - Main JavaScript
 * Version: 3.5.0
 */

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    populateVendorSelector();
    initializeThemeToggle();
});

/**
 * Initialize the application
 */
function initializeApp() {
    // Initialize the tabs
    const tabLinks = document.querySelectorAll('nav a');
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the tab ID from the href
            const tabId = this.getAttribute('href').substring(1);
            
            // Remove active class from all tabs and links
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            
            tabLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to current tab and link
            document.getElementById(tabId).classList.add('active');
            this.classList.add('active');
        });
    });
    
    // Initialize help links in the help tab
    const helpLinks = document.querySelectorAll('.help-link');
    helpLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the section ID from the href
            const sectionId = this.getAttribute('href').substring(1);
            
            // Remove active class from all help sections and links
            document.querySelectorAll('.help-section').forEach(section => {
                section.classList.remove('active');
            });
            
            helpLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to current section and link
            document.getElementById(sectionId).classList.add('active');
            this.classList.add('active');
        });
    });
    
    // Initialize help tips
    initializeHelpTips();
}

/**
 * Set up event listeners for interactive elements
 */
function setupEventListeners() {
    // Generate configuration button
    const generateBtn = document.getElementById('generate-config');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateConfiguration);
    }
    
    // Copy output button
    const copyBtn = document.getElementById('copy-output');
    if (copyBtn) {
        copyBtn.addEventListener('click', copyConfigOutput);
    }
    
    // Download output button
    const downloadBtn = document.getElementById('download-output');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadConfigOutput);
    }
    
    // Discovery method change
    const discoveryMethod = document.getElementById('discovery-method');
    if (discoveryMethod) {
        discoveryMethod.addEventListener('change', function() {
            const method = this.value;
            
            // Hide all credential groups first
            document.getElementById('snmp-community-group').classList.add('hidden');
            document.getElementById('snmpv3-group').classList.add('hidden');
            document.getElementById('cred-group').classList.add('hidden');
            
            // Show the appropriate credential group based on the method
            if (method === 'snmp') {
                document.getElementById('snmp-community-group').classList.remove('hidden');
            } else if (method === 'snmpv3') {
                document.getElementById('snmpv3-group').classList.remove('hidden');
            } else if (method === 'ssh' || method === 'telnet') {
                document.getElementById('cred-group').classList.remove('hidden');
            }
        });
    }
    
    // AI analysis button
    const aiAnalyzeBtn = document.getElementById('ai-analyze');
    if (aiAnalyzeBtn) {
        aiAnalyzeBtn.addEventListener('click', function() {
            const aiInput = document.getElementById('ai-input').value;
            const aiMode = document.getElementById('ai-mode').value;
            
            if (!aiInput.trim()) {
                alert('Please enter a configuration or description to analyze.');
                return;
            }
            
            // Add user message to chat
            const aiChatMessages = document.getElementById('ai-chat-messages');
            const userMessageDiv = document.createElement('div');
            userMessageDiv.className = 'ai-message user';
            userMessageDiv.textContent = aiInput;
            aiChatMessages.appendChild(userMessageDiv);
            
            // Simulate AI response based on mode
            let responseText = '';
            switch (aiMode) {
                case 'analyze':
                    responseText = simulateAIAnalysis(aiInput);
                    break;
                case 'improve':
                    responseText = simulateAIImprovement(aiInput);
                    break;
                case 'generate':
                    responseText = simulateAIGeneration(aiInput);
                    break;
                case 'explain':
                    responseText = simulateAIExplanation(aiInput);
                    break;
                case 'compare':
                    responseText = 'To compare configurations, please upload both configurations or paste them separated by a line containing "---"';
                    break;
                default:
                    responseText = 'I\'ve analyzed your input but cannot determine the specific request. Please select a mode and try again.';
            }
            
            // Add AI response to chat
            const aiMessageDiv = document.createElement('div');
            aiMessageDiv.className = 'ai-message assistant';
            aiMessageDiv.textContent = responseText;
            aiChatMessages.appendChild(aiMessageDiv);
            
            // Scroll to bottom of chat
            aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
            
            // Clear input
            document.getElementById('ai-input').value = '';
        });
    }
    
    // AI send button
    const aiSendBtn = document.getElementById('ai-send');
    if (aiSendBtn) {
        aiSendBtn.addEventListener('click', function() {
            const messageInput = document.getElementById('ai-message-input');
            const message = messageInput.value.trim();
            
            if (!message) return;
            
            // Add user message to chat
            const aiChatMessages = document.getElementById('ai-chat-messages');
            const userMessageDiv = document.createElement('div');
            userMessageDiv.className = 'ai-message user';
            userMessageDiv.textContent = message;
            aiChatMessages.appendChild(userMessageDiv);
            
            // Simulate AI response
            const aiMessageDiv = document.createElement('div');
            aiMessageDiv.className = 'ai-message assistant';
            aiMessageDiv.textContent = 'I understand your question about "' + message + '". While I can provide general guidance on 802.1X configurations, detailed responses require integration with an AI service. This feature would be fully functional in a production deployment.';
            aiChatMessages.appendChild(aiMessageDiv);
            
            // Scroll to bottom of chat
            aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
            
            // Clear input
            messageInput.value = '';
        });
    }
    
    // Start discovery button
    const startDiscoveryBtn = document.getElementById('start-discovery');
    if (startDiscoveryBtn) {
        startDiscoveryBtn.addEventListener('click', function() {
            const range = document.getElementById('discovery-range').value;
            
            if (!range) {
                alert('Please enter an IP range to scan.');
                return;
            }
            
            // Update button state
            this.disabled = true;
            this.textContent = 'Discovering...';
            
            // Simulate discovery process
            setTimeout(() => {
                populateDiscoveryResults();
                
                // Reset button state
                this.disabled = false;
                this.textContent = 'Start Discovery';
            }, 3000);
        });
    }
    
    // Generate deployment plan button
    const generatePlanBtn = document.getElementById('generate-plan');
    if (generatePlanBtn) {
        generatePlanBtn.addEventListener('click', function() {
            const deploymentName = document.getElementById('deployment-name').value;
            
            if (!deploymentName) {
                alert('Please enter a deployment name.');
                return;
            }
            
            // Move to next step
            const currentStage = document.querySelector('.stage-circle.active');
            currentStage.classList.remove('active');
            currentStage.classList.add('completed');
            
            const nextStage = currentStage.parentElement.nextElementSibling.querySelector('.stage-circle');
            nextStage.classList.add('active');
            
            // Hide current step
            document.getElementById('deployment-step-1').style.display = 'none';
            
            // Create and show next step
            const deploymentContainer = document.querySelector('.deployment-container');
            
            const nextStep = document.createElement('div');
            nextStep.className = 'deployment-step';
            nextStep.id = 'deployment-step-2';
            
            nextStep.innerHTML = `
                <h3>Prerequisites Check</h3>
                
                <div class="prerequisites-list">
                    <div class="prerequisite-item">
                        <div class="prerequisite-status status-success">?</div>
                        <div class="prerequisite-info">
                            <h4>RADIUS Server</h4>
                            <p>RADIUS server is configured and accessible</p>
                        </div>
                    </div>
                    
                    <div class="prerequisite-item">
                        <div class="prerequisite-status status-warning">!</div>
                        <div class="prerequisite-info">
                            <h4>Backup RADIUS Server</h4>
                            <p>Backup RADIUS server is not configured</p>
                        </div>
                    </div>
                    
                    <div class="prerequisite-item">
                        <div class="prerequisite-status status-success">?</div>
                        <div class="prerequisite-info">
                            <h4>Network Access</h4>
                            <p>All devices are accessible via management network</p>
                        </div>
                    </div>
                    
                    <div class="prerequisite-item">
                        <div class="prerequisite-status status-error">?</div>
                        <div class="prerequisite-info">
                            <h4>Credentials Validation</h4>
                            <p>Authentication failed for 2 devices</p>
                        </div>
                    </div>
                    
                    <div class="prerequisite-item">
                        <div class="prerequisite-status status-info">i</div>
                        <div class="prerequisite-info">
                            <h4>Software Version</h4>
                            <p>Some devices may need firmware updates for full 802.1X support</p>
                        </div>
                    </div>
                </div>
                
                <div class="deployment-actions">
                    <button id="back-to-plan" class="secondary-button">Back to Plan</button>
                    <button id="resolve-issues" class="secondary-button">Resolve Issues</button>
                    <button id="continue-anyway" class="primary-button">Continue Anyway</button>
                </div>
            `;
            
            deploymentContainer.appendChild(nextStep);
            
            // Add event listener for back button
            document.getElementById('back-to-plan').addEventListener('click', function() {
                // Reset stage indicators
                nextStage.classList.remove('active');
                currentStage.classList.remove('completed');
                currentStage.classList.add('active');
                
                // Show previous step
                document.getElementById('deployment-step-1').style.display = 'block';
                
                // Remove current step
                nextStep.remove();
            });
        });
    }
}

/**
 * Initialize theme toggle functionality
 */
function initializeThemeToggle() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkThemeLink = document.getElementById('dark-theme');
    
    // Check if dark mode preference is stored
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Set initial state
    if (isDarkMode) {
        darkModeToggle.checked = true;
        darkThemeLink.removeAttribute('disabled');
    }
    
    // Toggle dark mode on change
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            darkThemeLink.removeAttribute('disabled');
            localStorage.setItem('darkMode', 'true');
        } else {
            darkThemeLink.setAttribute('disabled', '');
            localStorage.setItem('darkMode', 'false');
        }
    });
}

/**
 * Populate the vendor selector with vendor cards
 */
function populateVendorSelector() {
    const vendorSelector = document.querySelector('.vendor-selector');
    if (!vendorSelector) return;
    
    // Clear existing content
    vendorSelector.innerHTML = '';
    
    // Get all vendors and their logos
    const vendors = [
        { id: 'cisco', name: 'Cisco' },
        { id: 'aruba', name: 'Aruba' },
        { id: 'juniper', name: 'Juniper' },
        { id: 'fortinet', name: 'Fortinet' },
        { id: 'arista', name: 'Arista' },
        { id: 'extreme', name: 'Extreme' },
        { id: 'huawei', name: 'Huawei' },
        { id: 'hp', name: 'HP' },
        { id: 'dell', name: 'Dell' },
        { id: 'alcatel', name: 'Alcatel' },
        { id: 'ubiquiti', name: 'Ubiquiti' },
        { id: 'multi-vendor', name: 'Multi-Vendor' }
    ];
    
    // Create vendor cards
    vendors.forEach(vendor => {
        const card = document.createElement('div');
        card.className = 'vendor-card';
        card.dataset.vendor = vendor.id;
        
        const img = document.createElement('img');
        img.src = `assets/logos/${vendor.id}/${vendor.id}_logo.svg`;
        img.alt = `${vendor.name} Logo`;
        
        const span = document.createElement('span');
        span.textContent = vendor.name;
        
        card.appendChild(img);
        card.appendChild(span);
        
        // Add click event to select vendor
        card.addEventListener('click', function() {
            // Remove selected class from all cards
            document.querySelectorAll('.vendor-card').forEach(card => {
                card.classList.remove('selected');
            });
            
            // Add selected class to this card
            this.classList.add('selected');
            
            // Update platform options based on selected vendor
            updatePlatformOptions(vendor.id);
        });
        
        vendorSelector.appendChild(card);
    });
}

/**
 * Update platform options based on selected vendor
 */
function updatePlatformOptions(vendorId) {
    const platformSelect = document.getElementById('platform');
    if (!platformSelect) return;
    
    // Clear existing options except the first one
    while (platformSelect.options.length > 1) {
        platformSelect.remove(1);
    }
    
    // Define platform options based on vendor
    const platformOptions = {
        'cisco': [
            { value: 'ios', text: 'IOS' },
            { value: 'ios-xe', text: 'IOS-XE' },
            { value: 'nx-os', text: 'NX-OS' },
            { value: 'catalyst', text: 'Catalyst OS' },
            { value: 'wlc', text: 'Wireless LAN Controller' }
        ],
        'aruba': [
            { value: 'aos-cx', text: 'AOS-CX' },
            { value: 'aos-switch', text: 'AOS-Switch' },
            { value: 'instant', text: 'Instant AP' },
            { value: 'controller', text: 'Mobility Controller' }
        ],
        'juniper': [
            { value: 'junos', text: 'Junos OS' },
            { value: 'ex-series', text: 'EX Series' },
            { value: 'mist', text: 'Mist AP' }
        ],
        'fortinet': [
            { value: 'fortiswitch', text: 'FortiSwitch' },
            { value: 'fortiwlc', text: 'FortiWLC' }
        ],
        'arista': [
            { value: 'eos', text: 'EOS' },
            { value: 'cloudvision', text: 'CloudVision' }
        ],
        'extreme': [
            { value: 'exos', text: 'EXOS' },
            { value: 'voss', text: 'VOSS' },
            { value: 'wing', text: 'WiNG' }
        ],
        'huawei': [
            { value: 'vrp', text: 'VRP' },
            { value: 's-series', text: 'S-Series Switches' },
            { value: 'ac', text: 'Wireless AC' }
        ],
        'hp': [
            { value: 'procurve', text: 'ProCurve' },
            { value: 'comware', text: 'Comware' },
            { value: 'aruba-switches', text: 'Aruba Switches' }
        ],
        'dell': [
            { value: 'os10', text: 'OS10' },
            { value: 'os9', text: 'OS9' },
            { value: 'os6', text: 'OS6' }
        ],
        'alcatel': [
            { value: 'aos', text: 'AOS' },
            { value: 'omniswitch', text: 'OmniSwitch' }
        ],
        'ubiquiti': [
            { value: 'unifi', text: 'UniFi' },
            { value: 'edgeswitch', text: 'EdgeSwitch' }
        ],
        'multi-vendor': [
            { value: 'mixed', text: 'Mixed Environment' },
            { value: 'migration', text: 'Migration Setup' }
        ]
    };
    
    // Add platform options for selected vendor
    const options = platformOptions[vendorId] || [];
    options.forEach(option => {
        const optElement = document.createElement('option');
        optElement.value = option.value;
        optElement.textContent = option.text;
        platformSelect.appendChild(optElement);
    });
}

/**
 * Initialize help tips system
 */
function initializeHelpTips() {
    const helpTips = document.querySelectorAll('.help-tip');
    
    // Add event listeners for mobile devices
    helpTips.forEach(tip => {
        // For mobile - toggle visibility on click
        tip.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Close any other open tooltips
            helpTips.forEach(otherTip => {
                if (otherTip !== tip && otherTip.classList.contains('active')) {
                    otherTip.classList.remove('active');
                }
            });
            
            // Toggle active class
            this.classList.toggle('active');
        });
    });
    
    // Close tooltips when clicking elsewhere on the document
    document.addEventListener('click', function() {
        helpTips.forEach(tip => {
            tip.classList.remove('active');
        });
    });
}

/**
 * Generate configuration based on form inputs
 */
function generateConfiguration() {
    // Get selected vendor and platform
    const selectedVendorElement = document.querySelector('.vendor-card.selected');
    if (!selectedVendorElement) {
        alert('Please select a vendor first.');
        return;
    }
    
    const vendor = selectedVendorElement.dataset.vendor;
    const platform = document.getElementById('platform').value;
    
    if (!platform) {
        alert('Please select a platform.');
        return;
    }
    
    // Get form values
    const authMethod = document.getElementById('auth-method').value;
    const radiusServer = document.getElementById('radius-server').value;
    const radiusSecret = document.getElementById('radius-secret').value;
    const backupServer = document.getElementById('backup-server').value;
    const backupSecret = document.getElementById('backup-secret').value;
    const vlanAuth = document.getElementById('vlan-auth').value;
    const vlanVoice = document.getElementById('vlan-voice').value;
    const vlanGuest = document.getElementById('vlan-guest').value;
    const vlanCritical = document.getElementById('vlan-critical').value;
    const interface = document.getElementById('interface').value;
    const enableMAB = document.getElementById('enable-mab').checked;
    const enableCoA = document.getElementById('enable-coa').checked;
    const enableMonitor = document.getElementById('enable-monitor').checked;
    const enableRadSec = document.getElementById('enable-radsec').checked;
    const authTimerRestart = document.getElementById('auth-timer-restart').value;
    const authTimerReauthenticate = document.getElementById('auth-timer-reauthenticate').value;
    
    // Validate required fields
    if (!radiusServer || !radiusSecret || !vlanAuth || !vlanGuest || !interface) {
        alert('Please fill in all required fields: RADIUS Server, RADIUS Secret, Authentication VLAN, Guest VLAN, and Interface(s).');
        return;
    }
    
    // Get output element
    const outputEl = document.getElementById('config-output');
    
    // Generate configuration based on vendor and platform
    let config = '';
    
    switch (vendor) {
        case 'cisco':
            if (platform === 'ios' || platform === 'ios-xe') {
                config = generateCiscoIOSConfig({
                    authMethod, radiusServer, radiusSecret, backupServer, backupSecret,
                    vlanAuth, vlanVoice, vlanGuest, vlanCritical, interface,
                    enableMAB, enableCoA, enableMonitor, enableRadSec,
                    authTimerRestart, authTimerReauthenticate
                });
            } else if (platform === 'nx-os') {
                config = generateCiscoNXOSConfig({
                    authMethod, radiusServer, radiusSecret, backupServer, backupSecret,
                    vlanAuth, vlanVoice, vlanGuest, vlanCritical, interface,
                    enableMAB, enableCoA, authTimerReauthenticate
                });
            } else if (platform === 'wlc') {
                config = generateCiscoWLCConfig({
                    radiusServer, radiusSecret, backupServer, backupSecret,
                    vlanAuth, vlanGuest
                });
            }
            break;
            
        case 'aruba':
            if (platform === 'aos-cx') {
                config = generateArubaAOSCXConfig({
                    authMethod, radiusServer, radiusSecret, backupServer, backupSecret,
                    vlanAuth, vlanVoice, vlanGuest, vlanCritical, interface,
                    enableMAB, enableCoA, authTimerReauthenticate
                });
            } else if (platform === 'controller') {
                config = generateArubaControllerConfig({
                    radiusServer, radiusSecret, backupServer, backupSecret,
                    vlanAuth, vlanGuest
                });
            }
            break;
            
        case 'juniper':
            if (platform === 'ex-series') {
                config = generateJuniperEXConfig({
                    authMethod, radiusServer, radiusSecret, backupServer, backupSecret,
                    vlanAuth, vlanVoice, vlanGuest, vlanCritical, interface,
                    enableMAB, authTimerReauthenticate
                });
            }
            break;
            
        case 'extreme':
            if (platform === 'exos') {
                config = generateExtremeEXOSConfig({
                    authMethod, radiusServer, radiusSecret, backupServer, backupSecret,
                    vlanAuth, vlanVoice, vlanGuest, vlanCritical, interface,
                    enableMAB, authTimerReauthenticate
                });
            }
            break;
            
        case 'huawei':
            if (platform === 'vrp') {
                config = generateHuaweiVRPConfig({
                    authMethod, radiusServer, radiusSecret, backupServer, backupSecret,
                    vlanAuth, vlanVoice, vlanGuest, vlanCritical, interface,
                    enableMAB, authTimerReauthenticate
                });
            }
            break;
            
        case 'hp':
            if (platform === 'procurve') {
                config = generateHPProcurveConfig({
                    authMethod, radiusServer, radiusSecret, backupServer, backupSecret,
                    vlanAuth, vlanVoice, vlanGuest, vlanCritical, interface,
                    enableMAB, authTimerReauthenticate
                });
            }
            break;
            
        case 'multi-vendor':
            config = generateMultiVendorConfig({
                authMethod, radiusServer, radiusSecret, backupServer, backupSecret,
                vlanAuth, vlanVoice, vlanGuest, vlanCritical
            });
            break;
            
        default:
            config = `# Configuration for ${vendor} ${platform} is not yet implemented.\n# Please select another vendor/platform or check back later.`;
    }
    
    // Update output
    outputEl.textContent = config;
}

/**
 * Generate Cisco IOS/IOS-XE configuration
 */
function generateCiscoIOSConfig(options) {
    const {
        authMethod, radiusServer, radiusSecret, backupServer, backupSecret,
        vlanAuth, vlanVoice, vlanGuest, vlanCritical, interface,
        enableMAB, enableCoA, enableMonitor, enableRadSec,
        authTimerRestart, authTimerReauthenticate
    } = options;
    
    let config = `! Cisco ${authMethod === 'dot1x' ? '802.1X' : authMethod === 'mab' ? 'MAB' : '802.1X with MAB'} Configuration
! Generated by Dot1Xer Supreme
! Date: ${new Date().toISOString().split('T')[0]}

! Global AAA Configuration
aaa new-model
aaa authentication dot1x default group RADIUS-SERVERS
aaa authorization network default group RADIUS-SERVERS
aaa accounting dot1x default start-stop group RADIUS-SERVERS

! RADIUS Server Configuration
radius server PRIMARY
 address ipv4 ${radiusServer} auth-port 1812 acct-port 1813
 key ${radiusSecret}
 timeout 5
 retransmit 3
`;

    if (backupServer && backupSecret) {
        config += `
! Backup RADIUS Server Configuration
radius server BACKUP
 address ipv4 ${backupServer} auth-port 1812 acct-port 1813
 key ${backupSecret}
 timeout 5
 retransmit 3
`;
    }

    config += `
! RADIUS Server Group
aaa group server radius RADIUS-SERVERS
 server name PRIMARY`;

    if (backupServer) {
        config += `
 server name BACKUP`;
    }

    config += `
 deadtime 15

! Enable 802.1X System-wide
dot1x system-auth-control
`;

    if (enableCoA) {
        config += `
! Change of Authorization (CoA) Configuration
aaa server radius dynamic-author
 client ${radiusServer} server-key ${radiusSecret}`;
        
        if (backupServer) {
            config += `
 client ${backupServer} server-key ${backupSecret}`;
        }
        
        config += `
 auth-type any
 port 3799
`;
    }

    if (enableRadSec) {
        config += `
! RADIUS over TLS (RadSec) Configuration
crypto pki trustpoint RADSEC-TP
 enrollment terminal
 revocation-check none
 rsakeypair RADSEC-KEY 2048

! Note: Certificate installation required before RadSec can be used
radius server RADSEC-SERVER
 address ipv4 ${radiusServer} auth-port 2083 acct-port 2083
 key ${radiusSecret}
 tls trustpoint RADSEC-TP
`;
    }

    config += `
! VLAN Configuration
vlan ${vlanAuth}
 name AUTH_VLAN`;

    if (vlanVoice) {
        config += `
vlan ${vlanVoice}
 name VOICE_VLAN`;
    }

    config += `
vlan ${vlanGuest}
 name GUEST_VLAN`;

    if (vlanCritical) {
        config += `
vlan ${vlanCritical}
 name CRITICAL_VLAN`;
    }

    config += `

! Interface Configuration
interface ${interface}
 description 802.1X Authentication Port
 switchport mode access
 switchport access vlan ${vlanAuth}`;

    if (vlanVoice) {
        config += `
 switchport voice vlan ${vlanVoice}`;
    }

    config += `
 switchport nonegotiate
 
 ! Authentication settings`;

    if (authMethod === 'dot1x-mab' || authMethod === 'multi-auth') {
        config += `
 authentication host-mode multi-auth`;
    } else if (authMethod === 'multi-domain') {
        config += `
 authentication host-mode multi-domain`;
    } else if (authMethod === 'multi-host') {
        config += `
 authentication host-mode multi-host`;
    } else {
        config += `
 authentication host-mode single-host`;
    }

    if (enableMonitor) {
        config += `
 authentication open`;
    }

    if (authMethod === 'dot1x-mab') {
        config += `
 authentication order dot1x mab
 authentication priority dot1x mab`;
    } else if (authMethod === 'mab') {
        config += `
 authentication order mab`;
    } else {
        config += `
 authentication order dot1x`;
    }

    config += `
 authentication port-control auto
 authentication periodic
 authentication timer reauthenticate ${authTimerReauthenticate}
 authentication timer restart ${authTimerRestart}
 authentication violation restrict
 
 ! 802.1X configuration`;

    if (authMethod !== 'mab') {
        config += `
 dot1x pae authenticator
 dot1x timeout tx-period 10
 dot1x max-reauth-req 3`;
    }
    
    if (authMethod === 'dot1x-mab' || authMethod === 'mab' || enableMAB) {
        config += `
 
 ! MAB configuration
 mab`;
    }

    config += `
 
 ! Guest VLAN for authentication failures
 authentication event fail action authorize vlan ${vlanGuest}`;

    if (vlanCritical) {
        config += `
 
 ! Critical VLAN for RADIUS server unavailability
 authentication event server dead action authorize vlan ${vlanCritical}
 authentication event server alive action reinitialize`;
    }

    config += `
 
 ! Spanning tree configuration
 spanning-tree portfast
 spanning-tree bpduguard enable

! End of Configuration
`;

    return config;
}

/**
 * Generate Cisco NX-OS configuration
 */
function generateCiscoNXOSConfig(options) {
    const {
        authMethod, radiusServer, radiusSecret, backupServer, backupSecret,
        vlanAuth, vlanVoice, vlanGuest, vlanCritical, interface,
        enableMAB, enableCoA, authTimerReauthenticate
    } = options;
    
    let config = `! Cisco NX-OS ${authMethod === 'dot1x' ? '802.1X' : authMethod === 'mab' ? 'MAB' : '802.1X with MAB'} Configuration
! Generated by Dot1Xer Supreme
! Date: ${new Date().toISOString().split('T')[0]}

! Enable required features
feature dot1x
feature radius
`;

    if (enableCoA) {
        config += `feature aaa
`;
    }

    config += `
! Configure RADIUS server
radius-server host ${radiusServer} key ${radiusSecret} auth-port 1812 acct-port 1813
`;

    if (backupServer && backupSecret) {
        config += `radius-server host ${backupServer} key ${backupSecret} auth-port 1812 acct-port 1813
`;
    }

    config += `
! Configure AAA settings
aaa authentication dot1x default group radius
aaa accounting dot1x default group radius

! Configure dot1x settings
dot1x system-auth-control
`;

    if (enableCoA) {
        config += `
! Change of Authorization (CoA) Configuration
aaa server radius dynamic-author
 client ${radiusServer} server-key ${radiusSecret}`;
        
        if (backupServer) {
            config += `
 client ${backupServer} server-key ${backupSecret}`;
        }
        
        config += `
 auth-type any
 port 3799
`;
    }

    config += `
! VLAN Configuration
vlan ${vlanAuth}
 name AUTH_VLAN
`;

    if (vlanVoice) {
        config += `vlan ${vlanVoice}
 name VOICE_VLAN
`;
    }

    config += `vlan ${vlanGuest}
 name GUEST_VLAN
`;

    if (vlanCritical) {
        config += `vlan ${vlanCritical}
 name CRITICAL_VLAN
`;
    }

    config += `
! Interface Configuration
interface ${interface}
 description 802.1X Authentication Port
 switchport access vlan ${vlanAuth}
`;

    if (vlanVoice) {
        config += ` switchport voice vlan ${vlanVoice}
`;
    }

    config += ` dot1x pae authenticator
 dot1x timeout quiet-period 10
 dot1x timeout tx-period 10
 dot1x timeout re-authperiod ${authTimerReauthenticate}
 dot1x timeout ratelimit-period 0
 dot1x max-req 2
 dot1x max-reauth-req 2
`;

    if (authMethod === 'multi-auth' || authMethod === 'dot1x-mab') {
        config += ` dot1x host-mode multi-auth
`;
    } else if (authMethod === 'multi-domain') {
        config += ` dot1x host-mode multi-domain
`;
    } else if (authMethod === 'multi-host') {
        config += ` dot1x host-mode multi-host
`;
    } else {
        config += ` dot1x host-mode single-host
`;
    }

    config += ` dot1x port-control auto
`;

    if (enableMAB || authMethod === 'mab' || authMethod === 'dot1x-mab') {
        config += `
 ! Configure MAC Authentication Bypass
 mac-authentication-bypass
`;
    }

    if (vlanGuest) {
        config += ` dot1x auth-fail vlan ${vlanGuest}
`;
    }

    if (vlanCritical) {
        config += ` dot1x critical vlan ${vlanCritical}
`;
    }

    config += `
 ! Spanning tree configuration
 spanning-tree port type edge
 spanning-tree bpduguard enable

! End of Configuration
`;

    return config;
}

/**
 * Generate Cisco WLC configuration
 */
function generateCiscoWLCConfig(options) {
    const {
        radiusServer, radiusSecret, backupServer, backupSecret,
        vlanAuth, vlanGuest
    } = options;
    
    let config = `! Cisco Wireless LAN Controller Configuration
! Generated by Dot1Xer Supreme
! Date: ${new Date().toISOString().split('T')[0]}

! RADIUS Server Configuration
config radius auth add 1 ${radiusServer} 1812 ascii ${radiusSecret}
config radius auth rfc3576 enable 1
config radius auth retransmit-timeout 1 5
config radius auth enable 1
config radius acct add 1 ${radiusServer} 1813 ascii ${radiusSecret}
config radius acct enable 1
`;

    if (backupServer && backupSecret) {
        config += `
! Backup RADIUS Server Configuration
config radius auth add 2 ${backupServer} 1812 ascii ${backupSecret}
config radius auth rfc3576 enable 2
config radius auth retransmit-timeout 2 5
config radius auth enable 2
config radius acct add 2 ${backupServer} 1813 ascii ${backupSecret}
config radius acct enable 2
`;
    }

    config += `
! WLAN Configuration for 802.1X
config wlan create 1 "Secure-WLAN" "Secure-WLAN"
config wlan interface 1 "management"
config wlan security wpa enable 1
config wlan security wpa wpa2 enable 1
config wlan security wpa wpa2 ciphers aes enable 1
config wlan security wpa akm 802.1x enable 1
config wlan radius_server auth add 1 1`;

    if (backupServer) {
        config += `
config wlan radius_server auth add 1 2`;
    }

    config += `
config wlan radius_server acct add 1 1
config wlan security pmf optional 1
config wlan session-timeout 1 1800
config wlan enable 1

! Guest WLAN Configuration
config wlan create 2 "Guest-WLAN" "Guest-WLAN"
config wlan interface 2 "guest"
config wlan security wpa disable 2
config wlan security web-auth enable 2
config wlan session-timeout 2 1800
config wlan aaa-override enable 2
config wlan enable 2

! VLAN Configuration
config interface vlan management ${vlanAuth}
config interface vlan guest ${vlanGuest}

! End of Configuration
`;

    return config;
}

/**
 * Generate Aruba AOS-CX configuration
 */
function generateArubaAOSCXConfig(options) {
    const {
        authMethod, radiusServer, radiusSecret, backupServer, backupSecret,
        vlanAuth, vlanVoice, vlanGuest, vlanCritical, interface,
        enableMAB, enableCoA, authTimerReauthenticate
    } = options;
    
    let config = `! Aruba AOS-CX ${authMethod === 'dot1x' ? '802.1X' : authMethod === 'mab' ? 'MAB' : '802.1X with MAB'} Configuration
! Generated by Dot1Xer Supreme
! Date: ${new Date().toISOString().split('T')[0]}

! RADIUS Server Configuration
radius-server host ${radiusServer} key ${radiusSecret}`;

    if (backupServer && backupSecret) {
        config += `
radius-server host ${backupServer} key ${backupSecret}`;
    }

    config += `

! 802.1X Configuration
aaa authentication port-access dot1x authenticator
aaa authentication port-access dot1x authenticator cached-reauth
aaa authentication port-access dot1x authenticator reauthentication
aaa authentication port-access dot1x authenticator timeout quiet-period 10
aaa authentication port-access dot1x authenticator timeout reauth-period ${authTimerReauthenticate}
aaa authentication port-access dot1x authenticator timeout supp-timeout 30
aaa authentication port-access dot1x authenticator timeout server-timeout 30
aaa authentication port-access dot1x authenticator max-retries 3
aaa authentication port-access dot1x authenticator max-requests 3`;

    if (enableMAB || authMethod === 'mab' || authMethod === 'dot1x-mab') {
        config += `

! MAC Authentication Configuration
aaa authentication port-access mac-auth
aaa authentication port-access mac-auth cache-mode
aaa authentication port-access mac-auth cache-timeout 14400
aaa authentication port-access mac-auth max-retries 3
aaa authentication port-access mac-auth timeout quiet-period 10
aaa authentication port-access mac-auth timeout server-timeout 30
aaa authentication port-access mac-auth timeout reauth-period ${authTimerReauthenticate}`;
    }

    config += `

! VLAN Configuration
vlan ${vlanAuth}
    name "AUTH_VLAN"`;

    if (vlanVoice) {
        config += `
vlan ${vlanVoice}
    name "VOICE_VLAN"`;
    }

    config += `
vlan ${vlanGuest}
    name "GUEST_VLAN"`;

    if (vlanCritical) {
        config += `
vlan ${vlanCritical}
    name "CRITICAL_VLAN"`;
    }

    config += `

! Interface Configuration
interface ${interface}
    description "802.1X Authentication Port"
    no shutdown
    aaa authentication port-access dot1x authenticator
    aaa authentication port-access dot1x authenticator logoff-period 300
    aaa authentication port-access dot1x authenticator client-limit 5`;

    if (enableMAB || authMethod === 'mab' || authMethod === 'dot1x-mab') {
        config += `
    aaa authentication port-access mac-auth
    aaa authentication port-access mac-auth addr-format no-delimiter uppercase`;
    }

    config += `
    aaa authentication port-access authenticator active`;

    if (vlanCritical) {
        config += `
    aaa authentication port-access authenticator critical-auth`;
    }

    if (authMethod === 'dot1x-mab') {
        config += `
    aaa authentication port-access authenticator auth-priority dot1x mac-auth`;
    }

    config += `
    aaa authentication port-access authenticator reauth-period ${authTimerReauthenticate}
    aaa port-access role-based unauth-role ${vlanGuest}
    aaa port-access role-based auth-role ${vlanAuth}`;

    if (vlanCritical) {
        config += `
    aaa port-access role-based critical-role ${vlanCritical}`;
    }

    if (vlanVoice) {
        config += `
    aaa port-access role-based voice-role ${vlanVoice}`;
    }

    config += `
    spanning-tree port-type admin-edge
    spanning-tree bpdu-protection

! End of Configuration
`;

    return config;
}

/**
 * Generate Aruba Controller configuration
 */
function generateArubaControllerConfig(options) {
    const {
        radiusServer, radiusSecret, backupServer, backupSecret,
        vlanAuth, vlanGuest
    } = options;
    
    let config = `! Aruba Mobility Controller Configuration
! Generated by Dot1Xer Supreme
! Date: ${new Date().toISOString().split('T')[0]}

! RADIUS Server Configuration
aaa authentication-server radius "Primary-RADIUS"
  host ${radiusServer}
  key ${radiusSecret}

aaa server-group "dot1x-servers"
  auth-server "Primary-RADIUS"`;

    if (backupServer && backupSecret) {
        config += `

! Backup RADIUS Server
aaa authentication-server radius "Backup-RADIUS"
  host ${backupServer}
  key ${backupSecret}

! Add to Server Group
aaa server-group "dot1x-servers"
  auth-server "Backup-RADIUS"`;
    }

    config += `

! VLAN Configuration
vlan ${vlanAuth}
  name "Auth-VLAN"

vlan ${vlanGuest}
  name "Guest-VLAN"

! AAA Profile Configuration
aaa profile "dot1x-profile"
  authentication-dot1x "dot1x-servers"
  dot1x-default-role "authenticated"
  dot1x-server-retry 3
  dot1x-wait-for-frame 15

! WLAN Configuration - 802.1X
wlan ssid-profile "Secure-WLAN"
  essid "Secure-WLAN"
  opmode wpa2-aes

wlan virtual-ap "802.1x-WLAN"
  ssid-profile "Secure-WLAN"
  aaa-profile "dot1x-profile"
  vlan ${vlanAuth}
  forward-mode tunnel

! WLAN Configuration - Guest
wlan ssid-profile "Guest-WLAN"
  essid "Guest-WLAN"
  opmode opensystem

wlan virtual-ap "Guest-WLAN"
  ssid-profile "Guest-WLAN"
  aaa-profile "guest-profile"  ! Note: Create appropriate guest profile
  vlan ${vlanGuest}
  forward-mode tunnel

! Apply to AP Group
ap-group "default"
  virtual-ap "802.1x-WLAN"
  virtual-ap "Guest-WLAN"

! End of Configuration
`;

    return config;
}

/**
 * Generate Juniper EX Series configuration
 */
function generateJuniperEXConfig(options) {
    const {
        authMethod, radiusServer, radiusSecret, backupServer, backupSecret,
        vlanAuth, vlanVoice, vlanGuest, vlanCritical, interface,
        enableMAB, authTimerReauthenticate
    } = options;
    
    let config = `# Juniper EX Series ${authMethod === 'dot1x' ? '802.1X' : authMethod === 'mab' ? 'MAB' : '802.1X with MAB'} Configuration
# Generated by Dot1Xer Supreme
# Date: ${new Date().toISOString().split('T')[0]}

# RADIUS Server Configuration
system {
    radius-server {
        ${radiusServer} {
            port 1812;
            accounting-port 1813;
            secret "${radiusSecret}";
            retry 3;
            timeout 5;
        }`;

    if (backupServer && backupSecret) {
        config += `
        ${backupServer} {
            port 1812;
            accounting-port 1813;
            secret "${backupSecret}";
            retry 3;
            timeout 5;
        }`;
    }

    config += `
    }
}

# Access Profile Configuration
access {
    profile dot1x-profile {
        authentication-order [`;
    
    if (authMethod === 'dot1x-mab' || authMethod === 'dot1x') {
        config += ` dot1x`;
    }
    
    if (authMethod === 'mab' || authMethod === 'dot1x-mab') {
        if (authMethod === 'dot1x-mab') {
            config += ` mac-radius`;
        } else {
            config += ` mac-radius`;
        }
    }
    
    config += ` ];
        radius {
            authentication-server [ ${radiusServer}`;
    
    if (backupServer) {
        config += ` ${backupServer}`;
    }
    
    config += ` ];
            accounting-server [ ${radiusServer}`;
    
    if (backupServer) {
        config += ` ${backupServer}`;
    }
    
    config += ` ];
            options {
                revert-interval 300;
            }
        }
        accounting {
            order radius;
            accounting-stop-on-failure;
            accounting-stop-on-access-deny;
        }
    }
}

# VLAN Configuration
vlans {
    data-vlan {
        vlan-id ${vlanAuth};
    }`;

    if (vlanVoice) {
        config += `
    voice-vlan {
        vlan-id ${vlanVoice};
    }`;
    }

    config += `
    guest-vlan {
        vlan-id ${vlanGuest};
    }`;

    if (vlanCritical) {
        config += `
    critical-vlan {
        vlan-id ${vlanCritical};
    }`;
    }

    config += `
}

# 802.1X Protocol Configuration
protocols {
    dot1x {
        authenticator {
            authentication-profile-name dot1x-profile;
            interface {
                ${interface} {`;
    
    if (authMethod === 'multi-auth') {
        config += `
                    supplicant multiple;`;
    } else if (authMethod === 'multi-host') {
        config += `
                    supplicant single;`;
    } else {
        config += `
                    supplicant multiple;`;
    }
    
    config += `
                    transmit-period 5;`;
    
    if (enableMAB || authMethod === 'mab' || authMethod === 'dot1x-mab') {
        config += `
                    mac-radius {
                        restrict;
                    }`;
    }
    
    config += `
                    reauthentication ${authTimerReauthenticate};
                    guest-vlan ${vlanGuest};`;
    
    if (vlanCritical) {
        config += `
                    server-fail vlan-name ${vlanCritical};`;
    }
    
    config += `
                    server-reject-vlan ${vlanGuest};
                    eapol-block;
                }
            }
        }
    }
}

# Interface Configuration
interfaces {
    ${interface} {
        unit 0 {
            family ethernet-switching {
                port-mode access;
                vlan {
                    members ${vlanAuth};
                }`;
    
    if (vlanVoice) {
        config += `
                voip {
                    vlan ${vlanVoice};
                }`;
    }
    
    config += `
            }
        }
    }
}

# End of Configuration
`;

    return config;
}

/**
 * Generate Extreme EXOS configuration
 */
function generateExtremeEXOSConfig(options) {
    const {
        authMethod, radiusServer, radiusSecret, backupServer, backupSecret,
        vlanAuth, vlanVoice, vlanGuest, vlanCritical, interface,
        enableMAB, authTimerReauthenticate
    } = options;
    
    let config = `# Extreme EXOS ${authMethod === 'dot1x' ? '802.1X' : authMethod === 'mab' ? 'MAB' : '802.1X with MAB'} Configuration
# Generated by Dot1Xer Supreme
# Date: ${new Date().toISOString().split('T')[0]}

# RADIUS Server Configuration
configure radius netlogin primary server ${radiusServer} client-ip <SWITCH_IP> vr "VR-Default"
configure radius netlogin primary shared-secret ${radiusSecret}
configure radius-accounting netlogin primary server ${radiusServer} client-ip <SWITCH_IP> vr "VR-Default"
configure radius-accounting netlogin primary shared-secret ${radiusSecret}
`;

    if (backupServer && backupSecret) {
        config += `
# Backup RADIUS Server Configuration
configure radius netlogin secondary server ${backupServer} client-ip <SWITCH_IP> vr "VR-Default"
configure radius netlogin secondary shared-secret ${backupSecret}
configure radius-accounting netlogin secondary server ${backupServer} client-ip <SWITCH_IP> vr "VR-Default"
configure radius-accounting netlogin secondary shared-secret ${backupSecret}
`;
    }

    config += `
# VLAN Configuration
create vlan "auth_vlan" tag ${vlanAuth}`;

    if (vlanVoice) {
        config += `
create vlan "voice_vlan" tag ${vlanVoice}`;
    }

    config += `
create vlan "guest_vlan" tag ${vlanGuest}`;

    if (vlanCritical) {
        config += `
create vlan "critical_vlan" tag ${vlanCritical}`;
    }

    config += `

# NetLogin Configuration
enable netlogin dot1x
`;

    if (enableMAB || authMethod === 'mab' || authMethod === 'dot1x-mab') {
        config += `enable netlogin mac
configure netlogin mac username format mac
configure netlogin mac authentication database radius
`;
    }

    config += `
configure netlogin add mac-list default
configure netlogin ports ${interface} mode ${authMethod === 'multi-auth' || authMethod === 'dot1x-mab' ? 'mac-compatible' : 'port-based-vlans'}
configure netlogin ports ${interface} ${enableMAB || authMethod === 'mab' || authMethod === 'dot1x-mab' ? 'enable mac' : 'disable mac'} enable dot1x
configure netlogin ports ${interface} dot1x guest-vlan guest_vlan
`;

    if (vlanCritical) {
        config += `configure netlogin ports ${interface} dot1x server-unavailable critical_vlan
`;
    }

    config += `
# 802.1X Authentication Settings
configure dot1x guest-vlan enable
configure netlogin dot1x timers reauth-period ${authTimerReauthenticate}
configure netlogin dot1x timers quiet-period 30
configure netlogin dot1x timers supp-resp-timeout 30

# Port Configuration
configure vlan auth_vlan add ports ${interface} tagged
`;

    if (vlanVoice) {
        config += `configure vlan voice_vlan add ports ${interface} tagged
configure port ${interface} voice vlan voice_vlan
`;
    }

    config += `
# End of Configuration
`;

    return config;
}

/**
 * Generate Huawei VRP configuration
 */
function generateHuaweiVRPConfig(options) {
    const {
        authMethod, radiusServer, radiusSecret, backupServer, backupSecret,
        vlanAuth, vlanVoice, vlanGuest, vlanCritical, interface,
        enableMAB, authTimerReauthenticate
    } = options;
    
    let config = `# Huawei VRP ${authMethod === 'dot1x' ? '802.1X' : authMethod === 'mab' ? 'MAB' : '802.1X with MAB'} Configuration
# Generated by Dot1Xer Supreme
# Date: ${new Date().toISOString().split('T')[0]}

# AAA Configuration
aaa
 authentication-scheme dot1x-auth
  authentication-mode radius
 authorization-scheme dot1x-author
  authorization-mode radius
 accounting-scheme dot1x-acct
  accounting-mode radius
  accounting start-stop
 domain dot1x-domain
  authentication-scheme dot1x-auth
  authorization-scheme dot1x-author
  accounting-scheme dot1x-acct
  radius-server ${radiusServer}`;

    if (backupServer) {
        config += `
  radius-server ${backupServer}`;
    }

    config += `
 domain default enable dot1x-domain
quit

# RADIUS Server Configuration
radius-server template dot1x-radius
 radius-server shared-key cipher ${radiusSecret}
 radius-server authentication ${radiusServer} 1812
 radius-server accounting ${radiusServer} 1813`;

    if (backupServer && backupSecret) {
        config += `
 radius-server shared-key cipher ${backupSecret}
 radius-server authentication ${backupServer} 1812
 radius-server accounting ${backupServer} 1813`;
    }

    config += `
 radius-server retransmit 2
 radius-server timeout 5
 undo radius-server user-name domain-included
quit

# VLAN Configuration
vlan ${vlanAuth}
 description Auth-VLAN
quit`;

    if (vlanVoice) {
        config += `
vlan ${vlanVoice}
 description Voice-VLAN
quit`;
    }

    config += `
vlan ${vlanGuest}
 description Guest-VLAN
quit`;

    if (vlanCritical) {
        config += `
vlan ${vlanCritical}
 description Critical-VLAN
quit`;
    }

    config += `

# Global 802.1X Configuration
dot1x enable
dot1x timer reauth-period ${authTimerReauthenticate}
dot1x timer quiet-period 30
dot1x timer supp-timeout 30
dot1x retry 3
dot1x authentication-method eap

# Interface Configuration
interface ${interface}
 description 802.1X Authentication Port
 port link-type access
 port default vlan ${vlanAuth}`;

    if (vlanVoice) {
        config += `
 voice vlan ${vlanVoice}`;
    }

    config += `
 dot1x enable
 dot1x guest-vlan ${vlanGuest}`;

    if (vlanCritical) {
        config += `
 dot1x critical vlan ${vlanCritical}`;
    }

    if (authMethod === 'multi-auth' || authMethod === 'dot1x-mab') {
        config += `
 dot1x port-control auto
 dot1x port-method macbased`;
    } else if (authMethod === 'multi-host') {
        config += `
 dot1x port-control auto
 dot1x port-method portbased`;
    } else {
        config += `
 dot1x port-control auto
 dot1x port-method portbased`;
    }

    if (enableMAB || authMethod === 'mab' || authMethod === 'dot1x-mab') {
        config += `
 mac-authentication enable`;
    }

    config += `
 stp edged-port enable
 stp bpdu-protection enable
quit

# End of Configuration
`;

    return config;
}

/**
 * Generate HP ProCurve configuration
 */
function generateHPProcurveConfig(options) {
    const {
        authMethod, radiusServer, radiusSecret, backupServer, backupSecret,
        vlanAuth, vlanVoice, vlanGuest, vlanCritical, interface,
        enableMAB, authTimerReauthenticate
    } = options;
    
    let config = `; HP ProCurve ${authMethod === 'dot1x' ? '802.1X' : authMethod === 'mab' ? 'MAB' : '802.1X with MAB'} Configuration
; Generated by Dot1Xer Supreme
; Date: ${new Date().toISOString().split('T')[0]}

; RADIUS Server Configuration
radius-server host ${radiusServer} key ${radiusSecret}`;

    if (backupServer && backupSecret) {
        config += `
radius-server host ${backupServer} key ${backupSecret}`;
    }

    config += `
radius-server timeout 5
radius-server retransmit 3
radius-server dead-time 10

; AAA Configuration
aaa authentication port-access eap-radius
aaa port-access authenticator ${interface}
aaa port-access authenticator ${interface} auth-vid ${vlanAuth}
aaa port-access authenticator ${interface} unauth-vid ${vlanGuest}`;

    if (vlanCritical) {
        config += `
aaa port-access authenticator ${interface} server-fail-vid ${vlanCritical}`;
    }

    config += `
aaa port-access authenticator ${interface} reauth-period ${authTimerReauthenticate}
aaa port-access authenticator ${interface} quiet-period 30
aaa port-access authenticator ${interface} tx-period 30
aaa port-access authenticator ${interface} supplicant-timeout 30
aaa port-access authenticator ${interface} server-timeout 30
aaa port-access authenticator ${interface} max-requests 2
aaa port-access authenticator ${interface} max-retries 3`;

    if (authMethod === 'multi-auth' || authMethod === 'dot1x-mab') {
        config += `
aaa port-access authenticator ${interface} client-limit 32`;
    }

    if (enableMAB || authMethod === 'mab' || authMethod === 'dot1x-mab') {
        config += `
aaa port-access mac-auth ${interface}
aaa port-access mac-auth ${interface} addr-format no-delimiter
aaa port-access mac-auth ${interface} reauth-period ${authTimerReauthenticate}
aaa port-access mac-auth ${interface} quiet-period 30`;
    }

    config += `
aaa port-access ${interface} controlled-direction in

; VLAN Configuration
vlan ${vlanAuth}
   name "AUTH-VLAN"`;

    if (vlanVoice) {
        config += `
vlan ${vlanVoice}
   name "VOICE-VLAN"
   voice`;
    }

    config += `
vlan ${vlanGuest}
   name "GUEST-VLAN"`;

    if (vlanCritical) {
        config += `
vlan ${vlanCritical}
   name "CRITICAL-VLAN"`;
    }

    config += `

; Interface Configuration
interface ${interface}
   name "802.1X-Port"
   tagged vlan ${vlanAuth}`;

    if (vlanVoice) {
        config += `
   tagged vlan ${vlanVoice}`;
    }

    config += `
   untagged vlan ${vlanGuest}
   spanning-tree admin-edge-port
   spanning-tree bpdu-protection
   no lacp

; Enable Authentication
aaa port-access authenticator active

; End of Configuration
`;

    return config;
}

/**
 * Generate Multi-Vendor configuration
 */
function generateMultiVendorConfig(options) {
    const {
        authMethod, radiusServer, radiusSecret, backupServer, backupSecret,
        vlanAuth, vlanVoice, vlanGuest, vlanCritical
    } = options;
    
    let config = `# Multi-Vendor 802.1X Configuration Guide
# Generated by Dot1Xer Supreme
# Date: ${new Date().toISOString().split('T')[0]}

############################################################
# RADIUS SERVER CONFIGURATION
############################################################

# FreeRADIUS Configuration
# -----------------------
# In /etc/freeradius/3.0/clients.conf:

client CiscoSwitches {
    ipaddr = 192.168.1.0/24
    secret = ${radiusSecret}
    nas_type = cisco
}

client ArubaControllers {
    ipaddr = 192.168.2.0/24
    secret = ${radiusSecret}
    nas_type = other
}

client JuniperSwitches {
    ipaddr = 192.168.3.0/24
    secret = ${radiusSecret}
    nas_type = other
}

############################################################
# CISCO IOS CONFIGURATION
############################################################

! Global AAA Configuration
aaa new-model
aaa authentication dot1x default group radius
aaa authorization network default group radius
aaa accounting dot1x default start-stop group radius

! RADIUS Server Configuration
radius server PRIMARY
 address ipv4 ${radiusServer} auth-port 1812 acct-port 1813
 key ${radiusSecret}
`;

    if (backupServer && backupSecret) {
        config += `
radius server BACKUP
 address ipv4 ${backupServer} auth-port 1812 acct-port 1813
 key ${backupSecret}
`;
    }

    config += `
! Interface Configuration
interface GigabitEthernet1/0/1
 switchport mode access
 switchport access vlan ${vlanAuth}
 authentication host-mode multi-auth
 authentication port-control auto
 authentication periodic
 dot1x pae authenticator
 spanning-tree portfast

############################################################
# ARUBA AOS-CX CONFIGURATION
############################################################

! RADIUS Server Configuration
radius-server host ${radiusServer} key ${radiusSecret}
`;

    if (backupServer && backupSecret) {
        config += `radius-server host ${backupServer} key ${backupSecret}
`;
    }

    config += `
! Interface Configuration
interface 1/1/1
 aaa authentication port-access dot1x authenticator
 aaa authentication port-access mac-auth
 aaa authentication port-access authenticator active
 aaa port-access role-based auth-role ${vlanAuth}
 aaa port-access role-based unauth-role ${vlanGuest}

############################################################
# JUNIPER EX CONFIGURATION
############################################################

# RADIUS Server Configuration
system {
    radius-server {
        ${radiusServer} {
            port 1812;
            accounting-port 1813;
            secret "${radiusSecret}";
        }
    }
}

# Interface Configuration
protocols {
    dot1x {
        authenticator {
            authentication-profile-name dot1x-profile;
            interface {
                ge-0/0/1 {
                    supplicant multiple;
                    guest-vlan ${vlanGuest};
                }
            }
        }
    }
}

############################################################
# EXTREME EXOS CONFIGURATION
############################################################

# RADIUS Configuration
configure radius netlogin primary server ${radiusServer} client-ip <SWITCH_IP> vr "VR-Default"
configure radius netlogin primary shared-secret ${radiusSecret}

# NetLogin Configuration
enable netlogin dot1x
enable netlogin mac
configure netlogin ports 1 mode mac-compatible

############################################################
# HP PROCURVE CONFIGURATION
############################################################

; RADIUS Server
radius-server host ${radiusServer} key ${radiusSecret}

; AAA Configuration
aaa authentication port-access eap-radius
aaa port-access authenticator 1
aaa port-access authenticator 1 auth-vid ${vlanAuth}
aaa port-access authenticator 1 unauth-vid ${vlanGuest}

############################################################
# COMMON CONFIGURATION NOTES
############################################################

# RADIUS Attribute-Value Pairs for VLAN Assignment:
# ------------------------------------------------
# Tunnel-Type = VLAN (13)
# Tunnel-Medium-Type = IEEE-802 (6)
# Tunnel-Private-Group-ID = ${vlanAuth} (for authenticated users)
# Tunnel-Private-Group-ID = ${vlanGuest} (for guest/unauthenticated users)
`;

    if (vlanVoice) {
        config += `# Tunnel-Private-Group-ID = ${vlanVoice} (for voice devices)
`;
    }

    config += `
# RADIUS Change of Authorization (CoA) Requirements:
# -------------------------------------------------
# - Enable CoA on RADIUS server
# - Configure network devices to accept CoA packets from RADIUS server IP
# - Use the same shared secret for CoA as for authentication
# - Ensure UDP port 3799 is open between RADIUS server and network devices

# End of Multi-Vendor Configuration Guide
`;

    return config;
}

/**
 * Create simulated discovery results for demonstration
 */
function populateDiscoveryResults() {
    const resultsBody = document.getElementById('discovery-results-body');
    if (!resultsBody) return;
    
    // Clear existing results
    resultsBody.innerHTML = '';
    
    // Simulated discovery results
    const discoveryResults = [
        { ip: '192.168.1.10', hostname: 'SWITCH-CORE-01', vendor: 'Cisco', platform: 'IOS-XE', status: 'Configured', statusClass: 'success' },
        { ip: '192.168.1.11', hostname: 'SWITCH-ACCESS-01', vendor: 'Cisco', platform: 'IOS', status: 'Not Configured', statusClass: 'error' },
        { ip: '192.168.1.12', hostname: 'SWITCH-ACCESS-02', vendor: 'Cisco', platform: 'IOS', status: 'Partially Configured', statusClass: 'warning' },
        { ip: '192.168.1.20', hostname: 'SWITCH-ARUBA-01', vendor: 'Aruba', platform: 'AOS-CX', status: 'Not Configured', statusClass: 'error' },
        { ip: '192.168.1.30', hostname: 'SWITCH-JUNIPER-01', vendor: 'Juniper', platform: 'EX Series', status: 'Not Configured', statusClass: 'error' },
        { ip: '192.168.1.40', hostname: 'SWITCH-EXTREME-01', vendor: 'Extreme', platform: 'EXOS', status: 'Not Supported', statusClass: 'info' },
        { ip: '192.168.1.50', hostname: 'WLC-CISCO-01', vendor: 'Cisco', platform: 'WLC', status: 'Configured', statusClass: 'success' }
    ];
    
    // Populate results table
    discoveryResults.forEach(result => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${result.ip}</td>
            <td>${result.hostname}</td>
            <td>${result.vendor}</td>
            <td>${result.platform}</td>
            <td><span class="status-badge status-${result.statusClass}">${result.status}</span></td>
            <td>
                <button class="secondary-button small-button">Configure</button>
                <button class="secondary-button small-button">Details</button>
            </td>
        `;
        
        resultsBody.appendChild(row);
    });
    
    // Update discovery count
    document.getElementById('discovery-count').textContent = discoveryResults.length;
    
    // Populate vendor filter
    const vendorFilter = document.getElementById('vendor-filter');
    if (vendorFilter) {
        // Clear existing options except the first one
        while (vendorFilter.options.length > 1) {
            vendorFilter.remove(1);
        }
        
        // Get unique vendors
        const vendors = [...new Set(discoveryResults.map(result => result.vendor))];
        
        // Add vendor options
        vendors.forEach(vendor => {
            const option = document.createElement('option');
            option.value = vendor;
            option.textContent = vendor;
            vendorFilter.appendChild(option);
        });
    }
    
    // Populate platform filter
    const platformFilter = document.getElementById('platform-filter');
    if (platformFilter) {
        // Clear existing options except the first one
        while (platformFilter.options.length > 1) {
            platformFilter.remove(1);
        }
        
        // Get unique platforms
        const platforms = [...new Set(discoveryResults.map(result => result.platform))];
        
        // Add platform options
        platforms.forEach(platform => {
            const option = document.createElement('option');
            option.value = platform;
            option.textContent = platform;
            platformFilter.appendChild(option);
        });
    }
}

/**
 * Simulate AI analysis for demo purposes
 */
function simulateAIAnalysis(input) {
    if (input.includes('dot1x') || input.includes('802.1X')) {
        return `I've analyzed your 802.1X configuration. Here are my findings:

1. Authentication Method: Using 802.1X with MAB fallback
2. RADIUS Server: Properly configured with primary and secondary servers
3. VLAN Configuration: Authenticated, Guest, and Voice VLANs are defined

Potential issues:
- No critical VLAN defined for RADIUS server failure scenarios
- Reauthentication period set to 3600 seconds (1 hour), which is standard but you might want to consider a longer period for production
- CoA (Change of Authorization) is not explicitly enabled, which limits dynamic policy changes

Overall, this is a solid configuration with minor enhancements possible.`;
    } else if (input.toLowerCase().includes('radius')) {
        return `I've analyzed your RADIUS server configuration:

The configuration appears to be for a Cisco device with primary and backup RADIUS servers.

Key aspects:
- Authentication port: 1812 (standard)
- Accounting port: 1813 (standard)
- Shared secrets are defined for both servers
- Timeout: 5 seconds
- Retransmit: 3 attempts

Recommendations:
1. Consider implementing RADIUS server groups for better organization
2. Add RADIUS server deadtime (recommended: 15 minutes) to prevent unnecessary timeouts
3. Enable RADIUS Change of Authorization (CoA) for dynamic authorization changes`;
    } else {
        return `I've analyzed your input, but I don't see any specific 802.1X or RADIUS configuration to analyze. 

If you'd like me to analyze a configuration, please provide:
- Network device configuration containing 802.1X settings
- RADIUS server configuration
- Authentication policies

Alternatively, I can help generate a new configuration based on your requirements. Just select the "Generate" mode and describe what you need.`;
    }
}

/**
 * Simulate AI improvement suggestions for demo purposes
 */
function simulateAIImprovement(input) {
    if (input.includes('dot1x') || input.includes('802.1X')) {
        return `Based on your current configuration, here are recommended improvements:

1. Security Enhancements:
   - Add CoA support: \`aaa server radius dynamic-author\`
   - Implement RADIUS accounting for better tracking
   - Enable BPDU guard on all 802.1X ports to prevent switching loop attacks

2. Resilience Improvements:
   - Configure a critical VLAN for RADIUS server unavailability
   - Add RADIUS server deadtime parameter (15 minutes recommended)
   - Implement server groups with proper failover

3. Performance Optimizations:
   - Increase reauthentication period to 24 hours for production
   - Implement caching for successful authentications
   - Configure voice VLAN with appropriate QoS settings

4. Best Practices:
   - Implement Guest VLAN aging to periodically reassess unauthorized devices
   - Add appropriate logging commands for authentication events
   - Configure port security alongside 802.1X for additional protection

Would you like me to generate any of these improvements as configuration snippets?`;
    } else {
        return `I don't see enough context about your current configuration to make specific improvements. 

To receive tailored improvement suggestions, please provide:
- Your current 802.1X configuration
- Device type and platform (Cisco, Juniper, etc.)
- Any specific concerns or requirements you have

With this information, I can suggest specific improvements to enhance security, resilience, and performance of your 802.1X deployment.`;
    }
}

/**
 * Simulate AI configuration generation for demo purposes
 */
function simulateAIGeneration(input) {
    const config = `! AI-Generated 802.1X Configuration
! Generated based on your requirements
! Date: ${new Date().toISOString().split('T')[0]}

! Global AAA Configuration
aaa new-model
aaa authentication dot1x default group RADIUS-SERVERS
aaa authorization network default group RADIUS-SERVERS
aaa accounting dot1x default start-stop group RADIUS-SERVERS

! RADIUS Server Configuration
radius server PRIMARY
 address ipv4 10.1.1.100 auth-port 1812 acct-port 1813
 key SecureRADIUSKey123
 timeout 5
 retransmit 3

radius server BACKUP
 address ipv4 10.1.1.101 auth-port 1812 acct-port 1813
 key DifferentRADIUSKey456
 timeout 5
 retransmit 3

! RADIUS Server Group
aaa group server radius RADIUS-SERVERS
 server name PRIMARY
 server name BACKUP
 deadtime 15

! Enable 802.1X System-wide
dot1x system-auth-control

! Change of Authorization (CoA) Configuration
aaa server radius dynamic-author
 client 10.1.1.100 server-key SecureRADIUSKey123
 client 10.1.1.101 server-key DifferentRADIUSKey456
 auth-type any
 port 3799

! VLAN Configuration
vlan 100
 name AUTH_VLAN
vlan 101
 name VOICE_VLAN
vlan 102
 name GUEST_VLAN
vlan 103
 name CRITICAL_VLAN

! Access Ports Configuration (apply to appropriate interfaces)
interface range GigabitEthernet1/0/1-48
 description 802.1X Authentication Port
 switchport mode access
 switchport access vlan 100
 switchport voice vlan 101
 switchport nonegotiate
 
 ! Authentication settings
 authentication host-mode multi-auth
 authentication order dot1x mab
 authentication priority dot1x mab
 authentication port-control auto
 authentication periodic
 authentication timer reauthenticate 86400
 authentication timer restart 10
 authentication violation restrict
 
 ! 802.1X configuration
 dot1x pae authenticator
 dot1x timeout tx-period 10
 dot1x max-reauth-req 3
 
 ! MAB configuration
 mab
 
 ! Guest VLAN for authentication failures
 authentication event fail action authorize vlan 102
 
 ! Critical VLAN for RADIUS server unavailability
 authentication event server dead action authorize vlan 103
 authentication event server alive action reinitialize
 
 ! Spanning tree configuration
 spanning-tree portfast
 spanning-tree bpduguard enable

! End of Configuration`;

    return `Based on your requirements, I've generated this 802.1X configuration:

\`\`\`
${config}
\`\`\`

This configuration includes:
- 802.1X with MAB fallback
- Primary and backup RADIUS servers
- Separate VLANs for authenticated, voice, guest, and critical access
- CoA support for dynamic policy changes
- Best practice security settings (BPDU guard, violation restriction)
- 24-hour reauthentication to reduce network overhead

You can customize this further by updating the:
- RADIUS server IP addresses and keys
- VLAN IDs for different access types
- Interface ranges to apply the configuration
- Reauthentication timers based on your security policy`;
}

/**
 * Simulate AI explanation for demo purposes
 */
function simulateAIExplanation(input) {
    if (input.includes('dot1x') || input.includes('802.1X')) {
        return `Here's an explanation of key elements in this 802.1X configuration:

1. \`aaa new-model\`: Enables the AAA (Authentication, Authorization, Accounting) access control model, which is required for 802.1X.

2. \`aaa authentication dot1x default group RADIUS-SERVERS\`: Specifies that 802.1X authentication should use the RADIUS server group.

3. \`radius server PRIMARY\`: Defines the primary RADIUS server with its IP address, ports, and shared secret.

4. \`dot1x system-auth-control\`: Globally enables 802.1X on the switch.

5. \`authentication host-mode multi-auth\`: Allows multiple devices to authenticate independently on a single port.

6. \`authentication order dot1x mab\`: Attempts 802.1X first, then falls back to MAC Authentication Bypass.

7. \`authentication port-control auto\`: Enables authentication on the port but allows traffic from authenticated devices only.

8. \`authentication event fail action authorize vlan 102\`: Places devices that fail authentication into VLAN 102 (Guest VLAN).

9. \`authentication event server dead action authorize vlan 103\`: Places devices into VLAN 103 (Critical VLAN) if RADIUS servers are unreachable.

10. \`spanning-tree portfast\` and \`spanning-tree bpduguard enable\`: Enables PortFast and BPDU Guard to prevent switching loops.

This configuration creates a robust 802.1X implementation with fallback mechanisms for devices that can't authenticate via 802.1X and for situations where RADIUS servers are unavailable.`;
    } else {
        return `I don't see a specific 802.1X configuration to explain. Please provide your configuration snippet or ask about specific 802.1X concepts you'd like explained.

Common 802.1X concepts:

- 802.1X: A standard for port-based network access control
- Supplicant: The client device requesting network access
- Authenticator: The network device (switch/AP) that enforces authentication
- Authentication Server: The RADIUS server that validates credentials
- MAB (MAC Authentication Bypass): Fallback method that uses the device's MAC address
- Guest VLAN: VLAN for devices that fail authentication
- Critical VLAN: VLAN used when authentication servers are unreachable
- CoA (Change of Authorization): Allows dynamic policy changes after authentication

Would you like me to explain any of these concepts in more detail?`;
    }
}

/**
 * Copy configuration output to clipboard
 */
function copyConfigOutput() {
    const outputEl = document.getElementById('config-output');
    const text = outputEl.textContent;
    
    // Use clipboard API if available
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text)
            .then(() => {
                // Show success indicator
                const copyBtn = document.getElementById('copy-output');
                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'Copied!';
                
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                }, 2000);
            })
            .catch(err => {
                console.error('Error copying text: ', err);
                alert('Failed to copy to clipboard. Please select and copy the text manually.');
            });
    } else {
        // Fallback for browsers without clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                const copyBtn = document.getElementById('copy-output');
                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'Copied!';
                
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                }, 2000);
            } else {
                alert('Failed to copy to clipboard. Please select and copy the text manually.');
            }
        } catch (err) {
            console.error('Error copying text: ', err);
            alert('Failed to copy to clipboard. Please select and copy the text manually.');
        }
        
        document.body.removeChild(textArea);
    }
}

/**
 * Download configuration output as a file
 */
function downloadConfigOutput() {
    const outputEl = document.getElementById('config-output');
    const text = outputEl.textContent;
    
    // Get selected vendor and platform for filename
    const selectedVendorElement = document.querySelector('.vendor-card.selected');
    const vendor = selectedVendorElement ? selectedVendorElement.dataset.vendor : 'config';
    const platform = document.getElementById('platform').value || 'all';
    const authMethod = document.getElementById('auth-method').value || 'dot1x';
    
    // Create filename
    const dateStr = new Date().toISOString().split('T')[0];
    const filename = `${vendor}_${platform}_${authMethod}_${dateStr}.conf`;
    
    // Create download link
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    
    element.style.display = 'none';
    document.body.appendChild(element);
    
    element.click();
    
    document.body.removeChild(element);
}
