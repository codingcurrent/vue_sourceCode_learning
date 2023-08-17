import parseAtrrStr from './parseAtrrStr'
// 该文件用于解析模板到token
export default function parse(templateStr) {
  // 指针
  let index = 0
  // 用于存放标签
  let stack1 = []
  // 用于存放非标签体内容
  let stack2 = [{ 'children': [] }];
  // 匹配开始标签
  let startReg = /^\<([a-z]+[1-6]?)(\s[^\<]+)?\>/
  // 匹配结束标签
  let endReg = /^\<\/([a-z]+[1-6]?)>/
  // 匹配结束标签之前的文本内容
  let wordReg = /^([^\<]+)\<\/[a-z]+[1-6]?\>/
  // 剩余模板字符串
  let rest = ''

  while (index < templateStr.length - 1) {
    // 将指针指向之后的内容赋值给剩余rest
    rest = templateStr.substring(index)
    // 如果rest开头匹配标签名，标签名用正则表达式
    if(startReg.test(rest)) {
      // 计算匹配到的标签名
      let matchStr = rest.match(startReg)[1]
      // 计算匹配到的属性
      let atrrStr = rest.match(startReg)[2]
      // 将其推入栈1
      stack1.push(matchStr)
      // 将children为空的数组推入栈2
      stack2.push({"tag": matchStr, "children": [], "attrs": parseAtrrStr(atrrStr)})
      let attrLength = atrrStr?.length || 0 // 可能么有attr
      // 指针后移标签名的长度大小+2(2为<>两个字符的长度)
      index += matchStr.length + 2 + attrLength
    } else if(endReg.test(rest)) {
      // 如果rest开头为结束标签
      let matchStr = rest.match(endReg)[1]
      // 因此将stack1的最后一项推栈
      let pop_stack1 = stack1.pop()
      // 此时匹配到的结束标签一定与stack1中的最后一项保持一致，否则肯定是标签开闭不对应
      if (pop_stack1 == matchStr) {
        // 将stack2中最后一项弹出，并将该项放置到stack2中的新最后一项(如果此时stack2不为空)的children中
        let pop_stack2 = stack2.pop()
        if (stack2.length > 0) {
          stack2[stack2.length - 1].children.push(pop_stack2)
        }
      } else {
        throw new Error('标签未闭合！')
      }
      // 指针往后移动匹配到结束标签的长度大小+3(</>三个字符)
      index += matchStr.length + 3
    } else if(wordReg.test(rest)) {
      // 如果与中间text匹配到
      let word = rest.match(wordReg)[1];
      // 如果不是全空
      if(!/^\s+$/.test(word)) {
        // 改变此时stack2的栈顶元素的children属性
        stack2[stack2.length - 1].children.push({ 'text': word, 'type': 3 });
      }
      index += word.length;
    } else {
      index++;
    }
  }
  return stack2[0].children[0];
}
