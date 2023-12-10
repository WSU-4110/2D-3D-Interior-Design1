const { assert } = require('chai');
const { JSDOM } = require('jsdom');
const sinon = require('sinon');
const fs = require('fs');
const path = require('path');

const htmlPath = path.resolve(__dirname, 'pl.html');
const html = fs.readFileSync(htmlPath, 'utf-8');

const { window: virtualWindow } = new JSDOM(html, {
    resources: 'usable',
});

const runTests = async () => {
    const Konva = virtualWindow.Konva;

    const stage = new Konva.Stage({
        // ... stage configuration
    });

    const { captureDrawingButton } = require('./p');

    // Test suite
    describe('Capture Drawing Tests', () => {
        let window;
        before(() => {
            window = virtualWindow;
            global.document = window.document;
            global.window = window;
        });

        // Test case: should capture the drawing and set the image source
        it('should capture the drawing and set the image source', () => {
            // Create a dummy image element
            const capturedImage = window.document.createElement('img');
            capturedImage.id = 'captured-image';
            window.document.body.appendChild(capturedImage);

            const toDataURLStub = sinon.stub(stage, 'toDataURL').returns('dummyDataURL');

            captureDrawingButton.click();

            assert.equal(capturedImage.src, 'dummyDataURL');

            toDataURLStub.restore();
        });

        after(() => {
            delete global.document;
            delete global.window;
        });
    });
};

// Include Konva library
const konvaScript = virtualWindow.document.createElement('script');
konvaScript.src = 'https://cdn.jsdelivr.net/npm/konva@7.2.3/konva.min.js';
virtualWindow.document.head.appendChild(konvaScript);

// Create a promise to wait for Konva script to load
const konvaScriptLoaded = new Promise((resolve) => {
    konvaScript.onload = resolve;
});

// Wait for Konva script to load before running tests
konvaScriptLoaded.then(runTests);
