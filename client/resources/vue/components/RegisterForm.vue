<template>
    <section id="register-section" class="container-fluid" style="height: 70vh !important;" v-if="!isLoggedIn">
        <div class="d-flex align-items-center justify-content-center h-100" style=" height: calc(100vh - 90px) !important">
            <form @submit.prevent="register" class="w-25 rounded p-3"  style="box-shadow: 5px 5px 5px #000000bd !important; background-color: #dbdbdb98;">
                <h3 class="text-center text-light">Sign Up</h3>
                <hr>
                <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="errorMessage">
                    {{ errorMessage }}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="init">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="form-group">
                    <label for="name" class="text-white">Name</label>
                    <input v-model="name" type="text" class="form-control" id="name" placeholder="name" required>
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
                    <button type="submit" class="btn btn-primary">Sign Up</button>
                    <small class="pt-2">Have an account? <a type="button" class="text-light" @click="toLoginPage">Login</a> here</small>
                </div>
            </form>
        </div>
    </section>
</template>

<script>

    import Axios from 'axios'

    export default {
        props: ['isLoggedIn', 'errorMessage'],
        name: 'RegisterForm',
        data(){
            return {
                name: '',
                email: '',
                password: '',
                errorMessage
            }
        },
        methods: {
            init(){
                this.errorMessage = ''
            },
            register() {
                Axios({
                    method: 'post',
                    url: `https://kanban-dhimasadip.herokuapp.com/register`,
                    data: {
                        name: this.name,
                        email: this.email,
                        password: this.password
                    }
                })
                .then(response => {
                    this.errorMessage = ''
                    this.$emit('successRegister')
                })
                .catch(err => {
                    this.errorMessage = err.response.data.message
                })
            },
            toLoginPage(){
                this.errorMessage = ''
                this.$emit('successRegister')
            }

        }   
    }
</script>