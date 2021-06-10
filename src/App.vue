<template>
  <div id="app">
    <el-tabs style="height: calc(100vh - 2px)" stretch type="card" @tab-click="handleClick">
    <el-tab-pane label="Curencies">
       <span slot="label" class="custom-title"><i class="el-icon-document"></i> Curencies</span>
      <Currencies />
    </el-tab-pane>
    <el-tab-pane>
       <span slot="label" class="custom-title"><i class="el-icon-sort"></i> Converter</span>
      <Converter />
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>

import Currencies from '@/components/Currencies.vue';
import Converter from '@/components/Converter.vue';
import { mapActions } from 'vuex';
import { Message } from 'element-ui';

export default {
  name: 'App',
  components: {
    Currencies,
    Converter,
  },
  mounted() {
    this.GET_CURRENCIES().then(() => {
    }).catch((err) => {
      Message({
        message: err.response.status,
        type: 'error',
      });
    });
  },
  methods: {
    ...mapActions(['GET_CURRENCIES']),
    handleClick() {
      // console.log('tab clicked');
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300&display=swap');

#app {
  box-sizing: border-box;
  height: 100vh;
  /* border: 1px solid red; */
  margin: 0 auto;
  max-width: 900px;
  overflow: auto;
   font-family: 'Nunito', sans-serif;
   background-color: white;
}
* {
  padding: 0;
  margin: 0;
}

.custom-title {
  /* font-size: 1.2rem; */
  text-transform: uppercase;
}

body {
  background-color: azure;
}

</style>
