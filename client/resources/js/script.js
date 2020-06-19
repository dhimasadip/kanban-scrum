
Vue.component("modal", {
    template: "#modal-template"
  });

new Vue({
    el: '#app',
    data: {
        email: '',
        password: '',
        name: '',
        title: '',
        description: '',
        due_date: '',
        isLoggedIn: false,
        showModal: false,
        backlog: [],
        todo: [],
        doing: [],
        done: [],
        date: new Date().toDateString().replace(/ /, ', '),
        submitCategory: '',
        dataDetails: null,
        error_message: ''
    },
    computed: {
        getEmail() {
            return this.email
        },
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
        login(){
            axios({
                method: "post",
                url: `https://kanban-dhimasadip.herokuapp.com/login`,
                data: {
                    email: this.email,
                    password: this.password
                }
            })
            .then(response => {
                localStorage.access_token = response.data.user.access_token
                localStorage.name = response.data.user.name
                localStorage.email = response.data.user.email
                this.isLoggedIn = true
                this.email = response.data.user.email
                this.name = response.data.user.name
                this.getData()
            })
            .catch(err => {
                console.log(err)
            })
        },
        logout() {
            localStorage.clear()
            this.isLoggedIn = false
            this.email = ''
            this.password = ''
        },
        init() {
            this.backlog = []
            this.todo = []
            this.doing = []
            this.done = []
            this.title = ''
            this.description = ''
            this.submitCategory = ''
            this.due_date = ''
        },
        getData() {
            axios({
                method: "get",
                url: `https://kanban-dhimasadip.herokuapp.com/tasks`,
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
        inputCategory(val) {
            this.submitCategory = val
            this.showModal = true
        },
        add() {
            axios({
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
                this.showModal = false
                this.getData()
            })
            .catch(err => {
                this.error_message = ''
                this.error_message = err.response.data.message
            })
        },
        get(id, category, cb) {
            cb(category)

            axios({
                method: 'get',
                url: `https://kanban-dhimasadip.herokuapp.com/tasks/${id}`,
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(response => {
                this.dataDetails = response.data
            })
            .catch(err => {
                this.error_message = ''
                this.error_message = err.response.data.message
            })
        },
        update(id, category) {
            axios({
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
                this.getData()
            })
            .catch(err => {
                this.error_message = ''
                this.error_message = err.response.data.message
            })
        },
        destroy(id) {
            axios({
                method: 'delete',
                url: `https://kanban-dhimasadip.herokuapp.com/tasks/${id}`,
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(response => {
                this.getData()
            })
            .catch(err => {
                this.error_message = ''
                this.error_message = err.response.data.message
            })
        }


    },
    created() {
        if(localStorage.access_token) {
            this.isLoggedIn = true
            this.getData()
            this.name = localStorage.name
            this.email = localStorage.email
        }
    }
  })