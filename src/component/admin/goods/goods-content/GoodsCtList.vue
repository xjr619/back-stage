<template>
  <div>
<el-breadcrumb separator="/">
  <el-breadcrumb-item>知识内容</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>内容管理</el-breadcrumb-item>
</el-breadcrumb>
<div style="margin: 20px 0">
  <el-button plain size="mini" icon="el-icon-plus">新增</el-button>
<el-button plain size="mini" icon="el-icon-check">全选</el-button>
<el-button plain size="mini" icon="el-icon-delete">删除</el-button>
  <el-input placeholder="请输入搜索内容" style="width:180px;float:right;">
    <i slot="suffix" class="el-input__icon el-icon-search"></i>
  </el-input>
</div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>

</style>