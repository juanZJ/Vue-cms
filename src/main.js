//入口文件
import Vue from 'vue'
//导入App根组件
import app from './App'
import router from './router/'

//导入vue-resource
import VueResource from 'vue-resource'
//注册vue-resource
Vue.use(VueResource)

Vue.config.productionTip = false

//按需导入 Mint-UI 中的组件
import { Header, Swipe, SwipeItem} from 'mint-ui'

import 'mint-ui/lib/style.css'

Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

//导入mui的样式
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

//引入自己的全局样式
import './css/common.less'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(app)
})
