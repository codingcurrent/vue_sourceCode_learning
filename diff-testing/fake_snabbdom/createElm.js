// 该文件用于创建新DOM节点
export default function createElm(vnode) {
  let domNode = document.createElement(vnode.sel)
  
  // 如果vnode没有子节点，即有text
  if (vnode.text != '' &&( vnode.children == undefined || vnode.children.length == 0)) {
    domNode.innerText = vnode.text
  } else if(Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 即vnode中有子节点，则要对每个子节点都要递归创建
    for (let i = 0; i < vnode.children.length; i++) {
      let element = vnode.children[i];
      // 递归创建每个子节点的Dom，并且它的elm属性指向了创建出的DOM
      let childDom = createElm(element)
      // 将子节点的dom追加到父节点dom上
      domNode.appendChild(childDom)
    }
  }
  // vnode的elm即为创建出来的新dom
  vnode.elm = domNode
  // 将新创建的dom返回
  return domNode
}
