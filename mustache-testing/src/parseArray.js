import lookup from "./lookup";
import templateRender from "./templateRender";

// 该文件的功能:用于将token中的数组遍历
export default function parseArray(token, data) {
  // 结果dom字符串
  var domStr = ''
  // 得到token中的要使用的数据
  var tokenArr = lookup(data, token[1])
  // 此时需遍历要使用的数据，进行拼接
  for (let index = 0; index < tokenArr.length; index++) {
    // console.log(tokenArr[index], '这是啥');
    domStr += templateRender(token[2],{
      ...tokenArr[index],
      '.': tokenArr[index]
    }) 
    
  }
  return domStr
}