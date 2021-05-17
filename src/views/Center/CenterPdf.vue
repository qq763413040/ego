<template>
  <el-dialog title="提示" :visible.sync="dialogVisible" width="70%">
    <el-button @click="dayin">打印合同</el-button>
    <br />
    <br />
    {{ currentPage }} / {{ pageCount }}
    <Pagination
      :total="total"
      :pageSize="pageSize"
      @currentChange="currentChange"
    />
    <pdf
      src="./2021前端工程师面试题手册.pdf"
      @num-pages="pageCount = $event"
      @page-loaded="currentPage = $event"
      :page="num"
      ref="mypdf"
    ></pdf>

    <!-- <pdf
      f
      v-for="i in numPages"
      :key="i"
      :src="src"
      :page="i"
      style="display: inline-block; width: 25%"
    ></pdf> -->

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import pdf from "vue-pdf";
import Pagination from "../../components/Pagination";
var loadingTask = pdf.createLoadingTask("./2021前端工程师面试题手册.pdf");
export default {
  components: {
    pdf,
    Pagination,
  },
  data() {
    return {
      dialogVisible: false,
      src: loadingTask,
      numPages: undefined,
      pageCount: 0,
      currentPage: 0,
      pageSize: 1,
      total: 10,
      num: 1,
    };
  },
  mounted() {
    this.src.promise.then((pdf) => {
      this.numPages = pdf.numPages;
      this.total = pdf.numPages;
    });
  },
  methods: {
    currentChange(val) {
      this.num = val;
    },
    dayin() {
      this.$refs.mypdf.print();
    },
  },
};
</script>

<style lang="less" scoped>
</style>