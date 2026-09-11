document.addEventListener("DOMContentLoaded", () => {

    const elements = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {

        elements.forEach(element => {
            element.classList.add("visible");
        });

        return;
    }

    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    elements.forEach(element => {
        observer.observe(element);
    });

    const grids = document.querySelectorAll(
        ".problem-grid, .steps-grid, .categories-grid"
    );

    grids.forEach(grid => {

        const cards = grid.children;

        Array.from(cards).forEach((card, index) => {

            card.style.transitionDelay = `${index * 0.08}s`;

        });

    });

    const heroContent = document.querySelector(".hero-content");
    const heroCard = document.querySelector(".hero-card");

    if (heroContent) {
        heroContent.style.animation = "heroTextAppear 0.8s ease forwards";
    }

    if (heroCard) {
        heroCard.style.animation = "heroCardAppear 0.9s ease 0.15s forwards";
        heroCard.style.opacity = "0";
    }

});