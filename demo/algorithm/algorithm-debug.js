function throttle(fn, delay) {
  let curTime = Date.now(); // 记录触发函数的时间

  return function () {
    let nowTime = Date.now();
    if (nowTime - curTime >= delay) {
      // 记录执行函数和触发函数的时间差是否在delay范围内
      curTime = Date.now(); // 注意每执行完一次函数，重新初始化curTime
      fn.apply(this, arguments);
    }
  };
}

function test(name) {
  console.log('name is ', name);
}
let func = throttle(test, 2000);
setInterval(() => {
  func('kerwin');
}, 500);
