<template>
    <div id="content">
        <h1>{{page.title}}</h1>
        <p>{{page.content}}</p>
    </div>
</template>
<script>
    export default {
        props: ['page'],
    }
</script>