import {
  INPUT_FORMAT,
  ADDRESS_TYPE,
  DATE_TYPE,
  DATE_LIMIT_TYPE,
  SPLIT_LINE_TYPE
} from "./constant";

interface Address {
  id: string;
  label: string;
  placeholder: string;
  initialValue: AddressValue;
  required: boolean;
  editable: boolean;
  print: boolean;
  addrType: ADDRESS_TYPE;
}

interface AddressValue {
  province: string;
  city: string;
  prefecture: string;
  detail?: string;
}

interface Input {
  id: string;
  label: string;
  placeholder: string;
  initialValue: string;
  required: boolean;
  editable: boolean;
  print: boolean;
  format: INPUT_FORMAT;
}

interface Amount {
  id: string;
  alias?: string;
  label: string;
  placeholder: string;
  initialValue: string;
  required: boolean;
  editable: boolean;
  print: boolean;
  upper: boolean; // 是否显示大写
}

interface Calculate {
  id: string;
  label: string;
  placeholder: string;
  print: boolean;
  formula: []; // 使用 mathjs, 格式[1, '+', { id: '123' }]
  upper: boolean; // 是否显示大写
}

interface DatePicker {
  id: string;
  label: string;
  placeholder: string;
  initialValue: string;
  required: boolean;
  print: boolean;
  type: DATE_TYPE;
  limitSwitch: boolean;
  limitType: DATE_LIMIT_TYPE;
  limitDateTime?: string | string[];
}

interface DateRangePicker {
  id: string;
  label: string[];
  pcLabel: string;
  placeholder: string[];
  initialValue: string[];
  required: boolean;
  print: boolean;
  type: DATE_TYPE;
  calcDuration: boolean;
  durationLabel: string;
}

interface Description {
  id: string;
  initialValue: string[];
  print: boolean;
  description: string;
  url: string;
  hiddenInForm: boolean; // 查看详情时不显示
}

interface Select {
  id: string;
  label: string;
  placeholder: string;
  initialValue: string[];
  required: boolean;
  print: boolean;
  options: string[];
  multiple: boolean;
}

interface Checkbox {
  id: string;
  label: string;
  placeholder: string;
  initialValue: string[];
  required: boolean;
  print: boolean;
  options: string[];
}

interface NumberInput {
  id: string;
  label: string;
  placeholder: string;
  initialValue: string;
  required: boolean;
  editable: boolean;
  print: boolean;
  integer: boolean; // 是否整数
  numberRange: boolean; // 是否数值范围
  minValue: string;
  maxValue: string;
  unit: string;
}

interface Radio {
  id: string;
  label: string;
  placeholder: string;
  initialValue: string;
  required: boolean;
  print: boolean;
  options: string[];
}

interface SplitLine {
  id: string;
  label: string;
  print: boolean;
  lineType: SPLIT_LINE_TYPE;
}

interface Textarea {
  id: string;
  label: string;
  placeholder: string;
  initialValue: string;
  required: boolean;
  editable: boolean;
  print: boolean;
  count: number;
}

export {
  Address,
  Amount,
  Input,
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
};
