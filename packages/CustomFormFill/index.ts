import CustomFormFill from "./CustomFormFill.vue";
(CustomFormFill as any).install = (Vue: any) => {
  Vue.components(CustomFormFill.name, CustomFormFill);
};
export default CustomFormFill;
