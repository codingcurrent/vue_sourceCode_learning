// 该文件的功能：给对象添加__obj__属性
import Observer from "./observer"
export default function (value) {
  if (typeof value !== 'object') return
  var obj
  if (typeof value.__ob__ != 'undefined') {
    obj.__ob__ = value.__ob__
  } else {
    obj = new Observer(value)
  }
  return obj
}