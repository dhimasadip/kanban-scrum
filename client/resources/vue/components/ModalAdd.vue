<template>
    <section>
        <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-hidden="true" v-if="showModal">
            <div class="modal-dialog">
                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title" >Add new task {{submitCategory}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="init">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="errorMessage">
                        {{ errorMessage }}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                     <div class="modal-body" v-if="isSuccessAdd" >
                        <div class="p-3">
                            <h4>Successfully add new task in {{submitCategory}}</h4>
                        </div>
                        
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="hideModal">OK</button>
                        </div>
                    </div>

                    <div class="modal-body" v-else>
                        <form @submit.prevent="add">
                            <div class="form-group">
                                <label for="title" class="text-dark">Title</label>
                                <input v-model="title" type="text" class="form-control" id="title" aria-describedby="emailHelp" placeholder="task title" required>
                            </div>
                            <div class="form-group">
                                <label for="description" class="text-dark">Description</label>
                                <textarea v-model="description" class="form-control" placeholder="description" required></textarea>
                            </div>
                            <div class="form-group">
                                <label for="due_date" class="text-dark">Due Date</label>
                                <input class="form-control" type="date" v-model="due_date" id="due_date" required>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="submit" class="btn btn-primary">Create</button>
                            </div>
                        </form>
                    </div>
                       
                       
                   
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Axios from 'axios'

    export default {
        props: ['showModal', 'submitCategory', 'isSuccessAdd', 'errorMessage'],
        name: 'ModalAdd',
        data() {
            return {
                title: '',
                description: '',
                due_date: '',
                submitCategory,
                isSuccessAdd,
                errorMessage
            }
        },
        methods: {
            init(){
                this.title = ''
                this.description = ''
                this.due_date = ''
                this.errorMessage = ''
            },
            add() {
                Axios({
                    method: 'post',
                    url: `https://kanban-dhimasadip.herokuapp.com/tasks`,
                    headers: {
                        access_token: localStorage.access_token
                    },
                    data: {
                        title: this.title,
                        description: this.description,
                        category: this.submitCategory,
                        due_date: this.due_date
                        
                    }
                })
                .then(response => {
                    
                    this.init()
                    this.isSuccessAdd = true
                })
                .catch(err => {
                    this.errorMessage = err.response.data.message
                })
            },
            hideModal() {
                
                this.init()

                const data = {
                    showModal: false,
                    isSuccessAdd: false    
                }

                this.$emit('added', data)
            }
        }
    }
</script>