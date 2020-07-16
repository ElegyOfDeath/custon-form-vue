<template>
  <div>
    <!-- 上面的tabs -->
    <span>控件库</span>
    <div class="control-select-list">
      <draggable
        :list="controlList"
        :clone="cloneControl"
        v-bind="draggableConfig"
        class="tag-wrap"
      >
        <el-tag
          v-for="(item, index) in controlList"
          :key="item.name + index"
          class="control-select-tag"
          @click="clickAddControl(item)"
        >
          <p class="tag-info">
            <span class="tag-name">{{ item.name }}</span>
            <span class="tag-desc">{{ item.desc }}</span>
          </p>
          <i :class="item.icon" class="tag-icon iconfont" />
        </el-tag>
      </draggable>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import draggable from "vuedraggable";
import { state, mutations } from "../../store";
import { v4 as uuidv4 } from "uuid";

@Component({
  components: {
    draggable
  }
})
export default class ControlSelector extends Vue {
  controlList: any[] = [];

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
    // return new ComponentItem(info, { id: uuidv4() });
  }
  clickAddControl(info: any) {
    const newControl = this.cloneControl(info);
    const selectId = state.selectFormControl.settings
      ? state.selectFormControl.settings.props.id
      : "";
    const activeIndex = state.componentList.findIndex(
      item => item.settings.props.id === selectId
    );
    state.componentList.splice(activeIndex + 1, 0, newControl);
    mutations.saveFormControl(newControl);
  }
}
</script>

<style lang="scss" scoped>
.control-select-list {
  position: relative;

  .control-select-tag {
    width: 48%;
    margin: 5px 0;
    cursor: pointer;
    color: #90b1d2;
    display: flex;
    justify-content: space-between;
    cursor: move;
  }
  .tag-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 4%;
    .tag-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 1;
    }
    .tag-name {
      color: #4a4a4a;
    }
    .tag-desc {
      color: #9b9b9b;
    }
    .tag-icon {
      font-size: 12px;
    }
  }
  .suite-tag-wrap {
    justify-content: center;
    .control-select-tag {
      width: 210px;
      height: 62px;
      padding: 0 20px;
      background: white;
      border: solid 1px #e3e3e3;
      border-radius: 5px;
    }
    .tag-name {
      font-size: 14px;
      color: #333333;
      margin-bottom: 5px;
    }
    .tag-desc {
      font-size: 12px;
      color: #999999;
    }
    .tag-icon {
      font-size: 30px;
      transform: translateY(25%);
      color: #4e82ea;
    }
    .not-allowed-tag {
      background-color: #e3e3e3;
    }
  }
}
</style>
