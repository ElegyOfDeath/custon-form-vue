<!--地址-->
<template>
  <el-form-item :show-message="false" :required="isRequired" :label="label">
    <div class="address-select">
      <el-select
        v-model="value"
        placeholder="省/自治区/直辖市"
        class="address-item"
      />
      <el-select v-model="value" placeholder="市" class="address-item" />
      <el-select v-model="value" placeholder="县/区" />
    </div>
    <el-input v-if="showDetail" v-model="value" placeholder="详细地址" />
  </el-form-item>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class AddressSelect extends Vue {
  @Prop({ type: Boolean, default: false }) showDetail!: boolean;
  @Prop({ type: Boolean, default: false }) isRequired!: boolean;
  @Prop({ type: String, default: "地址" }) label!: string;

  value = "";
}
</script>
<style scoped lang="scss">
/deep/ .el-form-item__label {
  float: none;
}
.address-select {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  /deep/ .el-select {
    width: 100%;
  }
}
.address-item {
  margin-right: 20px;
}
</style>
