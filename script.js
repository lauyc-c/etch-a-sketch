const boxLength = 16;

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
  
  const getPercentageOfContainer = (boxSize) => `${100 / boxSize}%`;

  box.style.flex = `0 0 calc(${getPercentageOfContainer(length)} - ${containerGap})`;

  box.classList.add("box");
}

function fillContainerWithBoxes(box, container, length) {
  if (!(box instanceof HTMLElement) || !(container instanceof HTMLElement)) {
    throw TypeError("Argument is not instance of HTMLElement.");
  }
  configureBoxStyle(box, container, length);

  const gridArea = length * length;

  for (let i = 0; i < gridArea; i++) {
    const dupBox = box.cloneNode();

    container.appendChild(dupBox);
  }
}

fillContainerWithBoxes(box, container, boxLength);

