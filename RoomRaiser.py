import tkinter as tk
from tkinter.colorchooser import askcolor
import math


class GridDrawingApp(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Room Raiser")

        # Create a canvas widget
        self.canvas = tk.Canvas(self, width=800, height=400, bg="white")
        self.canvas.pack(fill=tk.BOTH, expand=True)
        self.grid_size = 10
        
        # Create a toolbar frame
        self.toolbar = tk.Frame(self)
        self.toolbar.pack(side=tk.TOP, fill=tk.X)
        
        self.itembar = tk.Frame(self)
        self.itembar.pack(side=tk.RIGHT, fill = tk.Y)
        

        # Add buttons to the toolbar
        self.clear_button = tk.Button(self.toolbar, text="Clear Canvas", command=self.clear_canvas)
        self.clear_button.pack(side=tk.LEFT)

        # Default line color
        self.line_color = "black"
        
        
        # Add a label to display line info
        self.line_info_label = tk.Label(self.toolbar, text="Line Length: 0.0, Angle: 0.0 degrees")
        self.line_info_label.pack(side=tk.RIGHT)

        # Bind the canvas to the window resizing event
        self.canvas.bind("<Configure>", self.create_grid)

        # Bind mouse button press, motion, and release events
        self.canvas.bind("<Button-1>", self.start_line)
        self.canvas.bind("<B1-Motion>", self.update_line)
        self.canvas.bind("<ButtonRelease-1>", self.end_line)

    def create_grid(self, event=None):
        # Clear any existing items in the canvas
        self.canvas.delete("grid_line")

        # Get the width and height of the canvas
        width = self.canvas.winfo_width()
        height = self.canvas.winfo_height()

        # Define the grid spacing (adjust as needed)
        spacing = 20

        # Create horizontal grid lines
        for y in range(0, height, spacing):
            self.canvas.create_line(0, y, width, y, fill="#cccccc", tags="grid_line")

        # Create vertical grid lines
        for x in range(0, width, spacing):
            self.canvas.create_line(x, 0, x, height, fill="#cccccc", tags="grid_line")
            
    def snap_to_grid(self, x, y):
        x = (x // self.grid_size) * self.grid_size
        y = (y // self.grid_size) * self.grid_size
        
        return x, y
    
    def start_line(self, event):
        x, y = self.snap_to_grid(event.x, event.y)
        self.start_x, self.start_y = x, y

        # Create a line starting from the snapped point
        self.canvas.data = [x, y]
        self.canvas.line = self.canvas.create_line(x, y, x, y, fill="black", width=3)


    def update_line(self, event):
        if hasattr(self.canvas, "data"):
            x, y = self.snap_to_grid(event.x, event.y)
            
            # Update the line's endpoint
            self.canvas.coords(self.canvas.line, self.canvas.data[0], self.canvas.data[1], x, y)
            
            # Calculate and display line length and angle
            length = math.sqrt((x - self.canvas.data[0])**2 + (y - self.canvas.data[1])**2)
            angle = math.degrees(math.atan2(self.canvas.data[1]-y, x-self.canvas.data[0]))
            
            angle = (angle+360)%360

            # Update the line info label
            self.line_info_label.config(text=f"Line Length: {length/20:.2f}, Angle: {angle:.2f} degrees")

    def end_line(self, event):
        if hasattr(self.canvas, "data"):
            x, y = self.snap_to_grid(event.x, event.y)
            
            # Add the drawn line to the history
            line = self.canvas.create_line(self.canvas.data[0], self.canvas.data[1], x, y, fill = self.line_color, width=3)
            self.line_history.append(line)

            # Clear the redo history
            self.redo_history.clear()

            # Delete any existing line on the canvas
            self.canvas.delete(self.canvas.line)
            
            # Calculate and display line length and angle
            length = math.sqrt((x - self.canvas.data[0])**2 + (y - self.canvas.data[1])**2)
            angle = math.degrees(math.atan2(self.canvas.data[1]-y, x-self.canvas.data[0]))
            
            angle = (angle+360)%360

            # Update the line info label
            self.line_info_label.config(text=f"Line Length: {length/20:.2f}, Angle: {angle:.2f} degrees")
            
            del self.canvas.data
            
    def clear_canvas(self):
        self.canvas.delete("all")
        self.create_grid()
        

if __name__ == "__main__":
    app = GridDrawingApp()
    app.mainloop()
