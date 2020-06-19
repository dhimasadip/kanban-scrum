<template>
    <section id="login-section" class="container-fluid" style="height: 70vh !important;" v-if="!isLoggedIn">
        <div class="d-flex align-items-center justify-content-center h-100" style="height: calc(100vh - 100px) !important;">
            <form @submit.prevent="login" class="w-25 rounded p-3"  style="box-shadow: 5px 5px 5px #000000bd !important; background-color: #dbdbdb98;">
                <h3 class="text-center text-light">Sign In</h3>
                <hr>
                <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="errorMessage">
                    {{ errorMessage }}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="init">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="form-group">
                    <label for="email" class="text-white">Email address</label>
                    <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="email" required>
                </div>
                <div class="form-group">
                    <label for="password" class="text-white">Password</label>
                    <input v-model="password" type="password" class="form-control" id="password" placeholder="password" required>
                </div>
                <div class="d-flex flex-column align-items-center">
                    <button type="submit" class="btn btn-primary mb-2">Sign In</button>

                    <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
                    <small class="pt-2">Don't have an account? <a type="button" class="text-light" @click="toRegisterPage">Register</a> here</small>
                </div>
                </form>
        </div>
    </section>
</template>

<script>

    import Axios from 'axios'
    import GoogleLogin from 'vue-google-login'

    export default {
        props: ['isLoggedIn', 'errorMessage'],
        name: 'LoginForm',
        data() {
            return {
                email: '',
                password: '',
                errorMessage: '',
                params: {
                    client_id: "377050104055-04qn39iupef18lalpckv30tsob5ds3g7.apps.googleusercontent.com"
                },
                renderParams: {
                    width: 240,
                    height: 50,
                    longtitle: true
                }
            }
        },
        components: {
            GoogleLogin
        },
        methods: {
            init(){
                this.errorMessage = ''
            },
            login(){
                Axios({
                    method: "post",
                    url: `https://kanban-dhimasadip.herokuapp.com/login`,
                    data: {
                        email: this.email,
                        password: this.password
                    }
                })
                .then(response => {
                    this.init()
                    localStorage.access_token = response.data.user.access_token
                    localStorage.name = response.data.user.name
                    localStorage.email = response.data.user.email
                    this.email = response.data.user.email
                    this.$emit('loggedIn', response.data.user)
                })
                .catch(err => {
                    console.log(err)
                    this.errorMessage = err.response.data.message
                })
            },
            toRegisterPage() {
                this.init()
                this.$emit('registerPage')
            },
            onSuccess(googleUser) {
                
                const { id_token } = googleUser.wc
                Axios({
                    method: "post",
                    url: `https://kanban-dhimasadip.herokuapp.com/google-sign-in`,
                    data: {
                        id_token
                    }
                })
                .then(data => {
                    this.init()
                    const { access_token } = data.data
                    localStorage.access_token = access_token
                    localStorage.name = googleUser.getBasicProfile().Bd
                    localStorage.email = data.data.email
                    this.email = data.data.email

                    const user = {
                        name: googleUser.getBasicProfile().Bd,
                        email: data.data.email
                    }
                    this.$emit('loggedIn', user)
                })
                .catch(err => {
                    this.errorMessage = 'Login with google account failed'
                })
            }
        }
    }
</script>