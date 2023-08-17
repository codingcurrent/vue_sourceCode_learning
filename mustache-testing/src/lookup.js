// 该方法用于实现将obj['a.b.c']形式的结果输出
// 如let oooo = {
//   a: {
//     b: {
//         c: 100
//     }
// }
// }
// 利用oooo['a.b.c']是得不到结果的
export default function(obj, keyName) {
  // 如果keyName中包含.且键名非.时
  if (keyName.indexOf('.') !=-1 && keyName != '.') {
    var tempObj = obj
    var keys = keyName.split('.')
    for (let index = 0; index < keys.length; index++) {
      tempObj = tempObj[keys[i]]
    }
    return tempObj
  }
  // 如果不含有.则正常取值即可
  return obj[keyName]
}
