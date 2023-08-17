import lookup from "./lookup";
import parseArray from './parseArray'
// 该方法用于将tokens数组解析成为最终显示的dom
export default function templateRender(tokens, data) {
  let domStr = ''
  for (let index = 0; index < tokens.length; index++) {
    let token = tokens[index]
    switch (token[0]) {
      // 若为一般text内容，则直接拼接
      case 'text':
        domStr += token[1]
        break;
      // 若为name字段，则需将tokens[1]的内容替换为data中的真实数据
      // 为防止取不到obj[a.b.c]的情况,引入lookup方法 
      case 'name':
        domStr += lookup(data, token[1])
        break;
      case '#':
        domStr += parseArray(token, data)
        break;
      default:
        break;
    }
  }
  return domStr
}