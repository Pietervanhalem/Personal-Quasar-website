<template>
  <div id="displayDiv">
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
    <div id="container" class="container row" />
  </div>
</template>

<script>
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
      return;
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
    if (confirm("You have lost :( want to start again?")) {
      createGrid(N, B);
    }

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
  if (elementBox.textContent == "x") {
    return;
  }

  var newElement = document.createElement("div");
  elementBox.setAttribute("beenClicked", true);
  newElement.setAttribute("class", "boxClicked");

  var id = parseInt(elementBox.id);
  var content = getContent(bombs, id, N, B);
  if (content == 0) {
    clickAround(id, bombs, N, B);
  } else {
    newElement.innerHTML = content;
  }

  elementBox.removeChild(elementBox.childNodes[0]);
  elementBox.appendChild(newElement);
}

function markedElement(e, bombs, N, B) {
  if (e.toElement.textContent == "x") {
    e.toElement.textContent = "";
  } else {
    e.toElement.textContent = "x";
  }
  checkVictory(bombs, N);
}

function checkVictory(bombs, N) {
  var victory = true;
  for (var i = 0; i < N * N; i++) {
    var element = document.getElementById(`${i}`);
    if (bombs.includes(i)) {
      if (element.textContent != "x") {
        victory = false;
      }
    } else if (element.hasAttribute("beenClicked") == false) {
      victory = false;
    }
  }
  if (victory) {
    if (confirm("You have won :) want to start again?")) {
      createGrid(N, B);
    }
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

  for (var i = 0; i < N * N; i++) {
    var element = document.createElement("div");
    var elementButton = document.createElement("button");

    element.id = `${i}`;
    elementButton.setAttribute("class", "box");

    elementButton.onclick = function(e) {
      var id = e.toElement.parentElement.id;
      clickedElement(id, bombs, N, B);
      checkVictory(bombs, N);
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
      N: null,
      B: null
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
}
.boxClicked {
  width: 22px;
  height: 22px;
  background-color: white;
  /* border-color: grey;
  border-width: 0.5px;
  border-style: solid; */
  text-align: justify;
  text-align: center;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-bottom: 0px;
}
</style>