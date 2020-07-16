<!--天数配置-->
<template>
  <div class="days-slider">
    <span v-if="days < 0">需提前{{ Math.abs(days) }}天提交</span>
    <span v-else>可在{{ days }}天内补交</span>
    <div class="days-slider-wrap">
      <el-slider
        v-model="localValue"
        :step="1"
        :min="minVal"
        :max="maxVal - 1"
        :show-tooltip="false"
        :class="{ 'right-side-slider': days > 0 }"
        class="full-slider"
        @input="handleInput"
        @change="handleChange"
      />
      <div v-if="days > 0" class="left-bar"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component
export default class DaySlider extends Vue {
  @Prop() value!: number;
  @Prop({ type: Number, default: -31 }) minVal!: number;
  @Prop({ type: Number, default: 31 }) maxVal!: number;

  localValue = this.minVal;
  days = this.value;

  handleInput(val: number) {
    this.days = val >= 0 ? this.localValue + 1 : this.localValue;
  }

  @Emit("input")
  handleChange() {
    return this.days;
  }

  created() {
    this.localValue = this.days >= 0 ? this.days - 1 : this.days;
  }
}
</script>
<style scoped lang="scss">
$leftColor: #409eff;
$rightColor: #f18f3c;

.days-slider {
  .days-slider-wrap {
    position: relative;
    width: 140px;
    height: 38px;
    .full-slider {
      width: 100%;
      height: 100%;
    }
    .right-side-slider {
      /deep/ .el-slider__bar {
        background-color: $rightColor;
      }
      /deep/ .el-slider__button {
        border-color: $rightColor;
      }
    }
    .left-bar {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 50%;
      height: 6px;
      background-color: $leftColor;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }
  }
}
</style>
