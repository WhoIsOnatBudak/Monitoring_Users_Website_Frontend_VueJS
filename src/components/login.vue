<template>
    <div class="login">
        <h1 id="header">Log in PLS</h1>
        <input id="sign-mail" type="text" placeholder="Enter email">
        <input id="sign-pass" type="password"  placeholder="Password">
    </div>
    <button id="sign-b" @click="register">Press to Log in</button>
    <div id="sign-log" @click="goSign">Do you not have an account?</div>

</template>

<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

// Get router instance
const router = useRouter();

// Reactive variable to store the login result
const loginResult = ref('');

const goSign = () => {
    router.push('/'); // Use the correct path for the login route
};

const register = async () => {
    const email = document.getElementById('sign-mail');
    const password = document.getElementById('sign-pass');
    const auth = getAuth(); // Get the Firebase Auth instance
    
    try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        console.log('Successfully logged in!');
        router.push('/home');
    } catch (error) {
        console.error(error.code);
        alert(error.message);
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "email": email.value,
        "password": password.value
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    try {
        const response = await fetch("http://localhost:8080/api/v1/auth/authenticate", requestOptions);
        const result = await response.text();
        loginResult.value = result; // Save the result in the reactive variable
        //router.push('home');
    } catch (error) {
        console.error(error);
    }
    localStorage.setItem('token',loginResult.value);
    console.log(loginResult.value);
};
</script>
