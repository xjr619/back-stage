<template>
  <el-container class="admin">
  <el-aside width="200px">
    <!-- 侧边栏组件 -->
    <Aside></Aside>
  </el-aside>
  <el-container>
    <el-header>
      <!-- 头部组件 -->
      <Header></Header>
    </el-header>
    <!-- 管理系统内容主体 -->
    <el-main>我是主体</el-main>
  </el-container>
</el-container>
</template>
<script>
import Header from './common/Header.vue'
import Aside from './common/Aside.vue'
  export default{
    components:{
      Header,
      Aside
    }
  }
</script>
<style>
  .el-header{
    background-color: #B3C0D1;
    color: #333;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }
  .admin{
    height: 100%;
  }
</style>
