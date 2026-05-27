document.documentElement.classList.add("js");

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (canHover) {
  const preview = document.createElement("div");
  const previewImage = document.createElement("img");
  let previewTimer;
  const previewDelay = 450;

  preview.className = "image-preview";
  preview.setAttribute("aria-hidden", "true");
  preview.appendChild(previewImage);
  document.body.appendChild(preview);

  const showPreview = (image) => {
    previewImage.src = image.currentSrc || image.src;
    previewImage.alt = image.alt;
    preview.classList.add("is-active");
  };

  const schedulePreview = (image) => {
    window.clearTimeout(previewTimer);
    previewTimer = window.setTimeout(() => showPreview(image), previewDelay);
  };

  const hidePreview = () => {
    window.clearTimeout(previewTimer);
    preview.classList.remove("is-active");
  };

  document.querySelectorAll(".zoomable").forEach((image) => {
    image.addEventListener("mouseenter", () => schedulePreview(image));
    image.addEventListener("mouseleave", hidePreview);
    image.addEventListener("focus", () => schedulePreview(image));
    image.addEventListener("blur", hidePreview);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hidePreview();
      document.activeElement.blur();
    }
  });
}
