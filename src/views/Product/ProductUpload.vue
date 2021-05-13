<template>
  <el-upload
    class="upload-demo"
    ref="upload"
    :action="uploadUrl"
    :file-list="fileList"
    :auto-upload="false"
    :on-success="onSuccess"
  >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button
      style="margin-left: 10px"
      size="small"
      type="success"
      @click="submitUpload"
      >上传到服务器</el-button
    >
    <div slot="tip" class="el-upload__tip">
      只能上传jpg/png文件，且不超过1张
    </div>
  </el-upload>
</template>

<script>
import base from "../../api/base";
export default {
  data() {
    return {
      fileList: [],
      uploadUrl: base.baseUrl + base.upload,
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
      setTimeout(() => {
        this.fileList = [];
      }, 3000);
    },
    onSuccess(response) {
      let uploadUrl = response.url.replace("upload\\", base.baseUrl + "/");
      this.$emit("uploadUrl", uploadUrl);
    },
  },
};
</script>

<style lang="less" scoped>
</style>