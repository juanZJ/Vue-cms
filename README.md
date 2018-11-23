# vue-cms

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## 制作首页App组件
1. 完成 Header 区域,使用的是 Mint-UI 中的Header组件
2. 制作底部的 Tabbar 区域,使用的是MUI的Tabbar.html
 + 在制作购物车小图标时,操作会相对多一些
 + 先把扩展图标的css样式,拷贝到项目中
 + 拷贝扩展字体库 ttf 文件,到项目中
 + 为购物车小图标 添加如下样式 `mui-icon mui-icon-extra mui-icon-extra-cart`
3. 要在中间区域放置一个 router-view 来展示路由匹配到的组件

## 改造 tabbar 为 router-link

## 设置路由高亮

## 点击 tabbar 中的路由链接,展示对应的路由组件

## 制作首页轮播图布局

## 加载首页轮播图数据
1. 获取数据,使用 vue-resource
2. 使用 vue-resource 的 this.$http.get 获取数据
3. 获取到的数据,要保存到data 身上
4. 使用 v-for 循环渲染每一个item项

## 改造九宫格区域的样式

## 改造新闻资讯路由链接

## 新闻资讯页面制作
1. 绘制界面,使用MUI中的media-list.html
2. 使用vue-resource获取数据
3. 渲染真实数据

## 实现新闻资讯列表点击跳转到新闻详情
1. 把列表中的每一项改造为 router-link,同时,在跳转的时候应该提供唯一的id标识符
2. 创建新闻详情的组件页面 newsInfo.vue
3. 在路由模块中,将新闻详情的路由地址和组件页面对应起来

##实现新闻详情的页面布局和数据渲染

## 单独封装一个 comment.vue 评论子组件
1. 先创建一个单独的 comment.vue 组件模板
2. 再需要使用 comment 组件的页面中,先手动导入 comment 组件
 + `import comment from './comment.vue'`
3. 在父组件中,使用`comment`属性,将刚才导入comment组件注册为自己的子组件
4. 将注册子组件时候的注册名称以标签形式在页面中引用即可

## 获取所有的评论数据显示到页面中
1. getComments

## 实现点击加载更多评论功能
1. 为加载更多按钮绑定点击事件, 在事件中请求下一页数据
2. 点击加载更多,让 `pageIndex++`,然后重新调用 `this.getComments()`方法重新获取最新一页的数据
3. 为了防止新数据覆盖老数据的情况,我们在点击加载更多的时候,每当获取到新的数据,应该让老数据调用数组的 `concat`方法,拼接上新数组
4. `concat()` 方法用于连接两个或多个字符串
5. `this.comments = this.comments.concat(result.body.message);` 

## 发表评论
1. 把文本框做双向数据绑定
2. 为发表按钮绑定一个事件
3. 校验评论内容是否为空,如果为空则`Toast`提示用户评论内容不能为空 
    ```
    if(this.msg.trim().length === 0) {
      return Toast("评论内容不能为空!");
    }
    ```
4. 通过 `vue-resource`发送一个请求,把评论内容提交给服务器
5. 当发表评论OK后,重新刷新列表,以查看最新的评论
    + 如果调用 `getComments`方法重新刷新评论列表的话,可能只能得到最后一页的评论,前几页的而评论获取不到
    + 第一种方法: 在客户端手动拼接一个新的评论对象,调用数组的 `unshift`方法,把最新的评论追加到`data`中`comment`的开头,实现刷新评论列表的需求
    ```
    var comment = {
           user_name: "匿名用户",
           add_time: Date.now(),
          content: this.msg.trim()
    };
    this.comments.unshift(comment);
    this.msg = "";
    this.getComments()
    ```
    + 第二种方法:刷新评论时将pageIndex重置为1 并且将数组清空
    ```
    this.pageIndex = 1 ;
    this.comments = [];
    this.msg = "";
    this.getComments()
    
    ```

## 改造图片按钮为路由的链接并显示对应的组件页面

## 绘制图片列表组件页面结构并美化样式
1. 制作顶部的滑动条
2. 制作底部的图片列表

### 制作顶部滑动条的坑
1. 需要借助于 MUI 中的 `tab-top-webview-main.html`
2. 需要把 slider 区域的 `mui-fullscreen` 类去掉 (影响导航样式)
3. 滑动条无法正常触发滑动,通过检查官方文档,发现这是JS组件,需要被初始化一下:
    + 导入 mui.js
    + 调用官方提供的方式去初始化:
    ```
    mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    ```
4. 在初始化滑动条的时候,导入的mui.js,控制台报错 `Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode`
    + 推测可能是mui.js中用到了 'caller', 'callee', and 'arguments',在 webpack 打包好的 bundle.js中,默认是启用严格模式的,所以这两种冲突了
    + 解决方案: 禁用严格模式,修改.babelrc，略过mui.js文件
    ```
    "ignore": [
        "./src/assets/webuploader/*.js"
    ]
    ```
5. 刚进入图片页面的时候,滑动条无法正常工作,要初始化滑动条,必须要等 DOM 元素加载完毕,所以一定要把初始化滑动条的代码放在mounted钩子函数中(生命周期函数)
6. 当滑动条调试OK后, tabbar 无法正常工作了,这时候需要把每个tabbar按钮样式中 `mui-tab-item` 重新改一下名字

## 获取所有分类,并渲染分类列表

## 制作图片列表区域
1. 图片列表需要使用懒加载技术,使用 vue-lazyload, 根据文档使用
    ```
    npm install vue-lazyload -D;

    import Vue from 'vue'
    import App from './App.vue'
    import VueLazyload from 'vue-lazyload'

    Vue.use(VueLazyload)

    <ul>
        <li v-for="img in list">
        <img v-lazy="img.src" >
        </li>
    </ul>
    ```
2. 渲染图片数据

## 实现图片列表的懒加载改造和样式美化

## 实现了点击图片跳转图片详情页面
1. 在改造 li 成 router-link 的时候,需要使用 tag 属性指定要渲染为哪种元素

## 实现详情页面的布局和美化,同时获取数据渲染页面

## 实现图片详情中缩略图的功能
1. 使用插件 vue2-preview 这个缩略图插件
2. 获取到所有的图片列表,然后使用 v-for 指令渲染数据
3. 注意: img标签的class不能去掉  每个图片对象中,必须有w 和 h 属性
    ```
    npm i vue2-preview -S

    import VuePreview from 'vue2-preview'
    Vue.use(VuePreview)

    <template>
        <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)">
    </template>
    ```

## 注意 key 值错误
    ```
    vue.runtime.esm.js?ff9b:587 [Vue warn]: Duplicate keys detected: '2018-11-23T08:37:50.000Z'. This may cause an update error.

    found in

    ---> <Comment> at src/components/comment/index.vue
            <Index> at src/pages/photoInfo/index.vue
            <App> at src/App.vue
            <Root>
    ```
# 使用v-for更新已渲染的元素列表时,默认用就地复用策略;列表数据修改的时候,他会根据key值去判断某个值是否修改,如果修改,则重新渲染这一项,否则复用之前的元素;vue和react的虚拟DOM的Diff算法大致相同，其核心是基于两个简单的假设：
1. 两个相同的组件产生类似的DOM结构，不同的组件产生不同的DOM结构。

2. 同一层级的一组节点，他们可以通过唯一的id进行区分。
# 所以我们需要使用key来给每个节点做一个唯一标识. 出现错误是由于key值出现冲突,改变key值即可
# key的值只能是number或者string类型
