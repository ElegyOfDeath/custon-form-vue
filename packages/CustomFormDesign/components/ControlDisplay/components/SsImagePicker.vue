<!--图片-->
<template>
  <el-form ref="form" label-position="top" @submit.native.prevent>
    <el-form-item
      :show-message="false"
      :required="formProps.required"
      :label="formProps.label"
    >
      <div>
        <div class="upload">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </div>
        <div v-if="formProps.takePhotoUpload">
          启动了【仅允许拍照上传】功能，该功能只支持移动客户端
        </div>
      </div>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import BaseFormDisplay from "../BaseFormDisplay.vue";

@Component
export default class SsImagePicker extends Mixins(BaseFormDisplay) {}
</script>
<style scoped lang="scss">
@import "../../../styles/formDisplay.scss";
/deep/ .el-form-item__label {
  float: none;
}
.upload {
  padding: 15px;
  border-radius: 2px;
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid #dcdfe6;
  & /deep/.el-upload {
    width: 35px;
    height: 35px;
    line-height: 1;
  }
  & /deep/ .el-icon-plus {
    line-height: 35px;
    font-size: 12px;
  }
}
</style>
