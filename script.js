let board = document.querySelector(".board");
let adjustments = document.querySelector(".adjustments");
let length = 16;
let colorPicker = document.createElement("input");
colorPicker.setAttribute("type", "color");
let eraser = document.createElement("button");
eraser.textContent = "Eraser";
let rainbow = document.createElement("button");
rainbow.textContent = "Rainbow";
let shading = document.createElement("button");
shading.textContent = "Shading";
let clear = document.createElement("button");
clear.textContent = "Clear";
let slider = document.createElement("input");
slider.setAttribute("type", "range");
slider.setAttribute("min", 3);
slider.setAttribute("max", 100);
slider.setAttribute("value", length);
let dimensions = document.createElement("div");
dimensions.textContent = `${slider.value} X ${slider.value}`;
dimensions.classList.add("dimensions");
let grid = document.createElement("button");
grid.textContent = "Grid Lines";
grid.classList.add("lines");

adjustments.appendChild(colorPicker);
adjustments.appendChild(eraser);
adjustments.appendChild(rainbow);
adjustments.appendChild(shading);
adjustments.appendChild(clear);
adjustments.appendChild(slider);
adjustments.appendChild(dimensions);
adjustments.appendChild(grid);

function render(length) {
  board.innerHTML = "";
  let divs = new Array(length);
  for (let i = 0; i < length; i++) {
    divs[i] = new Array(length);
  }
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      divs[i][j] = document.createElement("div");
      divs[i][j].classList.add("pixel");
      divs[i][j].classList.add("border");
      divs[i][j].style.backgroundColor = "#ffffff";
      board.appendChild(divs[i][j]);
    }
  }
  board.setAttribute("style", `grid-template-columns:repeat(${length},1fr)`);
  let pixels = document.querySelectorAll(".pixel");
  paint(pixels);
  return pixels;
}

function fill(e, color) {
  let caller = e.target;
  caller.style.backgroundColor = color;
}

function paint(pixels) {
  pixels.forEach((pixel) => {
    pixel.addEventListener("mouseover", (e) => {
      if (eraser.classList.contains("active")) {
        fill(e, "#ffffff");
      } else if (rainbow.classList.contains("active")) {
        fill(e, getHex());
      } else if (shading.classList.contains("active")) {
        fill(e, addShadow(e.target.style.backgroundColor));
      } else {
        fill(e, color);
      }
    });
  });
}

function addShadow(color) {
  color = color.substring(4);
  color = color.substring(0, color.length - 1);
  let colors = color.split(",");

  let red = colors[0];
  let green = colors[1];
  let blue = colors[2];

  red = parseInt(red);
  green = parseInt(green);
  blue = parseInt(blue);

  red = red - 256 * 0.1;
  green = green - 256 * 0.1;
  blue = blue - 256 * 0.1;

  if (red < 0) red = 0;
  if (green < 0) green = 0;
  if (blue < 0) blue = 0;

  color = `rgb(${red},${green},${blue})`;

  return color;
}

function getHex() {
  let num;
  let hex = "#";
  for (let i = 0; i < 6; i++) {
    num = Math.floor(Math.random() * 16 + 0.7);
    hex += num.toString(16);
  }
  return hex;
}

let pixels = render(length);
let color = colorPicker.value;
slider.addEventListener("change", () => {
  length = Number(slider.value);
  dimensions.textContent = `${slider.value} X ${slider.value}`;
  pixels = render(length);
  if (grid.classList.contains("lines")) return;
  grid.classList.add("lines");
  board.classList.remove("outline");
});
grid.addEventListener("click", () => {
  grid.classList.toggle("lines");
  pixels.forEach((pixel) => pixel.classList.toggle("border"));
  board.classList.toggle("outline");
});
clear.addEventListener("click", () => {
  pixels.forEach((pixel) => {
    pixel.style.backgroundColor = "white";
  });
});
colorPicker.addEventListener("change", () => (color = colorPicker.value));
eraser.addEventListener("click", () => {
  rainbow.classList.remove("active");
  shading.classList.remove("active");
  eraser.classList.toggle("active");
});
rainbow.addEventListener("click", () => {
  eraser.classList.remove("active");
  shading.classList.remove("active");
  rainbow.classList.toggle("active");
});
shading.addEventListener("click", () => {
  rainbow.classList.remove("active");
  eraser.classList.remove("active");
  shading.classList.toggle("active");
});
