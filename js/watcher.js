/**
 * 发布订阅模式,视图层的节点订阅数据
 * @node : 需要使用订阅功能的节点
 * @ vm : 全局vm对象,获取数据
 * @ callback : 当数据变化怎么去改?调用回调函数
 */
class Watcher {
    constructor (vm,expr,callback) {
       this.vm = vm
       this.expr = expr 
       this.cb = callback
       this.value = this.get(this.vm, this.expr)
    }

    // 获取当前值
    get (vm,expr) {
        return vm.$data[expr]
    }

    // 提供一个更新方法
    update (newValue) {
        
    }
}