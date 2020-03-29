<template>
  <div id="displayDiv" class="inputclass">
    <form>
      <div v-if="step === 1">
        <h3>Step One</h3>
        <div class="inputFields">
          <q-input id="name" name="name" v-model="registration.name" label="Your Name" />
          <q-input
            id="email"
            name="email"
            type="email"
            v-model="registration.email"
            label="Your E-mail"
          />
        </div>
        <div class="inputButton"></div>
        <div class="inputButton">
          <q-btn @click.prevent="next()" label="next" color="primary" />
        </div>
      </div>

      <div v-if="step === 2">
        <h3>Step Two</h3>
        <div class="inputFields">
          <q-input id="street" name="street" v-model="registration.street" label="Your Street:" />
          <q-input id="city" name="city" v-model="registration.city" label="Your City:" />
          <q-input id="state" name="state" v-model="registration.state" label="Your State:" />
        </div>
        <div class="inputButton">
          <q-btn @click.prevent="prev()" label="previous" color="primary" />
        </div>
        <div class="inputButton">
          <q-btn @click.prevent="next()" label="next" color="primary" />
        </div>
      </div>

      <div v-if="step === 3">
        <h3>Step Three</h3>

        <div class="inputFields">
          <q-input
            id="numtickets"
            name="numtickets"
            type="number"
            v-model="registration.numtickets"
            label="Number of Tickets:"
          />

          <q-select
            square
            outlined
            id="shirtsize"
            name="shirtsize"
            v-model="registration.shirtsize"
            label="Shirt Size:"
            :options="options"
          />
        </div>

        <div class="inputButton">
          <q-btn @click.prevent="prev()" label="previous" color="primary" />
        </div>
        <div class="inputButton">
          <q-btn @click.prevent="submit()" label="submit" color="primary" />
        </div>
      </div>
    </form>

    <br />
    <br />
    Debug: {{registration}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
      options: ["S", "M", "L", "XL", "XXL"],
      registration: {
        name: null,
        email: null,
        street: null,
        city: null,
        state: null,
        numtickets: 0,
        shirtsize: "XL"
      }
    };
  },
  methods: {
    prev() {
      this.step--;
    },
    next() {
      this.step++;
    },
    submit() {
      alert("Submit to blah and show blah and etc.");
    }
  }
};
</script>

<style>
.inputclass {
  padding-left: 50px;
  padding-top: 10px;
}
.inputFields {
  height: 200px;
  width: 50%;
}
.inputButton {
  height: 40px;
}
</style>