// Dot1Xer Supreme Core Functions

document.addEventListener('DOMContentLoaded', () => {
  goToStep(1);
});

function goToStep(step) {
  document.querySelectorAll('.step-content').forEach(content => content.style.display = 'none');
  document.getElementById(`step-${step}`).style.display = 'block';
  document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
  document.querySelector(`.step[data-step="${step}"]`).classList.add('active');
}

function addRadiusServer() {
  const container = document.getElementById('radius-servers');
  const index = container.children.length + 1;
  const div = document.createElement('div');
  div.className = 'radius-server';
  div.dataset.index = index;
  div.innerHTML = `
    <h4>RADIUS Server ${index}</h4>
    <div class="form-group">
      <label for="radius-ip-${index}">IP Address:</label>
      <input type="text" id="radius-ip-${index}" placeholder="e.g., 10.1.1.${100 + index}">
      <label for="radius-key-${index}">Shared Secret:</label>
      <input type="password" id="radius-key-${index}" placeholder="Shared secret">
      <label for="radius-auth-port-${index}">Auth Port:</label>
      <input type="number" id="radius-auth-port-${index}" value="1812">
      <label for="radius-acct-port-${index}">Acct Port:</label>
      <input type="number" id="radius-acct-port-${index}" value="1813">
      <label for="radius-coa-port-${index}">CoA Port:</label>
      <input type="number" id="radius-coa-port-${index}" value="3799">
    </div>
  `;
  container.appendChild(div);
}

function generateConfiguration() {
  const vendors = Array.from(document.getElementById('vendor-select').selectedOptions).map(opt => opt.value);
  const authMethod = document.getElementById('auth-method').value;
  const authMode = document.querySelector('input[name="auth_mode"]:checked').value;
  const radiusServers = document.getElementById('radius-servers').children;
  const dataVlan = document.getElementById('data-vlan').value;
  const voiceVlan = document.getElementById('voice-vlan').value || '';
  const guestVlan = document.getElementById('guest-vlan').value || '';
  const criticalVlan = document.getElementById('critical-vlan').value || '';
  const useCoa = document.getElementById('use-coa').checked;
  const useTacacs = document.getElementById('use-tacacs').checked;
  const useRadsec = document.getElementById('use-radsec').checked;
  const useDeviceTracking = document.getElementById('use-device-tracking').checked;
  const useIbns = document.getElementById('use-ibns').checked && vendors.includes('cisco');

  let configOutput = '';

  vendors.forEach(vendor => {
    let config = `# Configuration for ${vendor}\n`;
    config += `# Authentication Method: ${authMethod}\n`;
    config += `# Authentication Mode: ${authMode}\n\n`;

    // RADIUS Servers
    for (let i = 0; i < radiusServers.length; i++) {
      const index = i + 1;
      const ip = document.getElementById(`radius-ip-${index}`).value;
      const key = document.getElementById(`radius-key-${index}`).value;
      const authPort = document.getElementById(`radius-auth-port-${index}`).value;
      const acctPort = document.getElementById(`radius-acct-port-${index}`).value;
      const coaPort = document.getElementById(`radius-coa-port-${index}`).value;
      if (ip && key) {
        config += `radius-server host ${ip} auth-port ${authPort} acct-port ${acctPort} key ${key}\n`;
        if (useCoa && coaPort) config += `radius-server coa-port ${coaPort}\n`;
      }
    }

    // VLAN Configuration
    config += `\n# VLAN Configuration\n`;
    config += `vlan ${dataVlan}\n name Data_VLAN\n`;
    if (voiceVlan) config += `vlan ${voiceVlan}\n name Voice_VLAN\n`;
    if (guestVlan) config += `vlan ${guestVlan}\n name Guest_VLAN\n`;
    if (criticalVlan) config += `vlan ${criticalVlan}\n name Critical_VLAN\n`;

    // Interface Configuration (simplified)
    config += `\n# Interface Configuration\n`;
    config += `interface <INTERFACE>\n`;
    config += ` switchport mode access\n`;
    config += ` switchport access vlan ${dataVlan}\n`;
    if (voiceVlan) config += ` switchport voice vlan ${voiceVlan}\n`;
    config += ` authentication port-control auto\n`;
    if (authMethod === 'dot1x-mab' || authMethod === 'mab-only') config += ` mab\n`;
    if (guestVlan) config += ` authentication event fail action authorize vlan ${guestVlan}\n`;
    if (criticalVlan) config += ` authentication event server dead action authorize vlan ${criticalVlan}\n`;
    config += ` no shutdown\n`;

    // Additional features
    if (useTacacs) config += `\n# TACACS+ Configuration\n# (Add TACACS+ server details)\n`;
    if (useRadsec) config += `\n# RADSEC Configuration\n# (Add RADSEC server details)\n`;
    if (useDeviceTracking) config += `\n# Device Tracking Configuration\n# (Add device tracking policy)\n`;
    if (useIbns && vendor === 'cisco') config += `\n# IBNS Configuration\n# (Add IBNS policy maps)\n`;

    config += `\n# See templates/${vendor}/dot1x_mab.conf for full configuration\n\n`;
    configOutput += config;
  });

  document.getElementById('config-output').textContent = configOutput;
}

function downloadConfiguration() {
  const config = document.getElementById('config-output').textContent;
  const blob = new Blob([config], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'dot1xer_configs.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function generatePOCReport() {
  const config = document.getElementById('config-output').textContent;
  const company = document.getElementById('company-name').value || 'Unknown Company';
  const report = `POC Report for ${company}\n\nPrerequisites:\n- RADIUS Servers Configured\n- Network Switches Ready\n\nConfigurations:\n${config}`;
  const blob = new Blob([report], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${company}_POC_Report.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
