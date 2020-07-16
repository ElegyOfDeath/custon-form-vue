<!--附件-->
<template>
  <el-form ref="form" label-position="top" @submit.native.prevent>
    <el-form-item
      :show-message="false"
      :required="formProps.required"
      :label="formProps.label"
    >
      <el-upload
        class="annex"
        action="https://jsonplaceholder.typicode.com/posts/"
      >
        <el-button class="upload-btn" type="info" plain
          >上传文件<i class="el-icon-link"
        /></el-button>
        <div slot="tip" class="upload-desc">
          仅允许上传doc、docx、xls、xlsx、ppt、pptx、pdf格式的文档
        </div>
      </el-upload>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import BaseFormDisplay from "../BaseFormDisplay.vue";

@Component
export default class SsAnnex extends Mixins(BaseFormDisplay) {}
</script>
<style scoped lang="scss">
@import "../../../styles/formDisplay.scss";
.annex {
  /deep/ .el-upload {
    width: 100%;
  }
  .upload-btn {
    width: 100%;
    text-align: left;
    background-color: #ffffff;
  }
  .upload-desc {
    line-height: 1;
    margin-top: 10px;
    font-size: 12px;
  }
}
</style>
