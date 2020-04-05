<template>
    <div class="login container center-align">
        <form @submit.prevent="login" class="card-panel">
            <h2 class="center orange-text">Login</h2>
            <label for="email" class="label left">Enter your Email</label>
          <div class="input-field">
            <input type="email" name ="email" class="input-field" v-model="email">
          </div>
          <label for="password" class="label left">Enter your password</label>
          <div class="input-field">
            <input type="password" name ="password" class="input-field" v-model="password">
          </div>
          <p v-if="feedback" class="red-text">{{this.feedback}}</p>
          <button class="btn orange">Login</button>

        </form>
    </div>
</template>

<script>

import firebase from 'firebase'
import db from '@/firebase/init'
export default {
    name: 'Login',
    data(){
        return{
            name:null,
            email: null,
            password: null,
            feedback:null
        }
    },
    methods: {
        login(){
            if(this.email && this.password){
                
                firebase.auth().signInWithEmailAndPassword(this.email,this.password)
                .then(cred=>{
                    //find the user record and update that name thing
                    db.collection('users').where('user_id','==',cred.user.uid).get().then(snapshot => {
                        snapshot.forEach((doc)=>{
                            this.$router.push({ name:'Chat',params:{name: doc.data().name} })

                        })
                    })
                })
                .catch(err =>(
                    this.feedback = err.message
                ))
                
                this.feedback = null
                
            }else{
                this.feedback = 'Please enter the fields'
            }

        }
    }
}
</script>

<style>
.input-field input:focus + label {
   color: red !important;
 }
.input-field input:focus {
   border-bottom: 1px solid #ff9800 !important;
   box-shadow: 0 1px 0 0 #ff9800 !important;
 }

.login{
    max-width:600px;
    margin-top:100px;

 }
 .login h2{
   font-size:4em;
 }
 .login button{
   margin:30px auto;
 }
 .label{
     font-size: 1em;
 }
</style>