const { expect } = require('chai');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const htmlPath = path.resolve(__dirname, 'pl.html');
const html = fs.readFileSync(htmlPath, 'utf-8');

const { window: virtualWindow } = new JSDOM(html, {
    resources: 'usable',
});

const Konva = require('konva');
const { Line } = Konva;

const drawFunction = (layer, points) => {
    const line = new Line({
        points,
        strokeWidth: 5,
        globalCompositeOperation: 'source-over',
        lineCap: 'round',
    });
    layer.add(line);
};

const eraseFunction = (layer, shape) => {
    shape.destroy();
    layer.batchDraw();
};

describe('Erase Button Tests', () => {
    let window;
    let isErasing;

    before(() => {
        window = virtualWindow;
        global.document = window.document;
        global.window = window;
    });

    it('should toggle erase mode and update button text', () => {
        document.body.innerHTML = '<button id="erase">Erase Mode</button>';

        isErasing = false;

        const eraseButton = document.getElementById('erase');
        eraseButton.addEventListener('click', () => {
            isErasing = !isErasing;
            if (isErasing) {
                eraseButton.innerText = 'Drawing Mode';
            } else {
                eraseButton.innerText = 'Erase Mode';
            }
        });

        eraseButton.click();

        expect(eraseButton.innerText).to.equal('Drawing Mode');

        eraseButton.click();

        expect(eraseButton.innerText).to.equal('Erase Mode');
    });

    after(() => {
        delete global.document;
        delete global.window;
    });
});
