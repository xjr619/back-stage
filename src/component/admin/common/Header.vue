<template>
  <div class="admin_header">
   <el-row class="block-col-2">
  <el-col :span="12">
     <i class="el-icon-menu header_left"></i>
    <span class="demonstration">你好admin</span>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>预览网站</el-dropdown-item>
        <el-dropdown-item>修改密码</el-dropdown-item>
        <el-dropdown-item @click.native="loginout">注销登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-col>
</el-row>
  </div>
</template>

<script>
  export default {
    methods:{
      loginout(){
        this.$http.get(this.$api.logout)
        .then(res=>{
          if(res.data.status==0){
          // 退出成功跳回登录页
          this.$router.push({name:'login'})
          }else{
            this.$alert(res.data.message);
          }
        })
      }
    }
  }
</script>

<style>
.el-header{
  padding: 0;
}
.header_left{
  float: left;
  margin-top: 20px;
  margin-left: 10px;
  color: #686f7f;
  font-size: 20px;
  cursor: pointer;
}
.admin_header .block-col-2{
  text-align: right;
  line-height: 60px;
  padding-right: 10px;
  background-color: #fafafa;
}
</style>