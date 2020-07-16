<!--计算公式-->
<template>
  <el-form
    ref="formRule"
    :model="formDetail"
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
    <!-- 提示文字 -->
    <InputTextItem
      :key="formDetail.id + 2"
      v-model="formDetail.placeholder"
      :maxLength="50"
      :enableEmpty="true"
      label="提示文字"
      prop="placeholder"
    />
    <!-- 计算公式 -->
    <el-form-item :key="formDetail.id + 3" class="config-item-formula">
      <span slot="label" class="formula-label">
        计算公式
        <el-button type="text" size="small" @click.native="openFormulaDialog"
          >修改</el-button
        >
      </span>
      <FormulaDisplay
        :formula="formDetail.formula"
        :settingsList="settingsList"
        @click.native="openFormulaDialog"
      />
    </el-form-item>
    <!-- 大写 -->
    <el-form-item :key="formDetail.id + 4" label="大写">
      <el-checkbox v-model="formDetail.upper" class="config-item-checkbox">
        显示大写
        <span class="prompt-tip">(输入数字后自动显示大写)</span>
      </el-checkbox>
    </el-form-item>
    <!-- 打印 -->
    <el-form-item :key="formDetail.id + 5" label="打印">
      <el-checkbox v-model="formDetail.print" class="config-item-checkbox">
        参与打印
        <span class="prompt-tip">(如不勾选，打印时不显示该项)</span>
      </el-checkbox>
    </el-form-item>
    <!--计算公式编辑弹窗-->
    <FormulaDialog
      ref="formulaDialog"
      v-model="formDetail.formula"
      :settingsList="settingsList"
    />
  </el-form>
</template>
<script lang="ts">
import { Component, Mixins, Ref } from "vue-property-decorator";
import BaseFormConfig from "../BaseFormConfig.vue";
import FormulaDisplay from "../ConfigItem/FormulaDisplay.vue";
import FormulaDialog from "../ConfigItem/FormulaDialog.vue";

@Component({
  components: {
    FormulaDisplay,
    FormulaDialog
  }
})
export default class Calculate extends Mixins(BaseFormConfig) {
  @Ref() formulaDialog!: FormulaDialog;
  // 点击显示公式编辑弹窗
  openFormulaDialog() {
    this.formulaDialog.openFormulaDialog();
  }
}
</script>
<style scoped lang="scss">
@import "../../../styles/formConfig.scss";

.config-item-formula {
  /deep/ .el-form-item__label {
    width: 100%;
    padding-right: 0;
  }
  /deep/ .el-form-item__content {
    display: unset;
  }
  .formula-label {
    display: flex;
    justify-content: space-between;
  }
}
</style>
