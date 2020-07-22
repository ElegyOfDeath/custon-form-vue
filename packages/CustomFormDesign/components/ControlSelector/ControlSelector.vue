<template>
  <div>
    <p class="control-select-title">控件库</p>
    <draggable
      :list="controlList"
      :clone="cloneControl"
      v-bind="draggableConfig"
      class="control-select-list"
    >
      <p
        v-for="(item, index) in controlList"
        :key="index"
        class="control-select-tag"
        @click="clickAddControl(item)"
      >
        {{ item.name }}
      </p>
    </draggable>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import draggable from "vuedraggable";
import { state, mutations } from "../../store";
import { controlList } from "../../entity/controlList";
import { v4 as uuidv4 } from "uuid";

@Component({
  components: {
    draggable
  }
})
export default class ControlSelector extends Vue {
  controlList = controlList;

  draggableConfig = {
    group: {
      name: "form",
      pull: "clone",
      put: false
    },
    sort: false,
    ghostClass: "ghost"
  };

  cloneControl(info: any) {
    return {
      name: info.name,
      componentName: info.componentName,
      props: {
        ...info.props,
        id: uuidv4()
      }
    };
  }
  clickAddControl(info: any) {
    const newControl = this.cloneControl(info);
    const selectId = state.selectFormControl?.props
      ? state.selectFormControl.props.id
      : "";
    const activeIndex = state.componentList.findIndex(
      item => item.props.id === selectId
    );
    state.componentList.splice(activeIndex + 1, 0, newControl);
    mutations.saveFormControl(newControl);
  }
}
</script>

<style lang="scss" scoped>
.control-select-title {
  text-align: center;
  border-bottom: 2px solid #9b9b9b;
  padding: 5px;
}
.control-select-list {
  display: flex;
  flex-wrap: wrap;
  .control-select-tag {
    box-sizing: border-box;
    width: 44%;
    padding: 5px 0;
    margin: 5px 3%;
    font-size: 12px;
    text-align: center;
    border: 1px solid #d9ecff;
    color: #4a4a4a;
    background: #ecf5ff;
    border-radius: 3px;
  }
}
</style>
