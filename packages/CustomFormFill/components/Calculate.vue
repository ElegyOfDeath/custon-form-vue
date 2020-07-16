<template>
  <!-- 自定义表单计算公式 -->
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    :disabled="isOnlyRead"
    label-position="top"
  >
    <el-form-item prop="value" :label="formConfig.label">
      <el-input
        v-model="form.value"
        :placeholder="formConfig.placeholder"
        readonly
      />
      <div v-if="formConfig.upper" style="color: #666;">
        大写：{{ dataModeltoUpperCase || "零" }}
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from "vue-property-decorator";
import NP from "number-precision";
import BaseComponent from "./BaseComponent.vue";
import { baseForm } from "../../entity/baseForm";
import { numberToChinese } from "../../util/function";

@Component
export default class Calculate extends Mixins(BaseComponent) {
  form: baseForm<string> = {
    value: ""
  };

  get dataModeltoUpperCase() {
    return numberToChinese(this.form.value);
  }

  getComputedResult() {
    const formulaRules = this.formConfig.formula || [];
    if (!formulaRules.length) {
      this.form.value = "";
      return;
    }
    let formula = "";
    for (const item of formulaRules) {
      let temp = "";
      if (typeof item === "object") {
        const formValueItem = this.formValue.find(i => i.id === item.id);
        if (formValueItem && formValueItem.value) {
          if (typeof formValueItem.value === "object") {
            // 这个情况为金额
            if (formValueItem.value.money) {
              temp = formValueItem.value.money;
            } else {
              this.form.value = "";
              return;
            }
          } else {
            // 这个情况是数字输入框
            temp = formValueItem.value;
          }
        } else {
          this.form.value = "";
          return;
        }
      } else {
        temp = item;
      }
      formula += temp;
    }
    this.form.value = NP.strip(Number(eval(formula)), 16).toString();
  }

  @Watch("formValue", { deep: true })
  formValueChange() {
    this.getComputedResult();
  }
}
</script>

<style lang="scss" scoped></style>
