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
// http://157.122.54.189:9095
// 把这个域名挂载axios上这样每次就会默认在前面加上这个域名
axios.defaults.baseURL ='http://localhost:8899';
// 我们是跨域请求的接口, 默认不会携带cookie等信息, 后端需要这些信息来判断登陆状态, 所以要设为true
axios.defaults.withCredentials=true;
// 导入编写路由守卫的文件
import BeforeEach from './router/BeforeEach.js'
// 创造路由实例
let vueRouter = new VueRouter(routerConfig);
// 注册全局路由守卫
vueRouter.beforeEach(BeforeEach);
new Vue({
  el:'#app',
  render: function (createElement) {
     return createElement(App)
  },
  router:vueRouter,
})