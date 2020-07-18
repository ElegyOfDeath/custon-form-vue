interface Address {
  id: string;
  alias?: string;
  label: string;
  placeholder: string;
  initialValue: AddressValue;
  required: boolean;
  editable: boolean;
  print: boolean;
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
  alias?: string;
  label: string;
  placeholder: string;
  initialValue: string;
  required: boolean;
  print: boolean;
  type: string;
  limitSwitch: boolean;
  limitType: number;
  limitDateTime?: string | string[];
}

export { Address, Amount, Input, Calculate };
