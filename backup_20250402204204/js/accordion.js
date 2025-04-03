/**
 * Enhanced accordion functionality for Dot1Xer Supreme
 */
function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener("click", function() {
            // Get the accordion content and icon
            const content = this.nextElementSibling;
            const icon = this.querySelector(".accordion-icon");
            
            // Toggle the current accordion
            this.classList.toggle("active");
            
            // If the accordion is now active
            if (this.classList.contains("active")) {
                // Show content and change icon
                content.style.maxHeight = content.scrollHeight + "px";
                content.style.display = "block";
                if (icon) icon.textContent = "-"; // Unicode minus sign
            } else {
                // Hide content and change icon
                content.style.maxHeight = null;
                content.style.display = "none";
                if (icon) icon.textContent = "+";
            }
        });
    });
    
    // Initially open the first accordion section
    const firstAccordion = document.querySelector('.accordion-header');
    if (firstAccordion) {
        firstAccordion.click();
    }
}

// Initialize accordions on page load
document.addEventListener('DOMContentLoaded', function() {
    initAccordions();
});
