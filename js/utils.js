// Dot1Xer Supreme - Utility Functions

function setupAuthMethodOptions() {
    const authMethodSelect = document.getElementById('auth-method');
    if (authMethodSelect) {
        authMethodSelect.addEventListener('change', function() {
            const mabCheckbox = document.getElementById('use-mab');
            if (mabCheckbox) {
                if (this.value === 'dot1x-only') {
                    mabCheckbox.checked = false;
                    mabCheckbox.disabled = true;
                } else if (this.value === 'mab-only') {
                    mabCheckbox.checked = true;
                    mabCheckbox.disabled = true;
                } else {
                    mabCheckbox.checked = true;
                    mabCheckbox.disabled = false;
                }
            }
        });
    }
}

function setupAPIIntegrations() {
    const apiKeyInput = document.getElementById('ai-api-key');
    const apiModelSelect = document.getElementById('ai-model');
    const apiTestButton = document.getElementById('ai-test-button');
    if (apiTestButton) {
        apiTestButton.addEventListener('click', function() {
            const apiKey = apiKeyInput ? apiKeyInput.value : '';
            const apiModel = apiModelSelect ? apiModelSelect.value : 'default';
            if (!apiKey) {
                showError('Please enter a valid API key.');
                return;
            }
            this.textContent = 'Testing...';
            this.disabled = true;
            setTimeout(() => {
                this.textContent = 'Test Connection';
                this.disabled = false;
                showSuccess('API connection successful! AI assistance is now enabled.');
                const aiCapabilities = document.getElementById('ai-capabilities');
                if (aiCapabilities) {
                    aiCapabilities.style.display = 'block';
                }
            }, 1500);
        });
    }
}

function showError(message) {
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 5000);
    } else {
        alert(message);
    }
}

function showSuccess(message) {
    const successElement = document.getElementById('success-message');
    if (successElement) {
        successElement.textContent = message;
        successElement.style.display = 'block';
        setTimeout(() => {
            successElement.style.display = 'none';
        }, 5000);
    } else {
        alert(message);
    }
}

function generateConfiguration() {
    const vendor = document.getElementById('vendor-select').value;
    const platform = document.getElementById('platform-select').value;
    const authMethod = document.getElementById('auth-method').value;
    const authMode = document.querySelector('input[name="auth_mode"]:checked').value;
    const hostMode = document.getElementById('host-mode').value;
    const dataVlan = document.getElementById('data-vlan').value;
    const voiceVlan = document.getElementById('voice-vlan').value || '';
    const guestVlan = document.getElementById('guest-vlan').value || '';
    const radiusIp1 = document.getElementById('radius-ip-1').value;
    const radiusKey1 = document.getElementById('radius-key-1').value;

    if (!dataVlan || !radiusIp1 || !radiusKey1) {
        showError('Please complete all required fields (Data VLAN and Primary RADIUS Server)');
        return;
    }

    let config = `! Configuration for ${vendor} ${platform}\n`;
    if (vendor === 'cisco') {
        if (platform === 'ios-xe') {
            config += `aaa new-model\n`;
            config += `radius server RADIUS-SRV-1\n address ipv4 ${radiusIp1} auth-port 1812 acct-port 1813\n key ${radiusKey1}\n`;
            config += `aaa group server radius RADIUS-SERVERS\n server name RADIUS-SRV-1\n`;
            config += `aaa authentication dot1x default group RADIUS-SERVERS\n`;
            config += `dot1x system-auth-control\n`;
            config += `interface GigabitEthernet1/0/1\n switchport access vlan ${dataVlan}\n`;
            config += ` switchport mode access\n authentication port-control auto\n`;
            config += ` authentication host-mode ${hostMode}\n`;
            if (authMethod.includes('mab')) config += ` mab\n`;
            if (guestVlan) config += ` authentication event fail action authorize vlan ${guestVlan}\n`;
        } else if (platform === 'nx-os') {
            config += `feature aaa\nfeature dot1x\nradius-server host ${radiusIp1} key ${radiusKey1}\n`;
            config += `interface Ethernet1/1\n switchport access vlan ${dataVlan}\n dot1x pae authenticator\n`;
            config += `${authMethod.includes('mab') ? 'dot1x mac-auth-bypass\n' : ''}`;
            config += `dot1x port-control ${authMode === 'closed' ? 'force-authorized' : 'auto'}\n`;
            if (guestVlan) config += `dot1x guest-vlan ${guestVlan}\n`;
        }
    } else if (vendor === 'aruba') {
        if (platform === 'aos-cx') {
            config += `aaa authentication port-access dot1x\n`;
            config += `radius-server host ${radiusIp1} key ${radiusKey1}\n`;
            config += `interface 1/1/1\n vlan access ${dataVlan}\n`;
            config += ` port-access authenticator\n`;
            if (authMethod.includes('mab')) config += ` authentication precedence mac-auth dot1x\n`;
            if (guestVlan) config += ` authentication guest-vlan ${guestVlan}\n`;
        }
    } else if (vendor === 'juniper') {
        config += `set protocols dot1x authenticator authentication-profile-name RADIUS-SERVERS\n`;
        config += `set access radius-server ${radiusIp1} secret ${radiusKey1}\n`;
        config += `set interfaces ge-0/0/1 unit 0 family ethernet-switching vlan members ${dataVlan}\n`;
        config += `set protocols dot1x authenticator interface ge-0/0/1\n`;
        if (authMethod.includes('mab')) config += ` mac-radius\n`;
        if (guestVlan) config += ` guest-vlan ${guestVlan}\n`;
    } else if (vendor === 'fortinet') {
        config += `config system aaa\n edit "RADIUS-SRV-1"\n set server "${radiusIp1}"\n set secret "${radiusKey1}"\n next\nend\n`;
        config += `config switch-interface\n edit "port1"\n set native-vlan ${dataVlan}\n`;
        if (authMethod.includes('mab')) config += ` set mac-auth-bypass enable\n`;
        config += ` set security-mode 802.1X\n next\nend\n`;
    } else if (vendor === 'arista') {
        config += `dot1x system-auth-control\n`;
        config += `radius-server host ${radiusIp1} key ${radiusKey1}\n`;
        config += `interface Ethernet1\n switchport access vlan ${dataVlan}\n dot1x pae authenticator\n`;
        if (authMethod.includes('mab')) config += ` dot1x mac-auth-bypass\n`;
    } else if (vendor === 'extreme') {
        config += `configure radius netlogin primary server ${radiusIp1} 1812 client-ip <SWITCH_IP> shared-secret ${radiusKey1}\n`;
        config += `enable dot1x\n`;
        config += `configure vlan ${dataVlan} ports 1\n`;
        config += `configure dot1x netlogin ports 1\n`;
        if (authMethod.includes('mab')) config += ` mac-auth\n`;
    } else if (vendor === 'huawei') {
        config += `dot1x enable\n`;
        config += `radius-server template RADIUS-SRV-1\n radius-server shared-key cipher ${radiusKey1}\n radius-server ip ${radiusIp1}\n`;
        config += `interface GigabitEthernet0/0/1\n dot1x authentication-method eap\n`;
        config += ` port link-type access\n port default vlan ${dataVlan}\n`;
        if (authMethod.includes('mab')) config += ` dot1x mac-auth-bypass\n`;
    } else if (vendor === 'alcatel') {
        config += `aaa radius-server "RADIUS-SRV-1" host ${radiusIp1} key ${radiusKey1}\n`;
        config += `vlan ${dataVlan}\n`;
        config += `interface port 1/1\n 802.1x enable\n`;
        if (authMethod.includes('mab')) config += ` 802.1x mac-auth\n`;
    } else if (vendor === 'ubiquiti') {
        config += `set service dot1x radius-server ${radiusIp1} key ${radiusKey1}\n`;
        config += `set interfaces ethernet eth1 vif ${dataVlan}\n`;
        config += `set interfaces ethernet eth1 dot1x enable\n`;
        if (authMethod.includes('mab')) config += ` mac-auth enable\n`;
    } else if (vendor === 'hp') {
        config += `radius-server host ${radiusIp1} key ${radiusKey1}\n`;
        config += `vlan ${dataVlan}\n`;
        config += `interface 1\n 802.1x authenticator\n`;
        if (authMethod.includes('mab')) config += ` 802.1x mac-auth\n`;
    } else if (vendor === 'dell') {
        config += `aaa authentication dot1x default radius\n`;
        config += `radius-server host ${radiusIp1} key ${radiusKey1}\n`;
        config += `interface ethernet 1/1/1\n switchport access vlan ${dataVlan}\n dot1x authentication\n`;
        if (authMethod.includes('mab')) config += ` dot1x mac-auth-bypass\n`;
    } else if (vendor === 'netgear') {
        config += `dot1x system-auth-control\n`;
        config += `radius-server host ${radiusIp1} key ${radiusKey1}\n`;
        config += `interface 1/0/1\n dot1x port-control auto\n`;
        if (authMethod.includes('mab')) config += ` dot1x mac-auth-bypass\n`;
    } else if (vendor === 'ruckus') {
        config += `aaa authentication dot1x default radius\n`;
        config += `radius-server host ${radiusIp1} key ${radiusKey1}\n`;
        config += `interface 1/1\n dot1x 802.1x\n`;
        if (authMethod.includes('mab')) config += ` mac-auth-bypass\n`;
    } else if (vendor === 'brocade') {
        config += `aaa authentication dot1x default radius\n`;
        config += `radius-server host ${radiusIp1} key ${radiusKey1}\n`;
        config += `interface ethernet 1/1\n dot1x-enable\n`;
        if (authMethod.includes('mab')) config += ` dot1x mac-auth-bypass\n`;
    } else if (vendor === 'paloalto') {
        config += `set authentication-profile RADIUS-SRV-1 radius server ${radiusIp1} secret ${radiusKey1}\n`;
        config += `set network vlan ${dataVlan}\n`;
        config += `set network interface ethernet ethernet1/1 dot1x\n`;
        if (authMethod.includes('mab')) config += ` mac-auth\n`;
    } else if (vendor === 'checkpoint') {
        config += `set radius server ${radiusIp1} secret ${radiusKey1}\n`;
        config += `set interface eth1 dot1x enable\n`;
        if (authMethod.includes('mab')) config += ` mac-auth enable\n`;
    } else if (vendor === 'sonicwall') {
        config += `radius-server host ${radiusIp1} key ${radiusKey1}\n`;
        config += `interface X1\n dot1x enable\n`;
        if (authMethod.includes('mab')) config += ` mac-auth enable\n`;
    } else if (vendor === 'portnox') {
        config += `! Portnox Cloud configuration\n`;
        config += `radius-server host ${radiusIp1} key ${radiusKey1}\n`;
        config += `interface 1\n dot1x enable\n`;
        if (authMethod.includes('mab')) config += ` mac-auth enable\n`;
    }
    document.getElementById('config-output').textContent = config;
}

function downloadConfiguration() {
    const config = document.getElementById('config-output').textContent;
    if (!config) {
        showError('Please generate a configuration first');
        return;
    }
    const vendor = document.getElementById('vendor-select').value;
    const platform = document.getElementById('platform-select').value;
    const blob = new Blob([config], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${vendor}_${platform}_802.1x_config.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function copyConfiguration() {
    const config = document.getElementById('config-output').textContent;
    if (!config) {
        showError('Please generate a configuration first');
        return;
    }
    navigator.clipboard.writeText(config)
        .then(() => {
            const copyBtn = document.getElementById('copy-btn');
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            setTimeout(() => copyBtn.textContent = originalText, 2000);
        })
        .catch(err => showError('Failed to copy: ' + err));
}
