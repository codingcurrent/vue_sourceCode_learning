import updateChildren from "./updateChildren"
// 该文件用于精细化比较：新旧虚拟节点为同一个节点
// 注意：本文件只针对两个特例进行比较：
// 即新节点要么只有文本 要么只有子节点 不存在二者皆有的情况
export default function patchVnode(oldVnode, newVnode) {
  // 如果新旧虚拟节点是同一个对象，则不做处理
  if (oldVnode == newVnode) return
  // 如果新节点是text且没有子节点
  if (newVnode.text != undefined && (newVnode.children == undefined || newVnode?.children?.length == 0 || newVnode.children == [])) {
    if (newVnode.text != oldVnode.text) {
      // 若新旧dom的text不同的话，则直接将新虚拟节点的text置入旧节点的innerText
      oldVnode.elm.innerText = newVnode.text
    }
  } else {
    // 如果旧节点也有子节点children
    if (oldVnode.children != undefined && oldVnode?.children?.length > 0) {
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
    } else {
      // 如果旧节点只有text文本，新节点有子节点children
      // 则①清空旧节点的text内容
      oldVnode.elm.innerHTML = ''
      // ②将子节点的虚拟节点依次转换为dom，并插入旧dom树上
      for (let i = 0; i < newVnode.children.length; i++) {
        let element = document.createElement(newVnode.children[i])
        oldVnode?.elm?.appendChild(element)
      }
    }
  }
}