const { expect } = require('chai');

function undo(layer, history, redoStack){

    if (history.length > 0) {
        prevLine = history.pop();
        redoStack.push(prevLine);
        prevLine.destroy();
        layer.batchDraw();
    }
}

function redo(layer, history, redoStack){

    if(redoStack.length >0){
        nextLine = redoStack.pop();
        history.push(nextLine);
        layer.add(nextLine);
        layer.batchDraw();
    }
}

function clearCanvas(layer, history){
    
    layerData = layer.children.slice();
    history.push(layerData);
    layer.destroyChildren();
    layer.batchDraw();
}

describe('Buttons', () => {
    //undo button
    describe('undo function', () => {
        it('should delete the last thing drawn to the canvas and add it to the history stack', () => {
            
            const mockLayer = {
                batchDraw: () => {}, // Mock the batchDraw method
            };
    
            const mockLine = {
                destroy: () => {}, // Mock the destroy method
            };
    
            const history = [mockLine];
            const redoStack = [];

            undo(mockLayer, history, redoStack);

            expect(history).to.have.lengthOf(0);
            expect(redoStack).to.have.lengthOf(1);
            expect(redoStack[0]).to.equal(mockLine);
        });

        it('should do nothing if the history is empty', () => {

            const mockLayer = {
                batchDraw: () => {}, // Mock the batchDraw method
            };

            const history = [];
            const redoStack = [];

            undo(mockLayer, history, redoStack);

            expect(history).to.have.lengthOf(0);
            expect(redoStack).to.have.lengthOf(0);
        });
    });
});

    //redo button
    describe('redo', () => {
        it('should redo the last undone action by popping from redoStack, pushing to history, adding to layer, and batch drawing', () => {


            const mockLayer = {
                add: (line) => {},
                batchDraw: () => {},
            };
    
            const mockLine = {};
    
            const history = [];
            const redoStack = [mockLine];
    
            redo(mockLayer, history, redoStack);
    
            expect(history).to.have.lengthOf(1);
            expect(history[0]).to.equal(mockLine);
            expect(redoStack).to.have.lengthOf(0);

        });
    
        it('should do nothing if redoStack is empty', () => {


            const mockLayer = {
                add: (line) => {},
                batchDraw: () => {},
            };
    
            const history = [];
            const redoStack = [];
    
            redo(mockLayer, history, redoStack);
    
            expect(history).to.have.lengthOf(0);
            expect(redoStack).to.have.lengthOf(0);
        });
    });

    //clear button
    describe('clear canvas', () => {
        it('should copy the layer to the history array and destroy all lines on the layer', () => {
            
            const mockLayer = {
                children: [{}, {}, {}],
                destroyChildren: () => {},
                batchDraw: () => {},
            };
    
            const history = [];
    
            clearCanvas(mockLayer, history);
        
            expect(history).to.have.lengthOf(1);
            expect(history[0]).to.have.lengthOf(3);
        });
 });