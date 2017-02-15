升级到 webpack@2 版本

webpack1 升级到 webpack2 主要是以下几个变化：

* `module.loaders` 改为 `module.rules`
* loader 要使用 `use` 不再是 `loader`，且 loader 名要补全
* extract-text-webpack-plugin 只有 v2 版本才能在 webpack2 中使用
* webpack2 默认支持 es2015 的模块，记得要在 `.babelrc` 中设置不使用 babel 解析模块符号

具体见 http://www.zcfy.cc/article/migrating-from-v1-to-v2-2378.html