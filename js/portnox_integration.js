/**
 * Dot1Xer Supreme - Portnox Integration
 * Provides integration with Portnox NAC solutions
 * Version: 3.0.0
 */

// Initialize Portnox integration
function initializePortnoxIntegration() {
    // Set up event listeners for Portnox controls
    const connectButton = document.getElementById('portnox-connect');
    const disconnectButton = document.getElementById('portnox-disconnect');
    const syncButton = document.getElementById('sync-portnox');
    
    if (connectButton) {
        connectButton.addEventListener('click', connectToPortnox);
    }
    
    if (disconnectButton) {
        disconnectButton.addEventListener('click', disconnectFromPortnox);
    }
    
    if (syncButton) {
        syncButton.addEventListener('click', syncWithPortnox);
    }
    
    // Check for saved connection
    checkSavedConnection();
}

// Connect to Portnox
function connectToPortnox() {
    // Get connection details
    const apiUrl = document.getElementById('portnox-api-url').value;
    const apiKey = document.getElementById('portnox-api-key').value;
    
    if (!apiUrl || !apiKey) {
        alert('Please enter API URL and API Key.');
        return;
    }
    
    // Show connecting state
    const connectButton = document.getElementById('portnox-connect');
    connectButton.disabled = true;
    connectButton.textContent = 'Connecting...';
    
    // Simulate connection (in a real implementation, this would make an API call)
    setTimeout(() => {
        // Update button state
        connectButton.disabled = false;
        connectButton.textContent = 'Connect';
        
        // Update connection status
        const statusElement = document.querySelector('.portnox-status');
        statusElement.textContent = 'Connected';
        statusElement.classList.remove('disconnected');
        statusElement.classList.add('connected');
        
        // Show additional sections
        document.getElementById('portnox-features').style.display = 'grid';
        document.getElementById('portnox-sync-section').style.display = 'block';
        document.getElementById('portnox-dashboard').style.display = 'grid';
        
        // Hide connect form, show disconnect button
        document.getElementById('portnox-connection-form').style.display = 'none';
        document.getElementById('portnox-disconnect').style.display = 'block';
        
        // Save connection details
        localStorage.setItem('portnox-api-url', apiUrl);
        localStorage.setItem('portnox-api-key', apiKey); // In real app, don't store API key in localStorage
        localStorage.setItem('portnox-connected', 'true');
        
        // Populate dashboard with sample data
        populateDashboard();
    }, 1500);
}

// Disconnect from Portnox
function disconnectFromPortnox() {
    // Show disconnecting state
    const disconnectButton = document.getElementById('portnox-disconnect');
    disconnectButton.disabled = true;
    disconnectButton.textContent = 'Disconnecting...';
    
    // Simulate disconnection
    setTimeout(() => {
        // Update button state
        disconnectButton.disabled = false;
        disconnectButton.textContent = 'Disconnect';
        
        // Update connection status
        const statusElement = document.querySelector('.portnox-status');
        statusElement.textContent = 'Disconnected';
        statusElement.classList.remove('connected');
        statusElement.classList.add('disconnected');
        
        // Hide additional sections
        document.getElementById('portnox-features').style.display = 'none';
        document.getElementById('portnox-sync-section').style.display = 'none';
        document.getElementById('portnox-dashboard').style.display = 'none';
        
        // Show connect form, hide disconnect button
        document.getElementById('portnox-connection-form').style.display = 'grid';
        disconnectButton.style.display = 'none';
        
        // Clear connection details
        localStorage.removeItem('portnox-api-key');
        localStorage.removeItem('portnox-connected');
    }, 1000);
}

// Sync with Portnox
function syncWithPortnox() {
    // Get sync options
    const syncDevices = document.getElementById('sync-devices').checked;
    const syncUsers = document.getElementById('sync-users').checked;
    const syncPolicies = document.getElementById('sync-policies').checked;
    
    if (!syncDevices && !syncUsers && !syncPolicies) {
        alert('Please select at least one item to sync.');
        return;
    }
    
    // Show syncing state
    const syncButton = document.getElementById('sync-portnox');
    syncButton.disabled = true;
    syncButton.textContent = 'Syncing...';
    
    // Create and show progress bar
    let progressContainer = document.getElementById('sync-progress-container');
    
    if (!progressContainer) {
        progressContainer = document.createElement('div');
        progressContainer.id = 'sync-progress-container';
        progressContainer.className = 'progress-bar-container';
        progressContainer.innerHTML = '<div id="sync-progress-bar" class="progress-bar"></div>';
        document.getElementById('portnox-sync-section').appendChild(progressContainer);
    } else {
        progressContainer.style.display = 'block';
    }
    
    const progressBar = document.getElementById('sync-progress-bar');
    progressBar.style.width = '0%';
    
    // Simulate sync progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 5;
        progressBar.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            
            // Update button state
            syncButton.disabled = false;
            syncButton.textContent = 'Sync Now';
            
            // Update last sync time
            document.getElementById('last-sync-time').textContent = new Date().toLocaleString();
            
            // Hide progress bar after a delay
            setTimeout(() => {
                progressContainer.style.display = 'none';
            }, 2000);
            
            // Show success message
            alert('Synchronization completed successfully!');
            
            // Update dashboard with new data
            populateDashboard();
        }
    }, 100);
}

// Check for saved connection
function checkSavedConnection() {
    if (localStorage.getItem('portnox-connected') === 'true') {
        // Get saved API URL
        const apiUrl = localStorage.getItem('portnox-api-url') || '';
        const apiKey = localStorage.getItem('portnox-api-key') || '';
        
        if (apiUrl && apiKey) {
            // Set form values
            document.getElementById('portnox-api-url').value = apiUrl;
            document.getElementById('portnox-api-key').value = apiKey;
            
            // Connect automatically
            connectToPortnox();
        }
    }
}

// Populate dashboard with sample data
function populateDashboard() {
    // Generate random data for the dashboard
    const totalDevices = Math.floor(Math.random() * 500) + 100;
    const compliantDevices = Math.floor(totalDevices * (Math.random() * 0.3 + 0.6)); // 60-90% compliant
    const nonCompliantDevices = totalDevices - compliantDevices;
    
    const totalUsers = Math.floor(Math.random() * 300) + 50;
    const activeUsers = Math.floor(totalUsers * (Math.random() * 0.4 + 0.5)); // 50-90% active
    
    const successRate = Math.floor(Math.random() * 10) + 90; // 90-99% success rate
    
    // Update dashboard stats
    document.getElementById('total-devices').textContent = totalDevices;
    document.getElementById('compliant-devices').textContent = compliantDevices;
    document.getElementById('compliant-percentage').textContent = `${Math.round((compliantDevices / totalDevices) * 100)}%`;
    
    document.getElementById('total-users').textContent = totalUsers;
    document.getElementById('active-users').textContent = activeUsers;
    document.getElementById('active-percentage').textContent = `${Math.round((activeUsers / totalUsers) * 100)}%`;
    
    document.getElementById('auth-success-rate').textContent = `${successRate}%`;
    
    // Generate and update recent devices list
    const recentDevicesList = document.getElementById('recent-devices-list');
    
    if (recentDevicesList) {
        recentDevicesList.innerHTML = '';
        
        // Generate 5 random devices
        const deviceTypes = ['Workstation', 'Phone', 'Printer', 'IoT Device', 'Server'];
        const vendors = ['Dell', 'HP', 'Cisco', 'Apple', 'Lenovo', 'Samsung'];
        
        for (let i = 0; i < 5; i++) {
            const deviceType = deviceTypes[Math.floor(Math.random() * deviceTypes.length)];
            const vendor = vendors[Math.floor(Math.random() * vendors.length)];
            const mac = generateRandomMac();
            const compliant = Math.random() > 0.2; // 80% chance of compliance
            
            const deviceItem = document.createElement('li');
            deviceItem.innerHTML = `
                <span>
                    <span class="device-status ${compliant ? 'compliant' : 'non-compliant'}"></span>
                    ${vendor} ${deviceType}
                </span>
                <span>${mac}</span>
            `;
            
            recentDevicesList.appendChild(deviceItem);
        }
    }
    
    // Generate and update recent auth events list
    const recentAuthList = document.getElementById('recent-auth-list');
    
    if (recentAuthList) {
        recentAuthList.innerHTML = '';
        
        // Generate 5 random auth events
        const users = ['user1', 'user2', 'admin', 'jsmith', 'auser'];
        const results = ['Success', 'Success', 'Success', 'Success', 'Failure']; // 80% success rate
        
        for (let i = 0; i < 5; i++) {
            const user = users[Math.floor(Math.random() * users.length)];
            const result = results[Math.floor(Math.random() * results.length)];
            const time = new Date(Date.now() - Math.floor(Math.random() * 3600000)).toLocaleTimeString();
            
            const authItem = document.createElement('li');
            authItem.innerHTML = `
                <span>${user}</span>
                <span class="${result === 'Success' ? 'stat positive' : 'stat negative'}">${result}</span>
            `;
            
            recentAuthList.appendChild(authItem);
        }
    }
}

// Generate a random MAC address
function generateRandomMac() {
    return Array.from({length: 6}, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join(':');
}

// Export initialization function
window.initializePortnoxIntegration = initializePortnoxIntegration;
