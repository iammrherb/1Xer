// Dot1Xer Supreme - Main JavaScript

// Current step in the configurator
let currentStep = 1;

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize UI components
  initUI();
  
  // Set up event listeners
  setupEventListeners();
});

// Initialize UI components
function initUI() {
  // Show first step of configurator
  showStep(1);
  
  // Set up vendor/platform options
  updatePlatformOptions();
  
  // Initialize accordion sections
  initAccordions();
  
  // Initialize tooltip library if present
  if (typeof tippy !== 'undefined') {
    tippy('[data-tippy-content]');
  }
}

// Set up event listeners
function setupEventListeners() {
  // Vendor select change
  const vendorSelect = document.getElementById('vendor-select');
  if (vendorSelect) {
    vendorSelect.addEventListener('change', updatePlatformOptions);
  }
  
  // Auth method change
  const authMethodSelect = document.getElementById('auth-method');
  if (authMethodSelect) {
    authMethodSelect.addEventListener('change', updateAuthOptions);
  }
  
  // Pre-auth ACL checkbox
  const preAuthAclCheckbox = document.getElementById('enable-preauth-acl');
  if (preAuthAclCheckbox) {
    preAuthAclCheckbox.addEventListener('change', function() {
      document.getElementById('preauth-acl-options').style.display = 
        this.checked ? 'block' : 'none';
    });
  }
  
  // RADIUS load balancing checkbox
  const loadBalanceCheckbox = document.getElementById('radius-load-balance');
  if (loadBalanceCheckbox) {
    loadBalanceCheckbox.addEventListener('change', function() {
      document.getElementById('load-balance-options').style.display = 
        this.checked ? 'block' : 'none';
    });
  }
  
  // TACACS command auth checkbox
  const authCommandsCheckbox = document.getElementById('auth-commands');
  if (authCommandsCheckbox) {
    authCommandsCheckbox.addEventListener('change', function() {
      document.getElementById('command-auth-options').style.display = 
        this.checked ? 'block' : 'none';
    });
  }
  
  // TACACS command acct checkbox
  const acctCommandsCheckbox = document.getElementById('acct-commands');
  if (acctCommandsCheckbox) {
    acctCommandsCheckbox.addEventListener('change', function() {
      document.getElementById('command-acct-options').style.display = 
        this.checked ? 'block' : 'none';
    });
  }
  
  // Import source radio
  const importSourceRadios = document.querySelectorAll('input[name="import_source"]');
  importSourceRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      document.getElementById('file-import').style.display = 
        this.value === 'file' ? 'block' : 'none';
      document.getElementById('text-import').style.display = 
        this.value === 'text' ? 'block' : 'none';
    });
  });
  
  // Credential type change
  const credTypeSelect = document.getElementById('cred-type');
  if (credTypeSelect) {
    credTypeSelect.addEventListener('change', function() {
      document.getElementById('ssh-creds').style.display = 
        this.value === 'ssh' ? 'block' : 'none';
      document.getElementById('snmp-creds').style.display = 
        this.value === 'snmp' ? 'block' : 'none';
      document.getElementById('api-creds').style.display = 
        this.value === 'api' ? 'block' : 'none';
    });
  }
  
  // SNMP version change
  const snmpVersionSelect = document.getElementById('snmp-version');
  if (snmpVersionSelect) {
    snmpVersionSelect.addEventListener('change', function() {
      document.getElementById('snmp-v2-options').style.display = 
        this.value === 'v2c' ? 'block' : 'none';
      document.getElementById('snmp-v3-options').style.display = 
        this.value === 'v3' ? 'block' : 'none';
    });
  }
  
  // SSH enable checkbox
  const sshEnableCheckbox = document.getElementById('ssh-enable');
  if (sshEnableCheckbox) {
    sshEnableCheckbox.addEventListener('change', function() {
      document.getElementById('enable-creds').style.display = 
        this.checked ? 'block' : 'none';
    });
  }
  
  // Scan credentials dropdown
  const scanCredentialsSelect = document.getElementById('scan-credentials');
  if (scanCredentialsSelect) {
    scanCredentialsSelect.addEventListener('change', function() {
      if (this.value === 'new') {
        document.getElementById('credentials-modal').style.display = 'flex';
        this.value = ''; // Reset selection
      }
    });
  }
}

// Initialize accordion functionality
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      this.classList.toggle('active');
      const content = this.nextElementSibling;
      content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
  });
}

// Show a specific tab
function showTab(tabName, button) {
  // Hide all tabs
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(tab => tab.style.display = 'none');
  
  // Show the selected tab
  document.getElementById(tabName).style.display = 'block';
  
  // Update active tab button
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => btn.classList.remove('active'));
  if (button) button.classList.add('active');
}

// Show a server tab within the server configuration
function showServerTab(tabName, button) {
  // Hide all server tabs
  const serverTabs = document.querySelectorAll('.server-tab');
  serverTabs.forEach(tab => tab.style.display = 'none');
  
  // Show the selected tab
  document.getElementById(tabName).style.display = 'block';
  
  // Update active tab button
  const tabButtons = document.querySelectorAll('.tab-control-btn');
  tabButtons.forEach(btn => btn.classList.remove('active'));
  if (button) button.classList.add('active');
}

// Show a specific step in the configurator
function showStep(step) {
  // Hide all steps
  const steps = document.querySelectorAll('.step-content');
  steps.forEach(s => s.style.display = 'none');
  
  // Show the requested step
  document.getElementById('step-' + step).style.display = 'block';
  
  // Update step indicator
  const indicators = document.querySelectorAll('.step');
  indicators.forEach(i => i.classList.remove('active'));
  
  const currentIndicator = document.querySelector(`.step[data-step="${step}"]`);
  if (currentIndicator) currentIndicator.classList.add('active');
  
  // Update current step
  currentStep = step;
}

// Navigate to next step
function goToStep(step) {
  // Validate current step before proceeding
  if (step > currentStep && !validateStep(currentStep)) {
    return false;
  }
  
  // Show the requested step
  showStep(step);
  
  return true;
}

// Validate the current step
function validateStep(step) {
  switch(step) {
    case 1:
      // Validate vendor/platform selection
      return true;
    case 2:
      // Validate authentication method
      return true;
    case 3:
      // Validate server information
      const radiusIp1 = document.getElementById('radius-ip-1').value;
      const radiusKey1 = document.getElementById('radius-key-1').value;
      
      if (!radiusIp1 || !radiusKey1) {
        showError('Primary RADIUS server information is required');
        return false;
      }
      return true;
    case 4:
      // Validate VLAN information
      const dataVlan = document.getElementById('data-vlan').value;
      if (!dataVlan) {
        showError('Data VLAN is required');
        return false;
      }
      return true;
    case 5:
      // Validate advanced options
      return true;
    default:
      return true;
  }
}

// Show error message
function showError(message) {
  const errorElement = document.getElementById('error-message');
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    // Hide after a few seconds
    setTimeout(() => {
      errorElement.style.display = 'none';
    }, 5000);
  }
}

// Toggle accordion sections
function toggleAccordion(element) {
  element.classList.toggle('active');
  const content = element.nextElementSibling;
  content.style.display = content.style.display === 'block' ? 'none' : 'block';
  
  // Update icon
  const icon = element.querySelector('.accordion-icon');
  if (icon) {
    icon.textContent = content.style.display === 'block' ? '-' : '+';
  }
}

// Update platform options based on vendor selection
function updatePlatformOptions() {
  const vendorSelect = document.getElementById('vendor-select');
  const platformSelect = document.getElementById('platform-select');
  const platformDescription = document.getElementById('platform-description');
  
  if (!vendorSelect || !platformSelect || !platformDescription) return;
  
  // Clear existing options
  platformSelect.innerHTML = '';
  
  // Get selected vendor
  const vendor = vendorSelect.value;
  
  // Add platform options based on vendor
  switch (vendor) {
    case 'cisco':
      addOption(platformSelect, 'ios-xe', 'IOS-XE (Catalyst 9000)');
      addOption(platformSelect, 'ios', 'IOS (Classic)');
      addOption(platformSelect, 'nx-os', 'NX-OS (Nexus)');
      addOption(platformSelect, 'wlc', 'WLC 9800');
      platformDescription.innerHTML = '<p>Cisco platforms support a wide range of authentication methods and features:</p>' +
        '<ul>' +
        '<li><strong>IOS-XE:</strong> Supports IBNS 2.0 with flexible policy maps and both open and closed authentication modes.</li>' +
        '<li><strong>NX-OS:</strong> Offers 802.1X and MAB with advanced device tracking.</li>' +
        '<li><strong>IOS:</strong> Legacy platform with traditional 802.1X implementation.</li>' +
        '<li><strong>WLC:</strong> Wireless controller with integrated RADIUS support.</li>' +
        '</ul>';
      break;
    case 'aruba':
      addOption(platformSelect, 'aos-cx', 'AOS-CX');
      addOption(platformSelect, 'aos-switch', 'AOS-Switch (Legacy)');
      platformDescription.innerHTML = '<p>Aruba platforms provide robust authentication capabilities:</p>' +
        '<ul>' +
        '<li><strong>AOS-CX:</strong> Modern architecture with simplified 802.1X and MAC authentication configuration.</li>' +
        '<li><strong>AOS-Switch:</strong> Legacy platform with traditional approach to port security.</li>' +
        '</ul>';
      break;
    case 'juniper':
      addOption(platformSelect, 'ex', 'EX Series');
      addOption(platformSelect, 'qfx', 'QFX Series');
      platformDescription.innerHTML = '<p>Juniper switches use a consistent configuration approach across platforms:</p>' +
        '<ul>' +
        '<li><strong>EX Series:</strong> Enterprise switching platforms with 802.1X, MAC-RADIUS, and captive portal.</li>' +
        '<li><strong>QFX Series:</strong> Data center switches with similar authentication capabilities.</li>' +
        '</ul>';
      break;
    case 'fortinet':
      addOption(platformSelect, 'fortiswitch', 'FortiSwitch');
      platformDescription.innerHTML = '<p>FortiSwitch integrates with the FortiGate security ecosystem and supports standard 802.1X and MAC authentication.</p>';
      break;
    case 'arista':
      addOption(platformSelect, 'eos', 'EOS');
      platformDescription.innerHTML = '<p>Arista EOS supports 802.1X, MAC authentication, and LLDP bypass for VoIP devices, with a focus on data center environments.</p>';
      break;
    case 'extreme':
      addOption(platformSelect, 'exos', 'EXOS');
      platformDescription.innerHTML = '<p>Extreme EXOS uses NetLogin for 802.1X and MAC authentication with dynamic VLAN assignment and policy-based control.</p>';
      break;
    case 'huawei':
      addOption(platformSelect, 'vrp', 'VRP');
      platformDescription.innerHTML = '<p>Huawei VRP supports 802.1X, MAC authentication bypass, and critical VLAN assignment with global and interface-specific configurations.</p>';
      break;
    case 'alcatel':
      addOption(platformSelect, 'omniswitch', 'OmniSwitch');
      platformDescription.innerHTML = '<p>Alcatel-Lucent OmniSwitch uses Unified Network Profile (UNP) with 802.1X and MAC authentication templates for simplified deployment.</p>';
      break;
    case 'ubiquiti':
      addOption(platformSelect, 'unifi', 'UniFi');
      platformDescription.innerHTML = '<p>Ubiquiti UniFi requires configuration through the UniFi Network Controller rather than CLI, with profiles for 802.1X and RADIUS settings.</p>';
      break;
    default:
      addOption(platformSelect, 'default', 'Default Platform');
      platformDescription.innerHTML = '<p>Please select a vendor to see platform details.</p>';
  }
}

// Add option to select element
function addOption(selectElement, value, text) {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = text;
  selectElement.appendChild(option);
}

// Update authentication options based on method selection
function updateAuthOptions() {
  const authMethod = document.getElementById('auth-method').value;
  const mabCheckbox = document.getElementById('use-mab');
  
  if (mabCheckbox) {
    if (authMethod === 'dot1x-only') {
      mabCheckbox.checked = false;
      mabCheckbox.disabled = true;
    } else if (authMethod === 'mab-only') {
      mabCheckbox.checked = true;
      mabCheckbox.disabled = true;
    } else {
      mabCheckbox.checked = true;
      mabCheckbox.disabled = false;
    }
  }
}

// Show/Hide FAQ items
function toggleFaq(element) {
  const answer = element.nextElementSibling;
  const toggle = element.querySelector('.faq-toggle');
  
  answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
  toggle.textContent = answer.style.display === 'block' ? '-' : '+';
}

// Reference architecture tab selection
function showRefTab(tabName, button) {
  // Hide all ref sections
  const sections = document.querySelectorAll('.ref-section');
  sections.forEach(s => s.style.display = 'none');
  
  // Show the selected section
  document.getElementById('ref-' + tabName).style.display = 'block';
  
  // Update active tab button
  const tabButtons = document.querySelectorAll('.ref-tab');
  tabButtons.forEach(btn => btn.classList.remove('active'));
  if (button) button.classList.add('active');
}

// Discovery tab selection
function showDiscoveryTab(tabName, button) {
  // Hide all discovery sections
  const sections = document.querySelectorAll('.discovery-section');
  sections.forEach(s => s.style.display = 'none');
  
  // Show the selected section
  document.getElementById('disc-' + tabName).style.display = 'block';
  
  // Update active tab button
  const tabButtons = document.querySelectorAll('.discovery-tab');
  tabButtons.forEach(btn => btn.classList.remove('active'));
  if (button) button.classList.add('active');
}

// Help tab selection
function showHelpTab(tabName, button) {
  // Hide all help sections
  const sections = document.querySelectorAll('.help-section');
  sections.forEach(s => s.style.display = 'none');
  
  // Show the selected section
  document.getElementById('help-' + tabName).style.display = 'block';
  
  // Update active tab button
  const tabButtons = document.querySelectorAll('.help-tab');
  tabButtons.forEach(btn => btn.classList.remove('active'));
  if (button) button.classList.add('active');
}

// Modal controls
function closeCredentialsModal() {
  document.getElementById('credentials-modal').style.display = 'none';
}

function saveCredentials() {
  // In a real implementation, this would save the credentials
  // For demo purposes, just close the modal and update the dropdown
  const credName = document.getElementById('cred-name').value;
  if (!credName) {
    alert('Please provide a name for these credentials');
    return;
  }
  
  // Add to dropdown
  const scanCredentialsSelect = document.getElementById('scan-credentials');
  addOption(scanCredentialsSelect, 'saved-' + Date.now(), credName);
  
  // Select the new option
  scanCredentialsSelect.value = scanCredentialsSelect.options[scanCredentialsSelect.options.length - 1].value;
  
  // Close modal
  closeCredentialsModal();
}

// Network scan functions
function startNetworkScan() {
  const scanRange = document.getElementById('scan-range').value;
  
  if (!scanRange) {
    showError('Please enter an IP range to scan');
    return;
  }
  
  // Show scan results section
  document.querySelector('.scan-results').style.display = 'block';
  document.getElementById('scan-status').textContent = 'Scanning...';
  
  // Simulate progress
  const progressBar = document.querySelector('.progress');
  let progress = 0;
  
  const interval = setInterval(() => {
    progress += 5;
    progressBar.style.width = `${progress}%`;
    
    if (progress >= 100) {
      clearInterval(interval);
      document.getElementById('scan-status').textContent = 'Scan complete';
      populateSampleResults();
    }
  }, 200);
}

function populateSampleResults() {
  const tbody = document.querySelector('#scan-results-table tbody');
  tbody.innerHTML = '';
  
  // Sample data
  const devices = [
    { ip: '10.1.1.1', type: 'Switch', platform: 'Cisco Catalyst 9300', version: '17.3.4', aaa: 'Enabled' },
    { ip: '10.1.1.2', type: 'Switch', platform: 'Cisco Catalyst 9300', version: '17.3.4', aaa: 'Enabled' },
    { ip: '10.1.1.3', type: 'Switch', platform: 'Aruba 6300', version: '10.06.0010', aaa: 'Disabled' },
    { ip: '10.1.1.4', type: 'Router', platform: 'Cisco ISR 4451', version: '16.9.3', aaa: 'Partial' },
    { ip: '10.1.1.5', type: 'Switch', platform: 'Juniper EX4300', version: '20.4R1', aaa: 'Disabled' },
    { ip: '10.1.1.6', type: 'Switch', platform: 'Cisco Nexus 9300', version: '9.3.8', aaa: 'Enabled' }
  ];
  
  devices.forEach(device => {
    const row = document.createElement('tr');
    
    // IP Address
    const ipCell = document.createElement('td');
    ipCell.textContent = device.ip;
    row.appendChild(ipCell);
    
    // Device Type
    const typeCell = document.createElement('td');
    typeCell.textContent = device.type;
    row.appendChild(typeCell);
    
    // Platform
    const platformCell = document.createElement('td');
    platformCell.textContent = device.platform;
    row.appendChild(platformCell);
    
    // Version
    const versionCell = document.createElement('td');
    versionCell.textContent = device.version;
    row.appendChild(versionCell);
    
    // AAA Status
    const aaaCell = document.createElement('td');
    aaaCell.textContent = device.aaa;
    if (device.aaa === 'Enabled') {
      aaaCell.classList.add('status-enabled');
    } else if (device.aaa === 'Disabled') {
      aaaCell.classList.add('status-disabled');
    } else {
      aaaCell.classList.add('status-partial');
    }
    row.appendChild(aaaCell);
    
    // Action
    const actionCell = document.createElement('td');
    const analyzeBtn = document.createElement('button');
    analyzeBtn.textContent = 'Analyze';
    analyzeBtn.addEventListener('click', () => analyzeDevice(device.ip));
    actionCell.appendChild(analyzeBtn);
    row.appendChild(actionCell);
    
    tbody.appendChild(row);
  });
}

function analyzeConfiguration() {
  const importSource = document.querySelector('input[name="import_source"]:checked').value;
  let configText = '';
  
  if (importSource === 'file') {
    const fileInput = document.getElementById('config-file');
    if (!fileInput.files || fileInput.files.length === 0) {
      showError('Please select a configuration file');
      return;
    }
    // In a real implementation, we would read the file
    // For demo purposes, we'll just proceed
  } else {
    configText = document.getElementById('config-text').value;
    if (!configText) {
      showError('Please paste configuration text');
      return;
    }
  }
  
  // Switch to analysis tab
  showDiscoveryTab('analyze', document.querySelector('.discovery-tab[onclick*="analyze"]'));
  
  // Show analysis results
  document.getElementById('analysis-waiting').style.display = 'none';
  document.getElementById('analysis-results').style.display = 'block';
  
  // Populate sample analysis
  document.getElementById('device-count').textContent = '1';
  document.getElementById('aaa-enabled-count').textContent = '1';
  document.getElementById('dot1x-enabled-count').textContent = '1';
  document.getElementById('issues-count').textContent = '3';
  
  // Populate AAA details
  let aaaDetails = `
    <div class="detail-item">
      <span class="detail-label">AAA Mode:</span>
      <span class="detail-value">New Model</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Authentication Method:</span>
      <span class="detail-value">dot1x default group RADIUS-SERVERS</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Authorization Method:</span>
      <span class="detail-value">network default group RADIUS-SERVERS</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Accounting:</span>
      <span class="detail-value">Enabled</span>
    </div>
  `;
  
  document.getElementById('aaa-details').innerHTML = aaaDetails;
  
  // Populate RADIUS details
  let radiusDetails = `
    <div class="detail-item">
      <span class="detail-label">Primary Server:</span>
      <span class="detail-value">10.1.1.100 (auth: 1812, acct: 1813)</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Secondary Server:</span>
      <span class="detail-value">10.1.1.101 (auth: 1812, acct: 1813)</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Server Group:</span>
      <span class="detail-value">RADIUS-SERVERS</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">CoA:</span>
      <span class="detail-value">Enabled</span>
    </div>
  `;
  
  document.getElementById('radius-details').innerHTML = radiusDetails;
  
  // Populate 802.1X details
  let dot1xDetails = `
    <div class="detail-item">
      <span class="detail-label">Global Status:</span>
      <span class="detail-value">Enabled (dot1x system-auth-control)</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Mode:</span>
      <span class="detail-value">Closed (access-session closed)</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">MAB:</span>
      <span class="detail-value">Enabled</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Host Mode:</span>
      <span class="detail-value">Multi-Domain</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Guest VLAN:</span>
      <span class="detail-value">VLAN 100</span>
    </div>
  `;
  
  document.getElementById('dot1x-details').innerHTML = dot1xDetails;
  
  // Populate issues
  let issuesDetails = `
    <div class="issue-item">
      <span class="issue-severity high">High</span>
      <span class="issue-desc">RADIUS shared secret is using a weak password</span>
      <span class="issue-rec">Use a strong, unique shared secret for each RADIUS server</span>
    </div>
    <div class="issue-item">
      <span class="issue-severity medium">Medium</span>
      <span class="issue-desc">No Critical VLAN configured for RADIUS server failures</span>
      <span class="issue-rec">Configure server-fail action or Critical VLAN</span>
    </div>
    <div class="issue-item">
      <span class="issue-severity low">Low</span>
      <span class="issue-desc">RADIUS timeout value (5s) may be too short for congested networks</span>
      <span class="issue-rec">Consider increasing timeout to 10s</span>
    </div>
  `;
  
  document.getElementById('issues-details').innerHTML = issuesDetails;
}

function analyzeDevice(ip) {
  // Switch to analysis tab
  showDiscoveryTab('analyze', document.querySelector('.discovery-tab[onclick*="analyze"]'));
  
  // Show analysis results
  document.getElementById('analysis-waiting').style.display = 'none';
  document.getElementById('analysis-results').style.display = 'block';
  
  // Update information based on IP
  if (ip.endsWith('6')) { // Nexus device
    document.getElementById('device-count').textContent = '1';
    document.getElementById('aaa-enabled-count').textContent = '1';
    document.getElementById('dot1x-enabled-count').textContent = '1';
    document.getElementById('issues-count').textContent = '2';
    
    // Populate NX-OS specific info
    let aaaDetails = `
      <div class="detail-item">
        <span class="detail-label">AAA Mode:</span>
        <span class="detail-value">Enabled</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Authentication Method:</span>
        <span class="detail-value">dot1x default group RADIUS-SERVERS</span>
      </div>
    `;
    
    document.getElementById('aaa-details').innerHTML = aaaDetails;
    
    let radiusDetails = `
      <div class="detail-item">
        <span class="detail-label">Primary Server:</span>
        <span class="detail-value">10.1.1.100 (auth: 1812, acct: 1813)</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Server Group:</span>
        <span class="detail-value">RADIUS-SERVERS</span>
      </div>
    `;
    
    document.getElementById('radius-details').innerHTML = radiusDetails;
    
    let dot1xDetails = `
      <div class="detail-item">
        <span class="detail-label">Global Status:</span>
        <span class="detail-value">Enabled (feature dot1x)</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">MAB:</span>
        <span class="detail-value">Enabled (dot1x mac-auth-bypass)</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Interfaces:</span>
        <span class="detail-value">Eth1/1-48</span>
      </div>
    `;
    
    document.getElementById('dot1x-details').innerHTML = dot1xDetails;
    
    let issuesDetails = `
      <div class="issue-item">
        <span class="issue-severity medium">Medium</span>
        <span class="issue-desc">No secondary RADIUS server configured</span>
        <span class="issue-rec">Configure a secondary RADIUS server for redundancy</span>
      </div>
      <div class="issue-item">
        <span class="issue-severity low">Low</span>
        <span class="issue-desc">Default authentication timers in use</span>
        <span class="issue-rec">Consider optimizing timers for your environment</span>
      </div>
    `;
    
    document.getElementById('issues-details').innerHTML = issuesDetails;
  } else {
    // Default analysis for other devices
    document.getElementById('device-count').textContent = '1';
    document.getElementById('aaa-enabled-count').textContent = '1';
    document.getElementById('dot1x-enabled-count').textContent = '1';
    document.getElementById('issues-count').textContent = '3';
    
    // Populate AAA details for standard device
    let aaaDetails = `
      <div class="detail-item">
        <span class="detail-label">AAA Mode:</span>
        <span class="detail-value">New Model</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Authentication Method:</span>
        <span class="detail-value">dot1x default group RADIUS-SERVERS</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Authorization Method:</span>
        <span class="detail-value">network default group RADIUS-SERVERS</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Accounting:</span>
        <span class="detail-value">Enabled</span>
      </div>
    `;
    
    document.getElementById('aaa-details').innerHTML = aaaDetails;
    
    // Use standard analysis for other elements
  }
}

// Generate configuration based on form inputs
function generateConfiguration() {
  // Get form values
  const vendor = document.getElementById('vendor-select').value;
  const platform = document.getElementById('platform-select').value;
  const authMethod = document.getElementById('auth-method').value;
  const authMode = document.querySelector('input[name="auth_mode"]:checked').value;
  const hostMode = document.getElementById('host-mode').value;
  
  // VLAN settings
  const dataVlan = document.getElementById('data-vlan').value;
  const voiceVlan = document.getElementById('voice-vlan').value;
  const guestVlan = document.getElementById('guest-vlan').value;
  const criticalVlan = document.getElementById('critical-vlan').value;
  const authFailVlan = document.getElementById('auth-fail-vlan').value;
  
  // Server settings
  const radiusServerGroup = document.getElementById('radius-server-group').value;
  const radiusIp1 = document.getElementById('radius-ip-1').value;
  const radiusKey1 = document.getElementById('radius-key-1').value;
  const radiusIp2 = document.getElementById('radius-ip-2').value;
  const radiusKey2 = document.getElementById('radius-key-2').value;
  
  // RADIUS options
  const radiusAuthPort = document.getElementById('radius-auth-port').value;
  const radiusAcctPort = document.getElementById('radius-acct-port').value;
  const radiusCoaPort = document.getElementById('radius-coa-port').value;
  const radiusTimeout = document.getElementById('radius-timeout').value;
  const radiusRetransmit = document.getElementById('radius-retransmit').value;
  const radiusDeadtime = document.getElementById('radius-deadtime').value;
  
  // RADIUS attributes
  const macFormat = document.getElementById('mac-format').value;
  const macUppercase = document.getElementById('mac-case').checked;
  
  // Options
  const enableLoadBalance = document.getElementById('radius-load-balance').checked;
  const loadBalanceMethod = document.getElementById('load-balance-method').value;
  const enableTesting = document.getElementById('radius-testing').checked;
  const testingUsername = document.getElementById('testing-username').value;
  const enableDynamicVlan = document.getElementById('enable-dynamic-vlan').checked;
  const enablePreAuthAcl = document.getElementById('enable-preauth-acl').checked;
  const preAuthAclName = document.getElementById('preauth-acl-name')?.value;
  
  // Authentication timers
  const reauthPeriod = document.getElementById('reauth-period').value;
  const timeoutPeriod = document.getElementById('timeout-period').value;
  const txPeriod = document.getElementById('tx-period').value;
  const quietPeriod = document.getElementById('quiet-period').value;
  const maxReauthReq = document.getElementById('max-reauth-req').value;
  const maxAuthReq = document.getElementById('max-auth-req').value;
  
  // Interfaces
  const interfaces = document.getElementById('interfaces').value || 'GigabitEthernet1/0/1';
  
  // Validate required fields
  if (!dataVlan || !radiusIp1 || !radiusKey1) {
    showError('Please complete all required fields (Data VLAN and Primary RADIUS Server)');
    return;
  }
  
  // Generate configuration based on vendor and options
  let config = '';

  switch(vendor) {
    case 'cisco':
      if (platform === 'nx-os') {
        config = generateCiscoNxOsConfig(
          dataVlan, voiceVlan, guestVlan, criticalVlan, authFailVlan,
          radiusServerGroup, radiusIp1, radiusKey1, radiusIp2, radiusKey2, 
          radiusAuthPort, radiusAcctPort, radiusTimeout, radiusRetransmit,
          interfaces, authMethod, authMode, hostMode,
          reauthPeriod, timeoutPeriod, txPeriod, quietPeriod, 
          enableDynamicVlan, enablePreAuthAcl, preAuthAclName
        );
      } else if (platform === 'ios-xe') {
        config = generateCiscoIosXeConfig(
          dataVlan, voiceVlan, guestVlan, criticalVlan, authFailVlan,
          radiusServerGroup, radiusIp1, radiusKey1, radiusIp2, radiusKey2, 
          radiusAuthPort, radiusAcctPort, radiusCoaPort, radiusTimeout, radiusRetransmit, radiusDeadtime,
          enableLoadBalance, loadBalanceMethod, enableTesting, testingUsername,
          interfaces, authMethod, authMode, hostMode,
          reauthPeriod, timeoutPeriod, txPeriod, quietPeriod, maxReauthReq, maxAuthReq,
          enableDynamicVlan, enablePreAuthAcl, preAuthAclName, macFormat, macUppercase
        );
      } else if (platform === 'ios') {
        config = generateCiscoIosConfig(
          dataVlan, voiceVlan, guestVlan, criticalVlan, authFailVlan,
          radiusServerGroup, radiusIp1, radiusKey1, radiusIp2, radiusKey2, 
          radiusAuthPort, radiusAcctPort, radiusTimeout, radiusRetransmit,
          interfaces, authMethod, authMode, hostMode,
          reauthPeriod, timeoutPeriod, txPeriod, quietPeriod,
          enableDynamicVlan, enablePreAuthAcl, preAuthAclName
        );
      } else {
        // WLC
        config = "WLC configuration not yet implemented.";
      }
      break;
    case 'aruba':
      if (platform === 'aos-cx') {
        config = generateArubaAosCxConfig(
          dataVlan, voiceVlan, guestVlan, criticalVlan,
          radiusIp1, radiusKey1, radiusIp2, radiusKey2, 
          radiusAuthPort, radiusAcctPort,
          interfaces, authMethod, authMode, hostMode,
          reauthPeriod, timeoutPeriod, txPeriod, quietPeriod
        );
      } else {
        config = "AOS-Switch configuration not yet implemented.";
      }
      break;
    case 'juniper':
      config = generateJuniperConfig(
        dataVlan, voiceVlan, guestVlan, criticalVlan,
        radiusIp1, radiusKey1, radiusIp2, radiusKey2, 
        radiusAuthPort, radiusAcctPort,
        interfaces, authMethod, authMode, hostMode,
        reauthPeriod, timeoutPeriod, txPeriod, quietPeriod
      );
      break;
    // Handle other vendors...
    default:
      config = "Configuration for " + vendor + " " + platform + " is not implemented yet.";
  }
  
  // Display the generated configuration
  const outputElement = document.getElementById('config-output');
  if (outputElement) {
    outputElement.textContent = config;
  }
}

// Configuration generator for Cisco NX-OS
function generateCiscoNxOsConfig(
  dataVlan, voiceVlan, guestVlan, criticalVlan, authFailVlan,
  radiusServerGroup, radiusIp1, radiusKey1, radiusIp2, radiusKey2, 
  radiusAuthPort, radiusAcctPort, radiusTimeout, radiusRetransmit,
  interfaces, authMethod, authMode, hostMode,
  reauthPeriod, timeoutPeriod, txPeriod, quietPeriod, 
  enableDynamicVlan, enablePreAuthAcl, preAuthAclName
) {
  // Build configuration string for NX-OS
  let config = `! =====================================================================
! Cisco NX-OS 802.1X Configuration
! Authentication Method: ${authMethod === 'dot1x-only' ? 'Dot1X Only' : authMethod === 'mab-only' ? 'MAB Only' : authMethod === 'concurrent' ? 'Dot1X and MAB Concurrent' : 'Dot1X with MAB Fallback'}
! Authentication Mode: ${authMode === 'closed' ? 'Closed' : 'Open'}
! =====================================================================

! --- Feature Enablement ---
feature aaa
feature dot1x

! --- RADIUS Server Configuration ---
radius-server host ${radiusIp1} key ${radiusKey1} authentication accounting
${radiusIp2 ? `radius-server host ${radiusIp2} key ${radiusKey2} authentication accounting` : ''}
radius-server timeout ${radiusTimeout || '5'}
radius-server retransmit ${radiusRetransmit || '3'}
radius-server deadtime 10

! --- AAA Configuration ---
aaa group server radius ${radiusServerGroup || 'RADIUS-SERVERS'}
  server ${radiusIp1}
  ${radiusIp2 ? `server ${radiusIp2}` : ''}
  use-vrf default
  source-interface mgmt0

aaa authentication dot1x default group ${radiusServerGroup || 'RADIUS-SERVERS'}
aaa accounting dot1x default group ${radiusServerGroup || 'RADIUS-SERVERS'}

! --- 802.1X Global Configuration ---
dot1x system-auth-control
dot1x timeout quiet-period ${quietPeriod || '60'}
dot1x timeout tx-period ${txPeriod || '5'}
dot1x timeout re-authperiod ${reauthPeriod || '3600'}
dot1x timeout server-timeout ${timeoutPeriod || '30'}
${authMethod !== 'dot1x-only' ? 'dot1x mac-auth-bypass' : ''}

! --- VLAN Configuration ---
vlan ${dataVlan}
  name Data_VLAN
${voiceVlan ? `vlan ${voiceVlan}\n  name Voice_VLAN` : ''}
${guestVlan ? `vlan ${guestVlan}\n  name Guest_VLAN` : ''}
${criticalVlan ? `vlan ${criticalVlan}\n  name Critical_VLAN` : ''}
${authFailVlan ? `vlan ${authFailVlan}\n  name Auth_Fail_VLAN` : ''}

! --- Pre-Authentication ACL ---
${enablePreAuthAcl && preAuthAclName ? `ip access-list ${preAuthAclName}
  10 permit udp any any eq bootps
  20 permit udp any any eq bootpc
  30 permit udp any any eq domain
  40 permit icmp any any
  50 deny ip any any` : ''}

! --- Interface Configuration ---
interface ${interfaces}
  switchport
  switchport mode access
  switchport access vlan ${dataVlan}
  ${voiceVlan ? `switchport voice vlan ${voiceVlan}` : ''}
  dot1x pae authenticator
  dot1x port-control ${authMode === 'closed' ? 'force-unauthorized' : 'auto'}
  ${authMethod === 'mab-only' ? 'dot1x mac-auth-bypass eap' : authMethod !== 'dot1x-only' ? 'dot1x mac-auth-bypass' : ''}
  ${hostMode === 'multi-host' ? 'dot1x host-mode multi-host' : hostMode === 'multi-auth' ? 'dot1x host-mode multi-auth' : ''}
  dot1x timeout quiet-period ${quietPeriod || '60'}
  dot1x timeout server-timeout ${timeoutPeriod || '30'}
  dot1x timeout tx-period ${txPeriod || '5'}
  dot1x timeout re-authperiod ${reauthPeriod || '3600'}
  ${guestVlan ? `dot1x guest-vlan ${guestVlan}` : ''}
  ${authFailVlan ? `dot1x auth-fail-vlan ${authFailVlan}` : ''}
  ${enablePreAuthAcl && preAuthAclName ? `dot1x auth-fail access-vlan ${preAuthAclName}` : ''}
  no shutdown`;
  
  return config;
}

// Configuration generator for Cisco IOS-XE
function generateCiscoIosXeConfig(
  dataVlan, voiceVlan, guestVlan, criticalVlan, authFailVlan,
  radiusServerGroup, radiusIp1, radiusKey1, radiusIp2, radiusKey2, 
  radiusAuthPort, radiusAcctPort, radiusCoaPort, radiusTimeout, radiusRetransmit, radiusDeadtime,
  enableLoadBalance, loadBalanceMethod, enableTesting, testingUsername,
  interfaces, authMethod, authMode, hostMode,
  reauthPeriod, timeoutPeriod, txPeriod, quietPeriod, maxReauthReq, maxAuthReq,
  enableDynamicVlan, enablePreAuthAcl, preAuthAclName, macFormat, macUppercase
) {
  // Build configuration string for IOS-XE with IBNS 2.0
  let config = `! =====================================================================
! Cisco IOS-XE IBNS 2.0 802.1X Configuration
! Authentication Method: ${authMethod === 'dot1x-only' ? 'Dot1X Only' : authMethod === 'mab-only' ? 'MAB Only' : authMethod === 'concurrent' ? 'Dot1X and MAB Concurrent' : 'Dot1X with MAB Fallback'}
! Authentication Mode: ${authMode === 'closed' ? 'Closed' : 'Open'}
! =====================================================================

! --- AAA and RADIUS Configuration ---
aaa new-model
aaa group server radius ${radiusServerGroup || 'RADIUS-SERVERS'}
 server name RADIUS_PRIMARY
 ${radiusIp2 ? 'server name RADIUS_SECONDARY' : ''}
 deadtime ${radiusDeadtime || '15'}

! Authentication methods
aaa authentication dot1x default group ${radiusServerGroup || 'RADIUS-SERVERS'}
aaa authorization network default group ${radiusServerGroup || 'RADIUS-SERVERS'}
aaa accounting dot1x default start-stop group ${radiusServerGroup || 'RADIUS-SERVERS'}

! RADIUS Server Definitions
radius server RADIUS_PRIMARY
 address ipv4 ${radiusIp1} auth-port ${radiusAuthPort || '1812'} acct-port ${radiusAcctPort || '1813'}
 key ${radiusKey1}
 timeout ${radiusTimeout || '5'}
 retransmit ${radiusRetransmit || '3'}
 ${enableTesting ? `automate-tester username ${testingUsername || 'radius-test'} probe-on` : ''}

${radiusIp2 ? `radius server RADIUS_SECONDARY
 address ipv4 ${radiusIp2} auth-port ${radiusAuthPort || '1812'} acct-port ${radiusAcctPort || '1813'}
 key ${radiusKey2 || radiusKey1}
 timeout ${radiusTimeout || '5'}
 retransmit ${radiusRetransmit || '3'}
 ${enableTesting ? `automate-tester username ${testingUsername || 'radius-test'} probe-on` : ''}` : ''}

! --- RADIUS Attribute Configuration ---
radius-server attribute 6 on-for-login-auth
radius-server attribute 8 include-in-access-req
radius-server attribute 25 access-request include
radius-server attribute 31 mac format ${macFormat || 'ietf'} ${macUppercase ? 'upper-case' : 'lower-case'}
radius-server attribute 31 send nas-port-detail mac-only
radius-server dead-criteria time 5 tries 3
${enableLoadBalance ? `radius-server load-balance method ${loadBalanceMethod || 'least-outstanding'}` : ''}

! --- Enable CoA for dynamic policy changes ---
aaa server radius dynamic-author
 client ${radiusIp1} server-key ${radiusKey1}
 auth-type any
 port ${radiusCoaPort || '3799'}

! --- Global 802.1X settings ---
dot1x system-auth-control
! Set 802.1X timeouts and retry values
dot1x timeout tx-period ${txPeriod || '5'}
dot1x max-reauth-req ${maxReauthReq || '2'}
dot1x auth-fail max-attempts ${maxAuthReq || '2'}

! --- Class Maps for authentication scenarios ---
! Dot1X failure due to bad credentials
class-map type control subscriber match-all DOT1X_FAILED
 match method dot1x
 match result-type method dot1x authoritative

! Dot1X failure due to no supplicant (no response)
class-map type control subscriber match-all DOT1X_NO_RESP
 match method dot1x
 match result-type method dot1x agent-not-found

! MAB failure
class-map type control subscriber match-all MAB_FAILED
 match method mab
 match result-type method mab authoritative

! Check if port is in critical auth state
class-map type control subscriber match-any IN_CRITICAL_AUTH
 match activated-service-template CRITICAL_AUTH_ACCESS
 match activated-service-template CRITICAL_VOICE_ACCESS

! --- Service Templates for VLAN and access control ---
${criticalVlan ? `service-template CRITICAL_AUTH_ACCESS
 vlan ${criticalVlan}
` : ''}

${voiceVlan ? `service-template CRITICAL_VOICE_ACCESS
 vlan ${voiceVlan}
` : ''}

${guestVlan ? `service-template GUEST_VLAN_ACCESS
 vlan ${guestVlan}
` : ''}

${authFailVlan ? `service-template AUTH_FAIL_VLAN_ACCESS
 vlan ${authFailVlan}
` : ''}

${enablePreAuthAcl && preAuthAclName ? `service-template PREAUTH_ACCESS
 access-group ${preAuthAclName}
` : ''}

! --- Policy Map for Authentication Mode ---
policy-map type control subscriber WIRED_DOT1X_${authMode.toUpperCase()}
 event session-started match-all
  ${authMethod === 'dot1x-only' ? '10 authenticate using dot1x priority 10' : 
    authMethod === 'mab-only' ? '10 authenticate using mab priority 10' :
    authMethod === 'concurrent' ? '10 authenticate using dot1x priority 10\n  20 authenticate using mab priority 10' :
    '10 authenticate using dot1x priority 10\n  20 authenticate using mab priority 20'}
 
 ! If authentication fails
 event authentication-failure match-first
  ${authMethod !== 'dot1x-only' && authMethod !== 'mab-only' ? `! If no 802.1X supplicant, try MAB
  10 class DOT1X_NO_RESP do-until-failure
    10 terminate dot1x
    20 authenticate using mab priority 20` : ''}
  
  ${authMethod !== 'mab-only' && authFailVlan ? `! If 802.1X fails due to bad credentials, use Auth-Fail VLAN
  ${authMethod !== 'dot1x-only' ? '20' : '10'} class DOT1X_FAILED do-until-failure
    10 terminate dot1x
    ${authMethod !== 'dot1x-only' ? '20 terminate mab' : ''}
    ${authMethod !== 'dot1x-only' ? '30' : '20'} activate service-template AUTH_FAIL_VLAN_ACCESS` : ''}
  
  ${authMethod !== 'dot1x-only' && guestVlan ? `! If MAB fails, assign to guest VLAN
  ${authMethod !== 'dot1x-only' && authFailVlan ? '30' : '20'} class MAB_FAILED do-until-failure
    10 terminate mab
    20 activate service-template GUEST_VLAN_ACCESS` : ''}
  
  ! For all other failures
  ${authMethod === 'dot1x-only' ? 
    authFailVlan ? '20' : '10' : 
    (authMethod !== 'dot1x-only' && authFailVlan && guestVlan) ? '40' : 
    (authMethod !== 'dot1x-only' && (authFailVlan || guestVlan)) ? '30' : '20'} class always do-until-failure
    ${authMethod !== 'dot1x-only' ? '10 terminate dot1x\n    20 terminate mab' : '10 terminate dot1x'}
    ${authMode === 'closed' ? 
      (guestVlan ? `\n    ${authMethod !== 'dot1x-only' ? '30' : '20'} activate service-template GUEST_VLAN_ACCESS` : '') : 
      `\n    ${authMethod !== 'dot1x-only' ? '30' : '20'} authorize`}

 ${authMethod !== 'dot1x-only' && authMethod !== 'mab-only' ? `! If 802.1X starts after MAB, terminate MAB
 event agent-found match-all
  10 terminate mab
  20 authenticate using dot1x priority 10` : ''}
 
 ${criticalVlan ? `! If RADIUS server is down
 event server-dead match-all
  10 activate service-template CRITICAL_AUTH_ACCESS
  20 authorize
 
 ! When RADIUS server comes back online
 event server-alive match-all
  10 clear-session
  ${authMethod === 'dot1x-only' ? '20 authenticate using dot1x priority 10' : 
    authMethod === 'mab-only' ? '20 authenticate using mab priority 10' :
    authMethod === 'concurrent' ? '20 authenticate using dot1x priority 10\n  30 authenticate using mab priority 10' :
    '20 authenticate using dot1x priority 10\n  30 authenticate using mab priority 20'}` : ''}

${enablePreAuthAcl && preAuthAclName ? `! --- Pre-Auth ACL ---
ip access-list extended ${preAuthAclName}
 remark Allow DHCP, DNS, and web access during authentication
 permit udp any any eq bootps
 permit udp any any eq bootpc
 permit udp any any eq domain
 permit tcp any any eq www
 permit tcp any any eq 443
 deny ip any any` : ''}

! --- Interface Configuration ---
interface ${interfaces}
 switchport mode access
 switchport access vlan ${dataVlan}
 ${voiceVlan ? `switchport voice vlan ${voiceVlan}` : ''}
 ${authMode === 'closed' ? 'access-session closed' : ''}
 access-session port-control auto
 access-session host-mode ${hostMode === 'single-host' ? 'single-host' : 
                           hostMode === 'multi-host' ? 'multi-host' : 
                           hostMode === 'multi-domain' ? 'multi-domain' : 'multi-auth'}
 dot1x pae authenticator
 dot1x timeout tx-period ${txPeriod || '5'}
 dot1x timeout supp-timeout ${timeoutPeriod || '30'}
 dot1x max-req ${maxAuthReq || '2'}
 dot1x max-reauth-req ${maxReauthReq || '2'}
 authentication periodic
 authentication timer reauthenticate ${reauthPeriod || '3600'}
 authentication timer restart ${quietPeriod || '60'}
 spanning-tree portfast
 service-policy type control subscriber WIRED_DOT1X_${authMode.toUpperCase()}`;
  
  return config;
}

// Configuration generator for Cisco IOS
function generateCiscoIosConfig(
  dataVlan, voiceVlan, guestVlan, criticalVlan, authFailVlan,
  radiusServerGroup, radiusIp1, radiusKey1, radiusIp2, radiusKey2, 
  radiusAuthPort, radiusAcctPort, radiusTimeout, radiusRetransmit,
  interfaces, authMethod, authMode, hostMode,
  reauthPeriod, timeoutPeriod, txPeriod, quietPeriod,
  enableDynamicVlan, enablePreAuthAcl, preAuthAclName
) {
  // Build configuration string for legacy IOS
  let config = `! =====================================================================
! Cisco IOS 802.1X Configuration (Legacy)
! Authentication Method: ${authMethod === 'dot1x-only' ? 'Dot1X Only' : authMethod === 'mab-only' ? 'MAB Only' : authMethod === 'concurrent' ? 'Dot1X and MAB Concurrent' : 'Dot1X with MAB Fallback'}
! Authentication Mode: ${authMode === 'closed' ? 'Closed' : 'Open'}
! =====================================================================

! --- AAA and RADIUS Configuration ---
aaa new-model
aaa group server radius ${radiusServerGroup || 'RADIUS-SERVERS'}
 server ${radiusIp1} auth-port ${radiusAuthPort || '1812'} acct-port ${radiusAcctPort || '1813'}
 ${radiusIp2 ? `server ${radiusIp2} auth-port ${radiusAuthPort || '1812'} acct-port ${radiusAcctPort || '1813'}` : ''}

! Authentication methods
aaa authentication dot1x default group ${radiusServerGroup || 'RADIUS-SERVERS'}
aaa authorization network default group ${radiusServerGroup || 'RADIUS-SERVERS'}
aaa accounting dot1x default start-stop group ${radiusServerGroup || 'RADIUS-SERVERS'}

! RADIUS Server Configuration
radius-server host ${radiusIp1} auth-port ${radiusAuthPort || '1812'} acct-port ${radiusAcctPort || '1813'} key ${radiusKey1} timeout ${radiusTimeout || '5'} retransmit ${radiusRetransmit || '3'}
${radiusIp2 ? `radius-server host ${radiusIp2} auth-port ${radiusAuthPort || '1812'} acct-port ${radiusAcctPort || '1813'} key ${radiusKey2 || radiusKey1} timeout ${radiusTimeout || '5'} retransmit ${radiusRetransmit || '3'}` : ''}

! --- Enable CoA for dynamic policy changes ---
aaa server radius dynamic-author
 client ${radiusIp1} server-key ${radiusKey1}
 auth-type any
 port 3799

! --- Global 802.1X settings ---
dot1x system-auth-control
dot1x guest-vlan supplicant

${enablePreAuthAcl && preAuthAclName ? `! --- Pre-Auth ACL ---
ip access-list extended ${preAuthAclName}
 remark Allow DHCP, DNS, and web access during authentication
 permit udp any any eq bootps
 permit udp any any eq bootpc
 permit udp any any eq domain
 permit tcp any any eq www
 permit tcp any any eq 443
 deny ip any any` : ''}

! --- Interface Configuration ---
interface ${interfaces}
 switchport mode access
 switchport access vlan ${dataVlan}
 ${voiceVlan ? `switchport voice vlan ${voiceVlan}` : ''}
 dot1x pae authenticator
 dot1x port-control ${authMode === 'closed' ? 'force-authorized' : 'auto'}
 dot1x timeout quiet-period ${quietPeriod || '60'}
 dot1x timeout tx-period ${txPeriod || '5'}
 dot1x timeout supp-timeout ${timeoutPeriod || '30'}
 dot1x reauthentication
 dot1x reauth-period ${reauthPeriod || '3600'}
 dot1x max-reauth-req 2
 ${authMethod !== 'dot1x-only' ? 'dot1x mac-auth-bypass' : ''}
 ${authMethod === 'concurrent' ? 'dot1x mac-auth-bypass eap' : ''}
 ${hostMode === 'multi-host' ? 'dot1x host-mode multi-host' : 
   hostMode === 'multi-domain' ? 'dot1x host-mode multi-domain' : 
   hostMode === 'multi-auth' ? 'dot1x host-mode multi-auth' : ''}
 ${guestVlan ? `dot1x guest-vlan ${guestVlan}` : ''}
 ${authFailVlan ? `dot1x auth-fail vlan ${authFailVlan}` : ''}
 ${criticalVlan ? `dot1x critical vlan ${criticalVlan}` : ''}
 ${enablePreAuthAcl && preAuthAclName ? `ip access-group ${preAuthAclName} in` : ''}
 spanning-tree portfast`;
  
  return config;
}

// Configuration generator for Aruba AOS-CX
function generateArubaAosCxConfig(
  dataVlan, voiceVlan, guestVlan, criticalVlan,
  radiusIp1, radiusKey1, radiusIp2, radiusKey2, 
  radiusAuthPort, radiusAcctPort,
  interfaces, authMethod, authMode, hostMode,
  reauthPeriod, timeoutPeriod, txPeriod, quietPeriod
) {
  // Build configuration string for Aruba AOS-CX
  let config = `! =====================================================================
! Aruba AOS-CX 802.1X and MAC Authentication Configuration
! Authentication Method: ${authMethod === 'dot1x-only' ? 'Dot1X Only' : authMethod === 'mab-only' ? 'MAC Auth Only' : authMethod === 'concurrent' ? 'Dot1X and MAC Auth Concurrent' : 'Dot1X with MAC Auth Fallback'}
! Authentication Mode: ${authMode === 'closed' ? 'Closed' : 'Open'}
! =====================================================================

! --- RADIUS Server Configuration ---
radius-server host ${radiusIp1} key ${radiusKey1} auth-port ${radiusAuthPort || '1812'} acct-port ${radiusAcctPort || '1813'}
${radiusIp2 ? `radius-server host ${radiusIp2} key ${radiusKey2 || radiusKey1} auth-port ${radiusAuthPort || '1812'} acct-port ${radiusAcctPort || '1813'}` : ''}

! Enable RADIUS accounting
radius-server accounting

! --- AAA Configuration ---
aaa authentication port-access default radius
aaa authorization port-access default radius
aaa accounting port-access default start-stop radius

! --- RADIUS Dynamic Authorization (CoA) ---
radius-server dyn-authorization enable
radius-server dyn-auth client ${radiusIp1} key ${radiusKey1}

! --- 802.1X Authentication Settings ---
aaa authentication port-access dot1x authenticator max-requests 3
aaa authentication port-access dot1x authenticator max-retries 3
aaa authentication port-access dot1x authenticator quiet-period ${quietPeriod || '60'}
aaa authentication port-access dot1x authenticator reauth-period ${reauthPeriod || '3600'}
aaa authentication port-access dot1x authenticator timeout supp-response ${timeoutPeriod || '30'}
aaa authentication port-access dot1x authenticator timeout tx-period ${txPeriod || '5'}

! --- MAC Authentication Settings ---
aaa authentication port-access mac-auth max-retries 3
aaa authentication port-access mac-auth quiet-period ${quietPeriod || '60'}
aaa authentication port-access mac-auth reauth-period ${reauthPeriod || '3600'}

! --- Default VLANs Configuration ---
vlan ${dataVlan}
${guestVlan ? `vlan ${guestVlan} name "Guest_VLAN"` : ''}
${criticalVlan ? `vlan ${criticalVlan} name "Critical_Auth_VLAN"` : ''}
${voiceVlan ? `vlan ${voiceVlan} name "Voice_VLAN"` : ''}

! --- Interface Configuration ---
interface ${interfaces}
  no shutdown
  no routing
  vlan access ${dataVlan}
  
  ! Enable port-access authenticator mode
  port-access authenticator
  
  ! Set authentication precedence
  authentication precedence ${authMethod === 'dot1x-only' ? 'dot1x' : 
                            authMethod === 'mab-only' ? 'mac-auth' : 
                            authMethod === 'concurrent' ? 'dot1x mac-auth' : 'dot1x-first'}
  
  ! Set authentication behavior
  authentication auth-behavior ${authMode === 'closed' ? 'strict' : authMethod === 'concurrent' ? 'fail-through' : 'fail-open'}
  
  ! Configure VLAN assignments
  authentication data-vlan ${dataVlan}
  ${guestVlan ? `authentication guest-vlan ${guestVlan}` : ''}
  ${criticalVlan ? `authentication critical-vlan ${criticalVlan}` : ''}
  ${voiceVlan ? `authentication voice-vlan ${voiceVlan}` : ''}
  
  ! Enable caching of credentials for critical auth
  authentication cached-reauth enable
  
  ! Set the interface to enforce authentication
  authentication port-control auto
  
  ! Set the host mode
  authentication host-mode ${hostMode === 'single-host' ? 'single' : 'multi'}`;
  
  return config;
}

// Configuration generator for Juniper
function generateJuniperConfig(
  dataVlan, voiceVlan, guestVlan, criticalVlan,
  radiusIp1, radiusKey1, radiusIp2, radiusKey2, 
  radiusAuthPort, radiusAcctPort,
  interfaces, authMethod, authMode, hostMode,
  reauthPeriod, timeoutPeriod, txPeriod, quietPeriod
) {
  // Build configuration string for Juniper EX
  let config = `# =====================================================================
# Juniper EX Series 802.1X and MAC Authentication Configuration
# Authentication Method: ${authMethod === 'dot1x-only' ? 'Dot1X Only' : authMethod === 'mab-only' ? 'MAC Auth Only' : authMethod === 'concurrent' ? 'Dot1X and MAC Auth Concurrent' : 'Dot1X with MAC Auth Fallback'}
# Authentication Mode: ${authMode === 'closed' ? 'Closed' : 'Open'}
# =====================================================================

# --- System Authentication Order ---
set system authentication-order radius tacplus

# --- RADIUS Server Configuration ---
set access profile dot1x-profile authentication-order radius
set access profile dot1x-profile radius authentication-server ${radiusIp1} secret ${radiusKey1}
${radiusIp2 ? `set access profile dot1x-profile radius authentication-server ${radiusIp2} secret ${radiusKey2 || radiusKey1}` : ''}
set access profile dot1x-profile radius accounting-server ${radiusIp1} secret ${radiusKey1}
${radiusIp2 ? `set access profile dot1x-profile radius accounting-server ${radiusIp2} secret ${radiusKey2 || radiusKey1}` : ''}
set access profile dot1x-profile radius accounting-port ${radiusAcctPort || '1813'}
set access profile dot1x-profile radius accounting-timeout 3
set access profile dot1x-profile radius accounting-retry 3
set access profile dot1x-profile radius source-address ${radiusIp1}

# --- RADIUS Options ---
set access profile dot1x-profile radius options nas-port-type ethernet
set access profile dot1x-profile radius options calling-station-id-format mac-address
set access profile dot1x-profile radius options coa

# --- Authentication Methods ---
set access profile dot1x-profile authentication-order radius local
set access profile dot1x-profile accounting order radius

# --- VLAN Configuration ---
set vlans ${dataVlan} vlan-id ${dataVlan}
${guestVlan ? `set vlans ${guestVlan} vlan-id ${guestVlan}` : ''}
${criticalVlan ? `set vlans ${criticalVlan} vlan-id ${criticalVlan}` : ''}
${voiceVlan ? `set vlans ${voiceVlan} vlan-id ${voiceVlan}` : ''}

# --- 802.1X Global Configuration ---
set protocols dot1x authenticator authentication-profile-name dot1x-profile
set protocols dot1x authenticator interface all retry-count 3
set protocols dot1x authenticator interface all quiet-period ${quietPeriod || '60'}
set protocols dot1x authenticator interface all transmit-period ${txPeriod || '30'}
${authMethod !== 'dot1x-only' ? 'set protocols dot1x authenticator interface all mac-radius restrict' : ''}

# --- Interface Configuration ---
set protocols dot1x authenticator interface ${interfaces} supplicant ${hostMode === 'multi-host' ? 'multiple' : hostMode === 'single-host' ? 'single' : 'multiple'}
set protocols dot1x authenticator interface ${interfaces} transmit-period ${txPeriod || '5'}
${authMethod !== 'dot1x-only' ? `set protocols dot1x authenticator interface ${interfaces} mac-radius` : ''}
set protocols dot1x authenticator interface ${interfaces} reauthentication ${reauthPeriod || '3600'}
set protocols dot1x authenticator interface ${interfaces} supplicant-timeout ${timeoutPeriod || '30'}
set protocols dot1x authenticator interface ${interfaces} server-timeout ${timeoutPeriod || '30'}
${criticalVlan ? `set protocols dot1x authenticator interface ${interfaces} server-fail vlan ${criticalVlan}` : ''}
${guestVlan ? `set protocols dot1x authenticator interface ${interfaces} guest-vlan ${guestVlan}` : ''}
${guestVlan ? `set protocols dot1x authenticator interface ${interfaces} server-reject vlan ${guestVlan}` : ''}
${voiceVlan ? `set protocols dot1x authenticator interface ${interfaces} voice-vlan ${voiceVlan}` : ''}`;
  
  return config;
}

// Download generated configuration
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

// Copy generated configuration to clipboard
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
      setTimeout(() => {
        copyBtn.textContent = originalText;
      }, 2000);
    })
    .catch(err => {
      showError('Failed to copy: ' + err);
    });
}

// AI chat functions
function sendAIQuery() {
  const queryInput = document.getElementById('ai-query');
  const query = queryInput.value.trim();
  
  if (!query) return;
  
  // Add user message to chat
  addChatMessage(query, 'user');
  
  // Clear input
  queryInput.value = '';
  
  // Show "thinking" state
  addChatMessage('Thinking...', 'ai', true);
  
  // In a real implementation, this would call an API
  // For demo purposes, we'll simulate a response after a delay
  setTimeout(() => {
    // Remove "thinking" message
    const loadingMessage = document.querySelector('.ai-message.loading');
    if (loadingMessage) loadingMessage.remove();
    
    // Add AI response
    const response = generateAIResponse(query);
    addChatMessage(response, 'ai');
  }, 1500);
}

function addChatMessage(message, type, isLoading = false) {
  const chatHistory = document.getElementById('chat-history');
  
  const messageDiv = document.createElement('div');
  messageDiv.className = type + '-message';
  if (isLoading) {
    messageDiv.classList.add('loading');
  }
  
  const avatarDiv = document.createElement('div');
  avatarDiv.className = 'message-avatar';
  
  const avatarImg = document.createElement('img');
  avatarImg.src = type === 'user' ? 'assets/icons/user-avatar.png' : 'assets/icons/ai-avatar.png';
  avatarImg.alt = type === 'user' ? 'You' : 'AI';
  
  avatarDiv.appendChild(avatarImg);
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  contentDiv.innerHTML = message.replace(/\n/g, '<br>');
  
  messageDiv.appendChild(avatarDiv);
  messageDiv.appendChild(contentDiv);
  
  chatHistory.appendChild(messageDiv);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

function generateAIResponse(query) {
  // In a real implementation, this would call an AI API
  // For demo purposes, we'll return predefined responses
  query = query.toLowerCase();
  
  if (query.includes('open') && query.includes('closed')) {
    return "Open mode allows traffic before authentication, making it suitable for initial deployment phases. Closed mode blocks all traffic until authentication succeeds, providing higher security. Start with Open mode for testing, then transition to Closed mode in production.";
  } else if (query.includes('mab')) {
    return "MAC Authentication Bypass (MAB) is for devices without 802.1X support. The switch sends the device's MAC address to the RADIUS server for authentication. It's less secure than 802.1X but necessary for printers, IoT devices, etc.";
  } else if (query.includes('radsec')) {
    return "RadSec (RADIUS over TLS/DTLS) encrypts RADIUS traffic between the switch and server. It requires proper certificate setup but significantly improves security compared to standard RADIUS.";
  } else if (query.includes('coa')) {
    return "Change of Authorization (CoA) allows the RADIUS server to dynamically change a session's authorization attributes without requiring reauthentication. This is crucial for policy changes based on posture assessments or time-based restrictions.";
  } else if (query.includes('nx-os') || query.includes('nexus')) {
    return "Cisco NX-OS supports 802.1X and MAB, but with some differences from IOS-XE. It uses a simpler configuration model without the advanced policy maps of IBNS 2.0. The key NX-OS commands are 'feature dot1x' to enable the feature globally and 'dot1x pae authenticator' on interfaces.";
  } else if (query.includes('review') || query.includes('check')) {
    return "I've reviewed your configuration and noticed a few things:\n\n1. Your RADIUS server configuration looks good with primary and secondary servers configured.\n\n2. You're using Closed mode authentication which provides good security but may cause connectivity issues for devices that can't authenticate.\n\n3. Consider adding a Critical VLAN configuration to handle RADIUS server failures.\n\n4. Your reauthentication period is set to the default 3600 seconds. For high-security environments, consider reducing this to 1800 seconds.";
  } else {
    return "I can help you understand and optimize your 802.1X/AAA configuration. What specific aspect would you like me to explain or improve?";
  }
}

function useQuerySuggestion(button) {
  const queryInput = document.getElementById('ai-query');
  if (queryInput) {
    queryInput.value = button.textContent;
    queryInput.focus();
  }
}

// Report generation functions
function generatePDF() {
  alert('PDF generation would be implemented here in a production version.');
  // In a real implementation, this would generate a PDF report
}

function generateCSV() {
  alert('CSV export would be implemented here in a production version.');
  // In a real implementation, this would export CSV data
}

function printReport() {
  window.print();
}
