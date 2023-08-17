import h from "./h";
import patch from "./patch";

let container = document.getElementById('container')
let btn = document.getElementById('btn')

// let oldVnode1 = h('div', {}, '这是个div');
// let newVnode1 = h('div', {}, h('div', {}, '这是内层的div'))

const oldVnode1 = h('ul', {}, [
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'D' }, 'D'),
  h('li', { key: 'E' }, 'E')
]);

const newVnode1 = h('ul', {}, [
    h('li', { key: 'Q' }, 'Q'),
    h('li', { key: 'T' }, 'T'),
    h('li', { key: 'A' }, 'A'),
    h('li', { key: 'B' }, 'B'),
    h('li', { key: 'Z' }, 'Z'),
    h('li', { key: 'C' }, 'C'),
    h('li', { key: 'D' }, 'D'),
    h('li', { key: 'E' }, 'E')
]);

patch(container, oldVnode1);
btn.onclick = function() {
  patch(oldVnode1, newVnode1)
}
// 第一种情况: 新节点与旧节点选择器与key相同，且新旧节点内容为text
// let oldVnode1 = h('div', {}, '这是个div');
// let newVnode1 = h('div', {}, '这是个span')

// let oldVnode1 = h('div', {}, '这是个div');
// let newVnode1 = h('ul', {}, [
//   h('li', { key: 'A' }, 'A'),
//   h('li', { key: 'B' }, 'B')
// ])

// 第二种情况：新节点与旧节点选择不同，新旧节点内容为text
// let oldVnode1 = h('div', {}, '这是个div');
// let newVnode1 = h('span', {}, '这是个span')

// 第三种情况：新旧节点相同，旧节点内容为text，新节点内容为children子节点
// let oldVnode1 = h('div', {}, '这是个div');
// let newVnode1 = h('div', {prop: {index: 34}}, h('div', {}, '这是个div'))

// 第四种情况，新旧节点相同，且新旧节点都有子节点children
// let oldVnode1 = h('ul', {}, [
//   h('li', { key: 'A' }, 'A'),
//   h('li', { key: 'B' }, 'B'),
//   h('li', { key: 'C' }, 'C'),
//   h('li', { key: 'D' }, 'D'),
//   h('li', { key: 'E' }, 'E')
// ]);
// let newVnode1 = h('ul', {}, [
//     h('li', { key: 'Q' }, 'Q'),
//     h('li', { key: 'T' }, 'T'),
//     h('li', { key: 'A' }, 'A'),
//     h('li', { key: 'B' }, 'B'),
//     h('li', { key: 'Z' }, 'Z'),
//     h('li', { key: 'C' }, 'C'),
//     h('li', { key: 'D' }, 'D'),
//     h('li', { key: 'E' }, 'E')
// ]);
