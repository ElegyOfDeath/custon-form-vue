<!-- 控件展示外壳 -->
<template>
  <div :class="{ active: selectId === curId }" class="control-display-item">
    <!-- 控件覆盖蒙层防止编辑 -->
    <div class="overlay" />

    <!-- 包含的控件 -->
    <div class="control-item">
      <component :is="componentName" ref="form" :formSettings="formDetail" />
    </div>

    <!-- 复制删除 -->
    <template v-if="selectId === curId">
      <el-button
        title="删除"
        class="control-delete iconfont iconshanchu2"
        style="color: #FD4056; font-size: 14px;"
        circle
        plain
        @click="handleDelete"
      />
      <el-button
        title="复制"
        class="control-clone iconfont iconfuzhi1"
        style="color: #3296FA; font-size: 14px;"
        circle
        plain
        @click.stop="handleClone"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { state, mutations } from "../../store";
import Input from "./components/Input.vue";
import Textarea from "./components/Textarea.vue";
import NumberInput from "./components/NumberInput.vue";
import Radio from "./components/Radio.vue";
import Checkbox from "./components/Checkbox.vue";
import Select from "./components/Select.vue";
import Date from "./components/Date.vue";
import DateRange from "./components/DateRange.vue";
import Description from "./components/Description.vue";
import Address from "./components/Address.vue";
import Amount from "./components/Amount.vue";
import Calculate from "./components/Calculate.vue";
import SplitLine from "./components/SplitLine.vue";
import { v4 as uuidv4 } from "uuid";

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
export default class ControlDisplayWarp extends Vue {
  @Prop() formDetail!: any;

  get componentName() {
    return this.formDetail.componentName;
  }
  get isConditionComponentsNode() {
    return mutations.isConditionComponent(this.curId);
  }
  get isApprovalComponentsNode() {
    return mutations.isApprovalComponent(this.curId);
  }
  get curId() {
    // 当前控件id
    return this.formDetail.props.id;
  }
  get selectId() {
    // 被选中控件的id
    return state.selectFormControl.props?.id
      ? state.selectFormControl.props.id
      : "";
  }
  get curIndex() {
    // 当前控件在表单的index
    return state.componentList.findIndex(
      (item: any) => item.props.id === this.curId
    );
  }

  // 删除当前组件
  handleDelete() {
    const index = this.curIndex;
    state.componentList.splice(index, 1);
    const { length } = state.componentList;
    if (!length) {
      // 若删除后表单为空则不选中任何控件
      mutations.saveFormControl({});
    } else if (length <= index) {
      // 若删除的是最后一个控件，则选中删除后的表单中最后一个控件
      mutations.saveFormControl(state.componentList[length - 1]);
    } else {
      // 选中删除控件后面一个控件
      mutations.saveFormControl(state.componentList[index]);
    }
  }
  // 复制当前组件
  handleClone() {
    const info = { ...this.formDetail.info };
    const props = { ...this.formDetail.props };
    props.id = uuidv4();
    const settings = {
      componentName: this.formDetail.componentName,
      ...props
    };
    const newControl = { info, settings };
    state.componentList.splice(this.curIndex + 1, 0, newControl);
    mutations.saveFormControl(newControl);
  }
}
</script>

<style scoped lang="scss">
.active {
  border-left: 3px solid #3296fa !important;
  background: #eff7ff !important;
  padding-left: 32px !important;
}
.control-display-item {
  padding: 15px 30px;
  margin: 0;
  position: relative;
  border-left: 5px solid transparent;
  .overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9;
    cursor: move;
  }
  .control-delete,
  .control-clone {
    position: absolute;
    bottom: -10px;
    z-index: 2000;
    padding: 10px;
    border: none;
    box-shadow: 0px 2px 6px 0px rgba(207, 207, 207, 1);
  }
  .control-delete {
    right: 30px;
  }
  .control-clone {
    right: 70px;
  }
  .control-item {
    width: 100%;
  }
  /deep/ .el-form-item {
    margin-bottom: 12px;
  }
  /deep/.el-input__inner {
    text-overflow: ellipsis;
  }
}
</style>
