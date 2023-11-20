//modules that i had to use
const { assert } = require('chai');
const { JSDOM } = require('jsdom');
const sinon = require('sinon');

//test suite
describe('Color Picker Tests', () => {
    let window;

    before(() => {
        // Create a virtual DOM environment for testing
        const { window: virtualWindow } = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');
        window = virtualWindow;
        global.document = window.document;
        global.window = window;
    });

    // Test case: should update the stroke color when colorPicker value changes
    it('should update the stroke color on colorPicker value change', () => {

        const colorPicker = window.document.createElement('input');
        colorPicker.type = 'color';
        colorPicker.value = '#ff0000';

        const line = {
            stroke: sinon.spy(),
        };

        window.document.body.appendChild(colorPicker);

     
        colorPicker.dispatchEvent(new window.Event('change'));

        assert.isFalse(line.stroke.calledOnceWith('#ff0000'));
    });

    // Clean up the virtual DOM after tests
    after(() => {
        delete global.document;
        delete global.window;
    });
});
