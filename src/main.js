//入口文件
import Vue from 'vue'
//导入App根组件
import app from './App'
import router from './router/'
import moment from 'moment'

//注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//每次刚进入网站,肯定会调用 main.js在刚调用的时候,先从本地存储中,把购物车的数据读出来,放到 store中
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
  state: { //this.$store.state.***
    car: car //将购物车中的商品的数据,用一个数组存储起来,在 car 数组中,存储一些商品的对象,可以将商品对象暂时设计成
    //{ id:商品的id, count: 要购买的数量, price: 商品的单价, selected: false }
  },
  mutations: { //this.$store.commit('方法的名称', '按需传递唯一的参数')
    addToCar(state, goodsInfo) {
      //点击加入购物车把商品信息保存到store中的car上
      /**
       * 1.如果购物车中,之前就已经有这个对应的商品了,那么只需要更新数量
       * 2.如果没有,直接把商品数据push到car中
       */
      //假设在购物车中没有找到对应的商品
      var flag = false
      state.car.some(item => {
        if(item.id == goodsInfo.id){
          item.count += parseInt(goodsInfo.count)
          flag = true
          return true
        }
      })
      //如果最终循环完毕,得到的flag 还是false,则把商品数据直接push 到购物车中
      if(!flag){
        state.car.push(goodsInfo)
      }

      //当更新 car 之后,把 car 数组,存储到本地的 localStorage 中
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {  //this.$store.getters.***
    //相当于计算属性,也相当于 filters
    getAllCount(state) {
      var c = 0;
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
  }
})

//导入vue-resource
import VueResource from 'vue-resource'
//注册vue-resource
Vue.use(VueResource)
//配置vue-resource的请求根域名
Vue.http.options.root = 'http://www.lovegf.cn:8899/';
//全局设置 post 时候表单数据格式组织形式  application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;

Vue.config.productionTip = false

//按需导入 Mint-UI 中的组件
import { Header, Swipe, SwipeItem, Button} from 'mint-ui'

// import 'mint-ui/lib/style.css'

Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button)

//导入mui的样式
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

//引入自己的全局样式
import './css/common.less'

//导入图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

//安装图片预览插件
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)

//定义全局过滤器
Vue.filter('dateFormat', function(dateStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  // 直接调用表示获取当前时间
  return moment(dateStr).format(pattern)
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(app),
  store //挂载 store状态管理对象
})
