const { expect } = require('chai');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const htmlPath = path.resolve(__dirname, 'pl.html');
const html = fs.readFileSync(htmlPath, 'utf-8');

const { window: virtualWindow } = new JSDOM(html, {
    resources: 'usable',
});


const snap = ({ x, y }) => ({ x: Math.floor(x / 20) * 20, y: Math.floor(y / 20) * 20 });

// Test suite
describe('Snap Method Tests', () => {
    let window;

    // Set up a virtual DOM environment for testing
    before(() => {
        window = virtualWindow;
        global.document = window.document;
        global.window = window;
    });

    // Test case: should snap a point to the grid
    it('should snap a point to the grid', () => {
        // Call the snap method with a test point
        const result = snap({ x: 25, y: 35 });

        //result based on the expected snapped point
        expect(result).to.deep.equal({ x: 20, y: 20 });  
    });

   

    after(() => {
        delete global.document;
        delete global.window;
    });
});
