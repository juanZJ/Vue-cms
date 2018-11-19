import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import homeComponent from '../pages/home/'
import memberComponent from '../pages/member/'
import shopcarComponent from '../pages/shopcar/'
import searchComponent from '../pages/search/'

export default new Router({
    routes: [
        { path: '/', redirect: '/home'},
        { path: '/home',component: homeComponent},
        { path: '/member',component: memberComponent},
        { path: '/shopcar', component: shopcarComponent},
        { path: '/search', component: searchComponent},
    ],
    linkActiveClass: 'mui-active'
})