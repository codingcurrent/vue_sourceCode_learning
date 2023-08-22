// 工具类文件
export function def(obj, key, value, enumerable) {
  // 该函数用于设置对象属性是否可枚举
  Object.defineProperty(obj, key, {
    value,
    enumerable,
    configurable: false, // 不能被删除
    writable: false // 不能被修改
  })
}