<template>
    <NavBar :activePage="activePage"></NavBar>
    <userinfocontent></userinfocontent>
</template>
<script>
    import NavBar from './navbar.vue';
    import userinfocontent from './userinfocontent.vue';
    export default {
        components: {
            NavBar,
            userinfocontent,
        },
        data() {
            return {
                activePage: 3,
            }
        }
    }
</script>