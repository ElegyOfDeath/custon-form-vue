<!--金额-->
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
    />
    <!-- 校验 -->
    <el-form-item :key="formDetail.id + 3" label="校验">
      <el-checkbox
        v-model="formDetail.required"
        :disabled="isConditionComponentsNode"
        class="config-item-checkbox"
      >
        必填
      </el-checkbox>
    </el-form-item>
    <!-- 大写 -->
    <el-form-item :key="formDetail.id + 4" label="大写">
      <el-checkbox v-model="formDetail.upper" class="config-item-checkbox">
        显示大写
        <span class="prompt-tip">(输入数字后自动显示大写)</span>
      </el-checkbox>
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

@Component
export default class Amount extends Mixins(BaseFormConfig) {}
</script>
<style scoped lang="scss">
@import "../../../styles/formConfig.scss";
</style>
