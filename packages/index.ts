import CustomFormFill from "./CustomFormFill/CustomFormFill.vue";
import CustomFormDesign from "./CustomFormDesign/CustomFormDesign.vue";

const components = [CustomFormFill, CustomFormDesign];

const install = (Vue: any) => {
  if ((install as any).installed) return;
  (install as any).installed = true;

  components.map(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
export default {
  install,
  ...components
};
