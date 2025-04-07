/**
 * Dot1Xer Supreme - Main JavaScript
 * Version: 3.0.0
 */

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    populateVendorSelector();
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
    
    // Initialize help tips
    initializeHelpTips();
}

/**
 * Setup event listeners for interactive elements
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
}

/**
 * Populate the vendor selector with vendor cards
 */
function populateVendorSelector() {
    const vendorSelector = document.querySelector('.vendor-selector');
    if (!vendorSelector) return;
    
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
    
    if (authMethod === 'dot1x-mab' || authMethod === 'mab') {
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
