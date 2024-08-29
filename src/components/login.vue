<template>
    <div class="login">
        <h1 id="header">Log in PLS</h1>
        <input id="sign-mail" type="text" placeholder="Enter email">
        <input id="sign-pass" type="password"  placeholder="Password">
    </div>
    <button id="sign-b" @click="register" >Press to Log in</button>
    <div id="sign-log" @click="goSign" >Do you not have an account?</div>
</template>

<script setup>
    import { ref } from 'vue';
    import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
    import { useRouter } from 'vue-router';

    // Get router instance
    const router = useRouter();



    const goSign = () => {
    router.push('/'); // Use the correct path for the login route
    };


    
    const register = async () => {
        const email = document.getElementById('sign-mail');
        
        const password = document.getElementById('sign-pass'); 
    const auth = getAuth(); // Get the Firebase Auth instance
    try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        console.log('Successfully loged!');
        router.push('home');
    } catch (error) {
        console.error(error.code);
        alert(error.message);
    }
    };
</script>
