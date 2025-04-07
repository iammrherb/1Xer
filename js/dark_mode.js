/**
 * Dot1Xer Supreme - Dark Mode Support
 * Provides dark mode functionality
 * Version: 3.0.0
 */

// Initialize dark mode
function initializeDarkMode() {
    // Create dark mode toggle button if it doesn't exist
    if (!document.querySelector('.dark-mode-toggle')) {
        const darkModeToggle = document.createElement('div');
        darkModeToggle.className = 'dark-mode-toggle';
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        darkModeToggle.title = 'Toggle Dark Mode';
        document.body.appendChild(darkModeToggle);
        
        // Add click event listener
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
    
    // Check saved preference
    const isDarkMode = localStorage.getItem('dot1xer-dark-mode') === 'true';
    
    // Apply dark mode if saved preference is true
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.querySelector('.dark-mode-toggle').innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Toggle dark mode
function toggleDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    // Toggle dark mode class on body
    document.body.classList.toggle('dark-mode');
    
    // Update toggle icon
    const isDarkMode = document.body.classList.contains('dark-mode');
    darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    
    // Save preference
    localStorage.setItem('dot1xer-dark-mode', isDarkMode);
}

// Export initialization function
window.initializeDarkMode = initializeDarkMode;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeDarkMode);
