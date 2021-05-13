<template>
  <div class="login">
    <div class="box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="登录" name="first">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="账号" prop="username">
              <el-input
                type="text"
                v-model="ruleForm.username"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="ruleForm.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="second">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="账号" prop="username">
              <el-input
                type="text"
                v-model="ruleForm.username"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="ruleForm.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >注册</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };

    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };

    return {
      activeName: "first",
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations("loginModule", ["setUserInfo"]),
    ...mapActions("loginModule", ["getLoginActions"]),
    submitForm(formName) {
      let { username, password } = this.ruleForm;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.activeName == "first") {
            // 登录,提到vuex里
            this.getLoginActions({ username, password });
          } else {
            this.$api.getRegister({ username, password }).then((res) => {
              if (res.status === 200) {
                this.$message({
                  message: "恭喜你,注册成功,快去登录吧!",
                  type: "success",
                });
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    handleClick() {
      this.ruleForm = {
        username: "",
        password: "",
      };
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  background: #eee;
  height: 100%;
  position: relative;
  .box {
    width: 500px;
    height: 300px;
    border: 1px solid #eee;
    background: #fff;
    padding: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .demo-ruleForm {
      margin-top: 50px;
    }
  }
}
</style>