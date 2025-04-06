/**
 * Dot1Xer Supreme - Main JavaScript File
 * Version: 2.0.0
 * 
 * This file contains the core functionality of the Dot1Xer Supreme application.
 */

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tab navigation
    initTabNavigation();
    
    // Initialize platform toggle
    initPlatformToggle();
    
    // Initialize vendor grid
    initVendorGrid();
    
    // Initialize discovery tabs
    initDiscoveryTabs();
    
    // Initialize event listeners
    initEventListeners();
    
    // Check for saved configurations
    checkSavedConfigurations();
    
    // Initialize AI components if available
    if (typeof initAIIntegration === 'function') {
        initAIIntegration();
    }
    
    // Initialize Portnox integration if available
    if (typeof initPortnoxIntegration === 'function') {
        initPortnoxIntegration();
    }
});

/**
 * Initialize tab navigation
 */
function initTabNavigation() {
    const tabLinks = document.querySelectorAll('.nav-tabs a');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            tabLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to current link
            this.classList.add('active');
            
            // Get the tab id from data attribute
            const tabId = this.getAttribute('data-tab');
            
            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Show the selected tab content
            document.getElementById(tabId).classList.add('active');
        });
    });
}

/**
 * Initialize platform toggle
 */
function initPlatformToggle() {
    const platformButtons = document.querySelectorAll('.platform-toggle-btn');
    const wiredVendors = document.getElementById('wired-vendors');
    const wirelessVendors = document.getElementById('wireless-vendors');
    
    platformButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            platformButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to current button
            this.classList.add('active');
            
            // Get the platform from data attribute
            const platform = this.getAttribute('data-platform');
            
            // Show the appropriate vendor grid
            if (platform === 'wired') {
                wiredVendors.style.display = 'grid';
                wirelessVendors.style.display = 'none';
            } else {
                wiredVendors.style.display = 'none';
                wirelessVendors.style.display = 'grid';
            }
            
            // Reset any selected vendor
            document.querySelectorAll('.vendor-card').forEach(card => {
                card.classList.remove('selected');
            });
            
            // Hide configuration form and output
            document.getElementById('config-form-container').style.display = 'none';
            document.getElementById('config-output-container').style.display = 'none';
        });
    });
}

/**
 * Initialize vendor grid
 */
function initVendorGrid() {
    // Check if vendor data is available
    if (typeof vendorData === 'undefined') {
        console.error('Vendor data not found. Make sure vendor-data.js is loaded.');
        return;
    }
    
    const wiredVendorsContainer = document.getElementById('wired-vendors');
    const wirelessVendorsContainer = document.getElementById('wireless-vendors');
    
    // Clear containers
    wiredVendorsContainer.innerHTML = '';
    wirelessVendorsContainer.innerHTML = '';
    
    // Populate wired vendors
    vendorData.wired.forEach(vendor => {
        const vendorCard = createVendorCard(vendor, 'wired');
        wiredVendorsContainer.appendChild(vendorCard);
    });
    
    // Populate wireless vendors
    vendorData.wireless.forEach(vendor => {
        const vendorCard = createVendorCard(vendor, 'wireless');
        wirelessVendorsContainer.appendChild(vendorCard);
    });
}

/**
 * Create a vendor card element
 * @param {Object} vendor - Vendor data object
 * @param {String} platform - 'wired' or 'wireless'
 * @returns {HTMLElement} - Vendor card element
 */
function createVendorCard(vendor, platform) {
    const card = document.createElement('div');
    card.className = 'vendor-card';
    card.setAttribute('data-vendor', vendor.id);
    card.setAttribute('data-platform', platform);
    
    // Create card header
    const cardHeader = document.createElement('div');
    cardHeader.className = 'vendor-card-header';
    cardHeader.textContent = vendor.name;
    card.appendChild(cardHeader);
    
    // Create card body
    const cardBody = document.createElement('div');
    cardBody.className = 'vendor-card-body';
    
    // Add vendor logo
    const logo = document.createElement('img');
    logo.className = 'vendor-logo';
    logo.src = `assets/logos/${vendor.logo}`;
    logo.alt = vendor.name;
    cardBody.appendChild(logo);
    
    // Add vendor description
    const description = document.createElement('p');
    description.className = 'vendor-description';
    description.textContent = vendor.description || `${vendor.name} ${platform === 'wired' ? 'switches' : 'wireless'} configuration`;
    cardBody.appendChild(description);
    
    // Add select button
    const selectBtn = document.createElement('button');
    selectBtn.className = 'btn btn-primary btn-sm';
    selectBtn.textContent = 'Select';
    selectBtn.addEventListener('click', function() {
        selectVendor(vendor, platform);
    });
    cardBody.appendChild(selectBtn);
    
    card.appendChild(cardBody);
    
    // Add click event to the entire card
    card.addEventListener('click', function() {
        selectVendor(vendor, platform);
    });
    
    return card;
}

/**
 * Initialize discovery tabs
 */
function initDiscoveryTabs() {
    const discoveryTabBtns = document.querySelectorAll('.discovery-tab-btn');
    const discoveryTabContents = document.querySelectorAll('.discovery-tab-content');
    
    discoveryTabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            discoveryTabBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to current button
            this.classList.add('active');
            
            // Get the tab id from data attribute
            const tabId = this.getAttribute('data-tab');
            
            // Hide all tab contents
            discoveryTabContents.forEach(content => content.classList.remove('active'));
            
            // Show the selected tab content
            document.getElementById(tabId).classList.add('active');
        });
    });
}

/**
 * Initialize global event listeners
 */
function initEventListeners() {
    // Implementation details
    console.log('Event listeners initialized');
}

/**
 * Check for saved configurations
 */
function checkSavedConfigurations() {
    // Implementation details
    console.log('Checking saved configurations');
}
