<!--表单基本配置-->
<script lang="ts">
import { Component, Vue, Model, Emit, Ref, Prop } from "vue-property-decorator";
import InputTextItem from "./ConfigItem/InputTextItem.vue";
import { mutations } from "../../store";
import { Form } from "element-ui";

@Component({
  components: {
    InputTextItem
  }
})
export default class BaseFormConfig extends Vue {
  @Model("detailChange") formDetail!: any;
  @Prop() settingsList!: Array<any>;
  @Ref() formRule?: Form;

  get isConditionComponentsNode() {
    return mutations.isConditionComponent(this.formDetail.id);
  }
  get isApprovalComponentsNode() {
    return mutations.isApprovalComponent(this.formDetail.id);
  }

  @Emit("detailChange")
  detailChange() {
    return this.formDetail;
  }
}
</script>
