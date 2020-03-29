<template>
  <div id="displayDiv" class="container">
    <q-form @submit="trigger" class="q-gutter-md">
      <div class="row">
        <div>
          <q-input
            filled
            id="size"
            type="number"
            v-model="N"
            label="Grid size *"
            lazy-rules
            :rules="[
          val => val !== null && val !== '' || 'Please type the dimension of the grid',
          val => val > 9 && val < 50 || 'Please type a real number'
        ]"
          />
        </div>

        <div>
          <q-input
            filled
            id="bombs"
            type="number"
            v-model="B"
            label="Number of bombs *"
            lazy-rules
            :rules="[
          val2 => val2 !== null && val2 !== '' || 'Please type the number of Bombs',
          val2 => val2 > 1 && val2 < this.N * this.N || 'Please type a real number'
        ]"
          />
        </div>
      </div>
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
    <div id="remainingBombs"></div>
    <div id="container" class="container row" />
  </div>
</template>

<script>
var remainingBombsCount = 0;
function eventMessage(message, N, B) {
  var page = document.getElementById("container");

  var winscreen = document.createElement("div");
  winscreen.setAttribute("class", "Winscreen");

  var winmessage = document.createElement("div");
  winmessage.setAttribute("class", "WinMessage");
  winmessage.innerHTML = message;

  var winresest = document.createElement("div");
  winresest.setAttribute("class", "Winreset row");

  var resetButton = document.createElement("input");
  resetButton.setAttribute("type", "button");
  resetButton.value = "Reset";
  resetButton.onclick = function() {
    page.removeChild(winscreen);
    page.removeChild(winmessage);
    page.removeChild(winresest);
    page.removeAttribute("visited");
    createGrid(N, B);
  };

  var continueButton = document.createElement("input");
  continueButton.setAttribute("type", "button");
  continueButton.value = "Continue";
  continueButton.onclick = function() {
    page.removeChild(winscreen);
    page.removeChild(winmessage);
    page.removeChild(winresest);
    page.removeAttribute("visited");
  };

  winresest.appendChild(continueButton);
  winresest.appendChild(resetButton);
  page.appendChild(winresest);
  page.appendChild(winscreen);
  page.appendChild(winmessage);
  page.setAttribute("visited", "true");
}

document.body.onload = function() {
  console.log("test");
  createGrid(15, 20);
};

function clickAround(id, bombs, N, B) {
  var edge = Math.floor(id / N);
  var edgeId = id - edge * N;

  if (edgeId == 0) {
    var iter = [1, N, -N, -N + 1, N + 1];
  } else if (edgeId == N - 1) {
    var iter = [-1, N, -N, -N - 1, N - 1];
  } else {
    var iter = [1, -1, N, -N, -N - 1, -N + 1, N - 1, N + 1];
  }
  for (var i in iter) {
    var newId = `${id + iter[i]}`;
    var elementBox = document.getElementById(newId);
    if (elementBox == null) {
      null;
    } else if (elementBox.hasAttribute("beenClicked") == false) {
      clickedElement(newId, bombs, N, B);
    }
  }
}

function getBombs(N, B) {
  var bombs = [];
  while (bombs.length < B) {
    var r = Math.floor(Math.random() * N * N);
    if (bombs.indexOf(r) === -1) bombs.push(r);
  }
  return bombs;
}

function getContent(bombs, id, N, B) {
  if (bombs.includes(id)) {
    var div = document.getElementById("images");
    eventMessage("You have lost :(", N, B);
    return "B";
  } else {
    var edge = Math.floor(id / N);
    var edgeId = id - edge * N;

    if (edgeId == 0) {
      var iter = [1, N, -N, -N + 1, N + 1];
    } else if (edgeId == N - 1) {
      var iter = [-1, N, -N, -N - 1, N - 1];
    } else {
      var iter = [1, -1, N, -N, -N - 1, -N + 1, N - 1, N + 1];
    }
    var content = 0;
    for (var i in iter) {
      if (bombs.includes(id + iter[i])) {
        content = content + 1;
      }
    }
    return `${content}`;
  }
}

function clickedElement(id, bombs, N, B) {
  var elementBox = document.getElementById(id);
  if (elementBox.hasAttribute("marked")) {
    return;
  }

  var newElement = document.createElement("div");
  elementBox.setAttribute("beenClicked", true);
  newElement.setAttribute("class", "boxClicked");

  var id = parseInt(elementBox.id);
  var content = getContent(bombs, id, N, B);
  if (content == 0) {
    clickAround(id, bombs, N, B);
  } else if (content == "B") {
    var img = document.createElement("img");
    img.src = "../statics/icons/bomb.png";
    img.width = 22;
    img.height = 22;
    newElement.appendChild(img);
  } else {
    newElement.innerHTML = content;
    newElement.setAttribute("class", `tile${content}`);
  }

  elementBox.removeChild(elementBox.childNodes[0]);
  elementBox.appendChild(newElement);
}

function markedElement(e, bombs, N, B) {
  if (e.toElement.hasAttribute("marked")) {
    remainingBombsCount = remainingBombsCount + 1;
    var remainingBombs = document.getElementById("remainingBombs");
    remainingBombs.innerHTML = `Remaining Bombs: ${remainingBombsCount}`;
    e.toElement.removeAttribute("marked");
    e.toElement.setAttribute("class", "box");
  } else {
    remainingBombsCount = remainingBombsCount - 1;
    var remainingBombs = document.getElementById("remainingBombs");
    remainingBombs.innerHTML = `Remaining Bombs: ${remainingBombsCount}`;
    e.toElement.setAttribute("marked", "true");
    e.toElement.setAttribute("class", "boxmarked");
  }
  checkVictory(bombs, N, B);
}

function checkVictory(bombs, N, B) {
  var victory = true;
  for (var i = 0; i < N * N; i++) {
    var element = document.getElementById(`${i}`);
    if (bombs.includes(i)) {
      if (element.hasAttribute("marked")) {
        victory = false;
      }
    } else if (element.hasAttribute("beenClicked") == false) {
      victory = false;
    }
  }
  if (victory) {
    eventMessage("You have won :)", N, B);
  }
}

function createGrid(N, B) {
  var old_container = document.getElementById("container");
  var displayDiv = document.getElementById("displayDiv");
  displayDiv.removeChild(old_container);
  var new_container = document.createElement("div");
  new_container.id = "container";
  new_container.setAttribute("class", "container row");
  displayDiv.appendChild(new_container);

  var container = document.getElementById("container");

  var bombs = getBombs(N, B);
  console.log(bombs);

  document.getElementById("container").style.height = `${50 + 22 * N}px`;
  document.getElementById("container").style.width = `${50 + 22 * N}px`;

  var remainingBombs = document.getElementById("remainingBombs");
  remainingBombsCount = B;
  remainingBombs.innerHTML = `Remaining Bombs: ${B}`;

  for (var i = 0; i < N * N; i++) {
    var element = document.createElement("div");
    var elementButton = document.createElement("button");

    element.id = `${i}`;
    elementButton.setAttribute("class", "box");

    elementButton.onclick = function(e) {
      var id = e.toElement.parentElement.id;
      clickedElement(id, bombs, N, B);
      checkVictory(bombs, N, B);
    };
    elementButton.oncontextmenu = function(e) {
      markedElement(e, bombs, N, B);
      return false;
    };

    element.appendChild(elementButton);
    container.appendChild(element);
  }
}

export default {
  data() {
    return {
      N: 15,
      B: 20
    };
  },
  methods: {
    trigger() {
      createGrid(parseInt(this.N), this.B);
    }
  }
};
</script>

<style>
.Winscreen {
  width: 100%;
  height: 100%;
  opacity: 0.4;
  background-color: grey;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
}

.WinMessage {
  width: 800px;
  height: 200px;
  background-color: #004ba1;
  position: absolute;
  opacity: 0.85;
  top: 300px;
  left: 100px;
  z-index: 101;
  text-align: justify;
  text-align: center;
  line-height: 150px;
  font-size: 400%;
  color: white;
  border-radius: 50px;
  border-style: solid;
  border-width: 5px;
}

.Winreset {
  position: absolute;
  top: 450px;
  left: 410px;
  z-index: 102;
  font-size: 150%;
}
.container {
  padding-left: 50px;
  padding-top: 10px;
}

.box {
  width: 22px;
  height: 22px;
  background-color: lightgrey;
  text-align: justify;
  text-align: center;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-bottom: 0px;
}

.boxmarked {
  width: 22px;
  height: 22px;
  background: url(../statics/icons/flag.png);
  text-align: justify;
  text-align: center;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-bottom: 0px;
}
.boxClicked {
  width: 22px;
  height: 22px;
  background-color: white;
  text-align: justify;
  text-align: center;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-bottom: 0px;
}

.tile1 {
  color: black;
  width: 22px;
  height: 22px;
  background-color: white;
  text-align: justify;
  text-align: center;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-bottom: 0px;
}
.tile2 {
  color: green;
  font-weight: bold;
  width: 22px;
  height: 22px;
  background-color: white;
  text-align: justify;
  text-align: center;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-bottom: 0px;
}
.tile3 {
  color: blue;
  font-weight: 900;
  width: 22px;
  height: 22px;
  background-color: white;
  text-align: justify;
  text-align: center;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-bottom: 0px;
}
.tile4 {
  color: red;
  font-weight: 900;
  width: 22px;
  height: 22px;
  background-color: white;
  text-align: justify;
  text-align: center;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-bottom: 0px;
}
</style>