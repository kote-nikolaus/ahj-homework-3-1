/* eslint-disable no-alert */
/* eslint-disable no-plusplus */

const columns = 4;
let goblinIsAlive = false;
const dead = document.getElementById('dead');
const lost = document.getElementById('lost');

function drawField(rows) {
  const container = document.getElementById('game-container');
  for (let i = 0; i < rows * rows; i += 1) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.id = `cell-${i + 1}`;
    container.appendChild(cell);
  }
  container.style.gridTemplateColumns = `repeat(${rows}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
}

function placeGoblin() {
  if (goblinIsAlive) {
    lost.textContent++;
  }
  if (Number(dead.textContent) === 10) {
    alert('Вы выиграли!');
    dead.textContent = 0;
    lost.textContent = 0;
  } else if (Number(lost.textContent) === 5) {
    alert('Вы проиграли :(');
    dead.textContent = 0;
    lost.textContent = 0;
  }
  const cells = Array.from(document.getElementsByClassName('cell'));
  const newActiveCellIndex = Math.floor(Math.random() * Math.floor(columns * columns));
  const activeCell = document.getElementsByClassName('cell-with-goblin')[0];
  if (activeCell) {
    activeCell.classList.remove('cell-with-goblin');
  }
  cells[newActiveCellIndex].classList.add('cell-with-goblin');
  goblinIsAlive = true;
}

drawField(columns);
setInterval(placeGoblin, 1000);

function countDeaths() {
  if (this.className.includes('cell-with-goblin')) {
    this.classList.remove('cell-with-goblin');
    dead.textContent++;
    goblinIsAlive = false;
  } else {
    lost.textContent++;
  }
}

function getHole(index) {
  return document.getElementById(`cell-${index}`);
}

for (let i = 1; i < 17; i += 1) {
  getHole(i).onclick = countDeaths;
}
