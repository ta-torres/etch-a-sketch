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
    
    createGrid(16);
});
