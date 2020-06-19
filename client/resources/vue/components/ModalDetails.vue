<template>
    <div class="modal fade" id="detailsModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header pb-2">
                    <h5 class="modal-title rounded border p-2 "
                    :class="submitCategory == 'Backlog' ? 'btn-outline-sky-blue' : submitCategory == 'Todo' ? 'btn-outline-purple' : submitCategory == 'Done' ? 'btn-outline-wintergreen' : 'btn-outline-orange-jelly'"
                    >{{ submitCategory }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="d-flex flex-column justify-content-center align-items-center border border-light rounded">

                        <div class="w-100 text-center">
                            <h5 v-text="dataDetails ? dataDetails.title : ''"></h5>
                            <hr class="pb-0">
                        </div>
                        <div class="w-100 pb-2  text-center d-flex justify-content-between">
                            <small class="text-left d-flex flex-column" style="font-size: 10px !important;">Due date : <span>{{ dataDetails ? new Date(dataDetails.due_date).toDateString().replace(/ /, ', ') : '' }}</span></small>
                            <small class="text-left d-flex flex-column" style="font-size: 10px !important;">Created by : <span>{{  dataDetails ? dataDetails.User.email : '' }}</span></small>
                        </div>
                            <p v-text="dataDetails ? dataDetails.description : ''"></p>

                        <!-- button action depends on category -->
                        <div class="w-100 p-2 mt-4  text-center" v-if="submitCategory">
                            <button 
                                class="btn btn-sm btn-sky-blue p-2 m-2" data-dismiss="modal" 
                                v-if="submitCategory != 'Backlog'" @click="update(dataDetails.id, 'Backlog')"
                            >Backlog
                            </button>

                            <button 
                                class="btn btn-sm btn-purple p-2 m-2" data-dismiss="modal" 
                                v-if="submitCategory != 'Todo'" @click="update(dataDetails.id, 'Todo')"
                            >Todo
                            </button>

                            <button 
                                class="btn btn-sm btn-orange-jelly p-2 m-2" data-dismiss="modal" 
                                v-if="submitCategory != 'Doing'" @click="update(dataDetails.id, 'Doing')"
                            >Doing
                            </button>

                            <button 
                                class="btn btn-sm btn-wintergreen p-2 m-2" data-dismiss="modal" 
                                v-if="submitCategory != 'Done'" @click="update(dataDetails.id, 'Done')"
                            >Done
                            </button>

                        </div>

                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>

    import Axios from 'axios'

    export default {
        props: ['dataDetails', 'submitCategory'],
        name: 'ModalDetails',
        methods: {
            update(id, category) {
                Axios({
                    method: 'put',
                    url: `https://kanban-dhimasadip.herokuapp.com/tasks/${id}`,
                    headers: {
                        access_token: localStorage.access_token
                    },
                    data: {
                        category
                    }
                })
                .then(response => {
                    this.$emit('callGetData')
                })
                .catch(err => {
                    console.log(err.response.data.message)
                })
            },
        }
    }
</script>