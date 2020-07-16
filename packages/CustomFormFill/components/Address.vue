<template>
  <!-- 自定义表单地址选择 -->
  <el-form
    ref="formDom"
    label-position="top"
    :model="form"
    :rules="rules"
    :disabled="isOnlyRead"
    @submit.native.prevent
  >
    <el-form-item prop="value" :label="formConfig.label">
      <el-row>
        <el-col :span="7">
          <el-select
            v-model="form.value.province"
            style="width:100%"
            clearable
            placeholder="省/自治区"
            size="small"
            @change="provinceChange"
            @clear="onClear"
          >
            <el-option
              v-for="(province, index) in provinceList"
              :key="index"
              :value="province.value"
              :label="province.label"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="7">
          <el-select
            v-model="form.value.city"
            style="width:100%"
            clearable
            placeholder="市"
            size="small"
            @change="cityChange"
          >
            <el-option
              v-for="city in cityList"
              :key="city.value"
              :value="city.value"
              :label="city.label"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="7">
          <el-select
            v-model="form.value.prefecture"
            style="width:100%"
            clearable
            placeholder="县/区"
            size="small"
          >
            <el-option
              v-for="prefecture in prefectureList"
              :key="prefecture.value"
              :value="prefecture.value"
              :label="prefecture.label"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-input
          v-if="formConfig.addrType === 'detailAddr'"
          v-model="form.value.datailLocal"
          type="textarea"
          resize="none"
          autosize
          placeholder="详细地址"
          size="small"
          maxlength="200"
        />
      </el-row>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import BaseComponent from "./BaseComponent.vue";
import { address, ruleItem, baseForm } from "../../entity/baseForm";

interface Province {
  label: string;
  value: string;
  children: Array<City>;
}

interface City {
  label: string;
  value: string;
  children: Array<Prefecture>;
}

interface Prefecture {
  label: string;
  value: string;
}

@Component
export default class Address extends Mixins(BaseComponent) {
  provinceList: Array<Province> = [];
  cityList: Array<City> = [];
  prefectureList: Array<Prefecture> = [];

  form: baseForm<address> = {
    value: {
      prefecture: "",
      province: "",
      city: "",
      datailLocal: ""
    }
  };

  get componentRule() {
    return [{ validator: this.dataAddres, trigger: ["change", "blur"] }];
  }

  created() {
    this.addRule(this.componentRule);
  }

  dataAddres(rule: ruleItem, value: address, callback: Function) {
    if (this.formConfig.required) {
      if (!value.province) {
        return callback(new Error("地址为必填项，请填写完整"));
      }
      if (value.city === null) {
        // 此处不用取反是为了排除空字符串的情况
        return callback(new Error("地址为必填项，请填写完整"));
      }
      if (value.prefecture === null) {
        // 此处不用取反是为了排除空字符串的情况
        return callback(new Error("地址为必填项，请填写完整"));
      }
      if (this.formConfig.addrType === "detailAddr" && !value.datailLocal) {
        return callback(new Error("地址为必填项，请填写完整"));
      }
    }
    return callback();
  }

  onClear() {
    this.form.value = {
      province: null,
      city: null,
      prefecture: null,
      datailLocal: null
    };
  }

  // 省市联动
  provinceChange() {
    const item = this.provinceList.find(
      item => item.value === this.form.value.province
    );
    if (item) {
      this.cityList = item.children;
      this.form.value.city = null;
      this.form.value.prefecture = null;
    }
  }

  // 市县联动
  cityChange() {
    const item = this.cityList.find(
      item => item.value === this.form.value.city
    );
    if (item) {
      this.prefectureList = item.children;
      this.form.value.prefecture = null;
      if (this.form.value.city === "") {
        this.form.value.prefecture = "";
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
