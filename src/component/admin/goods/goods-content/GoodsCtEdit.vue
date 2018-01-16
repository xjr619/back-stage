<template>
  <div> 
    <!-- 面包屑导航 -->
   <el-breadcrumb separator="/">
  <el-breadcrumb-item>返回上一层</el-breadcrumb-item>
  <el-breadcrumb-item>购物商城</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>编辑商品</el-breadcrumb-item>
</el-breadcrumb>
<!-- 显示的商品详情 -->
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="内容标题" prop="title" >
    <el-input v-model="ruleForm.title"></el-input>
  </el-form-item>
    <el-form-item label="副标题" prop="sub_title" >
    <el-input v-model="ruleForm.sub_title"></el-input>
  </el-form-item>
  <el-form-item label="所属类别" prop="region">
    <el-select v-model="ruleForm.category_id" placeholder="请选择活动区域">
      <el-option v-for="item in goodsCategory" :key="item.category_id" :label="item.title" :value="item.category_id"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="是否发布" prop="delivery">
    <el-switch v-model="ruleForm.status" active-text="是"></el-switch>
  </el-form-item>
    <el-form-item label="推荐类型" prop="delivery">
    <el-switch v-model="ruleForm.is_slide" active-text="轮播图"></el-switch>
    <el-switch v-model="ruleForm.is_top" active-text="置顶"></el-switch>
    <el-switch v-model="ruleForm.is_hot" active-text="推荐"></el-switch>
  </el-form-item>
  <!-- 上传封面 -->
    <el-form-item label="上传封面" prop="delivery">
   <el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList2"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
  </el-form-item>

  <el-form-item label="商品货号" prop="name" >
    <el-input v-model="ruleForm.goods_no"></el-input>
  </el-form-item>
    <el-form-item label="库存数量" prop="name" >
    <el-input v-model="ruleForm.stock_quantity"></el-input>
  </el-form-item>
      <el-form-item label="市场价格" prop="name" >
    <el-input v-model="ruleForm.market_price"></el-input>
  </el-form-item>
        <el-form-item label="销售价格" prop="name" >
    <el-input v-model="ruleForm.sell_price"></el-input>
  </el-form-item>
  <el-form-item label="内容摘要" prop="desc">
    <el-input type="textarea" v-model="ruleForm.zhaiyao"></el-input>
  </el-form-item>
    <el-form-item label="详细内容" prop="desc">
    <el-input type="textarea" v-html="ruleForm.content"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交保存</el-button>
    <el-button >返回上一页</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
export default {
   data() {
      return {
        fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        id:null,
        // 定义保存分类列表
        goodsCategory:[],
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 根据id获取商品数据
      getGoods(){
        this.$http.get(this.$api.gsDetail+this.id)
        .then(res=>{
          if(res.data.status==0){
            // 获取成功吧数据给表格
            this.ruleForm = res.data.message;
          }

        })
      },
      // 获取分类信息
      getCategory(){
        this.$http.get(this.$api.ctList + "goods")
        .then(res=>{
          if(res.data.status==0){
          this.goodsCategory = res.data.message;
          // 转换id的类型
          this.ruleForm.category_id = +this.ruleForm.category_id;  
          }
        })
      },
      // 上传图片相关函数
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    },
    created () {
      // 实例创建的时候获取商品id然后执行数据显示的方法
            this.id = this.$route.params.id;
            this.getGoods();
            this.getCategory();
    }
};
</script>

<style scoped>

</style>