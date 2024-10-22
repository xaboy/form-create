# pnpm-workspace-options

1. 子包之间的依赖

 // 举例给 @form-create/element-ui 安装自己开发的包

 pnpm add @form-create/component-elm-checkbox  @form-create/component-elm-frame @form-create/component-elm-group @form-create/component-elm-radio @form-create/component-elm-select @form-create/component-elm-tree @form-create/component-elm-upload @form-create/component-subform @form-create/component-wangeditor -F @form-create/element-ui

    
 pnpm add @form-create/component-ele-* -F @form-create/element-ui ? 这样行不行? 不知道....


 // @form-create/core 安装自己开发的包

 pnpm add @form-create/utils -F @form-create/core


 // @form-create/ant-design-vue 安装自己开发的包

 pnpm add @form-create/component-antdv-frame @form-create/component-antdv-group @form-create/component-antdv-upload @form-create/component-subform @form-create/core @form-create/utils @form-create/component-wangeditor -F @form-create/ant-design-vue


 // @form-create/iview 安装自己开发的包

 pnpm add @form-create/component-ivu-frame @form-create/component-ivu-group @form-create/component-ivu-upload @form-create/component-ivu-checkbox @form-create/component-ivu-radio @form-create/component-ivu-select @form-create/component-ivu-tree @form-create/component-subform @form-create/component-wangeditor @form-create/core @form-create/utils -F @form-create/iview