<template>
    <div >
        
    
        <form>
<br>
               Ім'я   <input type="text"  v-model.trim="name"> <br>
                Група <select  v-model="group"> 
                    <option>RPZ 17 2/9</option>
                    <option>RPZ 17 1/9</option>
                    <option>RPZ 18 2/9</option>
                    <option>RPZ 18 1/9</option>
                </select>
                    <br>
               Оцінка <select  v-model="mark"> 
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <br>
                <input type="checkbox"  v-model="isDonePr"> Здав<br>
                <input type="submit" v-on:click="add()">
        </form>
            <br>


            <input type="text" v-model="piece">
            <table >

               <tr v-for="Student in students" v-bind:key="Student._id"   v-bind:class="Student.name.includes(piece)?'':'red'">
                   <template v-if="Student._id==chid">
                    <td><input v-model="Student.name" value="Student.name"></td> 
                    <td><input type="checkbox" v-model="Student.isDonePr" value="=Student.isDonePr"></td> 
                    <td>
                        <select  v-model="Student.mark" value="Student.mark"> 
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </td>
                <td><button v-on:click.prevent="confirm(Student._id)" >Update</button></td>
                </template>

                   <template v-else>
                <td><img :src="Student.photo" class="photka"  ></td> 
                    <td>{{Student.mark}}</td> 
                    <td><input type="checkbox" disabled v-model="Student.isDonePr" value="=Student.isDonePr"></td> 
                    <td>{{Student._id}}</td>
                    <td>{{Student.name}} </td>
                    <td>{{Student.group}} </td>
                    <td>{{Student.__v}} </td>
                    <td><router-link v-bind:to="'/Studinfo/'+Student._id" v-on:click="clicked(Student._id)">{{Student._id}}</router-link> </td>
                <td><button v-on:click.prevent="update(Student._id)" >Update</button></td>
                    <td><a href="#" v-on:click.prevent="del(Student._id)" v-show="Student.group==getgroup.group">Delete</a></td>
                </template>
            </tr> 
            <br>
            </table>
            <div v-bind:class="chst==''?'back1':'back2'">
            <router-link v-bind:to="'/Post/'" >Post</router-link>
             <router-link v-bind:to="'/Weather/'" >Weather</router-link>
        <select v-model="chcurr" @change="calc()">
            <option>USD</option>
            <option>EUR</option>
            <option>RUR</option>
            <option>BTC</option>
        </select>
        <input type="number" v-model="uahs" @change="calc()">
        <!-- <button v-on:click.prevent="calc()"> Calc </button> -->
            {{conv|round}}<br>
            {{studentsCount}}<br>
        
        <input type="radio" value='' v-model="chst" @click="send()">
            <br>
            <input type="radio" value='true' v-model="chst" @click="send()">
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'

    export default{
        props:{
        id:''
    },
        data(){
            return{
                piece:"",
                    choose:"Yes",
                    name:"",
                    group:"",
                    isDonePr:"",
                    mark:"",
                    students :[],
                    currs:[],
                    search:'',
                    arsort:[],
                    chid:"",
                    chcurr:"",
                    uahs:"",
                    conv:"",
                    chst:''
                    

                }
        },
    filters:{
            round:function(value){
                if (!value) return '0'
                return Math.ceil(value)
            }
        },
    mounted: function(){
      Vue.axios.get("http://46.101.212.195:3000/students").then((response) =>{
          console.log(response.data);
          this.students=response.data;
      });  
      Vue.axios.get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5").then((response) =>{
          console.log(response.data);
          this.currs=response.data;
      });
      
      
    },
    methods:{
        clickme:function(id){
            alert("ok");
            this.students=this.students.filter((element)=>{
                return element._id !==id;
            })
        },
        del:function(id){
            Vue.axios.delete("http://46.101.212.195:3000/students"+id,{})
             .then((response)=>{ 
                this.students=this.students.filter(element=>{ 
                return element._id!==id;});
            }) 
        },
        clicked: function(id){
            console.log(id)
        },
        add:function(){
            Vue.axios.post("http://46.101.212.195:3000/students",{
                name: this.name,
                group:this.group,
                isDonePr:this.isDonePr,
                mark:this.mark
            })
            .then((response)=>{
                console.log(response.data)
            })
            },
        update:function(id){
            this.chid=id
        },
        confirm:function(id){
            let foundSt=this.students.find((element)=>{
                return element._id==id
            });

            Vue.axios.put("http://46.101.212.195:3000/students",{
                name: foundSt.name,
                group:foundSt.group,
                isDonePr:foundSt.isDonePr,
                mark:foundSt.mark
            })
            .then((response)=>{
                console.log(response.data)
            })
            this.chid=0;
        },
        calc:function(){
            let result=this.currs.find((item)=>{
                return item.ccy==this.chcurr
            });
            this.conv=result.buy*this.uahs
        },
        send:function(){
            this.$store.commit('back',this.chst);
        }
    },
    computed:{
        //  result=this.currs.find((item)=>{
        //         return item.ccy==this.chcurr
        //     }),
        //     this:conv=result.buy*this.uahs
        studentsCount () {
            let i=0;
            for (i=0;i<this.students.length;i++){};
            this.$store.commit('setCount',i);
                return this.$store.getters.getCount;
                this.chst=this.$store.getters.getback;
  },
  getgroup(){
      return this.$store.getters.getst;
  }
    }
    }
</script>

<style scoped>

</style>