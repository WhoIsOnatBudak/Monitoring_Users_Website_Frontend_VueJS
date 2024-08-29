<template>
    <div class="register">
        <h1 id="header">Sign Up PLS</h1>
        <input id="sign-mail" type="text" placeholder="Enter email">
        <input id="sign-pass" type="password"  placeholder="Password">
    </div>
    <button id="sign-b" @click="register" >Press to Sign</button>
    <div id="sign-log" @click="goLog" >Do you have an account?</div>
</template>

<script setup>
    import { ref } from 'vue';
    import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
    import { useRouter } from 'vue-router';

    // Get router instance
    const router = useRouter();


    const goLog = () => {
    router.push('/login'); // Use the correct path for the login route
    };

    
    const register = async () => {
        const email = document.getElementById('sign-mail');
        
        const password = document.getElementById('sign-pass'); 
    const auth = getAuth(); // Get the Firebase Auth instance
    try {
        await createUserWithEmailAndPassword(auth, email.value, password.value);
        console.log('Successfully registered!');
        router.push('home');
    } catch (error) {
        console.error(error.code);
        alert(error.message);
    }
    };
</script>
