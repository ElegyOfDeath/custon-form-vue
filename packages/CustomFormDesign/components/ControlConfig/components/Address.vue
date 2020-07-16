<!--地址-->
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
    <!-- 地址类型 -->
    <el-form-item
      :key="formDetail.id + 2"
      label="地址类型"
      class="config-item-single-select"
    >
      <el-radio-group v-model="formDetail.addrType">
        <el-radio :label="ADDRESS_TYPE.DETAIL_ADDR">省-市-区-详细地址</el-radio>
        <el-radio :label="ADDRESS_TYPE.SIMPLE_ADDR">省-市-区</el-radio>
      </el-radio-group>
    </el-form-item>
    <!-- 地址选择器 -->
    <el-form-item :key="formDetail.id + 3" class="address-select">
      <span slot="label"
        >默认值<span class="label-tip">(用户自定义选择地址)</span></span
      >
      <AddressSelectItem
        v-bind.sync="formDetail.initialValue"
        :showDetail="formDetail.addrType === ADDRESS_TYPE.DETAIL_ADDR"
        @getData="addressChange"
      />
    </el-form-item>
    <!-- 校验 -->
    <el-form-item :key="formDetail.id + 4" label="校验">
      <el-checkbox v-model="formDetail.required" class="config-item-checkbox"
        >必填</el-checkbox
      >
    </el-form-item>
    <!-- 字段权限 -->
    <el-form-item :key="formDetail.id + 5" label="字段权限">
      <el-checkbox v-model="formDetail.editable" class="config-item-checkbox"
        >可编辑</el-checkbox
      >
    </el-form-item>
    <!-- 打印 -->
    <el-form-item :key="formDetail.id + 6" label="打印">
      <el-checkbox v-model="formDetail.print" class="config-item-checkbox">
        参与打印
        <span class="prompt-tip">(如不勾选，打印时不显示该项)</span>
      </el-checkbox>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import BaseFormConfig from "../BaseFormConfig.vue";
import AddressSelectItem from "../ConfigItem/AddressSelectItem.vue";
import { address } from "../../../../entity/baseForm";

const ADDRESS_TYPE = {
  DETAIL_ADDR: "",
  SIMPLE_ADDR: ""
};

@Component({
  components: {
    AddressSelectItem
  }
})
export default class Address extends Mixins(BaseFormConfig) {
  ADDRESS_TYPE = ADDRESS_TYPE;

  addressChange(val: address) {
    this.formDetail.initialValue = Object.assign(val);
  }
}
</script>
<style scoped lang="scss">
@import "../../../styles/formConfig.scss";
</style>
