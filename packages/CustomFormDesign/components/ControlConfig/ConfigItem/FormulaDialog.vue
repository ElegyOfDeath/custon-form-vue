<template>
  <div class="formula-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      title="编辑计算公式"
      width="45%"
      @close="close"
    >
      <!--公式显示框-->
      <FormulaDisplay
        :formula="formulaData"
        :settingsList="settingsList"
        :showEmptyMsg="true"
      >
        <div style="text-align: right;line-height: 20px;">
          <span class="formula-delete" @click="deleteFormula">&nbsp;</span>
          <el-button type="text" size="small" @click="clearFormula">
            清空
          </el-button>
        </div>
      </FormulaDisplay>
      <div class="formula-select">
        <!--计算对象-->
        <el-row>
          <el-col :span="4">
            <span>计算对象:</span>
          </el-col>
          <el-col :span="20">
            <span v-if="selectableComponent.length === 0" style="color: #ccc;"
              >没有可计算的对象，请返回表单添加</span
            >
            <el-button
              v-for="(item, index) in selectableComponent"
              :key="index"
              class="formula-object"
              @click="addFormula(item)"
            >
              {{ item.props.label }}
            </el-button>
            <div style="color: #FD4056;">
              <i
                class="el-icon-warning"
                style="color: #FD4056;"
              />计算对象只能是“数字输入框”“金额”这两个控件
            </div>
          </el-col>
        </el-row>
        <!--计算符号-->
        <el-row class="formula-select">
          <el-col :span="4">
            <span>计算符号:</span>
          </el-col>
          <el-col :span="20">
            <el-button
              v-for="(item, index) in symbolList"
              :key="index"
              class="formula-symbol-number"
              @click="addFormula(item)"
            >
              {{ item }}
            </el-button>
          </el-col>
        </el-row>
        <!--数字键盘-->
        <el-row class="formula-select">
          <el-col :span="4">
            <span>数字键盘:</span>
          </el-col>
          <el-col :span="20">
            <div
              v-for="(row, index) in numKeypad"
              :key="index"
              style="margin-bottom: 5px;"
            >
              <el-button
                v-for="(item, i) in row"
                :key="i"
                size="small"
                class="formula-symbol-number"
                @click="addFormula(item)"
              >
                {{ item }}
              </el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="close">取 消</el-button>
        <el-button type="primary" size="small" @click="validateAndSave"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import FormulaDisplay from "./FormulaDisplay.vue";

// 可供选择的控件名称
const selectableType = ["NumberInput", "SsAmount"];

@Component({
  components: {
    FormulaDisplay
  }
})
export default class FormulaDialog extends Vue {
  @Prop() value!: Array<any>;
  @Prop() settingsList!: Array<any>;

  dialogVisible = false;
  formulaData = [...this.value];
  symbolList = ["+", "-", "*", "/", "(", ")"];
  numKeypad = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [0, "."]
  ];

  // 可供选择的控件
  get selectableComponent() {
    return this.settingsList.filter(item =>
      selectableType.includes(item.componentName)
    );
  }

  // 打开编辑弹窗
  openFormulaDialog() {
    this.dialogVisible = true;
  }
  // 判断公式里的控件是否存在于表单控件列表中
  inSettingsList(id: string) {
    return this.settingsList.findIndex(item => item.props.id === id) !== -1;
  }
  // 关闭弹窗
  close() {
    this.dialogVisible = false;
  }
  // 增加运算符
  addFormula(item: any) {
    if (item) {
      this.formulaData.push(
        typeof item === "object" ? { id: item.props.id } : item
      );
    }
  }
  // 删除公式最后一个符号
  deleteFormula() {
    this.formulaData.pop();
  }
  // 清除公式
  clearFormula() {
    this.formulaData = [];
  }
  // 校验并保存计算公式
  validateAndSave() {
    const expArray: Array<any> = [];
    this.formulaData.forEach(item => {
      if (typeof item === "object") {
        // 校验计算对象的存在性
        expArray.push(this.inSettingsList(item.id) ? "(0)" : "(+)");
      } else {
        expArray.push(item);
      }
    });
    const expString = expArray.join("");
    try {
      // 校验计算规则
      // eval风险
      eval(expString);
      this.$emit("input", [...this.formulaData]);
      this.close();
    } catch (err) {
      console.error(err);
      this.$message.error("编辑的公式不符合计算法则，无法计算");
    }
  }
}
</script>
<style scoped lang="scss">
.formula-dialog {
  /deep/ .el-dialog {
    border-radius: 5px;
  }
  /deep/ .el-dialog__header {
    background: #f2f6fd;
    padding: 10px 20px;
    border-radius: 5px 5px 0 0;
    border-bottom: 1px solid #d1e0fa;
    font-size: 15px;
  }
  /deep/ .el-dialog__headerbtn {
    top: 10px;
  }
  /deep/ .el-dialog__body {
    font-size: 12px;
  }
  /deep/ .el-dialog__footer {
    text-align: center;
  }
  .formula-select /deep/ .el-button + .el-button {
    margin-left: 0;
  }
  .formula-delete {
    width: 24px;
    height: 24px;
    display: inline-block;
    vertical-align: middle;
    margin: 0 5px 3px 0;
    background: 50% no-repeat
      url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABOUExURUxpcY+Pj5mZmZmZmZmZmZWVlZOTk5eXl5eXl5mZmZWVlZeXl5eXl5mZmZmZmY+Pj5mZmZmZmZeXl5eXl5mZmZeXl5mZmZiYmJmZmZmZmQrB0mAAAAAZdFJOUwAQ8O/AMECAv39g0J+gzyBw4N+wr5Bfb1Bien3EAAAA8klEQVRIx+2U2xKDIAxEiQpaBbVqL/n/Hy3R6WDtplNn+lb3TWYPkk3AmEN/qu52ArpazW9zxqoI+mlgTS30t8xZCVREogaA+PFpIzG+r/q4j8O11cwF9NdKGA4A5Qc/AuJP+ZLKX0rprAqIP6TPM/ulK04BpGHhNRUvi1mHAfE3615SwzzlKeQNQFv/QqyasgEcCEjWJjWluF1uwRR6DaAtIfW6JhFvKVHGPNA61nh+2cZqfbCRaBMR5nqp0GJ9EmbHaJj7ushvgHk6/B7A9JHoMdBDwARtwuXujkYhKiBW70qjvhoBn5UU4lweb/yhH+sBhOIb4UKezGwAAAAASUVORK5CYII=");
    background-size: 100%;
  }
  .formula-delete:hover {
    cursor: pointer;
  }
  .formula-object {
    margin: 0 5px 5px 0px;
    padding: 3px 10px;
    border: 1px solid #dddddd;
    border-radius: 3px;
    background: #f2f2f2;
  }
  .formula-symbol-number {
    width: 28px;
    text-align: center;
    padding: 3px 6px;
    border: 1px solid #dddddd;
    margin: 0 5px 5px 0px;
  }
  .formula-select > .el-row {
    margin-top: 15px;
  }
}
</style>
