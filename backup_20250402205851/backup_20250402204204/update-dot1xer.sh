#!/bin/bash

# Check for dependencies
for cmd in sed awk grep; do
    if ! command -v $cmd &> /dev/null; then
        echo "Error: $cmd is required but not installed. Please install it and try again."
        exit 1
    fi
done

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Update index.html with necessary script and CSS references
echo "Updating index.html..."
if grep -q "</body></html>" index.html; then
    # Update just before closing tags
    sed -i.bak '/<\/body><\/html>/d' index.html
    cat >> index.html << 'EOF'
    <!-- CSS Dependencies -->
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/accordion.css">
    <link rel="stylesheet" href="css/help_tips.css">
    
    <!-- JS Dependencies -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.7/handlebars.min.js"></script>
    <script src="js/accordion.js"></script>
    <script src="js/platform_menu.js"></script>
    <script src="js/help/help_tips.js"></script>
    <script src="js/api/ai_integration.js"></script>
    <script src="js/api/portnox_api.js"></script>
    
    <!-- Initialize the application -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            console.log("Dot1Xer Supreme loaded successfully");
            // Initialize accordions
            if (typeof initAccordions === 'function') {
                initAccordions();
            }
            // Initialize help tips
            if (typeof initHelpTips === 'function') {
                initHelpTips();
            }
            // Initialize platform menu
            if (typeof initPlatformMenu === 'function') {
                initPlatformMenu();
            }
        });
    </script>
</body>
</html>
EOF
    echo "index.html updated successfully."
else
    echo "Error: Could not find </body></html> tags in index.html."
fi

echo "Dot1Xer Supreme has been updated successfully!"
echo "You can now use the enhanced features including:"
echo "- Comprehensive AAA configuration templates"
echo "- Multi-vendor support for both wired and wireless"
echo "- IBNS 2.0, TACACS+, RadSec, Device Tracking configuration"
echo "- Help tips and detailed documentation"
echo "- AI-assisted configuration"
echo "- Portnox API integration"
echo
echo "Reload the application in your browser to see the changes."
