<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="70%"
    :before-close="handleClose"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="类目选择" prop="category">
        <el-button type="primary" @click="innerVisible = true"
          >类目选择</el-button
        >
        {{ ruleForm.category }}
      </el-form-item>

      <el-form-item label="商品名称" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>

      <el-form-item label="商品价格" prop="price">
        <el-input v-model.number="ruleForm.price"></el-input>
      </el-form-item>

      <el-form-item label="商品数量" prop="num">
        <el-input v-model.number="ruleForm.num"></el-input>
      </el-form-item>

      <el-form-item label="商品卖点" prop="sellPoint">
        <el-input v-model="ruleForm.sellPoint"></el-input>
      </el-form-item>

      <el-form-item label="商品图片" prop="image">
        <el-button type="primary" @click="innerVisibleImg = true"
          >上传图片</el-button
        >
        <img
          :src="ruleForm.image"
          alt=""
          style="width: 200px; margin-left: 30px; vertical-align: top"
        />
      </el-form-item>

      <el-form-item label="商品描述" prop="desc">
        <ProductWangeditor @wangVal="wangVal" ref="wangEd" />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="resetForm('ruleForm')">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >确 定</el-button
      >
    </span>

    <!-- 类目弹框 -->
    <el-dialog
      width="50%"
      title="类目选择"
      :visible.sync="innerVisible"
      append-to-body
    >
      <ProductTree @changeTree="changeTree" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 上传文件 -->
    <el-dialog
      width="50%"
      title="上传图片"
      :visible.sync="innerVisibleImg"
      append-to-body
    >
      <ProductUpload @uploadUrl="uploadUrl" />

      <span slot="footer" class="dialog-footer">
        <el-button @click="innerVisibleImg = false">取 消</el-button>
        <el-button type="primary" @click="innerVisibleImg = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </el-dialog>
</template>

<script>
import ProductTree from "./ProductTree";
import ProductUpload from "./ProductUpload";
import ProductWangeditor from "./ProductWangeditor";
export default {
  components: {
    ProductTree, //树
    ProductUpload, //弹窗
    ProductWangeditor, //富文本
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    rowData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      dialogVisible: false, //外嵌弹出框
      innerVisible: false, //内嵌弹出框
      innerVisibleImg: false, //图片弹出框
      ruleForm: {
        category: "", //选择tree树的名称
        title: "", //名称
        price: "", //价格
        num: "", //数量
        desc: "", //富文本
        sellPoint: "", //卖点
        image: "", //图片地址
        cid: "", //cid
        id: "",
      },
      // 表单的规则验证
      rules: {
        title: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        price: [
          {
            required: true,
            message: "请输入商品价格",
            trigger: "blur",
          },
          { type: "number", message: "价格的必须是数字" },
        ],
        num: [
          {
            required: true,
            type: "number",
            message: "请输入商品数量",
            trigger: "blur",
          },
          { type: "number", message: "数量的必须是数字" },
        ],
      },
    };
  },
  watch: {
    rowData(val) {
      this.$nextTick(() => {
        this.ruleForm = val;
        this.ruleForm.desc = val.descs;
        this.$refs.wangEd.editor.txt.html(val.descs);
      });
    },
  },
  methods: {
    //  获取类目名称
    changeTree(data) {
      this.ruleForm.category = data.name;
      this.ruleForm.cid = data.cid;
    },
    // 图片地址
    uploadUrl(url) {
      this.ruleForm.image = url;
    },
    // 富文本编译器
    wangVal(val) {
      this.ruleForm.desc = val;
    },
    // 表单提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 第一步,请求添加商品的接口
          let {
            title,
            image,
            sellPoint,
            price,
            cid,
            category,
            num,
            desc,
            id,
          } = this.ruleForm;

          if (this.title === "添加商品") {
            this.$api
              .insertTbItem({
                title,
                image,
                sellPoint,
                price,
                cid,
                category,
                num,
                desc,
              })
              .then((res) => {
                if (res.status === 200) {
                  // 第二步,刷新数据
                  this.$parent.http(1);
                  // 第三步,成功提示框
                  this.$message({
                    message: "添加成功",
                    type: "success",
                  });
                  //  关闭窗口
                  // this.dialogVisible = false;
                  // 第四步,关闭对话框,清空数据
                  this.resetForm(formName);
                } else {
                  this.$message.error("添加失败");
                }
              });
          } else {
            // 请求编辑
            this.$api
              .updateTbItem({
                title,
                image,
                sellPoint,
                price,
                cid,
                category,
                num,
                desc,
                id,
              })
              .then((res) => {
                if (res.status === 200) {
                  // 第二步,刷新数据
                  this.$parent.http(1);
                  // 第三步,成功提示框
                  this.$message({
                    message: "修改成功",
                    type: "success",
                  });
                  //  关闭窗口
                  // this.dialogVisible = false;
                  // 第四步,关闭对话框,清空数据
                  this.resetForm(formName);
                } else {
                  this.$message.error("添加失败");
                }
              });
          }
        } else {
          return false;
        }
      });
    },
    // 清空表单数据
    resetForm(formName) {
      //  关闭窗口
      this.dialogVisible = false;

      // 清空wang编译内容
      this.$refs.wangEd.editor.txt.clear();
      this.$refs[formName].resetFields();
    },
    //
    handleClose() {
      this.resetForm("ruleForm");
    },
  },
};
</script>

<style lang="less" scoped>
</style>