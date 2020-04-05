<template>
    <div class="new-message">
        <form @submit.prevent="addMessage">
            <label for="new-message">New Message(enter to add) :</label>
            <div class="input-field">
                <input type="text" name="new-message" v-model="newMessage">
            </div>
            <p class="red-text" v-if="feedback">{{feedback}}</p>
        </form>

    </div>
</template>

<script>

import db from '@/firebase/init'
import firebase from 'firebase'
export default {
    name: 'NewMessage',
    props: ['name'],
    data(){
        return {
            newMessage: null,
            feedback: null
        }
    },
    methods: {
        addMessage(){
            if(this.newMessage){
                this.feedback= null
                db.collection('messages').add({
                    content: this.newMessage,
                    name: this.name,
                    timestamp: Date.now()
                }).catch(err =>{
                    console.log(err)
                    
                })
                this.newMessage=null

            }else{
                this.feedback = 'Message cant be left blank'
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
</style>