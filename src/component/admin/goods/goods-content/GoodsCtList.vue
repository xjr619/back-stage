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
<el-button plain size="mini" icon="el-icon-check" class="topBtn" @click="selectAll">全选</el-button>
<el-button plain size="mini" icon="el-icon-delete" class="topBtn" @click="delGoods">删除</el-button>
  <el-input placeholder="请输入搜索内容" style="width:180px;float:right;" v-model="goodsQuery.searchvalue" @blur="getGoodsList">
    <i slot="suffix" class="el-input__icon el-icon-search"></i>
  </el-input>
</div>
<!-- 商品列表 -->
<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" 
@selection-change="selectionChange">
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
    <el-table-column prop="name" label="状态" width="120">
       <template slot-scope="scope">
         <i :class="['el-icon-picture',scope.row.is_slide==1?'active':'']"
         @click="mififyStatus(scope.row.id,'is_slide',scope.row.is_slide==1?false:true)"></i>
         <i :class="['el-icon-upload2',scope.row.is_top==1?'active':'']"
          @click="mififyStatus(scope.row.id,'is_top',scope.row.is_top==1?false:true)"></i>
         <i :class="['el-icon-star-on',scope.row.is_hot==1?'active':'']"
         @click="mififyStatus(scope.row.id,'is_hot',scope.row.is_hot==1?false:true)"></i>
       </template>
    </el-table-column>
    <el-table-column prop="name" label="操作" width="120">
      <template slot-scope="scope">
        <router-link :to="{name:'goodsCtEdit',params:{ id:scope.row.id}}">修改</router-link>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页部分 -->
   <!-- @size-change="handleSizeChange" -->
    <!-- @current-change="handleCurrentChange" -->
      <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="goodsQuery.pageIndex"
      :page-sizes="page.pageSizes"
      :page-size="goodsQuery.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total">
    </el-pagination>
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
      // 查询相关参数
      goodsQuery: {
        pageIndex: 1,
        pageSize: 10,
        searchvalue: ""
      },
      page:{
        pageSizes:[10,20,30,40],
        total:100
      },
      // 定义一个数组保存选择了的选项
      selections:[]
    };
  },
  methods: {
    // 获取商品列表
    getGoodsList() {
      this.$http
        .get(this.$api.gsList, { params: this.goodsQuery })
        .then(res => {
          this.tableData = res.data.message;
          // 根据返回的总页数和页面总数赋值关联起来
          this.page.total = res.data.totalcount;
          //  totalcount: 27,
          // pageIndex: 1,
          // pageSize: 1
        });
    },
    // 根据状态获取元素模拟的因为没接口用
    mififyStatus(id,type,newStatus){
        // this.tableData.filter(goods => goods.id == id)[0][type] = newStatus? 1: 0;
        this.tableData.filter(goods => goods.id == id)[0][type] = newStatus? 1: 0;
    },
    // 改变当前页
    currentChange(pageIndex){
      this.goodsQuery.pageIndex = pageIndex;
      // 改变后重新渲染
      this.getGoodsList();
    },
    // 改变当前显示的条数
    sizeChange(pageSize){
      this.goodsQuery.pageSize=pageSize;
      // 改变显示页数时也重新渲染
       this.getGoodsList();
    },
    // 把选中的选项保存起来
    selectionChange(selection){
      this.selections = selection;
    },
    // 删除商品
    del(){
      // 得到要删除商品的id
      var ids = this.selections.map(v=>v.id).join(",");
      // 调用接口
      this.$http.get(this.$api.gsDel + ids)
      .then(res=>{
        if(res.data.status==0){
          // 删除成功就让选择的重新置为空
          this.selections = [];
           this.$message({
            type: 'success',
            message: '删除成功!'
          });
          // 删除成功重新渲染
          this.getGoodsList();
        }
      })
    },
// 弹出确认框看是否删除
     delGoods() {
        this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            // 点击确认键就执行删除方法
            this.del();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      // 全选
      selectAll(){
        // 获取标题的dom元素间接执行它的点击事件和全选关联起来看全选功能只能在改变事件里面看因为它是异步的
        document.querySelector(".el-checkbox__inner").click();
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
[class^=el-icon]{
  font-size: 18px;
  color:rgba(0, 0, 0, 0.3);
  &.active{
    color: #000;
  }
}
</style>