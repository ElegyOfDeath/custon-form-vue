<!--日期区间-->
<template>
  <div>
    <el-form-item :show-message="false" :required="true" label="开始时间">
      <el-input
        v-model="value"
        placeholder="请选择"
        suffix-icon="el-icon-date"
      />
    </el-form-item>
    <el-form-item :show-message="false" :required="true" label="结束时间">
      <el-input
        v-model="value"
        placeholder="请选择"
        suffix-icon="el-icon-date"
      />
    </el-form-item>
    <el-form-item label="时长">
      <el-input v-model="value" placeholder="自动计算" class="calc-duration">
        <template slot="suffix">天</template>
      </el-input>
    </el-form-item>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class DateRange extends Vue {
  @Prop({ type: Boolean, default: false }) showDetail!: boolean;
  @Prop({ type: Boolean, default: false }) isRequired!: boolean;
  @Prop({ type: String, default: "地址" }) label!: string;

  value = "";
}
</script>
<style scoped lang="scss">
.calc-duration {
  /deep/ .el-input__suffix {
    margin-right: 7px;
  }
}
</style>
