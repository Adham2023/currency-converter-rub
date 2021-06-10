<template>
  <el-row class="currencies-list">
    <el-col
      :xs="{ span: 24, offset: 0 }"
      :sm="{ span: 18, offset: 3 }"
      :md="{ span: 14, offset: 4 }"
      :lg="{ span: 14, offset: 4 }"
      :xl="{ span: 14, offset: 4 }"
      class="currencies-list-tools"
    >
      <el-switch
        style="margin-right: 0.5rem"
        v-model="inverse"
        active-text="Inverse"
        @change="SET_INVERT()"
      >
      </el-switch>
      <el-input v-model="filtervalue" @input="getFilteredValue" placeholder="Search"></el-input>
    </el-col>

    <el-col
      :xs="{ span: 24, offset: 0 }"
      :sm="{ span: 18, offset: 3 }"
      :md="{ span: 14, offset: 4 }"
      :lg="{ span: 14, offset: 4 }"
      :xl="{ span: 14, offset: 4 }"
      class="currencies-list-item"
    >
      <Card
        v-for="currency in currencies_list_filtered"
        :key="currency.ID"
        :currency="currency"
      />
    </el-col>
  </el-row>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import Card from './Card.vue';

export default {
  components: {
    Card,
  },
  data() {
    return {
      current_currency: '',
      inverse: false,
      filtervalue: '',
    };
  },
  computed: {
    ...mapState(['currencies_list']),
    currencies_list_filtered() {
      return this.currencies_list.filter(
        (curr) => curr.Name.toLowerCase().includes(this.filtervalue.toLowerCase())
          || curr.CharCode.toLowerCase().includes(this.filtervalue.toLowerCase()),
      );
    },
  },
  methods: {
    ...mapMutations(['SET_INVERT']),
    getFilteredValue(s) {
      this.filtervalue = s;
    },
  },
};
</script>

<style scoped>
.currencies-list {
  height: calc(100vh - 56px);
}
.currencies-list-item {
  height: calc(100vh - 56px - 7rem);
  overflow: auto;
  padding: 0 1rem;
}
.currencies-list-tools {
  display: flex;
  margin-bottom: 1rem;
  padding: 0 1rem;
  height: 5rem;
  align-items: center;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgb(207, 207, 207);
  border-radius: 8px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(214, 214, 210);
  border-radius: 8px;
}
</style>
