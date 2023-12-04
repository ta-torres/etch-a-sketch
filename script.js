document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('grid-container');
    const gridSizeButton = document.getElementById('grid-size-button');

    function createGrid(size) {
        container.textContent = ''; // Clear the previous grid
        const squareSize = 960 / size; // Calculate the size of each square
        for (let i = 0; i < size; i++) { // Create rows
            const row = document.createElement('div');
            row.classList.add('grid-row');
            for (let j = 0; j < size; j++) { // Create columns
                const square = document.createElement('div');
                square.classList.add('grid-square');
                square.style.height = `${squareSize}px`;
                row.appendChild(square); // Add the square to the row
            }
            container.appendChild(row); // Add the row to the grid
        }
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
