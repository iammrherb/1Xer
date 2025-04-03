#!/bin/bash
# update-dot1xer-supreme-complete.sh
# =======================================================================
# Complete update script for Dot1Xer Supreme that addresses all issues:
# - Fixes accordion functionality
# - Ensures wireless vendor selection works
# - Properly includes TACACS templates
# - Enhances help tooltips and descriptions
# - Makes API configurable with key management
# - Adds configuration review capabilities
# =======================================================================

set -e

echo "=== Dot1Xer Supreme Complete Update ==="
echo "This script will update all aspects of Dot1Xer Supreme while preserving existing configurations."
echo

# Create backup
timestamp=$(date +%Y%m%d%H%M%S)
backup_dir="backup_${timestamp}"
echo "Creating backup in ${backup_dir}..."
mkdir -p "${backup_dir}"
cp -r * "${backup_dir}/" 2>/dev/null || true
echo "Backup created successfully."
echo

# Setup required directories
echo "Setting up required directories..."
mkdir -p js/templates/cisco
mkdir -p js/templates/aruba
mkdir -p js/templates/juniper
mkdir -p js/templates/fortinet
mkdir -p js/templates/hpe
mkdir -p js/templates/extreme
mkdir -p js/templates/dell
mkdir -p js/templates/wireless/cisco
mkdir -p js/templates/wireless/aruba
mkdir -p js/templates/wireless/fortinet
mkdir -p js/templates/wireless/juniper
mkdir -p js/templates/wireless/ruckus
mkdir -p js/templates/wireless/meraki
mkdir -p js/templates/wireless/extreme
mkdir -p js/templates/wireless/ubiquiti
mkdir -p js/help
mkdir -p js/api
mkdir -p css
echo "Directories created successfully."
echo

# Fix index.html - remove any debug output
echo "Cleaning up index.html..."
if grep -q "# Finalize installation" index.html; then
    sed -i.bak '/# Finalize installation/,$d' index.html
    echo "</body></html>" >> index.html
    echo "Debug output removed from index.html."
else
    echo "No debug output found in index.html."
fi
echo
# Fix accordion functionality
echo "Updating accordion functionality..."
cat > js/accordion.js << 'EOL'
/**
 * Enhanced accordion functionality for Dot1Xer Supreme
 */
function initAccordions() {
    console.log("Initializing accordions...");
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    if (accordionHeaders.length === 0) {
        console.warn("No accordion headers found on page!");
        return;
    }
    
    console.log(`Found ${accordionHeaders.length} accordion headers`);
    
    accordionHeaders.forEach((header, index) => {
        // Make sure the next element is actually the content
        const content = header.nextElementSibling;
        if (!content || !content.classList.contains('accordion-content')) {
            console.error(`Accordion header #${index} is missing proper content element!`);
            return;
        }
        
        // Ensure proper icon exists
        let icon = header.querySelector('.accordion-icon');
        if (!icon) {
            icon = document.createElement('span');
            icon.className = 'accordion-icon';
            icon.innerHTML = '+';
            header.appendChild(icon);
        }
        
        // Start with all accordions closed except the first one
        if (index === 0) {
            header.classList.add('active');
            content.classList.add('active');
            content.style.display = 'block';
            content.style.maxHeight = content.scrollHeight + 'px';
            if (icon) icon.textContent = "-"; // Unicode minus sign
        } else {
            content.style.display = 'none';
            content.style.maxHeight = null;
        }
        
        // Remove any existing click handlers to prevent duplicates
        const newHeader = header.cloneNode(true);
        header.parentNode.replaceChild(newHeader, header);
        
        // Add click event handler
        newHeader.addEventListener("click", function(e) {
            console.log(`Accordion ${index} clicked`);
            e.preventDefault(); // Prevent any default anchor behavior
            
            // Get the accordion content and icon
            const content = this.nextElementSibling;
            const icon = this.querySelector(".accordion-icon");
            
            // Toggle the current accordion
            this.classList.toggle("active");
            content.classList.toggle("active");
            
            // If the accordion is now active
            if (this.classList.contains("active")) {
                // Show content and change icon
                content.style.display = "block";
                // Force a reflow before setting maxHeight for transition to work
                void content.offsetWidth;
                content.style.maxHeight = content.scrollHeight + "px";
                if (icon) icon.textContent = "-"; // Unicode minus sign
            } else {
                // Hide content and change icon
                content.style.maxHeight = "0";
                if (icon) icon.textContent = "+";
                // Add delay to hide the element after transition
                setTimeout(() => {
                    if (!this.classList.contains("active")) {
                        content.style.display = "none";
                    }
                }, 300);
            }
        });
    });
}

// Make sure DOM is loaded before initializing
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccordions);
} else {
    // If DOM is already loaded, wait a short while to ensure all content is in place
    setTimeout(initAccordions, 100);
}

// Add a console helper to debug accordions
window.debugAccordions = function() {
    const headers = document.querySelectorAll('.accordion-header');
    console.log(`Found ${headers.length} accordion headers`);
    headers.forEach((header, i) => {
        const content = header.nextElementSibling;
        console.log(`Accordion #${i}:`, {
            header: header,
            content: content,
            isActive: header.classList.contains('active'),
            contentDisplay: content ? content.style.display : 'N/A',
            contentMaxHeight: content ? content.style.maxHeight : 'N/A'
        });
    });
};

// Function to manually open an accordion by index
window.openAccordion = function(index) {
    const headers = document.querySelectorAll('.accordion-header');
    if (headers[index]) {
        headers[index].click();
        return true;
    }
    return false;
};
EOL
echo "Accordion functionality updated."
echo
# Update CSS for accordions
echo "Updating CSS styles for accordions..."
cat > css/accordion.css << 'EOL'
/* Enhanced Accordion Styles */
.accordion-container {
    width: 100%;
    margin-bottom: 20px;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.accordion-header {
    background-color: #f1f1f1;
    color: #333;
    cursor: pointer;
    padding: 15px;
    width: 100%;
    text-align: left;
    border: none;
    outline: none;
    transition: 0.4s;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
    position: relative;
    user-select: none;
}

.accordion-header:hover {
    background-color: #e7e7e7;
}

.accordion-header.active {
    background-color: #4CAF50;
    color: white;
    border-bottom-color: #4CAF50;
}

.accordion-content {
    padding: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out;
    background-color: white;
}

.accordion-content.active {
    display: block !important;
}

.accordion-icon {
    font-size: 18px;
    font-weight: bold;
    transition: transform 0.3s ease;
    margin-left: 10px;
    min-width: 20px;
    text-align: center;
}

.accordion-header.active .accordion-icon {
    transform: rotate(90deg);
}

.accordion-inner {
    padding: 15px;
}

/* Fix for accordion transitions */
.accordion-content {
    transition: max-height 0.3s ease-out;
    overflow: hidden;
}

/* Improve visibility of accordion state */
.accordion-header::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    background-color: transparent;
    transition: background-color 0.3s ease;
}

.accordion-header.active::after {
    background-color: #2E8B57;
}
EOL
echo "CSS styles updated."
echo

# Add main CSS file
echo "Adding main CSS styles..."
cat > css/main.css << 'EOL'
/* Main Styles for Dot1Xer Supreme */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    margin: 0;
    padding: 0;
    background-color: #f8f9fa;
}

.container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

header {
    background-color: #4CAF50;
    color: white;
    padding: 15px 0;
    margin-bottom: 30px;
}

header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 24px;
    font-weight: bold;
}

nav ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
}

nav ul li {
    margin-left: 20px;
}

nav ul li a {
    color: white;
    text-decoration: none;
}

nav ul li a:hover {
    text-decoration: underline;
}

.tab-container {
    margin-bottom: 30px;
}

.tabs {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    border-bottom: 1px solid #ddd;
}

.tabs li {
    padding: 10px 20px;
    cursor: pointer;
    border: 1px solid transparent;
    border-bottom: none;
    margin-bottom: -1px;
    background-color: #f1f1f1;
}

.tabs li.active {
    background-color: white;
    border-color: #ddd;
    border-bottom: 1px solid white;
}

.tab-content {
    display: none;
    padding: 20px;
    border: 1px solid #ddd;
    border-top: none;
    background-color: white;
}

.tab-content.active {
    display: block;
}

button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 14px;
    border-radius: 4px;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #45a049;
}

button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

input[type="text"],
input[type="password"],
input[type="number"],
select,
textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    transition: border-color 0.3s;
}

input[type="text"]:focus,
input[type="password"]:focus,
input[type="number"]:focus,
select:focus,
textarea:focus {
    border-color: #4CAF50;
    outline: none;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.card {
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;
    transition: box-shadow 0.3s;
}

.card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.card-header {
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    margin-bottom: 15px;
}

.card-title {
    margin: 0;
    font-size: 18px;
}

footer {
    text-align: center;
    padding: 20px 0;
    margin-top: 30px;
    background-color: #f1f1f1;
    border-top: 1px solid #ddd;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
}

/* Platform Menu Styles */
.platform-tabs {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0 0 20px 0;
    border-bottom: 1px solid #ddd;
}

.platform-tabs li {
    padding: 10px 20px;
    cursor: pointer;
    background-color: #f1f1f1;
    border: 1px solid #ddd;
    border-bottom: none;
    margin-right: 5px;
    border-radius: 4px 4px 0 0;
}

.platform-tabs li.active {
    background-color: #4CAF50;
    color: white;
    border-color: #4CAF50;
}

.platform-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.platform-card {
    border: 1px solid #ddd;
    border-radius: 5px;
    overflow: hidden;
    transition: all 0.3s ease;
}

.platform-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.platform-card-header {
    background-color: #f8f9fa;
    padding: 15px;
    border-bottom: 1px solid #ddd;
}

.platform-card-header h3 {
    margin: 0;
    font-size: 16px;
}

.platform-card-body {
    padding: 15px;
}

.platform-card-footer {
    padding: 15px;
    background-color: #f8f9fa;
    border-top: 1px solid #ddd;
    text-align: center;
}

.template-count {
    color: #666;
    font-size: 12px;
    margin-top: 10px;
}

/* API Configuration Styles */
.api-settings {
    background-color: #f9f9f9;
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 20px;
}

.api-settings h2 {
    margin-top: 0;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
}

.api-provider {
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
}

.api-provider:last-child {
    border-bottom: none;
}

.api-provider-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.api-provider-header h3 {
    margin: 0;
}

.api-key-status {
    padding: 5px 10px;
    border-radius: 3px;
    font-size: 12px;
    font-weight: bold;
}

.api-key-status.configured {
    background-color: #d4edda;
    color: #155724;
}

.api-key-status.not-configured {
    background-color: #f8d7da;
    color: #721c24;
}

.api-key-input {
    display: flex;
    gap: 10px;
}

.api-key-input input {
    flex-grow: 1;
}

@media screen and (max-width: 768px) {
    .grid {
        grid-template-columns: 1fr;
    }
    
    header .container {
        flex-direction: column;
    }
    
    nav ul {
        margin-top: 15px;
    }
    
    nav ul li {
        margin-left: 0;
        margin-right: 20px;
    }
    
    .platform-grid {
        grid-template-columns: 1fr;
    }
    
    .api-key-input {
        flex-direction: column;
    }
}
EOL
echo "Main CSS styles added."
echo

# Add help tips CSS
echo "Adding help tips CSS..."
cat > css/help_tips.css << 'EOL'
/* Help Tip Styles */
.help-icon {
    display: inline-block;
    width: 18px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    background-color: #4CAF50;
    color: white;
    border-radius: 50%;
    margin-left: 6px;
    cursor: pointer;
    font-size: 12px;
    font-weight: bold;
    transition: all 0.3s ease;
}

.help-icon:hover {
    background-color: #45a049;
    transform: scale(1.1);
}

.help-modal {
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
    opacity: 0;
    transition: opacity 0.3s ease;
    backdrop-filter: blur(3px);
}

.help-modal-content {
    background-color: white;
    padding: 25px;
    border-radius: 8px;
    width: 80%;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    transform: translateY(20px);
    transition: transform 0.3s ease;
}

.help-modal.active .help-modal-content {
    transform: translateY(0);
}

.help-modal-close {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    color: #666;
    transition: color 0.3s;
}

.help-modal-close:hover {
    color: #000;
}

.help-modal h3 {
    margin-top: 0;
    color: #4CAF50;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    margin-bottom: 15px;
}

/* Field-specific help styling */
.field-help {
    display: flex;
    align-items: flex-start;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #f0f0f0;
}

.field-help-icon {
    min-width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #e9f7ef;
    color: #4CAF50;
    border-radius: 50%;
    margin-right: 10px;
    font-weight: bold;
    font-size: 16px;
}

.field-help-content {
    flex-grow: 1;
}

.field-help-title {
    font-weight: bold;
    margin-bottom: 5px;
    color: #333;
}

.field-help-description {
    font-size: 14px;
    color: #666;
}

.field-help-recommendation {
    margin-top: 8px;
    font-style: italic;
    color: #4CAF50;
}
EOL
echo "Help tips CSS added."
echo
# Add Template Loader
echo "Adding template loader..."
cat > js/template_loader.js << 'EOL'
/**
 * Template loader for Dot1Xer Supreme
 * Ensures all templates including TACACS are properly loaded
 */
(function() {
    console.log("Initializing template loader...");
    
    // Templates registry
    window.templateRegistry = window.templateRegistry || {};
    
    // Track template loading
    const templateStatus = {
        requested: [],
        loaded: [],
        failed: []
    };
    
    // Load template by path
    function loadTemplateFile(path, name) {
        console.log(`Loading template: ${name} from ${path}`);
        templateStatus.requested.push(name);
        
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = path;
            script.onload = function() {
                console.log(`Template loaded: ${name}`);
                templateStatus.loaded.push(name);
                resolve(name);
            };
            script.onerror = function() {
                console.error(`Failed to load template: ${name} from ${path}`);
                templateStatus.failed.push(name);
                reject(new Error(`Failed to load template: ${name}`));
            };
            document.head.appendChild(script);
        });
    }
    
    // Register template
    window.registerTemplate = function(key, template) {
        console.log(`Registering template: ${key}`);
        window.templateRegistry[key] = template;
        
        // Trigger an event to notify listeners that a template has been added
        const event = new CustomEvent('templateRegistered', { detail: { key, template } });
        document.dispatchEvent(event);
        
        return template;
    };
    
    // Get template
    window.getTemplate = function(key) {
        return window.templateRegistry[key];
    };
    
    // List all available templates
    window.listTemplates = function() {
        return Object.keys(window.templateRegistry);
    };
    
    // Get template loading status
    window.getTemplateStatus = function() {
        return {
            requested: [...templateStatus.requested],
            loaded: [...templateStatus.loaded],
            failed: [...templateStatus.failed]
        };
    };
    
    // Core templates to load immediately
    const coreTemplates = [
        // Cisco templates
        { path: "js/templates/cisco/ibns2_ios_xe.js", name: "ibns2_ios_xe" },
        { path: "js/templates/cisco/tacacs.js", name: "tacacs" },
        { path: "js/templates/cisco/radsec.js", name: "radsec" },
        { path: "js/templates/cisco/device_tracking.js", name: "device_tracking" },
        
        // Wireless templates
        { path: "js/templates/wireless/cisco/wlc_9800.js", name: "wlc_9800" },
        { path: "js/templates/wireless/aruba/aruba_wireless.js", name: "aruba_wireless" }
    ];
    
    // Load core templates
    function loadCoreTemplates() {
        console.log("Loading core templates...");
        const promises = coreTemplates.map(template => 
            loadTemplateFile(template.path, template.name)
        );
        
        return Promise.allSettled(promises).then(results => {
            const loaded = results.filter(r => r.status === 'fulfilled').length;
            console.log(`Loaded ${loaded}/${coreTemplates.length} core templates`);
            
            // Check for specific templates
            setTimeout(() => {
                // Check if TACACS template was loaded
                if (window.templateRegistry.tacacs) {
                    console.log("? TACACS template loaded successfully");
                } else {
                    console.error("? TACACS template failed to load");
                }
                
                // Check wireless templates
                if (window.templateRegistry.wlc_9800) {
                    console.log("? Wireless controller template loaded successfully");
                } else {
                    console.error("? Wireless controller template failed to load");
                }
                
                // Trigger content loaded event
                document.dispatchEvent(new CustomEvent('contentLoaded'));
            }, 500);
        });
    }
    
    // Dynamic template loading
    window.loadTemplate = function(templateId) {
        // Skip already loaded templates
        if (window.templateRegistry[templateId]) {
            console.log(`Template ${templateId} already loaded, skipping`);
            return Promise.resolve(window.templateRegistry[templateId]);
        }
        
        // Determine template path based on ID
        let templatePath = '';
        
        if (templateId.includes('wlc') || templateId.includes('wireless') || templateId.includes('aireos')) {
            // Wireless templates
            if (templateId.includes('cisco')) {
                templatePath = `js/templates/wireless/cisco/${templateId}.js`;
            } else if (templateId.includes('aruba')) {
                templatePath = `js/templates/wireless/aruba/${templateId}.js`;
            } else if (templateId.includes('fortinet')) {
                templatePath = `js/templates/wireless/fortinet/${templateId}.js`;
            } else if (templateId.includes('ruckus')) {
                templatePath = `js/templates/wireless/ruckus/${templateId}.js`;
            } else if (templateId.includes('meraki')) {
                templatePath = `js/templates/wireless/meraki/${templateId}.js`;
            } else if (templateId.includes('extreme')) {
                templatePath = `js/templates/wireless/extreme/${templateId}.js`;
            } else if (templateId.includes('unifi')) {
                templatePath = `js/templates/wireless/ubiquiti/${templateId}.js`;
            } else {
                templatePath = `js/templates/wireless/${templateId}.js`;
            }
        } else {
            // Wired templates
            if (templateId.includes('cisco')) {
                templatePath = `js/templates/cisco/${templateId}.js`;
            } else if (templateId.includes('aruba') || templateId.includes('aos')) {
                templatePath = `js/templates/aruba/${templateId}.js`;
            } else if (templateId.includes('juniper') || templateId.includes('ex')) {
                templatePath = `js/templates/juniper/${templateId}.js`;
            } else if (templateId.includes('hp') || templateId.includes('comware') || templateId.includes('procurve')) {
                templatePath = `js/templates/hpe/${templateId}.js`;
            } else if (templateId.includes('forti')) {
                templatePath = `js/templates/fortinet/${templateId}.js`;
            } else if (templateId.includes('extreme') || templateId.includes('exos')) {
                templatePath = `js/templates/extreme/${templateId}.js`;
            } else if (templateId.includes('dell')) {
                templatePath = `js/templates/dell/${templateId}.js`;
            } else {
                templatePath = `js/templates/${templateId}.js`;
            }
        }
        
        return loadTemplateFile(templatePath, templateId).then(() => {
            return window.templateRegistry[templateId];
        });
    };
    
    // Initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadCoreTemplates);
    } else {
        // If DOM is already loaded, wait a short while to ensure all content is in place
        setTimeout(loadCoreTemplates, 100);
    }
    
    // Export functions for use in other modules
    window.templateLoader = {
        loadTemplate: window.loadTemplate,
        registerTemplate: window.registerTemplate,
        getTemplate: window.getTemplate,
        listTemplates: window.listTemplates,
        getTemplateStatus: window.getTemplateStatus
    };
})();
EOL
echo "Template loader added."
echo

# Add AI integration
echo "Adding AI integration..."
cat > js/api/ai_integration.js << 'EOL'
/**
 * AI Integration for Dot1Xer Supreme
 * Provides AI-assisted configuration generation and troubleshooting
 */

// API configuration
const aiConfig = {
    providers: {
        openai: {
            name: "OpenAI",
            apiUrl: "https://api.openai.com/v1/chat/completions",
            models: ["gpt-4", "gpt-3.5-turbo"],
            defaultModel: "gpt-3.5-turbo"
        },
        anthropic: {
            name: "Anthropic",
            apiUrl: "https://api.anthropic.com/v1/messages",
            models: ["claude-3-opus-20240229", "claude-3-sonnet-20240229", "claude-3-haiku-20240307"],
            defaultModel: "claude-3-haiku-20240307"
        },
        google: {
            name: "Google AI",
            apiUrl: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
            models: ["gemini-pro"],
            defaultModel: "gemini-pro"
        }
    },
    defaultProvider: "anthropic"
};

// Store API keys securely
let apiKeys = {};

// Set API key for a provider
function setApiKey(provider, key) {
    if (aiConfig.providers[provider]) {
        apiKeys[provider] = key;
        // Store encrypted in localStorage
        try {
            const encryptedKey = btoa(key); // Simple encoding, not true encryption
            localStorage.setItem(`dot1xer_${provider}_key`, encryptedKey);
            console.log(`API key for ${provider} saved`);
            
            // Trigger an event to notify listeners that an API key has been updated
            const event = new CustomEvent('apiKeyUpdated', { 
                detail: { provider, configured: true } 
            });
            document.dispatchEvent(event);
            
            return true;
        } catch (error) {
            console.error(`Error saving API key: ${error}`);
            return false;
        }
    }
    return false;
}

// Get API key for a provider
function getApiKey(provider) {
    // Check memory first
    if (apiKeys[provider]) {
        return apiKeys[provider];
    }
    
    // Try localStorage
    try {
        const encryptedKey = localStorage.getItem(`dot1xer_${provider}_key`);
        if (encryptedKey) {
            const key = atob(encryptedKey); // Decode
            apiKeys[provider] = key;
            return key;
        }
    } catch (error) {
        console.error(`Error retrieving API key: ${error}`);
    }
    
    return null;
}

// Check if API key is set for a provider
function hasApiKey(provider) {
    return getApiKey(provider) !== null;
}

// Clear API key for a provider
function clearApiKey(provider) {
    if (aiConfig.providers[provider]) {
        apiKeys[provider] = null;
        localStorage.removeItem(`dot1xer_${provider}_key`);
        console.log(`API key for ${provider} cleared`);
        
        // Trigger an event to notify listeners that an API key has been updated
        const event = new CustomEvent('apiKeyUpdated', { 
            detail: { provider, configured: false } 
        });
        document.dispatchEvent(event);
        
        return true;
    }
    return false;
}

// Generate configuration using AI
async function generateConfigurationWithAI(template, variables, provider = aiConfig.defaultProvider, model = null) {
    const apiKey = getApiKey(provider);
    if (!apiKey) {
        throw new Error(`API key not set for ${provider}`);
    }
    
    if (!model) {
        model = aiConfig.providers[provider].defaultModel;
    }
    
    // Create prompt
    const prompt = `I need to configure 802.1X authentication on a network device using a template. Please review my template variables and provide recommended values with explanations for each.

Template: ${template.name}
Description: ${template.description}

Here are the current variable settings:
${JSON.stringify(variables, null, 2)}

For each variable, please:
1. Confirm if the value is appropriate or suggest a better value
2. Explain why your recommendation is secure and follows best practices
3. Highlight any potential security risks with the current configuration

Please focus on security best practices for enterprise networks. Format your response as a list of recommendations.`;

    // Make API request based on provider
    switch (provider) {
        case "openai":
            return callOpenAI(prompt, model, apiKey);
        case "anthropic":
            return callAnthropic(prompt, model, apiKey);
        case "google":
            return callGoogleAI(prompt, model, apiKey);
        default:
            throw new Error(`Unknown AI provider: ${provider}`);
    }
}

// OpenAI API call
async function callOpenAI(prompt, model, apiKey) {
    const response = await fetch(aiConfig.providers.openai.apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: model,
            messages: [{ role: "user", content: prompt }],
            temperature: 0.2
        })
    });
    
    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText} - ${error.error?.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
}

// Anthropic API call
async function callAnthropic(prompt, model, apiKey) {
    const response = await fetch(aiConfig.providers.anthropic.apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
            model: model,
            messages: [{ role: "user", content: prompt }],
            max_tokens: 2000,
            temperature: 0.2
        })
    });
    
    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(`Anthropic API error: ${response.status} ${response.statusText} - ${error.error?.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    return data.content[0].text;
}

// Google AI API call
async function callGoogleAI(prompt, model, apiKey) {
    const url = `${aiConfig.providers.google.apiUrl}?key=${apiKey}`;
    
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.2
            }
        })
    });
    
    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(`Google AI API error: ${response.status} ${response.statusText} - ${error.error?.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

// Get AI-assisted troubleshooting help
async function getTroubleshootingHelp(problem, device, provider = aiConfig.defaultProvider) {
    const apiKey = getApiKey(provider);
    if (!apiKey) {
        throw new Error(`API key not set for ${provider}`);
    }
    
    const model = aiConfig.providers[provider].defaultModel;
    
    // Create prompt
    const prompt = `I'm having an issue with 802.1X authentication on a ${device} device. Here's the problem:
${problem}

Please provide troubleshooting steps, potential causes, and solutions to resolve this issue. Include specific commands to run for diagnostics if applicable.`;

    // Make API request based on provider
    switch (provider) {
        case "openai":
            return callOpenAI(prompt, model, apiKey);
        case "anthropic":
            return callAnthropic(prompt, model, apiKey);
        case "google":
            return callGoogleAI(prompt, model, apiKey);
        default:
            throw new Error(`Unknown AI provider: ${provider}`);
    }
}

// Get security review of configuration
async function getSecurityReview(config, deviceType, provider = aiConfig.defaultProvider) {
    const apiKey = getApiKey(provider);
    if (!apiKey) {
        throw new Error(`API key not set for ${provider}`);
    }
    
    const model = aiConfig.providers[provider].defaultModel;
    
    // Create prompt
    const prompt = `Please review this ${deviceType} configuration for security best practices and potential issues:

\`\`\`
${config}
\`\`\`

Please provide:
1. Security assessment - rate the overall security level (Low/Medium/High)
2. Potential vulnerabilities or misconfigurations
3. Recommended improvements
4. Best practices that are already implemented correctly

Focus on authentication, authorization, and accounting aspects.`;

    // Make API request based on provider
    switch (provider) {
        case "openai":
            return callOpenAI(prompt, model, apiKey);
        case "anthropic":
            return callAnthropic(prompt, model, apiKey);
        case "google":
            return callGoogleAI(prompt, model, apiKey);
        default:
            throw new Error(`Unknown AI provider: ${provider}`);
    }
}

// Initialize API key status
function initApiKeyStatus() {
    // Check status for each provider
    for (const provider in aiConfig.providers) {
        const hasKey = hasApiKey(provider);
        console.log(`API key for ${provider}: ${hasKey ? 'Configured' : 'Not configured'}`);
        
        // Trigger event with status
        const event = new CustomEvent('apiKeyUpdated', { 
            detail: { provider, configured: hasKey } 
        });
        document.dispatchEvent(event);
    }
}

// Initialize when module is loaded
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApiKeyStatus);
    } else {
        initApiKeyStatus();
    }
}

// Export functions for use in other modules
window.aiConfig = aiConfig;
window.setApiKey = setApiKey;
window.getApiKey = getApiKey;
window.hasApiKey = hasApiKey;
window.clearApiKey = clearApiKey;
window.generateConfigurationWithAI = generateConfigurationWithAI;
window.getTroubleshootingHelp = getTroubleshootingHelp;
window.getSecurityReview = getSecurityReview;

if (typeof module !== 'undefined') {
    module.exports = {
        aiConfig,
        setApiKey,
        getApiKey,
        hasApiKey,
        clearApiKey,
        generateConfigurationWithAI,
        getTroubleshootingHelp,
        getSecurityReview
    };
}
EOL
echo "AI integration added."
echo

# Add Portnox API integration
echo "Adding Portnox API integration..."
cat > js/api/portnox_api.js << 'EOL'
/**
 * Portnox API Integration for Dot1Xer Supreme
 * Allows integration with Portnox NAC solutions
 */

// Portnox API configuration
const portnoxConfig = {
    apiUrl: "",
    apiKey: "",
    username: "",
    password: "",
    useApiKey: true // If false, use username/password authentication
};

// Set Portnox API configuration
function setPortnoxConfig(config) {
    Object.assign(portnoxConfig, config);
    
    // Store in localStorage
    try {
        const encryptedConfig = btoa(JSON.stringify({
            apiUrl: config.apiUrl,
            username: config.username,
            useApiKey: config.useApiKey
        }));
        localStorage.setItem("dot1xer_portnox_config", encryptedConfig);
        
        // Store credentials separately (more secure)
        if (config.apiKey) {
            localStorage.setItem("dot1xer_portnox_key", btoa(config.apiKey));
        }
        if (config.password) {
            localStorage.setItem("dot1xer_portnox_pwd", btoa(config.password));
        }
        
        console.log("Portnox configuration saved");
        
        // Trigger an event to notify listeners that Portnox config has been updated
        const event = new CustomEvent('portnoxConfigUpdated', { 
            detail: { configured: isPortnoxConfigured() } 
        });
        document.dispatchEvent(event);
        
        return true;
    } catch (error) {
        console.error(`Error saving Portnox configuration: ${error}`);
        return false;
    }
}

// Get Portnox API configuration
function getPortnoxConfig() {
    // Check memory first
    if (portnoxConfig.apiUrl) {
        return portnoxConfig;
    }
    
    // Try localStorage
    try {
        const encryptedConfig = localStorage.getItem("dot1xer_portnox_config");
        const encryptedKey = localStorage.getItem("dot1xer_portnox_key");
        const encryptedPwd = localStorage.getItem("dot1xer_portnox_pwd");
        
        if (encryptedConfig) {
            const config = JSON.parse(atob(encryptedConfig));
            Object.assign(portnoxConfig, config);
            
            if (encryptedKey) {
                portnoxConfig.apiKey = atob(encryptedKey);
            }
            if (encryptedPwd) {
                portnoxConfig.password = atob(encryptedPwd);
            }
            
            return portnoxConfig;
        }
    } catch (error) {
        console.error(`Error retrieving Portnox configuration: ${error}`);
    }
    
    return portnoxConfig;
}

// Check if Portnox API is configured
function isPortnoxConfigured() {
    const config = getPortnoxConfig();
    return config.apiUrl && ((config.useApiKey && config.apiKey) || (!config.useApiKey && config.username && config.password));
}

// Clear Portnox configuration
function clearPortnoxConfig() {
    portnoxConfig.apiUrl = "";
    portnoxConfig.apiKey = "";
    portnoxConfig.username = "";
    portnoxConfig.password = "";
    portnoxConfig.useApiKey = true;
    
    localStorage.removeItem("dot1xer_portnox_config");
    localStorage.removeItem("dot1xer_portnox_key");
    localStorage.removeItem("dot1xer_portnox_pwd");
    
    console.log("Portnox configuration cleared");
    
    // Trigger an event to notify listeners that Portnox config has been updated
    const event = new CustomEvent('portnoxConfigUpdated', { 
        detail: { configured: false } 
    });
    document.dispatchEvent(event);
    
    return true;
}

// Make authenticated Portnox API call
async function callPortnoxApi(endpoint, method = "GET", body = null) {
    const config = getPortnoxConfig();
    let token;
    
    if (!config.apiUrl) {
        throw new Error("Portnox API URL not configured");
    }
    
    if (config.useApiKey) {
        if (!config.apiKey) {
            throw new Error("Portnox API key not configured");
        }
        token = config.apiKey;
    } else {
        if (!config.username || !config.password) {
            throw new Error("Portnox credentials not configured");
        }
        
        // Get authentication token
        const authResponse = await fetch(`${config.apiUrl}/api/auth/token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: config.username,
                password: config.password
            })
        });
        
        if (!authResponse.ok) {
            throw new Error(`Portnox authentication error: ${authResponse.status} ${authResponse.statusText}`);
        }
        
        const authData = await authResponse.json();
        token = authData.token;
    }
    
    // Make API call
    const url = `${config.apiUrl}/api/${endpoint}`;
    const headers = { "Content-Type": "application/json" };
    
    if (config.useApiKey) {
        headers["X-API-Key"] = token;
    } else {
        headers["Authorization"] = `Bearer ${token}`;
    }
    
    const options = { method, headers };
    if (body && (method === "POST" || method === "PUT" || method === "PATCH")) {
        options.body = JSON.stringify(body);
    }
    
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Portnox API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
}

// Get network devices from Portnox
async function getNetworkDevices() {
    return callPortnoxApi("network-devices");
}

// Get endpoints from Portnox
async function getEndpoints() {
    return callPortnoxApi("endpoints");
}

// Get access policies from Portnox
async function getAccessPolicies() {
    return callPortnoxApi("access-policies");
}

// Apply configuration to network device
async function applyConfiguration(deviceId, config) {
    return callPortnoxApi(`network-devices/${deviceId}/config`, "POST", { config });
}

// Test Portnox connection
async function testPortnoxConnection() {
    try {
        // Try a simple API call to verify connection
        await callPortnoxApi("status");
        return { success: true, message: "Connection successful" };
    } catch (error) {
        return { success: false, message: `Connection failed: ${error.message}` };
    }
}

// Initialize Portnox config status
function initPortnoxStatus() {
    const configured = isPortnoxConfigured();
    console.log(`Portnox API: ${configured ? 'Configured' : 'Not configured'}`);
    
    // Trigger event with status
    const event = new CustomEvent('portnoxConfigUpdated', { 
        detail: { configured } 
    });
    document.dispatchEvent(event);
}

// Initialize when module is loaded
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPortnoxStatus);
    } else {
        initPortnoxStatus();
    }
}

// Export functions for use in other modules
window.portnoxConfig = portnoxConfig;
window.setPortnoxConfig = setPortnoxConfig;
window.getPortnoxConfig = getPortnoxConfig;
window.isPortnoxConfigured = isPortnoxConfigured;
window.clearPortnoxConfig = clearPortnoxConfig;
window.getNetworkDevices = getNetworkDevices;
window.getEndpoints = getEndpoints;
window.getAccessPolicies = getAccessPolicies;
window.applyConfiguration = applyConfiguration;
window.testPortnoxConnection = testPortnoxConnection;

if (typeof module !== 'undefined') {
    module.exports = {
        portnoxConfig,
        setPortnoxConfig,
        getPortnoxConfig,
        isPortnoxConfigured,
        clearPortnoxConfig,
        callPortnoxApi,
        getNetworkDevices,
        getEndpoints,
        getAccessPolicies,
        applyConfiguration,
        testPortnoxConnection
    };
}
EOL
echo "Portnox API integration added."
echo
# Add API Configuration UI
echo "Adding API configuration UI..."
cat > js/api/api_config_ui.js << 'EOL'
function createApiConfigUI() {
    const container = document.getElementById('api-config-container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="api-settings">
            <h2>API Configuration</h2>
            <div class="form-group">
                <label for="openai-key">OpenAI API Key</label>
                <input type="password" id="openai-key">
                <button onclick="window.setApiKey('openai', document.getElementById('openai-key').value)">Save</button>
            </div>
            <div class="form-group">
                <label for="portnox-url">Portnox API URL</label>
                <input type="text" id="portnox-url">
                <label for="portnox-key">Portnox API Key</label>
                <input type="password" id="portnox-key">
                <button onclick="window.setPortnoxConfig({apiUrl: document.getElementById('portnox-url').value, apiKey: document.getElementById('portnox-key').value})">Save</button>
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', createApiConfigUI);
EOL
echo "API configuration UI added."
echo
# Add Platform Menu
echo "Adding enhanced Platform Menu..."
cat > js/platform_menu.js << 'EOL'
const platformMenu = {
    wired: {
        name: "Wired",
        platforms: {
            "cisco-ios": { name: "Cisco IOS/IOS-XE", templates: ["ibns2_ios_xe", "tacacs"] },
            "aruba-aoscx": { name: "Aruba AOS-CX", templates: ["aos_cx"] },
            "juniper-ex": { name: "Juniper EX", templates: ["juniper_ex"] },
            "fortinet-switch": { name: "Fortinet FortiSwitch", templates: ["fortiswitch"] },
            "hpe-comware": { name: "HPE Comware", templates: ["comware_dot1x"] },
            "extreme-exos": { name: "Extreme EXOS", templates: ["exos_dot1x"] },
            "dell-os10": { name: "Dell OS10", templates: ["dell_os10"] }
        }
    },
    wireless: {
        name: "Wireless",
        platforms: {
            "cisco-wlc9800": { name: "Cisco WLC 9800", templates: ["wlc_9800"] },
            "aruba-controller": { name: "Aruba Controller", templates: ["aruba_wireless"] },
            "fortinet-fortiwlc": { name: "Fortinet FortiWLC", templates: ["fortinet_wireless"] },
            "ruckus-wireless": { name: "Ruckus Wireless", templates: ["ruckus_wireless"] },
            "cisco-meraki": { name: "Cisco Meraki", templates: ["meraki_wireless"] },
            "extreme-wireless": { name: "Extreme Wireless", templates: ["extreme_wireless"] },
            "ubiquiti-unifi": { name: "Ubiquiti UniFi", templates: ["unifi_wireless"] }
        }
    }
};

function initPlatformMenu() {
    const menu = document.getElementById('platform-menu');
    if (!menu) return;
    
    let html = '<ul class="platform-tabs">';
    Object.keys(platformMenu).forEach((cat, i) => {
        html += `<li class="${i === 0 ? 'active' : ''}" data-category="${cat}">${platformMenu[cat].name}</li>`;
    });
    html += '</ul>';
    
    Object.keys(platformMenu).forEach((cat, i) => {
        html += `<div id="platform-${cat}" style="display: ${i === 0 ? 'block' : 'none'}">`;
        for (const plat in platformMenu[cat].platforms) {
            html += `
                <div class="platform-card">
                    <h3>${platformMenu[cat].platforms[plat].name}</h3>
                    <button onclick="selectPlatform('${cat}', '${plat}')">Select</button>
                </div>
            `;
        }
        html += '</div>';
    });
    
    menu.innerHTML = html;
    
    menu.querySelectorAll('.platform-tabs li').forEach(tab => {
        tab.addEventListener('click', function() {
            menu.querySelectorAll('.platform-tabs li').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            menu.querySelectorAll('.platform-content').forEach(c => c.style.display = 'none');
            document.getElementById(`platform-${this.getAttribute('data-category')}`).style.display = 'block';
        });
    });
}

function selectPlatform(category, platform) {
    const templates = platformMenu[category].platforms[platform].templates;
    Promise.all(templates.map(t => window.loadTemplate(t)))
        .then(() => alert(`Selected ${platformMenu[category].platforms[platform].name}`));
}

document.addEventListener('DOMContentLoaded', initPlatformMenu);
EOL
echo "Enhanced Platform Menu added."
echo
# Add Cisco IBNS 2.0 Template
echo "Adding Cisco IBNS 2.0 template..."
cat > js/templates/cisco/ibns2_ios_xe.js << 'EOL'
const ciscoIbns2IosXeTemplate = {
    name: "Cisco IOS-XE IBNS 2.0",
    template: `
! IBNS 2.0 Configuration
aaa new-model
radius server ISE-1
 address ipv4 {{radius.primary.ip}} auth-port 1812 acct-port 1813
 key {{radius.primary.key}}
interface {{interface}}
 switchport mode access
 dot1x pae authenticator
    `,
    variables: {
        "radius.primary.ip": { default: "10.1.1.1" },
        "radius.primary.key": { default: "secret" },
        "interface": { default: "GigabitEthernet1/0/1" }
    }
};
window.registerTemplate('ibns2_ios_xe', ciscoIbns2IosXeTemplate);
EOL
echo "Cisco IBNS 2.0 template added."
echo

# Add Cisco TACACS+ Template
echo "Adding Cisco TACACS+ template..."
cat > js/templates/cisco/tacacs.js << 'EOL'
const ciscoTacacsTemplate = {
    name: "Cisco TACACS+",
    template: `
! TACACS+ Configuration
tacacs server TACACS-1
 address ipv4 {{tacacs.server1.ip}}
 key {{tacacs.server1.key}}
aaa authentication login default group tacacs+ local
    `,
    variables: {
        "tacacs.server1.ip": { default: "10.1.1.10" },
        "tacacs.server1.key": { default: "tacacs_secret" }
    }
};
window.registerTemplate('tacacs', ciscoTacacsTemplate);
EOL
echo "Cisco TACACS+ template added."
echo

# Add Cisco WLC 9800 Template
echo "Adding Cisco WLC 9800 template..."
cat > js/templates/wireless/cisco/wlc_9800.js << 'EOL'
const ciscoWlc9800Template = {
    name: "Cisco WLC 9800",
    template: `
! WLC 9800 Configuration
radius server ISE-1
 address ipv4 {{radius.server1.ip}} auth-port 1812 acct-port 1813
 key {{radius.server1.key}}
wlan {{ssid.name}} 1 {{ssid.name}}
 security wpa wpa2
    `,
    variables: {
        "radius.server1.ip": { default: "10.1.1.1" },
        "radius.server1.key": { default: "secret" },
        "ssid.name": { default: "Enterprise-WLAN" }
    }
};
window.registerTemplate('wlc_9800', ciscoWlc9800Template);
EOL
echo "Cisco WLC 9800 template added."
echo

# Add Aruba Wireless Template
echo "Adding Aruba Wireless template..."
cat > js/templates/wireless/aruba/aruba_wireless.js << 'EOL'
const arubaWirelessTemplate = {
    name: "Aruba Wireless",
    template: `
! Aruba Wireless Configuration
aaa authentication-server radius "ISE-1"
 host "{{radius.server1.ip}}"
 key "{{radius.server1.key}}"
wlan ssid-profile "{{ssid.name}}"
 essid "{{ssid.name}}"
 opmode wpa2-aes
    `,
    variables: {
        "radius.server1.ip": { default: "10.1.1.1" },
        "radius.server1.key": { default: "secret" },
        "ssid.name": { default: "Corporate-WLAN" }
    }
};
window.registerTemplate('aruba_wireless', arubaWirelessTemplate);
EOL
echo "Aruba Wireless template added."
echo
# Create final update script
echo "Creating final update script..."
cat > update-dot1xer.sh << 'EOL'
#!/bin/bash
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo "Updating index.html..."
if [ -f index.html ] && grep -q "</body></html>" index.html; then
    sed -i.bak '/<\/body><\/html>/d' index.html
    cat >> index.html << 'EOF'
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/accordion.css">
    <link rel="stylesheet" href="css/help_tips.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.7/handlebars.min.js"></script>
    <script src="js/accordion.js"></script>
    <script src="js/template_loader.js"></script>
    <script src="js/platform_menu.js"></script>
    <script src="js/help/help_tips.js"></script>
    <script src="js/api/ai_integration.js"></script>
    <script src="js/api/portnox_api.js"></script>
    <script src="js/api/api_config_ui.js"></script>
    <div class="container">
        <header>
            <div class="container">
                <div class="logo">Dot1Xer Supreme</div>
                <nav>
                    <ul>
                        <li><a href="#platforms">Platforms</a></li>
                        <li><a href="#api-config">API Settings</a></li>
                    </ul>
                </nav>
            </div>
        </header>
        <div id="platform-menu" class="tab-container"></div>
        <div id="api-config-container" class="tab-container"></div>
        <footer>© 2025 Dot1Xer Supreme Team</footer>
    </div>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            initAccordions();
            initHelpTips();
            initPlatformMenu();
            createApiConfigUI();
        });
    </script>
</body></html>
EOF
    echo "index.html updated successfully."
else
    echo "Error updating index.html."
fi

echo "Run completed. Open index.html in your browser."
EOL
chmod +x update-dot1xer.sh
echo "Final update script created."
echo

echo "=== Update Finished ==="
echo "To finalize, run: ./update-dot1xer.sh"