### 实现一个简易的mvvm

 - 模板解析
   - document.createDocumentFragment()
   - document.textContent
```
class MVVM {
    构造函数
    对属性进行缓存,this.$vm,this.$el,this.$data

    如果模板存在 this.$el
    分工干活 new TemplateCompiler()构造函数
}

主要工作是对vm.$el进行编译,如果直接操作dom会影响性能,所以要把模板缓存到内存中进行编译,编译成功之后再返回出来编译后的模板,插入到vm.$el中。
class TemplateCompiler {
    重要的属性要缓存
    constructor(el, vm){
        判断el 是不是元素节点,如果不是再通过document.querySelector(el)获取
        this.el = this.isElementNode(el) ? el : document.querySelector(el)
    }
}
1.this.node2fragment(this.el)
通过 document.createDocumentFragment()对模板进行开启一个新的空间。while(){}遍历模板的子节点,插入到fragment内存片段中,并且将fragment返回出去之后进行编译

2. this.compile(fragment) 
解析模板,通过childNodes获取内存模板的子节点,先转成数组之后通过forEach进行遍历。
如果子节点是元素节点,就进行解析指令

3.this.compileElement(node) 
解析指令
    通过attributes获取当前元素节点的所有属性,是一个类数组。转换为数组之后再遍历没一个属性,(class="message" || v-text="data")
    判断属性是不是指令属性如v-开头的,如果是就进行收集。找到对应符合条件的value('data')

4. 开始数据对应到模板
@node 模板
@this.vm TemplateCompiler实例
@expr data数据对应的值
CompilerUtils.text(node, this.vm, expr)

调用updateFn进行数据更新
updateFn && updateFn(node,vm.$data[expr])

vm,$data[expr] 就是data{data:"Hello"}中的Hello
通过 node.textContent = value
```
 - v-text指令解析
 - ...
