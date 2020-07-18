import { Input, Address, Amount, Calculate } from "./controlType";

interface Control {
  name: string;
  componentName: string;
  props: Input | Address | Amount | Calculate;
}

const controlList: Control[] = [
  {
    name: "单行输入框",
    componentName: "Input",
    props: {
      id: "",
      label: "单行输入框",
      placeholder: "请输入",
      initialValue: "",
      required: true,
      editable: true, // 可编辑
      print: true // 可打印
    }
  },
  {
    name: "地址",
    componentName: "Address",
    props: {
      id: "",
      label: "地址",
      placeholder: "请输入",
      initialValue: { province: "", city: "", prefecture: "", detail: "" },
      required: true,
      editable: true,
      print: true
    }
  },
  {
    name: "金额",
    componentName: "Amount",
    props: {
      id: "",
      label: "金额(元)",
      placeholder: "请输入金额",
      initialValue: "",
      required: true,
      editable: true, // 可编辑
      print: true, // 可打印
      upper: true // 是否显示大写
    }
  },
  {
    name: "地址",
    componentName: "Calculate",
    props: {
      id: "",
      label: "计算公式",
      placeholder: "自动计算数值",
      print: true,
      formula: [],
      upper: true
    }
  }
];

export { controlList };
