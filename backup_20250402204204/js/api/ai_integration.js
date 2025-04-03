/**
 * AI Integration for Dot1Xer Supreme
 * Provides AI-assisted configuration generation and troubleshooting
 */

// API configuration
const aiConfig = {
    providers: {
        openai: {
            apiUrl: "https://api.openai.com/v1/chat/completions",
            models: ["gpt-4", "gpt-3.5-turbo"],
            defaultModel: "gpt-3.5-turbo"
        },
        anthropic: {
            apiUrl: "https://api.anthropic.com/v1/messages",
            models: ["claude-3-opus-20240229", "claude-3-sonnet-20240229", "claude-3-haiku-20240307"],
            defaultModel: "claude-3-haiku-20240307"
        },
        google: {
            apiUrl: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
            models: ["gemini-pro"],
            defaultModel: "gemini-pro"
        }
    },
    defaultProvider: "anthropic"
};

// Store API keys securely
let apiKeys = {};

// Set API key for a provider
function setApiKey(provider, key) {
    if (aiConfig.providers[provider]) {
        apiKeys[provider] = key;
        // Store encrypted in localStorage
        try {
            const encryptedKey = btoa(key); // Simple encoding, not true encryption
            localStorage.setItem(`dot1xer_${provider}_key`, encryptedKey);
            console.log(`API key for ${provider} saved`);
            return true;
        } catch (error) {
            console.error(`Error saving API key: ${error}`);
            return false;
        }
    }
    return false;
}

// Get API key for a provider
function getApiKey(provider) {
    // Check memory first
    if (apiKeys[provider]) {
        return apiKeys[provider];
    }
    
    // Try localStorage
    try {
        const encryptedKey = localStorage.getItem(`dot1xer_${provider}_key`);
        if (encryptedKey) {
            const key = atob(encryptedKey); // Decode
            apiKeys[provider] = key;
            return key;
        }
    } catch (error) {
        console.error(`Error retrieving API key: ${error}`);
    }
    
    return null;
}

// Generate configuration using AI
async function generateConfigurationWithAI(template, variables, provider = aiConfig.defaultProvider, model = null) {
    const apiKey = getApiKey(provider);
    if (!apiKey) {
        throw new Error(`API key not set for ${provider}`);
    }
    
    if (!model) {
        model = aiConfig.providers[provider].defaultModel;
    }
    
    // Create prompt
    const prompt = `I need to configure 802.1X authentication on a network device. I have a template with the following variables:
${JSON.stringify(variables, null, 2)}

Please provide recommended values for these variables for a typical enterprise network with 802.1X authentication. 
Consider best practices for security and explain your choices for each variable.`;

    // Make API request based on provider
    switch (provider) {
        case "openai":
            return callOpenAI(prompt, model, apiKey);
        case "anthropic":
            return callAnthropic(prompt, model, apiKey);
        case "google":
            return callGoogleAI(prompt, model, apiKey);
        default:
            throw new Error(`Unknown AI provider: ${provider}`);
    }
}

// OpenAI API call
async function callOpenAI(prompt, model, apiKey) {
    const response = await fetch(aiConfig.providers.openai.apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: model,
            messages: [{ role: "user", content: prompt }],
            temperature: 0.2
        })
    });
    
    if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
}

// Anthropic API call
async function callAnthropic(prompt, model, apiKey) {
    const response = await fetch(aiConfig.providers.anthropic.apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
            model: model,
            messages: [{ role: "user", content: prompt }],
            max_tokens: 2000,
            temperature: 0.2
        })
    });
    
    if (!response.ok) {
        throw new Error(`Anthropic API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.content[0].text;
}

// Google AI API call
async function callGoogleAI(prompt, model, apiKey) {
    const url = `${aiConfig.providers.google.apiUrl}?key=${apiKey}`;
    
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.2
            }
        })
    });
    
    if (!response.ok) {
        throw new Error(`Google AI API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

// Export functions for use in other modules
if (typeof module !== 'undefined') {
    module.exports = {
        aiConfig,
        setApiKey,
        getApiKey,
        generateConfigurationWithAI
    };
}
