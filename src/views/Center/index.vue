<template>
  <div>
    <el-button @click="dakaiPdf">查看合同</el-button>
    <CenterPdf ref="mypdf" />
  </div>
</template>

<script>
import CenterPdf from "./CenterPdf";
export default {
  components: {
    CenterPdf,
  },
  methods: {
    dakaiPdf() {
      this.$refs.mypdf.dialogVisible = true;
    },
  },
};
</script>

<style lang="less" scoped>
</style>