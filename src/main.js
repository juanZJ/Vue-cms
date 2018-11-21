//入口文件
import Vue from 'vue'
//导入App根组件
import app from './App'
import router from './router/'
import moment from 'moment'

//导入vue-resource
import VueResource from 'vue-resource'
//注册vue-resource
Vue.use(VueResource)
//配置vue-resource的请求根域名
Vue.http.options.root = 'http://www.lovegf.cn:8899/'

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

//定义全局过滤器
Vue.filter('dateFormat', function(dateStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  // 直接调用表示获取当前时间
  return moment(dateStr).format(pattern)
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(app)
})
