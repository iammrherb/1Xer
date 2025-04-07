#!/bin/bash
# Launch script for Dot1Xer Supreme

# Determine the browser to use
if command -v xdg-open &> /dev/null; then
    # Linux
    xdg-open "index.html"
elif command -v open &> /dev/null; then
    # macOS
    open "index.html"
elif command -v start &> /dev/null; then
    # Windows with Git Bash or similar
    start "index.html"
else
    echo "Could not determine how to open the browser. Please open 'index.html' manually."
fi
