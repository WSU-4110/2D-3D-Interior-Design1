function toggleSubMenu() {
    var submenu = document.getElementById('sub-menu');
    submenu.classList.toggle('active');
}


const assert = require('assert');
const { JSDOM } = require('jsdom');


describe('toggleSubMenu', function () {
    // Use jsdom to create a virtual DOM environment
    const { window } = new JSDOM('<!DOCTYPE html><html><body><ul id="sub-menu"></ul></body></html>');
    global.document = window.document;

    it('should toggle the "active" class on the sub-menu', function () {
        const submenu = document.getElementById('sub-menu');

        assert.strictEqual(submenu.classList.contains('active'), false, 'Active class should not be present initially');

        toggleSubMenu();

        assert.strictEqual(submenu.classList.contains('active'), true, 'Active class should be added after toggling');

        toggleSubMenu();

        assert.strictEqual(submenu.classList.contains('active'), false, 'Active class should be removed after toggling again');
    });
});
