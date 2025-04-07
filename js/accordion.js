/**
 * Dot1Xer Supreme - Accordion Script
 * Handles accordion functionality for collapsible sections
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeAccordions();
});

/**
 * Initialize accordion functionality
 */
function initializeAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle active class on the header
            this.classList.toggle('active');
            
            // Get the content element
            const content = this.nextElementSibling;
            
            // Toggle the content visibility
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
}

/**
 * Open a specific accordion by its index
 * @param {number} index - The index of the accordion to open
 */
function openAccordion(index) {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    if (index >= 0 && index < accordionHeaders.length) {
        const header = accordionHeaders[index];
        
        // If not already active, trigger a click
        if (!header.classList.contains('active')) {
            header.click();
        }
    }
}

/**
 * Close a specific accordion by its index
 * @param {number} index - The index of the accordion to close
 */
function closeAccordion(index) {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    if (index >= 0 && index < accordionHeaders.length) {
        const header = accordionHeaders[index];
        
        // If active, trigger a click to close
        if (header.classList.contains('active')) {
            header.click();
        }
    }
}

/**
 * Close all accordions
 */
function closeAllAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header.active');
    
    accordionHeaders.forEach(header => {
        header.click();
    });
}

/**
 * Open all accordions
 */
function openAllAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header:not(.active)');
    
    accordionHeaders.forEach(header => {
        header.click();
    });
}
