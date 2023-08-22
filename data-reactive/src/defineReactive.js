// 该文件的功能： 用于让对象/数组实现递归响应式
import observe from './observe'
export default function defineReactive(data, key, value) {
  if (arguments.length == 2) {
    // 即如果是对象数据
    value = data[key]
  }
  // 子元素要进行observe，至此形成了递归。这个递归不是函数自己调用自己，而是多个函数、类循环调用
  let childOb = observe(value);
  Object.defineProperty(data, key, {
    get() {
      console.log('你要访问' + key + '属性')
      return value
    },
    set(newValue) {
      console.log('你要修改' + key + '属性为：' + newValue)
      if (value === newValue) {
        return
      }
      // 当设置了新值以后，该值也要被响应化
      childOb = observe(newValue);
      value = newValue
    }
  })
}