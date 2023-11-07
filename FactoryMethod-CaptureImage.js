
// adding the factory method for my design pattern 
class KonvaFactory {
    createStage(options) {
        return new Konva.Stage(options);
    }

    createLayer() {
        return new Konva.Layer();
    }

    createLine(options) {
        return new Konva.Line(options);
    }
}
const konvaFactory = new KonvaFactory();

// Initialization
const stage = konvaFactory.createStage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight,
});

// Adds the grid layer
const gridLayer = konvaFactory.createLayer();
stage.add(gridLayer);

// Grid properties
const gridSize = 20;
const gridColor = 'lightgrey';

// Making the gridlines
for (let x = gridSize; x < stage.width(); x += gridSize) {
    gridLayer.add(
        new Konva.Line({
            points: [x, 0, x, stage.height()],
            stroke: gridColor,
            strokeWidth: 1,
        })
    );
}

for (let y = gridSize; y < stage.height(); y += gridSize) {
    gridLayer.add(
        new Konva.Line({
            points: [0, y, stage.width(), y],
            stroke: gridColor,
            strokeWidth: 1,
        })
    );
}

// Drawing the grid layer
gridLayer.batchDraw();

// Setting up the drawing layer
const layer = konvaFactory.createLayer();
stage.add(layer);

let isDrawing = false;
let isErasing = false;
let isStraight = false;
let startPoint = null; //var for the start of a line
//let line = null; //var for the line itself
let line;

// Event listeners
stage.on('mousedown touchstart', (e) => {
    if (isErasing) {
        // Erase mode: remove shapes on click
        const pos = stage.getPointerPosition();
        const shape = stage.getIntersection(pos);
        if (shape) {
            shape.destroy();
            layer.batchDraw();
        }
    } 
    else {
        // enabling the drawing mode
        isDrawing = true;
        line = new Konva.Line({
            stroke: document.getElementById('colorPicker').value, // Get selected color
            strokeWidth: 5,
            globalCompositeOperation: 'source-over',
            lineCap: 'round',
            points: [stage.getPointerPosition().x, stage.getPointerPosition().y],
        });
        layer.add(line);
    }
});

stage.on('mousemove touchmove', (e) => {
    if (!isDrawing) return;
    const pos = stage.getPointerPosition();
    const newPoints = line.points().concat([pos.x, pos.y]);
    line.points(newPoints);
    layer.batchDraw();
});

stage.on('mouseup touchend', () => {
    isDrawing = false;
});

// Event listener for erase button
const eraseButton = document.getElementById('erase');
eraseButton.addEventListener('click', () => {
    isErasing = !isErasing;
    if (isErasing) {
        eraseButton.innerText = 'Drawing Mode';
    } else {
        eraseButton.innerText = 'Erase Mode';
    }
});




//Event listener for drawing straight lines button

//when the mouse button is clicked and held, start a new line at the nearest grid point
const StraightLine = document.getElementById('StraightLine');
StraightLine.addEventListener('click',() => {
stage.on('mousedown touchstart', (e) => {

    isDrawing = true;
    startPoint = snap(stage.getPointerPosition());
});

//if the user is drawing, have the line follow the pointer position and snap to the nearest grid point
stage.on('mousemove touchmove', (e) => {
    if (!isDrawing) return;

    const pos = snap(stage.getPointerPosition());

    // Create or update the line
    if (!line) {
        line = new Konva.Line({
            stroke: 'black',
            strokeWidth: 5,
            globalCompositeOperation: 'source-over',
            lineCap: 'round',
            points: [startPoint.x, startPoint.y, pos.x, pos.y],
        });
        layer.add(line);
    } else {
        line.points([startPoint.x, startPoint.y, pos.x, pos.y]);
    }

    layer.batchDraw();
});

//when the mouse button is released stop drawing
stage.on('mouseup touchend', () => {
    isDrawing = false;
    startPoint = null;
    line = null;
});

//add the line to the layer once its done
stage.on('mousemove touchmove', (e) => {
    if (!isDrawing) return;
    const pos = stage.getPointerPosition();
    lastLine.points(lastLine.points().concat([pos.x, pos.y]));
    layer.batchDraw();
});
});

//!!end event listeners!!

// picking color here
const colorPicker = document.getElementById('colorPicker');
colorPicker.addEventListener('change', () => {
    // Update the stroke color of the drawing tool
    if (line) {
        line.stroke(colorPicker.value);
        layer.batchDraw();
    }
});

// Helper function to snap to the grid
function snap(point) {
    subdiv = gridSize / 2;
    return {
        x: Math.round(point.x / subdiv) * subdiv,
        y: Math.round(point.y / subdiv) * subdiv,
    };
}

// allowing the drawing to get captured
const captureDrawingButton = document.getElementById('captureDrawing');
const capturedImage = document.getElementById('captured-image');

captureDrawingButton.addEventListener('click', function () {
    const drawingDataURL = stage.toDataURL();
    capturedImage.src = drawingDataURL;
});
