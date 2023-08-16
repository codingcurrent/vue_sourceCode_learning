// 该函数用于将虚拟dom转化为虚拟节点，用于仿写snabbdom库中的h函数
// 实现简单的功能：仅限于传入如下三种形态的参数，输出结果为VNode
// export interface VNode {
//       sel: string | undefined;
//       data: VNodeData | undefined;
//       children: Array<VNode | string> | undefined;
//       elm: Node | undefined;
//       text: string | undefined;
//       key: Key | undefined
//     }
// 形态① h('div', {}, '文字')
// 形态② h('div', {}, [])
// 形态③ h('div', {}, h())
import vnode from './vnode'
export default function h(sel, data, c) {
  // 根据c的类型进行不同包装处理
  if (typeof c == 'string' || typeof c == "number") {
    // 则为形态1
    return vnode(sel, data, undefined, undefined, c)
  } else if(Array.isArray(c)){
    let children = []
    for (let i = 0; i < c.length; i++) {
      if (!(typeof c[i] == 'object' && c[i].hasOwnProperty('sel'))) {
        // 如果chilred不是vnode对象且没有sel属性，则不对
        throw new Error('传入的数组参数不对')
      }
      // 否则将c[i]依次推入children数组
      children.push(c[i])
    }
    return vnode(sel, data, children, undefined, undefined)
    // 则为形态2
  } else if(typeof c == 'object' && hasOwnProperty('sel')){
    // 则为形态3
    // 此时c为唯一的children,将其推入children数组即可
    let children = [c]
    return vnode(sel, data, children, undefined, undefined)
  } else {
    throw new Error('第三个参数不对~')
  }

}