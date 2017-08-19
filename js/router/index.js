import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App'

 

const adminLogin = () =>
    import ( /* webpackChunkName: "adminlogin" */ 'src/manage/login')

const manage = () =>
    import ( /* webpackChunkName: "manage" */ 'src/manage')
const adminHome = () =>
    import ( /* webpackChunkName: "managehome" */ 'src/manage/home')
const synclist = () =>
    import ( /* webpackChunkName: "synclist" */ 'src/manage/synclist')

Vue.use(VueRouter)

export default new VueRouter({
    routes: [{
        path: '/manage',
        component: manage,
        children: [{
            path: '',
            component: adminHome,
            meta:["首页"]
        },{
            path: 'synclist',
            component: synclist,
            meta:["同步记录"]
        }, ]
    }, {
        path: '/manage/login',
        component: adminLogin
    },  ]
})
