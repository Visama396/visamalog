var options = {
    strings : ['Full-Stack', 'Unity', 'Flutter'],
    typeSpeed : 150,
    loop : true,
    showCursor : false,
};

var typed = new Typed('.typed', options);

document.onreadystatechange = function() {
    if (document.readyState === 'complete') {
        var pageSections = document.querySelectorAll('body > section');
        var navbarLinks = document.querySelectorAll('nav > .menu > a');
        
        document.addEventListener("scroll", function() {
            var scrolled = document.body.scrollTop || document.documentElement.scrollTop;

            for (var link of navbarLinks) {
                link.classList.remove('active');
            }

            if (scrolled > pageSections[4].clientHeight) {
                navbarLinks[4].classList.add('active');
            } else if (scrolled > pageSections[3].clientHeight) {
                navbarLinks[3].classList.add('active');
            } else if (scrolled > pageSections[2].clientHeight) {
                navbarLinks[2].classList.add('active');
            } else if (scrolled > pageSections[1].clientHeight) {
                navbarLinks[1].classList.add('active');
            } else {
                navbarLinks[0].classList.add('active');
            }

        });
    }
}

