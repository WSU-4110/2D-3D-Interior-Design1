
//initialization
const stage = new Konva.Stage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight,
});

//setting up the grid layer
const gridLayer = new Konva.Layer();
stage.add(gridLayer);

//grid properties
const gridSize = 20;
const gridColor = 'lightgrey';

//making the gridlines
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

//drawing the grid layer
gridLayer.batchDraw();


//setting up the drawing layer
const layer = new Konva.Layer();
stage.add(layer);

let isDrawing = false; //boolean to check if a line is currently being drawn
let startPoint = null; //var for the start of a line
let line = null; //var for the line itself



//!!event listeners go below!!


//when the mouse button is clicked and held, start a new line at the nearest grid point
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

//!!end event listeners!!




//!!helper functions go below!!

function snap(point) {
    subdiv = gridSize/2 //grid is divided into subdivisions to allow users to also draw at grid halfpoints.
    return {
        x: Math.round(point.x / subdiv) * subdiv,
        y: Math.round(point.y / subdiv) * subdiv,
    };
}

//!!end helper functions!!
