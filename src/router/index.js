import Vue from 'vue'
import Router from 'vue-router'

//导入对应的路由组件
import homeComponent from '../pages/home/'
import memberComponent from '../pages/member/'
import shopcarComponent from '../pages/shopcar/'
import searchComponent from '../pages/search/'
import newsListComponent from '../pages/newsList'
import newsInfoComponent from '../pages/newsInfo'
import photoListComponent from '../pages/photoList'
import photoInfoComponent from '../pages/photoInfo'

Vue.use(Router)
//创建路由对象
export default new Router({
    routes: [ //配置路由规则
        { path: '/', redirect: '/home'},
        { path: '/home',component: homeComponent},
        { path: '/member',component: memberComponent},
        { path: '/shopcar', component: shopcarComponent},
        { path: '/search', component: searchComponent},
        { path: '/home/newsList',component: newsListComponent},
        { path: '/home/newsInfo/:id', component: newsInfoComponent},
        { path: '/home/photoList', component: photoListComponent},
        { path: '/home/photoInfo/:id', component: photoInfoComponent}
    ],
    linkActiveClass: 'mui-active' //覆盖默认的路由高亮的类,默认的类叫做 router-link-active
})