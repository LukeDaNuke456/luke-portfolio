const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("#navbar-list a");
const scrollIndicator = document.querySelector(".scroll-indicator");

function setActiveLink(sectionId) {
  navLinks.forEach((link) => {
    link.classList.toggle("active-link", link.id === `nav-${sectionId}`);
  });

  scrollIndicator?.classList.toggle("scroll-indicator--hidden", sectionId !== "home");
}

function getScrollActivationLine() {
  const header = document.querySelector(".site-header");
  const headerHeight = header?.offsetHeight ?? 0;

  return headerHeight + 24;
}

function updateActiveLink() {
  const activationLine = window.scrollY + getScrollActivationLine() + 80;
  let activeSectionId = sections[0]?.id;

  sections.forEach((section) => {
    if (activationLine >= section.offsetTop) {
      activeSectionId = section.id;
    }
  });

  if (activeSectionId) {
    setActiveLink(activeSectionId);
  }
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const targetId = link.getAttribute("href")?.replace("#", "");
    if (targetId) {
      setActiveLink(targetId);
      requestAnimationFrame(updateActiveLink);
      window.setTimeout(updateActiveLink, 120);
    }
  });
});

updateActiveLink();
window.addEventListener("scroll", updateActiveLink, { passive: true });
window.addEventListener("resize", updateActiveLink);
window.addEventListener("hashchange", updateActiveLink);
window.addEventListener("load", updateActiveLink);

// Scroll-triggered fade-in animations
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

function initFadeObserver() {
  document.querySelectorAll(".fade-in:not(.observed)").forEach((el) => {
    el.classList.add("observed");
    fadeObserver.observe(el);
  });
}

initFadeObserver();
window.initFadeObserver = initFadeObserver;
