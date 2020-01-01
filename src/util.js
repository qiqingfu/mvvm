/**
 * @author qiqingfu
 * @date 2019-12-31 22:52
 */

const toString = Object.prototype.toString;
const hasOwn = Object.prototype.hasOwnProperty;

/**
 * 一些辅助方法
 */

/**
 * 将类数组转换为数组
 * @param arr
 * @returns {[]}
 */
const toArray = arr => Array.prototype.slice.call(arr);

/**
 * 匹配{{  }}插值的文本节点
 * @param text
 */
const matchTextNode = text => {
  const reg = /{{(.+?)}}/;
  return reg.test(text);
};

/**
 * 检测 obj 是否为一个普通函数
 * @param obj
 * @returns {boolean}
 */
function isPlanObject (obj) {
  if (!obj || toString.call(obj) !== '[object Object]') {
    return false;
  }

  const hasConstructor = hasOwn.call(obj, 'constructor');
  const hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');

  if (obj.constructor && !hasConstructor && !hasIsPrototypeOf) {
    return false;
  }

  let key;
  for (key in obj) { /*  */ }

  return typeof key === 'undefined' || hasOwn.call(obj, key);
}

export default {
  toArray,
  matchTextNode,
  isPlanObject
};
