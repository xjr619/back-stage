// 导出编写路由守卫的文件
// 引入相关模块进行接口请求
import axios from 'axios'
import api from '../js/api-config.js'
export default function(to,from,next){
  // 得到要访问页面的名称
  var toPageName = to.name;
  // 请求接口看是否登录过
  axios.get(api.islogin)
  .then(res =>{
    let islogin = false;
      // 登录过的话就让登录状态置为true
      if(res.data.code=='logined'){
        islogin = true;
      }
      // 如果访问的是登录页面并且是登录状态则直接跳到admin管理，通过的toPageName来判断访问的页面是否是登录页
      if(toPageName=='login' && islogin){
        next({name:'admin'});
      }else if(toPageName!='login' && !islogin){
        // 如果不是登录页并且不是登录状态则返回登录页并记下完成路径以便登录模块提高用户体验
        next({name:'login',query:{nextPage:to.fullPath}})
      }else{
        // 都不是的话说明既不是登录页面并且还是登录状态就正常进行跳转
        next();
      }
  });

}