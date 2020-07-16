export interface address {
  province: string | null;
  city: string | null;
  prefecture: string | null;
  datailLocal: string | null;
}

export interface amount {
  money: string;
  upper: boolean;
}

export interface formRules {
  [key: string]: Array<ruleItem>;
}

export interface ruleItem {
  validator?: Function;
  required?: boolean;
  pattern?: RegExp;
  message?: string;
  trigger: Array<string>;
}

export interface baseForm<T> {
  value: T;
}
