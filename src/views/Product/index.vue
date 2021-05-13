<template>
  <div>
    <!-- 搜索 -->
    <div class="search">
      <el-input
        v-model="input"
        placeholder="请输入内容"
        @change="search"
      ></el-input>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button type="primary" @click="addProduct">添加</el-button>
    </div>

    <!-- 表格 -->
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      ref="myTable"
      @selection-change="selectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>

      <el-table-column prop="id" label="商品ID" width="100"> </el-table-column>
      <el-table-column
        prop="title"
        label="商品名称"
        width="150"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="price"
        label="商品价格"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="num"
        label="商品数量"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="category"
        label="规格类目"
        width="150"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="image"
        label="商品图片"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="sellPoint"
        label="商品卖点"
        width="150"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="descs"
        label="商品描述"
        width="150"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 批量删除 -->
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])"
        >切换第二、第三行的选中状态</el-button
      >
      <el-button @click="toggleSelection()">取消选择</el-button>
      <el-button @click="delSelection">批量删除</el-button>
    </div>

    <!-- 分页 -->
    <div class="page">
      <Pagination
        @currentChange="currentChange"
        :pageSize="pageSize"
        :total="total"
      />
    </div>
    <!-- 弹窗 -->
    <ProductDialog ref="product" :title="title" :rowData="rowData" />
  </div>
</template>

<script>
import Pagination from "../../components/Pagination";
import ProductDialog from "./ProductDialog";
export default {
  components: {
    Pagination,
    ProductDialog,
  },
  data() {
    return {
      tableData: [], //表格数据
      pageSize: 1,
      total: 10,
      input: "", //input的输入框
      title: "", //弹窗的名称
      idArr: [], //批量删除所用数据
      rowData: {}, //
      page:'',//
    };
  },
  methods: {
    // 点击编辑
    handleEdit(index, row) {
      // 显示弹框
      this.$refs.product.dialogVisible = true;
      // 重新给新地址
      this.rowData = { ...row };
      this.title = "编辑商品";
    },
    // 点击删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除
          this.$api.deleteItemById({ id: row.id }).then((res) => {
            if (res.status === 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              // 请求当前页
              this.http(this.page);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //批量删除
    delSelection() {
      if (this.idArr.length > 0) {
        this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            // 删除
            this.$api.batchDelete({ idArr: this.idArr }).then((res) => {
              if (res.status === 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.http(1);
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消批量删除",
            });
          });
      } else {
        this.$message.error("请选择要删除的数据");
      }
    },
    //获取选择的元素
    selectionChange(selection) {
      let arr = [];
      selection.forEach((e) => {
        arr.push(e.id);
      });
      this.idArr = arr;
    },
    // 取消选择,切换第二  三行的状态
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.myTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.myTable.clearSelection();
      }
    },

    // 子元素传来的值
    currentChange(val) {
      this.http(val);
      this.page = val
    },
    // 搜索
    search() {
      // 输入为空请求第一页
      if (this.input == "") {
        this.http(1);
        return;
      }

      this.$api.getSearch({ search: this.input }).then((res) => {
        if (res.status === 200) {
          this.tableData = res.result;
          this.pageSize = 8;
          this.total = 1;
        } else {
          this.tableData = [];
          this.pageSize = 1;
          this.total = 1;
        }
      });
    },
    // 添加
    addProduct() {
      this.title = "添加商品";
      this.$refs.product.dialogVisible = true;
    },

    // 分页网络请求
    http(page) {
      this.$api.getTable({ page }).then((res) => {
        this.tableData = res.data;
        this.total = res.total;
        this.pageSize = res.pageSize;
      });
    },
  },
  created() {
    this.http(1);
  },
};
</script>

<style lang="less" scoped>
.page {
  margin-top: 30px;
  text-align: center;
}
.search {
  display: flex;
  padding: 20px;
}
</style>