<!--日期-->
<template>
  <el-form
    ref="formRule"
    :model="formDetail"
    :rules="rules"
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
    <!-- 日期类型 -->
    <el-form-item
      :key="formDetail.id + 2"
      label="日期类型"
      class="config-item-single-select"
    >
      <el-radio-group v-model="formDetail.type" @change="dateTypeChange">
        <el-radio :label="DATETIME">年-月-日 时:分</el-radio>
        <el-radio :label="DATE">年-月-日</el-radio>
      </el-radio-group>
    </el-form-item>
    <!-- 时间限制 -->
    <el-form-item
      v-if="showLimit"
      :key="formDetail.id + 5"
      label="填写表单时是否限制日期"
      class="config-item-single-select"
    >
      <!-- 是否开启限制 -->
      <el-radio-group v-model="formDetail.limitSwitch" @change="limitChaneg">
        <el-radio :label="false">不限制</el-radio>
        <el-radio :label="true">限制</el-radio>
      </el-radio-group>
      <!-- 当开启限制时的选项 -->
      <el-radio-group
        v-show="formDetail.limitSwitch"
        v-model="formDetail.limitType"
        class="limitBox"
        @change="limitTypeChaneg"
      >
        <el-radio :label="DATE_LIMIT_TYPE.TODAY">只可选择填表当天</el-radio>
        <el-radio :label="DATE_LIMIT_TYPE.BEFORE"
          >只可选择以下日期之前</el-radio
        >
        <div class="limit">
          <!-- 选择哪种限制方式 -->
          <el-select v-model="isBefore" class="itemWith" size="mini">
            <el-option label="填表日期" :value="1" />
            <el-option label="具体日期" :value="2" />
          </el-select>
          <!-- 当选择的是具体日期时出现选择框 -->
          <el-form-item v-show="isBefore === 2" prop="limitDateTime">
            <el-date-picker
              v-model="formDetail.limitDateTime"
              placeholder="请选择"
              class="itemWith"
              size="mini"
              :type="formDetail.type"
            />
          </el-form-item>
        </div>
        <el-radio :label="DATE_LIMIT_TYPE.AFTER">只可选择以下日期之后</el-radio>
        <div class="limit">
          <!-- 选择哪种限制方式 -->
          <el-select v-model="isAfter" class="itemWith" size="mini">
            <el-option label="填表日期" :value="1" />
            <el-option label="具体日期" :value="2" />
          </el-select>
          <!-- 当选择的是具体日期时出现选择框 -->
          <el-form-item v-show="isAfter === 2" prop="limitDateTime">
            <el-date-picker
              v-model="formDetail.limitDateTime"
              placeholder="请选择"
              class="itemWith"
              size="mini"
              :type="formDetail.type"
            />
          </el-form-item>
        </div>
        <el-radio :label="DATE_LIMIT_TYPE.RANGE">
          只可选择以下日期范围内
        </el-radio>
        <div class="limit">
          <el-form-item>
            <el-date-picker
              v-model="startTime"
              class="itemWith"
              placeholder="开始时间"
              size="mini"
              :type="formDetail.type"
              @change="startTimeChange"
            />
            <p v-show="startErrorTxt" class="errorTxt">{{ startErrorTxt }}</p>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="endTime"
              class="itemWith"
              placeholder="结束时间"
              size="mini"
              :type="formDetail.type"
              @change="endTimeChange"
            />
            <p v-show="endErrorTxt" class="errorTxt">{{ endErrorTxt }}</p>
          </el-form-item>
        </div>
      </el-radio-group>
    </el-form-item>
    <!-- 校验 -->
    <el-form-item :key="formDetail.id + 3" label="校验">
      <el-checkbox v-model="formDetail.required" class="config-item-checkbox"
        >必填</el-checkbox
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
import { Component, Mixins, Watch } from "vue-property-decorator";
import dayjs from "dayjs";
import BaseFormConfig from "../BaseFormConfig.vue";
import { formRules, ruleItem } from "../../../../entity/baseForm";

const DATE_TYPE = {
  DATE: "date",
  DATETIME: "datetime"
};
enum DATE_LIMIT_TYPE {
  TODAY,
  BEFORE,
  AFTER,
  RANGE
}

@Component
export default class Date extends Mixins(BaseFormConfig) {
  DATETIME = DATE_TYPE.DATETIME;
  DATE = DATE_TYPE.DATE;
  DATE_LIMIT_TYPE = DATE_LIMIT_TYPE;
  rules: formRules = {
    limitDateTime: [
      { validator: this.limitDateTimeValidator, trigger: ["change", "blur"] }
    ]
  };
  isBefore = 1;
  isAfter = 1;
  startTime = "";
  endTime = "";
  startErrorTxt = "";
  endErrorTxt = "";
  showLimit = true;

  limitDateTimeValidator(rule: ruleItem, value: string, callback: Function) {
    if (
      this.formDetail.limitType === DATE_LIMIT_TYPE.BEFORE &&
      this.isBefore === 2
    ) {
      if (!value) {
        return callback(new Error("时间不能为空"));
      }
    }
    if (
      this.formDetail.limitType === DATE_LIMIT_TYPE.AFTER &&
      this.isAfter === 2
    ) {
      if (!value) {
        return callback(new Error("时间不能为空"));
      }
    }
    return callback();
  }
  dateTypeChange() {
    // 此处这么处理是因为当打开el-date-picker的情况下修改formDetail.type，会导致el-date-picker位置错误
    this.showLimit = false;
    this.$nextTick(() => {
      this.showLimit = true;
    });
  }
  limitChaneg(val: boolean) {
    if (val) {
      this.formDetail.limitType = DATE_LIMIT_TYPE.TODAY;
      this.formDetail.limitDateTime = null;
    } else {
      this.formDetail.limitType = null;
      this.formDetail.limitDateTime = null;
    }
  }
  limitTypeChaneg() {
    this.isBefore = 1;
    this.isAfter = 1;
    this.formDetail.limitDateTime = "";
  }
  startTimeChange(val: string) {
    this.formDetail.limitDateTime = [val, this.endTime];
    if (val) {
      if (this.endTime && dayjs(val).isBefore(dayjs(this.endTime))) {
        this.startErrorTxt = "";
        this.endErrorTxt = "";
      } else {
        this.startErrorTxt = "开始时间需小于结束时间";
      }
    } else {
      this.startErrorTxt = "开始时间不能为空";
    }
  }
  endTimeChange(val: string) {
    this.formDetail.limitDateTime = [this.startTime, val];
    if (val) {
      if (this.startTime && dayjs(val).isAfter(dayjs(this.startTime))) {
        this.startErrorTxt = "";
        this.endErrorTxt = "";
      } else {
        this.endErrorTxt = "结束时间需大于开始时间";
      }
    } else {
      this.endErrorTxt = "结束时间不能为空";
    }
  }
  @Watch("formDetail.limitType", { deep: true, immediate: true })
  WatchlimitType(val: number) {
    if (val === DATE_LIMIT_TYPE.BEFORE) {
      if (this.formDetail.limitDateTime) {
        this.isBefore = 2;
      } else {
        this.isBefore = 1;
      }
    } else if (val === DATE_LIMIT_TYPE.AFTER) {
      if (this.formDetail.limitDateTime) {
        this.isAfter = 2;
      } else {
        this.isAfter = 1;
      }
    } else if (val === DATE_LIMIT_TYPE.RANGE) {
      [this.startTime] = this.formDetail.limitDateTime || "";
      [, this.endTime] = this.formDetail.limitDateTime || "";
    }
  }
  @Watch("isBefore")
  watchIsBefore(val: number) {
    this.formDetail.isBefore = val;
  }
  @Watch("isAfter")
  watchIsAfter(val: number) {
    this.formDetail.isAfter = val;
  }
}
</script>
<style scoped lang="scss">
@import "../../../styles/formConfig.scss";
.limitBox {
  padding-left: 17px;
}
.limit {
  padding-left: 17px;
}
.itemWith {
  width: 190px;
}
.errorTxt {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-left: 10px;
  padding-top: 10px;
}
</style>
