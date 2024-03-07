// Function to generate a random integer within a range
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Function to create a block element
function createBlock(className, top, left, width, height) {
    const block = document.createElement('div');
    block.className = 'block ' + className;
    block.style.top = top + 'px';
    block.style.left = left + 'px';
    block.style.width = width + 'px';
    block.style.height = height + 'px';
    block.style.border = '3px solid black'; // Border styling
    document.getElementById('mondrian').appendChild(block);
}

// Function to generate a Mondrian
function createMondrian() {
    const mondrianContainer = document.getElementById('mondrian');
    const mondrianWidth = mondrianContainer.offsetWidth - 12;
    const mondrianHeight = mondrianContainer.offsetHeight - 12;

    // Clear previous Mondrian
    mondrianContainer.innerHTML = '';

    // Function to recursively create blocks to fill the container
    function fillContainer(x, y, w, h, depth) {
        // Base case: if the depth is 0 or the width or height is less than 50, don't create more blocks
        if (depth === 0 || w < 50 || h < 50) return;

        // Generate random split points
        const splitX = randomInt(x + 50, x + w - 50);
        const splitY = randomInt(y + 50, y + h - 50);

        // Create blocks based on splits
        createBlock('red', y, x, splitX - x, splitY - y);
        createBlock('blue', y, splitX, x + w - splitX, splitY - y);
        createBlock('yellow', splitY, x, splitX - x, y + h - splitY);
        createBlock('white', splitY, splitX, x + w - splitX, y + h - splitY);

        // Recursively fill subcontainers with reduced depth
        fillContainer(x, y, splitX - x, splitY - y, depth - 1);
        fillContainer(splitX, y, x + w - splitX, splitY - y, depth - 1);
        fillContainer(x, splitY, splitX - x, y + h - splitY, depth - 1);
        fillContainer(splitX, splitY, x + w - splitX, y + h - splitY, depth - 1);
    }

    // Start filling the container from the top-left corner with a maximum depth of 5
    fillContainer(0, 0, mondrianWidth, mondrianHeight, 20);
}

// Generate Mondrian every 5 seconds
setInterval(createMondrian, 1000);

// Generate Mondrian when the page loads
window.onload = createMondrian;
