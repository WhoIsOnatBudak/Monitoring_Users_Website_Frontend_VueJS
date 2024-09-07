<template>
  <NavBar :activePage="activePage"></NavBar>
  <ListContent></ListContent>
</template>

<script>
    import NavBar from './navbar.vue';
    import ListContent from './getlistContent.vue';
    export default {
        components: {
            NavBar,
            ListContent,
        },
        data() {
            return {
                activePage: 2,
            }
        }
    }
</script>
