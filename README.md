使用 webpack 已经将近一年了，期间用它构建过4、5个项目，踩过一些坑，现在用自己的理解记录下来。

我现在教你一步一步如何搭建 webpack 开发的多页面项目。

```shell
git clone https://github.com/fe-config/generate-pages-tutorial 
```

> 需要注意每一步的 `webpack.config.js` 和 `pageage.json` 

## 一、基本 JavaScript 模块的处理

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


## 二、CSS 模块的处理

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

### 生成 CSS 文件

以上方法都是用 JS 生成 CSS，但是实际上，我们需要的是 CSS 文件，可以使用 `extract-text-webpack-plugin` 来解决。

打开 `page5.html` 可以看到效果

## 三、reload

上面2节我们已经掌握 JS 模块和 CSS 模块的处理，并且能够让 CSS 独立生成文件了，现在我们觉得每次修改代码然后 `build` 再刷新浏览器这个过程实在太慢了，而且也没必要每修改一行代码，就生成新文件，这是构建速度慢的主要原因。

`webpack-dev-server` 是 webpack 自带的一个开发服务器，支持热替换、代理等等功能。

```shell
cd 3_reload
npm install
npm run dev
```

打开 `0.0.0.0:8888/page1.html` ，你就可以看到页面了。而且无论你修改 `main.js`、 `style.css`或 `tpl/page1.html` 都会让浏览器自动刷新。

这里使用了：

* html-webpack-plugin: 在页面中自动注入 js 和 css 
* html-webpack-harddisk-plugin: 每次修改 `pages/tpl` 内文件时，会自动在 `pages/html` 内生成对应的文件
* raw-loader: 可以 `require` html 文件，做到每修改一次 tpl 文件，浏览器自动刷新一次页面

还有一点值得注意，因为 reload 功能是开发时才需要的，所以我们在 `build` 的时候要把这部分剔除，`cross-env` 和 `DefinePlugin` 的配合可以做到这点。

* [cross-env](https://github.com/kentcdodds/cross-env) 能够不分系统地在全局注入变量，下面这条命令就是将 DEV 注入 ENV 环境变量

```
cross-env ENV=DEV webpack-dev-server --inline --hot --quiet --progress --content-base pages/html  --host 0.0.0.0 --port 8888
```

* DefinePlugin 将 `process.env.ENV` 这个环境变量注入 `ENV` 中

```js
new webpack.DefinePlugin({
    'ENV': JSON.stringify(process.env.ENV)
})
```

* 在 `main.js` 中就可以区分是开发环境还是生产环境了：

```js
if(ENV == 'DEV') {
    require('pages/html/page1.html')    
}
```

## 四、ES2015 && babel


