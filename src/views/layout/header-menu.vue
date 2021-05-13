<template>
  <div class="box">
    <i
      class="iconfont icon-left-indent"
      @click="changeShow"
      :class="isShow ? 'icon-left-indent' : 'icon-right-indent'"
    ></i>
    <div class="right">
      <el-dropdown trigger="click" @command="command">
        <span class="el-dropdown-link">
          下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="zn">中文</el-dropdown-item>
          <el-dropdown-item command="en">English</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <span>hi {{ userInfo.username }}</span>
      <span @click="quit">
        <i class="iconfont icon-poweroff"></i>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      isShow: false,
    };
  },
  computed: {
    ...mapState("loginModule", ["userInfo"]),
  },
  methods: {
    changeShow() {
      this.$emit("trigger", (this.isShow = !this.isShow));
    },
    // 退出
    quit() {
      localStorage.removeItem("userInfo");
      // this.$router.push("/product");
      window.location.reload();
    },
    //
    command(command) {
      this.$i18n.locale = command;
    },
  },
  mounted() {
    console.log(this.$i18n);
  },
};
</script>

<style lang="less" scoped>
.box {
  background: lightblue;
  .iconfont {
    font-size: 30px;
    margin-left: 10px;
    color: #fff;
  }
  .right {
    float: right;
    color: #fff;
    height: 100%;
    .el-dropdown-link {
      color: #fff;
    }
    span {
      margin: 0 6px;
    }
    .iconfont {
      font-size: 20px;
      position: relative;
      top: 2px;
    }
  }
}
</style>