const clinicSlides = [...document.querySelectorAll(".clinic-v2-stage img")];
const clinicStatus = document.querySelector("#clinicStatus");
const clinicStatusNote = document.querySelector("#clinicStatusNote");
const clinicStates = [
  ["OPEN RECORD", "受付記録を表示中"],
  ["CORRIDOR LOG", "移管後の廊下記録"],
  ["NIGHT FILE", "夜間処置室の控え"],
  ["RESTRICTED", "保管室ログに移動"]
];
let clinicIndex = 0;

function setClinicSlide(nextIndex) {
  const previous = clinicIndex;
  clinicIndex = nextIndex % clinicSlides.length;
  clinicSlides[previous]?.classList.remove("is-active");
  clinicSlides[clinicIndex].classList.add("is-active");

  anime.remove(clinicSlides[clinicIndex]);
  anime({
    targets: clinicSlides[clinicIndex],
    scale: [1.08, 1.02],
    translateX: ["1.4%", "0%"],
    opacity: [0, 1],
    easing: "easeOutCubic",
    duration: 1200
  });

  clinicStatus.textContent = clinicStates[clinicIndex][0];
  clinicStatusNote.textContent = clinicStates[clinicIndex][1];
}

setInterval(() => setClinicSlide(clinicIndex + 1), 5200);

anime({
  targets: [".clinic-v2-copy", ".clinic-v2-status"],
  opacity: [0, 1],
  translateY: [24, 0],
  delay: anime.stagger(140),
  easing: "easeOutCubic",
  duration: 900
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    anime({
      targets: entry.target,
      opacity: [0, 1],
      translateY: [26, 0],
      easing: "easeOutCubic",
      duration: 760
    });
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.14 });

document.querySelectorAll(".clinic-v2-band article, .clinic-v2-section").forEach((element) => {
  element.style.opacity = "0";
  revealObserver.observe(element);
});
