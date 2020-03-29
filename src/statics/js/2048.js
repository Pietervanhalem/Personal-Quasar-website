function random_interger() {
    var value = 0
    for (var i = 0; i < 20; i++) {
        value = value + Math.random()
    }
    value = 2 ** -(0.6 * value)
    return Math.ceil(value * 50)
}



export function spawnElement() {
    var tile = document.createElement("div");
    tile.setAttribute("data-v-04d01ec6", null);
    var value = 2 ** random_interger()
    tile.innerHTML = value;
    tile.setAttribute("class", `tile tile${value}`);

    var element = document.getElementById("row");
    var elements = [];
    for (var i = 0; i < element.childNodes.length; ++i)
        if (element.childNodes[i].childNodes.length == 0) {
            elements.push(element.childNodes[i]);
        }
    if (elements.length > 0) {
        var block_id = Math.floor(Math.random() * elements.length);
        var block = elements[block_id];
        tile.id = block.id;
        block.appendChild(tile);
    }
};

export function moveTiles(direction, score_count) {
    var moved = false
    var element = document.getElementById("row");
    var elements = [];
    for (var i = 0; i < element.childNodes.length; ++i)
        if (element.childNodes[i].childNodes.length == 1) {
            elements.push(element.childNodes[i]);
        }
    var indexen = [1, 2, 3, 4];

    if ((direction == "right") | (direction == "down")) {
        elements = elements.reverse();
        indexen = indexen.reverse();
    }

    for (element in elements) {
        var tile = elements[element].childNodes[0];
        var row = elements[element].id[0];

        if ((direction == "up") | (direction == "down")) {
            var row = elements[element].id[1];
        }

        for (var i in indexen) {
            i = indexen[i];
            var id = `${row}${i}`;
            if ((direction == "up") | (direction == "down")) {
                id = `${i}${row}`;
            }
            var newElement = document.getElementById(id);
            if (newElement.childNodes.length == 0) {
                elements[element].removeChild(tile);
                tile.id = newElement.id;
                newElement.appendChild(tile);
                moved = true
                break;
            } else if (newElement.childNodes[0].id == elements[element].id) {
                break;
            } else if (newElement.childNodes[0].innerHTML == tile.innerHTML) {
                var other_indexed = [];
                for (var j in indexen) {
                    j = indexen[j];
                    var id_2 = `${row}${j}`;
                    if ((direction == "up") | (direction == "down")) {
                        id_2 = `${j}${row}`;
                    }
                    var newRowElement = document.getElementById(id_2);
                    if (newRowElement.id == tile.id) {
                        var current_index = j;
                    } else if (newRowElement.id == newElement.id) {
                        var target_index = j;
                    } else if (newRowElement.childNodes.length == 1) {
                        other_indexed.push(j);
                    }
                }
                var condition = true;
                for (var ide in other_indexed) {
                    ide = other_indexed[ide];
                    if ((ide < current_index) & (ide > target_index)) {
                        condition = false;
                    } else if ((ide > current_index) & (ide < target_index)) {
                        condition = false;
                    }
                }

                if (condition) {
                    moved = true
                    newElement.childNodes[0].innerHTML = tile.innerHTML * 2;
                    newElement.childNodes[0].setAttribute(
                        "class",
                        `tile tile${tile.innerHTML * 2}`
                    );
                    score_count = score_count + tile.innerHTML * 2;
                    score.innerHTML = `Score ${score_count}`;
                    elements[element].removeChild(tile);
                    if (tile.innerHTML * 2 == 2048) {
                        var winscreen = document.createElement("div")
                        winscreen.setAttribute("class", "Winscreen")

                        var winmessage = document.createElement("div")
                        winmessage.setAttribute("class", "WinMessage")
                        winmessage.innerHTML = "You have Won!"

                        var winresest = document.createElement("div")
                        winresest.setAttribute("class", "Winreset row")

                        var resetButton = document.createElement("input")
                        resetButton.setAttribute("type", "button")
                        resetButton.value = "Reset"
                        resetButton.onclick = function () {
                            page.removeChild(winscreen)
                            page.removeChild(winmessage)
                            page.removeChild(winresest)
                            page.removeAttribute("visited")
                            reset()
                        }

                        var continueButton = document.createElement("input")
                        continueButton.setAttribute("type", "button")
                        continueButton.value = "Continue"
                        continueButton.onclick = function () {
                            page.removeChild(winscreen)
                            page.removeChild(winmessage)
                            page.removeChild(winresest)
                            page.removeAttribute("visited")
                        }

                        winresest.appendChild(continueButton)
                        winresest.appendChild(resetButton)
                        page.appendChild(winresest)
                        page.appendChild(winscreen)
                        page.appendChild(winmessage)

                    }
                    break;
                }
            }
        }
    }
    if (moved) {
        spawnElement();
    }
    var element = document.getElementById("row");
    var elements = [];
    for (var i = 0; i < element.childNodes.length; ++i)
        if (element.childNodes[i].childNodes.length == 0) {
            elements.push(element.childNodes[i]);
        }
    if (elements.length == 0) {
        var dead = checkIfDead()
        var page = document.getElementById("page")
        if (page.hasAttribute("visited")) {
            dead = false
        }

        if (dead) {
            var winscreen = document.createElement("div")
            winscreen.setAttribute("class", "Winscreen")

            var winmessage = document.createElement("div")
            winmessage.setAttribute("class", "WinMessage")
            winmessage.innerHTML = "you are dead!"

            var winresest = document.createElement("div")
            winresest.setAttribute("class", "Winreset row")

            var resetButton = document.createElement("input")
            resetButton.setAttribute("type", "button")
            resetButton.value = "Reset"
            resetButton.onclick = function () {
                page.removeChild(winscreen)
                page.removeChild(winmessage)
                page.removeChild(winresest)
                page.removeAttribute("visited")
                reset()
            }

            var continueButton = document.createElement("input")
            continueButton.setAttribute("type", "button")
            continueButton.value = "Continue"
            continueButton.onclick = function () {
                page.removeChild(winscreen)
                page.removeChild(winmessage)
                page.removeChild(winresest)
                page.removeAttribute("visited")
            }

            winresest.appendChild(continueButton)
            winresest.appendChild(resetButton)
            page.appendChild(winresest)
            page.appendChild(winscreen)
            page.appendChild(winmessage)
            page.setAttribute("visited", "true")
        }
    }
    return score_count
};

export function reset() {
    var score_count = 0;
    score.innerHTML = `Score ${score_count}`;
    var parentElement = document.getElementById("row");
    for (var i = 0; i < parentElement.childNodes.length; i++) {
        var element = parentElement.childNodes[i];
        if (element.childNodes.length == 1) {
            element.removeChild(element.childNodes[0]);
        }
    }
    spawnElement()
}

function checkIfDead() {
    var element = document.getElementById("row");
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            var currentElement = element.childNodes[i * 4 + j].childNodes[0].innerHTML
            if (index(element, i + 1, j) == currentElement) {
                return false
            } else if (index(element, i - 1, j) == currentElement) {
                return false
            } if (index(element, i, j + 1) == currentElement) {
                return false
            } else if (index(element, i, j - 1) == currentElement) {
                return false
            }
        }
    }
    return true
}

function index(element, i, j) {
    if (i > 4 | i < 0 | j < 0 | j > 4) {
        return null
    }
    var indx = i * 4 + j
    var idd = element.childNodes[indx].childNodes[0].innerHTML
    return idd
}