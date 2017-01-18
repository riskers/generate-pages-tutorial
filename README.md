使用 webpack 已经将近一年了，期间用它构建过4、5个项目，踩过一些坑，现在用自己的理解记录下来。

我现在教你一步一步如何搭建 webpack 开发的多页面项目。

```shell
git clone https://github.com/fe-config/generate-pages-tutorial 
```

## 一、基本配置

```shell
cd 1_multi_pages
npm install
npm run build
```

查看 `webpack.config.js` 可以其实就是配置多个 entry 而已，可以看到 `dist` 下生成编译好的文件：

```
|--- dist
        |--- page1
                |--- main.js
        |--- page2
                |--- main.js
```

这里的目录层级和 entry 中的模块名(`page1/main`、`page2/main`)对应。

打开 `page1.html` 和 `page2.html` 就可以看到我们的js模块生效了。现在进入下一步!


## 二、CSS 的处理

通过上一步，我们已经解决了 JavaScript 模块的问题，而页面中还有 CSS 。webpack 默认是只处理 JavaScript 的，所以我们要引入 `css-loader` 和 `style-loader` 来处理 CSS。

```shell
cd 2_css
npm install
npm run build
```

### CSS

```js
{
    test: /\.css$/,
    loaders: ['style', 'css']
}
```

loader 是专门处理某些模块的处理器。webpack 只能处理 js ，为了能够处理 CSS ，就需要 `css-loader`；而为了能够在页面中插入 CSS ，还需要 `style-loader`。

打开 `page1.html` 就可以看到 css 生效了。

### less

```js
{
    test: /\.less$/,
    loaders: ['style', 'css', 'less']
}
```

如果使用的是 less ，就需要安装 `less` 和 `less-loader`。

打开 `page2.html` 就可以看到 less 生效了。

### sass

```js
{
    test: /\.scss$/,
    loaders: ['style', 'css', 'sass']
}
```

如果使用的是 sass ，就需要安装 `node-sass` 和 `sass-loader`。

打开 `page3.html` 就可以看到 less 生效了。

### postcss

```js
module: {
    loaders: [
        {
            test: /\.css$/,
            include: ROOT + '/src/page4',
            loaders: ['style', 'css', 'postcss']
        }
    ]
},
postcss: function() {
    return [autoprefixer]
}
```

如果使用的是 sass ，就需要安装 `post-loader`，这里是以 `autoprefixer` 为例。

打开 `page4.html` 就可以看到 less 生效了。

## 三、webpack-dev-server


















关于 webpack 是什么，有什么作用我就不介绍了，网上一搜一大堆。不过网上搜到的多数是怎么使用 webpack 开发 React 或者 Vue，但其实使用 webpack 开发多页面也是很方便的，因为 webpack 本质就是一个打包工具。



## 入口 entry

```js
entry: {
    'vendor': [
        'jquery'
    ],
    'page1/main': [
        './src/page1/main'
    ],
    'page2/main': [
        './src/page2/main'
    ]
}
```

多页面其实就是多入口，`page1/main`、`page2/main` 对应一个页面的主 js 逻辑，`vendor` 是每个页面都会用的模块，这里是 `jquery`。然后使用 `ProvidePlugin` 就可以不在每个模块中 `import` 他们而直接使用 `$` 了：

```js
new webpack.ProvidePlugin({
    $: 'jquery'
})
```

然后使用 `webpack.optimize.CommonsChunkPlugin` 插件

```js
new webpack.optimize.CommonsChunkPlugin('vendor','vendor.js'),
```

## 模块映射资源和模板

入口每个模块都定义好了之后，接下来就是就是把每个页面的模块与

## webpack-dev-server




