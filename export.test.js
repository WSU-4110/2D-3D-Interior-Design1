const { expect } = require('chai');
const { JSDOM } = require('jsdom');

// Include your function definition here
function exportImage() {
    const dataURL = stage.toDataURL();
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'floorplan.jpg';
    a.click();
}

describe('exportImage function', () => {
    it('should create a link with the correct properties', () => {
        
        const dom = new JSDOM();
        global.document = dom.window.document;

        global.stage = {
            toDataURL: () => 'mockDataURL',
        };

        exportImage();

        const aElement = document.querySelector('a');
        expect(aElement).to.exist;
        expect(aElement.href).to.equal('mockDataURL');
        expect(aElement.download).to.equal('floorplan.jpg');
    });

});
