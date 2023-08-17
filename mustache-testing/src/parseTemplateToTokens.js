import nestToken from "./nestToken";
import Scanner from "./scanner";

// 该文件实现功能：将模板字符串解析成为tokens数组，即未处理循环数组的情况
// `<div>
//         {{#students}}
//         <ol>
//             <li>姓名：{{name}}</li>
//             <li>年龄：{{age}}</li>
//             <li>性别：{{gender}}</li>
//             <li>爱好： 
//                 {{#hobbies}}
//                     <div>{{.}}</div>
//                 {{/hobbies}}
//             </li>
//         </ol>
//         {{/students}}
//     </div>`
// 将上述模板字符串整理成了
// [
    // ['text', '<div>\n        ']
    // ['#', 'students']
    // ['text', '\n  <ol>\n  <li>姓名：']
    // ['name', 'name']
    // ['text', '</li>\n <li>年龄：']
    // ['name', 'age']
    // ['text', '</li>\n <li>性别：']
    // ['name', 'gender']
    // ['text', '</li>\n <li>爱好： \n']
    // ['#', 'hobbies']
    // ['text', '\n  <div>']
    // ['name', '.']
    // ['text', '</div>\n']
    // ['/', 'hobbies']
    // ['text', '\n  </li>\n  </ol>\n']
    // ['/', 'students']
    // ['text', '\n    </div>']
// ]
export default function parseTemplateToTokens(templateStr) {
  // 结果tokens数组
  var tokens = []
  // 创建扫描器
  let scanner = new Scanner(templateStr)
  // 扫描器存储的模板字符串
  var words = ''
  while (!scanner.eos()) {
    // 获得{{之前的模板字符串
    words = scanner.scanUtil('{{')
    if (words !== '') {
      tokens.push(['text', words])
    }
    // 扫描过双左大括号
    scanner.scan('{{');
    // 获得{{}}中的模板字符串
    words = scanner.scanUtil('}}')
    if (words !== '') {
      if (words[0] == '#') {
        // 去掉#后的内容
        tokens.push(['#', words.substring(1)])
      } else if(words[0] == '/') {
        // 去掉/后的内容
        tokens.push(['/', words.substring(1)])
      } else {
        tokens.push(['name', words])
      }
    }
    // 扫描过双右大括号
    scanner.scan('}}')
  }
  return nestToken(tokens)
}