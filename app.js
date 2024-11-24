let headTop = 5;
let headLeft = 5;
let foodY, foodX;
let direction = "right";
let intervalId = null;
let tails = [
  { x: 5, y: 5 },
  { x: 5, y: 6 },
];

let config = {
  size: 15,
  width: 45,
  height: 30,
};
let nextDirection = direction;
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    if (direction !== "down") {
      nextDirection = "up";
    }
  } else if (e.key === "ArrowDown") {
    if (direction !== "up") {
      nextDirection = "down";
    }
  } else if (e.key === "ArrowRight") {
    if (direction !== "left") {
      nextDirection = "right";
    }
  } else if (e.key === "ArrowLeft") {
    if (direction !== "right") {
      nextDirection = "left";
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
  console.log(e);
});

const boardEl = document.getElementById("board");

boardEl.style.width = config.width * config.size + "px";
boardEl.style.height = config.height * config.size + "px";

// console.log(foodX, foodY);
function changeDirection(newDirection) {
  if (direction === "up" || direction === "down") {
    if (newDirection === "right" || newDirection === "left") {
      nextDirection = newDirection;
    }
  } else if (direction === "right" || direction === "left") {
    if (newDirection === "up" || newDirection === "down") {
      nextDirection = newDirection;
    }
  }
}
function start() {
  // headTop = 10;
  // headLeft = 12;
  // direction = "up";
  if (!intervalId) {
    intervalId = setInterval(gameLoop, 100);
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
  direction = "right";
  tails = [
    { x: 5, y: 5 },
    { x: 5, y: 6 },
  ];
  render();
}
function moveSnake() {
  switch (nextDirection) {
    case "up":
      headTop--;
      break;
    case "down":
      headTop++;
      break;
    case "left":
      headLeft--;
      break;
    case "right":
      headLeft++;
      break;
  }
  if (
    headTop < 0 ||
    headTop >= config.height ||
    headLeft < 0 ||
    headLeft >= config.width
  ) {
    alert("ur dead");
    restartGame();
  }
}

function gameLoop() {
  moveSnake();

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

  // switch (nextDirection) {
  //   case "up":
  //     goUp();
  //     break;
  //   case "right":
  //     goRight();
  //     break;
  //   case "down":
  //     goDown();
  //     break;
  //   case "left":
  //     goLeft();
  //     break;
  // }

  direction = nextDirection;
  render();
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

// render();
