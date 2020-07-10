<template>
  <div>demo组件</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "demo"
})
export default class Demo extends Vue {}
</script>

<style lang="scss" scoped></style>
