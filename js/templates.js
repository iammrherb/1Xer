/**
 * Dot1Xer Supreme - Templates Management
 * Functions for managing configuration templates
 */

// Initialize templates when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTemplateListeners();
    loadTemplates();
});

/**
 * Initialize template-related event listeners
 */
function initializeTemplateListeners() {
    // Template list item click event
    document.querySelectorAll('.template-item').forEach(item => {
        item.addEventListener('click', function() {
            selectTemplate(this);
        });
    });
    
    // Template search functionality
    document.getElementById('template-search').addEventListener('input', function() {
        searchTemplates(this.value);
    });
    
    // New template button click event
    document.getElementById('new-template').addEventListener('click', function() {
        createNewTemplate();
    });
    
    // Template action buttons
    document.getElementById('copy-template').addEventListener('click', function() {
        copyTemplateToClipboard();
    });
    
    document.getElementById('load-template').addEventListener('click', function() {
        loadTemplateToEditor();
    });
    
    document.getElementById('edit-template').addEventListener('click', function() {
        editTemplate();
    });
    
    document.getElementById('delete-template').addEventListener('click', function() {
        deleteTemplate();
    });
}

/**
 * Load templates from storage or API
 */
function loadTemplates() {
    // This function would normally load templates from localStorage, IndexedDB, or a server API
    // For this example, we'll use the templates that are already in the HTML
    
    // Select the first template by default
    const firstTemplate = document.querySelector('.template-item');
    if (firstTemplate) {
        selectTemplate(firstTemplate);
    }
}

/**
 * Select a template from the list
 * @param {HTMLElement} templateItem - The template item element that was clicked
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
    
    // Show template configuration and hide description
    document.getElementById('template-description').style.display = 'none';
    document.getElementById('template-config').classList.remove('hidden');
    
    // Load template configuration based on the template category
    const category = templateItem.getAttribute('data-category');
    const templateName = templateItem.textContent;
    
    // Simulate loading template configuration
    let templateConfig = '';
    
    switch (category) {
        case 'cisco':
            if (templateName.includes('ISE')) {
                templateConfig = getCiscoISETemplate();
            } else {
                templateConfig = getCiscoGeneralTemplate();
            }
            break;
        case 'aruba':
            templateConfig = getArubaClearPassTemplate();
            break;
        case 'juniper':
            templateConfig = getJuniperBasicTemplate();
            break;
        case 'fortinet':
            templateConfig = getFortinetNACTemplate();
            break;
        case 'multi-vendor':
            if (templateName.includes('Healthcare')) {
                templateConfig = getMultiVendorHealthcareTemplate();
            } else if (templateName.includes('Education')) {
                templateConfig = getMultiVendorEducationTemplate();
            } else {
                templateConfig = getMultiVendorEnterpriseTemplate();
            }
            break;
        case 'wireless':
            templateConfig = getWirelessControllerTemplate();
            break;
        case 'guest':
            templateConfig = getGuestAccessTemplate();
            break;
        case 'byod':
            templateConfig = getBYODOnboardingTemplate();
            break;
        default:
            templateConfig = '# Template configuration not available.';
    }
    
    // Update the template code display
    document.getElementById('template-code').textContent = templateConfig;
}

/**
 * Search templates by keyword
 * @param {string} query - The search query
 */
function searchTemplates(query) {
    query = query.toLowerCase();
    
    document.querySelectorAll('.template-item').forEach(item => {
        const templateName = item.textContent.toLowerCase();
        const templateCategory = item.getAttribute('data-category').toLowerCase();
        
        if (templateName.includes(query) || templateCategory.includes(query)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

/**
 * Create a new template
 */
function createNewTemplate() {
    // Show a dialog to name the template and select category
    const templateName = prompt('Enter a name for the new template:');
    
    if (!templateName) {
        return; // User cancelled
    }
    
    // Get the current configuration from the main configuration editor
    const config = document.getElementById('config-result').textContent;
    
    if (config === '# Configuration will appear here after generation.') {
        alert('Please generate a configuration first.');
        return;
    }
    
    // Get the vendor for category
    const vendor = document.getElementById('vendor').value || 'multi-vendor';
    
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
    saveTemplate(templateName, vendor, config);
    
    // Select the new template
    selectTemplate(newTemplateItem);
    
    alert(`Template "${templateName}" created successfully!`);
}

/**
 * Save a template to storage or API
 * @param {string} name - The name of the template
 * @param {string} category - The category of the template
 * @param {string} config - The template configuration
 */
function saveTemplate(name, category, config) {
    // This function would normally save the template to localStorage, IndexedDB, or a server API
    // For this example, we'll just simulate saving
    console.log(`Template "${name}" saved in category "${category}"`);
}

/**
 * Copy template configuration to clipboard
 */
function copyTemplateToClipboard() {
    const templateCode = document.getElementById('template-code').textContent;
    
    // Create a temporary textarea to copy from
    const textarea = document.createElement('textarea');
    textarea.value = templateCode;
    document.body.appendChild(textarea);
    
    // Select and copy
    textarea.select();
    document.execCommand('copy');
    
    // Clean up
    document.body.removeChild(textarea);
    
    // Show success message
    alert('Template configuration copied to clipboard!');
}

/**
 * Load template to main configuration editor
 */
function loadTemplateToEditor() {
    const templateCode = document.getElementById('template-code').textContent;
    
    // Load the template code to the main configuration editor
    document.getElementById('config-result').textContent = templateCode;
    
    // Switch to the Configuration tab
    document.querySelector('nav a[data-tab="config"]').click();
    
    // Show success message
    alert('Template loaded to configuration editor!');
}

/**
 * Edit the selected template
 */
function editTemplate() {
    const templateName = document.getElementById('template-title').textContent;
    const templateCode = document.getElementById('template-code').textContent;
    
    // In a real app, this would open an editor dialog
    // For this example, we'll just show a prompt with the current code
    const newCode = prompt('Edit template configuration:', templateCode);
    
    if (newCode !== null) {
        // Update the template code display
        document.getElementById('template-code').textContent = newCode;
        
        // Save the updated template (simulated)
        const category = document.querySelector('.template-item.active').getAttribute('data-category');
        saveTemplate(templateName, category, newCode);
        
        alert(`Template "${templateName}" updated successfully!`);
    }
}

/**
 * Delete the selected template
 */
function deleteTemplate() {
    const templateName = document.getElementById('template-title').textContent;
    
    // Confirm deletion
    if (!confirm(`Are you sure you want to delete the template "${templateName}"?`)) {
        return;
    }
    
    // Remove the template item from the list
    const activeTemplate = document.querySelector('.template-item.active');
    activeTemplate.remove();
    
    // Show the template description and hide configuration
    document.getElementById('template-description').style.display = '';
    document.getElementById('template-config').classList.add('hidden');
    document.getElementById('template-title').textContent = 'Select a Template';
    
    // Select the first template if available
    const firstTemplate = document.querySelector('.template-item');
    if (firstTemplate) {
        selectTemplate(firstTemplate);
    }
    
    // Show success message
    alert(`Template "${templateName}" deleted successfully!`);
}

/**
 * The following functions return example template configurations
 * In a real implementation, these would be loaded from storage or an API
 */

function getCiscoGeneralTemplate() {
    return `! Cisco General Purpose 802.1X Configuration
! Generated by Dot1Xer Supreme
! Last updated: 2023-10-15

! RADIUS Server Configuration
radius server PRIMARY
 address ipv4 10.1.1.100 auth-port 1812 acct-port 1813
 key SecureRadiusKey123
 timeout 5
 retransmit 3
 
radius server BACKUP
 address ipv4 10.1.1.101 auth-port 1812 acct-port 1813
 key SecureRadiusKey123
 timeout 5
 retransmit 3

aaa new-model
aaa authentication dot1x default group radius
aaa authorization network default group radius
aaa accounting dot1x default start-stop group radius

! Global 802.1X Configuration
dot1x system-auth-control
authentication mac-move permit

! Interface Configuration Template
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
 client 10.1.1.100 server-key SecureRadiusKey123
 client 10.1.1.101 server-key SecureRadiusKey123`;
}

function getCiscoISETemplate() {
    return `! Cisco ISE Integration 802.1X Configuration
! Generated by Dot1Xer Supreme
! Last updated: 2023-10-15

! ISE RADIUS Server Configuration
radius server ISE-1
 address ipv4 10.1.1.100 auth-port 1812 acct-port 1813
 key ISEradiusKey123!
 timeout 5
 retransmit 3
 automate-tester username probe-user password 7 0214055F5A545C
 
radius server ISE-2
 address ipv4 10.1.1.101 auth-port 1812 acct-port 1813
 key ISEradiusKey123!
 timeout 5
 retransmit 3
 automate-tester username probe-user password 7 0214055F5A545C

aaa group server radius ISE-SERVERS
 server name ISE-1
 server name ISE-2
 deadtime 15
 load-balance method least-outstanding

aaa new-model
aaa authentication dot1x default group ISE-SERVERS
aaa authorization network default group ISE-SERVERS
aaa accounting dot1x default start-stop group ISE-SERVERS
aaa accounting update newinfo periodic 2880

! Global 802.1X Configuration
dot1x system-auth-control
dot1x critical eapol
authentication mac-move permit
device-tracking tracking
ip device tracking

! Interface Configuration Template
interface range GigabitEthernet1/0/1 - 48
 switchport mode access
 switchport access vlan 10
 switchport voice vlan 20
 authentication event fail action authorize vlan 999
 authentication event server dead action authorize vlan 999
 authentication event server alive action reinitialize
 authentication host-mode multi-domain
 authentication open
 authentication order dot1x mab
 authentication priority dot1x mab
 authentication port-control auto
 authentication periodic
 authentication timer reauthenticate server
 authentication violation replace
 mab
 dot1x pae authenticator
 dot1x timeout tx-period 10
 dot1x max-reauth-req 2
 spanning-tree portfast
 
! RADIUS Change of Authorization (CoA) Support
aaa server radius dynamic-author
 client 10.1.1.100 server-key ISEradiusKey123!
 client 10.1.1.101 server-key ISEradiusKey123!
 auth-type any
 port 1700
 
! Profiling Configuration
device-sensor filter-spec dhcp include list DHCP-PARAMS
device-sensor filter-spec http include list HTTP-PARAMS
device-sensor filter-list dhcp list DHCP-PARAMS
 option name host-name
 option name class-identifier
 option name client-identifier
device-sensor filter-list http list HTTP-PARAMS
 signature field user-agent
device-sensor notify all-changes

ip dhcp snooping
ip dhcp snooping vlan 10,20,999`;
}

function getArubaClearPassTemplate() {
    return `! Aruba ClearPass Integration Configuration
! Generated by Dot1Xer Supreme
! Last updated: 2023-10-15

! ClearPass RADIUS Server Configuration
aaa authentication-server radius "ClearPass-1"
 host 10.1.1.100
 key ClearPassKey123!
 timeout 5
 retransmit 3
 cppm username "aruba-switch" password 8e77c296e9e86cf

aaa authentication-server radius "ClearPass-2"
 host 10.1.1.101
 key ClearPassKey123!
 timeout 5
 retransmit 3
 cppm username "aruba-switch" password 8e77c296e9e86cf

aaa server-group "ClearPass-Servers"
 auth-server "ClearPass-1"
 auth-server "ClearPass-2"
 load-balance
 deadtime 15

! Authentication Configuration
aaa authentication dot1x "dot1x-auth"
 server-group "ClearPass-Servers"
 reauthentication
 timer reauth-period server
 max-requests 2
 quiet-period 5
 tx-period 10

aaa authentication mac-auth "mac-auth"
 server-group "ClearPass-Servers"
 delimiter colon
 case upper
 
aaa authentication port-access
 dot1x authenticator
 reauthenticate
 enable

! User Roles
aaa authorization user-role "auth-role"
 vlan 10
 
aaa authorization user-role "unauth-role"
 vlan 999
 
aaa authorization user-role "guest-role"
 vlan 20
 captive-portal

! Interface Configuration
interface range 1/1-1/48
 aaa authentication port-access dot1x authenticator
 aaa authentication port-access mab
 aaa port-access authentication 1
 aaa port-access mac-auth 1
 aaa port-access authenticator active
 aaa port-access authenticator port-control auto
 aaa port-access authenticator reauthenticate
 aaa port-access authenticator logoff-period 300
 aaa port-access mac-auth 1
 spanning-tree port-config admin-edge

! Global 802.1X Configuration
port-access role-based
device-profile enable
device-profile role-based-mode

! ClearPass CoA Configuration
aaa authentication-server radius "ClearPass-1" dynamic-authorization
aaa authentication-server radius "ClearPass-2" dynamic-authorization
aaa port-access dynamic-authorization
radius-server-group "ClearPass-Servers" dynamic-authorization`;
}

function getJuniperBasicTemplate() {
    return `# Juniper Basic 802.1X Configuration
# Generated by Dot1Xer Supreme
# Last updated: 2023-10-15

system {
    radius-server {
        10.1.1.100 {
            secret "$9$gg4JD.P5Q/AtOcyrev"; # "JuniperRadiusKey123"
            timeout 5;
            retry 3;
            source-address 10.0.0.1;
            port 1812;
            accounting-port 1813;
        }
        10.1.1.101 {
            secret "$9$gg4JD.P5Q/AtOcyrev"; # "JuniperRadiusKey123"
            timeout 5;
            retry 3;
            source-address 10.0.0.1;
            port 1812;
            accounting-port 1813;
        }
    }
}

access {
    radius-server {
        10.1.1.100 {
            port 1812;
            accounting-port 1813;
            secret "$9$gg4JD.P5Q/AtOcyrev"; # "JuniperRadiusKey123"
            timeout 5;
            retry 3;
            source-address 10.0.0.1;
        }
        10.1.1.101 {
            port 1812;
            accounting-port 1813;
            secret "$9$gg4JD.P5Q/AtOcyrev"; # "JuniperRadiusKey123"
            timeout 5;
            retry 3;
            source-address 10.0.0.1;
        }
    }
    profile dot1x-profile {
        authentication-protocol dot1x;
        supplicant multiple;
        transmit-period 5;
        mac-radius {
            restrict;
        }
        retries 3;
        quiet-period 5;
        supplicant-timeout 30;
        server-timeout 30;
        server-reject-vlan 999;
        server-fail-vlan 999;
        guest-vlan 20;
        eapol-block;
    }
}

protocols {
    dot1x {
        authenticator {
            authentication-profile-name dot1x-profile;
            interface {
                ge-0/0/0.0 {
                    supplicant multiple;
                    retries 3;
                    quiet-period 5;
                    transmit-period 5;
                    mac-radius;
                    server-fail vlan-name fail-vlan;
                    guest-vlan guest-vlan;
                }
                # Apply to other interfaces as needed
            }
        }
    }
}

class-of-service {
    interfaces {
        ge-0/0/0 {
            unit 0 {
                classifiers {
                    ieee-802.1 voice-classifier forwarding-class voice-traffic;
                }
            }
        }
    }
}`;
}

function getFortinetNACTemplate() {
    return `# FortiGate NAC Configuration
# Generated by Dot1Xer Supreme
# Last updated: 2023-10-15

config user radius
    edit "FortiAuthServer"
        set server "10.1.1.100"
        set secret ENC TH1s+i5_@_53CRE+
        set auth-type auto
        set source-ip 192.168.1.1
        set nas-ip 192.168.1.1
        set acct-interim-interval 600
    next
end

config user group
    edit "NAC-Users"
        set member "FortiAuthServer"
    next
    edit "Guest-Users"
        set member "FortiAuthServer"
    next
end

config user nac-policy
    edit 1
        set name "Corporate-Policy"
        set description "Policy for corporate devices"
        set category device
        set status enable
        set user-groups "NAC-Users"
        set host-type windows-pc
        set ems-tag enable
        set switch-fortilink "FortiSwitch-Link"
        set switch-mac 00:01:02:03:04:05
        set switch-ports "port1" "port2" "port3"
        set switch-port-mode 802.1x
        set switch-auth-type 802.1x-mac
        set auth-vlan-id 10
        set unauth-vlan-id 999
    next
    edit 2
        set name "Guest-Policy"
        set description "Policy for guest devices"
        set category device
        set status enable
        set user-groups "Guest-Users"
        set host-type unknown
        set switch-fortilink "FortiSwitch-Link"
        set switch-mac 00:01:02:03:04:05
        set switch-ports "port4" "port5" "port6"
        set switch-port-mode 802.1x
        set switch-auth-type 802.1x-mac
        set auth-vlan-id 20
        set unauth-vlan-id 999
    next
end

config system interface
    edit "port1"
        set vdom "root"
        set mode static
        set ip 192.168.1.1 255.255.255.0
        set allowaccess ping https ssh snmp
        set type physical
        set nac enable
        set nac-policy "Corporate-Policy"
    next
end

config system global
    set radius-port 1812
    set admin-radius-timeout 10
    set admin-lockout-threshold 3
    set admin-lockout-duration 300
end

# FortiSwitch Configuration (managed by FortiGate)
config switch-controller managed-switch
    edit "S124DP12345678"
        config ports
            edit "port1"
                set poe-status enable
                set vlan-mode tagged
                set native-vlan 10
                set allowed-vlans 10 20 999
                set nac enable
                set nac-profile "Corporate-Policy"
                set security-policy "port-security-policy"
                set dhcp-snooping enable
                set arp-inspection enable
            next
        end
    next
end

config switch-controller security-policy 802-1X
    edit "port-security-policy"
        set security-mode 802.1X
        set user-group "NAC-Users"
        set mac-auth-bypass enable
        set eap-passthrough enable
        set guest-vlan enable
        set guest-vlan-id 20
        set auth-fail-vlan enable
        set auth-fail-vlan-id 999
        set radius-timeout-overwrite enable
        set auth-max-users 3
    next
end`;
}

function getMultiVendorHealthcareTemplate() {
    return `# Multi-Vendor Healthcare 802.1X Configuration
# Generated by Dot1Xer Supreme
# Last updated: 2023-10-15

##############################################
# RADIUS Server Configuration
##############################################

# Cisco Configuration
radius server PRIMARY
 address ipv4 10.1.1.100 auth-port 1812 acct-port 1813
 key HealthcareRad1us!
 timeout 5
 retransmit 3
 
radius server BACKUP
 address ipv4 10.1.1.101 auth-port 1812 acct-port 1813
 key HealthcareRad1us!
 timeout 5
 retransmit 3

aaa new-model
aaa authentication dot1x default group radius
aaa authorization network default group radius
aaa accounting dot1x default start-stop group radius

aaa server radius dynamic-author
 client 10.1.1.100 server-key HealthcareRad1us!
 client 10.1.1.101 server-key HealthcareRad1us!
 auth-type any
 port 1700

# Aruba Configuration
aaa authentication-server radius "PRIMARY"
 host 10.1.1.100
 key HealthcareRad1us!
 timeout 5
 retransmit 3

aaa authentication-server radius "BACKUP"
 host 10.1.1.101
 key HealthcareRad1us!
 timeout 5
 retransmit 3

aaa server-group "RADIUS-SERVERS"
 auth-server "PRIMARY"
 auth-server "BACKUP"
 load-balance
 deadtime 15

# Juniper Configuration
system {
    radius-server {
        10.1.1.100 {
            secret "$9$gg4JD.P5Q/AtOcyrev"; # "HealthcareRad1us!"
            timeout 5;
            retry 3;
            source-address 10.0.0.1;
            port 1812;
            accounting-port 1813;
        }
        10.1.1.101 {
            secret "$9$gg4JD.P5Q/AtOcyrev"; # "HealthcareRad1us!"
            timeout 5;
            retry 3;
            source-address 10.0.0.1;
            port 1812;
            accounting-port 1813;
        }
    }
}

##############################################
# Healthcare Specific VLANs
##############################################
# VLAN 10: Staff Network
# VLAN 20: Clinical Devices
# VLAN 30: Medical Equipment
# VLAN 40: Guest Access
# VLAN 999: Quarantine

##############################################
# Device Categories and MAB Rules
##############################################
# Category 1: Staff Computers (802.1X)
# Category 2: Clinical Tablets (802.1X)
# Category 3: Medical Devices (MAB)
# Category 4: IoT Devices (MAB)
# Category 5: Guest Devices (802.1X)

##############################################
# Cisco Interface Template - Medical Devices
##############################################
interface range GigabitEthernet1/0/1 - 24
 description Medical Devices
 switchport mode access
 switchport access vlan 30
 switchport voice vlan 20
 authentication event fail action authorize vlan 999
 authentication event server dead action authorize vlan 999
 authentication event server alive action reinitialize
 authentication host-mode multi-auth
 authentication open
 authentication order mab dot1x
 authentication priority mab dot1x
 authentication port-control auto
 authentication periodic
 authentication timer reauthenticate 10800
 authentication violation replace
 mab
 dot1x pae authenticator
 dot1x timeout tx-period 5
 spanning-tree portfast

##############################################
# Aruba Interface Template - Staff Access
##############################################
interface range 1/1-1/24
 description Staff Access
 aaa authentication port-access dot1x authenticator
 aaa authentication port-access mab
 aaa port-access authentication 1
 aaa port-access mac-auth 1
 aaa port-access authenticator active
 aaa port-access authenticator port-control auto
 aaa port-access authenticator reauthenticate
 aaa port-access authenticator logoff-period 300
 vlan access 10
 spanning-tree admin-edge

##############################################
# Juniper Interface Template - Clinical Devices
##############################################
interfaces {
    ge-0/0/0 {
        description "Clinical Devices";
        unit 0 {
            family ethernet-switching {
                port-mode access;
                vlan members 20;
                authentication {
                    dot1x {
                        supplicant multiple;
                        transmit-period 5;
                        mac-radius {
                            restrict;
                        }
                        guest-vlan {
                            vlan-name guest-vlan;
                        }
                        server-fail {
                            vlan-name quarantine-vlan;
                        }
                        authentication-order [dot1x mac-radius];
                    }
                }
            }
        }
    }
}`;
}

function getMultiVendorEducationTemplate() {
    return `# Multi-Vendor Education 802.1X Configuration
# Generated by Dot1Xer Supreme
# Last updated: 2023-10-15

##############################################
# RADIUS Server Configuration
##############################################

# Cisco Configuration
radius server PRIMARY
 address ipv4 10.1.1.100 auth-port 1812 acct-port 1813
 key EduSecureR@d1u$
 timeout 5
 retransmit 3
 
radius server BACKUP
 address ipv4 10.1.1.101 auth-port 1812 acct-port 1813
 key EduSecureR@d1u$
 timeout 5
 retransmit 3

aaa new-model
aaa authentication dot1x default group radius
aaa authorization network default group radius
aaa accounting dot1x default start-stop group radius

# Aruba Configuration
aaa authentication-server radius "PRIMARY"
 host 10.1.1.100
 key EduSecureR@d1u$
 timeout 5
 retransmit 3

aaa authentication-server radius "BACKUP"
 host 10.1.1.101
 key EduSecureR@d1u$
 timeout 5
 retransmit 3

aaa server-group "RADIUS-SERVERS"
 auth-server "PRIMARY"
 auth-server "BACKUP"
 load-balance
 deadtime 15

##############################################
# Education Specific VLANs
##############################################
# VLAN 10: Faculty/Staff 
# VLAN 20: Student
# VLAN 30: Computer Labs
# VLAN 40: Guest/BYOD
# VLAN 50: IoT Devices
# VLAN 999: Quarantine

##############################################
# Cisco Interface Template - Classroom
##############################################
interface range GigabitEthernet1/0/1 - 24
 description Classroom Access
 switchport mode access
 switchport access vlan 10
 authentication event fail action authorize vlan 999
 authentication event server dead action authorize vlan 999
 authentication event server alive action reinitialize
 authentication host-mode multi-auth
 authentication open
 authentication order dot1x mab
 authentication priority dot1x mab
 authentication port-control auto
 authentication periodic
 authentication timer reauthenticate 14400
 authentication violation replace
 mab
 dot1x pae authenticator
 dot1x timeout tx-period 5
 spanning-tree portfast

##############################################
# Aruba Interface Template - Computer Lab
##############################################
interface range 1/1-1/24
 description Computer Lab
 aaa authentication port-access dot1x authenticator
 aaa authentication port-access mab
 aaa port-access authentication 1
 aaa port-access mac-auth 1
 aaa port-access authenticator active
 aaa port-access authenticator port-control auto
 aaa port-access authenticator reauthenticate
 aaa port-access authenticator logoff-period 300
 vlan access 30
 spanning-tree admin-edge

##############################################
# BYOD Onboarding Configuration
##############################################
# Cisco Wireless Controller Configuration
config radius auth add 1 10.1.1.100 1812 ascii EduSecureR@d1u$
config radius auth add 2 10.1.1.101 1812 ascii EduSecureR@d1u$
config radius acct add 1 10.1.1.100 1813 ascii EduSecureR@d1u$
config radius acct add 2 10.1.1.101 1813 ascii EduSecureR@d1u$

config wlan create 1 "BYOD-Onboarding" "BYOD-Onboarding"
config wlan security wpa wpa2 enable 1
config wlan security wpa wpa2 ciphers aes enable 1
config wlan security 802.1X enable 1
config wlan radius_server auth add 1 1
config wlan radius_server auth add 1 2
config wlan radius_server acct add 1 1
config wlan radius_server acct add 1 2
config wlan security web-auth enable 1
config wlan security web-auth acl add 1 "BYOD-ACL"
config wlan security web-auth captive-bypass enable 1
config wlan security web-auth on-macauth-failure enable 1
config wlan security pmf mandatory 1

config wlan create 2 "Student-Access" "Student-Access"
config wlan security wpa wpa2 enable 2
config wlan security wpa wpa2 ciphers aes enable 2
config wlan security 802.1X enable 2
config wlan radius_server auth add 2 1
config wlan radius_server auth add 2 2
config wlan radius_server acct add 2 1
config wlan radius_server acct add 2 2
config wlan security web-auth disable 2
config wlan security pmf mandatory 2

config wlan create 3 "Faculty-Access" "Faculty-Access"
config wlan security wpa wpa2 enable 3
config wlan security wpa wpa2 ciphers aes enable 3
config wlan security 802.1X enable 3
config wlan radius_server auth add 3 1
config wlan radius_server auth add 3 2
config wlan radius_server acct add 3 1
config wlan radius_server acct add 3 2
config wlan security web-auth disable 3
config wlan security pmf mandatory 3

##############################################
# ACL for Guest Access
##############################################
# Cisco ACL
ip access-list extended GUEST-ACL
 permit udp any any eq domain
 permit tcp any any eq domain
 permit tcp any any eq 80
 permit tcp any any eq 443
 permit udp any any eq ntp
 deny   ip any 10.0.0.0 0.255.255.255
 permit ip any any`;
}

function getMultiVendorEnterpriseTemplate() {
    return `# Multi-Vendor Enterprise 802.1X Configuration
# Generated by Dot1Xer Supreme
# Last updated: 2023-10-15

##############################################
# RADIUS Server Configuration
##############################################

# Cisco Configuration
radius server PRIMARY
 address ipv4 10.1.1.100 auth-port 1812 acct-port 1813
 key Enterprise8021X!
 timeout 5
 retransmit 3
 
radius server BACKUP
 address ipv4 10.1.1.101 auth-port 1812 acct-port 1813
 key Enterprise8021X!
 timeout 5
 retransmit 3

aaa new-model
aaa authentication dot1x default group radius
aaa authorization network default group radius
aaa accounting dot1x default start-stop group radius

# Aruba Configuration
aaa authentication-server radius "PRIMARY"
 host 10.1.1.100
 key Enterprise8021X!
 timeout 5
 retransmit 3

aaa authentication-server radius "BACKUP"
 host 10.1.1.101
 key Enterprise8021X!
 timeout 5
 retransmit 3

aaa server-group "RADIUS-SERVERS"
 auth-server "PRIMARY"
 auth-server "BACKUP"
 load-balance
 deadtime 15

# Juniper Configuration
system {
    radius-server {
        10.1.1.100 {
            secret "$9$gg4JD.P5Q/AtOcyrev"; # "Enterprise8021X!"
            timeout 5;
            retry 3;
            source-address 10.0.0.1;
            port 1812;
            accounting-port 1813;
        }
        10.1.1.101 {
            secret "$9$gg4JD.P5Q/AtOcyrev"; # "Enterprise8021X!"
            timeout 5;
            retry 3;
            source-address 10.0.0.1;
            port 1812;
            accounting-port 1813;
        }
    }
}

##############################################
# Enterprise Network VLANs
##############################################
# VLAN 10: Employee Network
# VLAN 20: Conference Rooms
# VLAN 30: IoT Devices
# VLAN 40: BYOD
# VLAN 50: Guest Access
# VLAN 60: Voice VLAN
# VLAN 999: Quarantine

##############################################
# Cisco Interface Template - Office Area
##############################################
interface range GigabitEthernet1/0/1 - 48
 description Office Area Access
 switchport mode access
 switchport access vlan 10
 switchport voice vlan 60
 authentication event fail action authorize vlan 999
 authentication event server dead action authorize vlan 999
 authentication event server alive action reinitialize
 authentication host-mode multi-domain
 authentication open
 authentication order dot1x mab
 authentication priority dot1x mab
 authentication port-control auto
 authentication periodic
 authentication timer reauthenticate 28800
 authentication violation replace
 mab
 dot1x pae authenticator
 dot1x timeout tx-period 5
 spanning-tree portfast

##############################################
# Aruba Interface Template - Conference Rooms
##############################################
interface range 1/1-1/24
 description Conference Rooms
 aaa authentication port-access dot1x authenticator
 aaa authentication port-access mab
 aaa port-access authentication 1
 aaa port-access mac-auth 1
 aaa port-access authenticator active
 aaa port-access authenticator port-control auto
 aaa port-access authenticator reauthenticate
 aaa port-access authenticator logoff-period 300
 vlan access 20
 spanning-tree admin-edge

##############################################
# Juniper Interface Template - IoT Devices
##############################################
interfaces {
    ge-0/0/0 {
        description "IoT Devices";
        unit 0 {
            family ethernet-switching {
                port-mode access;
                vlan members 30;
                authentication {
                    dot1x {
                        supplicant multiple;
                        transmit-period 5;
                        mac-radius {
                            restrict;
                        }
                        guest-vlan {
                            vlan-name guest-vlan;
                        }
                        server-fail {
                            vlan-name quarantine-vlan;
                        }
                        authentication-order [dot1x mac-radius];
                    }
                }
            }
        }
    }
}

##############################################
# FortiGate Interface Template - BYOD/Guest
##############################################
config system interface
    edit "port1"
        set vdom "root"
        set mode static
        set ip 192.168.1.1 255.255.255.0
        set allowaccess ping https ssh snmp
        set type physical
        set nac enable
        set nac-policy "BYOD-Policy"
    next
end

config user radius
    edit "FortiAuthServer"
        set server "10.1.1.100"
        set secret Enterprise8021X!
        set auth-type auto
        set source-ip 192.168.1.1
        set nas-ip 192.168.1.1
    next
end

config user nac-policy
    edit 1
        set name "BYOD-Policy"
        set description "Policy for BYOD devices"
        set category device
        set status enable
        set user-groups "BYOD-Users"
        set auth-vlan-id 40
        set unauth-vlan-id 999
    next
    edit 2
        set name "Guest-Policy"
        set description "Policy for guest devices"
        set category device
        set status enable
        set user-groups "Guest-Users"
        set auth-vlan-id 50
        set unauth-vlan-id 999
    next
end`;
}

function getWirelessControllerTemplate() {
    return `# Wireless Controller 802.1X Configuration
# Generated by Dot1Xer Supreme
# Last updated: 2023-10-15

##############################################
# Cisco WLC Configuration
##############################################

# RADIUS Server Configuration
config radius auth add 1 10.1.1.100 1812 ascii WirelessSecure123!
config radius auth add 2 10.1.1.101 1812 ascii WirelessSecure123!
config radius acct add 1 10.1.1.100 1813 ascii WirelessSecure123!
config radius acct add 2 10.1.1.101 1813 ascii WirelessSecure123!

config radius auth callStationIdType ap-macaddr-ssid
config radius auth rfc3576 enable
config radius auth management 1 disable
config radius auth management 2 disable

config radius fallback-test mode passive
config radius fallback-test username "probe"
config radius fallback-test interval 300

# Corporate WLAN Configuration
config wlan create 1 "Corporate" "Corporate"
config wlan security wpa wpa2 enable 1
config wlan security wpa wpa2 ciphers aes enable 1
config wlan security 802.1X enable 1
config wlan radius_server auth add 1 1
config wlan radius_server auth add 1 2
config wlan radius_server acct add 1 1
config wlan radius_server acct add 1 2
config wlan security web-auth disable 1
config wlan security pmf mandatory 1
config wlan aaa-override enable 1
config wlan session-timeout 1 43200
config wlan exclusionlist 1 enabled 180
config wlan max-associated-clients 1 500
config wlan load-balance allow enable 1
config wlan ccx aironetIeSupport enable 1
config wlan security ft enable 1
config wlan security wpa wpa2 gtk-randomize enable 1
config wlan mdns disable 1
config wlan interface 1 "corp-interface"

# Guest WLAN Configuration
config wlan create 2 "Guest" "Guest"
config wlan security wpa wpa2 enable 2
config wlan security wpa wpa2 ciphers aes enable 2
config wlan security 802.1X enable 2
config wlan radius_server auth add 2 1
config wlan radius_server auth add 2 2
config wlan radius_server acct add 2 1
config wlan radius_server acct add 2 2
config wlan security web-auth enable 2
config wlan security web-auth acl add 2 "GUEST-ACL"
config wlan security web-auth captive-bypass disable 2
config wlan security web-auth on-macauth-failure enable 2
config wlan security pmf optional 2
config wlan aaa-override enable 2
config wlan session-timeout 2 10800
config wlan exclusionlist 2 enabled 180
config wlan max-associated-clients 2 300
config wlan load-balance allow enable 2
config wlan interface 2 "guest-interface"

# BYOD WLAN Configuration
config wlan create 3 "BYOD" "BYOD"
config wlan security wpa wpa2 enable 3
config wlan security wpa wpa2 ciphers aes enable 3
config wlan security 802.1X enable 3
config wlan radius_server auth add 3 1
config wlan radius_server auth add 3 2
config wlan radius_server acct add 3 1
config wlan radius_server acct add 3 2
config wlan security web-auth disable 3
config wlan security pmf optional 3
config wlan aaa-override enable 3
config wlan session-timeout 3 28800
config wlan exclusionlist 3 enabled 180
config wlan max-associated-clients 3 400
config wlan load-balance allow enable 3
config wlan interface 3 "byod-interface"

##############################################
# Aruba Mobility Controller Configuration
##############################################

# RADIUS Server Configuration
aaa authentication-server radius "PRIMARY"
 host 10.1.1.100
 key WirelessSecure123!
 timeout 5
 retransmit 3
 nas-ip 10.0.0.1
 rfc3576

aaa authentication-server radius "BACKUP"
 host 10.1.1.101
 key WirelessSecure123!
 timeout 5
 retransmit 3
 nas-ip 10.0.0.1
 rfc3576

aaa server-group "RADIUS-SERVERS"
 auth-server "PRIMARY"
 auth-server "BACKUP"
 load-balance
 deadtime 15

# Corporate WLAN Configuration
wlan ssid-profile "Corporate-SSID"
 essid "Corporate"
 opmode wpa2-aes
 max-authentication-retries 3
 rf-band all
 dtim-period 1
 802.11a-max-tx-power 15
 802.11g-max-tx-power 15
 wmm
 wmm-uapsd
 dot11k
 dot11r
 wlan-rts-threshold 2333
 wlan-cts-threshold 2333
 edca-parameters-profile station default
 deny-bcast
 enforce-user-vlan
 
wlan authentication-server "Corporate-Auth"
 server-group "RADIUS-SERVERS"
 
wlan access-rule "Corporate-ACL"
 captive-portal disable
 ipv4 permit any any "any"
 
wlan virtual-ap "Corporate-VAP"
 aaa-profile "Corporate-AAA"
 vlan 10
 forward-mode tunnel
 ssid-profile "Corporate-SSID"
 rap-operation forward

aaa profile "Corporate-AAA"
 authentication-dot1x "Corporate-Auth"
 dot1x-default-role "authenticated"
 dot1x-server-group "RADIUS-SERVERS"
 radius-accounting "RADIUS-SERVERS"
 radius-interim-accounting
 mac-authentication-profile "Corporate-MAC"
 rfc3576-server "10.1.1.100"
 rfc3576-server "10.1.1.101"
 
# Guest WLAN Configuration
wlan ssid-profile "Guest-SSID"
 essid "Guest"
 opmode wpa2-aes
 max-authentication-retries 3
 rf-band all
 dtim-period 1
 802.11a-max-tx-power 15
 802.11g-max-tx-power 15
 wmm
 wmm-uapsd
 dot11k
 dot11r
 wlan-rts-threshold 2333
 wlan-cts-threshold 2333
 edca-parameters-profile station default
 
wlan authentication-server "Guest-Auth"
 server-group "RADIUS-SERVERS"
 
wlan access-rule "Guest-ACL"
 captive-portal enable
 ipv4 permit tcp 80 80 any any "http"
 ipv4 permit tcp 443 443 any any "https"
 ipv4 permit udp 53 53 any any "dns"
 ipv4 deny any any "any"
 
wlan virtual-ap "Guest-VAP"
 aaa-profile "Guest-AAA"
 vlan 20
 forward-mode tunnel
 ssid-profile "Guest-SSID"
 rap-operation forward

aaa profile "Guest-AAA"
 authentication-dot1x "Guest-Auth"
 dot1x-default-role "guest"
 dot1x-server-group "RADIUS-SERVERS"
 radius-accounting "RADIUS-SERVERS"
 radius-interim-accounting
 captive-portal "Guest-Portal"
 mac-authentication-profile "Guest-MAC"
 rfc3576-server "10.1.1.100"
 rfc3576-server "10.1.1.101"`;
}

function getGuestAccessTemplate() {
    return `# Guest Access Portal Configuration
# Generated by Dot1Xer Supreme
# Last updated: 2023-10-15

##############################################
# Cisco Guest Access Configuration
##############################################

# RADIUS Server Configuration
radius server GUEST-RADIUS
 address ipv4 10.1.1.100 auth-port 1812 acct-port 1813
 key GuestPortal123!
 timeout 5
 retransmit 3

aaa new-model
aaa authentication dot1x default group radius
aaa authorization network default group radius
aaa accounting dot1x default start-stop group radius

# Guest VLAN Configuration
vlan 50
 name GUEST_VLAN

# Guest Access ACL
ip access-list extended GUEST-ACL
 permit udp any any eq domain
 permit tcp any any eq domain
 permit tcp any any eq 80
 permit tcp any any eq 443
 permit udp any any eq ntp
 deny   ip any 10.0.0.0 0.255.255.255
 permit ip any any

# Web Authentication Configuration
ip admission name GUEST-WEBAUTH-RULE proxy http
ip admission proxy http login page file disk0:guest-login.html
ip admission proxy http success page file disk0:guest-success.html
ip admission proxy http failure page file disk0:guest-fail.html
ip admission proxy http redirect disk0:guest-redirect.html

# Interface Configuration for Guest Access
interface GigabitEthernet1/0/10
 description Guest Access
 switchport mode access
 switchport access vlan 50
 ip access-group GUEST-ACL in
 authentication fallback GUEST-WEBAUTH-RULE
 authentication host-mode single-host
 authentication open
 authentication order webauth
 authentication priority webauth
 authentication port-control auto
 authentication violation restrict
 authentication timer inactivity 3600
 mab
 dot1x pae authenticator
 spanning-tree portfast

##############################################
# Aruba Guest Access Configuration
##############################################

# ClearPass Guest Portal Configuration
# (Configuration would be done in ClearPass GUI)

# RADIUS Server Configuration
aaa authentication-server radius "GUEST-RADIUS"
 host 10.1.1.100
 key GuestPortal123!
 timeout 5
 retransmit 3

aaa server-group "GUEST-SERVERS"
 auth-server "GUEST-RADIUS"
 
# Guest VLAN Configuration
vlan 50
 name "Guest-Network"

# Guest Roles and Policies
user-role guest
 access-list session guest-logon-access
 access-list session block-internal-access
 access-list session captive-portal-access
 access-list session dhcp-acl
 access-list session dns-acl
 captive-portal "Guest-Portal"
 
# Interface Configuration for Guest Access
interface gigabitethernet 1/10
 description "Guest Access"
 trusted vlan 50
 captive-portal profile "Guest-Portal"

##############################################
# FortiGate Guest Access Configuration
##############################################

# Guest VLAN Configuration
config system interface
    edit "guest-vlan"
        set vdom "root"
        set ip 192.168.50.1 255.255.255.0
        set allowaccess ping https ssh http
        set description "Guest Network"
        set role lan
        set interface "internal"
        set vlanid 50
    next
end

# Captive Portal Configuration
config user local
    edit "guest"
        set type password
        set passwd guestaccess123
    next
end

config user group
    edit "guest-group"
        set member "guest"
    next
end

config firewall policy
    edit 1
        set name "Guest Access Policy"
        set srcintf "guest-vlan"
        set dstintf "wan1"
        set srcaddr "all"
        set dstaddr "all"
        set action accept
        set schedule "always"
        set service "HTTP" "HTTPS" "DNS" "NTP"
        set nat enable
        set groups "guest-group"
        set captive-portal enable
    next
end

config authentication scheme
    edit "guest-portal"
        set method form
        set user-database "local"
    next
end

config authentication rule
    edit "guest-rule"
        set srcintf "guest-vlan"
        set srcaddr "all"
        set ip-based disable
        set active-auth-method "guest-portal"
        set web-auth-cookie enable
    next
end

##############################################
# Guest Portal HTML Templates
##############################################

# Login Page HTML
<html>
<head>
    <title>Guest WiFi Access</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
        .container { max-width: 500px; margin: 50px auto; background: white; padding: 30px; border-radius: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; margin-top: 0; }
        input[type="text"], input[type="email"], input[type="password"] { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 3px; box-sizing: border-box; }
        button { background-color: #0077cc; color: white; border: none; padding: 10px 15px; border-radius: 3px; cursor: pointer; font-size: 16px; }
        button:hover { background-color: #005fa3; }
        .terms { font-size: 12px; color: #666; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Guest WiFi</h1>
        <p>Please sign in to access our guest network.</p>
        <form method="post" action="$PORTAL_ACTION$">
            <div>
                <label for="email">Email Address:</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div>
                <label for="name">Full Name:</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div>
                <label for="company">Company (Optional):</label>
                <input type="text" id="company" name="company">
            </div>
            <div>
                <button type="submit">Connect</button>
            </div>
            <div class="terms">
                By connecting to our guest network, you agree to our <a href="#">Terms of Service</a> and <a href="#">Acceptable Use Policy</a>.
            </div>
        </form>
    </div>
</body>
</html>

# Success Page HTML
<html>
<head>
    <title>Connection Successful</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
        .container { max-width: 500px; margin: 50px auto; background: white; padding: 30px; border-radius: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center; }
        h1 { color: #333; margin-top: 0; }
        .success-icon { font-size: 60px; color: #4CAF50; margin-bottom: 20px; }
        button { background-color: #0077cc; color: white; border: none; padding: 10px 15px; border-radius: 3px; cursor: pointer; font-size: 16px; }
        button:hover { background-color: #005fa3; }
    </style>
</head>
<body>
    <div class="container">
        <div class="success-icon">✓</div>
        <h1>Connection Successful</h1>
        <p>You have successfully connected to our guest network.</p>
        <p>Your session will expire in 12 hours.</p>
        <p>If you have any issues, please contact the front desk.</p>
        <a href="http://www.example.com"><button>Continue to Internet</button></a>
    </div>
</body>
</html>`;
}

function getBYODOnboardingTemplate() {
    return `# BYOD Onboarding Configuration
# Generated by Dot1Xer Supreme
# Last updated: 2023-10-15

##############################################
# Cisco ISE BYOD Onboarding Configuration
##############################################

# ISE Configuration (GUI-based, commands shown for reference)

# 1. Configure BYOD Portal
# Navigate to: Work Centers > BYOD > Portals & Components > BYOD Portals
# Configure: Portal Settings, BYOD Settings, Support Information, etc.

# 2. Configure Client Provisioning Portal
# Navigate to: Work Centers > BYOD > Portals & Components > Client Provisioning Portal
# Configure: Portal Settings, Portal Page Customization, etc.

# 3. Configure Client Provisioning Policy
# Navigate to: Work Centers > BYOD > Client Provisioning > Client Provisioning Policy
# Configure policies for different operating systems: Windows, macOS, iOS, Android

# 4. Configure Authorization Profiles
# Navigate to: Work Centers > BYOD > Policy Elements > Results > Authorization Profiles
# Create profiles: NSP_Onboarding, BYOD_Registered, etc.

# 5. Configure Authorization Policy
# Navigate to: Work Centers > BYOD > Policy Sets
# Configure rules for BYOD onboarding flow and post-registration access

# 6. Configure BYOD Settings
# Navigate to: Work Centers > BYOD > Settings
# Configure: Policies, MDM Integration, etc.

##############################################
# Cisco Wireless Controller Configuration for BYOD
##############################################

# RADIUS Server Configuration (ISE)
config radius auth add 1 10.1.1.100 1812 ascii ISEradiusKey123!
config radius auth add 2 10.1.1.101 1812 ascii ISEradiusKey123!
config radius acct add 1 10.1.1.100 1813 ascii ISEradiusKey123!
config radius acct add 2 10.1.1.101 1813 ascii ISEradiusKey123!

# BYOD WLAN Configuration
config wlan create 1 "BYOD" "BYOD"
config wlan security wpa wpa2 enable 1
config wlan security wpa wpa2 ciphers aes enable 1
config wlan security 802.1X enable 1
config wlan radius_server auth add 1 1
config wlan radius_server auth add 1 2
config wlan radius_server acct add 1 1
config wlan radius_server acct add 1 2
config wlan security web-auth disable 1
config wlan aaa-override enable 1
config wlan nac radius enable 1
config wlan security wpa gtk-random enable 1
config wlan security pmf mandatory 1
config wlan ccx aironetIeSupport enable 1
config wlan interface 1 "byod-interface"

# Onboarding WLAN Configuration
config wlan create 2 "Onboarding" "Onboarding"
config wlan security wpa wpa2 enable 2
config wlan security wpa wpa2 ciphers aes enable 2
config wlan security 802.1X enable 2
config wlan radius_server auth add 2 1
config wlan radius_server auth add 2 2
config wlan radius_server acct add 2 1
config wlan radius_server acct add 2 2
config wlan security web-auth enable 2
config wlan security web-auth acl add 2 "ONBOARDING-ACL"
config wlan security web-auth captive-bypass enable 2
config wlan aaa-override enable 2
config wlan interface 2 "onboarding-interface"

# ACL for Onboarding
config acl create "ONBOARDING-ACL"
config acl rule add "ONBOARDING-ACL" 1
config acl rule protocol "ONBOARDING-ACL" 1 17
config acl rule source port range "ONBOARDING-ACL" 1 0 65535
config acl rule destination port range "ONBOARDING-ACL" 1 53 53
config acl rule action "ONBOARDING-ACL" 1 permit

config acl rule add "ONBOARDING-ACL" 2
config acl rule protocol "ONBOARDING-ACL" 2 6
config acl rule source port range "ONBOARDING-ACL" 2 0 65535
config acl rule destination port range "ONBOARDING-ACL" 2 80 80
config acl rule action "ONBOARDING-ACL" 2 permit

config acl rule add "ONBOARDING-ACL" 3
config acl rule protocol "ONBOARDING-ACL" 3 6
config acl rule source port range "ONBOARDING-ACL" 3 0 65535
config acl rule destination port range "ONBOARDING-ACL" 3 443 443
config acl rule action "ONBOARDING-ACL" 3 permit

config acl rule add "ONBOARDING-ACL" 4
config acl rule protocol "ONBOARDING-ACL" 4 6
config acl rule source port range "ONBOARDING-ACL" 4 0 65535
config acl rule destination port range "ONBOARDING-ACL" 4 8443 8443
config acl rule action "ONBOARDING-ACL" 4 permit

config acl rule add "ONBOARDING-ACL" 5
config acl rule destination address "ONBOARDING-ACL" 5 10.1.1.100 255.255.255.255
config acl rule action "ONBOARDING-ACL" 5 permit

config acl rule add "ONBOARDING-ACL" 6
config acl rule destination address "ONBOARDING-ACL" 6 10.1.1.101 255.255.255.255
config acl rule action "ONBOARDING-ACL" 6 permit

config acl rule add "ONBOARDING-ACL" 7
config acl rule action "ONBOARDING-ACL" 7 deny

##############################################
# Cisco Switch Configuration for BYOD
##############################################

# RADIUS Server Configuration (ISE)
radius server ISE-1
 address ipv4 10.1.1.100 auth-port 1812 acct-port 1813
 key ISEradiusKey123!
 timeout 5
 retransmit 3
 
radius server ISE-2
 address ipv4 10.1.1.101 auth-port 1812 acct-port 1813
 key ISEradiusKey123!
 timeout 5
 retransmit 3

aaa group server radius ISE-SERVERS
 server name ISE-1
 server name ISE-2
 deadtime 15
 load-balance method least-outstanding

aaa new-model
aaa authentication dot1x default group ISE-SERVERS
aaa authorization network default group ISE-SERVERS
aaa accounting dot1x default start-stop group ISE-SERVERS

# BYOD VLAN Configuration
vlan 40
 name BYOD_VLAN
vlan 41
 name BYOD_ONBOARDING

# URL Redirect ACL for BYOD
ip access-list extended ACL-REDIRECT
 permit tcp any any eq 80
 permit tcp any any eq 443
 deny tcp any host 10.1.1.100 eq 80
 deny tcp any host 10.1.1.100 eq 443
 deny tcp any host 10.1.1.101 eq 80
 deny tcp any host 10.1.1.101 eq 443
 deny ip any any

# DNS/DHCP ACL for BYOD
ip access-list extended ACL-DEFAULT
 permit udp any any eq domain
 permit udp any any eq bootps
 permit udp any any eq bootpc
 deny ip any any

# Interface Configuration for BYOD Access
interface GigabitEthernet1/0/10
 description BYOD Access
 switchport mode access
 switchport access vlan 40
 authentication event fail action authorize vlan 41
 authentication event server dead action authorize vlan 41
 authentication event server alive action reinitialize
 authentication host-mode multi-auth
 authentication open
 authentication order dot1x mab
 authentication priority dot1x mab
 authentication port-control auto
 authentication periodic
 authentication timer reauthenticate server
 authentication violation replace
 mab
 dot1x pae authenticator
 dot1x timeout tx-period 5
 spanning-tree portfast

# Enable Change of Authorization (CoA)
aaa server radius dynamic-author
 client 10.1.1.100 server-key ISEradiusKey123!
 client 10.1.1.101 server-key ISEradiusKey123!
 auth-type any
 port 1700

##############################################
# MDM Integration Configuration Example
##############################################

# Cisco ISE MDM Integration (GUI-based, commands shown for reference)

# 1. Configure MDM Server
# Navigate to: Administration > Network Resources > External MDM
# Configure: Server Name, Type (AirWatch, MobileIron, etc.), API Information

# 2. Configure MDM Authorization Conditions
# Navigate to: Work Centers > BYOD > Policy Elements > Conditions > MDM
# Create conditions based on MDM attributes: Compliant, Registered, etc.

# 3. Configure Authorization Policies
# Navigate to: Work Centers > BYOD > Policy Sets
# Add rules for MDM compliance checking

##############################################
# Certificate Templates
##############################################

# Windows Certificate Template (AD CS)
# Template Name: BYOD-User-Authentication
# Compatibility: Windows Server 2012 R2
# Template Type: User Certificate
# Validity Period: 1 Year
# Renewal Period: 6 Weeks
# Subject Name: CN={UserPrincipalName}
# Extensions: Client Authentication, Smart Card Logon
# Issuance Requirements: CA Certificate Manager Approval

# iOS/macOS Certificate Profile (MDM)
{
  "PayloadContent": [
    {
      "PayloadType": "com.apple.security.pkcs12",
      "PayloadVersion": 1,
      "PayloadIdentifier": "com.example.byod.credentials",
      "PayloadUUID": "3C83B947-9B44-4AF3-9AC7-69B900B28A63",
      "PayloadDisplayName": "BYOD Certificate",
      "PayloadDescription": "Configures BYOD certificate for network authentication",
      "PayloadContent": {
        "URL": "https://onboarding.example.com/certificate",
        "Name": "BYOD-Certificate"
      },
      "SubjectAltName": {
        "AltNameType": "RFC822Name",
        "AltName": "{EMAIL}"
      }
    }
  ],
  "PayloadVersion": 1,
  "PayloadType": "Configuration",
  "PayloadIdentifier": "com.example.byod.profile",
  "PayloadUUID": "A1B2C3D4-E5F6-1234-5678-9ABCDEF01234",
  "PayloadDisplayName": "BYOD Certificate Profile",
  "PayloadDescription": "Installs certificate for BYOD access",
  "PayloadOrganization": "Example Corp"
}`;
}
