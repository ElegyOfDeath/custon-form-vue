<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class BaseFormDisplay extends Vue {
  @Prop() formSettings!: any;

  value = "";

  get formProps() {
    return this.formSettings.props;
  }
}
</script>
