var containerWidth = 500;
var defaultBlocksPerRow = 20;
var blocksPerRow = defaultBlocksPerRow;
var colorPercentChange = .05;
var colorChange = 255*colorPercentChange;

function reset() {
    document.querySelector('div.block-container').innerHTML = "";
    blocksPerRow= Number(prompt(`How many blocks per row?`, defaultBlocksPerRow));
    while (isNaN(blocksPerRow) || blocksPerRow > 100 || blocksPerRow < 1){
        blocksPerRow = prompt(`Must be between 1 and 100`, 100);
    }
    createGrid(blocksPerRow);
}

function createGrid(blocksPerRow) {
    var blockContainer = document.querySelector('div.block-container');
    var block;
    for (var i = 0; i < blocksPerRow * blocksPerRow; i++) {
        block = document.createElement('div');
        block.classList.add('block');
        block.setAttribute('data-key', i);
        block.style.width = `${containerWidth / blocksPerRow}px`;
        block.style.height = `${containerWidth / blocksPerRow}px`;
        block.style.backgroundColor = `#FFFFFF`;
        block.addEventListener('click', (e) => changeColor(e));
        block.addEventListener('mouseenter', (e) => {
            if (e.buttons == 1) {
                changeColor(e);
            }
        })
        blockContainer.appendChild(block);
    }
}

function changeColor(e) {
    var color = e.target.style.backgroundColor;
    var parsedColor = color.substring(4, color.length - 1)
        .replace(/ /g, '')
        .split(',');
    e.target.style.backgroundColor = `rgb(${parsedColor[0]-colorChange}, ${parsedColor[1]-colorChange}, ${parsedColor[2]-colorChange})`;
}

var container = document.querySelector('div.container');

var titleContainer = document.createElement('div');
titleContainer.classList.add('title-container');

titleContainer.innerHTML = `Etch-A-Sketch<br>`;

var button = document.createElement('input');
button.type = 'button';
button.value = 'reset';
button.onclick = reset;
titleContainer.appendChild(button);

container.appendChild(titleContainer);


var blockContainer = document.createElement('div');
blockContainer.classList.add('block-container');
blockContainer.style.width = `${containerWidth}px`;
container.appendChild(blockContainer);

createGrid(blocksPerRow);