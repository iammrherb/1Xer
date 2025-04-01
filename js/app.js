let chatHistory = [];

// Tab Navigation
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById(btn.dataset.tab).classList.add('active');
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Step Navigation
function showStep(step) {
  document.querySelectorAll('.step-content').forEach(content => content.classList.remove('active'));
  document.getElementById(`step-${step}`).classList.add('active');
  document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.step')[step - 1].classList.add('active');
}

// AI Query Function
function queryAI(type, data, onSuccess, onError) {
  document.getElementById('loading').style.display = 'block';
  fetch('/api/proxy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, data })
  })
  .then(response => response.json())
  .then(result => {
    document.getElementById('loading').style.display = 'none';
    onSuccess(result);
  })
  .catch(error => {
    document.getElementById('loading').style.display = 'none';
    onError(error);
  });
}

// Configuration Functions
function generateConfiguration() {
  const config = getCurrentConfig();
  document.getElementById('config-output').textContent = JSON.stringify(config, null, 2);
}

function dotxerAnalysis() {
  const config = getCurrentConfig();
  queryAI('analysis', { config },
    result => document.getElementById('analysis-text').textContent = result,
    error => alert('Analysis failed: ' + error.message)
  );
}

function downloadConfiguration() {
  const config = document.getElementById('config-output').textContent;
  const blob = new Blob([config], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'config.txt';
  a.click();
  URL.revokeObjectURL(url);
}

// AI Chat
function sendAIQuery() {
  const message = document.getElementById('ai-query').value;
  if (!message) return;
  chatHistory.push({ role: 'user', content: message });
  displayChatMessage('user', message);
  document.getElementById('ai-query').value = '';
  queryAI('chat', { messages: chatHistory },
    response => {
      chatHistory.push({ role: 'assistant', content: response });
      displayChatMessage('assistant', response);
    },
    error => alert('Chat failed: ' + error.message)
  );
}

function displayChatMessage(role, content) {
  const history = document.getElementById('chat-history');
  const div = document.createElement('div');
  div.textContent = `${role}: ${content}`;
  history.appendChild(div);
  history.scrollTop = history.scrollHeight;
}

// Environmental Analysis
function analyzeEnvironment() {
  const data = {
    locations: document.getElementById('locations').value,
    switches: document.getElementById('switches').value
  };
  queryAI('environmental', data,
    result => document.getElementById('environmental-analysis').textContent = result,
    error => alert('Environmental analysis failed: ' + error.message)
  );
}

// POC Template Generation
function generatePOCTemplate() {
  const data = {
    projectName: document.getElementById('project-name').value,
    goals: document.getElementById('goals').value
  };
  queryAI('poc', data,
    result => {
      document.getElementById('template-text').textContent = result;
      document.getElementById('template-preview').style.display = 'block';
    },
    error => alert('POC generation failed: ' + error.message)
  );
}

function downloadPOCTemplate() {
  const template = document.getElementById('template-text').textContent;
  const blob = new Blob([template], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'poc-template.txt';
  a.click();
  URL.revokeObjectURL(url);
}

// Helper Function
function getCurrentConfig() {
  return {
    vendor: document.getElementById('vendor-select').value,
    authMethod: document.getElementById('auth-method').value
  };
}

// Initialize
showStep(1);
