<template>
    <NavBar :activePage="activePage"></NavBar>
    <HomeContent></HomeContent>
    
</template>

<script>
    //import PageViewer from './pageView.vue';
    import NavBar from './navbar.vue';
    import HomeContent from './homecontent.vue';
    export default {
        components: {
            NavBar,
            HomeContent,
        },
        data() {
            return {
                activePage: 0,
            }
        }
    }
</script>