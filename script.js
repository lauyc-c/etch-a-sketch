let boxLength = 16;

const root = document.querySelector(":root");
const box = document.createElement("div");
const container = document.querySelector("#container");

function configureBoxStyle(box, container, length) {
  if (!(box instanceof HTMLElement) || !(container instanceof HTMLElement)) {
    throw TypeError("Argument is not instance of HTMLElement.");
  }

  const containerStyles = getComputedStyle(container);

  const containerHeight = containerStyles.height;
  const containerWidth = containerStyles.width;
  const containerGap = containerStyles.gap;

  box.style.height = `calc(${containerHeight} / ${length})`;
  box.style.width = `calc(${containerWidth} / ${length})`;
  box.style.opacity = 0;
  
  const getPercentageOfContainer = (boxSize) => `${100 / boxSize}%`;

  box.style.flex = `0 0 calc(${getPercentageOfContainer(length)} - ${containerGap})`;

  box.classList.add("box");
}

function emptyAndFillContainerWithBoxes(box, container, length) {
  if (!(box instanceof HTMLElement) || !(container instanceof HTMLElement)) {
    throw TypeError("Argument is not instance of HTMLElement.");
  }
  container.replaceChildren();

  configureBoxStyle(box, container, length);

  const gridArea = length * length;

  for (let i = 0; i < gridArea; i++) {
    const dupBox = box.cloneNode();
    dupBox.addEventListener("mouseenter", (e) => {
      if (Number(dupBox.style.opacity) < 1) {
        dupBox.style.opacity = Number(e.target.style.opacity) + 0.1;
      }
      dupBox.style.backgroundColor = getRandomRGB();
    });

    container.appendChild(dupBox);
  }
}

function getRandomRGB() {
  return `rgb(${randomizeColorIndex()} ${randomizeColorIndex()} ${randomizeColorIndex()})`;
}

function randomizeColorIndex() {
  return Math.floor(256 * Math.random());
}

emptyAndFillContainerWithBoxes(box, container, boxLength);

const changeDensityButton = document.querySelector("button#density-changer");
changeDensityButton.addEventListener("click", () => {
  let gridLength = boxLength;
  do {
    gridLength = prompt("Change the number of grids per side between 1 and 100: ", gridLength);
    if (gridLength === null) return;
  } while (Number(gridLength) < 1 || Number(gridLength) > 100);
  emptyAndFillContainerWithBoxes(box, container, Number(gridLength));
  boxLength = gridLength;
});
