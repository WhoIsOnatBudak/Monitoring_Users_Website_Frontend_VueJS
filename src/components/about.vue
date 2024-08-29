<template>
    <NavBar :activePage="activePage"></NavBar>
    
</template>

<script>
    //import PageViewer from './pageView.vue';
    import NavBar from './navbar.vue';
    export default {
        components: {
            NavBar,
        },
        data() {
            return {
                activePage: 1,
            }
        }
    }
</script>