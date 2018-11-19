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
1.完成 Header 区域,使用的是 Mint-UI 中的Header组件
2.制作底部的 Tabbar 区域,使用的是MUI的Tabbar.html
 + 在制作购物车小图标时,操作会相对多一些
 + 先把扩展图标的css样式,拷贝到项目中
 + 拷贝扩展字体库 ttf 文件,到项目中
 + 为购物车小图标 添加如下样式 `mui-icon mui-icon-extra mui-icon-extra-cart`
3.要在中间区域放置一个 router-view 来展示路由匹配到的组件

## 改造 tabbar 为 router-link

## 设置路由高亮

## 点击 tabbar 中的路由链接,展示对应的路由组件