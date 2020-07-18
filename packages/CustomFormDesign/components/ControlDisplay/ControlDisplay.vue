<!-- 中间的form展示 -->
<template>
  <div class="control-display">
    <draggable
      ref="draggable"
      v-bind="{ group: { name: 'form' } }"
      :list="controlList"
      :class="{ 'empty-control-display': isEmpty }"
      style="height: 100%;"
      @add="handleAdd"
      @change="handleMove"
    >
      <ControlDisplayWrap
        v-for="(item, i) in controlList"
        :key="item.id"
        :formDetail="item"
        @click.native="updateSelectControl(i)"
      />
    </draggable>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import draggable from "vuedraggable";
import ControlDisplayWrap from "./ControlDisplayWrap.vue";
import { state, mutations } from "../../store";

@Component({
  components: {
    draggable,
    ControlDisplayWrap
  }
})
export default class ControlDisplay extends Vue {
  get controlList() {
    return state.componentList;
  }

  get isEmpty() {
    return !state.componentList.length;
  }

  updateSelectControl(index: number) {
    mutations.saveFormControl(index === -1 ? {} : this.controlList[index]);
  }
  handleAdd(info: any) {
    this.updateSelectControl(info.newIndex);
  }
  handleMove(event: any) {
    if (event.moved) {
      this.updateSelectControl(event.moved.newIndex);
    }
  }
  created() {
    if (!state.componentList) {
      mutations.saveComponentList([]);
    }
  }
}
</script>

<style scoped lang="scss">
.control-display {
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.sortable-ghost {
  border: 1px dotted #3296fa !important;
  background: white !important;
  margin: 10px;
  height: 100px;
}

.sortable-ghost /deep/ * {
  visibility: hidden;
}
.el-form-item:hover {
  cursor: move;
}
.empty-control-display {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px;
  border: 1px dashed #d8d8d8;
  &::before {
    content: "从左侧点击或拖拽来添加字段";
    color: #9b9b9b;
    font-size: 13px;
  }
}
</style>
