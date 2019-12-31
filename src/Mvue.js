/**
 * @author qiqingfu
 * @date 2019-12-31 21:49
 */

import Compile from './Compile.js';

class Mvue {
  constructor (options) {
    this.$el = options.el;
    this.$data = options.data;
    this.$options = options;

    if (this.$el) {
      // 1. Compile 解析DOM
      const compile = new Compile(this.$el, this);
      console.log(compile);
    }
  }
}

export default Mvue;
