
// Initialization
stage = new Konva.Stage({
    container: 'container',
    width: typeof window !== 'undefined' ? window.innerWidth : 800,
    height: typeof window !== 'undefined' ? window.innerHeight : 600,
});

// platform_N.js

// Initialize Konva and global variables
const button = document.getElementById('captureDrawing'); // Update ID here
let buttonClicked = false;

button.addEventListener('click', () => {
    // Set the flag when the button is clicked
    buttonClicked = true;
    console.log('Button clicked. buttonClicked:', buttonClicked);
});

// Rest of your initialization code...


// Adds the grid layer
gridLayer = new Konva.Layer();
stage.add(gridLayer);


// Grid properties
const gridSize = 20;
const gridColor = 'lightgrey';

// Making the gridlines
for (let x = gridSize; x < stage.width(); x += gridSize) {
    gridLayer.add(
        new Konva.Line({
            points: [x, 0, x, stage.height()],
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
const layer = new Konva.Layer();
stage.add(layer);

let isDrawing = false;
let isErasing = false;
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
    } else {
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
const element = document.getElementById('yourElementId');
if (element) {
    element.addEventListener('eventName', yourEventListenerFunction);
} else {
    console.error('Element not found');
}
before(function () {
    // Set up your HTML structure here
    document.body.innerHTML = '<div id="yourElementId"></div>';
});

// Your tests go here

before(function () {
    // Set up your HTML structure here
    document.body.innerHTML = '<div id="container"></div>';
});

// Your tests go here

// allowing the drawing to get captured
const captureDrawingButton = document.getElementById('captureDrawing');
const capturedImage = document.getElementById('captured-image');

captureDrawingButton.addEventListener('click', function () {
    const drawingDataURL = stage.toDataURL();
    capturedImage.src = drawingDataURL;
});
