/**
 * Dot1Xer Supreme - Templates Module
 * Version: 2.0.0
 * 
 * This file contains functions for loading and managing configuration templates.
 */

/**
 * Load a template for the selected vendor
 * @param {String} vendorId - Vendor identifier
 * @param {String} platform - 'wired' or 'wireless'
 * @param {HTMLElement} container - Container to inject the template into
 * @param {Function} callback - Callback function to execute after template is loaded
 */
function loadTemplate(vendorId, platform, container, callback) {
    // Determine the template path
    let templatePath;
    
    if (platform === 'wired') {
        templatePath = `js/templates/${vendorId}/config_form.html`;
    } else {
        templatePath = `js/templates/wireless/${vendorId}/config_form.html`;
    }
    
    // Attempt to load the template
    fetch(templatePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load template: ${response.status} ${response.statusText}`);
            }
            return response.text();
        })
        .then(html => {
            // Inject the template into the container
            container.innerHTML = html;
            
            // Initialize any template-specific elements
            initTemplateElements(vendorId, platform);
            
            // Execute the callback if provided
            if (typeof callback === 'function') {
                callback();
            }
        })
        .catch(error => {
            console.error('Error loading template:', error);
            
            // Load a generic template as fallback
            loadGenericTemplate(vendorId, platform, container, callback);
        });
}

/**
 * Initialize template-specific elements
 * @param {String} vendorId - Vendor identifier
 * @param {String} platform - 'wired' or 'wireless'
 */
function initTemplateElements(vendorId, platform) {
    // Implementation details
    console.log(`Initializing template elements for ${vendorId} ${platform}`);
}

/**
 * Load a generic template as fallback
 * @param {String} vendorId - Vendor identifier
 * @param {String} platform - 'wired' or 'wireless'
 * @param {HTMLElement} container - Container to inject the template into
 * @param {Function} callback - Callback function to execute after template is loaded
 */
function loadGenericTemplate(vendorId, platform, container, callback) {
    // Implementation details
    console.log(`Loading generic template for ${vendorId} ${platform}`);
    
    // Get vendor details from vendorData
    let vendor = null;
    
    if (platform === 'wired') {
        vendor = vendorData.wired.find(v => v.id === vendorId);
    } else {
        vendor = vendorData.wireless.find(v => v.id === vendorId);
    }
    
    if (!vendor) {
        container.innerHTML = `<div class="alert alert-danger">Vendor information not found for ${vendorId}.</div>`;
        return;
    }
    
    // Create a generic form with basic fields
    container.innerHTML = `
        <div class="vendor-form-header">
            <h3>${vendor.name} Configuration</h3>
            <img src="assets/logos/${vendor.logo}" alt="${vendor.name}" class="vendor-logo">
        </div>
        
        <form id="vendor-config-form">
            <div class="form-group">
                <label for="device_name">Device Name</label>
                <input type="text" class="form-control" id="device_name" name="device_name" required>
            </div>
            
            <div class="form-group">
                <label for="radius_server">RADIUS Server</label>
                <input type="text" class="form-control" id="radius_server" name="radius_server" required>
            </div>
            
            <div class="form-group">
                <label for="shared_secret">Shared Secret</label>
                <input type="password" class="form-control" id="shared_secret" name="shared_secret" required>
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn btn-primary" id="generate-config-btn">Generate Configuration</button>
                <button type="button" class="btn btn-light" id="reset-form-btn">Reset</button>
            </div>
        </form>
    `;
    
    // Execute the callback if provided
    if (typeof callback === 'function') {
        callback();
    }
}
