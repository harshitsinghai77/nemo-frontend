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

function randomColor(shuffleTime) {
  changeBackgroundColor("rgb(92, 229, 180)");
  background_interval = setInterval(setRandomColor, shuffleTime);
}

export function run(currentColor, shuffle) {
  let shuffleTime = shuffle > 4 ? shuffle : 10;
  shuffleTime = shuffleTime * 1000;
  if (currentColor === "rainbow") {
    if (background_interval) clearInterval(background_interval);
    randomColor(shuffleTime);
  } else {
    clearInterval(background_interval);
    background_interval = setInterval(() => {
      changeBackgroundColor(currentColor);
    }, 10000);
  }
}
