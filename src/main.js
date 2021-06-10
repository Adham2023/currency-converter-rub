import Vue from 'vue';
import {
  Button,
  Select,
  Row,
  Col,
  Tabs,
  TabPane,
  Switch,
  Input,
  Option,
} from 'element-ui';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Select);
Vue.use(Row);
Vue.use(Col);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Switch);
Vue.use(Input);
Vue.use(Option);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
