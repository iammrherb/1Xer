/**
 * Dot1Xer Supreme - Vendor Data
 * Contains vendor-specific information and configurations
 */

const vendorData = {
    // Cisco configuration data
    cisco: {
        name: "Cisco",
        platforms: {
            "ios": {
                name: "IOS",
                minVersion: "12.2(55)SE",
                recommendedVersion: "15.2(4)E",
                supportsMAB: true,
                supports8021x: true,
                supportsCoA: true,
                supportsMDA: true,
                supportsCriticalVLAN: true,
                supportsGuestVLAN: true,
                supportsRadSec: false,
                notes: "Cisco IOS has excellent 802.1X support with comprehensive features."
            },
            "ios-xe": {
                name: "IOS-XE",
                minVersion: "3.2.0",
                recommendedVersion: "16.9.1",
                supportsMAB: true,
                supports8021x: true,
                supportsCoA: true,
                supportsMDA: true,
                supportsCriticalVLAN: true,
                supportsGuestVLAN: true,
                supportsRadSec: true,
                notes: "Cisco IOS-XE provides modern 802.1X features and is recommended for new deployments."
            },
            "nx-os": {
                name: "NX-OS",
                minVersion: "5.2",
                recommendedVersion: "9.2",
                supportsMAB: true,
                supports8021x: true,
                supportsCoA: true,
                supportsMDA: false,
                supportsCriticalVLAN: true,
                supportsGuestVLAN: true,
                supportsRadSec: false,
                notes: "NX-OS has good 802.1X support but lacks some advanced features like MDA."
            },
            "wlc": {
                name: "Wireless LAN Controller",
                minVersion: "7.4",
                recommendedVersion: "8.5",
                supportsMAB: true,
                supports8021x: true,
                supportsCoA: true,
                supportsMDA: false,
                supportsCriticalVLAN: false,
                supportsGuestVLAN: true,
                supportsRadSec: false,
                notes: "Cisco WLC provides comprehensive 802.1X support for wireless networks."
            }
        },
        supportsMultiAuth: true,
        defaultPorts: {
            auth: 1812,
            acct: 1813,
            coa: 3799
        },
        radiusConfigStyle: "server-first",
        vendorSpecificAttributes: [
            "Cisco-AVPair",
            "Cisco-NAS-Port"
        ]
    },
    
    // Aruba configuration data
    aruba: {
        name: "Aruba",
        platforms: {
            "aos-cx": {
                name: "AOS-CX",
                minVersion: "10.4",
                recommendedVersion: "10.9",
                supportsMAB: true,
                supports8021x: true,
                supportsCoA: true,
                supportsMDA: true,
                supportsCriticalVLAN: true,
                supportsGuestVLAN: true,
                supportsRadSec: true,
                notes: "Aruba AOS-CX provides excellent 802.1X support with modern features."
            },
            "aos-switch": {
                name: "AOS-Switch",
                minVersion: "16.04",
                recommendedVersion: "16.10",
                supportsMAB: true,
                supports8021x: true,
                supportsCoA: true,
                supportsMDA: true,
                supportsCriticalVLAN: true,
                supportsGuestVLAN: true,
                supportsRadSec: false,
                notes: "Aruba AOS-Switch (formerly ProVision) has good 802.1X support for legacy deployments."
            },
            "instant": {
                name: "Instant AP",
                minVersion: "6.4",
                recommendedVersion: "8.7",
                supportsMAB: true,
                supports8021x: true,
                supportsCoA: true,
                supportsMDA: false,
                supportsCriticalVLAN: false,
                supportsGuestVLAN: true,
                supportsRadSec: false,
                notes: "Aruba Instant AP provides controller-less 802.1X support for wireless networks."
            }
        },
        supportsMultiAuth: true,
        defaultPorts: {
            auth: 1812,
            acct: 1813,
            coa: 3799
        },
        radiusConfigStyle: "server-first",
        vendorSpecificAttributes: [
            "Aruba-User-Role",
            "Aruba-AP-Group"
        ]
    },
    
    // Juniper configuration data
    juniper: {
        name: "Juniper",
        platforms: {
            "junos": {
                name: "JunOS",
                minVersion: "12.3",
                recommendedVersion: "21.2",
                supportsMAB: true,
                supports8021x: true,
                supportsCoA: true,
                supportsMDA: true,
                supportsCriticalVLAN: true,
                supportsGuestVLAN: true,
                supportsRadSec: false,
                notes: "Juniper JunOS provides comprehensive 802.1X features across enterprise platforms."
            },
            "ex-series": {
                name: "EX Series",
                minVersion: "12.3",
                recommendedVersion: "21.2",
                supportsMAB: true,
                supports8021x: true,
                supportsCoA: true,
                supportsMDA: true,
                supportsCriticalVLAN: true,
                supportsGuestVLAN: true,
                supportsRadSec: false,
                notes: "Juniper EX Series switches are optimized for enterprise 802.1X deployments."
            },
            "srx-series": {
                name: "SRX Series",
                minVersion: "12.3",
                recommendedVersion: "21.2",
                supportsMAB: true,
                supports8021x: true,
                supportsCoA: true,
                supportsMDA: false,
                supportsCriticalVLAN: true,
                supportsGuestVLAN: true,
                supportsRadSec: false,
                notes: "Juniper SRX Series devices provide 802.1X features with integrated security functions."
            }
        },
        supportsMultiAuth: true,
        defaultPorts: {
            auth: 1812,
            acct: 1813,
            coa: 3799
        },
        radiusConfigStyle: "profile-based",
        vendorSpecificAttributes: [
            "Juniper-Local-User-Name",
            "Juniper-Switching-Filter"
        ]
    },
    
    // Fortinet configuration data
    fortinet: {
        name: "Fortinet",
        platforms: {
            "fortigate": {
                name: "FortiGate",
                minVersion: "5.4",
                recommendedVersion: "7.0",
                supportsMAB: true,
                supports8021x: true,
                supportsCoA: true,
                supportsMDA: false,
                supportsCriticalVLAN: false,
                supportsGuestVLAN: true,
                supportsRadSec: false,
                notes: "FortiGate provides limited 802.1X support primarily for network access control."
            },
            "fortiswitch": {
                name: "FortiSwitch",
                minVersion: "3.4",
                recommendedVersion: "6.4",
                supportsMAB: true,
                supports8021x: true,
                supportsCoA: true,
                supportsMDA: true,
                supportsCriticalVLAN: true,
                supportsGuestVLAN: true,
                supportsRadSec: false,
                notes: "FortiSwitch provides comprehensive 802.1X support for enterprise deployments."
            },
            "fortiwlc": {
                name: "FortiWLC",
                minVersion: "8.3",
                recommendedVersion: "8.5",
                supportsMAB: true,
                supports8021x: true,
                supportsCoA: true,
                supportsMDA: false,
                supportsCriticalVLAN: false,
                supportsGuestVLAN: true,
                supportsRadSec: false,
                notes: "FortiWLC provides 802.1X support for wireless networks."
            }
        },
        supportsMultiAuth: true,
        defaultPorts: {
            auth: 1812,
            acct: 1813,
            coa: 3799
        },
        radiusConfigStyle: "system-based",
        vendorSpecificAttributes: [
            "Fortinet-Group-Name",
            "Fortinet-Client-IP-Address"
        ]
    },
    
    // Add more vendors...
    
    // Helper methods
    getVendorInfo: function(vendorId) {
        return this[vendorId] || null;
    },
    
    getPlatformInfo: function(vendorId, platformId) {
        const vendor = this.getVendorInfo(vendorId);
        if (vendor && vendor.platforms) {
            return vendor.platforms[platformId] || null;
        }
        return null;
    },
    
    getCompatibilityInfo: function(vendorId, platformId, feature) {
        const platform = this.getPlatformInfo(vendorId, platformId);
        if (platform) {
            switch (feature) {
                case 'mab':
                    return platform.supportsMAB;
                case '802.1x':
                    return platform.supports8021x;
                case 'coa':
                    return platform.supportsCoA;
                case 'mda':
                    return platform.supportsMDA;
                case 'critical-vlan':
                    return platform.supportsCriticalVLAN;
                case 'guest-vlan':
                    return platform.supportsGuestVLAN;
                case 'radsec':
                    return platform.supportsRadSec;
                default:
                    return false;
            }
        }
        return false;
    }
};
