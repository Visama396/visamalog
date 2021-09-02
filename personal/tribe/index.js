function makeNewItem(x, y) {
    let item = document.createElement("div")
    item.classList.add("item")

    return item;
}

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM loaded")

    var gameCells = [];

    var game = document.getElementById("game")
    
    for (let x = 0; x < 30; x++) {
        for (let y = 0; y < 30; y++) {
            game.appendChild(makeNewItem(x, y))
        }
    }

})