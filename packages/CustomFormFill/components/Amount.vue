<template>
  <!-- 自定义表单金额填写 -->
  <el-form
    ref="formDom"
    :model="form"
    :rules="rules"
    label-position="top"
    :disabled="isOnlyRead"
    @submit.native.prevent
  >
    <el-form-item prop="value" :label="formConfig.label">
      <el-input
        v-model="form.value.money"
        :placeholder="formConfig.placeholder"
        clearable
        @input="onInput"
        @change="onChange"
      />
      <div v-if="formConfig.upper" style="color: #666;">
        大写：{{ dataModeltoUpperCase }}
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import BaseComponent from "./BaseComponent.vue";
import { amount, ruleItem, baseForm } from "../../entity/baseForm";
import { numberToChinese } from "../../util/function";

@Component
export default class Amount extends Mixins(BaseComponent) {
  form: baseForm<amount> = {
    value: {
      money: "",
      upper: this.formConfig.upper
    }
  };

  created() {
    this.addRule([
      { validator: this.amountValidator, trigger: ["blur", "change"] }
    ]);
  }

  get dataModeltoUpperCase() {
    return numberToChinese(this.form.value.money);
  }

  amountValidator(rule: ruleItem, value: amount, callback: Function) {
    if (!value.money && this.formConfig.required) {
      return callback(new Error(`${this.formConfig.label}不能为空`));
    }
    return callback();
  }

  onInput(e: string) {
    this.form.value.money = e.replace(/[^0-9.]/g, "");
  }

  onChange() {
    if (this.isConditionComponent) {
      this.procChange();
    }
  }
}
</script>

<style lang="scss" scoped></style>
