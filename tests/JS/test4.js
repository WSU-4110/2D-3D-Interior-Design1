function createHTMLElement(tagName, className) {
    var element = document.createElement(tagName);
    if (className) {
        element.classList.add(className);
    }
    return element;
}
function showImages2(furnitureType) {
    var imageBox = document.getElementById('image-box');
    
    if (imageBox.style.display === 'block') {
                
                imageBox.style.display = 'none';
            } 
            else {
    

    var couchImages = createHTMLElement('div', 'furniture-images'); 

    for (var i = 1; i <= 4; i++) {
        var couchImage = createHTMLElement('div', 'furniture-image'); 
        couchImage.innerHTML = furnitureType.charAt(0).toUpperCase() + furnitureType.slice(1) + ' ' + i;
        
        couchImage.onclick = function() {
            alert('You clicked on ' + this.innerHTML + '. You can add it to your design.');
        };

        couchImages.appendChild(couchImage);
    }

    imageBox.innerHTML = ''; 
    imageBox.appendChild(couchImages);
    imageBox.style.display = 'block'; // Display the images
}
}

const assert = require('assert');
const { JSDOM } = require('jsdom');


describe('showImages2', function () {
    // Use jsdom to create a virtual DOM environment
    const { window } = new JSDOM('<!DOCTYPE html><html><body><div id="image-box"></div></body></html>');
    global.document = window.document;

    it('should display couch images and toggle the display', function () {
        const imageBox = document.getElementById('image-box');

        // Get the initial display value
        const initialDisplay = window.getComputedStyle(imageBox).display;

        // Show couch images for the first time
        showImages2('couch');

        // Now, the image box should have a 'display' property, but its actual value may vary
        const displayedAfterFirstToggle = window.getComputedStyle(imageBox).display;
        assert.ok(displayedAfterFirstToggle, 'Image box should have a "display" property after the first toggle');

        // Hide couch images
        showImages2('couch');

        // Now, the image box should have a 'display' property, but its actual value may vary
        const displayedAfterSecondToggle = window.getComputedStyle(imageBox).display;
        assert.ok(displayedAfterSecondToggle, 'Image box should have a "display" property after the second toggle');

        // Ensure that the display property has changed during toggling
        assert.notStrictEqual(displayedAfterFirstToggle, displayedAfterSecondToggle, 'Display property should toggle');

        // If the initial display was not 'none', then ensure that it has changed after toggling
        if (initialDisplay !== 'none') {
            assert.notStrictEqual(initialDisplay, displayedAfterSecondToggle, 'Initial display should change after toggling');
        }
    });
});