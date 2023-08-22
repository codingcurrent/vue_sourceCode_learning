import observe from "./observe";

var obj = {
  a: {
      m: {
          n: 5
      }
  },
  b: 10,
  c: {
      d: {
          e: {
              f: 6666
          }
      }
  },
  g: [22, 33, 44, 55]
};
observe(obj)
obj.a.m.n = 70;
console.log(obj.g.shift(), '看看结果是啥');
console.log(obj);