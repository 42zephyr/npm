import Vue from 'vue'
import VueRouter from 'vue-router'
import createPersistedState from 'vuex-persistedstate'
import Vuex from 'vuex'

Vue.use(Vuex)

const store= new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        count:0,
        color:'',
        student:null
    },
    mutations: {
        setCount:(state,c)=>state.count=c,
        back:(state,style)=>state.color=style,
        setst:(state,stud)=>state.student=stud,
    },
    getters: {
        getCount:(state)=>
        {
            return ('Кількісь студентів = '+state.count)
        },
        getback:(state)=>{
            return(state.color)
        },
        getst:(state)=>
        {
            return(state.student)
        }
    }
})
export default store;