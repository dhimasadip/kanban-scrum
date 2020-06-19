<template>
    <section id="dashboard-section" class="container-fluid" v-if="isLoggedIn">
        
            <div class="row m-2" >
    
                <CardBacklog 
                    :fetchBacklog="this.backlog" 
                    @getDetails="details" 
                    @catchMessage="errMessage"
                    @inputCategoryEmit="inputCategory"
                    @callGetData="getData"
                    @passData="passData"
                    
                ></CardBacklog>
    
                <CardTodo 
                    :fetchTodo="this.todo" 
                    @getDetails="details" 
                    @catchMessage="errMessage"
                    @inputCategoryEmit="inputCategory"
                    @callGetData="getData"
                    @passData="passData"
                ></CardTodo>
            
                <CardDoing 
                    :fetchDoing="this.doing" 
                    @getDetails="details" 
                    @catchMessage="errMessage"
                    @inputCategoryEmit="inputCategory"
                    @callGetData="getData"
                    @passData="passData"
                ></CardDoing>
    
                <CardDone 
                    :fetchDone="this.done" 
                    @getDetails="details" 
                    @catchMessage="errMessage"
                    @inputCategoryEmit="inputCategory"
                    @callGetData="getData"
                    @passData="passData"
                ></CardDone>
            
            </div>
        </section>
</template>


<script>
    import Axios from 'axios'
    import CardBacklog from './CardBacklog'
    import CardTodo from './CardTodo'
    import CardDoing from './CardDoing'
    import CardDone from './CardDone'

    export default {
        props: ['isLoggedIn'],
        name: 'Dashboard',
        data() {
            return {
                backlog: [],
                todo: [],
                doing: [],
                done: [],
                error_message: ''
            }
        },
        components: {
            CardBacklog, CardTodo, CardDoing, CardDone    
        },
        computed: {
            fetchDataBacklog() {
                const backlog_data = []
                this.backlog.forEach(el => {
                    backlog_data.push(el)
                })
                return backlog_data
            },
            fetchDataTodo() {
                const todo_data = []
                this.todo.forEach(el => {
                    todo_data.push(el)
                })
                return todo_data
            },
            
            fetchDataDoing() {
                const doing_data = []
                this.doing.forEach(el => {
                    doing_data.push(el)
                })
                return doing_data
            },
            fetchDataDone() {
                const done_data = []
                this.done.forEach(el => {
                    done_data.push(el)
                })
                return done_data
            }   
        },
        methods: {
            init() {
                this.backlog = []
                this.todo = []
                this.doing = []
                this.done = []
            },
            getData() {
                Axios({
                    method: "get",
                    url: `http://localhost:3000/tasks`,
                    headers: {
                        access_token: localStorage.access_token
                    }
                })
                .then(response => {
                    this.init()
                    response.data.forEach(el => {
                        if(el.category == 'Backlog') this.backlog.push(el)
                        else if(el.category == 'Todo') this.todo.push(el)
                        else if(el.category == 'Doing') this.doing.push(el)
                        else this.done.push(el)
                    })
                })
                .catch(err => {
                    this.error_message = ''
                    this.error_message = err.response.data.message
                })
            },
            details(data) {
                this.$emit('getDataDetails', data)
            },
            errMessage(data) {
                this.error_message = ''
                this.error_message = data
            },
            inputCategory(data) {
                this.$emit('inputCategory', data)
            },
            passData(id) {
                this.$emit('passData', id)
            }
        },
        created() {
            if(localStorage.access_token) {
                
                this.getData()
                const data = {
                    isLoggedIn: true,
                    name: localStorage.name,
                    email: localStorage.email    
                }

                this.$emit('createdLifecycle', data)

            }
        }
    }
</script>