/**
 * @author qiqingfu
 * @date 2020-01-01 20:52
 */

import util from './util.js';
/**
 * 劫持 data 中每一个属性
 */

class Observer {
  constructor (data) {
    this.observer(data);
  }

  /**
   * 劫持的 data数据
   * @param data
   */
  observer (data) {
    if (data && util.isPlanObject(data)) {
      Object.keys(data)
        .forEach(key => {
          this.defineProperty(data, key, data[key]);
        });
    }
  }

  /**
   * 为 data 中每一个对象设置 get set 函数
   * @param data 被劫持的 data 对象
   * @param key  data 中的键
   * @param val  data 中的值
   */
  defineProperty (data, key, val) {
    this.observer(val);
    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get() {
        return val;
      },
      set: v => {
        this.observer(v);
        if (v !== val) {
          val = v;
        }
      }
    });
  }
}

export default Observer;
