<!--分割线-->
<template>
  <el-form
    ref="formRule"
    :model="formDetail"
    :hide-required-asterisk="true"
    :inline-message="true"
    @submit.native.prevent
  >
    <!-- 标题 -->
    <InputTextItem
      :key="formDetail.id + 1"
      v-model="formDetail.label"
      :maxLength="20"
      :enableEmpty="true"
      prop="label"
    />
    <!-- 线型 -->
    <el-form-item
      :key="formDetail.id + 2"
      label="线型"
      class="config-item-line-type column-flex"
    >
      <el-radio-group v-model="formDetail.lineType">
        <el-radio-button :label="SPLIT_LINE_TYPE.NONE">
          无线型
        </el-radio-button>
        <el-radio-button :label="SPLIT_LINE_TYPE.DOTTED">
          <span class="line-type line-dotted"></span>
        </el-radio-button>
        <el-radio-button :label="SPLIT_LINE_TYPE.SOLID">
          <span class="line-type line-solid"></span>
        </el-radio-button>
        <el-radio-button :label="SPLIT_LINE_TYPE.BOLD">
          <span class="line-type line-bold"></span>
        </el-radio-button>
      </el-radio-group>
    </el-form-item>
    <!-- 打印 -->
    <el-form-item :key="formDetail.id + 3" label="打印">
      <el-checkbox v-model="formDetail.print" class="config-item-checkbox">
        参与打印
        <span class="prompt-tip">(如不勾选，打印时不显示该项)</span>
      </el-checkbox>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import BaseFormConfig from "../BaseFormConfig.vue";

const SPLIT_LINE_TYPE = {
  NONE: "",
  DOTTED: "",
  SOLID: "",
  BOLD: ""
};

@Component
export default class SplitLine extends Mixins(BaseFormConfig) {
  SPLIT_LINE_TYPE = SPLIT_LINE_TYPE;
}
</script>
<style scoped lang="scss">
@import "../../../styles/formConfig.scss";

.config-item-line-type {
  /deep/ .el-radio-button__inner {
    padding: 10px 5px;
    width: 55px;
  }
  .line-type {
    display: inline-block;
    vertical-align: middle;
    width: 100%;
  }
  .line-dotted {
    border-style: dotted none none none;
    border-width: 1px;
  }
  .line-solid {
    border-style: solid none none none;
    border-width: 1px;
  }
  .line-bold {
    border-style: solid none none none;
    border-width: 2px;
  }
}
</style>
