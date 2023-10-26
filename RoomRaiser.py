import tkinter as tk
from tkinter.colorchooser import askcolor
from tkinter import ttk, Menu, filedialog, messagebox
from PIL import Image, ImageDraw
import itertools
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
        self.itembar.pack(side=tk.TOP, fill= tk.Y)

        # Add buttons to the toolbar
        self.clear_button = tk.Button(self.toolbar, text="Clear Canvas", command=self.clear_canvas)
        self.clear_button.pack(side=tk.LEFT)

        # Default line color
        DEFAULT_COLOR = 'black'
        self.line_color = "black"
        self.pen_size_num = 2
        
        #Pen size slider
        self.pen_size = tk.Scale(self.toolbar, from_=1, to=10, orient="horizontal", label="Pen Size", command=self.update_pen_size)
        self.pen_size.pack(side=tk.LEFT)
        
        self.undo_button = tk.Button(self.toolbar, text="Undo", command=self.undo)
        self.undo_button.pack(side=tk.LEFT)
        self.redo_button = tk.Button(self.toolbar, text="Redo", command=self.redo)
        self.redo_button.pack(side=tk.LEFT)
        
        #Menu Bar
        menubar = Menu(self.master)
        self.config(menu=menubar)
        
        
        fileMenu = Menu(menubar)
        fileMenu.add_command(label="Export", command = self.exportToImage)
        fileMenu.add_command(label="Exit", command=self.onExit)
        menubar.add_cascade(label="File", menu=fileMenu)
        
        # Add a label to display line info
        self.line_info_label = tk.Label(self.toolbar, text="Line Length: 0.0, Angle: 0.0 degrees")
        self.line_info_label.pack(side=tk.RIGHT)
        
        # undo and redo
        
        self.line_history = []

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
        self.canvas.line = self.canvas.create_line(x, y, x, y, fill=self.line_color, width=self.pen_size_num)


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
            
            
            self.line_history.append((self.canvas.data[0], self.canvas.data[1], x, y, self.line_color, self.pen_size))
            new_line = self.canvas.create_line(self.canvas.data[0], self.canvas.data[1], x, y, self.line_color, self.pen_size)
            self.canvas.delete(new_line)


            # Calculate and display line length and angle
            length = math.sqrt((x - self.canvas.data[0])**2 + (y - self.canvas.data[1])**2)
            angle = math.degrees(math.atan2(self.canvas.data[1]-y, x-self.canvas.data[0]))
            
            angle = (angle+360)%360

            # Update the line info label
            self.line_info_label.config(text=f"Line Length: {length/20:.2f}, Angle: {angle:.2f} degrees")
            
            
    def clear_canvas(self):
        self.canvas.delete("all")
        self.create_grid()
        
    def update_pen_size(self, value):
        self.pen_size_num = int(value)
        
    def undo(self):
        if self.line_history:
            last_line = self.line_history.pop()
            self.canvas.delete(last_line)

    def redo(self):
        if self.redo_history:
            self.line_history.append(self.redo_history.pop())
            self.redraw_lines()
    
    def redraw_lines(self):
        # Clear the canvas
        self.canvas.delete("all")
        self.create_grid()

        # Redraw the lines from history
        for line_data in self.line_history:
            x1, y1, x2, y2, color, pen_size = line_data
            self.canvas.create_line(x1, y1, x2, y2, fill=color, width=pen_size)
        
    # Menu Items
    
    def exportToImage(self):

           file_path = filedialog.asksaveasfilename(defaultextension=".png", filetypes=[("PNG files", "*.png"), ("All files", "*.*")])
           
           if file_path:
                # Create an empty PIL image with the same size as the canvas
                image = Image.new("RGBA", (self.canvas.winfo_width(), self.canvas.winfo_height()), (255, 255, 255, 0))

                # Create a PIL Draw object to draw on the image
                draw = ImageDraw.Draw(image)

                # Redraw the lines from history on the image
                for line_data in self.line_history:
                    x1, y1, x2, y2, color, pen_size = line_data
                    draw.line([(x1, y1), (x2, y2)], fill=color, width=pen_size)

                # Save the image as a PNG file
                image.save(file_path, "PNG")


        
                
    def onExit(self):
        self.quit()
        

if __name__ == "__main__":
    app = GridDrawingApp()
    app.mainloop()
