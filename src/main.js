import Vue from 'vue';
import App from './App.vue'; // 智能定位
// import App from './components/demo.vue'; // 聊天案例
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
