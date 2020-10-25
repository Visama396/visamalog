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

var translations;
function translate(language) {
    document.documentElement.lang = language;
    if (translations != null) {
        let elementsToTranslate = document.querySelectorAll('[data-i18n]');
        for (let element of elementsToTranslate) {
            element.innerHTML = translations[language][element.getAttribute('data-i18n')];
        }
    }
}

// alternative to DOMContentLoaded
document.onreadystatechange = function() {
    if (document.readyState == "interactive") {
        // Application starts here
        setTimeout(hideLoader, 2000);
        window.addEventListener('scroll', scrollBehaviour);

        let menuToggle = document.querySelector('.toggle');
        let menuLinks = document.querySelectorAll('header .menu a');
        menuLinks.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
        menuToggle.addEventListener('click', toggleMenu);

        // Fetch languages
        fetch('../assets/translations.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error" + response.status);
            }
            return response.json();
        })
        .then(json => {
            translations = json;
        })
        .catch(err => {
            console.log(err);
        });

        // Translation buttons
        let translateButtons = document.querySelectorAll('.lang');
        translateButtons.forEach(translateButton => {
            translateButton.addEventListener('click', () => {
                translate(translateButton.getAttribute('data-lang'));
            });
        });
    }
}