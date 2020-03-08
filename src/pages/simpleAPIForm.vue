<template>
  <div id="displayDiv">
    <h3>Simple API Form</h3>
    <div class="q-pa-md">
      <q-ajax-bar ref="bar" position="bottom" color="accent" size="10px" skip-hijack />
      <q-form @submit="trigger" class="q-gutter-md">
        <q-input
          filled
          type="number"
          v-model="age"
          label="Number of persons *"
          lazy-rules
          :rules="[
          val => val !== null && val !== '' || 'Please type the number of persons',
          val => val > 0 && val < 1000 || 'Please type a real number'
        ]"
        />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
var getJSON = function(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = function() {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};
export default {
  data() {
    return {
      age: null
    };
  },
  methods: {
    trigger() {
      const bar = this.$refs.bar;
      bar.start();
      var url = `https://randomuser.me/api/?results=${this.age}`;
      getJSON(url, function(err, data) {
        if (err !== null) {
          alert("Something went wrong: " + err);
        } else {
          var currentDiv = document.getElementById("displayDiv");
          var oldOutput = document.getElementById("outputDiv");
          if (oldOutput) {
            currentDiv.removeChild(oldOutput);
          }

          var outputDiv = document.createElement("div");
          outputDiv.id = "outputDiv";
          for (var i = 0; i < data.results.length; i++) {
            var newDiv = document.createElement("div");
            var textbox = document.createTextNode(data.results[i].name.first);
            newDiv.appendChild(textbox);
            var textbox = document.createTextNode(
              " " + data.results[i].name.last
            );
            newDiv.appendChild(textbox);
            outputDiv.appendChild(newDiv);
          }
          currentDiv.appendChild(outputDiv);
        }
      });
      bar.stop();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>