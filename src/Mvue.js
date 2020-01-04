/**
 * @author qiqingfu
 * @date 2019-12-31 21:49
 */

import Compile from './Compile.js';
import Observer from './Observer.js';
import ProxyData from './Proxy.js';

class Mvue {
  constructor (options) {
    this.$el = options.el;
    this.$data = options.data;
    this.$options = options;

    if (this.$el) {
      // 1.数据观察者
      this._observer = new Observer(this.$data);

      // 2. 指令解析器
      this._watcher = new Compile(this.$el, this);

      // 3. 代理属性
      this._proxy = new ProxyData(this, this.$data);
    }
  }
}

export default Mvue;
