const { expect } = require('chai');
const { JSDOM } = require('jsdom');

// Include your function definition here
function updatelineData(curPoint, startPoint) {
    const dx = curPoint.x - startPoint.x;
    const dy = curPoint.y - startPoint.y;
    length = Math.sqrt(dx * dx + dy * dy) / 20;
    angle = (Math.atan2(-dy, dx) * 180) / Math.PI;

    if (angle < 0) {
        angle += 360; // Convert to 0-360 degrees
    }

    document.getElementById('length').textContent = Math.round(length * 100) / 100;
    document.getElementById('angle').textContent = Math.round(angle);
}

describe('updatelineData function', () => {
    it('should update length and angle based on input points', () => {
        // Set up a simple mock of the document and elements
        global.document = {
            getElementById: (id) => ({
                textContent: '',
            }),
        };

        const dom = new JSDOM(`
            <html>
                <body>
                <div id="length"></div>
                <div id="angle"></div>
                </body>
            </html>
        `);

    // Set up the global environment with the virtual DOM
    global.document = dom.window.document;
    global.window = dom.window;

        const startPoint = { x: 0, y: 0 };
        const curPoint = { x: 5, y: 12 };

        updatelineData(curPoint, startPoint);

        // Check if the length and angle were updated correctly
        const lengthElement = document.getElementById('length');
        const angleElement = document.getElementById('angle');

        expect(lengthElement.textContent).to.equal('0.65'); // Replace with the expected value
        expect(angleElement.textContent).to.equal('293'); // Replace with the expected value
    });
});
