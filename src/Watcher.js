/**
 * @author qiqingfu
 * @date 2020-01-01 23:12
 */

/**
 * 观察者构造器
 * 1. 在Compile 阶段观察每一个响应式属性
 * 2. 将观察的数据依赖添加到 Dep依赖收集中, 需要和当前属性的Dep实例关联
 * 3. 更新视图
 */

import util from './util.js';
import Dep from './Dep.js';

class Watcher {
  constructor (vm, value, cb) {
    this.vm = vm;
    this.value = value;
    this.cb = cb;
    this.oldValue = this.getOldValue();
  }

  /**
   * 初始化当前Watcher时, 需要获取当前观察属性未更新的值
   */
  getOldValue () {
    Dep.target = this;
    const val = util.getValue(this.vm, this.value);
    Dep.target = null;
    return val;
  }

  /**
   * Observer -> setter -> 通知Dep依赖收集数据更新 -> 通过观察当前数据的观察者对象 -> 更新视图
   */
  update () {
    const newVal = this.getValue();
    if (this.oldValue !== newVal) {
      this.cb(newVal);
    }
  }

  /**
   * 获取数据值
   */
  getValue () {
    return util.getValue(this.vm, this.value);
  }
}

export default Watcher;
