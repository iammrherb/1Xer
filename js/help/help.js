/**
 * Dot1Xer Supreme - Help System
 * Provides help documentation and tips
 * Version: 3.0.0
 */

// Initialize help system
function initializeHelpSystem() {
    // Initialize help tabs
    initializeHelpTabs();
    
    // Initialize help tips
    initializeHelpTips();
}

// Initialize help tabs
function initializeHelpTabs() {
    const helpTopics = document.querySelectorAll('.help-topics li');
    const helpContent = document.getElementById('help-content');
    
    if (!helpTopics || !helpContent) {
        return; // Help section not found
    }
    
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

// Initialize help tips
function initializeHelpTips() {
    // No additional initialization needed - CSS handles the tooltip display
}

// Export initialization function
window.initializeHelpSystem = initializeHelpSystem;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeHelpSystem);
