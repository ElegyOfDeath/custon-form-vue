import {
  Input,
  Address,
  Amount,
  Calculate,
  DatePicker,
  DateRangePicker,
  Description,
  Radio,
  Checkbox,
  NumberInput,
  Select,
  SplitLine,
  Textarea
} from "./controlType";
import {
  INPUT_FORMAT,
  ADDRESS_TYPE,
  DATE_TYPE,
  DATE_LIMIT_TYPE,
  SPLIT_LINE_TYPE
} from "./constant";

interface Control {
  name: string;
  componentName: string;
  props:
    | Input
    | Address
    | Amount
    | Calculate
    | DatePicker
    | DateRangePicker
    | Description
    | Radio
    | Checkbox
    | NumberInput
    | Select
    | SplitLine
    | Textarea;
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
      print: true, // 可打印
      format: INPUT_FORMAT.NONE
    }
  },
  {
    name: "数字输入框",
    componentName: "NumberInput",
    props: {
      id: "",
      label: "数字输入框",
      placeholder: "请输入数字",
      initialValue: "",
      required: true,
      editable: true, // 可编辑
      print: true,
      integer: false,
      numberRange: false, // numberRange是否数值范围
      minValue: "", // 最小值
      maxValue: "", // 最大值
      unit: "" // 单位
    }
  },
  {
    name: "多行输入框",
    componentName: "Textarea",
    props: {
      id: "",
      label: "多行输入框",
      placeholder: "请输入",
      initialValue: "",
      required: true,
      editable: true,
      print: true,
      count: 8000 // 计数功能,兼具最大长度,默认为0,代表不开启计数功能
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
    name: "计算公式",
    componentName: "Calculate",
    props: {
      id: "",
      label: "计算公式",
      placeholder: "自动计算数值",
      print: true,
      formula: [],
      upper: true
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
      print: true,
      addrType: ADDRESS_TYPE.DETAIL_ADDR // detailAddr省市区详细、simpleAddr省市区
    }
  },
  {
    name: "日期",
    componentName: "Date",
    props: {
      id: "",
      label: "日期",
      placeholder: "请选择",
      initialValue: "",
      required: true,
      print: true,
      limitSwitch: false,
      type: DATE_TYPE.DATETIME, // 'datetime' 'date'日期格式
      limitType: DATE_LIMIT_TYPE.TODAY,
      limitDateTime: ""
    }
  },
  {
    name: "日期范围",
    componentName: "DateRange",
    props: {
      id: "",
      label: ["开始时间", "结束时间"],
      pcLabel: "日期范围",
      placeholder: ["开始时间", "结束时间"],
      initialValue: [],
      required: true,
      print: true,
      type: DATE_TYPE.DATETIME, // 'datetime' 'date'日期格式
      calcDuration: false, // 自动计算时长
      durationLabel: "时长"
    }
  },
  {
    name: "下拉框",
    componentName: "Select",
    props: {
      id: "",
      label: "下拉框",
      placeholder: "请选择",
      initialValue: [], // 注意：这是个数组
      required: true,
      print: true,
      options: ["选项1", "选项2", "选项3"],
      multiple: false // 是否多选
    }
  },
  {
    name: "多选框",
    componentName: "Checkbox",
    props: {
      id: "",
      label: "多选框",
      placeholder: "请选择",
      initialValue: [],
      required: true,
      print: true,
      options: ["选项1", "选项2", "选项3"]
    }
  },
  {
    name: "单选框",
    componentName: "Radio",
    props: {
      id: "",
      label: "单选框",
      placeholder: "请选择",
      initialValue: "",
      required: true,
      print: true,
      options: ["选项1", "选项2", "选项3"]
    }
  },
  {
    name: "说明文字",
    componentName: "Description",
    props: {
      id: "",
      initialValue: [],
      print: true,
      description: "请输入说明文字",
      url: "",
      hiddenInForm: false
    }
  },
  {
    name: "分割线",
    componentName: "SplitLine",
    props: {
      id: "",
      label: "分割线",
      print: true,
      lineType: SPLIT_LINE_TYPE.SOLID
    }
  }
];

export { controlList };
