<template>
  <div class="box">
    <!-- 侧边导航 -->
    <SlideMenu class="slideMenu" :isCollapse="isCollapse" />
    <!-- 顶部导航 -->
    <HeaderMenu class="HeaderMenu" @trigger="trigger" />
    <!-- 内容 -->
    <LayoutConent class="layoutConent" :class="isCollapse?'conent':''"/>
  </div>
</template>

<script>
import HeaderMenu from "./header-menu";
import LayoutConent from "./layout-conent";
import SlideMenu from "./slide-menu";
export default {
  components: {
    HeaderMenu,
    LayoutConent,
    SlideMenu,
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    trigger(val) {
      this.isCollapse = val;
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  height: 100%;
  .slideMenu {
    height: 100%;
    float: left;
    background: rgb(48, 65, 86);
  }
  .HeaderMenu {
    height: 50px;
    line-height: 50px;
    background: #1e78be;
  }
  .layoutConent{
    margin-left: 200px;
  }
  .conent{
    margin-left: 64px;
  }
}
</style>