// 导出路由配置
import Login from '../component/login/Login.vue'
import Admin from '../component/admin/Admin.vue'
export default{
   routes:[
    //  登录
     {name:"login",path:"/login",component:Login},
    //  管理系统部分路由
     {name:"admin",path:"/admin",component:Admin},
   ]
};