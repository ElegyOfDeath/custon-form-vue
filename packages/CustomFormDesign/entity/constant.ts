// 单行输入框校验格式
export enum INPUT_FORMAT {
  NONE = "none",
  ZIP = "zip",
  EMAIL = "email",
  ZH = "zh",
  ZH_NAME = "zhName",
  URL = "url",
  PHONE = "phone",
  MOBILE_PHONE = "mobilePhone",
  TELEPHONE = "telephone",
  ID_CARD = "idCard",
  MONEY = "money",
  DATE = "date",
  NUMBER = "number",
  INTEGER = "integer",
  FLOATING_NUMBER = "floatingNumber",
  TWO_TIMES = "twoTimes",
  THREE_TIMES = "threeTimes",
  FOUR_TIMES = "fourTimes"
}

// 单行输入框校验格式选项
export const INPUT_FORMAT_OPTIONS = [
  {
    label: "无",
    value: INPUT_FORMAT.NONE
  },
  {
    label: "邮编",
    value: INPUT_FORMAT.ZIP
  },
  {
    label: "邮箱",
    value: INPUT_FORMAT.EMAIL
  },
  {
    label: "中文",
    value: INPUT_FORMAT.ZH
  },
  {
    label: "姓名",
    value: INPUT_FORMAT.ZH_NAME
  },
  {
    label: "网址",
    value: INPUT_FORMAT.URL
  },
  {
    label: "电话号码",
    value: INPUT_FORMAT.PHONE
  },
  {
    label: "手机号码",
    value: INPUT_FORMAT.MOBILE_PHONE
  },
  {
    label: "固话",
    value: INPUT_FORMAT.TELEPHONE
  },
  {
    label: "身份证",
    value: INPUT_FORMAT.ID_CARD
  },
  {
    label: "金额",
    value: INPUT_FORMAT.MONEY
  },
  {
    label: "日期",
    value: INPUT_FORMAT.DATE
  },
  {
    label: "数字",
    value: INPUT_FORMAT.NUMBER
  },
  {
    label: "整数",
    value: INPUT_FORMAT.INTEGER
  },
  {
    label: "小数",
    value: INPUT_FORMAT.FLOATING_NUMBER
  },
  {
    label: "2的倍数",
    value: INPUT_FORMAT.TWO_TIMES
  },
  {
    label: "3的倍数",
    value: INPUT_FORMAT.THREE_TIMES
  },
  {
    label: "4的倍数",
    value: INPUT_FORMAT.FOUR_TIMES
  }
];

// 地址类型
export enum ADDRESS_TYPE {
  DETAIL_ADDR = "detailAddr",
  SIMPLE_ADDR = "simpleAddr"
}

// 日期类型
export enum DATE_TYPE {
  DATETIME = "datetime",
  DATE = "date"
}

// 填写日期时添加的限制
export enum DATE_LIMIT_TYPE {
  TODAY = 1,
  BEFORE,
  AFTER,
  RANGE
}

// 分割线类型
export enum SPLIT_LINE_TYPE {
  NONE = "none",
  DOTTED = "dotted",
  SOLID = "solid",
  BOLD = "bold"
}
