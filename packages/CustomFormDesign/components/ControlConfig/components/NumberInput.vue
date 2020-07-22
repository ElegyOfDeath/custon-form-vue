<!--数字输入框-->
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
    <!-- 校验 -->
    <el-form-item :key="formDetail.id + 3" label="校验">
      <el-checkbox v-model="formDetail.required" class="config-item-checkbox">
        必填
      </el-checkbox>
      <el-checkbox v-model="formDetail.integer" class="config-item-checkbox"
        >仅允许填写整数</el-checkbox
      >
      <el-checkbox v-model="formDetail.numberRange" class="config-item-checkbox"
        >限定数值范围</el-checkbox
      >
      <!--数值范围 -->
      <div v-if="formDetail.numberRange" class="config-item-number-range">
        <el-form-item
          :key="formDetail.id + 31"
          :rules="[{ validator: validateNumber, trigger: 'change' }]"
          prop="minValue"
        >
          <el-input
            v-model="formDetail.minValue"
            type="minValue"
            autocomplete="off"
            placeholder="不限"
            size="mini"
          />
        </el-form-item>
        <el-divider />
        <el-form-item
          :key="formDetail.id + 32"
          :rules="[{ validator: validateNumber, trigger: 'change' }]"
          prop="maxValue"
        >
          <el-input
            v-model="formDetail.maxValue"
            placeholder="不限"
            size="mini"
          />
        </el-form-item>
      </div>
    </el-form-item>
    <!-- 单位 -->
    <InputTextItem
      :key="formDetail.id + 4"
      v-model="formDetail.unit"
      :maxLength="20"
      :enableEmpty="true"
      label="单位"
      prop="unit"
    />
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
import { Component, Mixins, Watch } from "vue-property-decorator";
import BaseFormConfig from "../BaseFormConfig.vue";
import { ruleItem } from "../../../../entity/baseForm";

@Component
export default class NumberInput extends Mixins(BaseFormConfig) {
  validateNumber(rule: ruleItem, value: string, callback: Function) {
    // 校验数字（允许正/负、整数/浮点、为空）
    const numberReg = new RegExp("^(-?\\d+)(\\.\\d+)?$");
    const emptyReg = new RegExp("^\\s*$");
    if (
      value !== undefined &&
      !numberReg.test(value) &&
      !emptyReg.test(value)
    ) {
      callback(new Error("请输入数字"));
    }
  }

  @Watch("formDetail.numberRange")
  watchHandler(val: boolean | Array<string>) {
    if (!val) {
      this.formDetail.minValue = "";
      this.formDetail.maxValue = "";
    }
  }
}
</script>
<style scoped lang="scss">
@import "../../../styles/formConfig.scss";
</style>
