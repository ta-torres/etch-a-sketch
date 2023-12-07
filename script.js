document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('grid-container');
    const gridSizeButton = document.getElementById('grid-size-button');

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

    function changeColor(hoveredSquare) {
        if (hoveredSquare.target.classList.contains('grid-square')) {
            hoveredSquare.target.style.backgroundColor = 'black';
        }
    }

    container.addEventListener('mouseover', changeColor);

    gridSizeButton.addEventListener('click', () => {
        let size = prompt('Enter new grid size (max 100):');
        size = Math.min(100, Math.abs(parseInt(size)));
        if (!isNaN(size)) {
            createGrid(size);
        }
    });

    const resetButton = document.getElementById('reset-button');
    const rainbowButton = document.getElementById('rainbow-button');


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
        } else {
            container.addEventListener('mouseover', changeColorRainbow);
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

    createGrid(16);
});
