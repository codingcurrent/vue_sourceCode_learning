// 该文件的作用：用于改写数组原型链上的方法，使其变成响应式
// 改写的方法有：[push, pop, shift, unshift, splice, reverse, sort]
import {def} from './utils'

const arrayProtoType = Array.prototype

// 利用Array原型创建一个对象
export const arrayMethods = Object.create(arrayProtoType)

// 要被改写的7个方法
const tochangeMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'reverse', 'sort']

tochangeMethods.forEach(item => {
  // 保留原来的方法
  const original = arrayProtoType[item]
  // 定义新的方法
  def(arrayMethods, item, function() {
    // 恢复原来的功能
    let result = original.apply(this, arguments)
    // 将类数组变为数组
    let argumentsArr = [...arguments]
    // 将该数组的__obj__取出来
    const obj = this.__ob__
    // 若为push、unshift、splice可能会存在新增加的项，则要将这些新值也要变为响应式的
    let inserted = []
    switch (item) {
      case 'push':
      case 'unshift':
        inserted = argumentsArr
        break;
      case 'splice': 
        // splice格式是splice(下标, 数量, 插入的新项), 取第二项即为插入的元素
        inserted = argumentsArr.slice(2)
        break;
      default:
        break;
    }
    // 将新增项变为响应式
    if (inserted) {
      obj.observeArray(inserted);
    }
    return result // 还要记得将数组执行结果返回，如pop会有返回值
  }, false) 
})