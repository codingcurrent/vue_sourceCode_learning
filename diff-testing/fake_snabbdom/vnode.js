// 该函数用于将参数包装成vnode对象
export default function vnode(sel, data, children, elm, text) {
  return {
    sel,
    data,
    children,
    elm,
    text,
    key: data.key
  }
}