/**
 * Dot1Xer Supreme - Vendor Data
 * Contains data about supported vendors and their platforms
 */

const vendorData = {
    // Cisco data
    cisco: {
        name: "Cisco",
        platforms: {
            ios: {
                name: "IOS",
                minVersion: "12.2(55)SE",
                recommendedVersion: "15.2(2)E",
                supportsMAB: true,
                supportsCoA: true,
                supportsDynamicVLAN: true,
                supportsCriticalVLAN: true,
                supportsGuestVLAN: true,
                supportsVoiceVLAN: true,
                configGuide: "cisco-ios-config-guide.html",
                templatePath: "templates/cisco/ios/"
            },
            "ios-xe": {
                name: "IOS-XE",
                minVersion: "3.2.0",
                recommendedVersion: "16.9.4",
                supportsMAB: true,
                supportsCoA: true,
                supportsDynamicVLAN: true,
                supportsCriticalVLAN: true,
                supportsGuestVLAN: true,
                supportsVoiceVLAN: true,
                configGuide: "cisco-ios-xe-config-guide.html",
                templatePath: "templates/cisco/ios-xe/"
            },
            "nx-os": {
                name: "NX-OS",
                minVersion: "5.2",
                recommendedVersion: "9.3(5)",
                supportsMAB: true,
                supportsCoA: true,
                supportsDynamicVLAN: true,
                supportsCriticalVLAN: true,
                supportsGuestVLAN: true,
                supportsVoiceVLAN: true,
                configGuide: "cisco-nx-os-config-guide.html",
                templatePath: "templates/cisco/nx-os/"
            },
            wlc: {
                name: "Wireless LAN Controller",
                minVersion: "7.0",
                recommendedVersion: "8.10",
                supportsMAB: false,
                supportsCoA: true,
                supportsDynamicVLAN: true,
                supportsCriticalVLAN: false,
                supportsGuestVLAN: true,
                supportsVoiceVLAN: false,
                configGuide: "cisco-wlc-config-guide.html",
                templatePath: "templates/cisco/wlc/"
            }
        }
    },
    
    // Aruba data
    aruba: {
        name: "Aruba",
        platforms: {
            "aos-cx": {
                name: "AOS-CX",
                minVersion: "10.4",
                recommendedVersion: "10.7",
                supportsMAB: true,
                supportsCoA: true,
                supportsDynamicVLAN: true,
                supportsCriticalVLAN: true,
                supportsGuestVLAN: true,
                supportsVoiceVLAN: true,
                configGuide: "aruba-aos-cx-config-guide.html",
                templatePath: "templates/aruba/aos-cx/"
            },
            "aos-switch": {
                name: "AOS-Switch (ArubaOS)",
                minVersion: "16.4",
                recommendedVersion: "16.10",
                supportsMAB: true,
                supportsCoA: true,
                supportsDynamicVLAN: true,
                supportsCriticalVLAN: true,
                supportsGuestVLAN: true,
                supportsVoiceVLAN: true,
                configGuide: "aruba-aos-switch-config-guide.html",
                templatePath: "templates/aruba/aos-switch/"
            },
            instant: {
                name: "Instant AP",
                minVersion: "6.4",
                recommendedVersion: "8.7",
                supportsMAB: false,
                supportsCoA: true,
                supportsDynamicVLAN: true,
                supportsCriticalVLAN: false,
                supportsGuestVLAN: true,
                supportsVoiceVLAN: false,
                configGuide: "aruba-instant-config-guide.html",
                templatePath: "templates/aruba/instant/"
            }
        }
    },
    
    // Juniper data
    juniper: {
        name: "Juniper",
        platforms: {
            junos: {
                name: "JunOS",
                minVersion: "12.3",
                recommendedVersion: "19.4",
                supportsMAB: true,
                supportsCoA: true,
                supportsDynamicVLAN: true,
                supportsCriticalVLAN: true,
                supportsGuestVLAN: true,
                supportsVoiceVLAN: true,
                configGuide: "juniper-junos-config-guide.html",
                templatePath: "templates/juniper/junos/"
            },
            "ex-series": {
                name: "EX Series",
                minVersion: "12.3",
                recommendedVersion: "19.4",
                supportsMAB: true,
                supportsCoA: true,
                supportsDynamicVLAN: true,
                supportsCriticalVLAN: true,
                supportsGuestVLAN: true,
                supportsVoiceVLAN: true,
                configGuide: "juniper-ex-config-guide.html",
                templatePath: "templates/juniper/ex-series/"
            },
            "srx-series": {
                name: "SRX Series",
                minVersion: "12.3",
                recommendedVersion: "19.4",
                supportsMAB: true,
                supportsCoA: true,
                supportsDynamicVLAN: true,
                supportsCriticalVLAN: false,
                supportsGuestVLAN: true,
                supportsVoiceVLAN: false,
                configGuide: "juniper-srx-config-guide.html",
                templatePath: "templates/juniper/srx-series/"
            }
        }
    },
    
    // Fortinet data
    fortinet: {
        name: "Fortinet",
        platforms: {
            fortigate: {
                name: "FortiGate",
                minVersion: "6.0",
                recommendedVersion: "7.0",
                supportsMAB: true,
                supportsCoA: true,
                supportsDynamicVLAN: true,
                supportsCriticalVLAN: false,
                supportsGuestVLAN: true,
                supportsVoiceVLAN: false,
                configGuide: "fortinet-fortigate-config-guide.html",
                templatePath: "templates/fortinet/fortigate/"
            },
            fortiswitch: {
                name: "FortiSwitch",
                minVersion: "6.2",
                recommendedVersion: "6.4",
                supportsMAB: true,
                supportsCoA: true,
                supportsDynamicVLAN: true,
                supportsCriticalVLAN: true,
                supportsGuestVLAN: true,
                supportsVoiceVLAN: true,
                configGuide: "fortinet-fortiswitch-config-guide.html",
                templatePath: "templates/fortinet/fortiswitch/"
            },
            fortiwlc: {
                name: "FortiWLC",
                minVersion: "8.3",
                recommendedVersion: "8.6",
                supportsMAB: false,
                supportsCoA: true,
                supportsDynamicVLAN: true,
                supportsCriticalVLAN: false,
                supportsGuestVLAN: true,
                supportsVoiceVLAN: false,
                configGuide: "fortinet-fortiwlc-config-guide.html",
                templatePath: "templates/fortinet/fortiwlc/"
            }
        }
    }
    
    // Additional vendors would be defined here
};

/**
 * Get information about a specific vendor
 * @param {string} vendorId - The ID of the vendor
 * @returns {object} Vendor information or null if not found
 */
function getVendorInfo(vendorId) {
    return vendorData[vendorId] || null;
}

/**
 * Get information about a specific platform for a vendor
 * @param {string} vendorId - The ID of the vendor
 * @param {string} platformId - The ID of the platform
 * @returns {object} Platform information or null if not found
 */
function getPlatformInfo(vendorId, platformId) {
    if (vendorData[vendorId] && vendorData[vendorId].platforms[platformId]) {
        return vendorData[vendorId].platforms[platformId];
    }
    return null;
}

/**
 * Check if a specific platform supports a feature
 * @param {string} vendorId - The ID of the vendor
 * @param {string} platformId - The ID of the platform
 * @param {string} feature - The feature to check (e.g., 'supportsMAB')
 * @returns {boolean} True if the platform supports the feature, false otherwise
 */
function platformSupportsFeature(vendorId, platformId, feature) {
    const platformInfo = getPlatformInfo(vendorId, platformId);
    if (platformInfo && platformInfo[feature] !== undefined) {
        return platformInfo[feature];
    }
    return false;
}

/**
 * Get all supported vendors
 * @returns {array} Array of vendor objects with id and name
 */
function getAllVendors() {
    return Object.keys(vendorData).map(vendorId => ({
        id: vendorId,
        name: vendorData[vendorId].name
    }));
}

/**
 * Get all platforms for a specific vendor
 * @param {string} vendorId - The ID of the vendor
 * @returns {array} Array of platform objects with id and name
 */
function getVendorPlatforms(vendorId) {
    if (!vendorData[vendorId]) {
        return [];
    }
    
    return Object.keys(vendorData[vendorId].platforms).map(platformId => ({
        id: platformId,
        name: vendorData[vendorId].platforms[platformId].name
    }));
}
