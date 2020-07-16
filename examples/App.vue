<template>
  <div id="app">
    sasasa
    <CustomFormFill />
    <CustomFormDesign />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CustomFormFill from "../packages/CustomFormFill/CustomFormFill.vue";
import CustomFormDesign from "../packages/CustomFormDesign/CustomFormDesign.vue";

@Component({
  components: {
    CustomFormFill,
    CustomFormDesign
  }
})
export default class App extends Vue {}
</script>

<style lang="scss"></style>
