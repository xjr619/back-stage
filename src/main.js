// 默认初始化样式
import 'normalize.css'
// 引入全局样式
import './less/common.less'
import Vue from 'vue'
import App from './component/App.vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 插件导入后要使用
Vue.use(VueRouter);
Vue.use(ElementUI)
// 导入路由配置
import routerConfig from "./router/index.js"
import axios from 'axios'
// 给vue原型上设置一个$hhtp保存axios
Vue.prototype.$http = axios;
// 导入api配置对象为了方便
import api from './js/api-config.js'
Vue.prototype.$api = api;
// 把这个域名挂载axios上这样每次就会默认在前面加上这个域名
axios.defaults.baseURL ='http://157.122.54.189:9095';
new Vue({
  el:'#app',
  render: function (createElement) {
     return createElement(App)
  },
  router:new VueRouter(routerConfig)
})