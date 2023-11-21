// Import necessary modules
const { assert } = require('chai');

// Load the HTML file with JSDOM for testing in a virtual DOM
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// Read the HTML file
const html = fs.readFileSync(path.resolve(__dirname, 'platform.html'), 'utf8');

// Set up a basic HTML structure with the required CDN link for Konva
const virtualHTML = `
<!DOCTYPE html>
<html>

<head>
    <title>Color Not Drawing Test</title>
</head>

<body>
    <input type="color" id="colorPicker" value="#000000"> <!-- Color picker input -->

    <script>
        // Initialize global variables
        let lineColor;

        // Event listener for the color picker change
        document.getElementById('colorPicker').addEventListener('change', function () {
            lineColor = document.getElementById('colorPicker').value;
        });
    </script>
</body>

</html>
`;

// Your test suite
describe('Color Not Drawing Test', function () {
    // Set up before each test
    beforeEach(function () {
        // Reset the document body before each test
        const { window } = new JSDOM(virtualHTML, { runScripts: 'dangerously' });
        const { document } = window;

        // Include the script containing the code you want to test
        const scriptElement = document.createElement('script');
        scriptElement.src = 'platform_N.js'; // Replace with the actual path to your script
        document.head.appendChild(scriptElement);
    });

    // Your test case
    it('should not update the stroke color when color is not changed', function () {
        // Get the lineColor value from the window before any color change
        const initialColor = window.lineColor;

        // Trigger a change event on the colorPicker input
        const colorPicker = document.getElementById('colorPicker');
        colorPicker.value = '#ff0000'; // Set a new color
        colorPicker.dispatchEvent(new Event('change'));

        // Get the lineColor value from the window after the color change
        const updatedColor = window.lineColor;

        // Assert that the stroke color is not updated
        assert.equal(initialColor, updatedColor);
    });
});
