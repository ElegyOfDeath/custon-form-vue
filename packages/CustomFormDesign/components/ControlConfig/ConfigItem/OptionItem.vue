<!-- 选项配置-->
<template>
  <el-form-item class="option-item" disabled="true">
    <span slot="label">
      {{ label }}
      <span v-if="placement === 'top'" class="label-tip">
        <span>(最多{{ optionsMaxAmount }}项 </span>
        <span>每项最多{{ maxLength }}个字)</span>
      </span>
    </span>
    <draggable
      v-bind="{ group: { name: 'options' } }"
      :list="options"
      handle=".dragBtn"
    >
      <el-form-item
        v-for="(option, i) in options"
        :key="i"
        :rules="[{ required: true, message: emptyMsg, trigger: 'change' }]"
        :prop="prop + '.' + i"
        class="drag-option"
      >
        <el-input
          v-model="options[i]"
          :class="{ 'input-over-length': i === overLengthIndex }"
          size="mini"
          class="drag-option-item"
          @input="inputChange($event, i)"
          @blur="clearStyle"
        />
        <span class="drag-option-item"
          ><i class="dragBtn iconfont iconpaixu"
        /></span>
        <span class="drag-option-item">
          <i
            class="deleteBtn iconfont iconshanchu1"
            style="color: red;"
            @click="handleOptionsRemove(i)"
          />
        </span>
      </el-form-item>
    </draggable>
    <div class="handle-option">
      <el-button
        type="text"
        class="handle-option-button"
        @click="handleAddOption"
      >
        添加选项
      </el-button>
      <el-divider direction="vertical" />
      <el-button
        type="text"
        class="handle-option-button"
        @click="handleBatchEditOption"
      >
        批量编辑
      </el-button>
    </div>
    <span v-if="placement === 'bottom'" class="label-tip">
      <span>(最多{{ optionsMaxAmount }}项 </span>
      <span>每项最多{{ maxLength }}个字)</span>
    </span>
    <!--选项批量编辑弹窗-->
    <OptionEditDialog
      ref="optionEditDialog"
      v-model="options"
      :maxLength="maxLength"
      :optionsMaxAmount="optionsMaxAmount"
    />
  </el-form-item>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit, Ref } from "vue-property-decorator";
import OptionEditDialog from "./OptionEditDialog.vue";
import draggable from "vuedraggable";

@Component({
  components: {
    OptionEditDialog,
    draggable
  }
})
export default class OptionItem extends Vue {
  @Prop() value!: Array<any>;
  @Prop({ type: String, default: "标题" }) label!: string;
  @Prop({ type: Number, default: -1 }) maxLength!: number;
  @Prop() prop?: string;
  @Prop({ type: Number, default: 200 }) optionsMaxAmount!: number;
  @Prop({ type: String, default: "请最少输入1个字符" }) emptyMsg!: string;
  @Prop({ type: String, default: "top" }) placement!: string;

  @Ref() optionEditDialog!: OptionEditDialog;

  options = this.value;
  overLengthIndex = -1; // 输入超过字符长度的数组下标

  // 不可编辑提醒
  disableRemind() {
    this.$message({
      message: "该控件已被添加为流程条件，无法编辑选项！",
      type: "error"
    });
  }
  // 输入字符控制长度
  inputChange(val: string, index: number) {
    if (this.maxLength > 0) {
      // 判断输入是否超过字数
      this.overLengthIndex = val.length > this.maxLength ? index : -1;
      // 截断字符
      this.options[index] = val.substr(0, this.maxLength);
    } else {
      this.options[index] = val;
    }
  }
  // 清除输入越界红框样式
  clearStyle() {
    this.overLengthIndex = -1;
  }
  // 删除某个选项
  handleOptionsRemove(index: number) {
    if (this.options.length > 1) {
      this.options.splice(index, 1);
    }
  }
  // 添加选项
  handleAddOption() {
    if (this.options === undefined) {
      this.options = [];
    }
    if (this.options.length < this.optionsMaxAmount) {
      const len = this.options.length + 1;
      this.options.push(`选项${len}`);
    } else {
      this.$message.warning("添加次数到达上限");
    }
  }
  // 批量编辑选项
  handleBatchEditOption() {
    this.optionEditDialog.openOptionDialog();
  }

  @Emit("input")
  emitChange() {
    return this.options;
  }

  @Watch("options")
  watchHandler() {
    this.emitChange();
  }
}
</script>
<style scoped lang="scss">
.option-item {
  .overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9;
    cursor: not-allowed;
  }
  .label-tip {
    color: #9b9b9b;
    display: inline-block;
    margin-left: 5px;
    font-weight: normal;
    font-size: 12px;
  }
  /deep/ .el-form-item__content {
    clear: left;
  }
  .drag-option {
    .drag-option-item {
      display: inline-block;
      vertical-align: middle;
      margin-right: 5px;
    }
    .el-input {
      width: 150px;
      /deep/ .el-input__inner {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .dragBtn {
      color: #9b9b9b;
      font-size: 10px;
    }
    .deleteBtn {
      color: #9b9b9b;
      font-size: 12px;
    }
    .dragBtn:hover {
      cursor: move;
    }
    .deleteBtn:hover {
      cursor: pointer;
    }
  }
  .input-over-length {
    /deep/ .el-input__inner {
      border-color: #f56c6c;
    }
  }
  .handle-option {
    margin-left: 10px;
    .handle-option-button {
      padding: 0;
    }
  }
  .sortable-ghost {
    border: 1px dotted #3296fa !important;
    background: white !important;
    /deep/ .el-form-item__label,
    /deep/ .el-form-item__content {
      visibility: hidden;
    }
  }
}
</style>
