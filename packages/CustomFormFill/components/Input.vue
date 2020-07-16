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
      />
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import BaseComponent from "./BaseComponent.vue";
import { ruleItem, baseForm } from "../../entity/baseForm";

@Component
export default class Input extends Mixins(BaseComponent) {
  form: baseForm<string> = {
    value: ""
  };

  get componentRules() {
    const rule: Array<ruleItem> = [
      { validator: this.dataInput, trigger: ["change", "blur"] }
    ];
    if (this.formConfig.format !== "none") {
      // rule.push({
      //   ...rules[this.formConfig.format],
      //   trigger: ["change", "blur"]
      // });
    }
    return rule;
  }

  created() {
    this.addRule(this.componentRules);
  }

  dataInput(rule: ruleItem, value: string, callback: Function): Function {
    if (value && value.length > 50) {
      return callback(new Error("最多可填写50个字"));
    }
    return callback();
  }
}
</script>
