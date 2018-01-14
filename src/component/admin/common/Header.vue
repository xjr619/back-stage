<template>
   <el-row class="block-col-2">
     <i class="el-icon-menu header_left"></i>
    <el-dropdown trigger="click" class="header_drop">
    <span class="demonstration">你好{{name}}</span>
      <span class="el-dropdown-link">
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>预览网站</el-dropdown-item>
        <el-dropdown-item>修改密码</el-dropdown-item>
        <el-dropdown-item @click.native="loginout">注销登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
</el-row>

</template>

<script>
export default {
  data() {
    return {
      name: "admin"
    };
  },
  methods: {
    loginout() {
      this.$http.get(this.$api.logout).then(res => {
        if (res.data.status == 0) {
          // 退出成功跳回登录页
          this.$router.push({ name: "login" });
        } else {
          this.$alert(res.data.message);
        }
      });
    }
  }
};
</script>

<style scoped>
.header_left{
  cursor: pointer;
  position: absolute;
  top: 22px;
  z-index: 9999;
}
.header_drop{
  display: block;
  cursor: pointer;
  height: 60px;
  text-align: right;
  line-height: 60px;

}
</style>