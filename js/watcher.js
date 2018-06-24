/**
 * 发布订阅模式,视图层的节点订阅数据
 * @ vm : 全局vm对象,获取数据
 * @ expr : 属性
 * @ callback : 当数据变化怎么去改?调用回调函数
 */
class Watcher {
    constructor (vm,expr,callback) {
       this.vm = vm
       this.expr = expr 
       this.cb = callback
       this.value = this.get()
    }

    // 获取当前值
    get () {
        Dep.target = this // watcher实例
        let value = this.vm.$data[this.expr]
        Dep.target = null
        return value
    }

    // 提供一个更新方法
    update (newValue) {
        this.cb(newValue)   
    }
}