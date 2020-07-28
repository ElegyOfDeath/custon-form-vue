import CustomFormDesign from "./CustomFormDesign.vue";
(CustomFormDesign as any).install = (Vue: any) => {
  Vue.components(CustomFormDesign.name, CustomFormDesign);
};
export default CustomFormDesign;
