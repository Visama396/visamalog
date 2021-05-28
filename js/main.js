var options = {
    strings : ['Full-Stack', 'Unity', 'Flutter'],
    typeSpeed : 150,
    loop : true,
    showCursor : false,
};

var typed = new Typed('.typed', options);

document.onreadystatechange = function() {
    if (document.readyState === 'complete') {

        var navbarLinks = document.querySelectorAll('nav > .menu > a');

        /* Navigator helper */
        var pageSections = document.querySelectorAll('body > section');

        var sections = {};
        var i = 0;

        Array.prototype.forEach.call(pageSections, function(e) {
            sections[e.id] = e.offsetTop;
        });        
        
        window.onscroll = function() {
            var scrollPosition = document.body.scrollTop || document.documentElement.scrollTop;

            for (i in sections) {
                if (sections[i] <= scrollPosition) {
                    document.querySelector('a.active').classList.remove('active');
                    document.querySelector(`a[href*=${i}]`).classList.add('active');
                }
            }

        };
    }
}