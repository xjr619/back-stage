<template>
  <div class="gooList">
    <!-- 面包屑导航 -->
<el-breadcrumb separator="/">
  <el-breadcrumb-item>知识内容</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>内容管理</el-breadcrumb-item>
</el-breadcrumb>
<!-- 按钮组 -->
<div style="margin: 20px 0">
  <el-button plain size="mini" icon="el-icon-plus" class="topBtn">新增</el-button>
<el-button plain size="mini" icon="el-icon-check" class="topBtn">全选</el-button>
<el-button plain size="mini" icon="el-icon-delete" class="topBtn">删除</el-button>
  <el-input placeholder="请输入搜索内容" style="width:180px;float:right;" v-model="goodsQuery.searchvalue" @blur="getGoodsList">
    <i slot="suffix" class="el-input__icon el-icon-search"></i>
  </el-input>
</div>
<!-- 商品列表 -->
<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
    <el-table-column type="selection" width="55">
    </el-table-column>
    <el-table-column label="标题">
      <template slot-scope="scope">
        <!--提示信息部分  -->
        <el-tooltip class="item" effect="dark"  placement="right">
            <div slot="content">
              <img :src="scope.row.imgurl" alt="商品预览" style="width:200px">
            </div>
              <router-link :to="{name:'goodsCtEdit',params:{ id:scope.row.id}}">{{scope.row.title}}</router-link>
    </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="categoryname" label="所属类别" width="120">
    </el-table-column>
     <el-table-column prop="stock_quantity" label="库存" width="120">
    </el-table-column>
    <el-table-column prop="market_price" label="市场价" width="120">
    </el-table-column>
    <el-table-column prop="sell_price" label="销售价" width="120">
    </el-table-column>
    <!-- 包裹多个数据的时候只能用template -->
    <el-table-column prop="name" label="属性" width="120">
       <template slot-scope="scope">
         <i class="el-icon-picture"></i>
         <i class="el-icon-upload "></i>
         <i class="el-icon-star-on"></i>
       </template>
    </el-table-column>
    <el-table-column prop="name" label="操作" width="120">
      <template slot-scope="scope">
        <router-link :to="{name:'goodsCtEdit',params:{ id:scope.row.id}}">修改</router-link>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 103,
          title: "骆驼男装2017秋季新款运动休闲纯色夹克青年宽松长袖针织开衫卫",
          is_top: 1,
          is_hot: 1,
          is_slide: 1,
          categoryname: "男装",
          img_url: "/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg",
          imgurl:
            "http://139.199.192.48:6060/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg",
          goods_no: "NZ0000000002",
          stock_quantity: 200,
          market_price: 1000,
          sell_price: 800
        }
      ],
      goodsQuery: {
        pageIndex: 1,
        pageSize: 10,
        searchvalue: ""
      }
    };
  },
  methods: {
    // 获取商品列表
    getGoodsList() {
      this.$http
        .get(this.$api.gsList, { params: this.goodsQuery })
        .then(res => {
          console.log(res);
          this.tableData = res.data.message;
          //  totalcount: 27,
          // pageIndex: 1,
          // pageSize: 1
        });
    }
  },
  created() {
    // 实例生成的时候查询数据进行填充
    this.getGoodsList();
  }
};
</script>

<style scoped lang="less">
.gooList {
  .topBtn {
    margin-left: 0;
  }
}
</style>