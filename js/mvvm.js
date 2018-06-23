class MVVM {
    constructor (options) {
        this.$vm = this
        this.$el = options.el
        this.$data = options.data
        
        // 如果模块存在,变异模板
        if (this.$el) {
            this.$complete = new TemplateCompiler(this.$el, this.$vm );
        }
    }
}