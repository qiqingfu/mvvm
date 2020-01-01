/**
 * @author qiqingfu
 * @date 2019-12-31 22:52
 */

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

export default {
  toArray,
  matchTextNode
};
