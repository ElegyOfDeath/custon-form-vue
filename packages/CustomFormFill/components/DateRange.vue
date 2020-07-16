<template>
  <!-- 自定义表单时间范围选择 -->
  <el-form
    ref="formDom"
    :model="form"
    :rules="rules"
    label-position="top"
    :disabled="isOnlyRead"
    @submit.native.prevent
  >
    <el-form-item :label="formConfig.label[0]" prop="value">
      <el-date-picker
        v-model="form.value[0]"
        :type="formConfig.type"
        :value-format="
          formConfig.type === 'date' ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm:ss'
        "
        placeholder="选择日期"
        @change="onChange"
      ></el-date-picker>
    </el-form-item>
    <el-form-item :label="formConfig.label[1]" prop="value">
      <el-date-picker
        v-model="form.value[1]"
        :type="formConfig.type"
        :value-format="
          formConfig.type === 'date' ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm:ss'
        "
        placeholder="选择日期"
        @change="onChange"
      ></el-date-picker>
    </el-form-item>
    <el-form-item
      v-if="formConfig.calcDuration === true"
      :label="formConfig.durationLabel"
    >
      <el-input
        v-model="form.value[2]"
        :placeholder="formConfig.durationLabel"
        readonly
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from "vue-property-decorator";
import dayjs from "dayjs";
import BaseComponent from "./BaseComponent.vue";
import { baseForm, ruleItem } from "../../entity/baseForm";

@Component
export default class DateRange extends Mixins(BaseComponent) {
  form: baseForm<Array<string>> = {
    value: []
  };

  created() {
    this.addRule([{ validator: this.dataRange, trigger: ["change", "blur"] }]);
  }

  dataRange(rule: ruleItem, value: Array<string>, callback: Function) {
    const startTime = dayjs(value[0]);
    const endTime = dayjs(value[1]);
    if (endTime < startTime) {
      return callback(new Error("结束时间应该大于开始时间"));
    }
    if (!value[0] || !value[1]) {
      return callback(new Error("请完整选择日期范围"));
    }
    return callback();
  }

  getDuration() {
    const { type } = this.formConfig;
    const startTime = this.form.value[0];
    const endTime = this.form.value[1];
    if (startTime && endTime) {
      if (startTime < endTime && type === "date") {
        const date1 = dayjs(startTime);
        const date2 = dayjs(endTime).add(1, "day");
        this.form.value[2] = `${date2.diff(date1, "day")}天`;
        return;
      }
      if (startTime < endTime && type === "datetime") {
        const date1 = dayjs(startTime);
        const date2 = dayjs(endTime);
        const str = date2.diff(date1, "minute");
        const hours = Math.floor(str / 60).toString();
        const minutes = (str % 60).toString();
        if (str !== 0 && str) {
          this.form.value[2] = `${hours}时${
            minutes.length < 2 ? `0${minutes}` : minutes
          }分`;
          return;
        }
      }
      if (startTime === endTime && type === "date" && startTime) {
        this.form.value[2] = `${1}天`;
      }
    } else {
      this.form.value[2] = "";
    }
  }

  onChange() {
    this.getFormValidate();
  }

  @Watch("form.value", { deep: true })
  valueChange() {
    this.getDuration();
  }
}
</script>

<style lang="scss" scoped></style>
