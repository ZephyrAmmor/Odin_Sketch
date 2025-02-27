// Store all input values in variables
let gridSize = document.getElementById("grid");
let color = document.getElementById("color");
let eraser = document.getElementById("eraser");
let clear = document.getElementById("clear");
let save = document.getElementById("save");
let rainbow = document.getElementById("rainbow");
let sketch = document.getElementById("Sketch");
let toggle = document.getElementById("toggle");
let mode = 'draw';
let body = document.querySelector("body");

// Toggle dark mode
function togglePage() {
    if (body.style.background != 'gray'){
        body.style.background = 'gray';
    }
    else{
        body.style.background = 'white';
    }
}

// Create grid
function createGrid(size) {
    sketch.innerHTML = ""; // Clear previous grid
    sketch.style.display = "grid";
    sketch.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    sketch.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    
    for (let i = 0; i < size * size; i++) {
        const div = document.createElement("div");
        div.style.width = `${800 / size}px`;
        div.style.height = `${500 / size}px`;
        div.classList.add("grid");
        sketch.appendChild(div);
    }
    draw(); // Apply event listeners to new cells
}

// Draw on the grid
function draw() {
    let cells = document.querySelectorAll("#Sketch div");
    cells.forEach(cell => {
        cell.addEventListener('mouseover', function () {
            if (mode === 'eraser') {
                cell.style.backgroundColor = ""; // Clear color
            } else if (mode === 'rainbow') {
                cell.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
            } else {
                cell.style.backgroundColor = color.value;
            }
        });
    });
}


toggle.addEventListener('click', togglePage);
// Set eraser mode
function eraserMode() {
    mode = 'eraser';
}

eraser.addEventListener('click', eraserMode);

// Set draw mode
color.addEventListener('input', function () {
    mode = 'draw';
});

// Clear grid
clear.addEventListener('click', function () {
    let cells = document.querySelectorAll("#Sketch div");
    cells.forEach(cell => cell.style.backgroundColor = "");
});

// Enable rainbow mode
rainbow.addEventListener('click', function () {
    mode = 'rainbow';
});

// Initialize grid
createGrid(gridSize.value);

// Update grid size when user changes the value
gridSize.addEventListener('change', function () {
    createGrid(gridSize.value);
});
