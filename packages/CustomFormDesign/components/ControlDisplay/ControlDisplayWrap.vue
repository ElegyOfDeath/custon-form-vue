<!-- 控件展示外壳 -->
<template>
  <div :class="{ active: selectId === curId }" class="control-display-item">
    <!-- 控件覆盖蒙层防止编辑 -->
    <div v-if="componentName !== 'RefundApprove'" class="overlay" />

    <!-- 包含的控件 -->
    <div class="control-item">
      <component
        :is="getNodeComponent(componentName)"
        ref="form"
        :formSettings="formDetail.settings"
      />
    </div>

    <!-- 复制删除 -->
    <template v-if="selectId === curId">
      <el-button
        title="删除"
        class="control-delete iconfont iconshanchu2"
        style="color: #FD4056; font-size: 14px;"
        circle
        plain
        @click="openDeleteConfirm"
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
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { state, mutations } from "../../store";
import SsInput from "./components/SsInput.vue";
import SsTextarea from "./components/SsTextarea.vue";
import SsNumberInput from "./components/SsNumberInput.vue";
import SsSelect from "./components/SsSelect.vue";
import SsMultiSelect from "./components/SsMultiSelect.vue";
import SsDropDown from "./components/SsDropDown.vue";
import SsDate from "./components/SsDate.vue";
import SsDateRange from "./components/SsDateRange.vue";
import SsImagePicker from "./components/SsImagePicker.vue";
import SsDescription from "./components/SsDescription.vue";
import SsAddress from "./components/SsAddress.vue";
import SsLocation from "./components/SsLocation.vue";
import SsAmount from "./components/SsAmount.vue";
import SsAnnex from "./components/SsAnnex.vue";
import SsContact from "./components/SsContact.vue";
import SsDepartment from "./components/SsDepartment.vue";
import SsCalculate from "./components/SsCalculate.vue";
import SsSplitLine from "./components/SsSplitLine.vue";
import { v4 as uuidv4 } from "uuid";

@Component({
  components: {
    SsInput,
    SsTextarea,
    SsNumberInput,
    SsSelect,
    SsMultiSelect,
    SsDropDown,
    SsDate,
    SsDateRange,
    SsImagePicker,
    SsDescription,
    SsAddress,
    SsLocation,
    SsAmount,
    SsAnnex,
    SsContact,
    SsDepartment,
    SsCalculate,
    SsSplitLine
  }
})
export default class ControlDisplayWarp extends Vue {
  @Prop() formDetail!: any;

  get componentName() {
    return this.formDetail.settings.componentName;
  }
  get isConditionComponentsNode() {
    return mutations.isConditionComponent(this.curId);
  }
  get isApprovalComponentsNode() {
    return mutations.isApprovalComponent(this.curId);
  }
  get curId() {
    // 当前控件id
    return this.formDetail.settings.props.id;
  }
  get selectId() {
    // 被选中控件的id
    return state.selectFormControl.settings
      ? state.selectFormControl.settings.props.id
      : "";
  }
  get curIndex() {
    // 当前控件在表单的index
    return state.componentList.findIndex(
      (item: any) => item.settings.props.id === this.curId
    );
  }
  // 组件映射
  getNodeComponent(name: string) {
    switch (name) {
      case "Input":
        return "SsInput";
      case "Textarea":
        return "SsTextarea";
      case "NumberInput":
        return "SsNumberInput";
      default:
        return name;
    }
  }
  // 打开删除确认弹框
  openDeleteConfirm() {
    this.$confirm(
      "若删除该字段，其对应的表单数据也会被清除，确定删除？",
      "提示",
      {
        confirmButtonText: "删除",
        cancelButtonText: "取消"
      }
    ).then(() => {
      if (this.isConditionComponentsNode) {
        // 若控件被流程树选中则无法删除
        this.$message({
          message: "该控件已被添加为流程条件，无法删除！",
          type: "error",
          showClose: true
        });
      } else if (this.isApprovalComponentsNode) {
        // 若控件被添加为审批/抄送人则无法删除
        this.$message({
          message: "该控件已被添加为审批/抄送人，无法删除！",
          type: "error",
          showClose: true
        });
      } else {
        this.handleDelete();
      }
    });
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
    const props = { ...this.formDetail.settings.props };
    props.id = uuidv4();
    const settings = {
      componentName: this.formDetail.settings.componentName,
      ...props
    };
    const newControl = { info, settings };
    state.componentList.splice(this.curIndex + 1, 0, newControl);
    mutations.saveFormControl(newControl);
  }

  @Watch("isConditionComponentsNode")
  watchHandler(val: boolean) {
    if (val) {
      // 若为条件结点，则必填
      this.formDetail.settings.props.required = true;
    }
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
    bottom: -15px;
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
