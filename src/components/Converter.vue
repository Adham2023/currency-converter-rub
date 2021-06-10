<template>
  <el-row class="converter">
      <el-col
        :xs="{ span: 24, offset: 0 }"
        :sm="{ span: 24, offset: 0 }"
        :md="{ span: 9, offset: 0 }"
        :lg="{ span: 9, offset: 0 }"
        :xl="{ span: 10, offset: 0 }"
        style="background-color: ;"
      >
        <div class="card-view">
          <span class="card-view-title">{{nameFrom}}</span>
          <div class="card-view-actions">
            <el-select v-model="currencyFrom"  @change="calculateRate"
             placeholder="From" style="margin-right: 1em">
              <el-option v-for="currency in fromList"
                :key="currency.ID"
                :label="currency.CharCode"
                :value="currency.ID"
              ></el-option>
            </el-select>
            <el-input @input="calculateRate"
                      :disabled="currencyFrom === '' || currencyTo === ''"
                      v-model="currencyFromAmount" placeholder="0.0"></el-input>
          </div>
        </div>
      </el-col>
      <el-col
        :xs="{ span: 24, offset: 0 }"
        :sm="{ span: 24, offset: 0 }"
        :md="{ span: 6, offset: 0 }"
        :lg="{ span: 6, offset: 0 }"
        :xl="{ span: 4, offset: 0 }"
        style="background-color: ;"
        class="btn_"
      >
        <button class="circle" @click="replaceIt()">
            <span class="arrws">&#8646;</span>
        </button>
      </el-col>
      <el-col
        :xs="{ span: 24, offset: 0 }"
        :sm="{ span: 18, offset: 3 }"
        :md="{ span: 9, offset: 0 }"
        :lg="{ span: 9, offset: 0 }"
        :xl="{ span: 10, offset: 0}"
         style="background-color: ;"
      >
         <div class="card-view">
          <span class="card-view-title">{{nameTo}}</span>
            <div class="card-view-actions">
            <el-select v-model="currencyTo" @change="calculateRate"
             placeholder="To" style="margin-right: 1em">
              <el-option v-for="currency in toList"
                :key="currency.ID"
                :label="currency.CharCode"
                :value="currency.ID"
              ></el-option>
            </el-select>
            <el-input disabled v-model="currencyToAmount" placeholder="0.0"></el-input>
          </div>
        </div>
      </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      currencyFrom: '',
      currencyTo: '',
      currencyFromAmount: '',
      currencyToAmount: '',
    };
  },
  computed: {
    ...mapState(['currencies_list']),
    fromList() {
      return this.currencies_list.filter((curr) => curr.ID !== this.currencyTo);
    },
    toList() {
      return this.currencies_list.filter((curr) => curr.ID !== this.currencyFrom);
    },
    nameFrom() {
      if (this.currencyFrom) {
        return this.currencies_list.find((cr) => cr.ID === this.currencyFrom).Name;
      }
      return '';
    },
    nameTo() {
      if (this.currencyTo) {
        return this.currencies_list.find((cr) => cr.ID === this.currencyTo).Name;
      }
      return '';
    },
  },
  methods: {
    calculateRate() {
      if (this.currencyFrom !== '' && this.currencyTo !== '') {
        const amountFrom = parseFloat(this.currencyFromAmount);
        let amountFromInRUB = this.currencies_list.find((cr) => cr.ID === this.currencyFrom);
        amountFromInRUB = amountFromInRUB.Value / amountFromInRUB.Nominal;
        let amountToInRUB = this.currencies_list.find((cr) => cr.ID === this.currencyTo);
        amountToInRUB = amountToInRUB.Value / amountToInRUB.Nominal;
        if (this.currencyFromAmount) {
          this.currencyToAmount = ((amountFromInRUB / amountToInRUB) * amountFrom).toFixed(5);
        }
      }
    },
    replaceIt() {
      if (this.currencyFrom !== '' && this.currencyTo !== '') {
        const listIdExcahnge = this.currencyFrom;
        this.currencyFrom = this.currencyTo;
        this.currencyTo = listIdExcahnge;
        this.calculateRate();
      }
    },
  },
};
</script>

<style>
    .converter {
        /* border:1px solid red; */
        height: calc(100vh - 56px);
        padding: 1rem;
    }
    .circle {
      width: 50px;
      height:50px;
      background-color: rgb(25, 66, 53);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      font-size: 1.3em;
      color: white;
    }

    .card-view {
      display: flex;
      flex-flow: column;
      padding: 1em;
      -webkit-box-shadow: 2px 1px 12px -4px rgba(8,68,25,0.73);
        box-shadow: 2px 1px 12px -4px rgba(8,68,25,0.73);
        border-radius: 8px;
    }

    .card-view-title {
      text-align: center;
      margin-bottom: 1rem;
    }

    .card-view-actions {
      display: flex;
    }

    .btn_{
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 1em 0;
      cursor: pointer;
    }

</style>
