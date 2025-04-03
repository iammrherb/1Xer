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

// Make authenticated Portnox API call
async function callPortnoxApi(endpoint, method = "GET", body = null) {
    const config = getPortnoxConfig();
    let token;
    
    if (config.useApiKey) {
        token = config.apiKey;
    } else {
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

// Apply configuration to network device
async function applyConfiguration(deviceId, config) {
    return callPortnoxApi(`network-devices/${deviceId}/config`, "POST", { config });
}

// Export functions for use in other modules
if (typeof module !== 'undefined') {
    module.exports = {
        setPortnoxConfig,
        getPortnoxConfig,
        callPortnoxApi,
        getNetworkDevices,
        getEndpoints,
        applyConfiguration
    };
}
