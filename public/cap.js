document.addEventListener('DOMContentLoaded', () => {
    // Initialization
    const stage = new Konva.Stage({
        container: 'container',
        width: window.innerWidth,
        height: window.innerHeight,
    });

    // Adds the grid layer
    const gridLayer = new Konva.Layer();
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
    const layer = new Konva.Layer();
    stage.add(layer);

    let isDrawing = false;
    let line;
    let selectedShape = 'line'; // Default shape is Line

    // Flag to indicate erasing mode
    let isErasing = false;

    // Event listeners for drawing
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
            // Drawing mode based on selected shape
            isDrawing = true;

            if (selectedShape === 'line') {
                line = new Konva.Line({
                    stroke: document.getElementById('colorPicker').value,
                    strokeWidth: 5,
                    globalCompositeOperation: 'source-over',
                    lineCap: 'round',
                    points: [snap(stage.getPointerPosition().x), snap(stage.getPointerPosition().y)],
                });
                layer.add(line);
            } else if (selectedShape === 'rectangle') {
                // Implement logic to draw rectangles
                // Example: Create a rectangle using Konva.Rect
            } else if (selectedShape === 'circle') {
                // Implement logic to draw circles
                // Example: Create a circle using Konva.Circle
            }
        }
    });

    // Implement logic for drawing rectangles and circles similar to drawing lines

    stage.on('mousemove touchmove', (e) => {
        if (isDrawing) {
            const pos = stage.getPointerPosition();
            const newPoints = line.points().concat([snap(pos.x), snap(pos.y)]);
            line.points(newPoints);
            layer.batchDraw();
        }
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

    // Helper function to snap to the grid
    function snap(value) {
        return Math.round(value / gridSize) * gridSize;
    }

    // Add event listeners for shape selection buttons
    const shapeButtons = document.querySelectorAll('.shape-button');
    shapeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // Set the selected shape
            selectedShape = button.getAttribute('data-shape');
            isDrawing = false; // Reset drawing mode when a new shape is selected
        });
    });

    const captureDrawingButton = document.getElementById('captureDrawing');
    const capturedImage = document.getElementById('captured-image'); // Get a reference to the image element

    captureDrawingButton.addEventListener('click', function () {
        const drawingDataURL = stage.toDataURL();
        capturedImage.src = drawingDataURL;
    });
});
