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