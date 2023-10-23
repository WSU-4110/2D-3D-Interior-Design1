import Konva from 'konva';

      //Get a reference to the canvas container div
      const container = document.getElementById('app');

      // Create a Konva stage to hold the canvas
      const stage = new Konva.Stage({
        container: 'app',
        width: window.innerWidth,
        height: window.innerHeight,
      });

      // Create a Konva layer for the grid
      const gridLayer = new Konva.Layer();
      stage.add(gridLayer);

      // Define the grid properties (spacing, color, size)
      const gridSize = 20;
      const gridColor = 'lightgray';

      // Draw the grid lines
      for (let x = 0; x < stage.width(); x += gridSize) {
        const line = new Konva.Line({
          points: [x, 0, x, stage.height()],
          stroke: gridColor,
        });
        gridLayer.add(line);
      }

      for (let y = 0; y < stage.height(); y += gridSize) {
        const line = new Konva.Line({
          points: [0, y, stage.width(), y],
          stroke: gridColor,
        });
        gridLayer.add(line);
      }

      // Create a Konva layer for drawing
      const drawingLayer = new Konva.Layer();
      stage.add(drawingLayer);

      // Initialize a drawing state

      // Create a drawing line
      let isDrawing = false;
      let drawingLine = new Konva.Line({
        stroke: 'black',
        strokeWidth: 2,
      });
      drawingLayer.add(drawingLine);

      // Listen for mouse events to draw
      stage.on('mousedown', () => {
        isDrawing = true;
        drawingLine.points([]);
      });

      stage.on('mouseup', () => {
        isDrawing = false;
      });

      stage.on('mousemove', () => {
        if (!isDrawing) return;

        const pos = stage.getPointerPosition();
        if(pos) {
          const { x, y } = pos;

        const points = drawingLine.points().concat([x, y]);
        drawingLine.points(points);
        drawingLayer.batchDraw();
        }
      });

      // Finally, start rendering
      stage.batchDraw();