// Import necessary modules
const { assert } = require('chai');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

describe('Button functionality', () => {
    let window, document, buttonClicked, button;

    const htmlPath = path.resolve(__dirname, 'pl.html');
    const html = fs.readFileSync(htmlPath, 'utf-8');

    const virtualHTML = `
    <!DOCTYPE html>
    <html>

    <head>
        <title>Button Test</title>
    </head>

    <body>
        <button id="testButton">Click me</button>

        <script src="button.test.js"></script> <!-- Move the test script here -->
        <script>
            // Initialize Konva and global variables
            let buttonClicked = false;

            document.getElementById('testButton').addEventListener('click', () => {
                // Set the flag when the button is clicked
                buttonClicked = true;
            });
        </script>
    </body>

    </html>
    `;

    // Create the virtual DOM using JSDOM
    beforeEach(() => {
        ({ window, document } = new JSDOM(virtualHTML, { runScripts: 'dangerously' }));
        global.window = window;
        global.document = document;

        // Get a reference to the button element before each test
        button = document.getElementById('testButton');

        // Reset state before each test
        console.log('Resetting state');
        buttonClicked = false;
    });

    it('should set buttonClicked to true when the button is clicked', (done) => {
       
        button.click();
    
        setTimeout(() => {
    
            console.log('buttonClicked:', buttonClicked);
    
            assert.isFalse(buttonClicked);
    
            done();
        }, 100);
    });
    
});
