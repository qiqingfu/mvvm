class MVVM {
    constructor (options) {
        this.$vm = this
        this.$el = options.el
        this.$data = options.data
        
        // 如果模块存在,变异模板
        if (this.$el) {
            // 属性挟持
            new Observer(this.$data)

            this.$complete = new TemplateCompiler(this.$el, this.$vm );
        }
    }
}