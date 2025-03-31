let configData = {
    platform: '',
    aaa: {},
    radius: [],
    tacacs: [],
    dot1x: {},
    coa: {},
    deviceTracking: {},
    port: {}
};

let radiusServerCount = 1;
let tacacsServerCount = 1;

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function showSection(sectionId) {
    // Hide all sections
    const sections = document.getElementsByClassName('section');
    for (let i = 0; i < sections.length; i++) {
        sections[i].classList.remove('active');
    }

    // Remove active class from all sidebar links
    const links = document.querySelectorAll('.sidebar nav ul li a');
    for (let i = 0; i < links.length; i++) {
        links[i].classList.remove('active');
    }

    // Show the selected section and mark the link as active
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
        const selectedLink = document.querySelector(`a[onclick="showSection('${sectionId}')"]`);
        if (selectedLink) {
            selectedLink.classList.add('active');
        } else {
            console.error(`Link for section ${sectionId} not found.`);
        }
    } else {
        console.error(`Section with ID ${sectionId} not found.`);
    }

    // Update platform-specific settings visibility
    updatePlatformSpecificSettings();
}

function updatePlatformInfo() {
    const platform = document.getElementById('platform').value;
    configData.platform = platform;
    const platformInfo = document.getElementById('platformInfo');
    const info = {
        'cisco_iosxe': "Cisco: IOS-XE (Catalyst): Modern Catalyst switches (9000, 3800, etc.) with IBNS 2.0 support.",
        'cisco_nxos': "Cisco: NX-OS (Nexus): Nexus switches with different AAA syntax and features.",
        'aruba_arubaos': "Aruba: ArubaOS: Wired and wireless switches with dot1x profiles.",
        'juniper_junos': "Juniper: Junos: EX/QFX switches with 802.1X support.",
        'extreme_exos': "Extreme: EXOS: Extreme Networks switches with netlogin.",
        'arista_eos': "Arista: EOS: EOS switches with 802.1X capabilities.",
        'portnox': "Portnox: Switch: Portnox-enabled switches with advanced 802.1X and NAC features."
    };
    platformInfo.innerHTML = `<p><strong>${info[platform].split(':')[0]}: ${info[platform].split(':')[1]}:</strong> ${info[platform].split(':')[2]}</p>`;
    updatePlatformSpecificSettings();
}

function updatePlatformSpecificSettings() {
    const platform = configData.platform;
    const ciscoSettings = document.getElementById('ciscoSettings');
    const portnoxSettings = document.getElementById('portnoxSettings');
    ciscoSettings.style.display = (platform === 'cisco_iosxe' || platform === 'cisco_nxos') ? 'block' : 'none';
    portnoxSettings.style.display = (platform === 'portnox') ? 'block' : 'none';
}

function addRadiusServer() {
    radiusServerCount++;
    const container = document.getElementById('radiusServers');
    const newServer = document.createElement('div');
    newServer.className = 'server-entry';
    newServer.innerHTML = `
        <h3>RADIUS Server ${radiusServerCount}</h3>
        <label for="radius_ip_${radiusServerCount}">RADIUS Server IP:</label>
        <input type="text" id="radius_ip_${radiusServerCount}" placeholder="e.g., 192.168.1.11"><br>
        <label for="radius_key_${radiusServerCount}">Shared Key:</label>
        <input type="text" id="radius_key_${radiusServerCount}" placeholder="e.g., SecretKey2"><br>
        <label for="radius_auth_port_${radiusServerCount}">Auth Port:</label>
        <input type="number" id="radius_auth_port_${radiusServerCount}" placeholder="e.g., 1812" min="1" max="65535"><br>
        <label for="radius_acct_port_${radiusServerCount}">Acct Port:</label>
        <input type="number" id="radius_acct_port_${radiusServerCount}" placeholder="e.g., 1813" min="1" max="65535"><br>
        <label for="radius_priority_${radiusServerCount}">Priority:</label>
        <input type="number" id="radius_priority_${radiusServerCount}" placeholder="e.g., ${radiusServerCount}" min="1" max="10"><br>
    `;
    container.appendChild(newServer);
}

function addTacacsServer() {
    tacacsServerCount++;
    const container = document.getElementById('tacacsServers');
    const newServer = document.createElement('div');
    newServer.className = 'server-entry';
    newServer.innerHTML = `
        <h3>TACACS+ Server ${tacacsServerCount}</h3>
        <label for="tacacs_ip_${tacacsServerCount}">TACACS+ Server IP:</label>
        <input type="text" id="tacacs_ip_${tacacsServerCount}" placeholder="e.g., 192.168.1.21"><br>
        <label for="tacacs_key_${tacacsServerCount}">Shared Key:</label>
        <input type="text" id="tacacs_key_${tacacsServerCount}" placeholder="e.g., TacacsKey2"><br>
        <label for="tacacs_auth_port_${tacacsServerCount}">Auth Port:</label>
        <input type="number" id="tacacs_auth_port_${tacacsServerCount}" placeholder="e.g., 49" min="1" max="65535"><br>
        <label for="tacacs_priority_${tacacsServerCount}">Priority:</label>
        <input type="number" id="tacacs_priority_${tacacsServerCount}" placeholder="e.g., ${tacacsServerCount}" min="1" max="10"><br>
    `;
    container.appendChild(newServer);
}

function generateConfig() {
    try {
        let config = `! Generated Configuration\n! Platform: ${configData.platform}\n! Generated on ${new Date().toLocaleString()}\n`;

        // AAA Settings
        const aaaAuthMethod = document.getElementById('aaa_auth_method').value;
        const aaaAccounting = document.getElementById('aaa_accounting').checked;
        if (!aaaAuthMethod) throw new Error("Authentication method is required.");
        configData.aaa = { authMethod: aaaAuthMethod, accounting: aaaAccounting };

        // RADIUS Servers
        configData.radius = [];
        for (let i = 1; i <= radiusServerCount; i++) {
            const ip = document.getElementById(`radius_ip_${i}`).value;
            const key = document.getElementById(`radius_key_${i}`).value;
            const authPort = document.getElementById(`radius_auth_port_${i}`).value || 1812;
            const acctPort = document.getElementById(`radius_acct_port_${i}`).value || 1813;
            const priority = document.getElementById(`radius_priority_${i}`).value || i;
            if (ip && key) {
                configData.radius.push({ ip, key, authPort, acctPort, priority });
            }
        }
        if (configData.aaa.authMethod === 'radius' && configData.radius.length === 0) {
            throw new Error("At least one RADIUS server is required when using RADIUS authentication.");
        }

        // TACACS+ Servers
        configData.tacacs = [];
        for (let i = 1; i <= tacacsServerCount; i++) {
            const ip = document.getElementById(`tacacs_ip_${i}`).value;
            const key = document.getElementById(`tacacs_key_${i}`).value;
            const authPort = document.getElementById(`tacacs_auth_port_${i}`).value || 49;
            const priority = document.getElementById(`tacacs_priority_${i}`).value || i;
            if (ip && key) {
                configData.tacacs.push({ ip, key, authPort, priority });
            }
        }

        // 802.1X Settings
        const dot1xInterface = document.getElementById('dot1x_interface').value;
        const dot1xVlan = document.getElementById('dot1x_vlan').value;
        if (!dot1xInterface || !dot1xVlan) throw new Error("Interface and VLAN ID are required for 802.1X settings.");
        configData.dot1x = {
            interface: dot1xInterface,
            vlan: dot1xVlan,
            reauth: document.getElementById('dot1x_reauth').value || 3600,
            tx: document.getElementById('dot1x_tx').value || 10,
            mode: document.getElementById('dot1x_mode') ? document.getElementById('dot1x_mode').value : 'closed',
            ibns: {
                enable: document.getElementById('ibns_enable') ? document.getElementById('ibns_enable').checked : false,
                policy: document.getElementById('ibns_policy') ? document.getElementById('ibns_policy').value || 'DOT1X_MAB_POLICY' : 'DOT1X_MAB_POLICY'
            },
            portnox: {
                profile: document.getElementById('portnox_profile') ? document.getElementById('portnox_profile').value || 'PORTNOX_PROFILE' : 'PORTNOX_PROFILE',
                guestVlan: document.getElementById('portnox_guest_vlan') ? document.getElementById('portnox_guest_vlan').value || 100 : 100,
                dynamicVlan: document.getElementById('portnox_dynamic_vlan') ? document.getElementById('portnox_dynamic_vlan').checked : false
            }
        };

        // CoA
        configData.coa = {
            enable: document.getElementById('coa_enable').checked,
            port: document.getElementById('coa_port').value || 1700
        };

        // Device Tracking
        configData.deviceTracking = {
            enable: document.getElementById('device_tracking_enable').checked,
            policy: document.getElementById('device_tracking_policy').value || 'IP-TRACKING'
        };

        // Port Integration
        const portMode = document.getElementById('port_mode').value;
        const portHostMode = document.getElementById('port_host_mode').value;
        if (!portMode || !portHostMode) throw new Error("Port mode and host mode are required.");
        configData.port = { mode: portMode, hostMode: portHostMode };

        // Generate config based on platform
        if (configData.platform === 'cisco_iosxe') {
            config += `aaa new-model\n`;
            if (configData.aaa.authMethod === 'radius') {
                config += `aaa authentication dot1x default group radius\n`;
                config += `aaa authorization network default group radius\n`;
                if (configData.aaa.accounting) {
                    config += `aaa accounting dot1x default start-stop group radius\n`;
                }
                configData.radius.forEach((server, index) => {
                    config += `radius server ISE${index + 1}\n address ipv4 ${server.ip} auth-port ${server.authPort} acct-port ${server.acctPort}\n key ${server.key}\n`;
                });
            }
            if (configData.aaa.authMethod === 'tacacs') {
                config += `aaa authentication dot1x default group tacacs+\n`;
                configData.tacacs.forEach((server, index) => {
                    config += `tacacs server TACACS${index + 1}\n address ipv4 ${server.ip}\n key ${server.key}\n port ${server.authPort}\n`;
                });
            }
            config += `dot1x system-auth-control\n`;
            if (configData.deviceTracking.enable) {
                config += `ip device tracking\n`;
                config += `device-tracking policy ${configData.deviceTracking.policy}\n`;
            }
            if (configData.dot1x.ibns.enable) {
                config += `policy-map type control subscriber ${configData.dot1x.ibns.policy}\n`;
                config += ` event session-started match-all\n  10 class always do-until-failure\n   10 authenticate using dot1x priority 10\n`;
            }
            config += `interface ${configData.dot1x.interface}\n`;
            config += ` switchport mode ${configData.port.mode}\n`;
            config += ` switchport access vlan ${configData.dot1x.vlan}\n`;
            config += ` authentication host-mode ${configData.port.hostMode}\n`;
            config += ` authentication port-control auto\n`;
            if (configData.dot1x.mode === 'open') {
                config += ` authentication open\n`;
            }
            config += ` dot1x pae authenticator\n`;
            config += ` dot1x timeout tx-period ${configData.dot1x.tx}\n`;
        } else if (configData.platform === 'cisco_nxos') {
            config += `feature dot1x\n`;
            if (configData.aaa.authMethod === 'radius') {
                config += `aaa authentication dot1x default group radius\n`;
                configData.radius.forEach((server, index) => {
                    config += `radius-server host ${server.ip} key ${server.key} auth-port ${server.authPort} acct-port ${server.acctPort}\n`;
                });
            }
            if (configData.aaa.authMethod === 'tacacs') {
                config += `aaa authentication dot1x default group tacacs+\n`;
                configData.tacacs.forEach((server, index) => {
                    config += `tacacs-server host ${server.ip} key ${server.key} port ${server.authPort}\n`;
                });
            }
            if (configData.dot1x.ibns.enable) {
                config += `policy-map type control subscriber ${configData.dot1x.ibns.policy}\n`;
                config += ` event session-started match-all\n  10 class always do-until-failure\n   10 authenticate using dot1x priority 10\n`;
            }
            config += `interface ${configData.dot1x.interface}\n`;
            config += ` switchport access vlan ${configData.dot1x.vlan}\n`;
            config += ` dot1x port-control auto\n`;
            if (configData.dot1x.mode === 'open') {
                config += ` dot1x open\n`;
            }
            config += ` dot1x timeout reauth-period ${configData.dot1x.reauth}\n`;
        } else if (configData.platform === 'aruba_arubaos') {
            config += `aaa authentication dot1x "dot1x-profile"\n dot1x enable\n`;
            if (configData.aaa.authMethod === 'radius') {
                config += `aaa server-group "radius-group"\n`;
                configData.radius.forEach(server => {
                    config += ` auth-server ${server.ip}\n`;
                    config += `radius-server host ${server.ip} key ${server.key} port ${server.authPort}\n`;
                });
            }
            config += `interface ${configData.dot1x.interface}\n`;
            config += ` switchport access vlan ${configData.dot1x.vlan}\n`;
            config += ` dot1x enable\n aaa authentication dot1x "dot1x-profile"\n`;
        } else if (configData.platform === 'juniper_junos') {
            configData.radius.forEach(server => {
                config += `set system radius-server ${server.ip} secret ${server.key} port ${server.authPort}\n`;
            });
            config += `set access profile dot1x-profile authentication-order radius\n`;
            configData.radius.forEach(server => {
                config += `set access profile dot1x-profile radius authentication-server ${server.ip}\n`;
            });
            config += `set vlans authenticated vlan-id ${configData.dot1x.vlan}\n`;
            config += `set protocols dot1x authenticator authentication-profile-name dot1x-profile\n`;
            config += `set protocols dot1x authenticator interface ${configData.dot1x.interface} reauthentication ${configData.dot1x.reauth}\n`;
        } else if (configData.platform === 'extreme_exos') {
            configData.radius.forEach((server, index) => {
                config += `configure radius netlogin primary server ${server.ip} ${server.authPort} client-ip ${server.ip} shared-secret ${server.key}\n`;
            });
            config += `enable radius netlogin\n`;
            config += `configure vlan ${configData.dot1x.vlan} name Authenticated\n`;
            config += `configure netlogin vlan ${configData.dot1x.vlan}\n`;
            config += `enable netlogin dot1x\n`;
            config += `configure netlogin dot1x port ${configData.dot1x.interface} authentication enable\n`;
        } else if (configData.platform === 'arista_eos') {
            config += `aaa authentication dot1x default group radius\n`;
            config += `dot1x system-auth-control\n`;
            configData.radius.forEach(server => {
                config += `radius-server host ${server.ip} auth-port ${server.authPort} acct-port ${server.acctPort} key ${server.key}\n`;
            });
            config += `interface ${configData.dot1x.interface}\n`;
            config += ` switchport access vlan ${configData.dot1x.vlan}\n`;
            config += ` dot1x pae authenticator\n`;
            config += ` dot1x port-control auto\n`;
        } else if (configData.platform === 'portnox') {
            config += `aaa authentication dot1x "${configData.dot1x.portnox.profile}"\n`;
            if (configData.aaa.authMethod === 'radius') {
                configData.radius.forEach(server => {
                    config += `radius-server host ${server.ip} key ${server.key} auth-port ${server.authPort} acct-port ${server.acctPort}\n`;
                });
            }
            config += `interface ${configData.dot1x.interface}\n`;
            config += ` switchport access vlan ${configData.dot1x.vlan}\n`;
            config += ` dot1x enable\n`;
            config += ` dot1x profile "${configData.dot1x.portnox.profile}"\n`;
            if (configData.dot1x.portnox.guestVlan) {
                config += ` dot1x guest-vlan ${configData.dot1x.portnox.guestVlan}\n`;
            }
            if (configData.dot1x.portnox.dynamicVlan) {
                config += ` dot1x dynamic-vlan enable\n`;
            }
        }

        document.getElementById('configOutput').textContent = config;
    } catch (error) {
        alert(`Error generating configuration: ${error.message}`);
        console.error(error);
    }
}

function downloadConfig() {
    let config = document.getElementById('configOutput').textContent;
    if (!config) {
        alert("Please generate a config first!");
        return;
    }
    let blob = new Blob([config], { type: "text/plain" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `dot1xer_config_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Show the first section by default
document.addEventListener('DOMContentLoaded', () => {
    showSection('PlatformSelection');
});
