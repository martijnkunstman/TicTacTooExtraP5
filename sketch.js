let boardDimmension = 7;
let winDimmension = 4;
let players = 2;

let boardDimmensionSlider;
let winDimmensionSlider;
let playersSlider;

//const gravity = 1; //todo to make connect four
//-------------

let canvasSize = 500;
let turn = 0;
let won = 0;
let squareDimmension = canvasSize / boardDimmension;
let boardSquares = boardDimmension * boardDimmension;
let colors = ["white", "blue", "red", "yellow", "purple", "orange", "green"];
let data = [];

function setup() {
  createCanvas(canvasSize * 2, canvasSize);
  boardDimmensionSlider = createSlider(5, 11, 7, 1);
  boardDimmensionSlider.position(canvasSize + 20, 20);
  boardDimmensionSlider.size(100);
  boardDimmensionSlider.input(updateBoardDimmensions);

  winDimmensionSlider = createSlider(3, 5, 4, 1);
  winDimmensionSlider.position(canvasSize + 20, 50);
  winDimmensionSlider.size(100);
  winDimmensionSlider.input(updateWinDimmension);

  playersSlider = createSlider(2, 6, 2, 1);
  playersSlider.position(canvasSize + 20, 80);
  playersSlider.size(100);
  playersSlider.input(updatePlayers);

  background(0);
  init();
}

function drawTextBySlider() {
  fill("white");
  textSize(20);
  text(
    "Board Dimmension = " + boardDimmensionSlider.value(),
    canvasSize + 140,
    30
  );
  text("Win Dimmension= " + winDimmensionSlider.value(), canvasSize + 140, 60);
  text("Players = " + playersSlider.value(), canvasSize + 140, 90);
}

function updateBoardDimmensions() {
  init();
}
function updateWinDimmension() {
  init();
}
function updatePlayers() {
  init();
}

function init() {
  boardDimmension = boardDimmensionSlider.value();
  winDimmension = winDimmensionSlider.value();
  players = playersSlider.value();
  turn = 0;
  won = 0;
  squareDimmension = canvasSize / boardDimmension;
  boardSquares = boardDimmension * boardDimmension;
  data = [];
  for (let i = 0; i < boardSquares; i++) {
    data.push({
      x: i % boardDimmension,
      y: Math.floor(i / boardDimmension),
      color: 0,
    });
  }
}

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
        text("Player " + won + " won", canvasSize + 20, 120);
        console.log("Player " + won + " won");
        return;
      }
    }
  }
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
    background(0);
    drawTextBySlider();
    drawBoard();
    checkMouseOver();
  }
}
