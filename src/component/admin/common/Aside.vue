<template>
  <div class="aside">
   <el-row class="tac">
  <el-col :span="12">
    <h5 class="aside_title">知识分享系统</h5>
    <el-menu 
      default-active="2"
      class="el-menu-vertical-demo aside_des"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu v-for="item in menu" :index="item.title" :key="item.title">
        <template slot="title" >
          <div class="aside_title">
          <i class="el-icon-message"></i>
          <span>{{item.title}}</span>
          </div>
        </template>
          <el-menu-item :index="subitem.title" class="el-icon-document aside_sub_item" v-for="subitem in item.children" :key="subitem.title"><router-link :to="subitem.path" class="adside_sub">{{subitem.title}}</router-link>
          </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-col>
</el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        // 数据内容展示
        {
          title: "资源下载",
          children: [
            { title: "内容管理", path: "/a" },
            { title: "类别管理", path: "/b" },
            { title: "评论管理", path: "/c" }
          ]
        },
        {
          title: "购物商城",
          children: [
            { title: "内容管理", path: "admin/goods/content/list" },
            { title: "类别管理", path: "/b" },
            { title: "评论管理", path: "/c" }
          ]
        },
        {
          title: "订单管理",
          children: [
            { title: "内容管理", path: "/a" },
            { title: "类别管理", path: "/b" },
            { title: "评论管理", path: "/c" }
          ]
        }
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
    
    },
    handleClose(key, keyPath) {
     
    }
  }
};
</script>

<style lang ="less" scoped>
.aside {
  height: 100%;
  background-color: #267cb7;
  color: #fff;
  overflow: hidden;
}
.aside .el-submenu__title i{
  color: #fff;
}
.aside .aside_title{
  width: 100%;
}
.aside .aside_title:hover{
  background-color: #267cb7;
}
.aside_des li span{
  color: #fff;
}
.el-menu {
  background-color: #267cb7;
}
.aside_title {
  text-align: center;
}
.el-col-12 {
  width: 100%;
}
.aside .el-submenu .el-menu-item{
  text-align: right;
  padding:0 45px 0 0;
}
.adside_sub {
  color: #fff;
  text-decoration: none;
}
.aside .el-submenu__title,
.aside .el-submenu__title i{
  color: #fff;
}
.aside .el-submenu__title:hover,.aside_sub_item:hover,
.aside .el-submenu__title:active,.aside_sub_item:active,
.aside .el-submenu__title:focus,.aside_sub_item:focus,{
  background-color: #20a0ff;
  color: #fff;
}
.aside_sub_item{
  background-color: #267cb7;
  color: #fff;
}
</style>