import Home from './components/home.vue'
import Sign from './components/sign.vue'
import About from './components/about.vue'
import Login from './components/login.vue'
import GetList from './components/getlist.vue'
import { createRouter,createWebHistory} from 'vue-router'

const routes = [
    {
        component: Sign,
        path: "/",
    }
    ,
    {
        component: Home,
        path: "/home"
    }
    ,
    {
        component: About,
        path: "/about"
    }
    ,
    {
        component: Login,
        path: "/login"
    }
    ,
    {
        component: GetList,
        path: "/getlist"
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;