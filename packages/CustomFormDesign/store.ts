import Vue from "vue";

export const state = Vue.observable({
  componentList: [] as Array<any>, // 自定义组件列表
  selectFormControl: {} as any // 当前选中的组件
});

export const mutations = {
  saveComponentList(list: Array<any>) {
    state.componentList = list;
  },
  saveFormControl(formControl: any) {
    state.selectFormControl = formControl;
  }
};
