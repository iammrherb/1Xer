/**
 * Dot1Xer Supreme - Templates Management
 * Provides functionality for template browsing, editing, and management
 * Version: 3.5.0
 */

// Initialize templates when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('template-list')) {
        loadTemplatesList();
        setupTemplateEventListeners();
    }
});

/**
 * Set up event listeners for template functionality
 */
function setupTemplateEventListeners() {
    // Template search
    const searchInput = document.getElementById('template-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterTemplates(this.value);
        });
    }
    
    // Copy template button
    const copyTemplateBtn = document.getElementById('copy-template');
    if (copyTemplateBtn) {
        copyTemplateBtn.addEventListener('click', function() {
            const templateContent = document.getElementById('template-content');
            if (templateContent) {
                copyToClipboard(templateContent.textContent);
                
                // Show success message
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            }
        });
    }
    
    // Download template button
    const downloadTemplateBtn = document.getElementById('download-template');
    if (downloadTemplateBtn) {
        downloadTemplateBtn.addEventListener('click', function() {
            const templateContent = document.getElementById('template-content');
            const templateTitle = document.getElementById('template-title');
            
            if (templateContent && templateTitle) {
                const filename = templateTitle.textContent.replace(/\s+/g, '_').toLowerCase() + '.conf';
                downloadTextFile(templateContent.textContent, filename);
            }
        });
    }
    
    // Add new template button
    const addTemplateBtn = document.getElementById('add-template');
    if (addTemplateBtn) {
        addTemplateBtn.addEventListener('click', function() {
            showAddTemplateModal();
        });
    }
    
    // Edit template button
    const editTemplateBtn = document.getElementById('edit-template');
    if (editTemplateBtn) {
        editTemplateBtn.addEventListener('click', function() {
            const templateContent = document.getElementById('template-content');
            const templateTitle = document.getElementById('template-title');
            
            if (templateContent && templateTitle) {
                showEditTemplateModal(templateTitle.textContent, templateContent.textContent);
            }
        });
    }
}

/**
 * Load the list of available templates
 */
function loadTemplatesList() {
    const templateList = document.getElementById('template-list');
    if (!templateList) return;
    
    // Clear existing templates
    templateList.innerHTML = '';
    
    // Sample templates data
    const templates = [
        { id: 'cisco-ios-dot1x-mab', name: 'Cisco IOS 802.1X + MAB', vendor: 'cisco', platform: 'ios', type: 'dot1x-mab' },
        { id: 'cisco-ios-dot1x-only', name: 'Cisco IOS 802.1X Only', vendor: 'cisco', platform: 'ios', type: 'dot1x-only' },
        { id: 'cisco-ios-mab-only', name: 'Cisco IOS MAB Only', vendor: 'cisco', platform: 'ios', type: 'mab-only' },
        { id: 'cisco-nxos-dot1x-mab', name: 'Cisco NX-OS 802.1X + MAB', vendor: 'cisco', platform: 'nxos', type: 'dot1x-mab' },
        { id: 'cisco-wlc-dot1x', name: 'Cisco WLC 802.1X', vendor: 'cisco', platform: 'wlc', type: 'dot1x-only' },
        { id: 'aruba-aoscx-dot1x-mab', name: 'Aruba AOS-CX 802.1X + MAB', vendor: 'aruba', platform: 'aoscx', type: 'dot1x-mab' },
        { id: 'aruba-controller-dot1x', name: 'Aruba Controller 802.1X', vendor: 'aruba', platform: 'controller', type: 'dot1x-only' },
        { id: 'juniper-ex-dot1x-mab', name: 'Juniper EX 802.1X + MAB', vendor: 'juniper', platform: 'ex', type: 'dot1x-mab' },
        { id: 'extreme-exos-dot1x-mab', name: 'Extreme EXOS 802.1X + MAB', vendor: 'extreme', platform: 'exos', type: 'dot1x-mab' },
        { id: 'hp-procurve-dot1x-mab', name: 'HP ProCurve 802.1X + MAB', vendor: 'hp', platform: 'procurve', type: 'dot1x-mab' },
        { id: 'multi-vendor-deployment', name: 'Multi-Vendor Deployment', vendor: 'multi-vendor', platform: 'mixed', type: 'deployment' }
    ];
    
    // Add templates to the list
    templates.forEach(template => {
        const templateItem = document.createElement('div');
        templateItem.className = 'template-item';
        templateItem.dataset.id = template.id;
        templateItem.dataset.vendor = template.vendor;
        templateItem.dataset.platform = template.platform;
        templateItem.dataset.type = template.type;
        templateItem.textContent = template.name;
        
        // Add click event to select template
        templateItem.addEventListener('click', function() {
            // Remove active class from all templates
            document.querySelectorAll('.template-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to this template
            this.classList.add('active');
            
            // Load template details
            loadTemplateDetails(template.id);
        });
        
        templateList.appendChild(templateItem);
    });
}

/**
 * Filter templates list based on search query
 */
function filterTemplates(query) {
    const templateItems = document.querySelectorAll('.template-item');
    const lowerQuery = query.toLowerCase();
    
    templateItems.forEach(item => {
        const name = item.textContent.toLowerCase();
        const vendor = item.dataset.vendor.toLowerCase();
        const platform = item.dataset.platform.toLowerCase();
        const type = item.dataset.type.toLowerCase();
        
        if (name.includes(lowerQuery) || vendor.includes(lowerQuery) || 
            platform.includes(lowerQuery) || type.includes(lowerQuery)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

/**
 * Load template details for the selected template
 */
function loadTemplateDetails(templateId) {
    const templateTitle = document.getElementById('template-title');
    const templateDescription = document.getElementById('template-description');
    const templateContent = document.getElementById('template-content');
    const templateConfiguration = document.getElementById('template-configuration');
    
    if (!templateTitle || !templateDescription || !templateContent || !templateConfiguration) return;
    
    // Show template configuration section
    templateConfiguration.classList.remove('hidden');
    
    // Set template title
    const selectedTemplate = document.querySelector(`.template-item[data-id="${templateId}"]`);
    if (selectedTemplate) {
        templateTitle.textContent = selectedTemplate.textContent;
    }
    
    // Set template description based on template ID
    let description = '';
    let content = '';
    
    switch (templateId) {
        case 'cisco-ios-dot1x-mab':
            description = `
                <p>This template configures 802.1X with MAC Authentication Bypass (MAB) on Cisco IOS devices. It includes:</p>
                <ul>
                    <li>Global AAA and RADIUS configuration</li>
                    <li>802.1X with MAB fallback</li>
                    <li>Guest VLAN for failed authentications</li>
                    <li>Critical VLAN for RADIUS server failures</li>
                    <li>Voice VLAN support</li>
                    <li>Best practice security settings</li>
                </ul>
                <p>This template is recommended for environments with mixed clients, including legacy devices that don't support 802.1X.</p>
            `;
            
            content = `! Cisco IOS 802.1X with MAB Configuration Template
! Generated by Dot1Xer Supreme
! Description: Standard configuration for 802.1X with MAB fallback

! Global AAA Configuration
aaa new-model
aaa authentication dot1x default group RADIUS-SERVERS
aaa authorization network default group RADIUS-SERVERS
aaa accounting dot1x default start-stop group RADIUS-SERVERS

! RADIUS Server Configuration
radius server PRIMARY
 address ipv4 <RADIUS_IP_PRIMARY> auth-port 1812 acct-port 1813
 key <RADIUS_KEY_PRIMARY>
 timeout 5
 retransmit 3

! Backup RADIUS Server Configuration (if specified)
radius server BACKUP
 address ipv4 <RADIUS_IP_SECONDARY> auth-port 1812 acct-port 1813
 key <RADIUS_KEY_SECONDARY>
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
 client <RADIUS_IP_PRIMARY> server-key <RADIUS_KEY_PRIMARY>
 client <RADIUS_IP_SECONDARY> server-key <RADIUS_KEY_SECONDARY>
 auth-type any
 port 3799

! VLAN Configuration
vlan <DATA_VLAN>
 name DATA_VLAN
vlan <VOICE_VLAN>
 name VOICE_VLAN
vlan <GUEST_VLAN>
 name GUEST_VLAN
vlan <CRITICAL_VLAN>
 name CRITICAL_VLAN

! Interface Configuration
interface <INTERFACE>
 description 802.1X + MAB Authentication Port
 switchport mode access
 switchport access vlan <DATA_VLAN>
 switchport voice vlan <VOICE_VLAN>
 switchport nonegotiate
 
 ! Authentication settings
 authentication host-mode multi-auth
 authentication open
 authentication order dot1x mab
 authentication priority dot1x mab
 authentication port-control auto
 authentication periodic
 authentication timer reauthenticate 7200
 authentication timer restart 10
 authentication violation restrict
 
 ! 802.1X configuration
 dot1x pae authenticator
 dot1x timeout tx-period 10
 dot1x max-reauth-req 3
 
 ! MAB configuration
 mab
 
 ! Guest VLAN for authentication failures
 authentication event fail action authorize vlan <GUEST_VLAN>
 
 ! Critical VLAN for RADIUS server unavailability
 authentication event server dead action authorize vlan <CRITICAL_VLAN>
 authentication event server alive action reinitialize
 
 ! Spanning tree configuration
 spanning-tree portfast
 spanning-tree bpduguard enable

! End of Configuration`;
            break;
            
        case 'aruba-aoscx-dot1x-mab':
            description = `
                <p>This template configures 802.1X with MAC Authentication Bypass (MAB) on Aruba AOS-CX switches. It includes:</p>
                <ul>
                    <li>RADIUS server configuration</li>
                    <li>802.1X and MAC authentication settings</li>
                    <li>Role-based access control for different authentication states</li>
                    <li>VLAN assignments for authenticated, guest, and critical access</li>
                    <li>Voice VLAN support</li>
                </ul>
                <p>This configuration is designed for Aruba AOS-CX switches (6000, 8000, and 10000 series).</p>
            `;
            
            content = `! Aruba AOS-CX 802.1X with MAB Configuration Template
! Generated by Dot1Xer Supreme
! Description: Standard configuration for 802.1X with MAB fallback on AOS-CX

! RADIUS Server Configuration
radius-server host <RADIUS_IP_PRIMARY> key <RADIUS_KEY_PRIMARY>
radius-server host <RADIUS_IP_SECONDARY> key <RADIUS_KEY_SECONDARY>

! 802.1X Configuration
aaa authentication port-access dot1x authenticator
aaa authentication port-access dot1x authenticator cached-reauth
aaa authentication port-access dot1x authenticator reauthentication
aaa authentication port-access dot1x authenticator timeout quiet-period 10
aaa authentication port-access dot1x authenticator timeout reauth-period 7200
aaa authentication port-access dot1x authenticator timeout supp-timeout 30
aaa authentication port-access dot1x authenticator timeout server-timeout 30
aaa authentication port-access dot1x authenticator max-retries 3
aaa authentication port-access dot1x authenticator max-requests 3

! MAC Authentication Configuration
aaa authentication port-access mac-auth
aaa authentication port-access mac-auth cache-mode
aaa authentication port-access mac-auth cache-timeout 14400
aaa authentication port-access mac-auth max-retries 3
aaa authentication port-access mac-auth timeout quiet-period 10
aaa authentication port-access mac-auth timeout server-timeout 30
aaa authentication port-access mac-auth timeout reauth-period 7200

! VLAN Configuration
vlan <DATA_VLAN>
    name "AUTH_VLAN"
vlan <VOICE_VLAN>
    name "VOICE_VLAN"
vlan <GUEST_VLAN>
    name "GUEST_VLAN"
vlan <CRITICAL_VLAN>
    name "CRITICAL_VLAN"

! Interface Configuration
interface <INTERFACE>
    description "802.1X Authentication Port"
    no shutdown
    aaa authentication port-access dot1x authenticator
    aaa authentication port-access dot1x authenticator logoff-period 300
    aaa authentication port-access dot1x authenticator client-limit 5
    aaa authentication port-access mac-auth
    aaa authentication port-access mac-auth addr-format no-delimiter uppercase
    aaa authentication port-access authenticator active
    aaa authentication port-access authenticator critical-auth
    aaa authentication port-access authenticator auth-priority dot1x mac-auth
    aaa authentication port-access authenticator reauth-period 7200
    aaa port-access role-based unauth-role <GUEST_VLAN>
    aaa port-access role-based auth-role <DATA_VLAN>
    aaa port-access role-based critical-role <CRITICAL_VLAN>
    aaa port-access role-based voice-role <VOICE_VLAN>
    spanning-tree port-type admin-edge
    spanning-tree bpdu-protection

! End of Configuration`;
            break;
            
        case 'juniper-ex-dot1x-mab':
            description = `
                <p>This template configures 802.1X with MAC Authentication Bypass (MAB) on Juniper EX Series switches. It includes:</p>
                <ul>
                    <li>RADIUS server configuration</li>
                    <li>Access profile for authentication</li>
                    <li>802.1X protocol configuration</li>
                    <li>Multiple authentication methods (802.1X and MAC-RADIUS)</li>
                    <li>Guest and server-fail VLAN assignment</li>
                    <li>Interface configuration with VLAN assignments</li>
                </ul>
                <p>This configuration is suitable for Juniper EX Series switches in environments with mixed client types.</p>
            `;
            
            content = `# Juniper EX Series 802.1X with MAB Configuration Template
# Generated by Dot1Xer Supreme
# Description: Standard configuration for 802.1X with MAB fallback on Juniper EX

# RADIUS Server Configuration
system {
    radius-server {
        <RADIUS_IP_PRIMARY> {
            port 1812;
            accounting-port 1813;
            secret "<RADIUS_KEY_PRIMARY>";
            retry 3;
            timeout 5;
        }
        <RADIUS_IP_SECONDARY> {
            port 1812;
            accounting-port 1813;
            secret "<RADIUS_KEY_SECONDARY>";
            retry 3;
            timeout 5;
        }
    }
}

# Access Profile Configuration
access {
    profile dot1x-profile {
        authentication-order [ dot1x mac-radius ];
        radius {
            authentication-server [ <RADIUS_IP_PRIMARY> <RADIUS_IP_SECONDARY> ];
            accounting-server [ <RADIUS_IP_PRIMARY> <RADIUS_IP_SECONDARY> ];
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
        vlan-id <DATA_VLAN>;
    }
    voice-vlan {
        vlan-id <VOICE_VLAN>;
    }
    guest-vlan {
        vlan-id <GUEST_VLAN>;
    }
    critical-vlan {
        vlan-id <CRITICAL_VLAN>;
    }
}

# 802.1X Protocol Configuration
protocols {
    dot1x {
        authenticator {
            authentication-profile-name dot1x-profile;
            interface {
                <INTERFACE> {
                    supplicant multiple;
                    transmit-period 5;
                    mac-radius {
                        restrict;
                    }
                    reauthentication 7200;
                    guest-vlan <GUEST_VLAN>;
                    server-fail vlan-name <CRITICAL_VLAN>;
                    server-reject-vlan <GUEST_VLAN>;
                    eapol-block;
                }
            }
        }
    }
}

# Interface Configuration
interfaces {
    <INTERFACE> {
        unit 0 {
            family ethernet-switching {
                port-mode access;
                vlan {
                    members <DATA_VLAN>;
                }
                voip {
                    vlan <VOICE_VLAN>;
                }
            }
        }
    }
}

# End of Configuration`;
            break;
            
        case 'multi-vendor-deployment':
            description = `
                <p>This comprehensive template provides configuration guidelines for 802.1X deployment across multiple vendor platforms. It includes:</p>
                <ul>
                    <li>RADIUS server configuration for FreeRADIUS</li>
                    <li>Configuration examples for Cisco, Aruba, Juniper, and other devices</li>
                    <li>RADIUS attribute-value pairs for VLAN assignment</li>
                    <li>Change of Authorization (CoA) requirements</li>
                    <li>Best practices and implementation notes</li>
                </ul>
                <p>This guide is ideal for heterogeneous network environments with multiple switch vendors.</p>
            `;
            
            content = `# Multi-Vendor 802.1X Deployment Guide
# Generated by Dot1Xer Supreme
# Description: Comprehensive guide for 802.1X deployment across multiple vendors

############################################################
# RADIUS SERVER CONFIGURATION
############################################################

# FreeRADIUS Configuration
# -----------------------
# In /etc/freeradius/3.0/clients.conf:

client CiscoSwitches {
    ipaddr = 192.168.1.0/24
    secret = <RADIUS_SECRET>
    nas_type = cisco
}

client ArubaControllers {
    ipaddr = 192.168.2.0/24
    secret = <RADIUS_SECRET>
    nas_type = other
}

client JuniperSwitches {
    ipaddr = 192.168.3.0/24
    secret = <RADIUS_SECRET>
    nas_type = other
}

client OtherSwitches {
    ipaddr = 192.168.4.0/24
    secret = <RADIUS_SECRET>
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
 address ipv4 <RADIUS_IP_PRIMARY> auth-port 1812 acct-port 1813
 key <RADIUS_SECRET>

radius server BACKUP
 address ipv4 <RADIUS_IP_SECONDARY> auth-port 1812 acct-port 1813
 key <RADIUS_SECRET>

! Interface Configuration
interface GigabitEthernet1/0/1
 switchport mode access
 switchport access vlan <DATA_VLAN>
 authentication host-mode multi-auth
 authentication port-control auto
 authentication periodic
 dot1x pae authenticator
 spanning-tree portfast

############################################################
# ARUBA AOS-CX CONFIGURATION
############################################################

! RADIUS Server Configuration
radius-server host <RADIUS_IP_PRIMARY> key <RADIUS_SECRET>
radius-server host <RADIUS_IP_SECONDARY> key <RADIUS_SECRET>

! Interface Configuration
interface 1/1/1
 aaa authentication port-access dot1x authenticator
 aaa authentication port-access mac-auth
 aaa authentication port-access authenticator active
 aaa port-access role-based auth-role <DATA_VLAN>
 aaa port-access role-based unauth-role <GUEST_VLAN>

############################################################
# JUNIPER EX CONFIGURATION
############################################################

# RADIUS Server Configuration
system {
    radius-server {
        <RADIUS_IP_PRIMARY> {
            port 1812;
            accounting-port 1813;
            secret "<RADIUS_SECRET>";
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
                    guest-vlan <GUEST_VLAN>;
                }
            }
        }
    }
}

############################################################
# HP PROCURVE CONFIGURATION
############################################################

; RADIUS Server Configuration
radius-server host <RADIUS_IP_PRIMARY> key <RADIUS_SECRET>

; AAA Configuration
aaa authentication port-access eap-radius
aaa port-access authenticator 1
aaa port-access authenticator 1 auth-vid <DATA_VLAN>
aaa port-access authenticator 1 unauth-vid <GUEST_VLAN>

############################################################
# COMMON CONFIGURATION NOTES
############################################################

# RADIUS Attribute-Value Pairs for VLAN Assignment:
# ------------------------------------------------
# Tunnel-Type = VLAN (13)
# Tunnel-Medium-Type = IEEE-802 (6)
# Tunnel-Private-Group-ID = <DATA_VLAN> (for authenticated users)
# Tunnel-Private-Group-ID = <GUEST_VLAN> (for guest/unauthenticated users)
# Tunnel-Private-Group-ID = <VOICE_VLAN> (for voice devices)

# RADIUS Change of Authorization (CoA) Requirements:
# -------------------------------------------------
# - Enable CoA on RADIUS server
# - Configure network devices to accept CoA packets from RADIUS server IP
# - Use the same shared secret for CoA as for authentication
# - Ensure UDP port 3799 is open between RADIUS server and network devices

# Deployment Best Practices:
# -------------------------
# 1. Deploy in monitor mode initially to identify authentication issues
# 2. Roll out to a small pilot group before full deployment
# 3. Ensure backup authentication servers are configured and tested
# 4. Implement Critical VLAN functionality for RADIUS server failures
# 5. Document MAC addresses for devices that require MAB
# 6. Configure appropriate timeouts and retries based on network conditions
# 7. Monitor authentication successes and failures during deployment

# End of Multi-Vendor Deployment Guide`;
            break;
            
        default:
            description = '<p>Select a template to view its details.</p>';
            content = '';
    }
    
    // Update template description and content
    templateDescription.innerHTML = description;
    templateContent.textContent = content;
}

/**
 * Copy text to clipboard
 */
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text)
            .catch(err => {
                console.error('Error copying text: ', err);
                fallbackCopyToClipboard(text);
            });
    } else {
        fallbackCopyToClipboard(text);
    }
}

/**
 * Fallback method to copy to clipboard
 */
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Error copying text: ', err);
        alert('Failed to copy to clipboard. Please select and copy the text manually.');
    }
    
    document.body.removeChild(textArea);
}

/**
 * Download text as a file
 */
function downloadTextFile(text, filename) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    
    element.style.display = 'none';
    document.body.appendChild(element);
    
    element.click();
    
    document.body.removeChild(element);
}

/**
 * Show modal for adding a new template
 */
function showAddTemplateModal() {
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
        max-width: 800px;
        max-height: 80vh;
        overflow-y: auto;
    `;
    
    modalContent.innerHTML = `
        <h3>Add New Template</h3>
        
        <div class="input-group">
            <label for="template-name">Template Name</label>
            <input type="text" id="template-name" placeholder="e.g., Cisco IOS Custom Template">
        </div>
        
        <div class="input-group">
            <label for="template-vendor">Vendor</label>
            <select id="template-vendor">
                <option value="">Select Vendor</option>
                <option value="cisco">Cisco</option>
                <option value="aruba">Aruba</option>
                <option value="juniper">Juniper</option>
                <option value="extreme">Extreme</option>
                <option value="hp">HP</option>
                <option value="multi-vendor">Multi-Vendor</option>
            </select>
        </div>
        
        <div class="input-group">
            <label for="template-platform">Platform</label>
            <select id="template-platform">
                <option value="">Select Platform</option>
                <!-- Will be populated based on vendor selection -->
            </select>
        </div>
        
        <div class="input-group">
            <label for="template-type">Template Type</label>
            <select id="template-type">
                <option value="">Select Type</option>
                <option value="dot1x-only">802.1X Only</option>
                <option value="mab-only">MAB Only</option>
                <option value="dot1x-mab">802.1X + MAB</option>
                <option value="multi-auth">Multi-Auth</option>
                <option value="multi-domain">Multi-Domain</option>
                <option value="deployment">Deployment Guide</option>
            </select>
        </div>
        
        <div class="input-group">
            <label for="template-content-input">Template Content</label>
            <textarea id="template-content-input" rows="15" placeholder="Enter template configuration..."></textarea>
        </div>
        
        <div class="modal-actions">
            <button id="cancel-template" class="secondary-button">Cancel</button>
            <button id="save-template" class="primary-button">Save Template</button>
        </div>
    `;
    
    modalContainer.appendChild(modalContent);
    document.body.appendChild(modalContainer);
    
    // Add event listeners
    document.getElementById('cancel-template').addEventListener('click', function() {
        document.body.removeChild(modalContainer);
    });
    
    document.getElementById('save-template').addEventListener('click', function() {
        // In a real implementation, this would save the template to a database or local storage
        alert('Template saving functionality would be implemented here.');
        document.body.removeChild(modalContainer);
    });
    
    // Handle vendor change to update platform options
    document.getElementById('template-vendor').addEventListener('change', function() {
        const platformSelect = document.getElementById('template-platform');
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
        } else if (vendor === 'multi-vendor') {
            addPlatformOption(platformSelect, 'mixed', 'Mixed Environment');
            addPlatformOption(platformSelect, 'deployment', 'Deployment Guide');
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
 * Show modal for editing a template
 */
function showEditTemplateModal(templateName, templateContent) {
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
        max-width: 800px;
        max-height: 80vh;
        overflow-y: auto;
    `;
    
    modalContent.innerHTML = `
        <h3>Edit Template</h3>
        
        <div class="input-group">
            <label for="edit-template-name">Template Name</label>
            <input type="text" id="edit-template-name" value="${templateName}">
        </div>
        
        <div class="input-group">
            <label for="edit-template-content">Template Content</label>
            <textarea id="edit-template-content" rows="20">${templateContent}</textarea>
        </div>
        
        <div class="modal-actions">
            <button id="cancel-edit" class="secondary-button">Cancel</button>
            <button id="save-edit" class="primary-button">Save Changes</button>
        </div>
    `;
    
    modalContainer.appendChild(modalContent);
    document.body.appendChild(modalContainer);
    
    // Add event listeners
    document.getElementById('cancel-edit').addEventListener('click', function() {
        document.body.removeChild(modalContainer);
    });
    
    document.getElementById('save-edit').addEventListener('click', function() {
        // In a real implementation, this would save the updated template
        const newName = document.getElementById('edit-template-name').value;
        const newContent = document.getElementById('edit-template-content').value;
        
        // Update the displayed template
        document.getElementById('template-title').textContent = newName;
        document.getElementById('template-content').textContent = newContent;
        
        // Close the modal
        document.body.removeChild(modalContainer);
        
        // Show success message
        alert('Template updated successfully!');
    });
    
    // Close modal when clicking outside
    modalContainer.addEventListener('click', function(e) {
        if (e.target === modalContainer) {
            document.body.removeChild(modalContainer);
        }
    });
}
