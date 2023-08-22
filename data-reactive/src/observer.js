// 该文件用于增加响应式
import defineReactive from './defineReactive'
import {def} from './utils'
import {arrayMethods} from './array'
import observe from './observe'
export default class Observer {
  constructor(val) {
    // 给实例添加__obj__属性, 值是此次new Observer的实例
    def(val, '__ob__', this, false)
    if (Array.isArray(val)) {
      // 如果是数组的话
      // 先强制将数组的原型指向修改过后的原型对象，利用Object.setPrototypeOf()
      Object.setPrototypeOf(val, arrayMethods)
      // 再将每个内容设置为响应式
      this.observeArray(val)
    } else {
      // 如果是对象
      this.walk(val)
    }
  }
  walk(val) {
    // 遍历对象，使其每个都为可响应式
    for(let key in val) {
      defineReactive(val, key)
    }
  }
  observeArray(val) {
    // 遍历对象，将每个数组内容变为响应式
    for (let i = 0; i < val.length; i++) {
      observe(val[i])
    }
  }
}