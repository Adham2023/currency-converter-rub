<template>
  <div class="currency-card">
      <span class="currency-name">
          {{currency.Name}}
      </span>
      <div class="pair-indicator">
          <div class="pair">
              <span v-if="!invert">1 {{currency.CharCode}}</span>
              <span v-else><span style="font-weight: bold">{{ currentCurrency() }}</span>
                            {{currency.CharCode}}
              </span>
              <span v-if="!invert" style="color: gray">&#10231; </span>
              <span v-if="!invert" style="font-weight: bold">{{ currentCurrency() }}</span>
              <span v-if="invert" style="color: gray">&#10231; </span>
              <span v-if="invert">1 </span>
              RUB
          </div>
          <span class="indicator">
              <span style="font-size: 1.3em; color: green" v-if="growthDirection()">
                &#8593;
              </span>
              <span style="font-size: 1.3em;  color: red"  v-else>&#8595; </span>
              <span :style="growthDirection() ? {color: 'green'}
                            : {color: 'red'}" style="font-size: 1.2em">
                    {{growthRate()}}
              </span>
          </span>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    currency: {
      type: Object,
    },
  },
  data() {
    return {
      growing: true,
    };
  },
  computed: {
    ...mapState(['invert']),
  },
  methods: {
    currentCurrency() {
      if (this.invert) { // IF 1 RUB IN USD...
        return ((1 / this.currency.Value) * this.currency.Nominal).toFixed(5);
      }
      return (this.currency.Value / this.currency.Nominal).toFixed(5);
    },
    growthDirection() {
      if (this.invert) { // IF 1 RUB IN USD...
        return ((1 / this.currency.Value) * this.currency.Nominal)
                - ((1 / this.currency.Previous) * this.currency.Nominal) >= 0.0;
      }
      return this.currency.Value - this.currency.Previous >= 0.0;
    },
    growthRate() {
      if (this.invert) {
        return Math.abs((1 / this.currency.Value) * this.currency.Nominal
                    - ((1 / this.currency.Previous) * this.currency.Nominal)).toFixed(5);
      }
      return Math.abs((this.currency.Value / this.currency.Nominal
            - this.currency.Previous / this.currency.Nominal)).toFixed(5);
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300&display=swap');
    .currency-card {
        font-family: 'Nunito', sans-serif;
        -webkit-box-shadow: 2px 1px 12px -4px rgba(8,68,25,0.73);
        box-shadow: 2px 1px 12px -4px rgba(8,68,25,0.73);
        border-radius: 8px;
        height: 5.5rem;
        display: flex;
        padding:  1em 1em 0 1em;
        flex-flow: column;
        margin-bottom: 1rem;
    }

    .currency-name {
        display: flex;
        align-items: center;
        flex: 1;
        height: 1.5rem;
        color: rgb(116, 116, 116);
    }

    .pair-indicator {
        display: flex;
        flex: 2;
        justify-content:space-between;
        align-items: center;
        /* font-size: 1.3em; */
    }
</style>
