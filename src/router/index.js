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
import goodsListComponent from '../pages/goodsList'
import goodsInfoComponent from '../pages/goodsInfo'
import goodsCommentComponent from '../pages/goodsComment'
import imageTextComponent from '../pages/imageText'

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
        { path: '/home/photoInfo/:id', component: photoInfoComponent},
        { path: '/home/goodsList',component: goodsListComponent},
        { path: '/home/goodsInfo/:id', component: goodsInfoComponent},
        // { path: '/home/goodsInfo/:id', component: goodsInfoComponent, name: 'goodsInfo'},
        // { path: '/home/goodsComment/:id', component: goodsCommentComponent },
        { path: '/home/imageText/:id', component: imageTextComponent, name:'imageText'},
        { path: '/home/goodsComment/:id', component: goodsCommentComponent, name: 'goodsComment' }
    ],
    linkActiveClass: 'mui-active' //覆盖默认的路由高亮的类,默认的类叫做 router-link-active
})