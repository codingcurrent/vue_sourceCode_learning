import createElm from './createElm';
import patch from './patch';
import patchVnode from './patchVnode'

// 比较两个DOM是否key相同且选择器相同
function checkSame(oldVnode, newVnode) {
  return oldVnode.sel == newVnode.sel && oldVnode.key == newVnode.key
}
// 该文件用于在新旧节点都有子节点children的情况下进行精细化比较
export default function updateChildren(parentElm, oldVnode, newVnode) {
  let oldStartIdx = 0; // 旧前节点所在索引
  let newStartIdx = 0; // 新前节点所在索引
  let oldEndIdx = oldVnode.length -1; // 旧后节点所在索引
  let newEndIdx = newVnode.length -1; // 新后节点所在索引

  let oldStartVnode = oldVnode[0]; // 旧前节点，默认为oldVnode[0]
  let newStartVnode = newVnode[0]; // 新前节点，默认为newVnode[0]
  let oldEndVnode = oldVnode[oldEndIdx]; // 旧后节点，默认为oldVnode[oldVnode.length -1]
  let newEndVnode = newVnode[newEndIdx]; // 新后节点，默认为newVnode[newVnode.length -1]
 
  let keyMap = null // 旧子节点的所有key组成的map

  // 当旧节点的开始索引不大于其结束索引 && 新节点的开始索引不大于其结束索引时，此时循环
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 首先跳过旧节点中做标记的节点，做标记即为变为underfined
    if(oldStartVnode == null && oldVnode[oldStartIdx] == undefined) {
      oldStartIdx += 1; // 开始节点往后遍历
      oldStartVnode = oldVnode[oldStartIdx]
      // 上面两行可简写为oldStartVnode = oldVnode[++oldStartIdx]
    } else if(oldEndIdx == null && oldVnode[oldEndIdx] == undefined) {
      oldEndVnode = oldVnode[--oldEndIdx] // 结束节点往前遍历
    }
    // 比较四种策略①旧前新前 ②旧后新后 ③旧前新后 ④旧后新前 
    if (checkSame(oldStartVnode, newStartVnode)) {
      // 若 ①旧前与新前的选择器与key都相同时进行比较并插入
      console.log('新前与旧前相同');
      patchVnode(oldStartVnode, newStartVnode)
      // 若旧前与新前相同，则旧前|新前索引都加1
      oldStartVnode = oldVnode[++oldStartIdx]
      newStartVnode = newVnode[++newStartIdx]
    } else if(checkSame(oldEndVnode, newEndVnode)) {
      // 若 ②旧后与新后的选择器与key都相同时进行比较并插入
      console.log('旧后与新后相同');
      patchVnode(oldEndVnode, newEndVnode)
      // 若旧后与新后相同，则旧后|新后索引都减1
      oldEndVnode = oldVnode[--oldEndIdx]
      newEndVnode = newVnode[--newEndIdx]
    } else if(checkSame(oldStartVnode, newEndVnode)) {
      // 若 ③旧前与新后的选择器与key都相同时进行比较并插入
      console.log('旧前与新后相同');
      patchVnode(oldStartVnode, newEndVnode)
      // 此时还要移动新前生成的dom节点到老节点dom的最后一个节点之前
      // 如何移动节点？？只要你插入一个已经在DOM树上的节点，它就会被移动
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
      oldStartVnode = oldVnode[++oldStartIdx]
      newEndVnode = newVnode[--newEndIdx]
    } else if(checkSame(oldEndVnode, newStartVnode)) {
      // 若 ④旧后与新前的选择器与key都相同时进行比较并插入
      console.log('新前与旧后相同');
      patchVnode(oldEndVnode, newStartVnode)
      // 此时还要移动节点，将新前所指向的dom移动到老节点dom的最前面，即放在第一个
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldVnode[--oldEndIdx]
      newStartVnode = newVnode[++newStartIdx]
    } else {
      // 若上述四种策略皆不符合，则使用循环遍历方法进行比较
      // 先将旧节点的key保存
      console.log('都不相同，走循环');
      if(!keyMap) {
        keyMap = {}
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
          let key = oldVnode[i].key
          if (key != undefined) {
            keyMap[key] = i
          }
        }
      }
      // 寻找某项在在keyMap中的索引位置
      const oldIdx = keyMap[newStartVnode.key]
      if (oldIdx == undefined) {
        // 如果该项在旧节点中无对应关系，则表明该项为新增项
        // 先将该新增项转换为真实dom
        let newElm = createElm(newStartVnode)
        // 插入到旧节点开始节点之前
        parentElm.insertBefore(newElm, oldStartVnode.elm)
      } else {
        // 如果在旧节点中找到了对应的关系，则表示该项非新增项，因此需根据位置进行变动
        // 旧节点中对应要移动的节点
        let oldElmToMove = oldVnode[oldIdx]
        patchVnode(oldElmToMove, newStartVnode) // 新旧节点进行比较
        // 将该项设置为undefined，表示该项已经被处理过了，之后遍历直接略过即可
        oldVnode[oldIdx] = undefined
        // 移动位置
        parentElm.insertBefore(oldElmToMove.elm, oldStartVnode.elm)
      }
       // 指针下移，只移动新的头
       newStartVnode = newVnode[++newStartIdx];
    }
  }
  // 当旧节点的开始索引大于其结束索引时,即新节点未遍历完，则表示新节点有新增
  if(oldStartIdx >= oldEndIdx) {
    console.log('旧节点遍历完了，新节点还有剩余');
    // 则遍历剩余新节点,依次插入到老节点的最后一个节点后面即可
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      // 先将新虚拟节点创建新dom
      let newDom = createElm(newVnode[i])
      // 插入到老节点的开始节点后面
      parentElm.insertBefore(createElm(newVnode[i]), oldVnode[oldStartIdx].elm)
    }
  } else if(newStartIdx >= newEndIdx) {
    console.log('新节点遍历完了，旧节点还有剩余');
    // 当新节点的开始索引大于其结束索引时,即旧节点未遍历完，则表示新节点有删减
    // 则依次将老节点dom上的剩下节点删掉即可
    for (let i = oldStartIdx; i <= oldEndIdx ; i++) {
      if (oldVnode[i]) {
        parentElm.removeChild(oldVnode[i].elm)
      }
    }
  }

 
  
  


}
