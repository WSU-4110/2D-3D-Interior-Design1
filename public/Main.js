function toggleSubMenu(subMenuId) {
    if (subMenuId) {
        var submenu = document.getElementById(subMenuId);
        submenu.classList.toggle('active');
    } else {
        console.log('Submenu ID not provided.');
    }
}

function createHTMLElement(tagName, className) {
    var element = document.createElement(tagName);
    if (className) {
        element.classList.add(className);
    }
    return element;
}

function showImages(furnitureType) {
    var imageBox = document.getElementById('image-box');

    if (imageBox.style.display === 'block') {
        imageBox.style.display = 'none';
    } else {
        var snappableImages = createHTMLElement('div', 'snappable-images');

        for (var i = 1; i <= 4; i++) {
            var snappableImage = createHTMLElement('div', 'snappable-image');
            var img = document.createElement('img');

            switch (furnitureType) {
                case 'bed':
                    img.src = `bed${i}.jpg`;
                    break;
                case 'couch':
                    img.src = `couch${i}.jpeg`;
                    break;
                case 'table':
                    img.src = `table${i}.jpeg`;
                    break;
                case 'wardrobe':
                    img.src = `wardrobe${i}.jpeg`;
                    break;
                default:
                    img.src = 'default.jpg';
            }

            img.alt = furnitureType.charAt(0).toUpperCase() + furnitureType.slice(1) + ' ' + i;
            img.style.width = '100%';
            img.style.height = '100%';

            snappableImage.appendChild(img);

            snappableImage.onclick = function () {
                alert('You clicked on ' + this.firstChild.alt + '. You can add it to your design.');
            };

            snappableImages.appendChild(snappableImage);
        }

        imageBox.innerHTML = '';
        imageBox.appendChild(snappableImages);
        imageBox.style.display = 'block';

        const draggable = new Draggable.Sortable(snappableImages, {
            draggable: '.snappable-image',
            mirror: {
                constrainDimensions: true,
            },
        });
    }
}

function showImages2(furnitureType) {
    var imageBox = document.getElementById('image-box');

    if (imageBox.style.display === 'block') {
        imageBox.style.display = 'none';
    } else {
        var couchImages = createHTMLElement('div', 'furniture-images');

        for (var i = 1; i <= 4; i++) {
            var couchImage = createHTMLElement('div', 'furniture-image');
            var img = document.createElement('img');

            switch (i) {
                case 1:
                    img.src = 'couch1.jpg';
                    break;
                case 2:
                    img.src = 'couch2.jpg';
                    break;
                case 3:
                    img.src = 'couch3.jpg';
                    break;
                case 4:
                    img.src = 'couch4.jpg';
                    break;
                default:
                    img.src = 'default.jpg';
            }

            img.alt = 'Couch ' + i;
            img.style.width = '100%';
            img.style.height = '100%';

            couchImage.appendChild(img);

            couchImage.onclick = function () {
                alert('You clicked on ' + this.firstChild.alt + '. You can add it to your design.');
            };

            couchImages.appendChild(couchImage);
        }

        imageBox.innerHTML = '';
        imageBox.appendChild(couchImages);
        imageBox.style.display = 'block';
    }
}

function showImages3(furnitureType) {
    var imageBox = document.getElementById('image-box');

    if (imageBox.style.display === 'block') {
        imageBox.style.display = 'none';
    } else {
        var tableImages = createHTMLElement('div', 'furniture-images');

        for (var i = 1; i <= 4; i++) {
            var tableImage = createHTMLElement('div', 'furniture-image');
            var img = document.createElement('img');

            switch (i) {
                case 1:
                    img.src = 'table1.jpeg';
                    break;
                case 2:
                    img.src = 'table2.jpeg';
                    break;
                case 3:
                    img.src = 'table3.jpeg';
                    break;
                case 4:
                    img.src = 'table4.jpeg';
                    break;
                default:
                    img.src = 'default.jpg';
            }

            img.alt = furnitureType.charAt(0).toUpperCase() + furnitureType.slice(1) + ' ' + i;
            img.style.width = '100%';
            img.style.height = '100%';

            tableImage.appendChild(img);

            tableImage.onclick = function () {
                alert('You clicked on ' + this.firstChild.alt + '. You can add it to your design.');
            };

            tableImages.appendChild(tableImage);
        }

        imageBox.innerHTML = '';
        imageBox.appendChild(tableImages);
        imageBox.style.display = 'block';
    }
}

function showImages4(furnitureType) {
    var imageBox = document.getElementById('image-box');

    if (imageBox.style.display === 'block') {
        imageBox.style.display = 'none';
    } else {
        imageBox.style.display = 'block';

        var furnitureImages = createHTMLElement('div', 'furniture-images');

        for (var i = 1; i <= 4; i++) {
            var furnitureImage = createHTMLElement('div', 'furniture-image');
            furnitureImage.innerHTML = furnitureType.charAt(0).toUpperCase() + furnitureType.slice(1) + ' ' + i;

            furnitureImage.onclick = function () {
                alert('You clicked on ' + this.innerHTML + '. You can add it to your design.');
            };

            var img = document.createElement('img');
            switch (i) {
                case 1:
                    img.src = 'wardrobe1.jpeg';
                    break;
                case 2:
                    img.src = 'wardrobe2.jpeg';
                    break;
                case 3:
                    img.src = 'wardrobe3.png';
                    break;
                case 4:
                    img.src = 'wardrobe4.jpeg';
                    break;
                default:
                    img.src = 'default-wardrobe.jpg';
            }

            img.style.width = '100%';
            img.style.height = '100%';

            furnitureImage.appendChild(img);

            furnitureImages.appendChild(furnitureImage);
        }

        imageBox.innerHTML = '';
        imageBox.appendChild(furnitureImages);
        imageBox.style.display = 'block';
    }
}

function hideImages() {
    var imageBox = document.getElementById('image-box');
    imageBox.style.display = 'none';
}


document.addEventListener('DOMContentLoaded', () => {
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
    fill: 'white',
    // Background color
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
    //let line = null; //var for the line itself
    let line;
    let selectedShape = 'line'; // Default shape is Line
    // Flag to indicate erasing mode
    let isErasing = false;
    
    //two stacks to keep track of changes to the canvas
    const history = [];
    const redoStack = [];
    
    let penSize = 2;
    
    
    //!!event listeners go below!!
    
    
    //when the mouse button is clicked and held, start a new line at the nearest grid point
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
    
            isDrawing = true;
    //////////////////////////////////////////////////////////////////////////////////////////////////
            if (selectedShape === 'line') {
                // Draw a line
                line = new Konva.Line({
                    stroke: document.getElementById('colorPicker').value,
                    strokeWidth: penSize,
                    globalCompositeOperation: 'source-over',
                    lineCap: 'round',
                    points: [snap(stage.getPointerPosition().x), snap(stage.getPointerPosition().y)],
                });
                layer.add(line);
            } else if (selectedShape === 'circle') {
                circle = new Konva.Circle({
                    x: stage.getPointerPosition().x,
                    y: stage.getPointerPosition().y,
                    radius: 0, // initial radius is 0
                    stroke: document.getElementById('colorPicker').value,
                    strokeWidth: penSize,
                    fill: 'transparent', // set fill to transparent for outline only
                    draggable: true,
                });
                layer.add(circle);
    
                
            }else if (selectedShape === 'square') {
                
                square = new Konva.Rect({
                    x: stage.getPointerPosition().x,
                    y: stage.getPointerPosition().y,
                    width: 0,
                    height: 0,
                    stroke: document.getElementById('colorPicker').value,
                    strokeWidth: penSize,
                    fill: 'transparent', // set fill to transparent for outline only
                    draggable: true, // enable drag-and-drop
                });
                layer.add(square);}
            ///////////////////////////////////////////////////////////////////////////////////////////////
    
            startPoint = snap(stage.getPointerPosition());
        }
    });
    
    //if the user is drawing, have the line follow the pointer position and snap to the nearest grid point
    stage.on('mousemove touchmove', (e) => {
        if (!isDrawing) return;
    
        const pos = snap(stage.getPointerPosition());
    ////////////////////////////////////////////////////////////////////////////////////////////////
        if (selectedShape === 'line') {
            // Draw or update the line
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
        } else if (selectedShape === 'circle') {
            // Update the radius for the circle based on mouse movement
            const dx = pos.x - startPoint.x;
            const dy = pos.y - startPoint.y;
            const radius = Math.sqrt(dx * dx + dy * dy);
            circle.radius(radius);
        } else if (selectedShape === 'square') {
            const width = pos.x - square.x();
            const height = pos.y - square.y();
            square.width(width);
            square.height(height);
        }
    
        
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
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
        } /*else {
            line.points([startPoint.x, startPoint.y, pos.x, pos.y]);
        }*/
    
        layer.batchDraw();
    
        updatelineData(pos, startPoint);
    });
    
    //when the mouse button is released stop drawing, add the line to the history and clear the redo stack
    stage.on('mouseup touchend', (e) => {
        if (!isDrawing) return;
    
        let currentShape;
    
        // Set the currentShape based on the selectedShape
        if (selectedShape === 'line') {
            currentShape = line;
        } else if (selectedShape === 'circle') {
            currentShape = circle;
        } else if (selectedShape === 'square') {
            currentShape = square;
        }
    
        // Add the shape to the history
        history.push(currentShape);
        redoStack.length = 0;
        isDrawing = false;
        startPoint = null;
        currentShape = null;
    
        // Show color picker and fill the shape if confirmed
        showColorPopup(history[history.length - 1]);
    
        // Set the draggable property for the added shape
        if (currentShape) {
            currentShape.draggable(true);
            addDragEventListeners(currentShape);
        }
    
        
    
    
    });
    
    // Event listener for mouseup on the stage
    stage.on('mouseup', () => {
        if (currentShape) {
            showColorPopup(currentShape);
        }
    });
    
    // Function to fill the shape with the selected color
    function fillShape(shape, color) {
        if (shape) {
            shape.fill(color);
            layer.batchDraw();
        }
    }
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    // when the mouse button is released stop drawing, add the shape to the history, and clear the redo stack
    stage.on('mouseup touchend', () => {
        if (!isDrawing) return;
    
        let currentShape;
    
        if (selectedShape === 'line') {
            currentShape = line;
        } else if (selectedShape === 'circle') {
            // Finalize the circle drawing
            currentShape = circle;
        } else if (selectedShape === 'square') {
            // Finalize the square drawing
            currentShape = square;
        }
    
        // Add the shape to the history
        history.push(currentShape);
        redoStack.length = 0;
        isDrawing = false;
        startPoint = null;
        currentShape = null;
    
        // Show color picker and fill the shape if confirmed
        showColorPopup(history[history.length - 1]);
    });
    
    
    // Function to fill the shape with the selected color
    function fillShape(shape, color) {
        if (shape) {
            shape.fill(color);
            layer.batchDraw();
        }
    }
    
    // Event listener for mouseup on the stage
    stage.on('mouseup', () => {
        if (currentShape) {
            showColorPopup(currentShape);
        }
    });
    
    // ...
    
    // Helper function to show the color picker pop-up
    function showColorPopup(shape) {
        const colorPopup = document.getElementById('colorPopup');
        colorPopup.style.display = 'block';
    
        const colorInput = document.getElementById('colorInput');
        const applyColorButton = document.getElementById('applyColorButton');
        const noneButton = document.getElementById('noneButton');
    
        // Event listener for "Apply" button
        applyColorButton.addEventListener('click', () => {
            const selectedColor = colorInput.value;
            fillShape(shape, selectedColor);
            colorPopup.style.display = 'none';
        });
    
        // Event listener for "None" button
        noneButton.addEventListener('click', () => {
            colorPopup.style.display = 'none';
        });
    }
    function makeImageMovable(imageElement) {
    var offsetX, offsetY;
    var gridSize = 20; // Adjust the grid size as needed

    // Set the image as draggable
    imageElement.draggable = true;

    

    // Add a dragstart event listener
    imageElement.addEventListener('dragstart', function (e) {
        // Store the initial position of the cursor relative to the image
        offsetX = e.clientX - imageElement.getBoundingClientRect().left;
        offsetY = e.clientY - imageElement.getBoundingClientRect().top;

        // Set the drag data with a custom type (you can use 'text/plain' if you prefer)
        e.dataTransfer.setData('text', '');
    });

    // Add a drag event listener
    imageElement.addEventListener('drag', function (e) {
        // Calculate the new position of the image based on the cursor position
        var x = e.clientX - offsetX;
        var y = e.clientY - offsetY;

        // Snap to the grid
        x = Math.round(x / gridSize) * gridSize;
        y = Math.round(y / gridSize) * gridSize;

        // Move the image to the new position
        imageElement.style.left = x + 'px';
        imageElement.style.top = y + 'px';
    });
}
    function makeImageMovable(imageElement) {
        var offsetX, offsetY;
        var gridSize = 20; // Adjust the gridSize according to your preference

        // Set the image as draggable
        imageElement.draggable = true;

        // Add a dragstart event listener
        imageElement.addEventListener('dragstart', function (e) {
            // Store the initial position of the cursor relative to the image
            offsetX = e.clientX - imageElement.getBoundingClientRect().left;
            offsetY = e.clientY - imageElement.getBoundingClientRect().top;

            // Set the drag data with a custom type (you can use 'text/plain' if you prefer)
            e.dataTransfer.setData('text', '');
        });

        // Add a drag event listener
        imageElement.addEventListener('drag', function (e) {
            // Calculate the new position of the image based on the cursor position
            var x = e.clientX - offsetX;
            var y = e.clientY - offsetY;

            // Snap to the grid
            x = Math.round(x / gridSize) * gridSize;
            y = Math.round(y / gridSize) * gridSize;

            // Move the image to the new position
            imageElement.style.left = x + 'px';
            imageElement.style.top = y + 'px';
        });
    }
    function toggleSubMenu(tab) {
        // Get all submenus
        var allSubmenus = document.querySelectorAll('.sub-menu');
    
        // Iterate through all submenus and hide them
        allSubmenus.forEach(function(submenu) {
            if (submenu.id !== 'sub-menu-' + tab) {
                submenu.classList.remove('active');
            }
        });
    
        // Get the specific submenu for the clicked tab
        var submenuId = 'sub-menu-' + tab;
        var submenu = document.getElementById(submenuId);
    
        // Toggle the 'active' class for the specific submenu
        submenu.classList.toggle('active');
    }
    
    
    function showPaint(color) {
        // Add logic to display paint options based on the selected color
        alert('You selected paint color: ' + color);
    }
    
    function showFlooring(type) {
        var flooringOptions = document.getElementById('sub-menu-flooring-options');
    
        // Toggle the active class to show/hide flooring options
        flooringOptions.classList.toggle('active');
    
        // Optional: Add logic to handle the selected flooring type
        if (flooringOptions.classList.contains('active')) {
            alert('You selected ' + type + ' flooring. Handle this as needed.');
        }
    }
    
    
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    
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
    
    /*
    // Helper function to snap to the grid
    function snap(value) {
        return Math.round(value / gridSize) * gridSize;
    }*/
    
    
    
      // Event listener for shape selection buttons
    
      const shapeButtons = document.querySelectorAll('.shape-button');
      shapeButtons.forEach((button) => {
          button.addEventListener('click', () => {
              // Set the selected shape
              selectedShape = button.getAttribute('data-shape');
              isDrawing = false; // Reset drawing mode when a new shape is selected
    
            
          });
      });
    
    //Save image as PNG
     document.getElementById('saveButton').addEventListener('click', () => {
        saveDrawing();
    });
    
    
    function saveDrawing() {
        
        // Set the background color of the stage
        const dataURL = stage.toDataURL();
        // Restore the original background color (if needed)
        
        // Create a temporary link element
        const a = document.createElement('a');
        a.href = dataURL;
        a.download = 'floorPlan.png'; // You can specify the file name and extension here
    
        // Append the link to the document and trigger a click to start the download
        document.body.appendChild(a);
        a.click();
    
        // Remove the link from the document
        document.body.removeChild(a);
    }
    
    
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
    });


// Additional Functions or Event Handlers can be added here

// End of JavaScript code
