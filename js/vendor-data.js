/**
 * Dot1Xer Supreme - Vendor Data
 * Version: 2.0.0
 * 
 * This file contains the vendor data for both wired and wireless platforms.
 */

const vendorData = {
    // Wired vendors
    wired: [
        {
            id: 'cisco',
            name: 'Cisco',
            logo: 'cisco-logo.png',
            description: 'Cisco IOS, IOS-XE, and NX-OS based switches',
            models: ['Catalyst 9000', 'Catalyst 3000', 'Nexus'],
            templates: ['ios', 'ios-xe', 'nx-os']
        },
        {
            id: 'aruba',
            name: 'Aruba',
            logo: 'aruba-logo.png',
            description: 'Aruba CX and AOS-Switch based switches',
            models: ['CX 6000', 'CX 8000', '2930F', '5400R'],
            templates: ['aos-cx', 'aos-switch']
        },
        {
            id: 'juniper',
            name: 'Juniper',
            logo: 'juniper-logo.png',
            description: 'Juniper EX and QFX series switches',
            models: ['EX2300', 'EX3400', 'EX4300', 'QFX5100'],
            templates: ['junos']
        },
        {
            id: 'hp',
            name: 'HP',
            logo: 'hp-logo.png',
            description: 'HP ProCurve and ProVision switches',
            models: ['2530', '2930', '5400', '3800'],
            templates: ['procurve', 'provision']
        },
        {
            id: 'fortinet',
            name: 'Fortinet',
            logo: 'fortinet-logo.png',
            description: 'FortiSwitch series managed switches',
            models: ['100E', '200E', '400E', '500E'],
            templates: ['fortiswitch']
        },
        {
            id: 'extreme',
            name: 'Extreme Networks',
            logo: 'extreme-logo.png',
            description: 'Extreme Networks switches',
            models: ['X440-G2', 'X460-G2', 'X670-G2'],
            templates: ['exos', 'voss']
        },
        {
            id: 'dell',
            name: 'Dell',
            logo: 'dell-logo.png',
            description: 'Dell PowerSwitch series',
            models: ['N1100', 'N2000', 'N3000', 'S4100'],
            templates: ['os10', 'os9']
        },
        {
            id: 'huawei',
            name: 'Huawei',
            logo: 'huawei-logo.png',
            description: 'Huawei CloudEngine and S series switches',
            models: ['S5700', 'S6700', 'CE6800', 'CE12800'],
            templates: ['vrp']
        }
    ],
    
    // Wireless vendors
    wireless: [
        {
            id: 'cisco-wlc',
            name: 'Cisco WLC',
            logo: 'cisco-logo.png',
            description: 'Cisco Wireless LAN Controllers',
            models: ['9800 Series', '5520', '3504'],
            templates: ['aireos', 'ios-xe']
        },
        {
            id: 'aruba-mobility',
            name: 'Aruba Mobility',
            logo: 'aruba-logo.png',
            description: 'Aruba Mobility Controllers',
            models: ['7200 Series', '7000 Series', 'MC-VA'],
            templates: ['arubaos']
        },
        {
            id: 'meraki',
            name: 'Cisco Meraki',
            logo: 'meraki-logo.png',
            description: 'Cisco Meraki cloud-managed wireless',
            models: ['MR Series', 'Cloud Dashboard'],
            templates: ['meraki-dashboard']
        },
        {
            id: 'fortinet-wireless',
            name: 'FortiWLC',
            logo: 'fortinet-logo.png',
            description: 'Fortinet wireless controllers',
            models: ['FortiWLC Series', 'FortiGate WiFi'],
            templates: ['fortiwlc', 'fortigate']
        },
        {
            id: 'ruckus-wireless',
            name: 'Ruckus Wireless',
            logo: 'ruckus-logo.png',
            description: 'Ruckus wireless controllers and access points',
            models: ['SmartZone', 'ZoneDirector', 'Virtual SmartZone'],
            templates: ['smartzone', 'zonedirector']
        },
        {
            id: 'extreme-wireless',
            name: 'Extreme Wireless',
            logo: 'extreme-logo.png',
            description: 'Extreme Networks wireless solutions',
            models: ['AP3xx', 'AP4xx', 'Wing Controllers'],
            templates: ['identifi', 'wing']
        },
        {
            id: 'huawei-wireless',
            name: 'Huawei Wireless',
            logo: 'huawei-logo.png',
            description: 'Huawei wireless AC and cloud solutions',
            models: ['AC6805', 'AC6808', 'CloudEngine'],
            templates: ['ac', 'cloudcampus']
        },
        {
            id: 'ubiquiti',
            name: 'Ubiquiti',
            logo: 'ubiquiti-logo.png',
            description: 'Ubiquiti UniFi wireless solutions',
            models: ['UniFi AP', 'UniFi AP Pro', 'UniFi AP HD'],
            templates: ['unifi']
        }
    ]
};
