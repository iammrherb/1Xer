// Dot1Xer Supreme - Tab Navigation

function initTabs() {
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            showTab(tabName, this);
        });
    });
    
    document.querySelectorAll('.discovery-tab').forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            showDiscoveryTab(tabName, this);
        });
    });
    
    document.querySelectorAll('.tab-control-btn').forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            showServerTab(tabName, this);
        });
    });
    
    document.querySelectorAll('.ref-tab').forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            showRefTab(tabName, this);
        });
    });
    
    document.querySelectorAll('.portnox-nav-tab').forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            showPortnoxTab(tabName, this);
        });
    });
}

function showTab(tabName, button) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.style.display = 'block';
    }
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (button) button.classList.add('active');
    if (tabName === 'configurator') goToStep(1);
}

function goToStep(step) {
    document.querySelectorAll('.step-content').forEach(content => content.style.display = 'none');
    document.querySelectorAll('.step').forEach(stepEl => stepEl.classList.remove('active'));
    document.getElementById(`step-${step}`).style.display = 'block';
    document.querySelector(`.step[data-step="${step}"]`).classList.add('active');
    currentStep = step;
}

function showDiscoveryTab(tabName, button) {
    document.querySelectorAll('.discovery-section').forEach(section => {
        section.style.display = 'none';
    });
    const selectedSection = document.getElementById(`disc-${tabName}`);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
    document.querySelectorAll('.discovery-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    if (button) button.classList.add('active');
}

function showServerTab(tabId, button) {
    document.querySelectorAll('.server-tab').forEach(tab => {
        tab.style.display = 'none';
    });
    document.querySelectorAll('.tab-control-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(tabId).style.display = 'block';
    button.classList.add('active');
}

function showRefTab(tabName, button) {
    document.querySelectorAll('.ref-section').forEach(section => {
        section.style.display = 'none';
    });
    document.querySelectorAll('.ref-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`ref-${tabName}`).style.display = 'block';
    button.classList.add('active');
}

function showPortnoxTab(tabName, button) {
    document.querySelectorAll('.portnox-content').forEach(section => {
        section.style.display = 'none';
    });
    document.querySelectorAll('.portnox-nav-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`portnox-${tabName}`).style.display = 'block';
    button.classList.add('active');
}
