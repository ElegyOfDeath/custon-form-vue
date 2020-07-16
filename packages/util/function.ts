export function numberToChinese(money: string | number) {
  //汉字的数字
  const cnNums = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
  //基本单位
  const cnIntRadice = ["", "拾", "佰", "仟"];
  //对应整数部分扩展单位
  const cnIntUnits = ["", "万", "亿", "兆"];
  //最大处理的数字
  const maxNum = 999999999999999.9999;
  //金额整数部分
  let integerNum;
  //金额小数部分
  let decimalNum;
  //输出的中文金额字符串
  let chineseStr = "";
  //分离金额后用的数组，预定义
  let parts;
  if (money >= maxNum) {
    //超出最大处理数字
    return "超出最大处理范围";
  }
  if (money == 0) {
    chineseStr = cnNums[0];
    return chineseStr;
  }
  //转换为字符串
  money = money.toString();
  if (money.indexOf(".") == -1) {
    integerNum = money;
    decimalNum = "";
  } else {
    parts = money.split(".");
    integerNum = parts[0];
    decimalNum = parts[1].substr(0, 4);
  }
  //获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0;
    const IntLen = integerNum.length;
    for (let i = 0; i < IntLen; i++) {
      const n = integerNum.substr(i, 1);
      const p = IntLen - i - 1;
      const q = p / 4;
      const m = p % 4;
      if (n == "0") {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0];
        }
        //归零
        zeroCount = 0;
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q];
      }
    }
  }
  //小数部分
  if (decimalNum != "") {
    chineseStr += "点";
    const decLen = decimalNum.length;
    for (let i = 0; i < decLen; i++) {
      const n = decimalNum.substr(i, 1);
      if (n != "0") {
        chineseStr += cnNums[Number(n)];
      }
    }
  }
  if (chineseStr == "") {
    chineseStr += cnNums[0];
  }
  return chineseStr;
}
