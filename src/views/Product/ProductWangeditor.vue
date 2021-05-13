<template>
  <div id="main"></div>
</template>

<script>
import E from "wangeditor";
export default {
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
    this.editor = new E("#main");
    // 设置编辑区域高度为 500px
    this.editor.config.height = 300;
    // 取消自动 focus
    this.editor.config.focus = false;

    // 默认情况下，显示所有菜单
    this.editor.config.menus = [
      "head",
      "bold",
      "fontSize",
      "fontName",
      "italic",
      "underline",
      "strikeThrough",
      "indent",
      "lineHeight",
      "foreColor",
      "backColor",
      "link",
      "list",
      "todo",
      "justify",
      "quote",
      "emoticon",
      "table",
      "code",
      "splitLine",
      "undo",
      "redo",
    ];
     // 配置全屏功能按钮是否展示
    // this.editor.config.showFullScreen = false

    // 配置 onchange 回调函数
    this.editor.config.onchange = (val) => {
        this.$emit("wangVal", val);
    };

    this.editor.create();
  },
};
</script>

<style lang="less" scoped>
</style>