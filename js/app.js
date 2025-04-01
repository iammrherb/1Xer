let currentStep = 1;

// Tab Navigation
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById(btn.dataset.tab).classList.add('active');
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Wizard Step Navigation
function showStep(step) {
  document.querySelectorAll('.step-content').forEach(c => c.classList.remove('active'));
  document.getElementById(`step-${step}`).classList.add('active');
  document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
  document.querySelector(`.step[data-step="${step}"]`).classList.add('active');
  document.querySelectorAll('.step-item').forEach(i => i.classList.remove('active'));
  document.querySelector(`.step-item[data-step="${step}"]`).classList.add('active');
  currentStep = step;
}

// Sidebar Collapse
document.querySelector('.collapse-btn').addEventListener('click', () => {
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.width = sidebar.style.width === '50px' ? '200px' : '50px';
});

// Configuration Generation
function generateConfiguration() {
  const config = {
    vendor: document.getElementById('vendor-select').value,
    platform: document.getElementById('platform-select').value,
    authMethod: document.getElementById('auth-method').value,
    radiusServer: document.getElementById('radius-server').value,
    radiusSecret: document.getElementById('radius-secret').value,
    dataVlan: document.getElementById('data-vlan').value,
    guestVlan: document.getElementById('guest-vlan').value,
    timeout: document.getElementById('timeout').value,
    criticalVlan: document.getElementById('critical-vlan-enable').checked
  };

  let output = `! Generated Configuration for ${config.vendor} ${config.platform}\n`;
  output += `aaa new-model\n`;
  output += `radius server RADIUS1\n`;
  output += ` address ipv4 ${config.radiusServer} auth-port 1812 acct-port 1813\n`;
  output += ` key ${config.radiusSecret}\n`;
  output += `exit\n`;
  output += `interface GigabitEthernet1/0/1\n`;
  output += ` switchport access vlan ${config.dataVlan}\n`;
  output += ` switchport mode access\n`;
  output += ` authentication port-control auto\n`;
  output += ` ${config.authMethod === 'dot1x-mab' ? 'mab' : ''}\n`;
  output += ` dot1x pae authenticator\n`;
  output += ` dot1x timeout tx-period ${config.timeout}\n`;
  if (config.criticalVlan) output += ` dot1x critical vlan ${config.guestVlan}\n`;
  output += `exit\n`;

  document.getElementById('config-output').textContent = output;
}

// Download Configuration
function downloadConfiguration() {
  const config = document.getElementById('config-output').textContent;
  const blob = new Blob([config], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'dot1x-config.txt';
  a.click();
  URL.revokeObjectURL(url);
}

// Download POC Template
function downloadPOCTemplate() {
  const config = document.getElementById('config-output').textContent;
  const poc = `# POC Template for Dot1Xer Supreme\n\n## Configuration\n${config}\n## Test Plan\n1. Connect a test device.\n2. Verify 802.1X authentication.\n3. Test MAB fallback (if enabled).\n4. Simulate RADIUS failure and check critical VLAN.\n`;
  const blob = new Blob([poc], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'dot1x-poc-template.txt';
  a.click();
  URL.revokeObjectURL(url);
}

// AI Query
async function sendAIQuery() {
  const query = document.getElementById('ai-query').value;
  const service = document.getElementById('ai-service').value;
  const history = document.getElementById('chat-history');
  history.innerHTML += `<p><strong>User:</strong> ${query}</p>`;

  try {
    const response = await fetch('http://localhost:3000/api/proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ service, query, apiKey: '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' })
    });
    const data = await response.json();
    history.innerHTML += `<p><strong>AI (${service}):</strong> ${data.choices ? data.choices[0].text : 'Error: No response'}</p>`;
  } catch (error) {
    history.innerHTML += `<p><strong>AI:</strong> Error: ${error.message}</p>`;
  }
}

// Environmental Analysis (Placeholder)
function analyzeEnvironment() {
  const ipRange = document.getElementById('env-ip').value;
  document.getElementById('env-output').textContent = `Analyzing ${ipRange}... (Placeholder: Implement network scanning logic here.)`;
}

// Initialize
showStep(1);
