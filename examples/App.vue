<template>
  <div id="app">
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

<style lang="scss">
#app {
  height: 500px;
}
</style>
