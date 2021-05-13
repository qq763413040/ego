<template>
  <div class="box">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#409EFF"
      router
      :collapse="isCollapse"
    >
      <el-menu-item class="elitem">
        <span>{{ $t("message.home.ego") }}</span>
      </el-menu-item>
      <el-menu-item index="/product">
        <i class="el-icon-menu"></i>
        <!-- <span slot="title">商品管理</span> -->
        <span slot="title">{{ $t("message.home.commodity") }}</span>
      </el-menu-item>
      <el-menu-item index="/params">
        <i class="el-icon-document"></i>
        <span slot="title">{{ $t("message.home.params") }}</span>
      </el-menu-item>
      <el-menu-item index="/advert">
        <i class="el-icon-setting"></i>
        <span slot="title">{{ $t("message.home.advertising") }}</span>
      </el-menu-item>
      <el-menu-item index="/center">
        <i class="el-icon-s-custom"></i>
        <span slot="title">{{ $t("message.home.personalCenter") }}</span>
      </el-menu-item>

      <el-submenu index="/order">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{ $t("message.home.orderManagement") }}</span>
        </template>
        <el-menu-item index="/order/orderList">
          <i class="el-icon-switch-button"></i>
          <span>{{ $t("message.home.orderList") }}</span>
        </el-menu-item>
        <el-submenu index="/order/product">
          <span slot="title">{{ $t("message.home.production") }}</span>
          <el-menu-item index="/order/product/productionList">
            <i class="el-icon-s-operation"></i>
            <span>{{ $t("message.home.productionList") }}</span>
          </el-menu-item>
          <el-menu-item index="/order/product/review">
            <i class="el-icon-notebook-2"></i>
            <span>{{ $t("message.home.AuditManagement") }}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="/order/returng">
          <i class="el-icon-box"></i>
          <span>{{ $t("message.home.returnManagement") }}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // isCollapse: false,
    };
  },
  props: {
    // 显示隐藏
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .elitem {
    height: 50px;
  }
  .el-menu-vertical-demo {
    border-right: none;
    .is-active {
      background: #2d3135 !important;
    }
  }
}
</style>