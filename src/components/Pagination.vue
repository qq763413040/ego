<template>
  <el-pagination
    background
    layout="total,prev, pager, next,jumper"
    :page-size="pageSize"
    :total="total"
    @current-change="currentChange"
    class="page"
  >
  </el-pagination>
</template>

<script>
export default {
  props: {
    pageSize: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {};
  },
  methods: {
    currentChange(val) {
      // 传给父组件
      this.$emit("currentChange", val);
    },
  },
};
</script>

<style lang="less" scoped>
.page {
  padding-bottom: 0;
}
</style>