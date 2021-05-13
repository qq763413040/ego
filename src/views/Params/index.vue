<template>
  <div>
    <div class="search">
      <el-input
        v-model="input"
        placeholder="请输入内容"
        @change="search"
      ></el-input>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button type="primary" @click="addProduct">添加</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
    };
  },
  methods: {
    search(){},
    addProduct(){}
  }
};
</script>

<style lang="less" scoped>
.search {
  display: flex;
  padding: 20px;
}
</style>