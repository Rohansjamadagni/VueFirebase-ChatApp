import Vue from 'vue'
import Router from 'vue-router'
import Signup from '@/components/auth/Signup'
import Chat from '@/components/home/Chat'
import VueChatScroll from 'vue-chat-scroll'
import Login from '@/components/auth/Login'
import firebase from 'firebase'
import Welcome from '@/components/Welcome'
Vue.use(VueChatScroll)

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path:'/',
      name:'Welcome',
      component: Welcome
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
      props: true,
      meta:{
        requiresAuth: true
      }
      
    },
    {
      path:'/signup',
      name:'Signup',
      component: Signup
    },
    {
      path:'/login',
      name:'Login',
      component: Login
    }
  ]
})

router.beforeEach((to,from,next)=>{
  
  $(document).ready(function(){
    $('.collapsible').collapsible();
   });
  //check to see if route requires auth
  if(to.matched.some(rec=>rec.meta.requiresAuth)){
    //check auth state of user
    let user = firebase.auth().currentUser
    if(user){
      //yes
      next()
    }else{
      //not
      next({name:'Login'})
    }
  }else{
    next()
  }
})


export default router
