import { SCREEN_BREAKPOINTS } from "./Constants/constants.js";

document.addEventListener("DOMContentLoaded", function () {
  function toggleMenu() {
    const navbarList = document.querySelector(".navbar-list");
    if (window.innerWidth <= SCREEN_BREAKPOINTS.tablet) {
      navbarList.classList.toggle("show");
    }
  }

  function closeMenuOnClick() {
    const navbarList = document.querySelector(".navbar-list");
    if (window.innerWidth <= SCREEN_BREAKPOINTS.tablet) {
      navbarList.classList.remove("show");
    }
  }

  const menuItems = document.querySelectorAll(".navbar-item a");

  menuItems.forEach((item) => {
    item.addEventListener("click", closeMenuOnClick);
  });

  const hamburger = document.getElementById("hamburger");
  if (hamburger) {
    hamburger.addEventListener("click", toggleMenu);
  }
});
