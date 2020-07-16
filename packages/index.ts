import CustomFormFill from "./CustomFormFill/CustomFormFill.vue";

const components = [CustomFormFill];

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
