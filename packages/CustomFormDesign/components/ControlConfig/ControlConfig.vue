<!--表单配置-->
<template>
  <div class="form-config">
    <h1 class="config-header">
      {{ info ? info.name : "字段属性" }}
    </h1>
    <div v-if="!info" class="empty-prompt">
      请添加字段
    </div>
    <div v-else class="config-content">
      <component
        :is="settings.componentName"
        v-model="settings.props"
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
import MultiSelect from "./components/MultiSelect.vue";
import DropDown from "./components/DropDown.vue";
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
    MultiSelect,
    DropDown,
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
    return state.selectFormControl;
  }
  get info() {
    if (this.formConfig.info) {
      return this.formConfig.info;
    }
    return null;
  }
  get settings() {
    if (this.formConfig.settings) {
      return this.formConfig.settings;
    }
    return {};
  }
  get settingsList() {
    return state.componentList.map((item: any) => item.settings);
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
