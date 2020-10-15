//document.addEventListener("DOMContentLoaded", function() {});

/**
 * Hides loader of the page
 */
function hideLoader() {
    let loaderContainer = document.querySelector(".loader-container");
    loaderContainer.classList.remove("active");
    loaderContainer.classList.add("hidden");
    document.body.style.overflow = "initial";
}

/**
 * Checks the height scrolled in the page
 */
function scrollBehaviour() {
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 0);
}

function toggleMenu() {
    let menuToggle = document.querySelector('.toggle');
    let menu = document.querySelector('.menu');
    menuToggle.classList.toggle('active');
    menu.classList.toggle('active');
}

// alternative to DOMContentLoaded
document.onreadystatechange = function() {
    if (document.readyState == "interactive") {
        // Application starts here
        setTimeout(hideLoader, 3000);
        window.addEventListener('scroll', scrollBehaviour);

        let menuToggle = document.querySelector('.toggle');
        let menuLinks = document.querySelectorAll('header .menu a');
        menuLinks.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
        menuToggle.addEventListener('click', toggleMenu);
    }
}