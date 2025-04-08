/**
 * Dot1Xer Supreme - AI Integration
 * Provides AI-assisted configuration analysis and generation
 * Version: 3.5.0
 */

// Initialize AI functionality
document.addEventListener('DOMContentLoaded', function() {
    setupAIFunctionality();
});

/**
 * Set up AI functionality and event listeners
 */
function setupAIFunctionality() {
    // AI analysis button is handled in main.js
    
    // AI send button is handled in main.js
    
    // AI mode select
    const aiModeSelect = document.getElementById('ai-mode');
    if (aiModeSelect) {
        aiModeSelect.addEventListener('change', function() {
            updateAIPromptPlaceholder(this.value);
        });
    }
}

/**
 * Update the AI prompt placeholder based on selected mode
 */
function updateAIPromptPlaceholder(mode) {
    const aiInput = document.getElementById('ai-input');
    if (!aiInput) return;
    
    switch (mode) {
        case 'analyze':
            aiInput.placeholder = 'Paste your existing 802.1X configuration here for analysis...';
            break;
        case 'improve':
            aiInput.placeholder = 'Paste your existing configuration here to get improvement suggestions...';
            break;
        case 'generate':
            aiInput.placeholder = 'Describe the 802.1X configuration you need. Include details like vendor, authentication method, VLANs, etc.';
            break;
        case 'explain':
            aiInput.placeholder = 'Paste a configuration snippet or command you would like explained...';
            break;
        case 'compare':
            aiInput.placeholder = 'Paste two configurations separated by a line containing "---" to compare them...';
            break;
        default:
            aiInput.placeholder = 'Paste your configuration or describe what you need help with...';
    }
}

/**
 * Process AI requests
 * In a production environment, this would connect to an AI service
 */
function processAIRequest(input, mode, options) {
    // In a real implementation, this would connect to an AI service
    // like OpenAI, Claude, or a custom model
    
    switch (mode) {
        case 'analyze':
            return simulateAIAnalysis(input);
        case 'improve':
            return simulateAIImprovement(input);
        case 'generate':
            return simulateAIGeneration(input);
        case 'explain':
            return simulateAIExplanation(input);
        case 'compare':
            return 'To compare configurations, please upload both configurations or paste them separated by a line containing "---"';
        default:
            return 'I\'ve analyzed your input but cannot determine the specific request. Please select a mode and try again.';
    }
}

/**
 * Add AI message to the chat
 */
function addAIMessage(message, isUser = false) {
    const aiChatMessages = document.getElementById('ai-chat-messages');
    if (!aiChatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'ai-message user' : 'ai-message assistant';
    
    // Process message content (handle code blocks, etc.)
    if (!isUser && message.includes('```')) {
        // Convert markdown-style code blocks to HTML
        const parts = message.split('```');
        let formattedMessage = parts[0];
        
        for (let i = 1; i < parts.length; i++) {
            if (i % 2 === 1) {
                // This is a code block
                formattedMessage += `<pre><code>${parts[i]}</code></pre>`;
            } else {
                formattedMessage += parts[i];
            }
        }
        
        messageDiv.innerHTML = formattedMessage.replace(/\n/g, '<br>');
    } else {
        messageDiv.textContent = message;
    }
    
    aiChatMessages.appendChild(messageDiv);
    
    // Scroll to bottom of chat
    aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
}
