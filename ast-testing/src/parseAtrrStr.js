// 该文件的功能： 用于将attr字符串解析成key-value模式
export default function parseAtrrStr(atrrStr) {
  // 设置指针
  let index = 0;
  // 是否在引号内部
  let flag = false
  // 结果数组
  let result = []
  if (!atrrStr) {
    return []
  } 
  for (let i = 0; i < atrrStr.length; i++) {
    if (atrrStr[i] == '"') {
    // 如果遇到双引号，则flag取反
      flag = !flag
    } else if(atrrStr[i] == ' ' && !flag) {
      // 如果遇到了空格并且此时不在引号内
      // 则将从断点到索引i之间的长度截取，并推入result数组
      // 去掉全是空字符串的情况
      if (!/^\s*$/.test(atrrStr.substring(index, i))) {
        result.push(atrrStr.substring(index, i).trim());
        index = i;
    }
    }
  }
  // 循环结束后，还剩一个key-value（因为最后一个属性后面没有空格，所以取不到最后一对）
  result.push(atrrStr.substring(index).trim());
  result = result.map(item => {
    const o = item.match(/^(.+)="(.+)"$/)
    return {
      name: o[1],
      value: o[2]
    }
  })
  return result
}