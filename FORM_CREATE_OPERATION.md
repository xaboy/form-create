# 打包先关的命令

```shell

  ## 打包所有的 components 和 packages ##
  # yarn build (yarn bulld -all) #

  ## 打包所有的 components ##
  # yarn build -c all #

  ## 打包所有的 components ##
  # yarn build -p all #

  ## 打包指定components下的某个单独组件 ## ( \* 是为防止zsh报错 -> zsh: no matches found:)
  # yarn build -c ant-design-vue element-ui # 指定打components下的ant-design-vue,element-ui的组件
  # yarn build -c ant-design-vue/frame # 指定打ant-design-vue下的frame组件
  # yarn build -c ant-design-vue/{frame,group} # 指定打ant-design-vue下的frame,group组件
  # yarn build -c ant-design-vue/\* # 单独打ant-design-vue下的所有组件

  ## 打包指定pacakges下的某个单独库 ## ( \* 是为防止zsh报错 -> zsh: no matches found:)
  # yarn build -p ant-design-vue # 单独打packages下ant-design-vue
  # yarn build -p ant-design-vue element-ui # 指定打packages下的ant-design-vue,element-ui包

  ### 示例 ###
  # yarn build -c ant-design-vue/frame element-ui/group common/\*

```