<!--说明文字-->
<template>
  <el-form ref="form" label-position="top" @submit.native.prevent>
    <el-form-item :show-message="false" :required="formProps.required">
      <div class="desc">{{ formProps.description }}</div>
      <div v-if="formProps.url" class="desc-url">{{ formProps.url }}</div>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import BaseFormDisplay from "../BaseFormDisplay.vue";

@Component
export default class SsDescription extends Mixins(BaseFormDisplay) {}
</script>
<style scoped lang="scss">
@import "../../../styles/formDisplay.scss";
.desc,
.desc-url {
  min-height: 40px;
  line-height: 20px;
  width: 80%;
  color: #606266;
}
.desc {
  word-break: keep-all;
  text-align: justify;
  overflow-wrap: break-word;
}
.desc-url {
  word-break: break-all;
}
</style>
