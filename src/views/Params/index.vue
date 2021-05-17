<template>
  <div class="params">
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
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="itemCatId" label="规格参数ID" width="140">
        </el-table-column>
        <el-table-column prop="id" label="类目ID" width="140">
        </el-table-column>
        <el-table-column prop="specsName" label="规格名称" width="140">
        </el-table-column>
        <el-table-column prop="paramData" label="规格参数"> </el-table-column>
        <el-table-column label="操作" width="200">
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
    </div>

    <!-- 分页 -->
    <div class="page">
      <Pagination
        :total="total"
        :pageSize="pageSize"
        @currentChange="currentChange"
      />
    </div>

    <!-- 弹窗 -->
    <ParamsDialog ref="myDialog" />
  </div>
</template>

<script>
import Pagination from "../../components/Pagination";
import ParamsDialog from "./ParamsDialog";
export default {
  components: {
    Pagination, //分页
    ParamsDialog, //弹窗
  },
  data() {
    return {
      input: "",
      tableData: [],
      total: 1,
      pageSize: 1,
    };
  },
  methods: {
    handleEdit() {},
    handleDelete(row) {
      this.$api.delete({ id: row.id }).then((res) => {
        if (res.status === 200) {
          this.http();
        }
      });
    },

    search() {},
    addProduct() {
      this.$refs.myDialog.dialogVisible = true;
    },
    currentChange(val) {
      this.http(val);
    },
    // 参数列表
    http(page) {
      this.$api.selectItemParamAll({ page }).then((res) => {
        if (res.status === 200) {
          this.tableData = res.data;
          this.total = res.total;
          this.pageSize = res.pageSize;
        }
      });
    },
  },
  created() {
    this.http(1);
  },
};
</script>

<style lang="less" scoped>
.params {
  padding: 20px;
  padding-bottom: 0;

  .search {
    display: flex;
  }
  .page {
    margin-top: 40px;
    text-align: center;
  }
}
</style>