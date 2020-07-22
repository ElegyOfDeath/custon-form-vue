<!--表单配置-->
<template>
  <div class="form-config">
    <h1 class="config-header">
      {{ formConfig.name }}
    </h1>
    <div v-if="!formConfig.name" class="empty-prompt">
      请添加控件
    </div>
    <div v-else class="config-content">
      <component
        :is="formConfig.componentName"
        v-model="formConfig.props"
        :settingsList="settingsList"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { state } from "../../store";
import Input from "./components/Input.vue";
import Textarea from "./components/Textarea.vue";
import NumberInput from "./components/NumberInput.vue";
import Select from "./components/Select.vue";
import Checkbox from "./components/Checkbox.vue";
import Radio from "./components/Radio.vue";
import Date from "./components/Date.vue";
import DateRange from "./components/DateRange.vue";
import Description from "./components/Description.vue";
import Address from "./components/Address.vue";
import Amount from "./components/Amount.vue";
import Calculate from "./components/Calculate.vue";
import SplitLine from "./components/SplitLine.vue";

@Component({
  components: {
    Input,
    Textarea,
    NumberInput,
    Select,
    Checkbox,
    Radio,
    Date,
    DateRange,
    Description,
    Address,
    Amount,
    Calculate,
    SplitLine
  }
})
export default class ControlConfig extends Vue {
  get formConfig() {
    return state.selectFormControl || {};
  }
  get settingsList() {
    return state.componentList;
  }
}
</script>
<style scoped lang="scss">
.form-config {
  .config-header {
    text-align: center;
    font-size: 16px;
    padding: 10px 0;
    line-height: 2;
    border-bottom: 1px solid #d8d8d8;
  }
  .empty-prompt {
    font-size: 13px;
    text-align: center;
    margin-top: 150px;
    color: #9b9b9b;
  }
  .config-content {
    padding: 0 14px;
    overflow-x: hidden;
  }
}
</style>
