function createHTMLElement(tagName, className) {
    var element = document.createElement(tagName);
    if (className) {
        element.classList.add(className);
    }
    return element;
}

const assert = require('assert');
const { JSDOM } = require('jsdom');


describe('createHTMLElement', function () {
    // Use jsdom to create a virtual DOM environment
    const { window } = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    global.document = window.document;

    it('should create an HTML element with the specified tag name and class', function () {
        const tagName = 'div';
        const className = 'test-class';

        const element = createHTMLElement(tagName, className);

        assert.strictEqual(element.tagName, tagName.toUpperCase(), 'Tag name mismatch');
        assert.strictEqual(element.classList.contains(className), true, 'Class not added as expected');
    });

    it('should create an HTML element without a class if className is not provided', function () {
        const tagName = 'span';

        const element = createHTMLElement(tagName);

        assert.strictEqual(element.tagName, tagName.toUpperCase(), 'Tag name mismatch');
        assert.strictEqual(element.classList.length, 0, 'Class should not be added');
    });
});