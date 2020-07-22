<script lang="ts">
import { Component, Vue, Prop, Emit, Ref } from "vue-property-decorator";
import { Form } from "element-ui";
import {
  baseForm,
  formRules,
  ruleItem,
  address,
  amount
} from "../../entity/baseForm";

@Component
export default class BaseComponent extends Vue {
  @Prop() formConfig!: any;
  @Prop() formIndex!: number;
  @Prop() formValue!: Array<any>; // 当前表单所填写的内容，主要是计算公示需要用到
  @Prop() isOnlyRead?: boolean; // 是否只读

  @Ref() readonly formDom!: Form;

  form!: baseForm<string | number | Array<string> | address | amount>;

  rules: formRules = {
    value: [
      {
        required: this.formConfig.required,
        message: `${this.formConfig.label}不能为空`,
        trigger: ["change", "blur"]
      }
    ]
  };

  created() {
    this.initValue();
  }

  initValue() {
    const item = this.formValue.find(i => i.id === this.formConfig.id);
    if (item && item.value) {
      this.form.value = item.value;
    }
    this.$watch(
      "form.value",
      () => {
        this.getData();
      },
      { deep: true, immediate: true }
    );
  }

  addRule(rules: Array<ruleItem>) {
    this.rules.value.push(...rules);
  }

  getFormValidate(): boolean {
    let status = true;
    if (this.formDom) {
      this.formDom.validate((bool: boolean) => {
        status = bool;
      });
    }
    return status;
  }

  @Emit("change")
  procChange() {
    return;
  }

  @Emit("getData")
  getData() {
    return {
      index: this.formIndex,
      id: this.formConfig.id,
      value: this.form.value
    };
  }
}
</script>
