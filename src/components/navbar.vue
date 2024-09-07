<template>
    <nav 
        :class="{fulnav: light , dfulnav: !light}">

            <a class="nav-title">Nav Bar</a>

            <a 
            class="nav"
            :class="{navAct: activePage == index}" 
            v-for="(page,index) in pages" 
            :key="index" 
            @click="changePage(page.go)" 
            href="#">{{page.link}}</a>

            <button class="nav-button" @click="changeTheme(light)">Click for color</button>
            <button id="log-out" @click="logOut">Log Out PLS</button>
            
    </nav>
</template>
<script>
    import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
    import { useRouter } from 'vue-router';


    


    export default {
        props: ['activePage'],
        data(){
                return {
                    light: 1,
                    pages: [
                        {
                            link: 'Home',
                            go:'home',
                        }
                        ,
                        {
                            link: 'About',
                            go: 'about',
                        }
                        ,
                        {
                            link: 'GetList',
                            go: 'getlist'
                        }
                    ]

                    
                }
        },
        created(){
            this.getTheme();
        },
        methods: {
            logOut() {
                const auth = getAuth(); // Get the Firebase Auth instance
                auth
                    .signOut()
                    .then(() => {
                    console.log('Successfully logged out!');
                    this.$router.push('/'); // Corrected navigation to home page
                    })
                    .catch((error) => {
                    console.error(error.code);
                    alert(error.message);
                    });
            }
            ,
            changeTheme(){
                this.light = !this.light;
                this.storeTheme(this.light);
            }
            ,
            changePage(way){
                this.$router.push(way);
            }
            ,
            storeTheme(light){
                localStorage.setItem('light',this.light);
            }
            ,
            getTheme(){
                let cur = localStorage.getItem('light');
                
                if(cur){
                    if(cur == 'true'){
                        this.light = 1;
                    }
                    if(cur == 'false'){
                        this.light = 0;
                    }
                } 
            }
        
        }
    } 
</script>