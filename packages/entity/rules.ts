export default {
  required: {
    required: true,
    message: "该字段是必填字段"
  },
  /**
   * 邮编
   */
  zip: {
    pattern: /^[1-9]\d{5}(?!\d)$/,
    message: "请输入6位邮政编码"
  },
  /**
   * 邮箱
   */
  email: {
    pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    message: "请输入正确的邮箱号码"
  },
  /**
   * 中文字符
   */
  zh: {
    pattern: /^[\u4e00-\u9fa5]+$/gm,
    message: "该字段不是合法的中文字符串"
  },
  /**
   * 中文名正则
   */
  zhName: {
    pattern: /^[\u4e00-\u9fa5]{2,15}$/,
    message: "该字段不是合法的中文名"
  },
  /**
   * 网址
   */
  url: {
    pattern: /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i,
    message: "该字段不是合法的url"
  },
  /**
   * 电话号正则，包含手机号、固话号、400电话
   */
  phone: {
    pattern: /^(0|86|17951)?(13[0-9]|14[579]|15[012356789]|166|17[1235678]|18[0-9]|19[189])\s{0,1}[0-9]{4}\s{0,1}[0-9]{4}$|^(0[0-9]{2,3}-?)?[0-9]{7,8}$|^400-?\d{3}-?\d{4}$/,
    message: "该字段不是有效的电话号"
  },
  /**
   * 手机号正则
   */
  mobilePhone: {
    pattern: /^(0|86|17951)?(13[0-9]|14[579]|15[012356789]|166|17[1235678]|18[0-9]|19[189])\s{0,1}[0-9]{4}\s{0,1}[0-9]{4}$/,
    message: "请输入11位手机号码"
  },
  /**
   * 固话正则，包含400电话
   */
  telephone: {
    pattern: /^(0[0-9]{2,3}-?)?[0-9]{7,8}$|^400-?\d{3}-?\d{4}$/,
    message: "该字段不是有效的固话号"
  },
  /**
   * 身份证正则
   */
  idCard: {
    pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
    message: "请输入正确的身份证号"
  },
  /**
   * 货币字符
   */
  money: {
    pattern: /^([\u0024\u00A2\u00A3\u00A4\u20AC\u00A5\u20B1\20B9\uFFE5]\s*)(\d+,?)+\.?\d*\s*$/,
    message: "该字段不是有效货币格式"
  },
  /**
   * 日期
   */
  date: {
    pattern: /^(?:(?:1[6-9]|[2-9][0-9])[0-9]{2}([-/.]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:(?:1[6-9]|[2-9][0-9])(?:0[48]|[2468][048]|[13579][26])|(?:16|[2468][048]|[3579][26])00)([-/.]?)0?2\2(?:29))(\s+([01][0-9]:|2[0-3]:)?[0-5][0-9]:[0-5][0-9])?$/,
    message: "该字段不是合法的日期格式"
  },
  /**
   * 数字
   */
  number: {
    pattern: /^\d+$/,
    message: "该字段不是合法的数字"
  },
  /**
   * 整型数字
   */
  integer: {
    pattern: /^[+-]?\d+$/,
    message: "该字段不是合法的整型数字"
  },
  /**
   * 浮点数
   */
  floatingNumber: {
    pattern: /^[0-9]+(.{1}[0-9]+){0,1}$/,
    message: "该字段不是合法的浮点型数字"
  },
  /**
   * 2的倍数
   */
  twoTimes: {
    pattern: /^([02468]|[13579][13579]*[02468])*$/,
    message: "该字段值必须是2的倍数"
  },
  /**
   * 3的倍数
   */
  threeTimes: {
    pattern: /^([0369]|[258][0369]*[147]|([147]|[258][0369]*[258])([0369]|[147][0369]*[258])*([258]|[147][0369]*[147]))*$/,
    message: "该字段值必须是3的倍数"
  },
  /**
   * 4的倍数
   */
  fourTimes: {
    pattern: /^([048]|[37][159]*[26]|([26]|[37][159]*[048])([26]|[37][159]*[048])*([048]|[37][159]*[26])|([159]|[37][159]*[37]|([26]|[37][159]*[048])([26]|[37][159]*[048])*([159]|[37][159]*[37]))([37]|[159][159]*[37]|([048]|[159][159]*[048])([26]|[37][159]*[048])*([159]|[37][159]*[37]))*([26]|[159][159]*[26]|([048]|[159][159]*[048])([26]|[37][159]*[048])*([048]|[37][159]*[26])))*$/,
    message: "该字段必须是4的倍数"
  },
  fiveTimes: {
    pattern: /^([05]|[49][49]*[05]|([38]|[49][49]*[38])([38]|[49][49]*[38])*([05]|[49][49]*[05])|([27]|[49][49]*[27]|([38]|[49][49]*[38])([38]|[49][49]*[38])*([27]|[49][49]*[27]))([27]|[49][49]*[27]|([38]|[49][49]*[38])([38]|[49][49]*[38])*([27]|[49][49]*[27]))*([05]|[49][49]*[05]|([38]|[49][49]*[38])([38]|[49][49]*[38])*([05]|[49][49]*[05]))|([16]|[49][49]*[16]|([38]|[49][49]*[38])([38]|[49][49]*[38])*([16]|[49][49]*[16])|([27]|[49][49]*[27]|([38]|[49][49]*[38])([38]|[49][49]*[38])*([27]|[49][49]*[27]))([27]|[49][49]*[27]|([38]|[49][49]*[38])([38]|[49][49]*[38])*([27]|[49][49]*[27]))*([16]|[49][49]*[16]|([38]|[49][49]*[38])([38]|[49][49]*[38])*([16]|[49][49]*[16])))([16]|[49][49]*[16]|([38]|[49][49]*[38])([38]|[49][49]*[38])*([16]|[49][49]*[16])|([27]|[49][49]*[27]|([38]|[49][49]*[38])([38]|[49][49]*[38])*([27]|[49][49]*[27]))([27]|[49][49]*[27]|([38]|[49][49]*[38])([38]|[49][49]*[38])*([27]|[49][49]*[27]))*([16]|[49][49]*[16]|([38]|[49][49]*[38])([38]|[49][49]*[38])*([16]|[49][49]*[16])))*([05]|[49][49]*[05]|([38]|[49][49]*[38])([38]|[49][49]*[38])*([05]|[49][49]*[05])|([27]|[49][49]*[27]|([38]|[49][49]*[38])([38]|[49][49]*[38])*([27]|[49][49]*[27]))([27]|[49][49]*[27]|([38]|[49][49]*[38])([38]|[49][49]*[38])*([27]|[49][49]*[27]))*([05]|[49][49]*[05]|([38]|[49][49]*[38])([38]|[49][49]*[38])*([05]|[49][49]*[05]))))*$/,
    message: "该字段必须是5的倍数"
  },
  /**
   * 最多小数点后2位
   */
  decimalPoint: {
    pattern: /^(\d+)(.\d{0,2})?$/,
    message: "最多可输入两位小数"
  },
  /**
   * 最多小数点后2位
   */
  numPoint: {
    pattern: /^[+-]?\d*\.?\d{0,3}$/,
    message: "最多可输入三位小数"
  }
};