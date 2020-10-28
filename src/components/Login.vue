<template>
   <div class="main">
       <h1>Login</h1>
       <div class="content">
           <br>
           <input type="text" v-model="name">
           <button @click="compare()">Sign in</button>
       </div>
   </div>
</template>
<script>
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'
export default {
    data(){
        return{
            name:""
        }
    },
    methods:{
        compare:function(){
            Vue.axios.get("http://46.101.212.195:3000/students/name/"+this.name)
            .then((response)=>{
                if (response.data===null){
                    return
                }
                this.$store.commit('setst',response.data);
                this.$router.push('/');
            })
        }
    }
    
}
</script>