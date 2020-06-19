<template>
    <div>
        <Navbar 
            :isLoggedIn="this.isLoggedIn" 
            :date="this.date" 
            :name="this.name" 
            :email="this.email" 
            @logout="logoutHandler"
            @fetchData="fetchAllData"
        ></Navbar>
        
        <RegisterForm 
            :isLoggedIn="this.isLoggedIn" 
            @successRegister="registered" 
            v-if="register"
        ></RegisterForm>
        
        <LoginForm 
            :isLoggedIn="this.isLoggedIn" 
            @loggedIn="userData" 
            @registerPage="toRegisterPage" 
            v-else
        ></LoginForm>

        <Dashboard 
            :isLoggedIn="this.isLoggedIn" 
            @createdLifecycle="dataCreated" 
            @getDataDetails="details"
            @inputCategory="inputCategory"
            @passData="passData"
            ref="dashboard"
        ></Dashboard>
        
        <ModalAdd 
            :showModal="this.showModal" 
            :submitCategory="this.submitCategory"
            :isSuccessAdd="this.isSuccessAdd"
            :errorMessage="this.err_msg"
            @added="added" 
        ></ModalAdd>

        <ModalDetails
            :dataDetails="this.dataDetails"
            :submitCategory="this.submitCategory"
            @callGetData="fetchAllData"
        ></ModalDetails>

        <ModalConfirmation
            :submitCategory="this.submitCategory"
            :isSuccessDelete="this.isSuccessDelete"
            :taskId="this.taskId"
            @callGetData="fetchAllData"
        ></ModalConfirmation>   

    </div>

</template>
<script>
    import Navbar from './components/Navbar'
    import LoginForm from './components/LoginForm'
    import RegisterForm from './components/RegisterForm'
    import Dashboard from './components/Dashboard'
    import ModalAdd from './components/ModalAdd'
    import ModalDetails from './components/ModalDetails.vue'
    import ModalConfirmation from './components/ModalConfirmation'
    

    export default {
        name: 'App',
        data() {
            return {
                name: '',
                email: '',
                password: '',
                isLoggedIn: false,
                showModal: false,
                isSuccessAdd: false,
                isSuccessDelete: false,
                date: new Date().toDateString().replace(/ /, ', '),
                submitCategory: '',
                dataDetails: null,
                taskId: '',
                register: false,
                err_msg: ''
            }
        },
        components: {
           Navbar, LoginForm, RegisterForm, Dashboard, ModalAdd, ModalDetails, ModalConfirmation
        },
        methods: {
            toRegisterPage(){
                this.register = true
            },
            registered(){
                this.register = false
            },
            userData(user) {
                this.name = user.name
                this.email = user.email
                this.isLoggedIn = true
                this.fetchAllData()
                
            },
            dataCreated(data) {
                this.isLoggedIn = data.isLoggedIn
                this.name = data.name
                this.email = data.email
            },
            details(data) {
                this.dataDetails = data
            },
            logoutHandler() {
                this.isLoggedIn = false
                this.email = ''
                this.password = ''
            },
            inputCategory(data) {
                this.showModal = data.showModal
                this.submitCategory = data.submitCategory
            },
            added(data) {
                this.showModal = data.showModal
                this.isSuccessAdd = data.isSuccessAdd
                this.fetchAllData()
            },
            fetchAllData(){
                this.$refs.dashboard.getData()
            },
            passData(id) {
                this.taskId = id
            }
        }
    }
</script>