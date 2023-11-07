
//initialization
const stage = new Konva.Stage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight,
});

const backgroundLayer = new Konva.Layer();
stage.add(backgroundLayer);

backgroundLayer.add(new Konva.Rect({
    width: stage.width(),
    height: stage.height(),
    fill: 'white', // Background color
}));
backgroundLayer.draw();

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


//two stacks to keep track of changes to the canvas
const history = [];
const redoStack = [];

let penSize = 2;


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
            strokeWidth: penSize,
            globalCompositeOperation: 'source-over',
            lineCap: 'round',
            points: [startPoint.x, startPoint.y, pos.x, pos.y],
        });
        layer.add(line);
    } else {
        line.points([startPoint.x, startPoint.y, pos.x, pos.y]);
    }

    layer.batchDraw();

    updatelineData(pos, startPoint);
});

//when the mouse button is released stop drawing, add the line to the history and clear the redo stack
stage.on('mouseup touchend', () => {
    if (!isDrawing) return;
    history.push(line);
    redoStack.length = 0;
    isDrawing = false;
    startPoint = null;
    line = null;
});

//add the line to the layer once its done
stage.on('mousemove touchmove', (e) => {
    if (!isDrawing) return;
    const pos = stage.getPointerPosition();
    lastLine.points(lastLine.points().concat([pos.x, pos.y]));
});

//when the undo button is clicked, grab the last item from the history stack and delete it from the canvas. Also add it to the future stack.
undoButton.addEventListener('click', () =>{
    if (history.length > 0) {
        prevLine = history.pop();
        redoStack.push(prevLine);
        prevLine.destroy();
        layer.batchDraw();
    }
});

//when the redo button is clicked, grab the last item from the future stack and put it back on the canvas.
redoButton.addEventListener('click', () =>{
    if(redoStack.length >0){
        nextLine = redoStack.pop();
        history.push(nextLine);
        layer.add(nextLine);
        layer.batchDraw();
    }
});

//change the pen size according to the slider
document.getElementById('penSlider').addEventListener('input', (e) => {
    penSize = parseInt(e.target.value);
    document.getElementById('sizeLabel').textContent = parseInt(e.target.value);
    if (currentLine) {
        currentLine.strokeWidth(penSize);
    }

    
});

//export image as .png
document.getElementById('expButton').addEventListener('click', (e) =>{

        const dataURL = stage.toDataURL();
        const a = document.createElement('a');
        a.href = dataURL;
        a.download = 'floorplan.jpg';
        a.click();
});

//clear whole layer
document.getElementById('clearButton').addEventListener('click', (e) =>{
        
        history.push(layer.clone);
        layer.destroyChildren();
        layer.batchDraw();

});


//!!end event listeners!!



//!!helper functions go below!!

//rounds the coordinates of the points to the nearest grid point
function snap(point) {
    subdiv = gridSize/2 //grid is divided into subdivisions to allow users to also draw at grid halfpoints.
    return {
        x: Math.round(point.x / subdiv) * subdiv,
        y: Math.round(point.y / subdiv) * subdiv,
    };
}

//update the length and angle of the current line being drawn
function updatelineData(curPoint, startPoint) {
    const dx = curPoint.x - startPoint.x;
    const dy = curPoint.y - startPoint.y;
    length = Math.sqrt(dx * dx + dy * dy)/20;
    angle = (Math.atan2(-dy, dx) * 180) / Math.PI;

    if (angle < 0) {
        angle += 360; // Convert to 0-360 degrees
    }

    document.getElementById('length').textContent = Math.round(length*100)/100;
    document.getElementById('angle').textContent = Math.round(angle)

}

//!!end helper functions!!
