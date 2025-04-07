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
    
    // Create a generic form with fields based on platform
    if (platform === 'wired') {
        container.innerHTML = createGenericWiredForm(vendor);
    } else {
        container.innerHTML = createGenericWirelessForm(vendor);
    }
    
    // Execute the callback if provided
    if (typeof callback === 'function') {
        callback();
    }
}

/**
 * Create a generic form for wired vendors
 * @param {Object} vendor - Vendor data
 * @returns {String} - HTML for form
 */
function createGenericWiredForm(vendor) {
    return `
        <div class="vendor-form-header">
            <h3>${vendor.name} Configuration</h3>
            <img src="assets/logos/${vendor.logo}" alt="${vendor.name}" class="vendor-logo">
        </div>
        
        <form id="vendor-config-form">
            <div class="form-group">
                <label for="device_name">Device Name</label>
                <input type="text" class="form-control" id="device_name" name="device_name" required>
                <span class="form-hint">The hostname of the switch or device</span>
            </div>
            
            <div class="form-group">
                <label for="radius_server">Primary RADIUS Server</label>
                <input type="text" class="form-control" id="radius_server" name="radius_server" required>
                <span class="form-hint">IP address or hostname of your RADIUS server</span>
            </div>
            
            <div class="form-group">
                <label for="backup_radius_server">Backup RADIUS Server (Optional)</label>
                <input type="text" class="form-control" id="backup_radius_server" name="backup_radius_server">
                <span class="form-hint">IP address or hostname of your backup RADIUS server</span>
            </div>
            
            <div class="form-group">
                <label for="shared_secret">Shared Secret</label>
                <input type="password" class="form-control" id="shared_secret" name="shared_secret" required>
                <span class="form-hint">The shared secret for RADIUS authentication</span>
            </div>
            
            <div class="form-group">
                <label for="port_range">Port Range</label>
                <input type="text" class="form-control" id="port_range" name="port_range" placeholder="e.g., GigabitEthernet1/0/1-48">
                <span class="form-hint">The range of ports to apply 802.1X configuration</span>
            </div>
            
            <div class="form-group">
                <label for="auth_vlan">Authentication VLAN</label>
                <input type="number" class="form-control" id="auth_vlan" name="auth_vlan" placeholder="e.g., 10">
                <span class="form-hint">VLAN ID for authenticated devices</span>
            </div>
            
            <div class="form-group">
                <label for="guest_vlan">Guest VLAN (Optional)</label>
                <input type="number" class="form-control" id="guest_vlan" name="guest_vlan" placeholder="e.g., 20">
                <span class="form-hint">VLAN ID for guest or unauthenticated devices</span>
            </div>
            
            <div class="form-group">
                <label>Authentication Mode</label>
                <div class="radio-label">
                    <input type="radio" name="auth_mode" id="auth_mode_dot1x" value="dot1x" checked>
                    <label for="auth_mode_dot1x">802.1X Only</label>
                </div>
                
                <div class="radio-label">
                    <input type="radio" name="auth_mode" id="auth_mode_dot1x_mab" value="dot1x_mab">
                    <label for="auth_mode_dot1x_mab">802.1X with MAB Fallback</label>
                </div>
                
                <div class="radio-label">
                    <input type="radio" name="auth_mode" id="auth_mode_mab" value="mab">
                    <label for="auth_mode_mab">MAB Only</label>
                </div>
            </div>
            
            <div class="form-group">
                <label>Advanced Options</label>
                <div class="checkbox-label">
                    <input type="checkbox" id="enable_accounting" name="enable_accounting" checked>
                    <label for="enable_accounting">Enable RADIUS Accounting</label>
                </div>
                
                <div class="checkbox-label">
                    <input type="checkbox" id="enable_reauth" name="enable_reauth" checked>
                    <label for="enable_reauth">Enable Periodic Reauthentication</label>
                </div>
                
                <div class="form-group" id="reauth_group">
                    <label for="reauth_interval">Reauthentication Interval (seconds)</label>
                    <input type="number" class="form-control" id="reauth_interval" name="reauth_interval" value="3600">
                </div>
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn btn-primary" id="generate-config-btn">Generate Configuration</button>
                <button type="button" class="btn btn-light" id="reset-form-btn">Reset</button>
            </div>
        </form>
    `;
}

/**
 * Create a generic form for wireless vendors
 * @param {Object} vendor - Vendor data
 * @returns {String} - HTML for form
 */
function createGenericWirelessForm(vendor) {
    return `
        <div class="vendor-form-header">
            <h3>${vendor.name} Configuration</h3>
            <img src="assets/logos/${vendor.logo}" alt="${vendor.name}" class="vendor-logo">
        </div>
        
        <form id="vendor-config-form">
            <div class="form-group">
                <label for="controller_name">Controller Name</label>
                <input type="text" class="form-control" id="controller_name" name="controller_name" required>
                <span class="form-hint">The hostname of the wireless controller</span>
            </div>
            
            <div class="form-group">
                <label for="ssid">SSID</label>
                <input type="text" class="form-control" id="ssid" name="ssid" required>
                <span class="form-hint">The SSID name for 802.1X authentication</span>
            </div>
            
            <div class="form-group">
                <label for="radius_server">Primary RADIUS Server</label>
                <input type="text" class="form-control" id="radius_server" name="radius_server" required>
                <span class="form-hint">IP address or hostname of your RADIUS server</span>
            </div>
            
            <div class="form-group">
                <label for="backup_radius_server">Backup RADIUS Server (Optional)</label>
                <input type="text" class="form-control" id="backup_radius_server" name="backup_radius_server">
                <span class="form-hint">IP address or hostname of your backup RADIUS server</span>
            </div>
            
            <div class="form-group">
                <label for="shared_secret">Shared Secret</label>
                <input type="password" class="form-control" id="shared_secret" name="shared_secret" required>
                <span class="form-hint">The shared secret for RADIUS authentication</span>
            </div>
            
            <div class="form-group">
                <label for="vlan">VLAN ID</label>
                <input type="number" class="form-control" id="vlan" name="vlan" placeholder="e.g., 10">
                <span class="form-hint">VLAN ID for authenticated clients</span>
            </div>
            
            <div class="form-group">
                <label>Security Settings</label>
                <div class="radio-label">
                    <input type="radio" name="security_mode" id="security_mode_wpa2" value="wpa2" checked>
                    <label for="security_mode_wpa2">WPA2 Enterprise</label>
                </div>
                
                <div class="radio-label">
                    <input type="radio" name="security_mode" id="security_mode_wpa3" value="wpa3">
                    <label for="security_mode_wpa3">WPA3 Enterprise</label>
                </div>
                
                <div class="radio-label">
                    <input type="radio" name="security_mode" id="security_mode_mixed" value="mixed">
                    <label for="security_mode_mixed">WPA2/WPA3 Mixed Mode</label>
                </div>
            </div>
            
            <div class="form-group">
                <label>Advanced Options</label>
                <div class="checkbox-label">
                    <input type="checkbox" id="enable_accounting" name="enable_accounting" checked>
                    <label for="enable_accounting">Enable RADIUS Accounting</label>
                </div>
                
                <div class="checkbox-label">
                    <input type="checkbox" id="enable_pmkid" name="enable_pmkid" checked>
                    <label for="enable_pmkid">Enable PMKID Caching</label>
                </div>
                
                <div class="checkbox-label">
                    <input type="checkbox" id="enable_fast_transition" name="enable_fast_transition">
                    <label for="enable_fast_transition">Enable Fast Transition (802.11r)</label>
                </div>
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn btn-primary" id="generate-config-btn">Generate Configuration</button>
                <button type="button" class="btn btn-light" id="reset-form-btn">Reset</button>
            </div>
        </form>
    `;
}
