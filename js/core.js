// Dot1Xer Supreme - Core Functionality

// Current step in the configurator
let currentStep = 1;

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all accordions
    initAccordions();
    
    // Initialize all tabs
    initTabs();
    
    // Initialize vendor selection and platform options
    initVendorOptions();
    
    // Initialize network scoping options
    initNetworkScopingOptions();
    
    // Setup authentication method options
    setupAuthMethodOptions();
    
    // Setup API integrations for AI assistance
    setupAPIIntegrations();
    
    // Setup Portnox Cloud integration
    setupPortnoxIntegration();
    
    // Show the first tab by default
    const firstTabBtn = document.querySelector('.tab-btn');
    if (firstTabBtn) {
        firstTabBtn.click();
    }
    
    // Show the first discovery tab by default
    const firstDiscoveryTab = document.querySelector('.discovery-tab');
    if (firstDiscoveryTab) {
        firstDiscoveryTab.click();
    }
    
    // Show the first reference tab by default
    const firstRefTab = document.querySelector('.ref-tab');
    if (firstRefTab) {
        firstRefTab.click();
    }
    
    // Show the first server tab by default
    const firstServerTab = document.querySelector('.tab-control-btn');
    if (firstServerTab) {
        firstServerTab.click();
    }
    
    // Show the first Portnox tab by default
    const firstPortnoxTab = document.querySelector('.portnox-nav-tab');
    if (firstPortnoxTab) {
        firstPortnoxTab.click();
    }
});

// Initialize accordion functionality
function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('.accordion-icon');
            const isActive = content.classList.contains('active');
            
            // Toggle the active class and visibility
            if (isActive) {
                content.classList.remove('active');
                content.style.display = 'none';
                this.classList.remove('active');
                if (icon) icon.textContent = '+';
            } else {
                content.classList.add('active');
                content.style.display = 'block';
                this.classList.add('active');
                if (icon) icon.textContent = '-';
            }
        });
    });
}
// Replace the existing goToStep function to unlock tabs
function goToStep(step) {
  document.querySelectorAll('.step-content').forEach(content => content.style.display = 'none');
  document.getElementById(`step-${step}`).style.display = 'block';
  document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
  document.querySelector(`.step[data-step="${step}"]`).classList.add('active');
}

// Add function to dynamically add RADIUS servers
function addRadiusServer() {
  const container = document.getElementById('radius-servers');
  const index = container.children.length + 1;
  const entry = document.createElement('div');
  entry.className = 'radius-server-entry';
  entry.dataset.index = index;
  entry.innerHTML = `
    <h5>RADIUS Server ${index}</h5>
    <div class="row">
      <div class="col">
        <label for="radius-ip-${index}">Server IP:</label>
        <input type="text" id="radius-ip-${index}" placeholder="e.g., 10.1.1.100">
      </div>
      <div class="col">
        <label for="radius-key-${index}">Shared Secret:</label>
        <input type="password" id="radius-key-${index}" placeholder="Shared secret">
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label for="radius-auth-port-${index}">Authentication Port:</label>
        <input type="number" id="radius-auth-port-${index}" value="1812">
      </div>
      <div class="col">
        <label for="radius-acct-port-${index}">Accounting Port:</label>
        <input type="number" id="radius-acct-port-${index}" value="1813">
      </div>
      <div class="col">
        <label for="radius-coa-port-${index}">CoA Port:</label>
        <input type="number" id="radius-coa-port-${index}" value="3799">
      </div>
    </div>
  `;
  container.appendChild(entry);
}

// Add function to dynamically add RadSec servers
function addRadSecServer() {
  const container = document.getElementById('radsec-servers');
  const index = container.children.length + 1;
  const entry = document.createElement('div');
  entry.className = 'radsec-server-entry';
  entry.dataset.index = index;
  entry.innerHTML = `
    <h5>RadSec Server ${index}</h5>
    <div class="row">
      <div class="col">
        <label for="radsec-ip-${index}">Server IP:</label>
        <input type="text" id="radsec-ip-${index}" placeholder="e.g., 10.1.1.104">
      </div>
      <div class="col">
        <label for="radsec-key-${index}">Shared Secret:</label>
        <input type="password" id="radsec-key-${index}" placeholder="Shared secret">
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label for="radsec-port-${index}">TLS Port:</label>
        <input type="number" id="radsec-port-${index}" value="2083">
      </div>
    </div>
  `;
  container.appendChild(entry);
}

// Update generateConfiguration to include all user inputs
function generateConfiguration() {
  let config = '';
  const vendor = document.getElementById('vendor-select').value;
  const platform = document.getElementById('platform-select').value;

  // RADIUS Servers
  const radiusServers = document.getElementById('radius-servers').children;
  for (let i = 0; i < radiusServers.length; i++) {
    const index = i + 1;
    const ip = document.getElementById(`radius-ip-${index}`).value;
    const key = document.getElementById(`radius-key-${index}`).value;
    const authPort = document.getElementById(`radius-auth-port-${index}`).value;
    const acctPort = document.getElementById(`radius-acct-port-${index}`).value;
    const coaPort = document.getElementById(`radius-coa-port-${index}`).value;
    if (ip && key) {
      config += `radius-server host ${ip} auth-port ${authPort} acct-port ${acctPort} key ${key}\n`;
      if (coaPort) config += `radius-server host ${ip} coa-port ${coaPort}\n`;
    }
  }

  // RadSec Servers
  const radsecServers = document.getElementById('radsec-servers').children;
  for (let i = 0; i < radsecServers.length; i++) {
    const index = i + 1;
    const ip = document.getElementById(`radsec-ip-${index}`).value;
    const key = document.getElementById(`radsec-key-${index}`).value;
    const port = document.getElementById(`radsec-port-${index}`).value;
    if (ip && key) {
      config += `radsec-server host ${ip} port ${port} key ${key}\n`;
    }
  }

  // Add more configuration based on vendor/platform (extend as needed)
  document.getElementById('config-output').textContent = config;
}

// Add Dot1Xer Review function
function reviewConfiguration() {
  const config = document.getElementById('config-output').textContent;
  const reviewOutput = document.getElementById('review-output');
  const reviewSection = document.getElementById('review-output-section');
  reviewSection.style.display = 'block';
  reviewOutput.innerHTML = '<p>Analyzing configuration...</p>';
  
  // Simulated AI review (replace with actual AI integration if available)
  setTimeout(() => {
    reviewOutput.innerHTML = `
      <p><strong>Review Results:</strong></p>
      <ul>
        <li>Multiple RADIUS servers detected - ensure load balancing is configured if intended.</li>
        <li>RadSec ports are standard (2083) - verify server compatibility.</li>
        <li>Configuration syntax appears valid for selected vendor.</li>
      </ul>
    `;
  }, 1000);
}
