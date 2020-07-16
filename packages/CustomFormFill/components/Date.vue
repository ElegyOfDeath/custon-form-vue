<template>
  <!-- 自定义表单时间选择 -->
  <el-form
    ref="formDom"
    :model="form"
    :rules="rules"
    label-position="top"
    :disabled="isOnlyRead"
    @submit.native.prevent
  >
    <el-form-item prop="value" :label="formConfig.label">
      <el-date-picker
        v-model="form.value"
        :popper-class="formConfig.limitSwitch ? 'customFormDate' : ''"
        :placeholder="formConfig.placeholder"
        :type="formConfig.type"
        :picker-options="pickerOptions"
        :value-format="
          formConfig.type === DATE_TYPE.DATE
            ? 'yyyy-MM-dd'
            : 'yyyy-MM-dd HH:mm:ss'
        "
        clearable
      />
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import dayjs from "dayjs";
import BaseComponent from "./BaseComponent.vue";
import { baseForm, ruleItem } from "../../entity/baseForm";

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
export default class Date extends Mixins(BaseComponent) {
  DATE_TYPE = DATE_TYPE;
  DATE_LIMIT_TYPE = DATE_LIMIT_TYPE;

  form: baseForm<string> = {
    value: ""
  };

  created() {
    this.addRule(this.componentRule);
  }

  get pickerOptions() {
    const { type, limitSwitch, limitType, limitDateTime } = this.formConfig;
    if (limitSwitch) {
      if (type === DATE_TYPE.DATE) {
        return this.dateLimit(limitType, limitDateTime);
      }
      if (type === DATE_TYPE.DATETIME) {
        return this.dateTimeLimit(limitType, limitDateTime);
      }
    }
    return {};
  }

  get componentRule() {
    return [{ validator: this.dateValidator, trigger: ["change", "blur"] }];
  }

  // 日期选择的校验器
  dateValidator(rule: ruleItem, value: string, callback: Function) {
    const { type, limitSwitch, limitType, limitDateTime } = this.formConfig;
    if (limitSwitch) {
      switch (limitType) {
        case DATE_LIMIT_TYPE.BEFORE:
          if (
            value &&
            type === DATE_TYPE.DATETIME &&
            !dayjs(value).isBefore(dayjs(limitDateTime))
          ) {
            return callback(
              new Error(
                `请选择${dayjs(limitDateTime).format(
                  "YYYY-MM-DD HH:mm:ss"
                )}之前的时间`
              )
            );
          }
          break;
        case DATE_LIMIT_TYPE.AFTER:
          if (
            value &&
            type === DATE_TYPE.DATETIME &&
            !dayjs(value).isAfter(dayjs(limitDateTime))
          ) {
            return callback(
              new Error(
                `请选择${dayjs(limitDateTime).format(
                  "YYYY-MM-DD HH:mm:ss"
                )}之后的时间`
              )
            );
          }
          break;
        case DATE_LIMIT_TYPE.RANGE:
          if (
            value &&
            type === DATE_TYPE.DATETIME &&
            (dayjs(value).isBefore(dayjs(limitDateTime[0])) ||
              dayjs(value).isAfter(dayjs(limitDateTime[1])))
          ) {
            return callback(
              new Error(
                `请选择${dayjs(limitDateTime[0]).format(
                  "YYYY-MM-DD HH:mm:ss"
                )}与${dayjs(limitDateTime[1]).format(
                  "YYYY-MM-DD HH:mm:ss"
                )}之间的时间`
              )
            );
          }
          break;
        default:
          break;
      }
    }
    return callback();
  }

  // 精确到年月日的控制
  dateLimit(limitType: number, limitDateTime: string) {
    switch (limitType) {
      case DATE_LIMIT_TYPE.TODAY:
        return {
          disabledDate(time: string) {
            return (
              dayjs(time) < dayjs().subtract(1, "day") || dayjs(time) > dayjs()
            );
          }
        };
      case DATE_LIMIT_TYPE.BEFORE:
        return {
          disabledDate(time: string) {
            return dayjs(time) > dayjs(limitDateTime).subtract(1, "day");
          }
        };
      case DATE_LIMIT_TYPE.AFTER:
        return {
          disabledDate(time: string) {
            if (limitDateTime) {
              return dayjs(time) < dayjs(limitDateTime).add(1, "day");
            }
            return dayjs(time) < dayjs(limitDateTime);
          }
        };
      case DATE_LIMIT_TYPE.RANGE:
        return {
          disabledDate(time: string) {
            return (
              dayjs(time) < dayjs(limitDateTime[0]) ||
              dayjs(time) > dayjs(limitDateTime[1])
            );
          }
        };
      default:
        return {};
    }
  }

  // 精确到时分的控制
  dateTimeLimit(limitType: number, limitDateTime: string) {
    switch (limitType) {
      case DATE_LIMIT_TYPE.TODAY:
        return {
          disabledDate(time: string) {
            return (
              dayjs(time) < dayjs().subtract(1, "day") || dayjs(time) > dayjs()
            );
          }
        };
      case DATE_LIMIT_TYPE.BEFORE:
        return {
          disabledDate(time: string) {
            return dayjs(time) > dayjs(limitDateTime);
          },
          selectableRange: this.selectableRange(
            limitDateTime,
            DATE_LIMIT_TYPE.BEFORE
          )
        };
      case DATE_LIMIT_TYPE.AFTER:
        return {
          disabledDate(time: string) {
            return dayjs(time) < dayjs(limitDateTime).subtract(1, "day");
          },
          selectableRange: this.selectableRange(
            limitDateTime,
            DATE_LIMIT_TYPE.AFTER
          )
        };
      case DATE_LIMIT_TYPE.RANGE:
        return {
          disabledDate(time: string) {
            return (
              dayjs(time) < dayjs(limitDateTime[0]).subtract(1, "day") ||
              dayjs(time) > dayjs(limitDateTime[1])
            );
          },
          selectableRange: this.selectableRange(
            limitDateTime,
            DATE_LIMIT_TYPE.RANGE
          )
        };
      default:
        return {};
    }
  }

  // 根据日期返回当天的可选择时间
  selectableRange(limitDateTime: string, type: number) {
    const time = dayjs(limitDateTime).format("YYYY-MM-DD");
    const nowTime = dayjs(this.form.value).format("YYYY-MM-DD");
    if (type === DATE_LIMIT_TYPE.BEFORE) {
      if (time === nowTime) {
        return `00:00:00 - ${dayjs(limitDateTime).format("HH:mm:ss")}`;
      }
    }
    if (type === DATE_LIMIT_TYPE.AFTER) {
      if (time === nowTime) {
        return `${dayjs(limitDateTime).format("HH:mm:ss")} - 23:59:59`;
      }
    }
    if (type === DATE_LIMIT_TYPE.RANGE) {
      const startTime = dayjs(limitDateTime[0]).format("YYYY-MM-DD");
      const endTime = dayjs(limitDateTime[1]).format("YYYY-MM-DD");
      if (startTime === nowTime) {
        return `${dayjs(limitDateTime[0]).format("HH:mm:ss")} - 23:59:59`;
      }
      if (endTime === nowTime) {
        return `00:00:00 - ${dayjs(limitDateTime[1]).format("HH:mm:ss")}`;
      }
    }
    return "00:00:00 - 23:59:59";
  }
}
</script>

<style lang="scss" scoped></style>
<style lang="scss">
.customFormDate {
  .el-picker-panel__footer {
    .el-button--text {
      display: none;
    }
  }
}
</style>
