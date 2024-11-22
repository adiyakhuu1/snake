let headTop = 5;
let headLeft = 5;
let foodY, foodX;
let direction = "up";
let intervalId = null;
let tails = [
  { x: 5, y: 5 },
  { x: 5, y: 6 },
];

let config = {
  size: 20,
  width: 20,
  height: 20,
};

const boardEl = document.getElementById("board");

boardEl.style.width = config.width * config.size + "px";
boardEl.style.height = config.height * config.size + "px";

// console.log(foodX, foodY);
function changeDirection(newDirection) {
  if (direction === "up" || direction === "down") {
    if (newDirection === "right" || newDirection === "left") {
      direction = newDirection;
    }
  } else if (direction === "right" || direction === "left") {
    if (newDirection === "up" || newDirection === "down") {
      direction = newDirection;
    }
  }
}
function start() {
  // headTop = 10;
  // headLeft = 12;
  // direction = "up";
  if (!intervalId) {
    intervalId = setInterval(gameLoop, 300);
  }
}
function pause() {
  clearInterval(intervalId);
  intervalId = null;
}
function restartGame() {
  generateFoods();
  headTop = 5;
  headLeft = 5;
  direction = "up";
  tails = [
    { x: 5, y: 5 },
    { x: 5, y: 6 },
  ];
}
function goUp() {
  headTop = headTop - 1;
  if (headTop < 0) {
    alert("ur dead");
    restartGame();
  }
  render();
}

function goDown() {
  headTop = headTop + 1;
  if (headTop >= config.height) {
    alert("ur dead");
    restartGame();
  }
  render();
}
function goRight() {
  headLeft = headLeft + 1;
  if (headLeft >= config.width) {
    alert("ur dead");
    restartGame();
  }
  render();
}

function goLeft() {
  headLeft = headLeft - 1;
  if (headLeft < -1) {
    // headLeft = config.width - 1;
    alert("ur dead");
    restartGame();
  }
  render();
}

function gameLoop() {
  // render();

  for (let i = 0; i < tails.length; i++) {
    if (headTop === tails[i].y && headLeft === tails[i].x) {
      // alert("ur dead");
      restartGame();
    }
  }

  tails.push({ x: headLeft, y: headTop });
  tails.shift();

  if (headTop == foodY && headLeft == foodX) {
    console.log("ate food");
    tails.push({ x: headLeft, y: headTop });
    generateFoods();
  }

  switch (direction) {
    case "up":
      goUp();
      break;
    case "right":
      goRight();
      break;
    case "down":
      goDown();
      break;
    case "left":
      goLeft();
      break;
  }
}
function generateFoods() {
  foodX = Math.floor(Math.random() * config.width);
  foodY = Math.floor(Math.random() * config.height);
  // console.log(foodX, foodY);
  return foodX, foodY;
}
console.log(foodX, foodY);
function render() {
  let tailHTML = ``;
  for (let i = 0; i < tails.length; i++) {
    tailHTML += `
        <div class="snake" style="width: ${1 * config.size}px; height: ${
      1 * config.size
    }px; top: ${tails[i].y * config.size}px; left: ${
      tails[i].x * config.size
    }px"></div>
      `;
  }
  let foods = `<div class="food" style="width: ${1 * config.size}px; height: ${
    1 * config.size
  }px; top: ${foodY * config.size}px; left: ${foodX * config.size}px"></div>`;
  const snakeHtml = `${tailHTML} ${foods}`;
  boardEl.innerHTML = snakeHtml;
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    if (direction !== "down") {
      direction = "up";
    }
  } else if (e.key === "ArrowDown") {
    if (direction !== "up") {
      direction = "down";
    }
  } else if (e.key === "ArrowRight") {
    if (direction !== "left") {
      direction = "right";
    }
  } else if (e.key === "ArrowLeft") {
    if (direction !== "right") {
      direction = "left";
    }
  }

  // console.log(e);
  if (e.code === "Space") {
    if (intervalId) {
      pause();
    } else {
      start();
    }
  }
});
// render();
