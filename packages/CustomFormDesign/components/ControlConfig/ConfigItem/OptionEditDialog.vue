<!-- 选项批量编辑对话框-->
<template>
  <div class="options-edit">
    <el-dialog
      :visible.sync="dialogVisible"
      title="批量编辑"
      width="45%"
      @close="close"
    >
      <div class="header">
        每行对应一个选项
      </div>
      <el-input
        v-model="optionText"
        type="textarea"
        autosize
        resize="none"
        class="options"
        @input="overLength"
      />
      <div v-if="showError" style="color: #ff8c00">
        最多{{ optionsMaxAmount }}项，每项最多{{ maxLength }}个字
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="close">取 消</el-button>
        <el-button size="small" type="primary" @click="saveOptions">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class OptionEditDialog extends Vue {
  @Prop() value!: Array<any>;
  @Prop({ type: Number, default: -1 }) maxLength!: number;
  @Prop({ type: Number, default: 200 }) optionsMaxAmount!: number;

  options = this.value;
  dialogVisible = false;
  optionText = "";
  showError = false;

  // 控制每项字符长度
  overLength(val: string) {
    const options = val.split("\n");
    let isOver = 0;
    options.forEach((item, index) => {
      isOver += item.length > this.maxLength ? 1 : 0;
      options[index] = item.substr(0, this.maxLength);
    });
    this.showError = isOver > 0 || options.length > this.optionsMaxAmount;
    this.optionText = options.join("\n");
  }
  // 打开编辑窗
  openOptionDialog() {
    this.dialogVisible = true;
    if (this.options) {
      this.optionToText();
    }
  }
  // 关闭编辑窗
  close() {
    this.dialogVisible = false;
  }
  // 保存选项
  saveOptions() {
    this.textToOption();
    this.close();
  }
  // 文本转换为选项
  textToOption() {
    const optionArr = this.optionText.split("\n");
    let formOptions = optionArr.filter(item => item);
    if (!formOptions.length) {
      formOptions.push("选项1");
    }
    if (formOptions.length > this.optionsMaxAmount) {
      formOptions = formOptions.slice(0, this.optionsMaxAmount);
    }
    this.options = [...formOptions];
    this.$emit("input", this.options);
  }
  // 选项转换为文本
  optionToText() {
    if (!this.options) {
      this.options = [];
    }
    this.optionText = this.options.join("\n");
  }
}
</script>
<style scoped lang="scss">
.options-edit .header {
  font-size: 13px;
}
.options-edit {
  & /deep/.el-dialog {
    border-radius: 5px;
  }
  & /deep/.el-dialog__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f2f6fd;
    padding: 5px 15px;
    border-radius: 5px 5px 0 0;
    border-bottom: 1px solid #d1e0fa;
    .el-dialog__title {
      font-size: 14px;
    }
  }
  & /deep/.el-dialog__headerbtn {
    position: static;
  }
  & /deep/.el-dialog__body {
    font-size: 12px;
    padding: 10px 15px;
  }
  & /deep/.el-dialog__footer {
    text-align: center;
  }
}
.el-textarea /deep/.el-textarea__inner {
  min-height: 300px !important;
}
</style>
