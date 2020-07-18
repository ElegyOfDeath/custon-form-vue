<template>
  <el-container>
    <el-aside width="250px">
      <ControlSelector />
    </el-aside>
    <el-main>
      <ControlDisplay />
    </el-main>
    <el-aside width="250px">
      <ControlConfig />
    </el-aside>
  </el-container>
</template>
<script lang="ts">
import { Vue, Component, Model, Emit, Watch } from "vue-property-decorator";
import { state, mutations } from "./store";
import ControlSelector from "./components/ControlSelector/ControlSelector.vue";
import ControlDisplay from "./components/ControlDisplay/ControlDisplay.vue";
import ControlConfig from "./components/ControlConfig/ControlConfig.vue";

@Component({
  name: "CustomFormDesign",
  components: {
    ControlSelector,
    ControlDisplay,
    ControlConfig
  }
})
export default class CustomFormDesign extends Vue {
  @Model("valueChange") formBody!: Array<any>;

  get componentList() {
    return state.componentList.map(item => item.settings);
  }

  created() {
    this.restoreComponentList();
  }

  restoreComponentList() {
    // const list = this.formBody.map(item => {
    //   const settings = getComponentSettings(item.componentName, item.props);
    //   const info = getComponentInfo(componentName);
    //   return { info, settings };
    // });
    mutations.saveComponentList(this.formBody);
  }

  @Emit("valueChange")
  valueChange() {
    return this.componentList;
  }

  @Watch("componentList", { deep: true })
  componentListChange() {
    this.valueChange();
  }
}
</script>
<style lang="scss" scoped>
.el-container {
  height: 100%;
}
.el-main {
  padding: 0;
  border-left: 1px solid #d8d8d8;
  border-right: 1px solid #d8d8d8;
}
</style>
