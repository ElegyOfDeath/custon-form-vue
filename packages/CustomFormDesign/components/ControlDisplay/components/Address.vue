<!--地址-->
<template>
  <el-form ref="form" label-position="top" @submit.native.prevent>
    <el-form-item
      :show-message="false"
      :required="formProps.required"
      :label="formProps.label"
    >
      <div class="address-select">
        <el-select
          v-model="formProps.initialValue.province"
          placeholder="省/自治区/直辖市"
          class="address-item"
        />
        <el-select
          v-model="formProps.initialValue.city"
          placeholder="市"
          class="address-item"
        />
        <el-select
          v-model="formProps.initialValue.prefecture"
          placeholder="县/区"
        />
      </div>
      <el-input
        v-if="formProps.addrType === constant.ADDRESS_TYPE.DETAIL_ADDR"
        v-model="formProps.initialValue.detail"
        placeholder="详细地址"
      />
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import BaseFormDisplay from "../BaseFormDisplay.vue";

@Component
export default class Address extends Mixins(BaseFormDisplay) {}
</script>
<style scoped lang="scss">
@import "../../../styles/formDisplay.scss";
/deep/ .el-form-item__label {
  float: none;
}
.address-select {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.address-item {
  margin-right: 10px;
}
</style>
