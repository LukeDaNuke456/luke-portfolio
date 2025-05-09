const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("#navbar-list a");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const link = document.querySelector(`#nav-${entry.target.id}`);
    if (entry.isIntersecting) {
      navLinks.forEach((link) => link.classList.remove("active-link"));
      link?.classList.add("active-link");
    }
  });
}, { threshold: 0.6 });

sections.forEach((section) => {
  observer.observe(section);
});

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
const menuLinks = mobileMenu.querySelectorAll("a");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("hidden");
});

menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    hamburger.classList.remove("active");
  });
});