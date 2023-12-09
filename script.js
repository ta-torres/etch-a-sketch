document.addEventListener('DOMContentLoaded', () => {
    createGrid(16);
});

const container = document.getElementById('grid-container');
const gridSizeSlider = document.getElementById('grid-size-slider');
const gridSizeValue = document.getElementById('grid-size-value');
const resetButton = document.getElementById('reset-button');
const rainbowButton = document.getElementById('rainbow-button');
const eraseButton = document.getElementById('erase-button');
const colorPicker = document.getElementById('color-picker');
const saveColorButton = document.getElementById('save-color');

let currentColor = 'black';
let paletteColors = new Array(6).fill('#FFFFFF');
let isMouseDown = false;
let isRainbowActive = false;
let isEraseActive = false;

gridSizeSlider.addEventListener('input', changeGridSize);
resetButton.addEventListener('click', resetGrid);
rainbowButton.addEventListener('click', toggleRainbowEffect);
eraseButton.addEventListener('click', toggleEraseEffect);
saveColorButton.addEventListener('click', saveColorToPalette);
colorPicker.addEventListener('input', updateColorPicker);

function createGrid(gridSize) {
    container.textContent = ''; // Clear the previous grid

    const gridContainerStyle = getComputedStyle(container);
    const squareSize = parseInt(gridContainerStyle.height) / gridSize;

    for (let row = 0; row < gridSize; row++) { // Create rows
        let gridRow = createGridRow();

        for (let col = 0; col < gridSize; col++) { // Create columns
            let gridSquare = createGridSquare(squareSize);
            gridRow.appendChild(gridSquare); // Add the square to the row
        }
        container.appendChild(gridRow); // Add the row to the grid
    }
}

function createGridRow() {
    let row = document.createElement('div');
    row.classList.add = 'grid-row';
    return row;
}

function createGridSquare(size) {
    let square = document.createElement('div');
    square.classList.add('grid-square');
    square.style.height = `${size}px`;
    square.style.width = `${size}px`;
    return square;
}

container.addEventListener('mousedown', (square) => {
    square.preventDefault(); // Prevent grabbing behavior
    isMouseDown = true;
    applyColor(square);
});

container.addEventListener('mouseover', (square) => {
    if (isMouseDown) {
        applyColor(square);
    }
});

window.addEventListener('mouseup', () => {
    isMouseDown = false;
});

function applyColor(square) {
    if (square.target.classList.contains('grid-square')) {
        if (isRainbowActive) {
            square.target.style.backgroundColor = getRandomColor();
        }
        else if (isEraseActive) {
            square.target.style.backgroundColor = 'white';
        }
        else {
            square.target.style.backgroundColor = currentColor;
        }
    }
}

function changeGridSize() {
    const gridSize = gridSizeSlider.value;

    gridSizeSlider.onmousemove = () => {
        gridSizeValue.textContent = `${gridSize} x ${gridSize}`;
    };
    gridSizeSlider.onchange = () => {
        createGrid(gridSize);
    };
}

function resetGrid() {
    const gridSquare = document.querySelectorAll('.grid-square');
    gridSquare.forEach((square) => {
        square.style.backgroundColor = 'white';
    });
}

function toggleRainbowEffect() {
    isRainbowActive = !isRainbowActive;
    isEraseActive = false;
    eraseButton.classList.remove('button-active');

    if (isRainbowActive) {
        rainbowButton.classList.add('button-active');
    }
    else {
        rainbowButton.classList.remove('button-active');
    }
}

function getRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}

function toggleEraseEffect() {
    isEraseActive = !isEraseActive;
    isRainbowActive = false;
    rainbowButton.classList.remove('button-active');

    if (isEraseActive) {
        eraseButton.classList.add('button-active');
    }
    else {
        eraseButton.classList.remove('button-active');
    }
}

function updateColorPicker(event) {
    currentColor = event.target.value;
}

function updatePaletteDisplay() {
    paletteColors.forEach((color, index) => {
        const paletteDiv = document.getElementById(`palette-color-${index + 1}`);
        paletteDiv.style.backgroundColor = color;
    });
}
updatePaletteDisplay();

function saveColorToPalette() {
    // Find the first empty or undefined slot in the palette
    const emptyIndex = paletteColors.indexOf('#FFFFFF');
    if (emptyIndex !== -1) {
        // Save the current color to that slot
        paletteColors[emptyIndex] = currentColor;
        updatePaletteDisplay();
    }
}

// Add event listeners to the palette colors for selection
document.querySelectorAll('.palette-color').forEach((paletteDiv, index) => {
    paletteDiv.addEventListener('click', () => {
        currentColor = paletteColors[index]; // Update the current color with the selected palette color
    });
});
