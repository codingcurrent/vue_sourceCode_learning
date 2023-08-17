// 创建扫描类 用于返回扫描结果
export default class Scanner {
  constructor(templateStr) {
    // templateStr表示模板字符串
    this.templateStr = templateStr
    // 指针，表示此刻扫描位置
    this.pos = 0;
    // 表示扫描剩下的模板字符串，起始值为全部的模板字符串
    this.tail = templateStr
  }

  // 扫描， 该方法仅用于跳过模板开始标记tag，如{{
  scan(tag) {
    // 即扫描的模板字符串起始即为标识位，则跳过该位置
    if(this.tail.indexOf(tag) == 0) {
      // 指针位置加tag长度
      this.pos += tag.length
      // 尾巴去掉pos前的内容
      this.tail = this.templateStr.substring(this.pos)
    }
  }

  // 该方法用于得到： 在扫描到模板字符串stopTag标识结束扫描，并返回结束之前的模板字符串
  // 让指针进行扫描，直到遇见指定内容结束，并且能够返回结束之前路过的文字
  scanUtil(stopTag) {
    // 先存下扫描开始时的指针位置
    this.now_pos = this.pos
    // 若tail中第一位非stopTag标识且扫描未结束时，则指针+1且tail截断
    while(!this.eos() && this.tail.indexOf(stopTag) != 0) {
      this.pos += 1
      this.tail = this.templateStr.substring(this.pos)
    }
    return this.templateStr.substring(this.now_pos, this.pos)
  }
  // 用于检测扫描是否结束
  eos() {
    return this.pos >= this.templateStr.length
  }
}

