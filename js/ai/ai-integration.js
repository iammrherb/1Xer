/**
 * Dot1Xer Supreme - AI Integration Module
 * Functions for AI-assisted configuration generation and review
 */

// Initialize AI integration when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAIIntegration();
});

/**
 * Initialize AI integration features
 */
function initializeAIIntegration() {
    // Initialize AI review button in configuration tab
    document.getElementById('ai-review').addEventListener('click', function() {
        reviewConfigurationWithAI();
    });
    
    // Initialize API key handling
    document.getElementById('save-api-key').addEventListener('click', function() {
        saveAPIKey();
    });
    
    // Initialize copy AI output button
    document.getElementById('copy-ai-output').addEventListener('click', function() {
        copyAIOutputToClipboard();
    });
    
    // Initialize save AI output button
    document.getElementById('save-ai-output').addEventListener('click', function() {
        saveAIOutput();
    });
    
    // Initialize load to editor button
    document.getElementById('load-to-editor').addEventListener('click', function() {
        loadAIOutputToEditor();
    });
}

/**
 * Review the current configuration using AI
 */
function reviewConfigurationWithAI() {
    // Get the current configuration
    const config = document.getElementById('config-result').textContent;
    
    // Check if there's a configuration to review
    if (!config || config === '# Configuration will appear here after generation.') {
        alert('Please generate a configuration first.');
        return;
    }
    
    // Switch to the AI Assist tab
    document.querySelector('nav a[data-tab="ai-assist"]').click();
    
    // Set the AI task to review
    const reviewTaskOption = document.querySelector('.task-option[data-task="review"]');
    if (reviewTaskOption) {
        // Remove active class from all task options
        document.querySelectorAll('.task-option').forEach(option => {
            option.classList.remove('active');
        });
        
        // Add active class to review task option
        reviewTaskOption.classList.add('active');
        
        // Update button text
        document.getElementById('execute-ai-task').textContent = 'Review';
    }
    
    // Fill the prompt with the configuration
    document.getElementById('ai-prompt').value = config;
    
    // Focus on the execute button
    document.getElementById('execute-ai-task').focus();
}

/**
 * Save the API key for the selected AI provider
 */
function saveAPIKey() {
    const apiKey = document.getElementById('api-key').value.trim();
    const provider = document.querySelector('.provider-option.active').getAttribute('data-provider');
    
    if (!apiKey) {
        alert('Please enter an API key.');
        return;
    }
    
    // In a real application, this would securely store the API key
    // For this example, we'll just simulate storage and show a message
    
    alert(`API key for ${provider} saved successfully!`);
    
    // Optionally, store in session storage for demo purposes
    // This is not secure and should not be used in production
    sessionStorage.setItem(`${provider}-api-key`, apiKey);
    
    // Clear the input field for security
    document.getElementById('api-key').value = '';
}

/**
 * Copy AI output to clipboard
 */
function copyAIOutputToClipboard() {
    const aiResult = document.getElementById('ai-result');
    
    // Check if there's content to copy
    if (!aiResult.textContent || aiResult.textContent.trim() === 'AI output will appear here after you submit your request.') {
        alert('No AI output to copy.');
        return;
    }
    
    // Create a temporary textarea to copy from
    const textarea = document.createElement('textarea');
    
    // If the AI result contains HTML, we need to preserve it
    // This is a simple approach - for complex HTML a more robust solution would be needed
    textarea.value = aiResult.innerHTML.includes('<pre>') 
        ? aiResult.querySelector('pre').textContent 
        : aiResult.textContent;
    
    document.body.appendChild(textarea);
    
    // Select and copy
    textarea.select();
    document.execCommand('copy');
    
    // Clean up
    document.body.removeChild(textarea);
    
    // Show success message
    alert('AI output copied to clipboard!');
}

/**
 * Save AI output to a file
 */
function saveAIOutput() {
    const aiResult = document.getElementById('ai-result');
    
    // Check if there's content to save
    if (!aiResult.textContent || aiResult.textContent.trim() === 'AI output will appear here after you submit your request.') {
        alert('No AI output to save.');
        return;
    }
    
    // Determine if the output is configuration or analysis
    const isConfig = aiResult.innerHTML.includes('<pre>');
    
    // Get the content to save
    let content = isConfig 
        ? aiResult.querySelector('pre').textContent 
        : aiResult.textContent;
    
    // Create a blob with the content
    const blob = new Blob([content], { type: 'text/plain' });
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    // Set the filename based on content type
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = isConfig 
        ? `802.1x-config-${timestamp}.txt` 
        : `ai-analysis-${timestamp}.txt`;
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.display = 'none';
    
    // Append to document, click and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Load AI output to the configuration editor
 */
function loadAIOutputToEditor() {
    const aiResult = document.getElementById('ai-result');
    
    // Check if there's content to load
    if (!aiResult.textContent || aiResult.textContent.trim() === 'AI output will appear here after you submit your request.') {
        alert('No AI output to load.');
        return;
    }
    
    // Get the configuration from AI output
    let config;
    
    if (aiResult.innerHTML.includes('<pre>')) {
        // If there's a pre element, use its content
        config = aiResult.querySelector('pre').textContent;
    } else if (aiResult.textContent.includes('#') || aiResult.textContent.includes('!')) {
        // If the text contains common config markers, use the full content
        config = aiResult.textContent;
    } else {
        // Otherwise, alert that no configuration was found
        alert('No valid configuration found in AI output.');
        return;
    }
    
    // Switch to the Configuration tab
    document.querySelector('nav a[data-tab="config"]').click();
    
    // Load the configuration to the editor
    document.getElementById('config-result').textContent = config;
    
    // Alert success
    alert('Configuration loaded to editor!');
}

/**
 * LLM Provider Interfaces
 * These functions would handle communication with different AI providers
 */

/**
 * Call OpenAI API for AI processing
 * @param {string} prompt - The prompt to send to the API
 * @param {string} task - The AI task to perform
 * @param {string} detailLevel - The desired detail level
 * @param {string} securityFocus - The security focus preference
 * @returns {Promise<string>} - The API response
 */
async function callOpenAIAPI(prompt, task, detailLevel, securityFocus) {
    // This would be the actual API call to OpenAI
    // For this example, we'll return a promise that resolves with simulated data
    
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate different responses based on task
            switch (task) {
                case 'generate':
                    resolve(generateAIResponse(prompt, detailLevel, securityFocus, true));
                    break;
                case 'review':
                    resolve(reviewAIResponse(prompt, detailLevel, securityFocus));
                    break;
                case 'optimize':
                    resolve(optimizeAIResponse(prompt, detailLevel, securityFocus, true));
                    break;
                case 'explain':
                    resolve(explainAIResponse(prompt, detailLevel));
                    break;
                case 'troubleshoot':
                    resolve(troubleshootAIResponse(prompt, detailLevel));
                    break;
                default:
                    resolve('<p>Unknown AI task selected.</p>');
            }
        }, 2000);
    });
}

/**
 * Call Anthropic API for AI processing
 * @param {string} prompt - The prompt to send to the API
 * @param {string} task - The AI task to perform
 * @param {string} detailLevel - The desired detail level
 * @param {string} securityFocus - The security focus preference
 * @returns {Promise<string>} - The API response
 */
async function callAnthropicAPI(prompt, task, detailLevel, securityFocus) {
    // This would be the actual API call to Anthropic
    // For this example, we'll return a promise that resolves with simulated data
    
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate different responses based on task
            switch (task) {
                case 'generate':
                    resolve(generateAIResponse(prompt, detailLevel, securityFocus, true));
                    break;
                case 'review':
                    resolve(reviewAIResponse(prompt, detailLevel, securityFocus));
                    break;
                case 'optimize':
                    resolve(optimizeAIResponse(prompt, detailLevel, securityFocus, true));
                    break;
                case 'explain':
                    resolve(explainAIResponse(prompt, detailLevel));
                    break;
                case 'troubleshoot':
                    resolve(troubleshootAIResponse(prompt, detailLevel));
                    break;
                default:
                    resolve('<p>Unknown AI task selected.</p>');
            }
        }, 2000);
    });
}

/**
 * Call Hugging Face API for AI processing
 * @param {string} prompt - The prompt to send to the API
 * @param {string} task - The AI task to perform
 * @param {string} detailLevel - The desired detail level
 * @param {string} securityFocus - The security focus preference
 * @returns {Promise<string>} - The API response
 */
async function callHuggingFaceAPI(prompt, task, detailLevel, securityFocus) {
    // This would be the actual API call to Hugging Face
    // For this example, we'll return a promise that resolves with simulated data
    
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate different responses based on task
            switch (task) {
                case 'generate':
                    resolve(generateAIResponse(prompt, detailLevel, securityFocus, true));
                    break;
                case 'review':
                    resolve(reviewAIResponse(prompt, detailLevel, securityFocus));
                    break;
                case 'optimize':
                    resolve(optimizeAIResponse(prompt, detailLevel, securityFocus, true));
                    break;
                case 'explain':
                    resolve(explainAIResponse(prompt, detailLevel));
                    break;
                case 'troubleshoot':
                    resolve(troubleshootAIResponse(prompt, detailLevel));
                    break;
                default:
                    resolve('<p>Unknown AI task selected.</p>');
            }
        }, 2000);
    });
}

/**
 * Use the built-in AI for processing
 * @param {string} prompt - The prompt to send to the API
 * @param {string} task - The AI task to perform
 * @param {string} detailLevel - The desired detail level
 * @param {string} securityFocus - The security focus preference
 * @returns {Promise<string>} - The API response
 */
async function useBuiltInAI(prompt, task, detailLevel, securityFocus) {
    // This would use a simplified local model or pre-defined responses
    // For this example, we'll return a promise that resolves with simulated data
    
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate different responses based on task
            switch (task) {
                case 'generate':
                    resolve(generateAIResponse(prompt, detailLevel, securityFocus, true));
                    break;
                case 'review':
                    resolve(reviewAIResponse(prompt, detailLevel, securityFocus));
                    break;
                case 'optimize':
                    resolve(optimizeAIResponse(prompt, detailLevel, securityFocus, true));
                    break;
                case 'explain':
                    resolve(explainAIResponse(prompt, detailLevel));
                    break;
                case 'troubleshoot':
                    resolve(troubleshootAIResponse(prompt, detailLevel));
                    break;
                default:
                    resolve('<p>Unknown AI task selected.</p>');
            }
        }, 1000); // Built-in AI is faster since it's local
    });
}
