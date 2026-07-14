const deck = document.querySelector(".deck");
const slides = Array.from(document.querySelectorAll(".slide"));
const navDots = document.getElementById("navDots");
const progressBar = document.getElementById("progressBar");
const slideCounter = document.getElementById("slideCounter");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let activeIndex = 0;
let isProgrammaticScroll = false;

function pad(number) {
  return String(number).padStart(2, "0");
}

function updateUi(index) {
  activeIndex = Math.max(0, Math.min(index, slides.length - 1));
  const progress = ((activeIndex + 1) / slides.length) * 100;
  progressBar.style.width = `${progress}%`;
  slideCounter.textContent = `${pad(activeIndex + 1)} / ${pad(slides.length)}`;

  document.querySelectorAll(".nav-dot").forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === activeIndex);
    dot.setAttribute("aria-current", dotIndex === activeIndex ? "step" : "false");
  });
}

function goToSlide(index, pushHash = true) {
  const nextIndex = Math.max(0, Math.min(index, slides.length - 1));
  const target = slides[nextIndex];
  isProgrammaticScroll = true;
  target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
  target.focus({ preventScroll: true });
  updateUi(nextIndex);

  if (pushHash) {
    history.replaceState(null, "", `#${target.id}`);
  }

  window.setTimeout(() => {
    isProgrammaticScroll = false;
  }, prefersReducedMotion ? 20 : 520);
}

slides.forEach((slide, index) => {
  const dot = document.createElement("button");
  dot.className = "nav-dot";
  dot.type = "button";
  dot.dataset.label = `${pad(index + 1)} ${slide.dataset.title}`;
  dot.setAttribute("aria-label", `Zu Folie ${index + 1}: ${slide.dataset.title}`);
  dot.addEventListener("click", () => goToSlide(index));
  navDots.appendChild(dot);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = slides.indexOf(entry.target);
        slides.forEach((slide) => slide.classList.remove("active"));
        entry.target.classList.add("active");
        updateUi(index);
        if (!isProgrammaticScroll) {
          history.replaceState(null, "", `#${entry.target.id}`);
        }
      }
    });
  },
  { root: deck, threshold: 0.58 }
);

slides.forEach((slide) => observer.observe(slide));

document.getElementById("homeButton").addEventListener("click", () => goToSlide(0));
document.getElementById("prevButton").addEventListener("click", () => goToSlide(activeIndex - 1));
document.getElementById("nextButton").addEventListener("click", () => goToSlide(activeIndex + 1));

document.getElementById("fullscreenButton").addEventListener("click", async () => {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch {
    // Fullscreen can be blocked by the browser; the presentation stays usable.
  }
});

document.addEventListener("keydown", (event) => {
  const tagName = document.activeElement?.tagName;
  if (tagName === "BUTTON" && event.key === " ") {
    return;
  }

  if (["ArrowDown", "ArrowRight", "PageDown"].includes(event.key)) {
    event.preventDefault();
    goToSlide(activeIndex + 1);
  }

  if (["ArrowUp", "ArrowLeft", "PageUp"].includes(event.key)) {
    event.preventDefault();
    goToSlide(activeIndex - 1);
  }

  if (event.key === " ") {
    event.preventDefault();
    goToSlide(activeIndex + (event.shiftKey ? -1 : 1));
  }

  if (event.key === "Home") {
    event.preventDefault();
    goToSlide(0);
  }

  if (event.key === "End") {
    event.preventDefault();
    goToSlide(slides.length - 1);
  }
});

document.querySelectorAll(".fallback-image").forEach((image) => {
  const fallback = image.dataset.fallback;
  image.addEventListener("error", () => {
    if (fallback && image.src.indexOf(fallback) === -1) {
      image.src = fallback;
    }
  });
});

document.querySelectorAll(".chat-actions button, .choice-grid button").forEach((button) => {
  button.addEventListener("click", () => {
    const group = button.closest(".chat-actions, .choice-grid");
    group.querySelectorAll("button").forEach((item) => item.classList.remove("is-selected"));
    button.classList.add("is-selected");
  });
});

const video = document.getElementById("explainerVideo");
const videoPlay = document.getElementById("videoPlay");
const videoReplay = document.getElementById("videoReplay");
const videoProgress = document.getElementById("videoProgress");
const videoTime = document.getElementById("videoTime");
const videoFullscreen = document.getElementById("videoFullscreen");
const videoFallback = document.getElementById("videoFallback");

function formatTime(seconds) {
  const safeSeconds = Number.isFinite(seconds) ? seconds : 0;
  const minutes = Math.floor(safeSeconds / 60);
  const rest = Math.floor(safeSeconds % 60);
  return `${pad(minutes)}:${pad(rest)}`;
}

function updateVideoUi() {
  const duration = video.duration || 0;
  const current = video.currentTime || 0;
  const progress = duration > 0 ? (current / duration) * 100 : 0;
  videoProgress.style.width = `${progress}%`;
  videoTime.textContent = formatTime(current);
  videoPlay.textContent = video.paused ? "Play" : "Pause";
}

video.addEventListener("timeupdate", updateVideoUi);
video.addEventListener("durationchange", updateVideoUi);
video.addEventListener("play", updateVideoUi);
video.addEventListener("pause", updateVideoUi);
video.addEventListener("error", () => {
  videoFallback.hidden = false;
});

videoPlay.addEventListener("click", async () => {
  if (video.paused) {
    try {
      await video.play();
    } catch {
      videoFallback.hidden = false;
    }
  } else {
    video.pause();
  }
});

videoReplay.addEventListener("click", async () => {
  video.currentTime = 0;
  try {
    await video.play();
  } catch {
    videoFallback.hidden = false;
  }
});

videoFullscreen.addEventListener("click", async () => {
  try {
    if (video.requestFullscreen) {
      await video.requestFullscreen();
    }
  } catch {
    // Native video remains usable if fullscreen is unavailable.
  }
});

const initialHash = window.location.hash.replace("#", "");
const initialIndex = slides.findIndex((slide) => slide.id === initialHash);
if (initialIndex >= 0) {
  window.requestAnimationFrame(() => goToSlide(initialIndex, false));
} else {
  slides[0].classList.add("active");
  updateUi(0);
}
