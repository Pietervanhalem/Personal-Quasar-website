<template>
  <div class="PAGE" id="page">
    <h3>2048 Quasar</h3>
    <div class="score" id="score"></div>
    <div class="score">
      <q-btn color="white" text-color="black" label="reset" @click="reset" />
    </div>
    <div class="CONTAIER">
      <div class="row" id="row">
        <div class="block" id="11"></div>
        <div class="block" id="12"></div>
        <div class="block" id="13"></div>
        <div class="block" id="14"></div>

        <div class="block" id="21"></div>
        <div class="block" id="22"></div>
        <div class="block" id="23"></div>
        <div class="block" id="24"></div>

        <div class="block" id="31"></div>
        <div class="block" id="32"></div>
        <div class="block" id="33"></div>
        <div class="block" id="34"></div>

        <div class="block" id="41"></div>
        <div class="block" id="42"></div>
        <div class="block" id="43"></div>
        <div class="block" id="44"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { reset, spawnElement, moveTiles } from "../statics/js/2048";

var score_count = 0;
window.onload = function() {
  spawnElement();
  var score = document.getElementById("score");
  score.innerHTML = `Score ${score_count}`;
};

document.onkeydown = logKey;

function logKey(e) {
  if ((e.code == "KeyS") | (e.code == "ArrowDown")) {
    console.log("dowm");
    score_count = moveTiles("down", score_count);
  }
  if ((e.code == "KeyW") | (e.code == "ArrowUp")) {
    console.log("up");
    score_count = moveTiles("up", score_count);
  }
  if ((e.code == "KeyA") | (e.code == "ArrowLeft")) {
    console.log("left");
    score_count = moveTiles("left", score_count);
  }
  if ((e.code == "KeyD") | (e.code == "ArrowRight")) {
    console.log("right");
    score_count = moveTiles("right", score_count);
  }
  if (e.code == "KeyR") {
    reset();
  }
}

export default {
  methods: {
    reset
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

.PAGE {
  width: 100%;
  height: 100%;
  padding-left: 100px;
}

.CONTAIER {
  width: 450px;
  height: 450px;
  background-color: grey;
  border-radius: 10px;
}

.block {
  width: 100px;
  height: 100px;
  margin-top: 10px;
  margin-left: 10px;
  background-color: lightgrey;
  border-radius: 10px;
}
.score {
  padding-bottom: 10px;
  text-align: justify-right;
  font-size: 150%;
}

.tile {
  width: 100px;
  height: 100px;
  text-align: justify;
  text-align: center;
  border-radius: 10px;
  background-color: black;
}

.tile2 {
  background-color: #f4f9ff;
  font-size: 400%;
  line-height: 100px;
}

.tile4 {
  background-color: #d9ebff;
  font-size: 400%;
  line-height: 100px;
}
.tile8 {
  background-color: #b4d7ff;
  font-size: 400%;
  line-height: 100px;
}
.tile16 {
  background-color: #8ec3ff;
  font-size: 400%;
  line-height: 100px;
}
.tile32 {
  background-color: #68aeff;
  font-size: 400%;
  line-height: 100px;
  color: white;
}
.tile64 {
  background-color: #429aff;
  font-size: 400%;
  line-height: 100px;
  color: white;
}
.tile128 {
  background-color: #2289ff;
  font-size: 300%;
  line-height: 100px;
  color: white;
}
.tile256 {
  background-color: #0278ff;
  font-size: 300%;
  line-height: 100px;
  color: white;
}
.tile512 {
  background-color: #0069e1;
  font-size: 300%;
  line-height: 100px;
  color: white;
}
.tile1024 {
  background-color: #005ac1;
  font-size: 200%;
  line-height: 100px;
  color: white;
}
.tile2048 {
  background-color: #004ba1;
  font-size: 200%;
  line-height: 100px;
  color: white;
}
.tile4096 {
  background-color: black;
  font-size: 200%;
  line-height: 100px;
  color: white;
}
</style>