<template>
    <div class="modal fade" id="confirmationModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header pb-2">
                    <h5 class="modal-title rounded border p-2 "
                    :class="submitCategory == 'Backlog' ? 'btn-outline-sky-blue' : submitCategory == 'Todo' ? 'btn-outline-purple' : submitCategory == 'Done' ? 'btn-outline-wintergreen' : 'btn-outline-orange-jelly'"
                    >{{ submitCategory }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="hideModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div v-if="isSuccessDelete">
                    <div class="modal-body">
                        <h5>Successfully delete task in {{ submitCategory }}</h5>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="hideModal">OK</button>
                    </div>
                </div>


                <div v-else>
                    <div class="modal-body">
                        <h5>Are sure want to delete task in {{ submitCategory }} ?</h5>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-danger" @click="destroy(taskId)">Delete</button>
                    </div>

                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'

    export default {
        props: ['submitCategory', 'taskId', 'isSuccessDelete'],
        name: 'ModalConfirmation',
        data() {
            return {
                isSuccessDelete
            }
        },
        methods: {
            destroy(id) {
                Axios({
                    method: 'delete',
                    url: `http://localhost:3000/tasks/${id}`,
                    headers: {
                        access_token: localStorage.access_token
                    }
                })
                .then(response => {
                    this.isSuccessDelete = true
                    this.$emit('callGetData')
                })
                .catch(err => {
                    this.$emit('catchMessage', err.response.data.message)
                })
            },
            hideModal() {
                this.$emit('callGetData')
            }
        }   
    }
</script>