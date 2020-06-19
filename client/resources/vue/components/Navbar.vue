<template>
    <header>
            <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #292b2ca8 !important;">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav d-flex justify-content-between align-items-center w-100">
                        <li class="nav-item active">
                            <a class="nav-link" type="button" @click="fetchData">KANBAN</a>
                        </li>

                        <li class="nav-item text-white">
                            {{ date }} 
                        </li>

                        <li class="nav-item dropdown" v-if="isLoggedIn">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {{ name }}
                            </a>
                            <div class="dropdown-menu dropdown-menu-right text-right" aria-labelledby="navbarDropdown">
                                
                                <a class="dropdown-item" href="#" @click="logout">Logout</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item disabled" href="#">{{ email }}</a>
                            </div>
                        </li>
                    </ul>
                </div>
              </nav>
        </header>

</template>
<script>
    export default {
        props: ['date', 'isLoggedIn', 'name', 'email'],
        name: 'Navbar',
        methods: {
            fetchData(){
                this.$emit('fetchData')
            },
            logout() {
                localStorage.clear()
                var auth2 = gapi.auth2.getAuthInstance();
                    auth2.signOut().then(function () {
                    console.log('User signed out.');
                });
                this.$emit('logout')
            }
        }    
    }
</script>