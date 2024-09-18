const boardDimmension = 8;
const canvasSize = 500;
const winDimmension = 4;
const players = 3;

//const gravity = 1; //todo to make connect four
//-------------

let turn = 0;
let won = 0;
const squareDimmension = canvasSize / boardDimmension;
const boardSquares = boardDimmension * boardDimmension;
const colors = ["white", "blue", "green", "yellow", "purple", "orange"]; //max 5 players
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
  for (let i = 0; i < boardSquares; i++) {
    const square = data[i];
    if (square.color === 0) {
      continue;
    }
    const x = square.x;
    const y = square.y;
    const color = square.color;
    const directions = [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: -1 },
    ];
    for (let j = 0; j < directions.length; j++) {
      const direction = directions[j];
      let count = 1;
      let wonSquares = [];
      wonSquares.push(i);
      for (let k = 1; k < winDimmension; k++) {
        const newX = x + k * direction.x;
        const newY = y + k * direction.y;
        if (
          newX >= 0 &&
          newX < boardDimmension &&
          newY >= 0 &&
          newY < boardDimmension
        ) {
          const index = newY * boardDimmension + newX;
          if (data[index].color === color) {
            wonSquares.push(index);
            count++;
          } else {
            break;
          }
        } else {
          break;
        }
      }
      for (let k = 1; k < winDimmension; k++) {
        const newX = x - k * direction.x;
        const newY = y - k * direction.y;
        if (
          newX >= 0 &&
          newX < boardDimmension &&
          newY >= 0 &&
          newY < boardDimmension
        ) {
          const index = newY * boardDimmension + newX;
          if (data[index].color === color) {
            wonSquares.push(index);
            count++;
          } else {
            break;
          }
        } else {
          break;
        }
      }
      if (count >= winDimmension) {
        won = color;
        fill(colors[won]);
        stroke("black");
        strokeWeight(6);
        for (let k = 0; k < wonSquares.length; k++) {
          rect(
            (wonSquares[k] % boardDimmension) * squareDimmension,
            Math.floor(wonSquares[k] / boardDimmension) * squareDimmension,
            squareDimmension,
            squareDimmension
          );
        }
        strokeWeight(1);
        console.log("Player " + won + " won");
        return;
      }
    }
  }
}

function setup() {
  createCanvas(500, 500);
  background(0);
}

function mousePressed() {
  if (!won) {
    const x = Math.floor(mouseX / squareDimmension);
    const y = Math.floor(mouseY / squareDimmension);
    const index = y * boardDimmension + x;
    if (index >= 0 && index < boardSquares && x >= 0 && x < boardDimmension) {
      if (data[index].color === 0) {
        data[index].color = turn + 1;
        turn = (turn + 1) % players;
      }
    }
    checkWin();
  }
}

function checkMouseOver() {
  const x = Math.floor(mouseX / squareDimmension);
  const y = Math.floor(mouseY / squareDimmension);
  const index = y * boardDimmension + x;
  if (index >= 0 && index < boardSquares && x >= 0 && x < boardDimmension) {
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
  if (!won) {
    drawBoard();
    checkMouseOver();
  }
}
