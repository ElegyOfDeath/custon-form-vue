<!--输入框配置-->
<template>
  <el-form-item
    :inline-message="true"
    :rules="
      enableEmpty
        ? []
        : [{ required: true, message: emptyMsg, trigger: 'change' }]
    "
    :prop="prop"
    :class="{ 'input-over-length': overLength }"
    class="input-item"
  >
    <span slot="label">
      {{ label }}
      <!--输入超过字符提示：位置top-->
      <span
        v-if="maxLength > 0 && placement === 'top'"
        class="label-tip over-length-tip"
      >
        (最多{{ maxLength }}字)
      </span>
    </span>
    <el-input
      v-model="currentVal"
      v-bind="inputBind"
      :type="inputType"
      :placeholder="inputPlaceholder"
      resize="none"
      size="mini"
      @input="inputChange"
      @blur="clearStyle"
    />
    <span class="input-tip">{{ inputTip }}</span>
    <!-- 输入超过字符提示：位置bottom -->
    <span
      v-if="overLength && maxLength > 0 && placement === 'bottom'"
      class="over-length-tip"
    >
      最多不超过{{ maxLength }}字
    </span>
  </el-form-item>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";

@Component
export default class InputTextItem extends Vue {
  @Prop() value?: string;
  @Prop({ type: String, default: "标题" }) label!: string;
  @Prop({ type: String, default: "text" }) inputType!: string;
  @Prop({ type: Number, default: -1 }) maxLength!: number;
  @Prop() prop?: string;
  @Prop() inputTip?: string;
  @Prop({ type: Boolean, default: false }) enableEmpty!: boolean;
  @Prop({ type: String, default: "填写不可为空" }) emptyMsg!: string;
  @Prop() inputPlaceholder?: string;
  @Prop({ type: String, default: "top" }) placement!: string;
  @Prop({ type: Object }) inputBind!: any;

  currentVal = this.value;
  overLength = false;
  // 输入字符控制长度
  inputChange(val: string) {
    if (this.maxLength > 0) {
      // 判断输入是否超过字数
      this.overLength = val.length > this.maxLength;
      // 截断字符
      this.currentVal = val.substr(0, this.maxLength);
    } else {
      this.currentVal = val;
    }
  }
  clearStyle() {
    this.overLength = false;
  }

  @Emit("input")
  currentValChange() {
    return this.currentVal;
  }

  @Watch("currentVal")
  currentValHandler() {
    this.currentValChange();
  }

  @Watch("value")
  valueHandler(val: string) {
    this.currentVal = val;
  }
}
</script>
<style scoped lang="scss">
.input-item {
  .label-tip {
    color: #9b9b9b;
    display: inline-block;
    margin-left: 5px;
    font-weight: normal;
    font-size: 12px;
  }
  .input-tip {
    color: #9b9b9b;
    font-size: 12px;
  }
  /deep/ .el-textarea__inner {
    min-height: 50px !important;
  }
}
.input-over-length {
  /deep/ .el-input__inner,
  /deep/ .el-textarea__inner {
    border-color: #f56c6c;
  }
  .over-length-tip {
    font-size: 12px;
    color: #f56c6c;
  }
}
</style>
