<template>
    <div class="col-3 d-flex flex-column" style="padding: 0;">
        <div class="border m-3 p-2 shadow rounded text-center" style="border-left: 3px solid #f0932b !important; border-bottom: 2px solid #f0932b !important; background-color: #dfe6e9a4;">
            <div class="text-light text-center mt-2 rounded bg-orange-jelly">
                <h5 class="mb-1 mt-1">Doing</h5>
            </div>
    
            <ul class="list-unstyled scrollbar scrollbar-orange-jelly rounded" style=" max-height: 62vh !important;">
                <li v-for="data in fetchDoing" :key="data.id">
                    <div class="mr-2 mt-2 p-2 shadow rounded bg-light text-center">
                        <div class="d-flex flex-column">
                            <div class="d-flex justify-content-between align-items-center">
                                <h6> {{ data.title }} </h6>
                                <button type="button" class="btn btn-sm btn-danger" data-toggle="modal" data-target="#confirmationModal" @click="passData(data.id, 'Doing', inputCategory)">X</button>
                            </div>
                            <div>
                                <small class="text-left d-flex flex-column" style="font-size: 10px !important;">Due date : <span>{{ new Date(data.due_date).toDateString().replace(/ /, ', ') }}</span></small>
                            </div>
                        </div>
                        <hr>
                        <p class="text-left"> {{data.description}} </p>
                        <hr>
                        <div class="d-flex justify-content-between">
                            <small class="text-left d-flex flex-column" style="font-size: 10px !important;">Created by : <span>{{  data.User.email }}</span></small>
                            <button class="btn btn-outline-orange-jelly" data-toggle="modal" data-target="#detailsModal" @click="get(data.id, 'Doing', inputCategory)">Details</button>

                        </div>      
                    </div>
                </li>
            </ul>
    
            <button type="button" class="text-white btn btn-outline-orange-jelly mb-2 w-100 d-flex justify-content-center align-items-center"
                        data-toggle="modal" data-target="#addModal" @click="inputCategory('Doing')">
                <svg class="bi bi-plus-circle mr-2" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/>
                    <path fill-rule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"/>
                    <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                </svg>
                Add task
            </button>
        </div>
    </div>         
</template>

<script>
    
    import Axios from 'axios'

    export default {

        props: ['fetchDoing'],
        name: 'CardDoing',
        data() {
            return {
                  
            }
        },
        methods: {
            inputCategory(category) {
                const data = {
                    submitCategory: category,
                    showModal: true
                }

                this.$emit('inputCategoryEmit', data)
            },
            get(id, category, cb) {
                cb(category)

                Axios({
                    method: 'get',
                    url: `https://kanban-dhimasadip.herokuapp.com/tasks/${id}`,
                    headers: {
                        access_token: localStorage.access_token
                    }
                })
                .then(response => {
                    this.$emit('getDetails', response.data)
                    
                })
                .catch(err => {
                    this.$emit('catchMessage', err.response.data.message)
                    
                })
            },
            passData(id,category, cb) {
                cb(category)
                this.$emit('passData', id)
            }
        }
    }
</script>