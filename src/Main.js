import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Post from './components/Post.vue'
import App1 from './components/App1.vue'
import App from './components/App.vue'
import Studinfo from './components/Studinfo.vue'
import Weather from './components/Weather.vue'
import store from './store.js'
import Login from './components/Login.vue'

const routes =[
    {path:'/',component:App, meta:{requiresAuth:true}},
    {path:'/Post/',component:Post,meta:{requiresAuth:true}},
    {path:'/login/',component:Login},
    {path:'/Weather/',component:Weather,meta:{requiresAuth:true}},
    {path:'/Studinfo/:id',component:Studinfo,props:true,meta:{requiresAuth:true}},
]

const router = new VueRouter({
    routes
})

router.beforeEach((to,from,next)=>{
    if (to.matched.some(record=> record.meta.requiresAuth)){
        if (store.getters.getst===null){
            next({
                path:'/login',
                query:{redirect: to.fullPath}
            })
        }else(
            next()
        )
    }else{
        next()
    }
})

Vue.use(VueRouter)
Vue.use(VueAxios,axios)

new Vue({
    render:h=>h(App1),
    el:'#app',
    router,
    store
})