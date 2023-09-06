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
    pixel.addEventListener("mouseenter", (e) => {
      fill(e, color);
    });
  });
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
// clear.addEventListener('mou')
