<template>
    <div class="chat container">
        <h2 class="center orange-text">Welcome {{name}}</h2>
        <div class="card">
            <div class="card-content">
                <ul class="messages" v-chat-scroll>
                    <li v-for="message in messages" :key="message.id">
                        <span class="orange-text">{{message.name}}</span>
                        <span class="grey-text text-darken-3">{{message.content}}</span>
                        <span class="grey-text time">{{message.timestamp}}</span>
                    </li>
                </ul>
            </div>
            <div class="card-action">
                <div class="input-field">
                    <NewMessage :name="name"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import db from '@/firebase/init'
import NewMessage from '@/components/home/NewMessage'
import moment from 'moment'
import firebase from 'firebase'
export default {
    name: 'Chat',
    props: ['name'],
    components: {
        NewMessage
    },
    data(){
        return {
            name: this.props,
            messages:[]
        }
    },
    created(){
        if(!this.name){
            let user = firebase.auth().currentUser
            if(!this.name){

                db.collection('users').where('user_id','==',user.uid).get().then(snapshot => {
                            snapshot.forEach((doc)=>{
                                this.name = doc.data().name
                            })
                        })
            }
        }
        let ref = db.collection('messages').orderBy('timestamp')
        ref.onSnapshot(snapshot =>{
            snapshot.docChanges().forEach(change => {
                if(change.type=='added'){
                    let doc = change.doc
                    this.messages.push({
                        id: doc.id,
                        name: doc.data().name,
                        content: doc.data().content,
                        timestamp: moment(doc.data().timestamp).format('lll') 
                    })
                }
            })
        })
    }
}
</script>

<style scoped>
.chat h2{
    font-size:2.6em;
    margin-bottom:40px;

}
.chat span{
    font-size: 1.4em;
}
.chat .time{
    display:block;
}
.chat .time{
    font-size:0.8em;
}
.messages{
    max-height: 500px;
    overflow:auto;
}
.messages::-webkit-scrollbar{
    width: 3px;
}
.messages::-webkit-scrollbar-track{
    background:#ddd;
}
.messages::-webkit-scrollbar-thumb{
  
  background: #aaa;
}
.card{
    position: relative;
    left:20%;
    max-width:60%;
}
</style>