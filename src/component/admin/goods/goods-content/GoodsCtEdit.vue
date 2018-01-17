<template>
  	<div> 
    <!-- 面包屑导航 -->
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>返回上一层</el-breadcrumb-item>
			<el-breadcrumb-item>购物商城</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-text="this.id==null?'添加商品':'编辑商品'"></el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 显示的商品详情 -->
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="内容标题" prop="title" >
				<el-input v-model="ruleForm.title"></el-input>
			</el-form-item>
			<el-form-item label="副标题" prop="sub_title" >
				<el-input v-model="ruleForm.sub_title"></el-input>
			</el-form-item>
			<el-form-item label="所属类别" prop="category_id">
				<el-select v-model="ruleForm.category_id" placeholder="请选择活动区域">
					<el-option v-for="item in goodsCategory" :key="item.category_id" :label="item.title" :value="item.category_id">
					<!-- 处理分类的显示二级的给他加上一些表示 -->
						<span v-if="item.class_layer!=1">-</span>
						<span>{{item.title}}</span>
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否发布">
				<el-switch v-model="ruleForm.status" active-text="是"></el-switch>
			</el-form-item>
			<el-form-item label="推荐类型">
				<el-switch v-model="ruleForm.is_slide" active-text="轮播图"></el-switch>
				<el-switch v-model="ruleForm.is_top" active-text="置顶"></el-switch>
				<el-switch v-model="ruleForm.is_hot" active-text="推荐"></el-switch>
			</el-form-item>
			<!-- 上传封面 -->
			<el-form-item label="上传封面" prop="imgList">
				<el-upload class="upload-demo" action="http://localhost:8899/admin/article/uploadimg" :file-list="ruleForm.imgList" :on-success ="imgUpaloaded" :on-remove = "removeImg" list-type="picture">
					<el-button size="small" type="primary">点击上传</el-button>
					<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
			</el-form-item>
			<!-- 上传文件 -->
			<el-form-item label="上传文件">
				<el-upload class="upload-demo"	action="http://localhost:8899/admin/article/uploadfile"	:file-list="ruleForm.fileList" :on-success="fileUploaded">
					<el-button size="small" type="primary">点击上传</el-button>
					<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
			</el-form-item>
			<el-form-item label="商品货号" prop="goods_no" >
				<el-input v-model="ruleForm.goods_no"></el-input>
			</el-form-item>
				<el-form-item label="库存数量" prop="stock_quantity" >
				<el-input v-model="ruleForm.stock_quantity"></el-input>
			</el-form-item>
				<el-form-item label="市场价格" prop="market_price" >
				<el-input v-model="ruleForm.market_price"></el-input>
			</el-form-item>
					<el-form-item label="销售价格" prop="sell_price" >
				<el-input v-model="ruleForm.sell_price"></el-input>
			</el-form-item>
			<el-form-item label="内容摘要" prop="zhaiyao">
				<el-input type="textarea" v-model="ruleForm.zhaiyao"></el-input>
			</el-form-item>
			<!-- 详细内容富文本显示 -->
			<el-form-item prop="content">
				<quill-editor v-model="ruleForm.content">
				</quill-editor>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">提交保存</el-button>
				<el-button >返回上一页</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
// 引入富文本插件
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  components: {
    quillEditor: quillEditor
  },
  data() {
    function validateImg(rule, value, callback) {
      // 如果图片不存在则校验不通过
      if (value == "" || value.length == 0) {
        callback(new Error("请上传图片"));
      }else{
		//   通过调用callback正常执行
		  callback();
	  }
    }
    return {
      id: null,
      // 定义保存分类列表
      goodsCategory: [],
      ruleForm: {},
      rules: {
        title: [{ required: true, message: "请输入商品标题", trigger: "blur" }],
        sub_title: [{ required: true, message: "请输入副标题", trigger: "blur" }],
        category_id: [
          { required: true, message: "请选择所属类别", trigger: "change" }
        ],
        imgList: [
          // 自定义表单验证
          { validator: validateImg, trigger: "submit" }
        ],
        goods_no: [{ required: true, message: "请输入商品货号", trigger: "blur" }],
        stock_quantity: [
          { required: true, message: "请输入库存数量", trigger: "blur" }
        ],
        market_price: [{ required: true, message: "请输入市场价格", trigger: "blur" }],
        sell_price: [{ required: true, message: "请输入销售价格", trigger: "blur" }],
        zhaiyao: [{ required: true, message: "请输入内容摘要", trigger: "blur" }],
        content: [{ required: true, message: "请输入详细内容", trigger: "blur" }]
      }
    };
  },
  methods: {
	//   修改函数
	modify(){
		this.$http.post(this.$api.gsEdit+this.id,this.ruleForm)
		.then(res =>{
			this.$alert('跳回商品列表', '修改成功', {
          confirmButtonText: '确定',
          callback: action => {
           this.$router.push({name:"goodsCtList"});
          }
        });
		})
  },
  // 添加函数
  addGoods(){
      this.$http.post('/admin/goods/add/goods',this.ruleForm)
      .then(res=>{
       this.$alert('跳回商品列表', '增加改成功', {
          confirmButtonText: '确定',
          callback: action => {
           this.$router.push({name:"goodsCtList"});
          }
        });
      })
  },
    submitForm(formName) {
      // 表单校验
      this.$refs[formName].validate(valid => {
        if (valid) {
            if (this.id !=null) {
              		  //  修改页面的校验通过执行修改函数
			            this.modify();
            }else{
                // 添加页面的校验通过就执行这里
                console.log(111)
                this.addGoods();
            }
        } else {
          if(this.id !=null){
            //  不通过修改的则提示校验失败
          this.$alert("修改失败");
          }else{
            // 不通过添加的执行这里
             this.$alert("添加失败");
          }
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 根据id获取商品数据
    getGoods() {
      this.$http.get(this.$api.gsDetail + this.id).then(res => {
        if (res.data.status == 0) {
          // 获取成功吧数据给表格
          this.ruleForm = res.data.message;
        }
      });
    },
    // 获取分类信息
    getCategory() {
      this.$http.get(this.$api.ctList + "goods").then(res => {
        if (res.data.status == 0) {
          this.goodsCategory = res.data.message;
          if (this.id==null) {
            // id等于空就默认渲染添加类的id否则添加修改的那个id
                      this.goodsCategory.forEach((value,index)=>{
               if(value.class_layer==1){
                 this.ruleForm.category_id = value.category_id;
               }
          })
          }

          // 转换id的类型注意v-model里面的关联数据类型是string要转化成数字
          this.ruleForm.category_id = +this.ruleForm.category_id;
        }
      });
    },
    // 封面上传成功的改变图片的列表显示
    imgUpaloaded(res, file, fileList) {
      // 上传的图片把原来覆盖
      this.ruleForm.imgList = [res];
    },
    // 删除封面图实际上是把原来的图片过滤掉
    removeImg(file, fileList) {
      // 得到要删除的路径
      let url = file.url;
      //  把imgList过滤掉原来的，防止提交表单的时候imgList还包含避免了假删除现象
      this.ruleForm.imgList = this.ruleForm.imgList.filter(
        item => item.url != url
      );
    },
    // 上传文件函数
    fileUploaded(res, file, fileList) {
     if(this.ruleForm.fileList==undefined){
       this.ruleForm.fileList = [res];
     }
      // 上传文件时把返回的文件推进文件列表
      this.ruleForm.fileList.push(res);
    }
  },
  created() {
    // 实例创建的时候获取商品id然后执行数据显示的方法
    this.id = this.$route.params.id;
    // id存在的时候在渲染
    if (this.id !==null) {
          this.getGoods();
    }
    this.getCategory();
  }
};
</script>

<style scoped>

</style>