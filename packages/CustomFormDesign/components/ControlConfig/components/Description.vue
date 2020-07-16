<!--说明文字-->
<template>
  <el-form
    ref="formRule"
    :model="formDetail"
    :hide-required-asterisk="true"
    :inline-message="true"
    @submit.native.prevent
  >
    <!-- 说明文字 -->
    <InputTextItem
      :key="formDetail.id + 1"
      v-model="formDetail.description"
      :maxLength="5000"
      inputType="textarea"
      label="说明文字"
      emptyMsg="说明文字处内容不可为空"
      prop="description"
    />
    <!-- 链接跳转地址 -->
    <InputTextItem
      :key="formDetail.id + 2"
      v-model="formDetail.url"
      :enableEmpty="true"
      inputType="textarea"
      label="可以输入链接跳转地址"
      prop="url"
    />
    <!-- 显示 -->
    <el-form-item :key="formDetail.id + 3" label="显示">
      <el-checkbox
        v-model="formDetail.hiddenInForm"
        class="config-item-checkbox"
        >不在表单显示</el-checkbox
      >
    </el-form-item>
    <!-- 打印 -->
    <el-form-item :key="formDetail.id + 4" label="打印">
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

@Component
export default class Description extends Mixins(BaseFormConfig) {}
</script>

<style scoped lang="scss">
@import "../../../styles/formConfig.scss";
</style>
