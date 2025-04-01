// Dot1Xer Supreme - Core Functionality

let currentStep = 1;

document.addEventListener('DOMContentLoaded', function() {
    initTabs();
    initWizard();
    initVendorOptions();
    initAIChat();
    const firstTabBtn = document.querySelector('.tab-btn');
    if (firstTabBtn) firstTabBtn.click();
});

function initTabs() {
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
                tab.style.display = 'none';
            });
            const selectedTab = document.getElementById(tabName);
            if (selectedTab) {
                selectedTab.classList.add('active');
                selectedTab.style.display = 'block';
            }
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            if (tabName === 'configurator') goToStep(1);
        });
    });
}

function initWizard() {
    document.querySelectorAll('.step').forEach(step => {
        step.addEventListener('click', function() {
            goToStep(parseInt(this.getAttribute('data-step')));
        });
    });
}

function goToStep(step) {
    document.querySelectorAll('.step-content').forEach(content => content.style.display = 'none');
    document.querySelectorAll('.step').forEach(stepEl => stepEl.classList.remove('active'));
    const stepContent = document.getElementById(`step-${step}`);
    if (stepContent) stepContent.style.display = 'block';
    const stepIndicator = document.querySelector(`.step[data-step="${step}"]`);
    if (stepIndicator) stepIndicator.classList.add('active');
    currentStep = step;
}

function initVendorOptions() {
    const vendorSelect = document.getElementById('vendor-select');
    if (vendorSelect) {
        vendorSelect.addEventListener('change', updatePlatformOptions);
        updatePlatformOptions();
    }
}

function updatePlatformOptions() {
    const vendorSelect = document.getElementById('vendor-select');
    const platformSelect = document.getElementById('platform-select');
    if (!vendorSelect || !platformSelect) return;
    platformSelect.innerHTML = '';
    const vendor = vendorSelect.value;
    const platforms = {
        'cisco': ['ios', 'ios-xe', 'nx-os', 'wlc'],
        'aruba': ['aos-cx', 'aos-switch'],
        'juniper': ['ex', 'qfx', 'srx'],
        'fortinet': ['fortiswitch', 'fortigate'],
        'arista': ['eos', 'cloudvision'],
        'extreme': ['exos', 'voss', 'xiq'],
        'huawei': ['vrp', 'agile-controller'],
        'alcatel': ['omniswitch', 'omnivista'],
        'ubiquiti': ['unifi', 'edgeswitch'],
        'hp': ['procurve', 'comware', 'aruba-central'],
        'dell': ['powerswitch'],
        'netgear': ['managed'],
        'ruckus': ['smartzone'],
        'brocade': ['icx'],
        'paloalto': ['panos', 'panorama'],
        'checkpoint': ['gaia', 'r80'],
        'sonicwall': ['sonicos'],
        'portnox': ['cloud']
    };
    (platforms[vendor] || ['default']).forEach(platform => {
        const option = document.createElement('option');
        option.value = platform;
        option.textContent = platform.toUpperCase();
        platformSelect.appendChild(option);
    });
}

function initAIChat() {
    const sendButton = document.getElementById('send-ai-query');
    if (sendButton) {
        sendButton.addEventListener('click', sendAIQuery);
    }
}

function sendAIQuery() {
    const queryInput = document.getElementById('ai-query');
    const query = queryInput.value.trim();
    if (!query) return;
    addChatMessage(query, 'user');
    queryInput.value = '';
    addChatMessage('Analyzing...', 'ai', true);
    setTimeout(() => {
        document.querySelector('.ai-message.loading')?.remove();
        const response = generateAIResponse(query);
        addChatMessage(response, 'ai');
    }, 1500);
}

function addChatMessage(message, type, isLoading = false) {
    const chatHistory = document.getElementById('chat-history');
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message${isLoading ? ' loading' : ''}`;
    const avatarImg = document.createElement('img');
    avatarImg.src = `assets/images/${type}-avatar.png`;
    avatarImg.alt = type === 'user' ? 'You' : 'AI';
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = message.replace(/\n/g, '<br>');
    messageDiv.appendChild(avatarImg);
    messageDiv.appendChild(contentDiv);
    chatHistory.appendChild(messageDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function generateAIResponse(query) {
    query = query.toLowerCase();
    if (query.includes('radius')) {
        return "Radius settings are configured with primary IP and ports (1812 for auth, 1813 for accounting). Ensure your server supports these standards.";
    } else if (query.includes('report')) {
        return "Generating an AI-assisted report: Analyzing network scope, vendor configs, and Radius settings. Report ready in POC tab.";
    } else if (query.includes('poc')) {
        return "POC generated: Includes vendor templates, Radius config, and deployment steps. Check the POC Generator section.";
    } else {
        return "I can assist with Radius settings, vendor configs, or generate reports/POCs. What do you need help with?";
    }
}
