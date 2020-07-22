import Vue from "vue";

export const state = Vue.observable({
  componentList: [] as Array<any>, // 自定义组件列表
  conditionComponentList: [] as Array<any>, // 被选为条件节点的数组
  approvalComponentList: [] as Array<any>, // 被选为审批节点的数组
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
