<template>
  <div class="aside">
   <el-row class="tac">
  <el-col :span="12">
    <h5 class="aside_title">知识分享系统</h5>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu v-for="item in menu" :index="item.title" :key="item.title" class="aside_des">
        <template slot="title">
          <i class="el-icon-message"></i>
          <span>{{item.title}}</span>
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
            { title: "内容管理", path: "/a" },
            { title: "类别管理", path: "/b" },
            { title: "评论管理", path: "/c" }
          ]
        },
        {
          title: "订单",
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
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang ="less">
.aside {
  height: 100%;
  background-color: #267cb7;
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
.adside_sub {
  color: #fff;
  text-decoration: none;
}
.aside_des{
  color: #fff;
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