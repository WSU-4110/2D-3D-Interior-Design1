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

let isMeasuringDistance = false;
let isMeasuringAngle = false;

// Event listeners for drawing
stage.on('mousedown touchstart', (e) => {
    if (isMeasuringDistance) {
        measureDistance();
    } else if (isMeasuringAngle) {
        measureAngle();
    } else {
        isDrawing = true;
        line = new Konva.Line({
            stroke: document.getElementById('colorPicker').value, // Get selected color
            strokeWidth: 5,
            globalCompositeOperation: 'source-over',
            lineCap: 'round',
            points: [snap(stage.getPointerPosition().x), snap(stage.getPointerPosition().y)],
        });
        layer.add(line);
    }
});

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
    isMeasuringDistance = false;
    isMeasuringAngle = false;
    eraseButton.innerText = 'Erase Mode';
});

// Event listener to activate distance measurement mode
document.getElementById('startDistanceMeasurement').addEventListener('click', () => {
    isMeasuringDistance = true;
    isMeasuringAngle = false; // Disable angle measurement mode
    eraseButton.innerText = 'Erase Mode (Exit Measurement)';
});

// Event listener to activate angle measurement mode
document.getElementById('startAngleMeasurement').addEventListener('click', () => {
    isMeasuringDistance = false; // Disable distance measurement mode
    isMeasuringAngle = true;
    eraseButton.innerText = 'Erase Mode (Exit Measurement)';
});

// Helper function to snap to the grid
function snap(value) {
    return Math.round(value / gridSize) * gridSize;
}

// Measure distance function
function measureDistance() {
    let startPoint;
    let endPoint;
    let distanceLine;

    stage.on('mousedown touchstart', (e) => {
        if (!startPoint) {
            startPoint = stage.getPointerPosition();
        } else if (!endPoint) {
            endPoint = stage.getPointerPosition();
            const distance = calculateDistance(startPoint, endPoint);

            // Create a line to visualize the distance
            distanceLine = new Konva.Line({
                points: [startPoint.x, startPoint.y, endPoint.x, endPoint.y],
                stroke: 'red',
                strokeWidth: 2,
            });
            layer.add(distanceLine);

            // Display the distance measurement
            const text = new Konva.Text({
                x: (startPoint.x + endPoint.x) / 2,
                y: (startPoint.y + endPoint.y) / 2,
                text: distance.toFixed(2) + ' units',
                fill: 'red',
            });
            layer.add(text);

            layer.batchDraw();

            // Reset the measurement points for the next measurement
            startPoint = null;
            endPoint = null;
        }
    });
}

function calculateDistance(point1, point2) {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
}

// Measure angle function
function measureAngle() {
    let anglePoints = [];
    let angleLine;

    stage.on('mousedown touchstart', (e) => {
        if (anglePoints.length < 3) {
            const point = stage.getPointerPosition();
            anglePoints.push(point);

            // Draw lines to connect the points
            if (anglePoints.length > 1) {
                if (angleLine) {
                    angleLine.destroy();
                }
                angleLine = new Konva.Line({
                    points: anglePoints.flatMap((point) => [point.x, point.y]),
                    stroke: 'blue',
                    strokeWidth: 2,
                });
                layer.add(angleLine);
                layer.batchDraw();
            }

            if (anglePoints.length === 3) {
                const angle = calculateAngle(anglePoints[0], anglePoints[1], anglePoints[2]);

                // Display the angle measurement
                const text = new Konva.Text({
                    x: anglePoints[1].x,
                    y: anglePoints[1].y,
                    text: angle.toFixed(2) + ' degrees',
                    fill: 'blue',
                });
                layer.add(text);

                layer.batchDraw();

                // Clear the angle measurement points for the next measurement
                anglePoints = [];
            }
        }
    });
}

function calculateAngle(p1, p2, p3) {
    const angle1 = Math.atan2(p1.y - p2.y, p1.x - p2.x);
    const angle2 = Math.atan2(p3.y - p2.y, p3.x - p2.x);
    let angle = Math.abs((angle1 - angle2) * (180 / Math.PI));

    // Ensure angle is between 0 and 360 degrees
    angle = angle < 0 ? angle + 360 : angle;

    return angle;
}