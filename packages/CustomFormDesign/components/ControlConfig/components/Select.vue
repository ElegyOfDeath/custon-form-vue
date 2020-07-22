<!--下拉框-->
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
    <!-- 下拉框类型 -->
    <el-form-item
      :key="formDetail.id + 2"
      label="下拉框类型"
      class="config-item-single-select"
    >
      <el-radio-group v-model="formDetail.multiple">
        <el-radio :label="false">下拉单选框</el-radio>
        <el-radio :label="true">下拉多选框</el-radio>
      </el-radio-group>
    </el-form-item>
    <!-- 选项 -->
    <OptionItem
      :key="formDetail.id + 3"
      v-model="formDetail.options"
      :maxLength="50"
      :optionsMaxAmount="200"
      label="选项"
      prop="options"
    />
    <!-- 校验 -->
    <el-form-item :key="formDetail.id + 4" label="校验">
      <el-checkbox v-model="formDetail.required" class="config-item-checkbox"
        >必填</el-checkbox
      >
    </el-form-item>
    <!-- 打印 -->
    <el-form-item :key="formDetail.id + 5" label="打印">
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
import OptionItem from "../ConfigItem/OptionItem.vue";

@Component({
  components: {
    OptionItem
  }
})
export default class Select extends Mixins(BaseFormConfig) {}
</script>
<style scoped lang="scss">
@import "../../../styles/formConfig.scss";
</style>
