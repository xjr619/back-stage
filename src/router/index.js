// 导出路由配置
import Login from '../component/login/Login.vue'
import Admin from '../component/admin/Admin.vue'
import GoodsCtList from '../component/admin/goods/goods-content/GoodsCtList.vue'
import GoodsCtEdit from '../component/admin/goods/goods-content/GoodsCtEdit.vue'
import GoodsCgList from '../component/admin/goods/goods-category/GoodsCgList.vue'
import GoodsCgEdit from '../component/admin/goods/goods-category/GoodsCgEdit.vue'
// 配置分类管理的子路由
let childs=[
  // 内容管理
  {name:"goodsCtList",path:"goods/content/list",component:GoodsCtList},
  {name:"goodsCtEdit",path:"goods/content/edit/:id",component:GoodsCtEdit},
  {name:"goodsCtAdd",path:"goods/content/add",component:GoodsCtList},
  // 分类管理
  {name:"goodsCgList",path:"goods/category/list",component:GoodsCgList},
  {name:"goodsCgEdit",path:"goods/category/edit/:id",component:GoodsCgEdit},
  {name:"goodsCgAdd",path:"goods/category/add",component:GoodsCgList},
  // 订单管理
];
export default{
   routes:[
    //  登录
     {name:"login",path:"/login",component:Login},
    //  重定向
    {path:"/",redirect:'/admin'},
    //  管理系统部分路由
     {name:"admin",path:"/admin",component:Admin,children:childs},
   ]
};