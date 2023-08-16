import vnode from "./vnode";
import patchVnode from "./patchVnode";
import createElm from "./createElm";
// 该文件的功能为：比较新旧虚拟节点是否是同一虚拟节点
export default function patch(oldVnode, newVnode) {
  // 由于第一次进行比较的时候为dom节点，所以需将dom节点转换为虚拟dom进行比较
  if (oldVnode.sel == '' || oldVnode.sel == undefined) {
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], oldVnode, undefined)
  }
  // 判断是否是同一个虚拟节点
  if (oldVnode.sel == newVnode.sel && oldVnode.key == newVnode.key) {
    // 若是，则调用精细化对比
    patchVnode(oldVnode, newVnode)
  } else {
    // 若不是，则①将新虚拟节点创建为新DOM节点
    let newElm = createElm(newVnode)
    // ②将新虚拟节点插入（插入位置为当前旧虚拟节点之前）
    oldVnode.elm.parentNode?.insertBefore(newElm, oldVnode.elm)
    // ③删除旧虚拟节点
    oldVnode.elm.parentNode?.removeChild(oldVnode.elm)
  }
}