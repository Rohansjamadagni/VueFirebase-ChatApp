<template>
    <div class = "navbar-fixed">
        <nav class ="orange">
            <div class="container">
                <router-link :to="{name:'Welcome'}" class="brand-logo left">FireChat</router-link>
                <ul class="right">
                    <li><router-link :to="{ name: 'Signup'}">Signup</router-link></li>
                    <li><router-link :to="{ name: 'Login'}">Login</router-link></li>
                    <li><a @click="logout">Logout</a></li>
                </ul>
            </div>

        </nav>
    </div> 
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'Navbar',
    data(){
        return{

        }
    },
    methods: {
        logout(){
            firebase.auth().signOut().then(()=>{
                this.$router.push({name: 'Welcome'})
            })
        }
    },
}
</script>

<style>

</style>