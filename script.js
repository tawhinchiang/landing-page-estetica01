const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelectorAll("[data-nav] a");
const revealItems = document.querySelectorAll(".reveal");

function setHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 8);
}

function closeMobileMenu() {
  if (!nav || !navToggle) return;
  nav.classList.remove("is-open");
  navToggle.classList.remove("is-active");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Abrir menu");
  document.body.classList.remove("menu-open");
}

function toggleMobileMenu() {
  if (!nav || !navToggle) return;
  const isOpen = nav.classList.toggle("is-open");
  navToggle.classList.toggle("is-active", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  document.body.classList.toggle("menu-open", isOpen);
}

function setupRevealAnimation() {
  if (!revealItems.length) return;

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -70px 0px"
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      closeMobileMenu();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function setupMobileMenu() {
  if (!navToggle) return;

  navToggle.addEventListener("click", toggleMobileMenu);
  navLinks.forEach((link) => link.addEventListener("click", closeMobileMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMobileMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 940) closeMobileMenu();
  });
}

function setupWhatsappTracking() {
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');

  whatsappLinks.forEach((link) => {
    link.addEventListener("click", () => {
      link.dataset.clicked = "true";
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setHeaderState();
  setupMobileMenu();
  setupSmoothAnchors();
  setupRevealAnimation();
  setupWhatsappTracking();
});

window.addEventListener("scroll", setHeaderState, { passive: true });
