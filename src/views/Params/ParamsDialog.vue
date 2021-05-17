<template>
  <div>
    <el-dialog
      title="商品类目规格参数"
      :visible.sync="dialogVisible"
      width="60%"
    >
      <ProductTree @changeTree="changeTree" />

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ziDialog" :disabled="disabled"
          >确定并添加类目</el-button
        >
      </span>
    </el-dialog>

    <!-- 内层 -->
    <el-dialog
      width="50%"
      title="添加规格参数"
      :visible.sync="innerVisible"
      append-to-body
    >
      <p>当前选择类目是: {{ treeName.name }}</p>
      <el-button @click="addDomain">新增商品类目</el-button>
      <hr />

      <div>
        <el-form :model="dynamicForm" ref="dynamicForm" label-width="100px">
          <el-form-item
            v-for="(good, index) in dynamicForm.goods"
            :label="good.title + index"
            :key="good.key"
            :prop="'goods.' + index + '.value'"
          >
            <div class="item">
              <el-input v-model="good.title"></el-input>
              <el-button @click.prevent="addItem(index)">添加子组</el-button>
              <el-button @click.prevent="removeDomain(index)">删除组</el-button>
            </div>
            <!-- 内子组 -->
            <div class="zitem">
              <el-form-item
                v-for="(item, i) in good.children"
                :key="i"
                :label="item.title + i"
              >
                <div class="item">
                  <el-input v-model="item.title"></el-input>
                  <el-button @click.prevent="removeItem(index, i)"
                    >删除</el-button
                  >
                </div>
              </el-form-item>
            </div>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('dynamicForm')"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ProductTree from "../Product/ProductTree";
export default {
  components: {
    ProductTree,
  },

  data() {
    return {
      dialogVisible: false,
      disabled: true, //选择按钮是否禁用
      innerVisible: false,
      treeName: {},
      dynamicForm: {
        //动态表格
        goods: [
          //   {
          //     value: "",
          //     title: "",
          //     children: [
          //       {
          //         value: "",
          //         title: "",
          //       },
          //       {
          //         value: "",
          //         title: "",
          //       },
          //     ],
          //   },
          //   {
          //     value: "",
          //     title: "",
          //   },
        ],
      },
    };
  },
  methods: {
    changeTree(val) {
      this.treeName = val;
      this.disabled = false;
    },
    // 内部弹窗
    ziDialog() {
      this.innerVisible = true;
    },
    submitForm() {
      this.$api
        .insertItemParam({
          itemCatId: this.treeName.cid,
          content: JSON.stringify(this.dynamicForm.goods),
          specsName: this.treeName.name,
        })
        .then((res) => {
          if (res.status === 200) {
            this.$notify({
              title: "成功",
              message: "添加成功",
              type: "success",
            });
            this.$parent.http();
            this.innerVisible = false;
            this.dialogVisible = false;
          }
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(index) {
      this.dynamicForm.goods.splice(index, 1);
    },
    // 添加夫组
    addDomain() {
      this.dynamicForm.goods.push({
        value: "",
        title: "",
        children: [],
      });
    },
    // 删除子组
    removeItem(index, i) {
      this.dynamicForm.goods[index].children.splice(i, 1);
    },
    // 添加子组
    addItem(index) {
      this.dynamicForm.goods[index].children.push({
        title: "",
        value: "",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.item {
  display: flex;
  button {
    margin-left: 20px;
  }
}
.zitem {
  width: 70%;
  float: right;
  margin-top: 10px;
}
</style>