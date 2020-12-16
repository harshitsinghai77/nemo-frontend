function getRandomColorChannel() {
  return Math.floor(Math.random() * 256);
}

function getRandomColor() {
  const red = getRandomColorChannel();
  const green = getRandomColorChannel();
  const blue = getRandomColorChannel();
  return `rgb(${red},${green},${blue})`;
}

function changeBackgroundColor() {
  const randomColor = getRandomColor();
  const dashboard = document.getElementById("#dashboard");

  if (dashboard) {
    dashboard.style.backgroundColor = randomColor;
  }
}

function setBackgroundChange() {
  changeBackgroundColor();
  setInterval(changeBackgroundColor, 10000);
}

function run() {
  setBackgroundChange();
}

run();
