<!--计算公式展示-->
<template>
  <div class="formula-display">
    <div class="formula-content">
      <div>
        <span>计算公式=</span>
        <span v-if="showEmptyMsg && !formula.length" class="empty-msg">
          请在下方选择计算对象和计算符号完成编辑
        </span>
        <template v-for="(item, i) in formula">
          <span
            v-if="typeof item === 'object'"
            :key="i"
            :style="{
              background: getFormLabel(item.id).exist ? '#F2F2F2' : '#f28172'
            }"
          >
            {{ getFormLabel(item.id).label }}
          </span>
          <span v-else :key="i">{{ item }}</span>
        </template>
      </div>
      <slot></slot>
    </div>
    <p class="formula-desc" @click.stop>
      编辑计算公式可用来完成表单内数据的自动结算，例如：采购单内设置计算公式“合计=单价×数量”，表单创建人首先设置单价输入框与数量输入框，计算公式处设置“合计”，在计算公式处添加公式规则。发起人使用表单时，填写单价、数量后，组件将自动计算出合计金额，免手动计算。
    </p>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class FormulaDiaplay extends Vue {
  @Prop() formula!: Array<any>;
  @Prop() settingsList!: Array<any>;
  @Prop({ type: Boolean, default: false }) showEmptyMsg!: boolean;

  // 获取某id的自定义组件label名称
  getFormLabel(id: string) {
    const formItem = this.settingsList.find(item => item.props.id === id);
    return formItem
      ? { exist: true, label: formItem.props.label }
      : { exist: false, label: "无效字段" };
  }
}
</script>
<style scoped lang="scss">
.formula-display {
  display: inline-block;
  width: 100%;
  .formula-content {
    box-sizing: border-box;
    border: 1px solid #dddddd;
    width: 100%;
    padding: 10px 15px;
    border-radius: 4px;
    margin-bottom: 10px;
    span {
      display: inline-block;
      margin: 0 3px 3px 0;
      font-size: 12px;
      line-height: 1.5;
    }
  }
  .empty-msg {
    color: #ccc;
  }
  .formula-desc {
    color: #6c6c6c;
    font-size: 12px;
    line-height: 1.5;
  }
}
</style>
