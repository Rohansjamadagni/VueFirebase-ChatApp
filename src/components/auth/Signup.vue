<template>
  <div class="signup container">
    <div class="card">
      <div class="card-content center-align">
        <h2 class="orange-text">Signup</h2>
        <form @submit.prevent="signup">
          <label for="name" class="label left">Enter your username</label>
          <div class="input-field">
            <input type="text" name ="name" class="input-field" v-model="name">
          </div>
          <label for="email" class="label left">Enter your Email</label>
          <div class="input-field">
            <input type="email" name ="email" class="input-field" v-model="email">
          </div>
          <label for="password" class="label left">Enter your password</label>
          <div class="input-field">
            <input type="password" name ="password" class="input-field" v-model="password">
          </div>
          <p v-if="feedback" class="red-text">{{this.feedback}}</p>
          <button class="btn orange">Signup</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import slugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase'
export default {
  name: 'Signup',
  data () {
    return {
      name: null,
      email:null,
      password:null,
      feedback: null,
      slug:null
    }
  },
      methods: {
        signup(){
          if(this.name && this.email && this.password){
            this.slug= slugify(this.name,{
              replacement:'-',
              remove: /[$*_+`.()'"!\-:@]/g,
              lower:true
            })
            let ref = db.collection('users').doc(this.slug)
            ref.get().then(doc => {
              if(doc.exists){
                this.feedback = 'This Username already exists'
              }else{

                firebase.auth().createUserWithEmailAndPassword(this.email,this.password)
                .then(cred =>{
                  ref.set({
                    name: this.name,
                    chatrooms:[],
                    user_id: cred.user.uid
                  }).then(
                    this.$router.push({name: 'Chat',params: {name: this.name}})
                  )
                } )
                .catch(err => {
                  this.feedback = err.message
                })


                this.feedback = 'Username is available'
              }
            })
            //this.$router.push({name: 'Chat',params: {name: this.name}})
          }else{
            this.feedback = 'You must enter all fields'
          }
        }
      }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.input-field input:focus + label {
   color: red !important;
 }
.input-field input:focus {
   border-bottom: 1px solid #ff9800 !important;
   box-shadow: 0 1px 0 0 #ff9800 !important;
 }

.signup{
    max-width:600px;
    margin-top:100px;

 }
 .signup h2{
   font-size:4em;
 }
 .signup button{
   margin:30px auto;
 }
 .label{
   font-size: 1em;
 }
</style>
