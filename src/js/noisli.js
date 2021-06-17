var background_interval;

function getRandomColorChannel() {
  return Math.floor(Math.random() * 256);
}

function getRandomColor() {
  const red = getRandomColorChannel();
  const green = getRandomColorChannel();
  const blue = getRandomColorChannel();
  return `rgb(${red},${green},${blue})`;
}

function changeBackgroundColor(color) {
  const dashboardElement = document.getElementById("#dashboard");
  if (dashboardElement) {
    dashboardElement.style.backgroundColor = color;
  }
}

function setRandomColor() {
  const randomColor = getRandomColor();
  changeBackgroundColor(randomColor);
}

function randomColor() {
  changeBackgroundColor("rgb(92, 229, 180)");
  background_interval = setInterval(setRandomColor, 10000);
}

export function run(currentColor) {
  if (currentColor === "rainbow") {
    randomColor();
  } else {
    clearInterval(background_interval);
    background_interval = setInterval(() => {
      changeBackgroundColor(currentColor);
    }, 10000);
  }
}
