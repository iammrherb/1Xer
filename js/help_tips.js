/**
 * Dot1Xer Supreme - Comprehensive Help Tips System
 * Provides detailed help tips for all configuration options
 * Version: 3.5.0
 */

// Initialize help tips when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeHelpTips();
});

/**
 * Initialize the help tips system
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
 * Help tip content database
 * Organized by category for easy maintenance
 */
const helpTipContent = {
    // General configuration tips
    general: {
        'vendor': 'Select the network equipment manufacturer. This determines the syntax and available features in the generated configuration.',
        'platform': 'Select the specific operating system or platform version. Different platforms from the same vendor may have different configuration syntax and capabilities.',
        'auth-method': 'Choose the authentication method to use:\n\n• 802.1X Only: Authenticates devices using 802.1X protocol only\n• MAB Only: Authenticates devices by MAC address only\n• 802.1X + MAB: Tries 802.1X first, then falls back to MAB if 802.1X fails\n• Multi-Auth: Allows multiple authentication methods simultaneously\n• Multi-Domain: Separate authentication for voice and data devices\n• Multi-Host: Authenticate one device and allow multiple others on same port',
        'eap-method': 'Extensible Authentication Protocol (EAP) method to use:\n\n• PEAP: Protected EAP - tunnels EAP within TLS, common for Windows clients\n• EAP-TLS: Certificate-based, strongest security but requires certificate infrastructure\n• EAP-TTLS: Tunneled TLS, similar to PEAP but more common in non-Windows environments\n• EAP-FAST: Flexible Authentication via Secure Tunneling, developed by Cisco',
    },
    
    // RADIUS configuration tips
    radius: {
        'radius-server': 'IP address of the primary RADIUS authentication server. This server will be tried first for all authentication requests.',
        'radius-port': 'UDP port for RADIUS authentication (default: 1812). Some older servers may use 1645.',
        'radius-secret': 'Shared secret used to encrypt RADIUS communications. Should be a strong, unique key at least 16 characters long with mixed case, numbers, and special characters.',
        'backup-server': 'IP address of the backup RADIUS server. Used if the primary server is unreachable.',
        'backup-port': 'UDP port for backup RADIUS server authentication (default: 1812).',
        'backup-secret': 'Shared secret for the backup RADIUS server. For security, use a different secret than the primary server.',
        'accounting-server': 'IP address of the RADIUS accounting server. Accounting records track user session information.',
        'accounting-port': 'UDP port for RADIUS accounting (default: 1813). Some older servers may use 1646.',
        'radius-timeout': 'How long (in seconds) to wait for a response from the RADIUS server before retrying or failing over.',
        'radius-retries': 'Number of times to retry a RADIUS request before considering the server unavailable.',
        'radius-server-group': 'Logical grouping of RADIUS servers. Allows for organization of servers by function or location.',
        'enable-accounting': 'Enable RADIUS accounting to track user session information including login/logout times and data usage.',
    },
    
    // VLAN configuration tips
    vlan: {
        'vlan-auth': 'VLAN ID for successfully authenticated devices. This is the main production VLAN for authorized users.',
        'vlan-voice': 'VLAN ID for voice devices (IP phones). This allows separate handling of voice traffic for QoS purposes.',
        'vlan-guest': 'VLAN ID for guest devices or failed authentications. Typically provides limited network access.',
        'vlan-critical': 'VLAN ID when authentication servers are unreachable. Used to maintain basic network access during outages.',
        'vlan-auth-name': 'Optional descriptive name for the authenticated devices VLAN.',
        'vlan-voice-name': 'Optional descriptive name for the voice VLAN.',
        'vlan-guest-name': 'Optional descriptive name for the guest VLAN.',
        'vlan-critical-name': 'Optional descriptive name for the critical VLAN.',
        'dynamic-vlan': 'Enable RADIUS-assigned VLANs, allowing the RADIUS server to dynamically specify which VLAN a device should use.',
    },
    
    // Advanced features tips
    advanced: {
        'enable-coa': 'Change of Authorization (CoA) allows the RADIUS server to dynamically change authorization parameters (like VLAN) during a session.',
        'enable-monitor': 'Monitor mode allows the switch to perform 802.1X authentication but not enforce it. Useful for testing or gradual deployment.',
        'enable-radsec': 'RadSec (RADIUS over TLS) encrypts RADIUS traffic over TLS, providing stronger security than the standard RADIUS shared secret.',
        'enable-tacacs': 'Enable TACACS+ for device administration authentication, providing more detailed control than RADIUS for admin access.',
        'enable-mab-auth-failure': 'Allow MAC Authentication Bypass if 802.1X fails. Useful for devices that don\'t support 802.1X.',
        'enable-webauth': 'Enable web authentication as a fallback method, presenting users with a captive portal for credentials.',
        'enable-device-tracking': 'Track devices connecting to the network, monitoring their presence and activity for security purposes.',
        'ibns-policy': 'Cisco Identity-Based Networking Services policies for advanced control of authentication and authorization.',
    },
    
    // Authentication timers and settings
    timers: {
        'auth-timer-restart': 'How long (in seconds) to wait before restarting authentication after a failure.',
        'auth-timer-reauthenticate': 'How often (in seconds) to reauthenticate already authenticated clients. Recommended values: 3600-86400 (1-24 hours).',
        'tx-period': 'How often (in seconds) the switch transmits EAP Request Identity frames to clients that haven\'t responded.',
        'quiet-period': 'How long (in seconds) to wait after an authentication failure before trying again.',
        'supplicant-timeout': 'How long (in seconds) to wait for the client to respond to an EAP request.',
        'server-timeout': 'How long (in seconds) to wait for the authentication server to respond to a request.',
    },
    
    // Security settings
    security: {
        'auth-fail-max': 'Maximum number of authentication failures before taking action (like moving to guest VLAN).',
        'auth-control-direction': 'Direction to apply authentication control:\n\n• Both: Block traffic in both directions until authenticated\n• In: Block incoming traffic but allow outgoing traffic',
        'auth-violation-mode': 'Action to take when unauthorized devices attempt to connect:\n\n• Protect: Drop packets from unauthorized MAC addresses\n• Restrict: Drop packets and generate SNMP trap\n• Shutdown: Error-disable the port',
        'mab-violation-mode': 'Action to take when a MAC address is not authorized during MAB:\n\n• Restrict: Allow limited access\n• Shutdown: Error-disable the port',
        'critical-recovery-delay': 'Time (in seconds) to wait before trying to recover from critical authentication failure.',
        'critical-auth': 'Authentication behavior when RADIUS servers are unreachable:\n\n• Ignore: Fail all authentication attempts\n• Authorize: Allow access to critical VLAN',
    },
    
    // Cisco-specific settings
    cisco: {
        'dot1x-pae': 'Port Access Entity role:\n\n• Authenticator: Switch acts as authenticator\n• Supplicant: Switch acts as client (rare)',
        'ibns-policy-map': 'Cisco Identity-Based Networking Services policy map for advanced authentication control.',
        'periodic-reauthentication': 'Enable or disable periodic reauthentication of clients.',
        'port-control': 'Port authorization state:\n\n• Auto: Port based authentication\n• Force-authorized: Disable authentication\n• Force-unauthorized: Block all traffic',
        'aaa-new-model': 'Enable the AAA (Authentication, Authorization, Accounting) access control model.',
        'aaa-authentication': 'Configure authentication method lists for various access types.',
        'aaa-authorization': 'Configure authorization method lists for various service types.',
        'aaa-accounting': 'Configure accounting method lists to track user activity.',
    },
    
    // Aruba-specific settings
    aruba: {
        'aaa-authentication': 'Configure authentication settings for the Aruba device.',
        'auth-server': 'Configure RADIUS server for authentication on Aruba devices.',
        'server-group': 'Define a group of authentication servers on Aruba devices.',
        'aaa-profile': 'Configure AAA profile for wireless networks on Aruba devices.',
        'ssid-profile': 'Configure SSID settings for wireless networks on Aruba devices.',
    },
    
    // Juniper-specific settings
    juniper: {
        'authentication-profile': 'Define authentication settings on Juniper devices.',
        'access-profile': 'Configure access profile for authentication on Juniper devices.',
        'dot1x-authenticator': 'Configure 802.1X authenticator settings on Juniper devices.',
        'interface-settings': 'Configure interface-specific settings for authentication on Juniper devices.',
    },
    
    // HP-specific settings
    hp: {
        'radius-server-host': 'Configure RADIUS server settings on HP devices.',
        'dot1x-authenticator': 'Configure 802.1X authenticator settings on HP devices.',
        'auth-profile': 'Configure authentication profile on HP devices.',
    },
    
    // Deployment recommendations
    deployment: {
        'phased-deployment': 'Implement 802.1X in phases across your network. Start with a small segment, validate, then expand gradually.',
        'monitor-mode': 'Deploy in monitor mode first to identify potential issues without impacting network access.',
        'mixed-auth': 'Use a combination of authentication methods (802.1X, MAB, WebAuth) to accommodate different device types.',
        'migration-strategy': 'Plan a smooth migration from your current access control to 802.1X with minimal disruption.',
    }
};
