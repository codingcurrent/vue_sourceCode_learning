import h from "./h";
import patch from "./patch";

let container = document.getElementById('container')
let btn = document.getElementById('btn')

let oldVnode1 = h('div', {}, '这是个div');
let newVnode1 = h('span', {}, '这是个span')

const myVnode1 = h('ul', {}, [
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'D' }, 'D'),
  h('li', { key: 'E' }, 'E')
]);

const myVnode2 = h('ul', {}, [
    h('li', { key: 'Q' }, 'Q'),
    h('li', { key: 'T' }, 'T'),
    h('li', { key: 'A' }, 'A'),
    h('li', { key: 'B' }, 'B'),
    h('li', { key: 'Z' }, 'Z'),
    h('li', { key: 'C' }, 'C'),
    h('li', { key: 'D' }, 'D'),
    h('li', { key: 'E' }, 'E')
]);

patch(container, myVnode1);
btn.onclick = function() {
  patch(myVnode1, myVnode2)
}



  // console.log(h('div', {}, '这是个div'));
  // console.log(h('div', {prop: {index: 34}}, h('div', {}, '这是个div')));
  // console.log(h('ul', {}, [
  //     h('li', {}, '牛奶'),
  //     h('li', {}, '咖啡'),
  //     h('li', {}, '可乐')
  //     ])
  //   );

  //   console.log(patch(h('ul', {}, [
  //     h('li', {}, '牛奶'),
  //     h('li', {}, '咖啡'),
  //     h('li', {}, '可乐')
  //     ]), h('ul', {}, [
  //       h('li', {}, 'xiap'),
  //       h('li', {}, 'kafei'),
  //       h('li', {}, 'colo')
  //       ])), '这是啥呢');

