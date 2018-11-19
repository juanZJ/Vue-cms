//入口文件
import Vue from 'vue'
//导入App根组件
import app from './App.vue'
import router from './router/index.js'

Vue.config.productionTip = false

//按需导入 Mint-UI 中的组件
import { Header } from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.component(Header.name, Header)

//导入mui的样式
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'






/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(app)
})
