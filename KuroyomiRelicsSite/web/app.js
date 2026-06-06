const relics = [
  {
    title: "Obsidian Box",
    copy: "赤い継ぎ目から、見覚えのない部屋の夜だけが漏れている。",
    code: "KRY-00",
    state: "SEALED",
    file: "obsidian-box.png"
  },
  {
    title: "Mask Fragment",
    copy: "嘘を言う声のそばで、ひび割れだけが先に返事をする。",
    code: "KRY-13",
    state: "AWAKE",
    file: "mask-fragment.png"
  },
  {
    title: "Breathing Key",
    copy: "閉じた部屋の内側にだけ、水滴を生む古い鍵。",
    code: "KRY-21",
    state: "LOCKED",
    file: "brass-key.png"
  },
  {
    title: "Red Night Vessel",
    copy: "一滴で、忘れた部屋の匂いが戻ってくる。",
    code: "KRY-34",
    state: "VOLATILE",
    file: "black-perfume.png"
  }
];

const frames = [...document.querySelectorAll(".relic-frame")];
const thumbs = [...document.querySelectorAll(".thumb")];
const title = document.querySelector("#relicTitle");
const copy = document.querySelector("#relicCopy");
const number = document.querySelector("#relicNumber");
const code = document.querySelector("#relicCode");
const state = document.querySelector("#relicState");
const inspect = document.querySelector("#inspectButton");
const modal = document.querySelector("#imageModal");
const modalImage = modal.querySelector("img");
let active = 0;

function animateText(target, value) {
  anime({
    targets: target,
    opacity: [0, 1],
    translateY: [12, 0],
    easing: "easeOutCubic",
    duration: 520,
    begin: () => {
      target.textContent = value;
    }
  });
}

function setRelic(index) {
  if (index === active && frames[index].classList.contains("active")) return;
  const previous = active;
  active = index;
  const relic = relics[active];

  frames[previous]?.classList.remove("active");
  frames[active].classList.add("active");

  anime.remove(frames[active].querySelector("img"));
  anime({
    targets: frames[active].querySelector("img"),
    scale: [1.16, 1.06],
    translateX: ["2.5%", "0%"],
    filter: ["brightness(.48) saturate(.6)", "brightness(.72) saturate(.86)"],
    easing: "easeOutQuad",
    duration: 1300
  });

  thumbs.forEach((thumb, thumbIndex) => thumb.classList.toggle("active", thumbIndex === active));
  animateText(title, relic.title);
  animateText(copy, relic.copy);
  animateText(number, String(active + 1).padStart(2, "0"));
  code.textContent = relic.code;
  state.textContent = relic.state;
  inspect.dataset.open = relic.file;
  inspect.dataset.label = relic.title;
}

thumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => setRelic(Number(thumb.dataset.select)));
});

setInterval(() => {
  setRelic((active + 1) % relics.length);
}, 6200);

document.querySelectorAll("[data-open], #inspectButton").forEach((button) => {
  button.addEventListener("click", () => {
    const file = button.dataset.open || relics[active].file;
    const label = button.dataset.label || relics[active].title;
    modalImage.src = `./assets/${file}`;
    modalImage.alt = `${label} enlarged`;
    modal.showModal();
  });
});

document.querySelector("[data-close]").addEventListener("click", () => modal.close());

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    anime({
      targets: entry.target,
      opacity: [0, 1],
      translateY: [34, 0],
      easing: "easeOutCubic",
      duration: 850
    });
    observer.unobserve(entry.target);
  });
}, { threshold: 0.18 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

anime({
  targets: ".hero-panel",
  opacity: [0, 1],
  translateX: [40, 0],
  easing: "easeOutCubic",
  duration: 900,
  delay: 180
});
