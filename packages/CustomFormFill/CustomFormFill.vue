<template>
  <div>
    <component
      :is="item.componentName"
      v-for="(item, index) in componentList"
      ref="form"
      :key="index"
      :formConfig="item.props"
      :formValue="formValue"
      :formIndex="index"
      :isOnlyRead="isOnlyRead"
      @getData="getData"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Model, Emit } from "vue-property-decorator";
import Input from "./components/Input.vue";
import NumberInput from "./components/NumberInput.vue";
import Address from "./components/Address.vue";
import Amount from "./components/Amount.vue";
import Date from "./components/Date.vue";
import DateRange from "./components/DateRange.vue";
import Select from "./components/Select.vue";
import Checkbox from "./components/Checkbox.vue";
import Radio from "./components/Radio.vue";
import Textarea from "./components/Textarea.vue";
import SplitLine from "./components/SplitLine.vue";
import Description from "./components/Description.vue";
import Calculate from "./components/Calculate.vue";

@Component({
  name: "CustomFormFill",
  components: {
    Input,
    NumberInput,
    Address,
    Amount,
    Date,
    DateRange,
    Radio,
    Checkbox,
    Select,
    Textarea,
    SplitLine,
    Description,
    Calculate
  }
})
export default class CustomFormFill extends Vue {
  @Model("valueChange") formValue!: Array<any>;
  @Prop() componentList?: Array<any>; // 表单组件数组
  @Prop() isOnlyRead?: boolean; // 表单是否只读

  getData(data: any) {
    // 获取组件数据并且组装
    this.$set(this.formValue, data.index, { id: data.id, value: data.value });
  }

  @Emit("valueChange")
  valueChange() {
    return this.formValue;
  }
}
</script>

<style scoped lang="scss"></style>
