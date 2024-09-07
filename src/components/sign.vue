<template>
    <div class="register">
        <h1 id="header">Sign Up PLS</h1>
        <input id="sign-mail" type="text" placeholder="Enter email">
        <input id="sign-name" type="text" placeholder="Enter first name">
        <input id="sign-surname" type="text" placeholder="Enter last name">
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

    // Reactive variable to store the login result
    const registerResult = ref('');

    const goLog = () => {
    router.push('/login'); // Use the correct path for the login route
    };

    
    const register = async () => {
        const email = document.getElementById('sign-mail');
        
        const password = document.getElementById('sign-pass'); 
        const auth = getAuth(); // Get the Firebase Auth instance

        const firstName = document.getElementById('sign-name');
        const lastName = document.getElementById('sign-surname');
        
    try {
        await createUserWithEmailAndPassword(auth, email.value, password.value);
        router.push('home');
        console.log('Successfully registered!');
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "firstname": firstName.value,
            "lastname": lastName.value,
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
            const response = await fetch("http://localhost:8080/api/v1/auth/register", requestOptions);
            const result = await response.text();
            registerResult.value = result; // Save the result in the reactive variable
        } catch (error) {
            console.error(error);
        }
        localStorage.setItem('token',registerResult.value);
        console.log(registerResult.value);
    } catch (error) {
        console.error(error.code);
        alert(error.message);
    }
    
};
</script>
