/**
 * observer 发布者,只管理数据
 */
class Observer {
    constructor (data) {
        // 提供一个解析方法,完成属性的分析和挟持
        this.observer(data)
    }

    // 对数据进行挟持
    observer(data){
        // 判断数据有效性,必须是对象
        if(data && typeof data === 'object' && data !== null){
            let keys = Object.keys(data)
            keys.forEach((key) => {
              this.defineReactive(data,key,data[key])  
            })
        }
    }

    // 重新定义key值
    defineReactive (obj, key,value) {
        Object.defineProperty(obj,key,{
            enumerable:true,
            configurable:false,
            
            // getter 取值
            get(){
                return value
            },
            // setter 设置值
            set(newValue){
                value = newValue
            }
        })
    }
}