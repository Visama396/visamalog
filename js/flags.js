const FLAGS = [
    "andorra", "armenia", "austria", "azerbaijan",
    "belarus", "belgium", "bulgaria", "croatia",
    "cyprus", "czech-republic", "denmark",
    "estonia", "finland", "france", "georgia",
    "germany", "greece", "hungary", "iceland",
    "ireland", "italy", "latvia",
    "liechtenstein", "lithuania", "luxembourg",
    "malta", "moldova", "monaco",
    "netherlands", "norway", "poland",
    "portugal", "romania", "russia",
    "san-marino", "serbia", "slovakia",
    "slovenia", "spain", "sweden",
    "switzerland", "ukraine",
    "united-kingdom", "vatican-city"
];

var flags = FLAGS;

const FLAG_COUNT = FLAGS.length;

var usedFlags = [];

function createFlag() {
    let flag = document.createElement("article");
    flag.classList.add("flag");
    
    let index = Math.floor(Math.random() * flags.length)
    let country = flags[index];
    flags.splice(index, 1);
    usedFlags.push(country);

    flag.innerHTML = `<img src="../../assets/flags/${country}.png">`;

    flag.addEventListener('click', () => {
        handleFlagClick(country, flag);
    });

    return flag;
}

function setSearchCountryName() {
    let searchCountry = document.querySelector('.searchCountry');
    let index = Math.floor(Math.random() * usedFlags.length);
    let searchCountryName = usedFlags[index];
    searchCountry.innerHTML = searchCountryName;

    usedFlags.splice(index, 1);
}

function handleFlagClick(country, flag) {
    let searchCountry = document.querySelector('.searchCountry');
    if (country.toLowerCase() == searchCountry.innerHTML.toLowerCase()) {
        flag.classList.toggle('correct');
        setSearchCountryName();
    } else {
        flag.classList.toggle('incorrect');
        setTimeout(() => {
            flag.classList.toggle('incorrect');
        }, 1500);
    }
}

document.onreadystatechange = function() {
    if (document.readyState == "interactive") {
        let board = document.querySelector(".board");
        let flagCount = FLAG_COUNT;
        while (flagCount > 0) {
            board.appendChild(createFlag());
            flagCount--;
        }

        setSearchCountryName();

        let isLightMode = true;
        let darkMode = document.querySelector('.toggleLightMode');
        darkMode.addEventListener('click', () => {
            this.body.classList.toggle('dark');
            isLightMode = !isLightMode;
            if (!isLightMode) darkMode.innerHTML = 'Light Mode';
            else darkMode.innerHTML = 'Dark Mode';
        });
    }
};