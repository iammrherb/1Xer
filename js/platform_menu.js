/**
 * Platform Menu for Dot1Xer Supreme
 * Provides a dynamic menu for selecting vendor platforms
 */

// Define platform menu structure
const platformMenu = {
    wired: {
        name: "Wired",
        description: "Wired network devices",
        platforms: {
            "cisco-ios": {
                name: "Cisco IOS/IOS-XE",
                description: "Cisco IOS and IOS-XE platforms",
                templates: ["ibns2_ios_xe", "tacacs", "radsec", "device_tracking"]
            },
            "cisco-nx": {
                name: "Cisco NX-OS",
                description: "Cisco Nexus platforms",
                templates: ["tacacs", "dot1x_nx"]
            },
            "aruba-aoscx": {
                name: "Aruba AOS-CX",
                description: "Aruba AOS-CX switches",
                templates: ["aos_cx", "tacacs_aoscx"]
            },
            "juniper-ex": {
                name: "Juniper EX",
                description: "Juniper EX Series switches",
                templates: ["juniper_ex", "juniper_tacacs"]
            },
            "fortinet-switch": {
                name: "Fortinet FortiSwitch",
                description: "Fortinet FortiSwitch platforms",
                templates: ["fortiswitch", "forti_tacacs"]
            },
            "extreme-exos": {
                name: "Extreme EXOS",
                description: "Extreme Networks EXOS",
                templates: ["extreme_exos", "extreme_tacacs"]
            }
        }
    },
    wireless: {
        name: "Wireless",
        description: "Wireless network devices",
        platforms: {
            "cisco-wlc9800": {
                name: "Cisco WLC 9800",
                description: "Cisco 9800 Series Wireless LAN Controllers",
                templates: ["wlc_9800", "ise_wireless_dot1x"]
            },
            "cisco-wlc": {
                name: "Cisco AireOS WLC",
                description: "Cisco AireOS Wireless LAN Controllers",
                templates: ["aireos_wlc", "aireos_dot1x"]
            },
            "aruba-controller": {
                name: "Aruba Controller",
                description: "Aruba Mobility Controllers",
                templates: ["aruba_wireless", "aruba_dot1x"]
            },
            "fortinet-wireless": {
                name: "Fortinet FortiWLC",
                description: "Fortinet Wireless Controllers",
                templates: ["fortinet_wireless", "fortinet_dot1x"]
            },
            "ruckus-wireless": {
                name: "Ruckus Wireless",
                description: "Ruckus Wireless Controllers",
                templates: ["ruckus_wireless", "ruckus_dot1x"]
            },
            "meraki-wireless": {
                name: "Cisco Meraki",
                description: "Cisco Meraki wireless",
                templates: ["meraki_wireless", "meraki_dot1x"]
            },
            "ubiquiti-wireless": {
                name: "Ubiquiti UniFi",
                description: "Ubiquiti UniFi controllers",
                templates: ["unifi_wireless", "unifi_dot1x"]
            }
        }
    }
};

// Initialize platform menu
function initPlatformMenu() {
    const menuContainer = document.getElementById('platform-menu');
    if (!menuContainer) return;
    
    // Clear existing menu
    menuContainer.innerHTML = '';
    
    // Create category tabs
    const tabContainer = document.createElement('div');
    tabContainer.className = 'tabs';
    
    const tabList = document.createElement('ul');
    tabList.className = 'platform-tabs';
    
    // Create tabs for each category
    Object.keys(platformMenu).forEach((category, index) => {
        const tab = document.createElement('li');
        tab.className = index === 0 ? 'active' : '';
        tab.setAttribute('data-category', category);
        tab.textContent = platformMenu[category].name;
        
        tab.addEventListener('click', function() {
            // Deactivate all tabs
            const allTabs = tabList.querySelectorAll('li');
            allTabs.forEach(t => t.className = '');
            
            // Activate this tab
            this.className = 'active';
            
            // Show corresponding content
            const allContent = menuContainer.querySelectorAll('.platform-content');
            allContent.forEach(c => c.style.display = 'none');
            
            const contentId = `platform-${category}`;
            const content = document.getElementById(contentId);
            if (content) content.style.display = 'block';
        });
        
        tabList.appendChild(tab);
    });
    
    tabContainer.appendChild(tabList);
    menuContainer.appendChild(tabContainer);
    
    // Create content sections for each category
    Object.keys(platformMenu).forEach((category) => {
        const contentContainer = document.createElement('div');
        contentContainer.className = 'platform-content';
        contentContainer.id = `platform-${category}`;
        contentContainer.style.display = category === Object.keys(platformMenu)[0] ? 'block' : 'none';
        
        // Category description
        const description = document.createElement('p');
        description.className = 'platform-description';
        description.textContent = platformMenu[category].description;
        contentContainer.appendChild(description);
        
        // Platform grid
        const platformGrid = document.createElement('div');
        platformGrid.className = 'platform-grid';
        
        // Add platform cards
        Object.keys(platformMenu[category].platforms).forEach((platform) => {
            const card = createPlatformCard(category, platform);
            platformGrid.appendChild(card);
        });
        
        contentContainer.appendChild(platformGrid);
        menuContainer.appendChild(contentContainer);
    });
}

// Create platform card
function createPlatformCard(category, platform) {
    const platformInfo = platformMenu[category].platforms[platform];
    
    const card = document.createElement('div');
    card.className = 'platform-card';
    card.setAttribute('data-platform', platform);
    
    // Card header
    const header = document.createElement('div');
    header.className = 'platform-card-header';
    
    const title = document.createElement('h3');
    title.textContent = platformInfo.name;
    header.appendChild(title);
    
    card.appendChild(header);
    
    // Card body
    const body = document.createElement('div');
    body.className = 'platform-card-body';
    
    const description = document.createElement('p');
    description.textContent = platformInfo.description;
    body.appendChild(description);
    
    const templateCount = document.createElement('p');
    templateCount.className = 'template-count';
    templateCount.textContent = `${platformInfo.templates.length} templates available`;
    body.appendChild(templateCount);
    
    card.appendChild(body);
    
    // Card footer with select button
    const footer = document.createElement('div');
    footer.className = 'platform-card-footer';
    
    const selectButton = document.createElement('button');
    selectButton.textContent = 'Select Platform';
    selectButton.addEventListener('click', function() {
        selectPlatform(category, platform);
    });
    
    footer.appendChild(selectButton);
    card.appendChild(footer);
    
    return card;
}

// Template loading/selection functions (simplified for brevity)
function selectPlatform(category, platform) {
    console.log(`Selected platform: ${category}/${platform}`);
    const platformInfo = platformMenu[category].platforms[platform];
    alert(`You selected ${platformInfo.name}. Available templates: ${platformInfo.templates.join(', ')}`);
    
    // In a real implementation, this would load templates and show them to the user
    // For this simplified version, we just show a message
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initPlatformMenu();
});

// Export functions for use in other modules
if (typeof module !== 'undefined') {
    module.exports = {
        platformMenu,
        initPlatformMenu,
        selectPlatform
    };
}
