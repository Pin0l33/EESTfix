document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.getElementById("menuButton");
    const navMenu = document.getElementById("navMenu");

    if (menuButton && navMenu) {

        menuButton.addEventListener("click", () => {

            navMenu.classList.toggle("open");

            if (navMenu.classList.contains("open")) {
                menuButton.textContent = "✕";
            } else {
                menuButton.textContent = "☰";
            }

        });

        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("open");
                menuButton.textContent = "☰";

            });

        });

    }

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    const scrollButtons = document.querySelectorAll("[data-scroll]");

    scrollButtons.forEach(button => {

        button.addEventListener("click", () => {

            const targetId = button.getAttribute("data-scroll");
            const target = document.getElementById(targetId);

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });

    window.addEventListener("resize", () => {

        if (window.innerWidth > 650 && navMenu) {

            navMenu.classList.remove("open");

            if (menuButton) {
                menuButton.textContent = "☰";
            }

        }

    });

});