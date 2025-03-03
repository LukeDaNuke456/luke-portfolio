document.addEventListener("DOMContentLoaded", function() {
    // Function to toggle the visibility of the navbar menu
    function toggleMenu() {
        const navbarList = document.querySelector(".navbar-list");
        navbarList.classList.toggle("show");
        console.log('Navbar visibility toggled', navbarList.classList);
    }

    // Attach event listener for clicks on the hamburger
    const hamburger = document.getElementById("hamburger");
    if (hamburger) {
        hamburger.addEventListener("click", toggleMenu);
    }
});
