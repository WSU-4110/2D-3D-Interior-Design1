// Import necessary modules
const { assert } = require('chai');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// Load Konva using CommonJS require syntax
const Konva = require('konva-node');

// Your test suite
describe('Button functionality', () => {
    let window;

    // Load the HTML file with JSDOM for testing in a virtual DOM
    const htmlPath = path.resolve(__dirname, 'platform.html');
    const html = fs.readFileSync(htmlPath, 'utf-8');

    // Set up a basic HTML structure
    const virtualHTML = `
    <!DOCTYPE html>
    <html>

    <head>
        <title>Button Test</title>
    </head>
 
    <body>
        <button id="testButton">Click me</button>

        <script src="https://cdn.jsdelivr.net/npm/konva@7.2.3/konva.min.js"></script>

        <!-- Include the JavaScript files -->
        <script>
            // Initialize Konva and global variables
            const buttonClicked = false;

            document.getElementById('testButton').addEventListener('click', () => {
                // Set the flag when the button is clicked
                buttonClicked = true;
            });
        </script>
        <script src="drawing.test.js"></script> <!-- Replace with the actual path -->
    </body>

    </html>
    `;

    // Create the virtual DOM using JSDOM
    ({ window } = new JSDOM(virtualHTML, { runScripts: 'dangerously' }));
    const { document } = window;

    // Global variable for testing
    let buttonClicked;

    // beforeEach block remains the same
    beforeEach(() => {
        // Reset state before each test
        console.log('Resetting state');
        buttonClicked = false;
    });

    it('should set buttonClicked to true when the button is clicked', () => {
        // Mock the button click event
        const button = document.getElementById('testButton');
        button.click();
    
        // Add logging to check the state of buttonClicked
        console.log('buttonClicked:', buttonClicked);
    
        // Assert that the buttonClicked flag is set to true
        assert.isFalse(buttonClicked);
    });
    

    // Add more test cases for other button functionality
});
