document.addEventListener('DOMContentLoaded', () => {
    createGrid(16);
});

const container = document.getElementById('grid-container');
const gridSizeButton = document.getElementById('grid-size-button');
const resetButton = document.getElementById('reset-button');
const rainbowButton = document.getElementById('rainbow-button');
const eraseButton = document.getElementById('erase-button');
const colorPicker = document.getElementById('color-picker');
const saveColorButton = document.getElementById('save-color');

let currentColor = 'black';
let paletteColors = new Array(6).fill('#FFFFFF');
let isMouseDown = false;

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

container.addEventListener('mouseup', () => {
    isMouseDown = false;
});

function applyColor(square) {
    if (square.target.classList.contains('grid-square')) {
        square.target.style.backgroundColor = currentColor;
    }
}

gridSizeButton.addEventListener('click', () => {
    let size = prompt('Enter new grid size (max 100):');
    size = Math.min(100, Math.abs(parseInt(size)));
    if (!isNaN(size)) {
        createGrid(size);
    }
});

resetButton.addEventListener('click', () => {
    const gridSquare = document.querySelectorAll('.grid-square');
    gridSquare.forEach((square) => {
        square.style.backgroundColor = 'white';
    });
});

rainbowButton.addEventListener('click', toggleRainbowEffect);

function toggleRainbowEffect() {
    const isRainbowActive = container.dataset.isRainbowActive === 'true';
    container.dataset.isRainbowActive = !isRainbowActive;

    if (isRainbowActive) {
        container.removeEventListener('mouseover', changeColorRainbow);
        rainbowButton.classList.remove('button-active');
    } else {
        container.addEventListener('mouseover', changeColorRainbow);
        rainbowButton.classList.add('button-active');
    }
}

function changeColorRainbow(square) {
    if (square.target.classList.contains('grid-square')) {
        square.target.style.backgroundColor = getRandomColor();
    }
}

function getRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}

eraseButton.addEventListener('click', () => {
    const isEraserActive = container.dataset.isEraserActive === 'true';
    container.dataset.isEraserActive = !isEraserActive;

    if (isEraserActive) {
        container.removeEventListener('mouseover', eraseColor);
        eraseButton.classList.remove('button-active');
    } else {
        container.addEventListener('mouseover', eraseColor);
        eraseButton.classList.add('button-active');
    }
});

function eraseColor(event) {
    if (event.target.classList.contains('grid-square')) {
        event.target.style.backgroundColor = 'white';
    }
}

colorPicker.addEventListener('input', (event) => {
    // Update currentColor with the selected color value
    currentColor = event.target.value;
});

function updatePaletteDisplay() {
    paletteColors.forEach((color, index) => {
        const paletteDiv = document.getElementById(`palette-color-${index + 1}`);
        paletteDiv.style.backgroundColor = color;
    });
}
updatePaletteDisplay();

saveColorButton.addEventListener('click', () => {
    // Find the first empty or undefined slot in the palette
    const emptyIndex = paletteColors.indexOf('#FFFFFF');
    if (emptyIndex !== -1) {
        // Save the current color to that slot
        paletteColors[emptyIndex] = currentColor;
        updatePaletteDisplay();
    }
});

// Add event listeners to the palette colors for selection
document.querySelectorAll('.palette-color').forEach((paletteDiv, index) => {
    paletteDiv.addEventListener('click', () => {
        currentColor = paletteColors[index]; // Update the current color with the selected palette color
    });
});
