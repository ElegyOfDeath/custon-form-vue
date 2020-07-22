<template>
  <el-form
    ref="formDom"
    label-position="top"
    :model="form"
    :rules="rules"
    :disabled="isOnlyRead"
    @submit.native.prevent
  >
    <el-form-item prop="value" :label="formConfig.label">
      <el-input
        v-model="form.value"
        :placeholder="formConfig.placeholder"
        clearable
        @input="onInput"
      >
        <template v-if="formConfig.unit" slot="append">
          {{ formConfig.unit }}
        </template>
      </el-input>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import BaseComponent from "./BaseComponent.vue";
import { baseForm, ruleItem } from "../../entity/baseForm";
import rules from "../../entity/rules";

@Component
export default class NumberInput extends Mixins(BaseComponent) {
  form: baseForm<string> = {
    value: ""
  };

  get componentRules() {
    const rule: Array<ruleItem> = [
      {
        validator: this.numRangeValidator,
        trigger: ["change", "blur"]
      }
    ];
    if (this.formConfig.integer) {
      rule.push({ ...rules.integer, trigger: ["change", "blur"] });
    } else {
      rule.push({ ...rules.numPoint, trigger: ["change", "blur"] });
    }
    return rule;
  }

  created() {
    this.addRule(this.componentRules);
  }

  numRangeValidator(rule: ruleItem, value: string, callback: Function) {
    if (this.formConfig.numberRange) {
      const min = Number(this.formConfig.minValue);
      const max = Number(this.formConfig.maxValue);
      if (min || min === 0) {
        if (min > Number(value)) {
          return callback(new Error("请在规定数值范围内输入"));
        }
      }
      if (max || max === 0) {
        if (max < Number(value)) {
          return callback(new Error("请在规定数值范围内输入"));
        }
      }
    }
    return callback();
  }

  onInput(e: string) {
    this.form.value = e.replace(/[^0-9.]/g, "");
  }
}
</script>
<style lang="scss" scoped></style>
