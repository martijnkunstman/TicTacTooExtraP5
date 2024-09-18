const boardDimmension = 8;
const canvasSize = 500;
const winDimmension = 4;
const players = 3;

//const gravity = 1; //todo to make connect four
//-------------

let turn = 0;
const squareDimmension = canvasSize / boardDimmension;
const boardSquares = boardDimmension * boardDimmension;
const colors = ["white", "blue", "green", "yellow", "purple", "orange"];
let data = [];
for (let i = 0; i < boardSquares; i++) {
  data.push({
    x: i % boardDimmension,
    y: Math.floor(i / boardDimmension),
    color: 0,
  });
}

console.log(data);

function drawBoard() {
  data.forEach((square, index) => {
    fill(colors[square.color]);
    rect(
      square.x * squareDimmension,
      square.y * squareDimmension,
      squareDimmension,
      squareDimmension
    );
  });
}

function checkWin() {
  //check all squares and their winDimmension neighbors
  
}

function setup() {
  createCanvas(500, 500);
  background(0);
}

function mousePressed() {
  const x = Math.floor(mouseX / squareDimmension);
  const y = Math.floor(mouseY / squareDimmension);
  const index = y * boardDimmension + x;
  if (index >= 0 && index < boardSquares) {
    if (data[index].color === 0) {
      data[index].color = turn + 1;
      turn = (turn + 1) % players;
    }
  }
  checkWin();
}

function checkMouseOver() {
  const x = Math.floor(mouseX / squareDimmension);
  const y = Math.floor(mouseY / squareDimmension);
  const index = y * boardDimmension + x;
  if (index >= 0 && index < boardSquares) {
    if (data[index].color === 0) {
      fill(color("rgba(0, 0, 0, 0.2)"));
      stroke("black");
      strokeWeight(3);
      rect(
        x * squareDimmension,
        y * squareDimmension,
        squareDimmension,
        squareDimmension
      );
      strokeWeight(1);
    }
  }
}

function draw() {
  drawBoard();
  checkMouseOver();
}
