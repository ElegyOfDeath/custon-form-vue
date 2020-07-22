<!-- 单行输入框 -->
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
      prop="label"
      emptyMsg="标题不可为空"
    />
    <!-- 提示文字 -->
    <InputTextItem
      :key="formDetail.id + 2"
      v-model="formDetail.placeholder"
      :maxLength="50"
      :enableEmpty="true"
      label="提示文字"
      prop="placeholder"
      inputTip="输入框内最多可填写50个字"
    />
    <!-- 格式 -->
    <el-form-item :key="formDetail.id + 3" label="格式">
      <el-select
        v-model="formDetail.format"
        size="mini"
        class="config-item-format-select"
      >
        <el-option
          v-for="option in getFormatOptions"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </el-select>
    </el-form-item>
    <!-- 校验 -->
    <el-form-item :key="formDetail.id + 4" label="校验">
      <el-checkbox v-model="formDetail.required" class="config-item-checkbox">
        <span>必填</span>
      </el-checkbox>
    </el-form-item>
    <!-- 打印 -->
    <el-form-item :key="formDetail.id + 5" label="打印">
      <el-checkbox v-model="formDetail.print" class="config-item-checkbox">
        <span>参与打印</span>
        <span class="prompt-tip">(如不勾选，打印时不显示该项)</span>
      </el-checkbox>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import BaseFormConfig from "../BaseFormConfig.vue";
import { INPUT_FORMAT, INPUT_FORMAT_OPTIONS } from "../../../entity/constant";

const { NONE, MOBILE_PHONE, TELEPHONE, ZIP, ID_CARD, EMAIL } = INPUT_FORMAT;
const formatValue = [NONE, MOBILE_PHONE, TELEPHONE, ZIP, ID_CARD, EMAIL];

@Component
export default class Input extends Mixins(BaseFormConfig) {
  // 获得格式的选项
  get getFormatOptions() {
    return INPUT_FORMAT_OPTIONS.filter(item =>
      formatValue.find(val => val === item.value)
    );
  }
}
</script>
<style scoped lang="scss">
@import "../../../styles/formConfig.scss";
</style>
