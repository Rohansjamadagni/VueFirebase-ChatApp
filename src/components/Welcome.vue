<template>
    <div class="Welcome">
        <div class="row">
            <div class="container center-align">
                <h1 class= "orange-text">Fire Chat</h1>
            </div>
        </div>
        <div class="about">
            <div class="card hoverable container">
                <div class="card-content center-align">
                    <h3 class= "orange-text">How it works</h3>
                    <hr/>
                    <br>
                    <p class ="">This is a realtime chat application built using Vue.js and Google's Firebase. The user signs up and the record is stored using Firebase Authentication. Once logged in, the user can get access to the 'Chat window' in the '/chat' route which is blocked unless authenticated. As the user sends a message through the input-field, it is stored in the Firebase database along with the unique user-id and timestamp. Then the chat component updates in realtime as soon as it detects a new message in the database. Give it a try!</p>
                    <br>
                    <br>
                    <router-link :to="{ name: 'Login'}" class ="btn-large orange">Login</router-link>
                    <router-link :to="{ name: 'Signup'}" class ="btn-large orange">Signup</router-link>
                </div>
            </div>

        </div>
        <hr/>
        <h2 class="orange-text center-align">The Team</h2>    
        <div class="row">
            <div class="col s4 offset-s2">
                <div class="card  hoverable">
                    <ul class="collapsible">
                        <!--li-->
                            <div class="card-content">
                                    <span class="card-title"><h5>Sandeep S Budhya</h5></span>
                            <!--div class="collapsible-body"-->
                            </div>
                            <!--/div-->
                        <!--/li-->
                        <li>
                            <div class="card-action collapsible-header">
                                <span class="orange-text">Details</span>
                            </div>
                            <div class="collapsible-body">
                                <span class=""><h6>USN: 1DS18CS112</h6></span>
                                <span class=""><h6>Section : C</h6></span>
                                <span class=""><h6>Team Name: C12</h6></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col s4">
                <div class="card hoverable">
                    <ul class="collapsible">
                        <!--li-->
                            <div class="card-content  ">
                                    <span class="card-title"><h5>Rohan S Jamadagni</h5></span>
                            <!--div class="collapsible-body"-->
                                
                            </div>
                            <!--/div-->
                        <!--/li-->
                        <li>
                            <div class="card-action collapsible-header">
                                <span class="orange-text">Details</span>
                            </div>
                            <div class="collapsible-body">
                                <span class=""><h6>USN: 1DS18CS106</h6></span>
                                <span class=""><h6>Section : C</h6></span>
                                <span class=""><h6>Team Name: C12</h6></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

//For the collapsible to
export default {
  name: 'Welcome',
  props: {

  }
}
</script>

<style scoped>
p{
    font-size: 1.2em;;
}
.about{
    position: relative;
    left:16.5%;
}
hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 2px solid #ccc;
    margin: 1em 0;
    padding: 0;
}
.btn-large{
    margin-right:30px;
}
</style>