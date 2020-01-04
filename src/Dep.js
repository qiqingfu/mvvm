/**
 * @author qiqingfu
 * @date 2020-01-01 22:59
 */

/**
 * 1. 主要作用为依赖收集
 * 2. 收集观察者对象, 并且通过观察者更新视图
 * 3. 和 Observer 建立关联, Observer 可以劫持数据的变化, 进而通过 Dep更新观察者
 * 4. 发布订阅模式
 */

class Dep {
  constructor () {
    this.subs = [];
  }

  /**
   * 依赖收集观察者, 为每一个被劫持的属性创建一个依赖收集器
   * @param watcher
   */
  addSub (watcher) {
    this.subs.push(watcher);
  }

  /**
   * 更新所有观察者对象
   */
  notify () {
    this.subs.forEach(watcher => watcher && watcher.update());
  }
}

export default Dep;
