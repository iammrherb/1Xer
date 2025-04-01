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
