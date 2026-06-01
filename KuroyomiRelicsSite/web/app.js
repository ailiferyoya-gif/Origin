const relics = [
  { file: "obsidian-box.png", name: "OBSIDIAN BOX" },
  { file: "mask-fragment.png", name: "MASK FRAGMENT" },
  { file: "brass-key.png", name: "BREATHING KEY" },
  { file: "black-perfume.png", name: "RED NIGHT VESSEL" }
];

const stageImages = [...document.querySelectorAll(".stage-image")];
const stageNumber = document.querySelector("#stageNumber");
const stageName = document.querySelector("#stageName");
const modal = document.querySelector("#imageModal");
const modalImage = modal.querySelector("img");
let activeIndex = 0;

function setActiveRelic(index) {
  activeIndex = index % relics.length;
  stageImages.forEach((image, imageIndex) => {
    image.classList.toggle("active", imageIndex === activeIndex);
  });
  stageNumber.textContent = String(activeIndex + 1).padStart(2, "0");
  stageName.textContent = relics[activeIndex].name;
}

setInterval(() => {
  setActiveRelic(activeIndex + 1);
}, 5200);

document.querySelectorAll("[data-open]").forEach((button) => {
  button.addEventListener("click", () => {
    const file = button.dataset.open;
    const label = button.dataset.label || "Obsidian Box";
    modalImage.src = `./assets/${file}`;
    modalImage.alt = `${label} enlarged`;
    modal.showModal();
  });
});

document.querySelector("[data-close]").addEventListener("click", () => modal.close());

document.querySelector(".contact button").addEventListener("click", () => {
  const button = document.querySelector(".contact button");
  button.textContent = "Sealed";
  window.setTimeout(() => {
    button.textContent = "Seal Inquiry";
  }, 1800);
});
