const modal = document.querySelector("#imageModal");
const modalImage = modal.querySelector("img");

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
