/**
 * @author qiqingfu
 * @date 2020-01-04 14:24
 */

class ProxyData {
  constructor (vm, data) {
    this.$vm = vm;
    this.$data = data || this.$vm.$data;
    this.proxy();
  }

  /**
   * 将 this.$data 代理到 this
   */
  proxy () {
    Object.keys(this.$data)
      .forEach(key => {
        const val = this.$data[key];
        Object.defineProperty(this.$vm, key, {
          get () {
            return val;
          },
          set: (newVal) => {
            this.$data[key] = newVal;
          }
        });
      });
  }
}

export default ProxyData;
